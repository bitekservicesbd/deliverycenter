<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\CustomResetPassword;
use App\Notifications\TenantResetPassword;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CentralUserController extends Controller
{
    public function index()
    {
        $users = User::where('user_type', USER_TYPE_CENTRAL)->get();

        return Inertia::render('centrals/central-users/index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->id ?? null;
        $request->merge([
            'username' => strtolower($request->username),
            'email' => strtolower($request->email),
        ]);
        $validatedData = $request->validate([
            'name' => 'required|string|between:2,30',
            'username' => ['required', 'string', 'between:2,30', Rule::unique('users', 'username')->ignore($userId), 'alpha_dash'],
            'email' => ['required', 'string', 'email', 'max:100', Rule::unique('users', 'email')->ignore($userId)],
            'status' => [$userId ? 'required' : 'nullable', Rule::in(['active', 'inactive', 'blocked'])],
        ]);

        try {
            if ($userId) {
                $user = User::findOrFail($userId);
                $user->update($validatedData);

                return redirect()->back()->with('success', __('User updated successfully.'));
            } else {
                $validatedData['user_type'] = USER_TYPE_CENTRAL;
                $user = User::create($validatedData);
                $token = Password::broker()->createToken($user);
                $user->notify(new CustomResetPassword($token, $user->email));

                return redirect()->back()->with('success', __('User created successfully. Password setup link sent to email.'));
            }

        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }

    public function delete($id)
    {
        try {
            User::destroy($id);

            return redirect()->back()->with('success', __('User deleted successfully.'));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }

    public function toggleStatus($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->is_active = ! $user->is_active;
            $user->save();

            $status = $user->is_active ? 'activated' : 'deactivated';

            return redirect()->back()->with('success', __("User {$status} successfully!"));

        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }

    public function resetPassword($id)
    {
        try {
            $user = User::find($id);
            $token = Password::broker()->createToken($user);
            $user->notify(new CustomResetPassword($token, $user->email));

            return redirect()->back()->with('success', __('Reset Password Link Sent successfully!'));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }

    public function tenantUserResetPassword($id, $tenantId)
    {
        try {
            tenantDB($tenantId);
            $user = User::on("tenant_{$tenantId}")->findOrFail($id);
            $token = Password::broker('tenant_users')->createToken($user);
            $user->notify(new TenantResetPassword($token, $user->email, $tenantId));

            return redirect()->back()->with('success', __('Reset Password Link Sent successfully!'));
        } catch (Exception $e) {
            Log::error("Tenant user not found: {$e->getMessage()}");

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }
}
