<?php 

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleType;

class VehicleTypeSeeder extends Seeder
{
    public function run(): void
    {
        $vehicleTypes = [
            [
                'name' => 'Motorcycle',
                'code' => 'MOTORCYCLE',
                'description' => 'Motorcycle for urgent small package delivery',
                'max_weight_capacity' => 15.00,
                'max_volume_capacity' => 0.50,
                'fuel_efficiency' => 25.00,
                'vehicle_class' => 'light_duty',
                'equipment_requirements' => json_encode(['delivery_box', 'gps_tracker']),
                'license_requirements' => json_encode(['motorcycle_license']),
                'typical_uses' => json_encode(['same_day', 'express', 'documents'])
            ],
            [
                'name' => 'Cargo Van',
                'code' => 'VAN',
                'description' => 'Standard cargo van for local deliveries',
                'max_weight_capacity' => 1500.00,
                'max_volume_capacity' => 15.00,
                'fuel_efficiency' => 12.00,
                'vehicle_class' => 'light_duty',
                'equipment_requirements' => json_encode(['dolly', 'straps', 'gps_tracker']),
                'license_requirements' => json_encode(['class_g_license']),
                'typical_uses' => json_encode(['local_delivery', 'courier', 'small_freight'])
            ],
            [
                'name' => 'Cube Truck',
                'code' => 'CUBE_TRUCK',
                'description' => 'Box truck for medium freight deliveries',
                'max_weight_capacity' => 4500.00,
                'max_volume_capacity' => 45.00,
                'fuel_efficiency' => 8.50,
                'vehicle_class' => 'medium_duty',
                'equipment_requirements' => json_encode(['lift_gate', 'dolly', 'straps', 'gps_tracker']),
                'license_requirements' => json_encode(['class_g_license', 'dz_license']),
                'typical_uses' => json_encode(['ltl_freight', 'furniture_delivery', 'appliances'])
            ],
            [
                'name' => 'Straight Truck',
                'code' => 'STRAIGHT_TRUCK',
                'description' => 'Single unit truck for larger freight',
                'max_weight_capacity' => 12000.00,
                'max_volume_capacity' => 80.00,
                'fuel_efficiency' => 6.00,
                'vehicle_class' => 'heavy_duty',
                'equipment_requirements' => json_encode(['hydraulic_lift', 'loading_ramp', 'gps_tracker']),
                'license_requirements' => json_encode(['dz_license', 'air_brake_endorsement']),
                'typical_uses' => json_encode(['freight_delivery', 'industrial_equipment', 'bulk_goods'])
            ],
            [
                'name' => 'Tractor Trailer',
                'code' => 'TRACTOR_TRAILER',
                'description' => 'Semi-truck with trailer for long haul',
                'max_weight_capacity' => 26000.00,
                'max_volume_capacity' => 150.00,
                'fuel_efficiency' => 4.50,
                'vehicle_class' => 'commercial',
                'equipment_requirements' => json_encode(['electronic_logs', 'gps_tracker', 'safety_equipment']),
                'license_requirements' => json_encode(['az_license', 'air_brake_endorsement', 'dangerous_goods']),
                'typical_uses' => json_encode(['long_haul', 'truckload', 'cross_country'])
            ],
            [
                'name' => 'Refrigerated Truck',
                'code' => 'REEFER',
                'description' => 'Temperature controlled vehicle',
                'max_weight_capacity' => 8000.00,
                'max_volume_capacity' => 60.00,
                'fuel_efficiency' => 5.50,
                'vehicle_class' => 'specialized',
                'equipment_requirements' => json_encode(['refrigeration_unit', 'temperature_monitoring', 'gps_tracker']),
                'license_requirements' => json_encode(['dz_license', 'temperature_controlled_endorsement']),
                'typical_uses' => json_encode(['cold_chain', 'pharmaceuticals', 'food_delivery'])
            ]
        ];

        foreach ($vehicleTypes as $vehicleType) {
            VehicleType::create($vehicleType);
        }
    }
}