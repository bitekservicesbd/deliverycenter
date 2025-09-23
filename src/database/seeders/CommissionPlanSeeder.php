<?php

namespace Database\Seeders;

use App\Models\CommissionPlan;
use Illuminate\Database\Seeder;

class CommissionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $commissionPlans = [
            [
                'name' => 'Standard Sales Commission',
                'description' => 'Base commission plan for sales representatives',
                'commission_type' => 'percentage',
                'commission_rate' => 5.00,
                'min_order_amount' => 50.00,
                'max_commission_amount' => 500.00,
                'applies_to' => json_encode(['new_orders', 'recurring_orders']),
                'tier_structure' => json_encode([
                    ['min_amount' => 0, 'max_amount' => 1000, 'rate' => 3.00],
                    ['min_amount' => 1000, 'max_amount' => 5000, 'rate' => 5.00],
                    ['min_amount' => 5000, 'max_amount' => null, 'rate' => 7.00],
                ]),
            ],
            [
                'name' => 'Driver Performance Bonus',
                'description' => 'Performance-based commission for drivers',
                'commission_type' => 'flat_rate',
                'commission_rate' => 25.00,
                'min_order_amount' => 0.00,
                'max_commission_amount' => 200.00,
                'applies_to' => json_encode(['completed_deliveries', 'on_time_delivery']),
                'tier_structure' => json_encode([
                    ['deliveries_count' => 10, 'bonus' => 50.00],
                    ['deliveries_count' => 25, 'bonus' => 100.00],
                    ['deliveries_count' => 50, 'bonus' => 200.00],
                ]),
            ],
            [
                'name' => 'Premium Account Manager',
                'description' => 'Higher commission for premium account management',
                'commission_type' => 'percentage',
                'commission_rate' => 8.00,
                'min_order_amount' => 100.00,
                'max_commission_amount' => 1000.00,
                'applies_to' => json_encode(['premium_accounts', 'corporate_contracts']),
                'tier_structure' => json_encode([
                    ['min_amount' => 100, 'max_amount' => 2000, 'rate' => 6.00],
                    ['min_amount' => 2000, 'max_amount' => 10000, 'rate' => 8.00],
                    ['min_amount' => 10000, 'max_amount' => null, 'rate' => 10.00],
                ]),
            ],
        ];

        foreach ($commissionPlans as $plan) {
            CommissionPlan::create($plan);
        }
    }
}
