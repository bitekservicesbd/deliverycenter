<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DispatchBoard extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'board_type',
        'display_settings',
        'filter_criteria',
        'refresh_interval',
        'sort_order',
        'columns_visible',
        'is_default',
        'is_active'
    ];

    protected $casts = [
        'display_settings' => 'array',
        'filter_criteria' => 'array',
        'refresh_interval' => 'integer',
        'columns_visible' => 'array',
        'is_default' => 'boolean',
        'is_active' => 'boolean'
    ];
}
