<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Models\LoginAttempt;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BlockedIpController extends Controller
{
    public function index()
    {
        $loginAttempt = LoginAttempt::whereNotNull('blocked_at')
            ->latest()
            ->get();

        $loginAttempts = $loginAttempt->map(function ($attempt) {
            if (empty($attempt->tenant_domain)) {
                $email = optional($attempt->user)->email ?? '-';
            } else {
                try {
                    $email = tenantDB($attempt->tenant_domain)
                        ->table('users')
                        ->where('id', $attempt->user_id)
                        ->value('email') ?? '-';
                } catch (Exception $e) {
                    Log::error('Tenant DB error: '.$e->getMessage());
                    $email = 'Error fetching';
                }
            }

            return [
                'id' => $attempt->id,
                'ip_address' => $attempt->ip_address,
                'blocked_at' => $attempt->blocked_at,
                'tenant_domain' => $attempt->tenant_domain,
                'user_type' => $attempt->user_type,
                'email' => $email,
                'last_login' => $attempt->last_login,
            ];
        });

        return Inertia::render('centrals/blocked-ip/index', [
            'loginAttempts' => $loginAttempts,
        ]);
    }

    public function delete($id)
    {
        try {
            $loginAttempt = LoginAttempt::find($id);
            $loginAttempt?->user?->update([
                'status' => 'active',
            ]);

            $loginAttempt->delete();

            return redirect()->back()->with('success', 'Deleted successfully');
        } catch (Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
