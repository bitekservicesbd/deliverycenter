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
                'name' => 'SL 101',
                'asset_type' => 'truck',
                'asset_number' => 'SL101',
                'vehicle_make' => null,
                'vehicle_model' => null,
                'vehicle_year' => null,
                'vin' => null,
                'vehicle_license_plate' => null,
                'vehicle_plate_expiry' => '2027-12-31',
                'last_service_date' => null,
                'next_service_due' => null,
                'next_service_distance' => null,
                'is_active' => true
            ],
            [
                'name' => 'SL 102',
                'asset_type' => 'trailor',
                'asset_number' => 'SL102',
                'vehicle_make' => null,
                'vehicle_model' => null,
                'vehicle_year' => null,
                'vin' => null,
                'vehicle_license_plate' => null,
                'vehicle_plate_expiry' => '2027-12-31',
                'last_service_date' => null,
                'next_service_due' => null,
                'next_service_distance' => null,
                'is_active' => true
            ],
            [
                'name' => 'SL 103',
                'asset_type' => 'van',
                'asset_number' => 'SL103',
                'vehicle_make' => null,
                'vehicle_model' => null,
                'vehicle_year' => null,
                'vin' => null,
                'vehicle_license_plate' => null,
                'vehicle_plate_expiry' => '2027-12-31',
                'last_service_date' => null,
                'next_service_due' => null,
                'next_service_distance' => null,
                'is_active' => true
            ]
        ];

        foreach ($assets as $asset) {
            Asset::create($asset);
        }
    }
}