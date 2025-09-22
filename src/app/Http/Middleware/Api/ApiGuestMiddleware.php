<?php

namespace App\Http\Middleware\Api;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiGuestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If the user is authenticated, return a 403 Forbidden response
        if (auth('sanctum')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Already logged in.',
            ], 409);
        }

        return $next($request);
    }
}
