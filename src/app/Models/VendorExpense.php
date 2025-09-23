<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'expense_category',
        'description',
        'amount',
        'expense_date',
        'invoice_number',
        'payment_status',
        'gl_code',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'expense_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
