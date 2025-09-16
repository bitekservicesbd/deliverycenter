<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentReminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'type',
        'stripe_checkout_url',
        'stripe_checkout_session_id',
        'sent_at',
        'expires_at',
        'is_clicked',
        'clicked_at',
        'email_data',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'expires_at' => 'datetime',
        'clicked_at' => 'datetime',
        'is_clicked' => 'boolean',
        'email_data' => 'array',
    ];

    /**
     * Reminder types
     */
    const TYPE_PAYMENT_DUE_SOON = 'payment_due_soon';

    const TYPE_PAYMENT_DUE_TODAY = 'payment_due_today';

    const TYPE_PAYMENT_OVERDUE = 'payment_overdue';

    const TYPE_TRIAL_ENDING = 'trial_ending';

    const TYPE_FINAL_WARNING = 'final_warning';

    /**
     * Get the tenant that owns the reminder
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    /**
     * Scope for sent reminders
     */
    public function scopeSent($query)
    {
        return $query->whereNotNull('sent_at');
    }

    /**
     * Scope for pending reminders
     */
    public function scopePending($query)
    {
        return $query->whereNull('sent_at');
    }

    /**
     * Scope for clicked reminders
     */
    public function scopeClicked($query)
    {
        return $query->where('is_clicked', true);
    }

    /**
     * Scope for expired reminders
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now());
    }

    /**
     * Get human readable type
     */
    public function getTypeNameAttribute(): string
    {
        return match ($this->type) {
            self::TYPE_PAYMENT_DUE_SOON => 'Payment Due Soon',
            self::TYPE_PAYMENT_DUE_TODAY => 'Payment Due Today',
            self::TYPE_PAYMENT_OVERDUE => 'Payment Overdue',
            self::TYPE_TRIAL_ENDING => 'Trial Ending',
            self::TYPE_FINAL_WARNING => 'Final Warning',
            default => ucfirst(str_replace('_', ' ', $this->type))
        };
    }

    /**
     * Get urgency level for UI styling
     */
    public function getUrgencyLevelAttribute(): string
    {
        return match ($this->type) {
            self::TYPE_PAYMENT_DUE_SOON => 'info',
            self::TYPE_PAYMENT_DUE_TODAY => 'warning',
            self::TYPE_PAYMENT_OVERDUE => 'danger',
            self::TYPE_TRIAL_ENDING => 'warning',
            self::TYPE_FINAL_WARNING => 'danger',
            default => 'info'
        };
    }

    /**
     * Check if reminder is still valid (not expired)
     */
    public function isValid(): bool
    {
        return $this->expires_at === null || $this->expires_at->isFuture();
    }

    /**
     * Check if reminder has been sent
     */
    public function isSent(): bool
    {
        return $this->sent_at !== null;
    }

    /**
     * Mark reminder as sent
     */
    public function markAsSent(): void
    {
        $this->update(['sent_at' => now()]);
    }

    /**
     * Mark reminder as clicked
     */
    public function markAsClicked(): void
    {
        $this->update([
            'is_clicked' => true,
            'clicked_at' => now(),
        ]);
    }

    /**
     * Get all reminder types
     */
    public static function getAllTypes(): array
    {
        return [
            self::TYPE_PAYMENT_DUE_SOON,
            self::TYPE_PAYMENT_DUE_TODAY,
            self::TYPE_PAYMENT_OVERDUE,
            self::TYPE_TRIAL_ENDING,
            self::TYPE_FINAL_WARNING,
        ];
    }
}
