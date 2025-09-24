<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingTerm extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'code',
        'days',
        'is_active',
    ];

    protected $casts = [
        'days' => 'integer',
        'is_active' => 'boolean',
    ];

    // Scope for active billing terms
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Get display name (description)
    public function getDisplayNameAttribute()
    {
        return $this->description;
    }
}
