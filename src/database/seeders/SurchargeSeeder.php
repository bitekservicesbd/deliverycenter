<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Surcharge;

class SurchargeSeeder extends Seeder
{
    public function run(): void
    {
        $surcharges = [
            [
                'name' => 'Residential Delivery',
                'code' => 'RES_DEL',
                'description' => 'Additional charge for residential deliveries',
                'surcharge_type' => 'fixed',
                'amount' => 8.50,
                'percentage' => null,
                'applies_to' => 'delivery',
                'conditions' => json_encode(['address_type' => 'residential']),
                'minimum_charge' => 5.00,
                'maximum_charge' => 15.00
            ],
            [
                'name' => 'Fuel Surcharge',
                'code' => 'FUEL',
                'description' => 'Fuel price adjustment surcharge',
                'surcharge_type' => 'percentage',
                'amount' => null,
                'percentage' => 18.50,
                'applies_to' => 'base_charges',
                'conditions' => json_encode(['fuel_price_above' => 1.50]),
                'minimum_charge' => 2.00,
                'maximum_charge' => 50.00
            ],
            [
                'name' => 'Oversized Package',
                'code' => 'OVERSIZE',
                'description' => 'Surcharge for packages exceeding size limits',
                'surcharge_type' => 'fixed',
                'amount' => 35.00,
                'percentage' => null,
                'applies_to' => 'package',
                'conditions' => json_encode([
                    'max_dimension_over' => 120,
                    'or_weight_over' => 30
                ]),
                'minimum_charge' => 25.00,
                'maximum_charge' => 75.00
            ],
            [
                'name' => 'Remote Area',
                'code' => 'REMOTE',
                'description' => 'Additional charge for remote area deliveries',
                'surcharge_type' => 'fixed',
                'amount' => 25.00,
                'percentage' => null,
                'applies_to' => 'delivery',
                'conditions' => json_encode(['postal_code_prefix' => ['X0', 'Y0', 'T0']]),
                'minimum_charge' => 15.00,
                'maximum_charge' => 50.00
            ],
            [
                'name' => 'After Hours',
                'code' => 'AFTER_HOURS',
                'description' => 'Surcharge for deliveries outside business hours',
                'surcharge_type' => 'percentage',
                'amount' => null,
                'percentage' => 25.00,
                'applies_to' => 'total_charges',
                'conditions' => json_encode([
                    'delivery_time_before' => '08:00',
                    'delivery_time_after' => '18:00'
                ]),
                'minimum_charge' => 10.00,
                'maximum_charge' => 100.00
            ],
            [
                'name' => 'Weekend Delivery',
                'code' => 'WEEKEND',
                'description' => 'Additional charge for weekend deliveries',
                'surcharge_type' => 'fixed',
                'amount' => 20.00,
                'percentage' => null,
                'applies_to' => 'delivery',
                'conditions' => json_encode(['delivery_day' => ['Saturday', 'Sunday']]),
                'minimum_charge' => 15.00,
                'maximum_charge' => 30.00
            ],
            [
                'name' => 'Insurance',
                'code' => 'INSURANCE',
                'description' => 'Package insurance surcharge',
                'surcharge_type' => 'percentage',
                'amount' => null,
                'percentage' => 1.50,
                'applies_to' => 'declared_value',
                'conditions' => json_encode(['declared_value_over' => 100]),
                'minimum_charge' => 5.00,
                'maximum_charge' => 200.00
            ],
            [
                'name' => 'Signature Required',
                'code' => 'SIGNATURE',
                'description' => 'Additional charge for signature confirmation',
                'surcharge_type' => 'fixed',
                'amount' => 6.50,
                'percentage' => null,
                'applies_to' => 'service',
                'conditions' => json_encode(['signature_required' => true]),
                'minimum_charge' => 5.00,
                'maximum_charge' => 10.00
            ]
        ];

        foreach ($surcharges as $surcharge) {
            Surcharge::create($surcharge);
        }
    }
}