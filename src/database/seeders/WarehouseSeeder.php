<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Warehouse;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            [
                'warehouse_code' => 'WH-TOR-001',
                'name' => 'Toronto Distribution Center',
                'address' => '1500 Steeles Avenue West',
                'city' => 'Toronto',
                'province' => 'ON',
                'postal_code' => 'M3J 3K2',
                'country' => 'Canada',
                'phone' => '+1-416-555-9001',
                'email' => 'toronto@warehouse.ca',
                'manager_name' => 'Jennifer Smith',
                'warehouse_type' => 'distribution',
                'total_area_sqft' => 125000.00,
                'dock_count' => 24,
                'storage_capacity_pallets' => 8500,
                'temperature_controlled' => true,
                'operating_hours' => json_encode([
                    'monday' => ['open' => '06:00', 'close' => '22:00'],
                    'tuesday' => ['open' => '06:00', 'close' => '22:00'],
                    'wednesday' => ['open' => '06:00', 'close' => '22:00'],
                    'thursday' => ['open' => '06:00', 'close' => '22:00'],
                    'friday' => ['open' => '06:00', 'close' => '22:00'],
                    'saturday' => ['open' => '08:00', 'close' => '18:00'],
                    'sunday' => ['open' => '10:00', 'close' => '16:00']
                ]),
                'equipment_available' => json_encode([
                    'forklifts' => 12,
                    'pallet_jacks' => 25,
                    'reach_trucks' => 4,
                    'dock_levelers' => 24,
                    'conveyor_systems' => true,
                    'automated_sorting' => true
                ])
            ],
            [
                'warehouse_code' => 'WH-MTL-001',
                'name' => 'Montreal Logistics Hub',
                'address' => '3200 Boulevard Metropolitain Est',
                'city' => 'Montreal',
                'province' => 'QC',
                'postal_code' => 'H1P 1X7',
                'country' => 'Canada',
                'phone' => '+1-514-555-9002',
                'email' => 'montreal@warehouse.ca',
                'manager_name' => 'Pierre Dubois',
                'warehouse_type' => 'cross_dock',
                'total_area_sqft' => 85000.00,
                'dock_count' => 18,
                'storage_capacity_pallets' => 3500,
                'temperature_controlled' => false,
                'operating_hours' => json_encode([
                    'monday' => ['open' => '05:00', 'close' => '21:00'],
                    'tuesday' => ['open' => '05:00', 'close' => '21:00'],
                    'wednesday' => ['open' => '05:00', 'close' => '21:00'],
                    'thursday' => ['open' => '05:00', 'close' => '21:00'],
                    'friday' => ['open' => '05:00', 'close' => '21:00'],
                    'saturday' => ['open' => '07:00', 'close' => '17:00'],
                    'sunday' => ['open' => null, 'close' => null]
                ]),
                'equipment_available' => json_encode([
                    'forklifts' => 8,
                    'pallet_jacks' => 18,
                    'reach_trucks' => 2,
                    'dock_levelers' => 18,
                    'conveyor_systems' => true,
                    'automated_sorting' => false
                ])
            ],
            [
                'warehouse_code' => 'WH-VAN-001',
                'name' => 'Vancouver Pacific Terminal',
                'address' => '8888 Riverside Drive',
                'city' => 'Vancouver',
                'province' => 'BC',
                'postal_code' => 'V5X 3T8',
                'country' => 'Canada',
                'phone' => '+1-604-555-9003',
                'email' => 'vancouver@warehouse.ca',
                'manager_name' => 'David Chen',
                'warehouse_type' => 'port_facility',
                'total_area_sqft' => 200000.00,
                'dock_count' => 32,
                'storage_capacity_pallets' => 15000,
                'temperature_controlled' => true,
                'operating_hours' => json_encode([
                    'monday' => ['open' => '24/7', 'close' => '24/7'],
                    'tuesday' => ['open' => '24/7', 'close' => '24/7'],
                    'wednesday' => ['open' => '24/7', 'close' => '24/7'],
                    'thursday' => ['open' => '24/7', 'close' => '24/7'],
                    'friday' => ['open' => '24/7', 'close' => '24/7'],
                    'saturday' => ['open' => '24/7', 'close' => '24/7'],
                    'sunday' => ['open' => '24/7', 'close' => '24/7']
                ]),
                'equipment_available' => json_encode([
                    'forklifts' => 20,
                    'pallet_jacks' => 45,
                    'reach_trucks' => 8,
                    'dock_levelers' => 32,
                    'container_cranes' => 4,
                    'rail_access' => true,
                    'conveyor_systems' => true,
                    'automated_sorting' => true
                ])
            ],
            [
                'warehouse_code' => 'WH-CAL-001',
                'name' => 'Calgary Regional Depot',
                'address' => '4500 76th Avenue SE',
                'city' => 'Calgary',
                'province' => 'AB',
                'postal_code' => 'T2C 2G8',
                'country' => 'Canada',
                'phone' => '+1-403-555-9004',
                'email' => 'calgary@warehouse.ca',
                'manager_name' => 'Sarah Thompson',
                'warehouse_type' => 'regional_depot',
                'total_area_sqft' => 65000.00,
                'dock_count' => 14,
                'storage_capacity_pallets' => 4500,
                'temperature_controlled' => false,
                'operating_hours' => json_encode([
                    'monday' => ['open' => '06:00', 'close' => '20:00'],
                    'tuesday' => ['open' => '06:00', 'close' => '20:00'],
                    'wednesday' => ['open' => '06:00', 'close' => '20:00'],
                    'thursday' => ['open' => '06:00', 'close' => '20:00'],
                    'friday' => ['open' => '06:00', 'close' => '20:00'],
                    'saturday' => ['open' => '08:00', 'close' => '16:00'],
                    'sunday' => ['open' => null, 'close' => null]
                ]),
                'equipment_available' => json_encode([
                    'forklifts' => 6,
                    'pallet_jacks' => 15,
                    'reach_trucks' => 2,
                    'dock_levelers' => 14,
                    'conveyor_systems' => false,
                    'automated_sorting' => false
                ])
            ]
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::create($warehouse);
        }
    }
}