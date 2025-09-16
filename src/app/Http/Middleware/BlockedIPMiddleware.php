<?php

namespace App\Http\Middleware;

use App\Models\LoginAttempt;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlockedIPMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        if (! tenant()) {
            $blocked = LoginAttempt::where('ip_address', $ip)
                ->whereNotNull('blocked_at')
                ->first();
        } else {
            $blocked = centralDB()->table('login_attempts')->where('ip_address', $ip)
                ->whereNotNull('blocked_at')
                ->first();
        }

        if ($blocked) {
            abort(403, 'Your IP is blocked.');
        }

        return $next($request);
    }
}
