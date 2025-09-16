<?php

namespace App\Services;

use App\Models\CentralAppSetting;
use App\Models\PaymentHistory;
use App\Models\PaymentReminder;
use App\Models\Tenant;
use Illuminate\Support\Facades\Log;
use Stripe\Checkout\Session;
use Stripe\Customer;
use Stripe\Stripe;

class StripePaymentService
{
    private $stripeSecretKey;

    private $stripePublicKey;

    protected $settings;

    public function __construct()
    {
        $this->stripeSecretKey = env('STRIPE_SECRET_KEY');
        $this->stripePublicKey = env('STRIPE_PUBLIC_KEY');
    }

    protected function loadSettings(): void
    {
        if (! $this->settings) {
            $this->settings = CentralAppSetting::first();

            $this->stripeSecretKey = $this->settings->stripe_secret_key ?? $this->stripeSecretKey;
            $this->stripePublicKey = $this->settings->stripe_public_key ?? $this->stripePublicKey;
        }
    }

    public function createOrGetCustomer(Tenant $tenant): ?Customer
    {
        try {
            if ($tenant->stripe_customer_id) {
                try {
                    return Customer::retrieve($tenant->stripe_customer_id);
                } catch (\Exception $e) {
                    Log::warning("Stripe customer not found: {$tenant->stripe_customer_id}");
                }
            }

            $customer = Customer::create([
                'email' => $tenant->user->email,
                'name' => $tenant->user->name,
                'description' => "Customer for tenant: {$tenant->company_name} ({$tenant->id})",
                'metadata' => [
                    'tenant_id' => $tenant->id,
                    'company_name' => $tenant->company_name,
                    'plan_id' => $tenant->plan_id,
                ],
            ]);

            $tenant->update(['stripe_customer_id' => $customer->id]);

            return $customer;
        } catch (\Exception $e) {
            Log::error("Failed to create Stripe customer for tenant {$tenant->id}: ".$e->getMessage());

            return null;
        }
    }

