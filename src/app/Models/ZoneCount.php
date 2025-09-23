<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZoneCount extends Model
{
    use HasFactory;

    protected $fillable = [
        'zone_id',
        'count_date',
        'delivery_count',
        'pickup_count',
        'total_packages',
        'total_weight',
        'total_revenue',
        'avg_delivery_time',
        'success_rate'
    ];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }
}