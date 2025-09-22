<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'user_type',
        'password',
        'email_verified_at',
        'is_active',
        'employee_number',
        'hire_date',
        'permissions',
        'avatar',
        'last_login_at',
        'company_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
        'hire_date' => 'date',
        'permissions' => 'array',
        'last_login_at' => 'datetime',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function securitySettings()
    {
        return $this->hasOne(UserSecuritySetting::class);
    }

    public function alertSettings()
    {
        return $this->hasOne(UserAlertSetting::class);
    }

    /**
     * Check if user has specific permission
     */
    public function hasPermission(string $permission): bool
    {
        if (!$this->permissions) {
            return false;
        }

        return in_array($permission, $this->permissions);
    }

    /**
     * Get security setting value
     */
    public function getSecuritySetting(string $setting): bool
    {
        return $this->securitySettings?->{$setting} ?? false;
    }

    /**
     * Get alert setting value
     */
    public function getAlertSetting(string $setting): bool
    {
        return $this->alertSettings?->{$setting} ?? false;
    }
}