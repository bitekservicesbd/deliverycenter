<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ZonePricing;

class ZonePricingSeeder extends Seeder
{
    public function run(): void
    {
        $zonePricing = [
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 1,   // GTA Core
                'service_class' => 'standard',
                'base_rate' => 15.00,
                'per_km_rate' => 1.25,
                'per_kg_rate' => 2.50,
                'minimum_charge' => 12.00,
                'maximum_charge' => 500.00,
                'fuel_surcharge_rate' => 12.5,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 2,   // GTA Extended
                'service_class' => 'standard',
                'base_rate' => 22.50,
                'per_km_rate' => 1.75,
                'per_kg_rate' => 2.75,
                'minimum_charge' => 18.00,
                'maximum_charge' => 750.00,
                'fuel_surcharge_rate' => 15.0,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 3,   // Southern Ontario
                'service_class' => 'standard',
                'base_rate' => 35.00,
                'per_km_rate' => 2.25,
                'per_kg_rate' => 3.00,
                'minimum_charge' => 28.00,
                'maximum_charge' => 1200.00,
                'fuel_surcharge_rate' => 18.5,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 4,   // Quebec Metro
                'service_class' => 'standard',
                'base_rate' => 45.00,
                'per_km_rate' => 2.75,
                'per_kg_rate' => 3.25,
                'minimum_charge' => 35.00,
                'maximum_charge' => 1500.00,
                'fuel_surcharge_rate' => 20.0,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 5,   // Western Canada
                'service_class' => 'standard',
                'base_rate' => 85.00,
                'per_km_rate' => 4.50,
                'per_kg_rate' => 4.75,
                'minimum_charge' => 65.00,
                'maximum_charge' => 3000.00,
                'fuel_surcharge_rate' => 25.0,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 1, // GTA Core
                'to_zone_id' => 8,   // Express Priority
                'service_class' => 'express',
                'base_rate' => 35.00,
                'per_km_rate' => 3.50,
                'per_kg_rate' => 4.00,
                'minimum_charge' => 25.00,
                'maximum_charge' => 800.00,
                'fuel_surcharge_rate' => 15.0,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 2, // GTA Extended
                'to_zone_id' => 2,   // GTA Extended
                'service_class' => 'standard',
                'base_rate' => 18.00,
                'per_km_rate' => 1.50,
                'per_kg_rate' => 2.75,
                'minimum_charge' => 15.00,
                'maximum_charge' => 600.00,
                'fuel_surcharge_rate' => 14.0,
                'effective_date' => '2024-01-01'
            ],
            [
                'from_zone_id' => 7, // Remote Areas
                'to_zone_id' => 1,   // GTA Core
                'service_class' => 'extended',
                'base_rate' => 125.00,
                'per_km_rate' => 8.50,
                'per_kg_rate' => 7.25,
                'minimum_charge' => 95.00,
                'maximum_charge' => 5000.00,
                'fuel_surcharge_rate' => 35.0,
                'effective_date' => '2024-01-01'
            ]
        ];

        foreach ($zonePricing as $pricing) {
            ZonePricing::create($pricing);
        }
    }
}
