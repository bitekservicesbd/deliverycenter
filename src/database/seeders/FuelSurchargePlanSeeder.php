<?php

namespace Database\Seeders;

use App\Models\FuelSurchargePlan;
use Illuminate\Database\Seeder;

class FuelSurchargePlanSeeder extends Seeder
{
    public function run(): void
    {
        $fuelPlans = [
            [
                'name' => 'Standard Fuel Surcharge',
                'description' => 'Standard fuel surcharge based on national average',
                'calculation_method' => 'percentage',
                'base_fuel_price' => 1.45,
                'current_fuel_price' => 1.68,
                'surcharge_percentage' => 15.86,
                'price_tiers' => json_encode([
                    ['min_price' => 1.00, 'max_price' => 1.20, 'percentage' => 0.00],
                    ['min_price' => 1.21, 'max_price' => 1.40, 'percentage' => 5.00],
                    ['min_price' => 1.41, 'max_price' => 1.60, 'percentage' => 12.00],
                    ['min_price' => 1.61, 'max_price' => 1.80, 'percentage' => 18.00],
                    ['min_price' => 1.81, 'max_price' => 2.00, 'percentage' => 25.00],
                ]),
                'update_frequency' => 'weekly',
                'min_surcharge' => 0.00,
                'max_surcharge' => 35.00,
            ],
            [
                'name' => 'Express Delivery Fuel',
                'description' => 'Higher fuel surcharge for express deliveries',
                'calculation_method' => 'fixed_rate',
                'base_fuel_price' => 1.45,
                'current_fuel_price' => 1.68,
                'surcharge_percentage' => 22.50,
                'price_tiers' => json_encode([
                    ['distance_range' => '0-50km', 'flat_rate' => 5.00],
                    ['distance_range' => '51-100km', 'flat_rate' => 8.50],
                    ['distance_range' => '101-200km', 'flat_rate' => 15.00],
                    ['distance_range' => '200km+', 'flat_rate' => 25.00],
                ]),
                'update_frequency' => 'daily',
                'min_surcharge' => 2.50,
                'max_surcharge' => 50.00,
            ],
            [
                'name' => 'Regional Fuel Plan',
                'description' => 'Regional fuel pricing for specific zones',
                'calculation_method' => 'zone_based',
                'base_fuel_price' => 1.45,
                'current_fuel_price' => 1.68,
                'surcharge_percentage' => 12.75,
                'price_tiers' => json_encode([
                    ['zone' => 'GTA', 'multiplier' => 1.0],
                    ['zone' => 'Ontario', 'multiplier' => 1.15],
                    ['zone' => 'Quebec', 'multiplier' => 1.25],
                    ['zone' => 'Western', 'multiplier' => 1.35],
                    ['zone' => 'Atlantic', 'multiplier' => 1.45],
                ]),
                'update_frequency' => 'monthly',
                'min_surcharge' => 0.00,
                'max_surcharge' => 40.00,
            ],
        ];

        foreach ($fuelPlans as $plan) {
            FuelSurchargePlan::create($plan);
        }
    }
}
