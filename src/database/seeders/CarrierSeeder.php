<?php

namespace Database\Seeders;

use App\Models\Carrier;
use Illuminate\Database\Seeder;

class CarrierSeeder extends Seeder
{
    public function run(): void
    {
        $carriers = [
            [
                'name' => 'Swift Logistics Inc.',
                'carrier_code' => 'SWIFT001',
                'contact_person' => 'John Smith',
                'email' => 'dispatch@swiftlogistics.ca',
                'phone' => '+1-416-555-0101',
                'address' => '123 Industrial Ave',
                'city' => 'Toronto',
                'province' => 'ON',
                'postal_code' => 'M1A 1A1',
                'country' => 'Canada',
                'carrier_type' => 'courier',
                'service_areas' => json_encode(['GTA', 'Southern Ontario']),
                'vehicle_types' => json_encode(['van', 'truck']),
                'insurance_coverage' => 1000000.00,
                'bond_amount' => 50000.00,
            ],
            [
                'name' => 'Metro Delivery Solutions',
                'carrier_code' => 'METRO001',
                'contact_person' => 'Sarah Johnson',
                'email' => 'operations@metrodelivery.ca',
                'phone' => '+1-416-555-0202',
                'address' => '456 Commerce Blvd',
                'city' => 'Mississauga',
                'province' => 'ON',
                'postal_code' => 'L5A 2B2',
                'country' => 'Canada',
                'carrier_type' => 'ltl',
                'service_areas' => json_encode(['Ontario', 'Quebec']),
                'vehicle_types' => json_encode(['truck', 'trailer']),
                'insurance_coverage' => 2000000.00,
                'bond_amount' => 100000.00,
            ],
            [
                'name' => 'Express Courier Network',
                'carrier_code' => 'ECN001',
                'contact_person' => 'Mike Wilson',
                'email' => 'support@expresscourier.ca',
                'phone' => '+1-416-555-0303',
                'address' => '789 Logistics Way',
                'city' => 'Brampton',
                'province' => 'ON',
                'postal_code' => 'L6T 3C3',
                'country' => 'Canada',
                'carrier_type' => 'same_day',
                'service_areas' => json_encode(['GTA', 'Golden Horseshoe']),
                'vehicle_types' => json_encode(['motorcycle', 'van']),
                'insurance_coverage' => 500000.00,
                'bond_amount' => 25000.00,
            ],
            [
                'name' => 'Northern Routes Transport',
                'carrier_code' => 'NRT001',
                'contact_person' => 'David Brown',
                'email' => 'dispatch@northernroutes.ca',
                'phone' => '+1-705-555-0404',
                'address' => '321 Highway 11 North',
                'city' => 'Barrie',
                'province' => 'ON',
                'postal_code' => 'L4N 4D4',
                'country' => 'Canada',
                'carrier_type' => 'long_haul',
                'service_areas' => json_encode(['Northern Ontario', 'Western Canada']),
                'vehicle_types' => json_encode(['truck', 'trailer', 'flatbed']),
                'insurance_coverage' => 5000000.00,
                'bond_amount' => 250000.00,
            ],
        ];

        foreach ($carriers as $carrier) {
            Carrier::create($carrier);
        }
    }
}
