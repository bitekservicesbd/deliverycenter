<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'unit_type',
        'conversion_factor',
        'is_base_unit',
        'is_default',
        'is_active',
    ];

    protected $casts = [
        'conversion_factor' => 'decimal:6',
        'is_base_unit' => 'boolean',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];
}
