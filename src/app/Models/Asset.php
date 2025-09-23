<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'asset_type',
        'asset_number',
        'vehicle_make',
        'vehicle_model',
        'vehicle_year',
        'vin',
        'vehicle_license_plate',
        'vehicle_plate_expiry',
        'last_service_date',
        'next_service_due',
        'next_service_distance',
        'is_active'
    ];

    protected $casts = [
        'vehicle_plate_expiry' => 'date',
        'last_service_date' => 'date',
        'next_service_due' => 'date',
        'temperature_controlled' => 'boolean',
        'is_active' => 'boolean'
    ];
}