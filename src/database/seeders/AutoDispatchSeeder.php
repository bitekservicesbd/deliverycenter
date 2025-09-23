<?php

namespace Database\Seeders;

use App\Models\AutoDispatch;
use Illuminate\Database\Seeder;

class AutoDispatchSeeder extends Seeder
{
    public function run(): void
    {
        $autoDispatchRules = [
            [
                'name' => 'Express Orders Auto-Assign',
                'description' => 'Automatically assign express orders to available drivers',
                'priority' => 1,
                'conditions' => json_encode([
                    'service_class' => 'express',
                    'weight_max' => 50,
                    'distance_max' => 100,
                ]),
                'actions' => json_encode([
                    'auto_assign' => true,
                    'notify_driver' => true,
                    'send_sms' => true,
                ]),
                'time_constraints' => json_encode([
                    'business_hours_only' => false,
                    'max_response_time' => 30,
                ]),
            ],
            [
                'name' => 'Same-Day Delivery Rules',
                'description' => 'Auto-dispatch same day deliveries within city limits',
                'priority' => 2,
                'conditions' => json_encode([
                    'delivery_type' => 'same_day',
                    'zone' => ['toronto', 'mississauga', 'markham'],
                    'package_type' => ['envelope', 'small_box'],
                ]),
                'actions' => json_encode([
                    'auto_assign' => true,
                    'route_optimize' => true,
                    'notify_customer' => true,
                ]),
                'time_constraints' => json_encode([
                    'business_hours_only' => true,
                    'max_response_time' => 15,
                ]),
            ],
            [
                'name' => 'Bulk Orders Distribution',
                'description' => 'Distribute bulk orders across available fleet',
                'priority' => 3,
                'conditions' => json_encode([
                    'order_count_min' => 10,
                    'total_weight_max' => 500,
                    'delivery_window' => 'standard',
                ]),
                'actions' => json_encode([
                    'split_orders' => true,
                    'load_balance' => true,
                    'optimize_routes' => true,
                ]),
                'time_constraints' => json_encode([
                    'advance_notice_hours' => 2,
                    'max_drivers' => 5,
                ]),
            ],
        ];

        foreach ($autoDispatchRules as $rule) {
            AutoDispatch::create($rule);
        }
    }
}
