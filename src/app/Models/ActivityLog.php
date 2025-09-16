<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'admin_user_id',
        'action',
        'description',
    ];

    // Relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class, 'admin_user_id');
    }
}
