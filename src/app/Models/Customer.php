<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'contact_person',
        'phone',
        'email',
        'billing_address',
        'shipping_address',
        'city',
        'state',
        'postal_code',
        'country',
        'credit_limit',
        'payment_terms_id',
        'billing_group_id',
        'price_plan_id',
        'tax_exempt',
        'tax_id',
        'customer_type',
        'is_active'
    ];

    protected $casts = [
        'credit_limit' => 'decimal:2',
        'tax_exempt' => 'boolean',
        'is_active' => 'boolean'
    ];

    public function paymentTerms()
    {
        return $this->belongsTo(BillFreightTerm::class, 'payment_terms_id');
    }

    public function billingGroup()
    {
        return $this->belongsTo(BillingGroup::class);
    }

    public function pricePlan()
    {
        return $this->belongsTo(PricePlan::class, 'price_plan_id');
    }
}
