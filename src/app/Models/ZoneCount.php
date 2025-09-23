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
        'total_loads',
        'completed_loads',
        'pending_loads',
        'total_revenue',
        'total_revenue',
        'avg_delivery_time',
        'success_rate'
    ];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }
}