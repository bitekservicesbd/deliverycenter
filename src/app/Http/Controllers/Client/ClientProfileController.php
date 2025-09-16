<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ClientProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('clients/settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('client.profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function appearance()
    {
        return Inertia::render('clients/settings/appearance');
    }

    public function editPassword(Request $request): Response
    {
        return Inertia::render('clients/settings/password');
    }

    public function updatePassword(Request $request): RedirectResponse
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

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('tenant.login');
    }
}
