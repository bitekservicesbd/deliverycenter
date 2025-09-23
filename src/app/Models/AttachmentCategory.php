<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'notify_email',
        'retention_days',
        'attach_to_load_alerts',
        'attach_to_invoice',
        'default_driver',
        'hide_from_driver',
        'updated_by'
    ];

    protected $casts = [
        'attach_to_load_alerts' => 'boolean',
        'attach_to_invoice' => 'boolean',
        'default_driver' => 'boolean',
        'hide_from_driver' => 'boolean',
    ];
}
