<?php

namespace Database\Seeders;

use App\Models\Dock;
use Illuminate\Database\Seeder;

class DockSeeder extends Seeder
{
    public function run(): void
    {
        $docks = [
            [
                'dock_number' => 'DOCK-001',
                'name' => 'Loading Bay A',
                'warehouse_id' => 1,
                'dock_type' => 'loading',
                'capacity_weight' => 5000.00,
                'capacity_volume' => 50.00,
                'equipment_available' => json_encode(['forklift', 'pallet_jack', 'dock_leveler']),
                'operating_hours' => json_encode([
                    'monday' => ['start' => '06:00', 'end' => '18:00'],
                    'tuesday' => ['start' => '06:00', 'end' => '18:00'],
                    'wednesday' => ['start' => '06:00', 'end' => '18:00'],
                    'thursday' => ['start' => '06:00', 'end' => '18:00'],
                    'friday' => ['start' => '06:00', 'end' => '18:00'],
                    'saturday' => ['start' => '08:00', 'end' => '16:00'],
                    'sunday' => ['start' => null, 'end' => null],
                ]),
                'height_clearance' => 4.50,
                'width_clearance' => 3.00,
            ],
            [
                'dock_number' => 'DOCK-002',
                'name' => 'Unloading Bay B',
                'warehouse_id' => 1,
                'dock_type' => 'unloading',
                'capacity_weight' => 7500.00,
                'capacity_volume' => 75.00,
                'equipment_available' => json_encode(['overhead_crane', 'forklift', 'conveyor_belt']),
                'operating_hours' => json_encode([
                    'monday' => ['start' => '05:00', 'end' => '20:00'],
                    'tuesday' => ['start' => '05:00', 'end' => '20:00'],
                    'wednesday' => ['start' => '05:00', 'end' => '20:00'],
                    'thursday' => ['start' => '05:00', 'end' => '20:00'],
                    'friday' => ['start' => '05:00', 'end' => '20:00'],
                    'saturday' => ['start' => '07:00', 'end' => '19:00'],
                    'sunday' => ['start' => '09:00', 'end' => '17:00'],
                ]),
                'height_clearance' => 5.00,
                'width_clearance' => 3.50,
            ],
            [
                'dock_number' => 'DOCK-003',
                'name' => 'Express Terminal',
                'warehouse_id' => 2,
                'dock_type' => 'express',
                'capacity_weight' => 2000.00,
                'capacity_volume' => 25.00,
                'equipment_available' => json_encode(['automated_sorting', 'barcode_scanner', 'pallet_jack']),
                'operating_hours' => json_encode([
                    'monday' => ['start' => '24/7', 'end' => '24/7'],
                    'tuesday' => ['start' => '24/7', 'end' => '24/7'],
                    'wednesday' => ['start' => '24/7', 'end' => '24/7'],
                    'thursday' => ['start' => '24/7', 'end' => '24/7'],
                    'friday' => ['start' => '24/7', 'end' => '24/7'],
                    'saturday' => ['start' => '24/7', 'end' => '24/7'],
                    'sunday' => ['start' => '24/7', 'end' => '24/7'],
                ]),
                'height_clearance' => 3.00,
                'width_clearance' => 2.50,
            ],
        ];

        foreach ($docks as $dock) {
            Dock::create($dock);
        }
    }
}
