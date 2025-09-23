<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoDispatch extends Model
{
    use HasFactory;

    protected $table = 'auto_dispatch';

    protected $fillable = [
        'dispatch_to_carrier',
        'effective_date',
        'account',
        'service',
        'pickup_zone',
        'pickup_dispatch_zone',
        'delivery_zone',
        'delivery_dispatch_zone',
        'start_date',
        'end_date',
        'dispatch_on_days',
        'alert_min_before_ready',
        'enable'
    ];

    protected $casts = [
        'effective_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'account' => 'array',
        'service' => 'array',
        'pickup_zone' => 'array',
        'pickup_dispatch_zone' => 'array',
        'delivery_zone' => 'array',
        'delivery_dispatch_zone' => 'array',
        'dispatch_on_days' => 'array',
        'enable' => 'boolean'
    ];

    // Relationships
    public function carrier()
    {
        return $this->belongsTo(Carrier::class, 'dispatch_to_carrier');
    }
}