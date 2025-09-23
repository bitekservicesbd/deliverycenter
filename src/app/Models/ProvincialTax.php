<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProvincialTax extends Model
{
    use HasFactory;

    protected $fillable = [
        'province',
        'tax_name',
        'tax_rate',
        'tax_number',
        'effective_date',
        'expiry_date',
        'applies_to',
        'is_active',
    ];

    protected $casts = [
        'tax_rate' => 'decimal:4',
        'effective_date' => 'date',
        'expiry_date' => 'date',
        'applies_to' => 'array',
        'is_active' => 'boolean',
    ];
}
