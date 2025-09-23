<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'length',
        'width',
        'height',
        'weight',
        'volume',
        'package_type',
        'handling_requirements',
        'is_active',
    ];

    protected $casts = [
        'length' => 'decimal:2',
        'width' => 'decimal:2',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'volume' => 'decimal:2',
        'handling_requirements' => 'array',
        'is_active' => 'boolean',
    ];
}
