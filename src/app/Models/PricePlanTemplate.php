<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricePlanTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'template_data',
        'template_type',
        'default_values',
        'validation_rules',
        'is_active'
    ];

    protected $casts = [
        'template_data' => 'array',
        'default_values' => 'array',
        'validation_rules' => 'array',
        'is_active' => 'boolean'
    ];
}