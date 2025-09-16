<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id = tenant();

        if ($id->status === 'inactive') {
            return response()->view('error', [
                'title' => 'Account Inactive',
                'message' => 'Your account is currently inactive. Please contact the administrator for reactivation.',
            ], 401);
        } elseif ($id->status === 'suspended') {
            return response()->view('error', [
                'title' => 'Account Suspended',
                'message' => 'Your account has been suspended. Contact support for further assistance.',
            ], 401);
        } elseif ($id->payment_status === 'pending') {
            return response()->view('error', [
                'title' => 'Payment Pending',
                'message' => 'Your subscription payment is pending. Please complete your payment or contact support.',
            ], 401);
        } elseif ($id->payment_status === 'overdue') {
            return response()->view('error', [
                'title' => 'Subscription Overdue',
                'message' => 'Your subscription is overdue. Please renew your plan or reach out to the billing department.',
            ], 401);
        } elseif ($id->payment_status === 'failed') {
            return response()->view('error', [
                'title' => 'Payment Failed',
                'message' => 'Your payment attempt has failed. Please try again or contact support for help.',
            ], 401);
        }

        return $next($request);
    }
}
