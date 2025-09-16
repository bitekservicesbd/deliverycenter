<?php

namespace App\Http\Controllers\TenantControllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    public function login(LoginRequest $request): RedirectResponse
    {
        $ip = $request->ip();
        $userType = 'tenant';
        $tenantDomain = tenant('id');
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            $attempt = centralDB()->table('login_attempts')->where([
                'ip_address' => $ip,
            ])->first();

            $newAttempts = ($attempt->attempts ?? 0) + 1;

            $dataToUpdate = [
                'attempts' => $newAttempts,
                'last_login' => now(),
                'updated_at' => now(),
            ];

            if ($newAttempts >= 3 && ! optional($attempt)->blocked_at) {
                $dataToUpdate['blocked_at'] = now();
            }

            if ($attempt) {
                centralDB()->table('login_attempts')->where('id', $attempt->id)->update($dataToUpdate);
            } else {
                centralDB()->table('login_attempts')->insert(array_merge($dataToUpdate, [
                    'ip_address' => $ip,
                    'user_id' => null,
                    'user_type' => $userType,
                    'tenant_domain' => $tenantDomain,
                    'created_at' => now(),
                ]));
            }

            $left = 3 - $newAttempts;

            return back()->withErrors([
                'email' => $left <= 0
                    ? __('Your access has been blocked due to too many failed login.')
                    : __("No account found with this email address. You have {$left} remains left."),
            ]);
        }

        if ($user->status === 'blocked') {
            return back()->withErrors([
                'email' => __('Your account has been blocked due to multiple failed login. Please contact administrator.'),
            ]);
        }

        if ($user->status === 'inactive') {
            return back()->withErrors([
                'email' => __('Your account is inactive. Please contact administrator.'),
            ]);
        }

        if (! Auth::guard('web')->attempt($credentials)) {

            $attempt = centralDB()->table('login_attempts')->where([
                'ip_address' => $ip,
                'user_id' => $user->id,
                'user_type' => $userType,
                'tenant_domain' => $tenantDomain,
            ])->first();

            $newAttempts = ($attempt->attempts ?? 0) + 1;

            $dataToUpdate = [
                'attempts' => $newAttempts,
                'last_login' => now(),
                'updated_at' => now(),
            ];

            if ($newAttempts >= 3 && ! optional($attempt)->blocked_at) {
                $dataToUpdate['blocked_at'] = now();
                $user->update(['status' => 'blocked']);
            }

            if ($attempt) {
                centralDB()->table('login_attempts')->where('id', $attempt->id)->update($dataToUpdate);
            } else {
                centralDB()->table('login_attempts')->insert(array_merge($dataToUpdate, [
                    'ip_address' => $ip,
                    'user_id' => $user->id,
                    'user_type' => $userType,
                    'tenant_domain' => $tenantDomain,
                    'created_at' => now(),
                ]));
            }

            $left = 3 - $newAttempts;

            return back()->withErrors([
                'email' => $left <= 0
                    ? __('Your account has been blocked due to multiple failed login.')
                    : __("Incorrect password. You have {$left} remains left."),
            ]);
        }

        centralDB()->table('login_attempts')->where([
            'ip_address' => $ip,
            'user_id' => $user->id,
            'user_type' => $userType,
            'tenant_domain' => $tenantDomain,
        ])->delete();

        $request->session()->regenerate();
        session()->put('user_id', Auth::id());

        // redirect base on rule
        $role = Auth::user()->role;
        if ($role === 'agent') {
            return redirect()->route('tenant.dashboard');
        } elseif ($role === 'client') {
            return redirect()->route('client.dashboard');
        }
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('tenant.login');
    }

    public function ssoCentralLogin(Request $request)
    {
        try {
            $email = decrypt($request->token);

            $userData = centralDB()->table('users')->where('email', $email)->first();

            if (! $userData) {
                abort(401, 'User not found.');
            }

            $tempUser = new User;
            $tempUser->id = $userData->id;
            $tempUser->name = $userData->name;
            $tempUser->email = $userData->email;
            $tempUser->password = $userData->password;
            $tempUser->status = 'active';
            $tempUser->is_admin = 1;
            $tempUser->central_activation = true;

            auth()->login($tempUser);

            return redirect()->route('tenant.dashboard');
        } catch (Exception $e) {
            Log::error('SSO Login Error: '.$e->getMessage());

            abort(401, 'Invalid or expired SSO token.');
        }
    }

    public function ssoTenantLogin(Request $request)
    {
        try {
            $email = decrypt($request->token);
            $user = User::where('email', $email)->firstOrFail();
            auth()->login($user);
            session(['skip_2fa_once' => true]);
            session()->put('logged_in_as', $user->email);

            return redirect()->route('tenant.dashboard');
        } catch (Exception $e) {
            Log::error('SSO Login Error: '.$e->getMessage());

            abort(401, 'Invalid or expired SSO token.');
        }
    }
}
