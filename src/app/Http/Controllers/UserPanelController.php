<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserPanelController extends Controller
{
    public function index()
    {
        $tenants = Tenant::where('data->user_id', auth()->id())->with(['user', 'plan'])->get();

        return Inertia::render('centrals/user-panel/index', [
            'tenants' => $tenants,
        ]);
    }

    public function passwordChange(Request $request)
    {
        $request->validate([
            'tenant_id' => 'required',
            'tenant_email' => 'required|email',
            'old_password' => 'required|string',
            'new_password' => 'required|string|confirmed',
        ], [
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ]);

        try {
            $user = tenantDB($request->tenant_id)
                ->table('users')
                ->where('email', $request->tenant_email)
                ->first();

            if (! $user) {
                return back()->withErrors([
                    'tenant_email' => 'User not found.',
                ]);
            }

            if (! Hash::check($request->old_password, $user->password)) {
                return back()->withErrors([
                    'old_password' => 'Current password does not match.',
                ]);
            }
            tenantDB($request->tenant_id)
                ->table('users')
                ->where('id', $user->id)
                ->update([
                    'password' => bcrypt($request->new_password),
                ]);

            return back()->with('success', 'Your password has been changed successfully.');
        } catch (Exception $e) {
            Log::error($e->getMessage());

            return back()->withErrors([
                'error' => 'Something went wrong. Please try again later.',
            ]);
        }
    }
}
