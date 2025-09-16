<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\LoginAttempt;
use App\Models\Tenant;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $ip = $request->ip();
        $userType = 'central';
        $tenantDomain = null;
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();

        if (! $user) {
            $attempt = LoginAttempt::firstOrNew([
                'ip_address' => $ip,
                'user_id' => null,
                'user_type' => $userType,
                'tenant_domain' => $tenantDomain,
            ]);

            $attempt->attempts = ($attempt->attempts ?? 0) + 1;
            $attempt->last_login = now();

            if ($attempt->attempts >= 3 && ! $attempt->blocked_at) {
                $attempt->blocked_at = now();
            }

            $attempt->save();
            $left = max(0, 3 - $attempt->attempts);

            return back()->withErrors([
                'email' => __("No account found with this email address.  You have {$left} remains left."),
            ]);
        }

        if ($user->status === 'blocked') {
            return back()->withErrors([
                'email' => __('Your account has been blocked. Please contact the administrator.'),
            ]);
        }

        $attempt = LoginAttempt::firstOrNew([
            'ip_address' => $ip,
            'user_id' => $user->id,
            'user_type' => $userType,
            'tenant_domain' => $tenantDomain,
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $attempt->attempts = 0;
            $attempt->blocked_at = null;
            $attempt->last_login = now();
            $attempt->save();

            if (auth()->user()->user_type === USER_TYPE_CENTRAL) {
                return redirect()->route('dashboard');
            } else {
                return redirect()->route('user.panel.index');
            }
        }

        $attempt->attempts = ($attempt->attempts ?? 0) + 1;
        $attempt->last_login = now();

        if ($attempt->attempts >= 3 && $user->status !== 'blocked') {
            $user->update(['status' => 'blocked']);
            $attempt->blocked_at = now();
            $attempt->save();

            return back()->withErrors([
                'email' => __('Your account has been blocked. Please contact the administrator.'),
            ]);
        }

        $attempt->save();

        $left = max(0, 3 - $attempt->attempts);

        return back()->withErrors([
            'email' => __("Incorrect password. You have {$left} remains left."),
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function loginAsCentralUser(Tenant $tenant)
    {
        $user = auth()->user();

        $token = encrypt($user->email);

        $appUrl = config('app.url');
        $scheme = parse_url($appUrl, PHP_URL_SCHEME) ?? 'http';
        $host = parse_url($appUrl, PHP_URL_HOST) ?? 'localhost';
        $port = parse_url($appUrl, PHP_URL_PORT) ?? '8000';

        $url = "{$scheme}://{$tenant->id}.{$host}";
        if ($port) {
            $url .= ":{$port}";
        }
        $url .= '/sso-central-login?token='.urlencode($token);

        return redirect()->away($url);
    }

    public function loginAsTenantUser(Tenant $tenant)
    {
        $user = auth()->user();

        $token = encrypt($user->email);

        $appUrl = config('app.url');
        $scheme = parse_url($appUrl, PHP_URL_SCHEME) ?? 'http';
        $host = parse_url($appUrl, PHP_URL_HOST) ?? 'localhost';
        $port = parse_url($appUrl, PHP_URL_PORT) ?? '8000';

        $url = "{$scheme}://{$tenant->id}.{$host}";
        if ($port) {
            $url .= ":{$port}";
        }
        $url .= '/sso-tenant-login?token='.urlencode($token);

        return redirect()->away($url);
    }

    public function loginAsUserPanel($email)
    {
        try {
            $user = User::where('email', $email)->first();
            auth()->login($user);

            return to_route('user.panel.index');
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }
}
