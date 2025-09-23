<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ZoneCount;

class ZoneCountSeeder extends Seeder
{
    public function run(): void
    {
        $zoneCounts = [
            [
                'zone_id' => 1, // GTA Core
                'count_date' => '2024-01-15',
                'delivery_count' => 1250,
                'pickup_count' => 890,
                'total_packages' => 2850,
                'total_weight' => 15750.50,
                'total_revenue' => 45250.75,
                'avg_delivery_time' => 2.5,
                'success_rate' => 98.5
            ],
            [
                'zone_id' => 2, // GTA Extended
                'count_date' => '2024-01-15',
                'delivery_count' => 850,
                'pickup_count' => 620,
                'total_packages' => 1950,
                'total_weight' => 12450.25,
                'total_revenue' => 35890.50,
                'avg_delivery_time' => 3.2,
                'success_rate' => 97.8
            ],
            [
                'zone_id' => 3, // Southern Ontario
                'count_date' => '2024-01-15',
                'delivery_count' => 450,
                'pickup_count' => 320,
                'total_packages' => 1150,
                'total_weight' => 8950.75,
                'total_revenue' => 28750.25,
                'avg_delivery_time' => 24.0,
                'success_rate' => 96.2
            ],
            [
                'zone_id' => 4, // Quebec Metro
                'count_date' => '2024-01-15',
                'delivery_count' => 675,
                'pickup_count' => 480,
                'total_packages' => 1580,
                'total_weight' => 10250.00,
                'total_revenue' => 32500.00,
                'avg_delivery_time' => 4.5,
                'success_rate' => 97.1
            ],
            [
                'zone_id' => 5, // Western Canada
                'count_date' => '2024-01-15',
                'delivery_count' => 125,
                'pickup_count' => 85,
                'total_packages' => 385,
                'total_weight' => 5850.50,
                'total_revenue' => 18950.75,
                'avg_delivery_time' => 120.0,
                'success_rate' => 94.5
            ],
            [
                'zone_id' => 6, // Atlantic Canada
                'count_date' => '2024-01-15',
                'delivery_count' => 95,
                'pickup_count' => 65,
                'total_packages' => 285,
                'total_weight' => 4250.25,
                'total_revenue' => 15750.50,
                'avg_delivery_time' => 96.0,
                'success_rate' => 95.8
            ],
            [
                'zone_id' => 7, // Remote Areas
                'count_date' => '2024-01-15',
                'delivery_count' => 15,
                'pickup_count' => 8,
                'total_packages' => 45,
                'total_weight' => 1250.00,
                'total_revenue' => 8950.00,
                'avg_delivery_time' => 240.0,
                'success_rate' => 89.5
            ],
            [
                'zone_id' => 8, // Express Priority
                'count_date' => '2024-01-15',
                'delivery_count' => 350,
                'pickup_count' => 280,
                'total_packages' => 750,
                'total_weight' => 2850.75,
                'total_revenue' => 18750.50,
                'avg_delivery_time' => 4.0,
                'success_rate' => 99.2
            ]
        ];

        foreach ($zoneCounts as $count) {
            ZoneCount::create($count);
        }
    }
}
