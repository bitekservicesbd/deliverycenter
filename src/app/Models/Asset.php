<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_number',
        'asset_type',
        'make',
        'model',
        'year',
        'license_plate',
        'vin',
        'ownership_type',
        'insurance_number',
        'insurance_expiry',
        'capacity_weight',
        'capacity_volume',
        'has_tailgate',
        'temperature_controlled',
        'assigned_carrier_id',
        'is_active',
    ];

    protected $casts = [
        'insurance_expiry' => 'date',
        'capacity_weight' => 'decimal:2',
        'capacity_volume' => 'decimal:2',
        'has_tailgate' => 'boolean',
        'temperature_controlled' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function assignedCarrier()
    {
        return $this->belongsTo(Carrier::class, 'assigned_carrier_id');
    }
}
