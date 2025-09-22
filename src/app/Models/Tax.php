<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'tax_type',
        'rate',
        'calculation_method',
        'applies_to',
        'region',
        'effective_date',
        'expiry_date',
        'is_compound',
        'is_active'
    ];

    protected $casts = [
        'rate' => 'decimal:4',
        'applies_to' => 'array',
        'effective_date' => 'date',
        'expiry_date' => 'date',
        'is_compound' => 'boolean',
        'is_active' => 'boolean'
    ];
}