<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class SetCookieMiddleware extends Middleware
{
    /**
     * Get the path the user should be redirected to when not authenticated.
     */
    // protected function redirectTo(Request $request)
    // {
    //     if (! $request->expectsJson()) {
    //         return route('api.v1.tenant.auth.login');
    //     }

    //     return null;
    // }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  ...$guards
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        if (! $request->headers->has('authorization')) {
            if ($token = $request->cookie('auth_token')) {

                $bearer = 'Bearer '.$token;

                // Set both the header bag and the server param for maximum compatibility.
                $request->headers->set('Authorization', $bearer);
                $request->server->set('HTTP_AUTHORIZATION', $bearer);
            }
        }

        return $next($request);
    }
}