    public function createCheckoutSession(Tenant $tenant, string $reminderType = 'payment_due'): ?array
    {
        try {
            $this->loadSettings();

            if ($this->stripeSecretKey) {
                Stripe::setApiKey($this->stripeSecretKey);
            }

            $customer = $this->createOrGetCustomer($tenant);
            if (! $customer) {
                throw new \Exception('Failed to create Stripe customer');
            }

            $plan = $tenant->plan;
            $amount = $this->calculatePaymentAmount($tenant);

            if (! $amount || $amount <= 0) {
                throw new \Exception('Invalid payment amount');
            }
            $metadata = [
                'tenant_id' => $tenant->id,
                'plan_id' => $tenant->plan_id,
                'reminder_type' => $reminderType,
                'billing_cycle' => $this->getBillingCycle($tenant),
            ];

            $session = Session::create([
                'customer' => $customer->id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => $plan->currency ?? 'usd',
                        'product_data' => [
                            'name' => "Payment for {$plan->name}",
                            'description' => "Subscription payment for {$tenant->company_name}",
                        ],
                        'unit_amount' => $amount * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('stripe.payment.success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('stripe.payment.cancel', ['tenant' => $tenant->id]),
                'expires_at' => now()->addHours(23)->timestamp,
                'metadata' => $metadata,
                'payment_intent_data' => [
                    'metadata' => $metadata, // will appear on PaymentIntent
                ],
                'automatic_tax' => ['enabled' => false],
                'billing_address_collection' => 'auto',
                'customer_update' => [
                    'address' => 'auto',
                    'name' => 'auto',
                ],
            ]);

            PaymentHistory::create([
                'tenant_id' => $tenant->id,
                'stripe_checkout_session_id' => $session->id,
                'stripe_customer_id' => $customer->id,
                'amount' => $amount,
                'currency' => $plan->currency ?? 'USD',
                'status' => 'pending',
                'payment_method' => 'stripe',
                'stripe_metadata' => [
                    'checkout_session_id' => $session->id,
                    'reminder_type' => $reminderType,
                    'billing_cycle' => $this->getBillingCycle($tenant),
                ],
            ]);

            return [
                'session_id' => $session->id,
                'checkout_url' => $session->url,
                'expires_at' => $session->expires_at,
                'customer_id' => $customer->id,
                'amount' => $amount,
                'currency' => $plan->currency ?? 'USD',
            ];
        } catch (\Exception $e) {
            Log::error("Failed to create checkout session for tenant {$tenant->id}: ".$e->getMessage());

            return null;
        }
    }

    private function calculatePaymentAmount(Tenant $tenant): float
    {
        $plan = $tenant->plan;
        $billingCycle = $this->getBillingCycle($tenant);

        return match ($billingCycle) {
            'monthly' => $plan->monthly_price ?? 0,
            'yearly' => $plan->yearly_price ?? 0,
            'custom' => $plan->custom_price ?? 0,
            default => $plan->monthly_price ?? 0,
        };
    }

    private function getBillingCycle(Tenant $tenant): string
    {
        return $tenant->billing_cycle ?? $tenant->plan->billing_cycle ?? 'monthly';
    }

    public function processSuccessfulPayment(string $sessionId): bool
    {
        try {
            $session = Session::retrieve($sessionId);
            $tenantId = $session->metadata->tenant_id ?? null;

            if (! $tenantId) {
                Log::error("No tenant_id in session metadata: {$sessionId}");

                return false;
            }

            $tenant = Tenant::find($tenantId);
            if (! $tenant) {
                Log::error("Tenant not found: {$tenantId}");

                return false;
            }

            $paymentHistory = PaymentHistory::where('stripe_checkout_session_id', $sessionId)->first();
            if ($paymentHistory) {
                $paymentHistory->update([
                    'status' => 'succeeded',
                    'stripe_payment_intent_id' => $session->payment_intent,
                    'paid_at' => now(),
                ]);
            }

            $this->updateTenantAfterPayment($tenant, $session);

            PaymentReminder::where('tenant_id', $tenantId)
                ->where('stripe_checkout_session_id', $sessionId)
                ->update(['is_clicked' => true, 'clicked_at' => now()]);

            Log::info("Payment processed successfully for tenant: {$tenantId}");

            return true;
        } catch (\Exception $e) {
            Log::error("Failed to process successful payment for session {$sessionId}: ".$e->getMessage());

            return false;
        }
    }

    private function updateTenantAfterPayment(Tenant $tenant, Session $session): void
    {
        $billingCycle = $session->metadata->billing_cycle ?? 'monthly';
        $extendMonths = $billingCycle === 'yearly' ? 12 : 1;

        $nextBillingDate = $tenant->next_billing_date
            ? \Carbon\Carbon::parse($tenant->next_billing_date)->addMonths($extendMonths)
            : now()->addMonths($extendMonths);

        $tenant->update([
            'status' => 'active',
            'payment_status' => 'paid',
            'next_billing_date' => $nextBillingDate,
            'payment_method' => 'stripe',
            'notes' => ($tenant->notes ?? '')."\nStripe payment received: ".($session->amount_total / 100).' '.$session->currency.' on '.now()->format('Y-m-d H:i'),
        ]);
    }

    public function processFailedPayment(string $sessionId): bool
    {
        try {
            $session = Session::retrieve($sessionId);
            $tenantId = $session->metadata->tenant_id ?? null;

            if (! $tenantId) {
                return false;
            }

            $paymentHistory = PaymentHistory::where('stripe_checkout_session_id', $sessionId)->first();
            if ($paymentHistory) {
                $paymentHistory->update([
                    'status' => 'failed',
                    'failure_reason' => 'Payment session expired or canceled',
                ]);
            }

            Log::info("Payment failed/canceled for tenant: {$tenantId}");

            return true;
        } catch (\Exception $e) {
            Log::error("Failed to process failed payment for session {$sessionId}: ".$e->getMessage());

            return false;
        }
    }

    public function isConfigured(): bool
    {
        $this->loadSettings();

        return ! empty($this->stripeSecretKey) && ! empty($this->stripePublicKey);
    }

    public function getPublicKey(): ?string
    {
        $this->loadSettings();

        return $this->stripePublicKey;
    }
}
