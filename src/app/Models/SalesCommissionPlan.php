<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesCommissionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'commission_type',
        'base_rate',
        'tier_structure',
        'target_criteria',
        'payment_frequency',
        'is_active'
    ];

    protected $casts = [
        'base_rate' => 'decimal:2',
        'tier_structure' => 'array',
        'target_criteria' => 'array',
        'is_active' => 'boolean'
    ];
}