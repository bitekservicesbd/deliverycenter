<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoDispatch extends Model
{
    use HasFactory;

    protected $table = 'auto_dispatch';

    protected $fillable = [
        'rule_name',
        'criteria',
        'action',
        'carrier_selection_method',
        'priority_order',
        'conditions',
        'is_active',
    ];

    protected $casts = [
        'criteria' => 'array',
        'action' => 'array',
        'conditions' => 'array',
        'priority_order' => 'integer',
        'is_active' => 'boolean',
    ];
}
