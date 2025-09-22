<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'zone_type',
        'postal_codes',
        'cities',
        'provinces_states',
        'countries',
        'coordinates',
        'zone_group_id',
        'delivery_days',
        'pickup_days',
        'is_active'
    ];

    protected $casts = [
        'postal_codes' => 'array',
        'cities' => 'array',
        'provinces_states' => 'array',
        'countries' => 'array',
        'coordinates' => 'array',
        'delivery_days' => 'integer',
        'pickup_days' => 'integer',
        'is_active' => 'boolean'
    ];

    public function zoneGroup()
    {
        return $this->belongsTo(ZoneGroup::class);
    }

    public function originPricing()
    {
        return $this->hasMany(ZonePricing::class, 'origin_zone_id');
    }

    public function destinationPricing()
    {
        return $this->hasMany(ZonePricing::class, 'destination_zone_id');
    }
}
