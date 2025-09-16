<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CentralAppSetting extends Model
{
    protected $fillable = [
        'app_name',
        'author_name',
        'app_email',
        'app_phone',
        'app_logo',
        'dark_logo',
        'favicon',
        'footer_copyright_text',
        'mail_driver',
        'host',
        'port',
        'username',
        'password',
        'encryption',
        'mail_from_name',
        'mail_from_address',
        'recaptcha_site_key',
        'recaptcha_secret_key',
        'recaptcha_status',
        'stripe_public_key',
        'stripe_secret_key',
        'stripe_webhook_secret',
        'stripe_enabled',
        'stripe_mode',
        'paypal_client_id',
        'paypal_client_secret',
        'paypal_webhook_id',
        'paypal_enabled',
        'paypal_mode',
        'default_currency',
        'accepted_currencies',
        'auto_billing_enabled',
        'payment_due_days',
        'late_fee_percentage',
        'send_payment_reminders',
        'default_trial_days',
        'trial_requires_payment_method',
    ];

    protected $casts = [
        'app_logo' => 'string',
        'favicon' => 'string',
        'stripe_enabled' => 'boolean',
        'paypal_enabled' => 'boolean',
        'auto_billing_enabled' => 'boolean',
        'send_payment_reminders' => 'boolean',
        'trial_requires_payment_method' => 'boolean',
        'recaptcha_status' => 'boolean',
        'accepted_currencies' => 'array',
        'late_fee_percentage' => 'decimal:2',
        'payment_due_days' => 'integer',
        'default_trial_days' => 'integer',
    ];

    public function getLogoUrlAttribute()
    {
        return $this->app_logo ? asset('storage/'.$this->app_logo) : null;
    }

    public function getFaviconUrlAttribute()
    {
        return $this->favicon ? asset('storage/'.$this->favicon) : null;
    }

    public function getFooterTextAttribute()
    {
        return $this->footer_copyright_text ?: '© '.date('Y').' '.$this->app_name.'. All rights reserved.';
    }

    public function getEnabledPaymentMethodsAttribute()
    {
        $methods = [];
        if ($this->stripe_enabled) {
            $methods[] = 'stripe';
        }
        if ($this->paypal_enabled) {
            $methods[] = 'paypal';
        }
        if ($this->bank_transfer_enabled) {
            $methods[] = 'bank_transfer';
        }

        return $methods;
    }

    public function getAvailableCurrenciesAttribute()
    {
        return $this->accepted_currencies ?: ['USD'];
    }

    public function isStripeConfigured()
    {
        return $this->stripe_enabled &&
               ! empty($this->stripe_public_key) &&
               ! empty($this->stripe_secret_key);
    }

    public function isPaypalConfigured()
    {
        return $this->paypal_enabled &&
               ! empty($this->paypal_client_id) &&
               ! empty($this->paypal_client_secret);
    }

    public function isBankTransferConfigured()
    {
        return $this->bank_transfer_enabled &&
               ! empty($this->bank_name) &&
               ! empty($this->bank_account_number);
    }
}
