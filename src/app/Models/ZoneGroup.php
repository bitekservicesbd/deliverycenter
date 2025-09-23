<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZoneGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'group_type',
        'default_service_days',
        'special_handling',
        'pricing_multiplier',
        'is_active',
    ];

    protected $casts = [
        'default_service_days' => 'integer',
        'special_handling' => 'array',
        'pricing_multiplier' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }
}
