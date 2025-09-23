<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'contact_person',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'website',
        'mc_number',
        'dot_number',
        'insurance_info',
        'service_areas',
        'payment_terms',
        'commission_rate',
        'fuel_surcharge_rate',
        'is_active',
    ];

    protected $casts = [
        'insurance_info' => 'array',
        'service_areas' => 'array',
        'commission_rate' => 'decimal:2',
        'fuel_surcharge_rate' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class, 'assigned_carrier_id');
    }

    public function carrierAccounts()
    {
        return $this->hasMany(CarrierAccount::class);
    }
}
