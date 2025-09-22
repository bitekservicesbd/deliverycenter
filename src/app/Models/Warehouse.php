<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'contact_person',
        'phone',
        'email',
        'operating_hours',
        'dock_count',
        'capacity',
        'services_available',
        'restrictions',
        'is_active'
    ];

    protected $casts = [
        'operating_hours' => 'array',
        'dock_count' => 'integer',
        'services_available' => 'array',
        'restrictions' => 'array',
        'is_active' => 'boolean'
    ];

    public function docks()
    {
        return $this->hasMany(Dock::class);
    }
}