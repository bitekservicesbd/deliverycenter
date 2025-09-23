<?php

namespace Database\Seeders;

use App\Models\SalesCommissionPlan;
use Illuminate\Database\Seeder;

class SalesCommissionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $commissionPlans = [
            [
                'plan_name' => 'New Customer Acquisition',
                'description' => 'Commission plan for acquiring new customers',
                'commission_type' => 'percentage',
                'base_rate' => 8.00,
                'tier_structure' => json_encode([
                    ['min_revenue' => 0, 'max_revenue' => 5000, 'rate' => 6.00],
                    ['min_revenue' => 5001, 'max_revenue' => 15000, 'rate' => 8.00],
                    ['min_revenue' => 15001, 'max_revenue' => 50000, 'rate' => 10.00],
                    ['min_revenue' => 50001, 'max_revenue' => null, 'rate' => 12.00],
                ]),
                'bonus_structure' => json_encode([
                    ['milestone' => 'first_order', 'bonus_amount' => 100.00],
                    ['milestone' => '10_orders', 'bonus_amount' => 250.00],
                    ['milestone' => '25_orders', 'bonus_amount' => 500.00],
                ]),
                'payout_frequency' => 'monthly',
                'minimum_payout' => 50.00,
                'max_commission_cap' => 2000.00,
            ],
            [
                'plan_name' => 'Account Management',
                'description' => 'Commission plan for managing existing accounts',
                'commission_type' => 'percentage',
                'base_rate' => 4.00,
                'tier_structure' => json_encode([
                    ['min_revenue' => 0, 'max_revenue' => 10000, 'rate' => 3.00],
                    ['min_revenue' => 10001, 'max_revenue' => 25000, 'rate' => 4.00],
                    ['min_revenue' => 25001, 'max_revenue' => 75000, 'rate' => 5.00],
                    ['min_revenue' => 75001, 'max_revenue' => null, 'rate' => 6.50],
                ]),
                'bonus_structure' => json_encode([
                    ['milestone' => 'retention_95_percent', 'bonus_amount' => 500.00],
                    ['milestone' => 'upsell_achievement', 'bonus_amount' => 300.00],
                    ['milestone' => 'quarterly_target', 'bonus_amount' => 1000.00],
                ]),
                'payout_frequency' => 'monthly',
                'minimum_payout' => 25.00,
                'max_commission_cap' => 1500.00,
            ],
            [
                'plan_name' => 'Express Services Sales',
                'description' => 'Higher commission for express service sales',
                'commission_type' => 'percentage',
                'base_rate' => 12.00,
                'tier_structure' => json_encode([
                    ['service_type' => 'same_day', 'rate' => 15.00],
                    ['service_type' => 'next_day', 'rate' => 12.00],
                    ['service_type' => 'express', 'rate' => 10.00],
                    ['service_type' => 'standard', 'rate' => 6.00],
                ]),
                'bonus_structure' => json_encode([
                    ['milestone' => 'monthly_express_target', 'bonus_amount' => 750.00],
                    ['milestone' => 'same_day_specialist', 'bonus_amount' => 400.00],
                ]),
                'payout_frequency' => 'bi_weekly',
                'minimum_payout' => 75.00,
                'max_commission_cap' => 3000.00,
            ],
            [
                'plan_name' => 'Corporate Sales Team',
                'description' => 'Commission plan for corporate account sales',
                'commission_type' => 'hybrid',
                'base_rate' => 6.00,
                'tier_structure' => json_encode([
                    ['contract_value' => 'under_50k', 'rate' => 5.00],
                    ['contract_value' => '50k_to_100k', 'rate' => 6.00],
                    ['contract_value' => '100k_to_250k', 'rate' => 7.50],
                    ['contract_value' => 'over_250k', 'rate' => 9.00],
                ]),
                'bonus_structure' => json_encode([
                    ['milestone' => 'contract_signed', 'bonus_amount' => 1000.00],
                    ['milestone' => 'annual_renewal', 'bonus_amount' => 2500.00],
                    ['milestone' => 'contract_expansion', 'bonus_amount' => 1500.00],
                ]),
                'payout_frequency' => 'quarterly',
                'minimum_payout' => 200.00,
                'max_commission_cap' => 5000.00,
            ],
        ];

        foreach ($commissionPlans as $plan) {
            SalesCommissionPlan::create($plan);
        }
    }
}
