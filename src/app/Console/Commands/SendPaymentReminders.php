<?php

namespace App\Console\Commands;

use App\Mail\PaymentReminderMail;
use App\Models\CentralAppSetting;
use App\Models\PaymentReminder;
use App\Models\Tenant;
use App\Services\StripePaymentService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendPaymentReminders extends Command
{
    protected $signature = 'payments:send-reminders {--dry-run : Show what would be sent without actually sending}';

    protected $description = 'Send automated payment reminders to tenants based on their billing schedule';

    private $stripePaymentService;

    private $settings;

    public function __construct(StripePaymentService $stripePaymentService)
    {
        parent::__construct();
        $this->stripePaymentService = $stripePaymentService;
    }

    public function handle()
    {
        $this->settings = CentralAppSetting::first();

        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->info('🔍 DRY RUN MODE - No emails will be sent');
        }

        $this->info('🚀 Starting payment reminder system...');

        // Check if Stripe is configured
        if (! $this->stripePaymentService->isConfigured()) {
            $this->error('❌ Stripe is not configured. Please configure Stripe in payment settings.');

            return Command::FAILURE;
        }

        $totalSent = 0;

        // Process different reminder types
        $totalSent += $this->processPaymentDueSoon($isDryRun);
        $totalSent += $this->processPaymentDueToday($isDryRun);
        $totalSent += $this->processPaymentOverdue($isDryRun);
        $totalSent += $this->processTrialEnding($isDryRun);
        $totalSent += $this->processFinalWarning($isDryRun);

        if ($isDryRun) {
            $this->info("✨ DRY RUN COMPLETE - Would have sent {$totalSent} reminders");
        } else {
            $this->info("✅ Payment reminder system completed - Sent {$totalSent} reminders");
        }

        return Command::SUCCESS;
    }

    /**
     * Process tenants with payments due in 3 days
     */
    private function processPaymentDueSoon(bool $isDryRun): int
    {
        $threeDaysFromNow = Carbon::now()->addDays(3)->startOfDay();

        $tenants = Tenant::where('data->status', 'active')
            ->where('data->payment_status', 'paid')
            ->whereDate('data->next_billing_date', $threeDaysFromNow)
            ->whereDoesntHave('paymentReminders', function ($query) use ($threeDaysFromNow) {
                $query->where('type', PaymentReminder::TYPE_PAYMENT_DUE_SOON)
                    ->whereDate('created_at', $threeDaysFromNow);
            })
            ->with(['user', 'plan'])
            ->get();

        return $this->sendRemindersForTenants(
            $tenants,
            PaymentReminder::TYPE_PAYMENT_DUE_SOON,
            '💰 Payment Due Soon (3 days)',
            $isDryRun
        );
    }

    /**
     * Process tenants with payments due today
     */
    private function processPaymentDueToday(bool $isDryRun): int
    {
        $today = Carbon::now()->startOfDay();

        $tenants = Tenant::where('data->status', 'active')
            ->where('data->payment_status', 'paid')
            ->whereDate('data->next_billing_date', $today)
            ->whereDoesntHave('paymentReminders', function ($query) use ($today) {
                $query->where('type', PaymentReminder::TYPE_PAYMENT_DUE_TODAY)
                    ->whereDate('created_at', $today);
            })
            ->with(['user', 'plan'])
            ->get();

        return $this->sendRemindersForTenants(
            $tenants,
            PaymentReminder::TYPE_PAYMENT_DUE_TODAY,
            '⏰ Payment Due Today',
            $isDryRun
        );
    }

    /**
     * Process tenants with overdue payments
     */
    private function processPaymentOverdue(bool $isDryRun): int
    {
        $overdueDate = Carbon::now()->subDays(2)->startOfDay();

        $tenants = Tenant::where('data->status', 'active')
            ->where('data->payment_status', '!=', 'paid')
            ->whereDate('data->next_billing_date', '<', Carbon::now())
            ->whereDate('data->next_billing_date', '>=', $overdueDate)
            ->whereDoesntHave('paymentReminders', function ($query) {
                $query->where('type', PaymentReminder::TYPE_PAYMENT_OVERDUE)
                    ->whereDate('created_at', Carbon::today());
            })
            ->with(['user', 'plan'])
            ->get();

        return $this->sendRemindersForTenants(
            $tenants,
            PaymentReminder::TYPE_PAYMENT_OVERDUE,
            '🚨 Payment Overdue',
            $isDryRun
        );
    }

    /**
     * Process tenants with trials ending soon
     */
    private function processTrialEnding(bool $isDryRun): int
    {
        $threeDaysFromNow = Carbon::now()->addDays(3)->startOfDay();

        $tenants = Tenant::where('data->status', 'trial')
            ->whereDate('data->trial_ends_at', $threeDaysFromNow)
            ->whereDoesntHave('paymentReminders', function ($query) use ($threeDaysFromNow) {
                $query->where('type', PaymentReminder::TYPE_TRIAL_ENDING)
                    ->whereDate('created_at', $threeDaysFromNow);
            })
            ->with(['user', 'plan'])
            ->get();

        return $this->sendRemindersForTenants(
            $tenants,
            PaymentReminder::TYPE_TRIAL_ENDING,
            '⌛ Trial Ending Soon',
            $isDryRun
        );
    }

    /**
     * Process tenants for final warning (7 days overdue)
     */
    private function processFinalWarning(bool $isDryRun): int
    {
        // $sevenDaysAgo = Carbon::now()->subDays(7)->startOfDay();
        $paymentDueDays = $this->settings->payment_due_days ?? 7;

        $tenants = Tenant::where('data->status', '!=', 'suspended')
            ->where('data->payment_status', '!=', 'paid')
            ->whereDate('data->next_billing_date', '<', Carbon::now()->subDays($paymentDueDays))
            ->whereDoesntHave('paymentReminders', function ($query) {
                $query->where('type', PaymentReminder::TYPE_FINAL_WARNING)
                    ->whereDate('created_at', Carbon::today());
            })
            ->with(['user', 'plan'])
            ->get();

        return $this->sendRemindersForTenants(
            $tenants,
            PaymentReminder::TYPE_FINAL_WARNING,
            '⚠️ Final Warning - Service Suspension',
            $isDryRun
        );
    }

    /**
     * Send reminders for a collection of tenants
     */
    private function sendRemindersForTenants($tenants, string $reminderType, string $description, bool $isDryRun): int
    {
        if ($tenants->isEmpty()) {
            $this->line("   No tenants found for: {$description}");

            return 0;
        }

        $this->info("📧 Processing {$description}: {$tenants->count()} tenants");
        $sent = 0;

        foreach ($tenants as $tenant) {
            try {
                if ($isDryRun) {
                    $this->line("   Would send to: {$tenant->user->email} ({$tenant->company_name})");
                    $sent++;

                    continue;
                }

                // Generate Stripe checkout link
                $checkoutData = $this->stripePaymentService->createCheckoutSession($tenant, $reminderType);

                Log::debug("Generated checkout data for tenant {$tenant->id} of type {$reminderType}", [
                    'checkout_data' => $checkoutData,
                ]);

                if (! $checkoutData) {
                    $this->error("   Failed to generate payment link for: {$tenant->company_name}");

                    continue;
                }

                // Create payment reminder record
                $reminder = PaymentReminder::create([
                    'tenant_id' => $tenant->id,
                    'type' => $reminderType,
                    'stripe_checkout_url' => $checkoutData['checkout_url'],
                    'stripe_checkout_session_id' => $checkoutData['session_id'],
                    'expires_at' => Carbon::now()->addDays(7),
                    'email_data' => [
                        'amount' => $checkoutData['amount'],
                        'currency' => $checkoutData['currency'],
                        'plan_name' => $tenant->plan->name,
                    ],
                ]);

                Log::debug("Payment reminder created for tenant {$tenant->id} of type {$reminderType}", [
                    'reminder' => $reminder,
                ]);

                if (! $reminder) {
                    $this->error("   ❌ Failed to create reminder for: {$tenant->company_name}");

                    continue;
                }

                // Send email
                Mail::to($tenant->user->email)->queue(new PaymentReminderMail($tenant, $reminder));

                // Mark reminder as sent
                $reminder->markAsSent();

                $this->line("   ✅ Sent to: {$tenant->user->email} ({$tenant->company_name})");
                $sent++;

                // Small delay to avoid overwhelming email servers
                usleep(100000);

            } catch (\Exception $e) {
                $this->error("   ❌ Failed to send to {$tenant->company_name}: ".$e->getMessage());
                Log::error("Payment reminder failed for tenant {$tenant->id}: ".$e->getMessage());
            }
        }

        $this->info("   📊 Sent: {$sent}/{$tenants->count()} for {$description}");

        return $sent;
    }
}
