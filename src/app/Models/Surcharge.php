<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surcharge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'calculation_method',
        'rate',
        'minimum_charge',
        'maximum_charge',
        'applies_to',
        'conditions',
        'gl_code',
        'is_active'
    ];

    protected $casts = [
        'rate' => 'decimal:2',
        'minimum_charge' => 'decimal:2',
        'maximum_charge' => 'decimal:2',
        'applies_to' => 'array',
        'conditions' => 'array',
        'is_active' => 'boolean'
    ];
}
