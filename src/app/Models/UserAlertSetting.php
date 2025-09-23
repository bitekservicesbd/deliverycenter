<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAlertSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'new_order_email',
        'new_order_sms',
        'dispatch_email',
        'dispatch_sms',
        'quote_email',
        'quote_sms',
        'pickup_email',
        'pickup_sms',
        'delivered_email',
        'delivered_sms',
        'cancelled_email',
        'cancelled_sms',
        'invoice_alerts',
        'statement_alerts'
    ];

    protected $casts = [
        'new_order_email' => 'boolean',
        'new_order_sms' => 'boolean',
        'dispatch_email' => 'boolean',
        'dispatch_sms' => 'boolean',
        'quote_email' => 'boolean',
        'quote_sms' => 'boolean',
        'pickup_email' => 'boolean',
        'pickup_sms' => 'boolean',
        'delivered_email' => 'boolean',
        'delivered_sms' => 'boolean',
        'cancelled_email' => 'boolean',
        'cancelled_sms' => 'boolean',
        'invoice_alerts' => 'boolean',
        'statement_alerts' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}