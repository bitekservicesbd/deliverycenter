<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Google2FAMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        if (session()->pull('skip_2fa_once')) {
            session(['google2fa_passed' => true]);

            return $next($request);
        }

        if (! session()->get('google2fa_passed') && auth()->user()->google2fa_secret) {
            if ($request->isMethod('post')) {
                $request->validate([
                    'otp' => 'required|digits:6',
                ]);

                $google2fa = app('pragmarx.google2fa');

                if ($google2fa->verifyKey(auth()->user()->google2fa_secret, $request->otp)) {
                    session(['google2fa_passed' => true]);

                    return redirect()->intended(
                        route(tenant() ? 'tenant.dashboard' : 'dashboard')
                    );
                }

                return back()->withErrors(['otp' => 'Invalid OTP.']);
            }

            return Inertia::render(tenant() ? 'tenants/2fa/verify' : '2fa/verify', [
                'errors' => session('errors') ?: [],
            ]);
        }

        return $next($request);
    }
}
