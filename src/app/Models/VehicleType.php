<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'max_weight',
        'max_volume',
        'max_length',
        'max_width',
        'max_height',
        'fuel_type',
        'has_tailgate',
        'has_lift_gate',
        'temperature_controlled',
        'hazmat_capable',
        'is_active'
    ];

    protected $casts = [
        'max_weight' => 'decimal:2',
        'max_volume' => 'decimal:2',
        'max_length' => 'decimal:2',
        'max_width' => 'decimal:2',
        'max_height' => 'decimal:2',
        'has_tailgate' => 'boolean',
        'has_lift_gate' => 'boolean',
        'temperature_controlled' => 'boolean',
        'hazmat_capable' => 'boolean',
        'is_active' => 'boolean'
    ];
}
