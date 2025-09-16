<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    protected $fillable = [
        'ip_address',
        'attempts',
        'last_login',
        'blocked_at',
        'user_id',
    ];

    protected $casts = [
        'last_login' => 'datetime',
        'blocked_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
