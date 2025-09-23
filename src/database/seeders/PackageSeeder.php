<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Small Envelope',
                'code' => 'ENV-SM',
                'description' => 'Small envelope up to 1kg',
                'max_weight' => 1.00,
                'max_length' => 35.00,
                'max_width' => 25.00,
                'max_height' => 2.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 12.50,
                'package_category' => 'envelope',
            ],
            [
                'name' => 'Large Envelope',
                'code' => 'ENV-LG',
                'description' => 'Large envelope up to 2kg',
                'max_weight' => 2.00,
                'max_length' => 40.00,
                'max_width' => 30.00,
                'max_height' => 3.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 18.75,
                'package_category' => 'envelope',
            ],
            [
                'name' => 'Small Box',
                'code' => 'BOX-SM',
                'description' => 'Small box up to 5kg',
                'max_weight' => 5.00,
                'max_length' => 30.00,
                'max_width' => 20.00,
                'max_height' => 15.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 25.00,
                'package_category' => 'box',
            ],
            [
                'name' => 'Medium Box',
                'code' => 'BOX-MD',
                'description' => 'Medium box up to 15kg',
                'max_weight' => 15.00,
                'max_length' => 50.00,
                'max_width' => 40.00,
                'max_height' => 30.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 45.00,
                'package_category' => 'box',
            ],
            [
                'name' => 'Large Box',
                'code' => 'BOX-LG',
                'description' => 'Large box up to 30kg',
                'max_weight' => 30.00,
                'max_length' => 80.00,
                'max_width' => 60.00,
                'max_height' => 50.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 85.00,
                'package_category' => 'box',
            ],
            [
                'name' => 'Standard Pallet',
                'code' => 'PAL-STD',
                'description' => 'Standard pallet up to 500kg',
                'max_weight' => 500.00,
                'max_length' => 120.00,
                'max_width' => 100.00,
                'max_height' => 180.00,
                'volume_weight_factor' => 300.00,
                'base_rate' => 175.00,
                'package_category' => 'pallet',
            ],
            [
                'name' => 'Oversized Item',
                'code' => 'OVER-SIZE',
                'description' => 'Oversized items requiring special handling',
                'max_weight' => 1000.00,
                'max_length' => 300.00,
                'max_width' => 200.00,
                'max_height' => 200.00,
                'volume_weight_factor' => 200.00,
                'base_rate' => 350.00,
                'package_category' => 'oversized',
            ],
            [
                'name' => 'Document Tube',
                'code' => 'TUBE-DOC',
                'description' => 'Document tube for plans and drawings',
                'max_weight' => 3.00,
                'max_length' => 100.00,
                'max_width' => 15.00,
                'max_height' => 15.00,
                'volume_weight_factor' => 5000.00,
                'base_rate' => 22.50,
                'package_category' => 'tube',
            ],
        ];

        foreach ($packages as $package) {
            Package::create($package);
        }
    }
}
