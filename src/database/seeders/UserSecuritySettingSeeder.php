<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserSecuritySetting;

class UserSecuritySettingSeeder extends Seeder
{
    public function run(): void
    {
        $userSecuritySettings = [
            [
                'user_id' => 1, // Admin user
                'allow_dispatch' => true,
                'allow_invoicing' => true,
                'allow_payment_processing' => true,
                'allow_client_settings' => true,
                'allow_inbounding' => true,
                'allow_outbounding' => true,
                'allow_courier_orders' => true,
                'allow_gps_tracking' => true,
                'allow_visual_dispatch' => true,
                'allow_delivery_monitor' => true,
                'allow_dashboard' => true,
                'allow_routing' => true,
                'allow_attachments' => true,
                'allow_view_pricing' => true,
                'allow_importer' => true,
                'allow_custom_order' => true,
                'allow_global_address_list' => true
            ],
            [
                'user_id' => 2, // Dispatcher user (if exists)
                'allow_dispatch' => true,
                'allow_invoicing' => false,
                'allow_payment_processing' => false,
                'allow_client_settings' => false,
                'allow_inbounding' => true,
                'allow_outbounding' => true,
                'allow_courier_orders' => true,
                'allow_gps_tracking' => true,
                'allow_visual_dispatch' => true,
                'allow_delivery_monitor' => true,
                'allow_dashboard' => true,
                'allow_routing' => true,
                'allow_attachments' => true,
                'allow_view_pricing' => false,
                'allow_importer' => false,
                'allow_custom_order' => true,
                'allow_global_address_list' => true
            ]
        ];

        foreach ($userSecuritySettings as $setting) {
            UserSecuritySetting::create($setting);
        }
    }
}