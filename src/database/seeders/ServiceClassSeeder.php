<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceClass;

class ServiceClassSeeder extends Seeder
{
    public function run(): void
    {
        $serviceClasses = [
            [
                'name' => 'Same Day',
                'code' => 'SAME_DAY',
                'description' => 'Same day delivery service',
                'delivery_time_hours' => 8,
                'priority_level' => 1,
                'base_rate_multiplier' => 2.50,
                'cutoff_time' => '14:00:00',
                'weekend_service' => false,
                'tracking_included' => true,
                'insurance_included' => true,
                'signature_required' => true
            ],
            [
                'name' => 'Express',
                'code' => 'EXPRESS',
                'description' => 'Next business day by 10:30 AM',
                'delivery_time_hours' => 24,
                'priority_level' => 2,
                'base_rate_multiplier' => 1.75,
                'cutoff_time' => '16:00:00',
                'weekend_service' => false,
                'tracking_included' => true,
                'insurance_included' => true,
                'signature_required' => true
            ],
            [
                'name' => 'Priority',
                'code' => 'PRIORITY',
                'description' => 'Next business day by end of day',
                'delivery_time_hours' => 24,
                'priority_level' => 3,
                'base_rate_multiplier' => 1.35,
                'cutoff_time' => '17:00:00',
                'weekend_service' => false,
                'tracking_included' => true,
                'insurance_included' => false,
                'signature_required' => false
            ],
            [
                'name' => 'Standard',
                'code' => 'STANDARD',
                'description' => '2-3 business days delivery',
                'delivery_time_hours' => 72,
                'priority_level' => 4,
                'base_rate_multiplier' => 1.00,
                'cutoff_time' => '18:00:00',
                'weekend_service' => false,
                'tracking_included' => true,
                'insurance_included' => false,
                'signature_required' => false
            ],
            [
                'name' => 'Economy',
                'code' => 'ECONOMY',
                'description' => '5-7 business days delivery',
                'delivery_time_hours' => 168,
                'priority_level' => 5,
                'base_rate_multiplier' => 0.75,
                'cutoff_time' => '20:00:00',
                'weekend_service' => false,
                'tracking_included' => false,
                'insurance_included' => false,
                'signature_required' => false
            ],
            [
                'name' => 'Rush',
                'code' => 'RUSH',
                'description' => 'Emergency rush delivery within 4 hours',
                'delivery_time_hours' => 4,
                'priority_level' => 1,
                'base_rate_multiplier' => 4.00,
                'cutoff_time' => '20:00:00',
                'weekend_service' => true,
                'tracking_included' => true,
                'insurance_included' => true,
                'signature_required' => true
            ]
        ];

        foreach ($serviceClasses as $serviceClass) {
            ServiceClass::create($serviceClass);
        }
    }
}