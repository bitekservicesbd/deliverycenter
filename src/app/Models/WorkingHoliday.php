<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingHoliday extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'is_recurring',
        'recurrence_pattern',
        'affects_delivery',
        'affects_pickup',
        'special_rates',
        'regions_affected',
        'description',
        'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'is_recurring' => 'boolean',
        'affects_delivery' => 'boolean',
        'affects_pickup' => 'boolean',
        'special_rates' => 'array',
        'regions_affected' => 'array',
        'is_active' => 'boolean'
    ];
}