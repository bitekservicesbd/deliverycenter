<?php

namespace App\Http\Requests;

use App\Models\CentralAppSetting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CentralAppSettingsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        $appSettings = CentralAppSetting::first();
        switch ($this->route()->getName()) {

            case 'central.settings.general.update':
                return [
                    'app_name' => 'required|string|max:255',
                    'author_name' => 'required|string|max:255',
                    'app_email' => 'required|email|max:255',
                    'app_phone' => 'nullable|string|max:20',
                    'app_logo' => [
                        Rule::requiredIf(! $appSettings || ! $appSettings->app_logo),
                        'nullable',
                        Rule::when(
                            fn () => request()->hasFile('app_logo'),
                            ['file', 'mimes:jpeg,png,jpg,svg', 'max:5120']
                        ),
                    ],
                    'dark_logo' => [
                        Rule::requiredIf(! $appSettings || ! $appSettings->dark_logo),
                        'nullable',
                        Rule::when(
                            fn () => request()->hasFile('dark_logo'),
                            ['file', 'mimes:jpeg,png,jpg,svg', 'max:5120']
                        ),
                    ],
                    'favicon' => [
                        Rule::requiredIf(! $appSettings || ! $appSettings->favicon),
                        'nullable',
                        Rule::when(
                            fn () => request()->hasFile('favicon'),
                            ['file', 'mimes:jpeg,png,jpg,svg', 'max:5120']
                        ),
                    ],
                    'footer_copyright_text' => 'nullable|string|max:500',
                ];

            case 'central.settings.mail.update':
                return [
                    'mail_driver' => 'required|string',
                    'host' => 'required|string',
                    'port' => 'required|numeric',
                    'username' => 'required|string',
                    'password' => 'nullable|string',
                    'encryption' => 'required|string',
                    'mail_from_name' => 'required|string',
                    'mail_from_address' => 'required|email',
                ];

            case 'central.settings.recaptcha.update':
                return [
                    'recaptcha_site_key' => 'required|string',
                    'recaptcha_secret_key' => 'required|string',
                    'recaptcha_status' => 'nullable|boolean',
                ];

            case 'central.settings.aws.update':
                return [
                    'aws_access_key_id' => ['required', 'string'],
                    'aws_secret_access_key' => ['required', 'string'],
                    'aws_default_region' => ['required', 'string'],
                    'aws_bucket' => ['required', 'string'],
                    'aws_url' => ['nullable', 'url'],
                ];

            case 'central.settings.payment.update':
                return [
                    // Stripe Settings
                    'stripe_enabled' => 'nullable|boolean',
                    'stripe_public_key' => [
                        Rule::requiredIf($this->boolean('stripe_enabled')),
                        'nullable',
                        'string',
                    ],
                    'stripe_secret_key' => [
                        Rule::requiredIf($this->boolean('stripe_enabled')),
                        'nullable',
                        'string',
                    ],
                    'stripe_webhook_secret' => 'nullable|string',
                    'stripe_mode' => [
                        Rule::requiredIf($this->boolean('stripe_enabled')),
                        'nullable',
                        Rule::in(['sandbox', 'live']),
                    ],

                    // PayPal Settings
                    'paypal_enabled' => 'nullable|boolean',
                    'paypal_client_id' => [
                        Rule::requiredIf($this->boolean('paypal_enabled')),
                        'nullable',
                        'string',
                    ],
                    'paypal_client_secret' => [
                        Rule::requiredIf($this->boolean('paypal_enabled')),
                        'nullable',
                        'string',
                    ],
                    'paypal_webhook_id' => 'nullable|string',
                    'paypal_mode' => [
                        Rule::requiredIf($this->boolean('paypal_enabled')),
                        'nullable',
                        Rule::in(['sandbox', 'live']),
                    ],

                    // General Payment Settings
                    'default_currency' => [
                        'required',
                        'string',
                        'size:3',
                        Rule::in(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
                    ],
                    'accepted_currencies' => 'nullable|array',
                    'accepted_currencies.*' => [
                        'string',
                        'size:3',
                        Rule::in(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
                    ],
                    'auto_billing_enabled' => 'nullable|boolean',
                    'payment_due_days' => 'required|integer|min:1|max:30',
                    'late_fee_percentage' => 'nullable|numeric|min:0|max:100',
                    'send_payment_reminders' => 'nullable|boolean',

                    // Trial Settings
                    'default_trial_days' => 'required|integer|min:0|max:365',
                    'trial_requires_payment_method' => 'nullable|boolean',
                ];

            default:
                return [];
        }
    }

    public function messages()
    {
        return [
            'stripe_public_key.required_if' => 'Stripe public key is required when Stripe is enabled.',
            'stripe_secret_key.required_if' => 'Stripe secret key is required when Stripe is enabled.',
            'stripe_mode.required_if' => 'Stripe mode is required when Stripe is enabled.',
            'paypal_client_id.required_if' => 'PayPal client ID is required when PayPal is enabled.',
            'paypal_client_secret.required_if' => 'PayPal client secret is required when PayPal is enabled.',
            'paypal_mode.required_if' => 'PayPal mode is required when PayPal is enabled.',
            'default_currency.in' => 'Selected currency is not supported.',
            'accepted_currencies.*.in' => 'One or more selected currencies are not supported.',
        ];
    }
}
