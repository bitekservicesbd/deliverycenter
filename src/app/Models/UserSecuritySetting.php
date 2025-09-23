<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSecuritySetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'allow_dispatch',
        'allow_invoicing',
        'allow_payment_processing',
        'allow_client_settings',
        'allow_inbounding',
        'allow_outbounding',
        'allow_courier_orders',
        'allow_gps_tracking',
        'allow_visual_dispatch',
        'allow_delivery_monitor',
        'allow_dashboard',
        'allow_routing',
        'allow_attachments',
        'allow_view_pricing',
        'allow_importer',
        'allow_custom_order',
        'allow_global_address_list'
    ];

    protected $casts = [
        'allow_dispatch' => 'boolean',
        'allow_invoicing' => 'boolean',
        'allow_payment_processing' => 'boolean',
        'allow_client_settings' => 'boolean',
        'allow_inbounding' => 'boolean',
        'allow_outbounding' => 'boolean',
        'allow_courier_orders' => 'boolean',
        'allow_gps_tracking' => 'boolean',
        'allow_visual_dispatch' => 'boolean',
        'allow_delivery_monitor' => 'boolean',
        'allow_dashboard' => 'boolean',
        'allow_routing' => 'boolean',
        'allow_attachments' => 'boolean',
        'allow_view_pricing' => 'boolean',
        'allow_importer' => 'boolean',
        'allow_custom_order' => 'boolean',
        'allow_global_address_list' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}