<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'warehouse_id',
        'dock_type',
        'capacity',
        'operating_hours',
        'equipment_available',
        'restrictions',
        'contact_info',
        'is_active',
    ];

    protected $casts = [
        'operating_hours' => 'array',
        'equipment_available' => 'array',
        'restrictions' => 'array',
        'contact_info' => 'array',
        'is_active' => 'boolean',
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
