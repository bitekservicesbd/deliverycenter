<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'billing_frequency',
        'invoice_template',
        'payment_terms_id',
        'gl_code',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function paymentTerms()
    {
        return $this->belongsTo(BillFreightTerm::class, 'payment_terms_id');
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}
