<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PricePlanTemplate;

class PricePlanTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $templates = [
            [
                'template_name' => 'Courier Service Template',
                'description' => 'Template for local courier services',
                'industry' => 'courier',
                'service_type' => 'same_day',
                'pricing_structure' => json_encode([
                    'base_calculation' => 'distance_weight',
                    'minimum_charge' => 15.00,
                    'distance_tiers' => [
                        ['max_distance' => 10, 'rate_per_km' => 2.00],
                        ['max_distance' => 25, 'rate_per_km' => 1.75],
                        ['max_distance' => 50, 'rate_per_km' => 1.50],
                        ['max_distance' => null, 'rate_per_km' => 1.25]
                    ],
                    'weight_tiers' => [
                        ['max_weight' => 5, 'rate_per_kg' => 3.00],
                        ['max_weight' => 15, 'rate_per_kg' => 2.50],
                        ['max_weight' => 30, 'rate_per_kg' => 2.00],
                        ['max_weight' => null, 'rate_per_kg' => 1.50]
                    ]
                ]),
                'default_surcharges' => json_encode([
                    'fuel_surcharge' => 12.00,
                    'residential_delivery' => 5.00,
                    'after_hours' => 15.00
                ]),
                'markup_percentage' => 15.00
            ],
            [
                'template_name' => 'LTL Freight Template',
                'description' => 'Template for less-than-truckload freight',
                'industry' => 'freight',
                'service_type' => 'ltl',
                'pricing_structure' => json_encode([
                    'base_calculation' => 'weight_class',
                    'minimum_charge' => 75.00,
                    'freight_classes' => [
                        ['class' => 50, 'rate_per_cwt' => 8.50],
                        ['class' => 65, 'rate_per_cwt' => 12.25],
                        ['class' => 85, 'rate_per_cwt' => 16.75],
                        ['class' => 100, 'rate_per_cwt' => 22.50],
                        ['class' => 125, 'rate_per_cwt' => 28.00],
                        ['class' => 200, 'rate_per_cwt' => 35.50]
                    ],
                    'distance_zones' => [
                        ['max_distance' => 250, 'multiplier' => 1.0],
                        ['max_distance' => 500, 'multiplier' => 1.25],
                        ['max_distance' => 1000, 'multiplier' => 1.50],
                        ['max_distance' => null, 'multiplier' => 2.0]
                    ]
                ]),
                'default_surcharges' => json_encode([
                    'fuel_surcharge' => 18.50,
                    'lift_gate' => 45.00,
                    'residential_delivery' => 65.00,
                    'inside_delivery' => 85.00
                ]),
                'markup_percentage' => 20.00
            ],
            [
                'template_name' => 'E-commerce Fulfillment',
                'description' => 'Template for e-commerce order fulfillment',
                'industry' => 'ecommerce',
                'service_type' => 'parcel',
                'pricing_structure' => json_encode([
                    'base_calculation' => 'dimensional_weight',
                    'minimum_charge' => 8.50,
                    'package_tiers' => [
                        ['type' => 'envelope', 'base_rate' => 12.50],
                        ['type' => 'small_box', 'base_rate' => 15.75],
                        ['type' => 'medium_box', 'base_rate' => 22.25],
                        ['type' => 'large_box', 'base_rate' => 35.50]
                    ],
                    'zone_rates' => [
                        ['zone' => 1, 'multiplier' => 1.0],
                        ['zone' => 2, 'multiplier' => 1.15],
                        ['zone' => 3, 'multiplier' => 1.35],
                        ['zone' => 4, 'multiplier' => 1.55],
                        ['zone' => 5, 'multiplier' => 1.85]
                    ]
                ]),
                'default_surcharges' => json_encode([
                    'fuel_surcharge' => 14.25,
                    'oversized_package' => 25.00,
                    'signature_required' => 6.50,
                    'saturday_delivery' => 18.00
                ]),
                'markup_percentage' => 12.00
            ]
        ];

        foreach ($templates as $template) {
            PricePlanTemplate::create($template);
        }
    }
}