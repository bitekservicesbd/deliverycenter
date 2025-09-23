<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'commission_type',
        'base_percentage',
        'tier_structure',
        'minimum_amount',
        'maximum_amount',
        'effective_date',
        'is_active'
    ];

    protected $casts = [
        'tier_structure' => 'array',
        'base_percentage' => 'decimal:2',
        'minimum_amount' => 'decimal:2',
        'maximum_amount' => 'decimal:2',
        'effective_date' => 'date',
        'is_active' => 'boolean'
    ];
}
