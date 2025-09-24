<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessorialType extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'code',
        'discount',
        'fuel',
        'new_load',
        'gl_code',
        'commission',
        'is_active',
    ];

    protected $casts = [
        'discount' => 'boolean',
        'fuel' => 'boolean',
        'new_load' => 'boolean',
        'commission' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
