<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillFreightTerm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'payment_days',
        'discount_percentage',
        'discount_days',
        'description',
        'is_default',
        'is_active',
    ];

    protected $casts = [
        'payment_days' => 'integer',
        'discount_percentage' => 'decimal:2',
        'discount_days' => 'integer',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];
}
