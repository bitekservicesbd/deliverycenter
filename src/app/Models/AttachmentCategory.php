<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'allowed_extensions',
        'max_file_size',
        'is_required',
        'is_active',
    ];

    protected $casts = [
        'allowed_extensions' => 'array',
        'max_file_size' => 'integer',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
    ];
}
