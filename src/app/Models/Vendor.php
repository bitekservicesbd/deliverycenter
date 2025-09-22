<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'contact_person',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'vendor_type',
        'payment_terms',
        'tax_id',
        'services_provided',
        'is_active'
    ];

    protected $casts = [
        'services_provided' => 'array',
        'is_active' => 'boolean'
    ];

    public function expenses()
    {
        return $this->hasMany(VendorExpense::class);
    }
}