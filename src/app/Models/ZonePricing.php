<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZonePricing extends Model
{
    use HasFactory;

    protected $fillable = [
        'origin_zone_id',
        'destination_zone_id',
        'price_plan_id',
        'service_class_id',
        'weight_break',
        'rate',
        'minimum_charge',
        'fuel_surcharge_applicable',
        'effective_date',
        'expiry_date',
        'is_active'
    ];

    protected $casts = [
        'weight_break' => 'decimal:2',
        'rate' => 'decimal:4',
        'minimum_charge' => 'decimal:2',
        'fuel_surcharge_applicable' => 'boolean',
        'effective_date' => 'date',
        'expiry_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function originZone()
    {
        return $this->belongsTo(Zone::class, 'origin_zone_id');
    }

    public function destinationZone()
    {
        return $this->belongsTo(Zone::class, 'destination_zone_id');
    }

    public function pricePlan()
    {
        return $this->belongsTo(PricePlan::class);
    }

    public function serviceClass()
    {
        return $this->belongsTo(ServiceClass::class);
    }
}
