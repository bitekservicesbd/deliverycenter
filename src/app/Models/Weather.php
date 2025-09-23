<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    use HasFactory;

    protected $fillable = [
        'alert_type',
        'title',
        'description',
        'affected_regions',
        'severity_level',
        'start_date',
        'end_date',
        'impact_on_deliveries',
        'recommended_actions',
        'is_active',
    ];

    protected $casts = [
        'affected_regions' => 'array',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'impact_on_deliveries' => 'array',
        'recommended_actions' => 'array',
        'is_active' => 'boolean',
    ];
}
