<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'delivery_days',
        'cutoff_time',
        'base_rate',
        'delivery_options',
        'is_active',
    ];

    protected $casts = [
        'delivery_days' => 'integer',
        'cutoff_time' => 'time',
        'base_rate' => 'decimal:2',
        'delivery_options' => 'array',
        'is_active' => 'boolean',
    ];
}
