<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarrierAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'carrier_name',
        'account_number',
        'account_name',
        'contact_person',
        'contact_phone',
        'contact_email',
        'notes',
        'account_type',
        'account_details',
        'is_active'
    ];

    protected $casts = [
        'account_details' => 'array',
        'is_active' => 'boolean'
    ];

    public function carrier()
    {
        return $this->belongsTo(Carrier::class, 'carrier_name', 'name');
    }
}
