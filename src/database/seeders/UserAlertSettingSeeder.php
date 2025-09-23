<?php

namespace Database\Seeders;

use App\Models\UserAlertSetting;
use Illuminate\Database\Seeder;

class UserAlertSettingSeeder extends Seeder
{
    public function run(): void
    {
        $userAlertSettings = [
            [
                'user_id' => 1, // Admin user
                'new_order_email' => true,
                'new_order_sms' => false,
                'dispatch_email' => true,
                'dispatch_sms' => true,
                'quote_email' => true,
                'quote_sms' => false,
                'pickup_email' => true,
                'pickup_sms' => false,
                'delivered_email' => true,
                'delivered_sms' => false,
                'cancelled_email' => true,
                'cancelled_sms' => true,
                'invoice_alerts' => true,
                'statement_alerts' => true,
            ],
            [
                'user_id' => 2, // Dispatcher user (if exists)
                'new_order_email' => true,
                'new_order_sms' => true,
                'dispatch_email' => true,
                'dispatch_sms' => true,
                'quote_email' => false,
                'quote_sms' => false,
                'pickup_email' => true,
                'pickup_sms' => true,
                'delivered_email' => true,
                'delivered_sms' => false,
                'cancelled_email' => true,
                'cancelled_sms' => true,
                'invoice_alerts' => false,
                'statement_alerts' => false,
            ],
        ];

        foreach ($userAlertSettings as $setting) {
            UserAlertSetting::create($setting);
        }
    }
}
