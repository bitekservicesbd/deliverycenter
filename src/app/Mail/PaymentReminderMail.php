<?php

namespace App\Mail;

use App\Models\CentralAppSetting;
use App\Models\PaymentReminder;
use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tenant;

    public $reminder;

    public $settings;

    public function __construct(Tenant $tenant, PaymentReminder $reminder)
    {
        $this->tenant = $tenant;
        $this->reminder = $reminder;
        $this->settings = CentralAppSetting::first();
    }

    public function build()
    {
        $subject = $this->getSubjectForReminderType();
        $template = $this->getTemplateForReminderType();

        return $this->from($this->settings->app_email ?? config('mail.from.address'), $this->settings->app_name ?? config('app.name'))
            ->subject($subject)
            ->view($template)
            ->with([
                'tenant' => $this->tenant,
                'reminder' => $this->reminder,
                'settings' => $this->settings,
                'paymentUrl' => $this->reminder->stripe_checkout_url,
                'companyName' => $this->settings->app_name ?? config('app.name'),
                'planName' => $this->tenant->plan->name,
                'amount' => $this->reminder->email_data['amount'] ?? 0,
                'currency' => $this->reminder->email_data['currency'] ?? 'USD',
                'paymentLink' => $this->reminder->stripe_checkout_url,
                'dueDate' => $this->tenant->next_billing_date ? \Carbon\Carbon::parse($this->tenant->next_billing_date)->format('M d, Y') : null,
                'trialEndsAt' => $this->tenant->trial_ends_at ? \Carbon\Carbon::parse($this->tenant->trial_ends_at)->format('M d, Y') : null,
            ]);
    }

    /**
     * Get email subject based on reminder type
     */
    private function getSubjectForReminderType(): string
    {
        $companyName = $this->settings->app_name ?? config('app.name');

        return match ($this->reminder->type) {
            PaymentReminder::TYPE_PAYMENT_DUE_SOON => "Payment Due Soon - {$companyName}",
            PaymentReminder::TYPE_PAYMENT_DUE_TODAY => "Payment Due Today - {$companyName}",
            PaymentReminder::TYPE_PAYMENT_OVERDUE => "Payment Overdue - Action Required - {$companyName}",
            PaymentReminder::TYPE_TRIAL_ENDING => "Trial Ending Soon - {$companyName}",
            PaymentReminder::TYPE_FINAL_WARNING => "Final Notice - Account Suspension Warning - {$companyName}",
            default => "Payment Reminder - {$companyName}"
        };
    }

    /**
     * Get email template based on reminder type
     */
    private function getTemplateForReminderType(): string
    {
        return match ($this->reminder->type) {
            PaymentReminder::TYPE_PAYMENT_DUE_SOON => 'emails.payment.due-soon',
            PaymentReminder::TYPE_PAYMENT_DUE_TODAY => 'emails.payment.due-today',
            PaymentReminder::TYPE_PAYMENT_OVERDUE => 'emails.payment.overdue',
            PaymentReminder::TYPE_TRIAL_ENDING => 'emails.payment.trial-ending',
            PaymentReminder::TYPE_FINAL_WARNING => 'emails.payment.final-warning',
            default => 'emails.payment.general'
        };
    }
}
