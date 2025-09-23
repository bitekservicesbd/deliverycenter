<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ZoneGroup;

class ZoneGroupSeeder extends Seeder
{
    public function run(): void
    {
        $zoneGroups = [
            [
                'group_name' => 'Ontario Local',
                'group_code' => 'ON-LOCAL',
                'description' => 'Local Ontario delivery zones',
                'zones' => json_encode(['GTA-CORE', 'GTA-EXT', 'SO-REG']),
                'pricing_tier' => 'local',
                'service_level' => 'standard',
                'transit_time_days' => 1,
                'group_discount' => 5.00
            ],
            [
                'group_name' => 'Quebec Regional',
                'group_code' => 'QC-REG',
                'description' => 'Quebec regional delivery group',
                'zones' => json_encode(['QC-METRO']),
                'pricing_tier' => 'regional',
                'service_level' => 'standard',
                'transit_time_days' => 2,
                'group_discount' => 3.00
            ],
            [
                'group_name' => 'Cross Country',
                'group_code' => 'CROSS-CA',
                'description' => 'Cross country delivery zones',
                'zones' => json_encode(['WC-REG', 'AC-REG']),
                'pricing_tier' => 'national',
                'service_level' => 'economy',
                'transit_time_days' => 5,
                'group_discount' => 10.00
            ],
            [
                'group_name' => 'Express Network',
                'group_code' => 'EXPRESS-NET',
                'description' => 'Express delivery network zones',
                'zones' => json_encode(['EXPRESS', 'GTA-CORE']),
                'pricing_tier' => 'premium',
                'service_level' => 'express',
                'transit_time_days' => 0,
                'group_discount' => 0.00
            ],
            [
                'group_name' => 'Remote Territories',
                'group_code' => 'REMOTE-TERR',
                'description' => 'Remote and northern territories group',
                'zones' => json_encode(['REMOTE']),
                'pricing_tier' => 'specialized',
                'service_level' => 'extended',
                'transit_time_days' => 10,
                'group_discount' => 0.00
            ]
        ];

        foreach ($zoneGroups as $group) {
            ZoneGroup::create($group);
        }
    }
}