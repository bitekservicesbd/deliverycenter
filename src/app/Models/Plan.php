<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'monthly_price',
        'yearly_price',
        'custom_price',
        'is_active',
        'description',
        'currency',
        'billing_cycle',
        'trial_days',
        'is_featured',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'trial_days' => 'integer',
        'monthly_price' => 'decimal:2',
        'yearly_price' => 'decimal:2',
        'custom_price' => 'decimal:2',
    ];

    // Existing relationship
    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Methods
    public function getFormattedPriceAttribute()
    {
        $currency = $this->currency ?? 'USD';
        if ($this->custom_price) {
            return number_format($this->custom_price, 2).' '.$currency;
        } elseif ($this->monthly_price) {
            return number_format($this->monthly_price, 2).' '.$currency.'/mo';
        } elseif ($this->yearly_price) {
            return number_format($this->yearly_price, 2).' '.$currency.'/year';
        }

        return 'Contact for pricing';
    }

    public function getPriceForBillingCycle($cycle = 'monthly')
    {
        return match ($cycle) {
            'monthly' => $this->monthly_price,
            'yearly' => $this->yearly_price,
            'custom' => $this->custom_price,
            default => $this->monthly_price
        };
    }

    public function getActiveTenantCountAttribute()
    {
        return $this->tenants()->where('status', 'active')->count();
    }
}
