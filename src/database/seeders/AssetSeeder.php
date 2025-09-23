<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asset;

class AssetSeeder extends Seeder
{
    public function run(): void
    {
        $assets = [
            [
                'asset_number' => 'VH001',
                'asset_type' => 'vehicle',
                'make' => 'Ford',
                'model' => 'Transit',
                'year' => 2023,
                'license_plate' => 'ONT-1234',
                'vin' => '1FTBW2CM8NKA12345',
                'ownership_type' => 'owned',
                'insurance_number' => 'INS-2024-001',
                'insurance_expiry' => '2024-12-31',
                'capacity_weight' => 1500.00,
                'capacity_volume' => 15.50,
                'has_tailgate' => true,
                'temperature_controlled' => false,
                'assigned_carrier_id' => null
            ],
            [
                'asset_number' => 'VH002',
                'asset_type' => 'vehicle',
                'make' => 'Mercedes',
                'model' => 'Sprinter',
                'year' => 2022,
                'license_plate' => 'ONT-5678',
                'vin' => '2FTBW2CM8NKA67890',
                'ownership_type' => 'leased',
                'insurance_number' => 'INS-2024-002',
                'insurance_expiry' => '2024-11-30',
                'capacity_weight' => 2000.00,
                'capacity_volume' => 20.00,
                'has_tailgate' => true,
                'temperature_controlled' => true,
                'assigned_carrier_id' => null
            ],
            [
                'asset_number' => 'TR001',
                'asset_type' => 'trailer',
                'make' => 'Great Dane',
                'model' => 'Everest',
                'year' => 2021,
                'license_plate' => 'TRL-1001',
                'vin' => '1GRAA0625MF123456',
                'ownership_type' => 'owned',
                'insurance_number' => 'INS-2024-003',
                'insurance_expiry' => '2025-01-31',
                'capacity_weight' => 25000.00,
                'capacity_volume' => 75.00,
                'has_tailgate' => false,
                'temperature_controlled' => false,
                'assigned_carrier_id' => null
            ],
            [
                'asset_number' => 'EQ001',
                'asset_type' => 'equipment',
                'make' => 'Hyster',
                'model' => 'H50FT',
                'year' => 2020,
                'license_plate' => null,
                'vin' => 'HYSTER50FT789012',
                'ownership_type' => 'owned',
                'insurance_number' => 'INS-2024-004',
                'insurance_expiry' => '2024-10-31',
                'capacity_weight' => 2500.00,
                'capacity_volume' => null,
                'has_tailgate' => false,
                'temperature_controlled' => false,
                'assigned_carrier_id' => null
            ]
        ];

        foreach ($assets as $asset) {
            Asset::create($asset);
        }
    }
}
