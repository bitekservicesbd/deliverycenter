<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $fillable = [
        'id',
        'company_name',
        'tenancy_db_name',
        'user_id',
        'plan_id',
        'status',
        'trial_ends_at',
        'next_billing_date',
        'payment_status',
        'payment_method',
        'created_by',
        'notes',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'next_billing_date' => 'datetime',
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    public function scopeOnTrial($query)
    {
        return $query->where('status', 'trial');
    }

    public function scopePaymentOverdue($query)
    {
        return $query->where('payment_status', 'overdue')
            ->orWhere('next_billing_date', '<', now());
    }

    public function activate()
    {
        $this->update([
            'status' => 'active',
            'payment_status' => 'paid',
        ]);
    }

    public function deactivate($reason = null)
    {
        $this->update([
            'status' => 'inactive',
            'notes' => $reason ? $this->notes."\nDeactivated: ".$reason : $this->notes,
        ]);
    }

    public function startTrial($days = null)
    {
        $settings = \App\Models\CentralAppSetting::first();
        $trialDays = $days ?: ($settings->default_trial_days ?? 14);

        $this->update([
            'status' => 'trial',
            'trial_ends_at' => now()->addDays($trialDays),
            'payment_status' => 'trial',
        ]);
    }

    // Payment Methods
    public function markPaymentReceived($amount, $method = 'manual', $notes = null)
    {
        $nextBilling = $this->plan && $this->plan->billing_cycle === 'yearly'
            ? now()->addYear()
            : now()->addMonth();

        $this->update([
            'status' => 'active',
            'payment_status' => 'paid',
            'next_billing_date' => $nextBilling,
            'payment_method' => $method,
            'notes' => $notes ? $this->notes."\nPayment: ".$notes : $this->notes,
        ]);
    }

    // Accessors
    public function getIsActiveAttribute()
    {
        return $this->status === 'active';
    }

    public function getIsOnTrialAttribute()
    {
        return $this->status === 'trial' &&
            $this->trial_ends_at &&
            $this->trial_ends_at->isFuture();
    }

    public function getTrialDaysRemainingAttribute()
    {
        if (! $this->trial_ends_at || $this->trial_ends_at->isPast()) {
            return 0;
        }

        return $this->trial_ends_at->diffInDays(now());
    }

    public function getPaymentOverdueDaysAttribute()
    {
        if (! $this->next_billing_date || $this->next_billing_date->isFuture()) {
            return 0;
        }

        return now()->diffInDays($this->next_billing_date);
    }

    public function getDaysUntilNextBillingAttribute()
    {
        if (! $this->next_billing_date || $this->next_billing_date->isPast()) {
            return 0;
        }

        return $this->next_billing_date->diffInDays(now());
    }

    /**
     * Get all payment histories for this tenant
     */
    public function paymentHistories(): HasMany
    {
        return $this->hasMany(PaymentHistory::class, 'tenant_id');
    }

    /**
     * Get all payment reminders for this tenant
     */
    public function paymentReminders(): HasMany
    {
        return $this->hasMany(PaymentReminder::class, 'tenant_id');
    }

    /**
     * Get successful payments only
     */
    public function successfulPayments(): HasMany
    {
        return $this->paymentHistories()->where('status', 'succeeded');
    }

    /**
     * Get pending/failed payments
     */
    public function failedPayments(): HasMany
    {
        return $this->paymentHistories()->whereIn('status', ['failed', 'canceled']);
    }

    /**
     * Get the latest payment history
     */
    public function latestPayment()
    {
        return $this->paymentHistories()->latest()->first();
    }

    /**
     * Get Stripe customer ID from latest payment
     */
    public function getStripeCustomerIdAttribute(): ?string
    {
        return $this->latestPayment()?->stripe_customer_id;
    }

    /**
     * Get total amount paid by this tenant
     */
    public function getTotalPaidAttribute(): float
    {
        return $this->successfulPayments()->sum('amount');
    }

    /**
     * Check if tenant has any pending payment reminders
     */
    public function hasPendingReminders(): bool
    {
        return $this->paymentReminders()
            ->whereNull('sent_at')
            ->exists();
    }

    /**
     * Get last payment reminder sent
     */
    public function getLastReminderSentAttribute(): ?string
    {
        $lastReminder = $this->paymentReminders()
            ->whereNotNull('sent_at')
            ->latest('sent_at')
            ->first();

        return $lastReminder?->sent_at;
    }

    /**
     * Count total reminders sent
     */
    public function getTotalRemindersSentAttribute(): int
    {
        return $this->paymentReminders()
            ->whereNotNull('sent_at')
            ->count();
    }
}
