<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CentralUserRequest;
use App\Models\Tenant;
use App\Models\User;
use App\Notifications\CustomResetPassword;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class TenantUserController extends Controller
{
    public function index()
    {
        $users = User::where('user_type', USER_TYPE_TENANT)->get();

        return Inertia::render('centrals/tenant-users/index', [
            'users' => $users,
        ]);
    }

    public function store(CentralUserRequest $request)
    {
        try {
            $data = $request->validated();

            if ($request->id) {
                $user = User::findOrFail($request->id);
                $user->update($data);

                return redirect()->back()->with('success', __('User updated successfully.'));
            } else {
                $data['user_type'] = USER_TYPE_TENANT;
                $user = User::create($data);
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

    public function admins($id)
    {
        $tenant = Tenant::where('id', $id)->first();
        $users = tenantDB($id)->table('users')->get();

        return Inertia::render('centrals/tenant/admins', [
            'users' => $users,
            'tenant' => $tenant,
        ]);
    }
}
