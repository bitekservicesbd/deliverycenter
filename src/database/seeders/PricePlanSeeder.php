<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PricePlan;

class PricePlanSeeder extends Seeder
{
    public function run(): void
    {
        $pricePlans = [
            [
                'name' => 'Standard Pricing',
                'description' => 'Standard pricing for regular customers',
                'plan_type' => 'standard',
                'base_rate' => 15.00,
                'per_kg_rate' => 2.50,
                'per_km_rate' => 1.25,
                'minimum_charge' => 10.00,
                'fuel_surcharge_included' => true,
                'zone_pricing' => json_encode([
                    'local' => ['base' => 15.00, 'per_km' => 1.00],
                    'regional' => ['base' => 25.00, 'per_km' => 1.50],
                    'national' => ['base' => 45.00, 'per_km' => 2.00]
                ]),
                'weight_breaks' => json_encode([
                    ['max_weight' => 5, 'rate' => 2.50],
                    ['max_weight' => 15, 'rate' => 2.25],
                    ['max_weight' => 50, 'rate' => 2.00],
                    ['max_weight' => null, 'rate' => 1.75]
                ])
            ],
            [
                'name' => 'Premium Pricing',
                'description' => 'Premium pricing with enhanced services',
                'plan_type' => 'premium',
                'base_rate' => 25.00,
                'per_kg_rate' => 3.00,
                'per_km_rate' => 1.75,
                'minimum_charge' => 20.00,
                'fuel_surcharge_included' => true,
                'zone_pricing' => json_encode([
                    'local' => ['base' => 25.00, 'per_km' => 1.50],
                    'regional' => ['base' => 40.00, 'per_km' => 2.00],
                    'national' => ['base' => 65.00, 'per_km' => 2.50]
                ]),
                'weight_breaks' => json_encode([
                    ['max_weight' => 5, 'rate' => 3.00],
                    ['max_weight' => 15, 'rate' => 2.75],
                    ['max_weight' => 50, 'rate' => 2.50],
                    ['max_weight' => null, 'rate' => 2.25]
                ])
            ],
            [
                'name' => 'Express Pricing',
                'description' => 'Express delivery pricing with time guarantees',
                'plan_type' => 'express',
                'base_rate' => 35.00,
                'per_kg_rate' => 4.00,
                'per_km_rate' => 2.25,
                'minimum_charge' => 30.00,
                'fuel_surcharge_included' => true,
                'zone_pricing' => json_encode([
                    'local' => ['base' => 35.00, 'per_km' => 2.00],
                    'regional' => ['base' => 55.00, 'per_km' => 2.75],
                    'national' => ['base' => 85.00, 'per_km' => 3.50]
                ]),
                'weight_breaks' => json_encode([
                    ['max_weight' => 5, 'rate' => 4.00],
                    ['max_weight' => 15, 'rate' => 3.75],
                    ['max_weight' => 50, 'rate' => 3.50],
                    ['max_weight' => null, 'rate' => 3.25]
                ])
            ],
            [
                'name' => 'Volume Discount',
                'description' => 'Special pricing for high-volume customers',
                'plan_type' => 'volume',
                'base_rate' => 12.00,
                'per_kg_rate' => 2.00,
                'per_km_rate' => 1.00,
                'minimum_charge' => 8.00,
                'fuel_surcharge_included' => false,
                'zone_pricing' => json_encode([
                    'local' => ['base' => 12.00, 'per_km' => 0.80],
                    'regional' => ['base' => 20.00, 'per_km' => 1.20],
                    'national' => ['base' => 35.00, 'per_km' => 1.60]
                ]),
                'weight_breaks' => json_encode([
                    ['max_weight' => 5, 'rate' => 2.00],
                    ['max_weight' => 15, 'rate' => 1.75],
                    ['max_weight' => 50, 'rate' => 1.50],
                    ['max_weight' => null, 'rate' => 1.25]
                ])
            ]
        ];

        foreach ($pricePlans as $plan) {
            PricePlan::create($plan);
        }
    }
}