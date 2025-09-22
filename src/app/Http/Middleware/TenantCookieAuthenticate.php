<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class TenantCookieAuthenticate extends Middleware
{
    protected function redirectTo($request){
        if (! $request->expectsJson()) {
            return route('api.v1.tenant.auth.login');
        }
        return null;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$guards
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        // Check for token in cookies
        if ($request->hasCookie('tenant_token')) {
            $token = $request->cookie('tenant_token');
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return parent::handle($request, $next, ...$guards);
    }
}