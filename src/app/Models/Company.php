<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'legal_name',
        'code',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'phone',
        'fax',
        'email',
        'website',
        'tax_id',
        'business_number',
        'logo',
        'currency_id',
        'timezone',
        'is_default',
        'is_active',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function currency()
    {
        return $this->belongsTo(CurrencyType::class, 'currency_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
