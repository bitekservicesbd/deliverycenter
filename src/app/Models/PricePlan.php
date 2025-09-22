<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'plan_type',
        'base_rate',
        'rate_structure',
        'zone_based',
        'weight_based',
        'distance_based',
        'minimum_charge',
        'fuel_surcharge_plan_id',
        'effective_date',
        'expiry_date',
        'is_active'
    ];

    protected $casts = [
        'base_rate' => 'decimal:2',
        'rate_structure' => 'array',
        'zone_based' => 'boolean',
        'weight_based' => 'boolean',
        'distance_based' => 'boolean',
        'minimum_charge' => 'decimal:2',
        'effective_date' => 'date',
        'expiry_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function fuelSurchargePlan()
    {
        return $this->belongsTo(FuelSurchargePlan::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'price_plan_id');
    }

    public function zonePricing()
    {
        return $this->hasMany(ZonePricing::class);
    }
}