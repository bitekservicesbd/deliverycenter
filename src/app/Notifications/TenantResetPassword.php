<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TenantResetPassword extends Notification
{
    public $token;

    public $email;

    public $tenant_id;

    public function __construct($token, $email, $tenant_id)
    {
        $this->token = $token;
        $this->email = $email;
        $this->tenant_id = $tenant_id;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $resetUrl = url(route('tenant.password.reset', [
            'token' => $this->token,
            'email' => $this->email,
            'tenant_id' => $this->tenant_id,
        ], false));

        return (new MailMessage)
            ->subject('Set Your Password')
            ->view('emails.reset-password', [
                'resetUrl' => $resetUrl,
            ]);
    }
}
