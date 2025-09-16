<?php

namespace App\Listeners;

use App\Events\TenantProvisioned;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateTenantAdmin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TenantProvisioned $event)
    {
        tenancy()->initialize($event->tenant);

        $user = new User;
        $user->name = $event->user->name;
        $user->email = $event->user->email;
        $user->password = $event->user->password ?? Hash::make(Str::random(12));
        $user->role = 'agent';
        $user->email_verified_at = now();
        $user->save();

        tenancy()->end();
    }
}
