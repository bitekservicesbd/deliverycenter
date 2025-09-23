<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelSurchargePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'base_fuel_price',
        'current_fuel_price',
        'calculation_method',
        'rate_table',
        'effective_date',
        'auto_update',
        'fuel_index_source',
        'is_active',
    ];

    protected $casts = [
        'base_fuel_price' => 'decimal:3',
        'current_fuel_price' => 'decimal:3',
        'rate_table' => 'array',
        'effective_date' => 'date',
        'auto_update' => 'boolean',
        'is_active' => 'boolean',
    ];
}
