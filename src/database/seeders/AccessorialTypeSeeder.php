<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AccessorialType;

class AccessorialTypeSeeder extends Seeder
{
    public function run(): void
    {
        $accessorialTypes = [
            ['description' => 'Base Charges', 'code' => 'BAS', 'discount' => false, 'fuel' => false, 'new_load' => true, 'gl_code' => '4100', 'commission' => 0.00],
            ['description' => 'Weight & Handling', 'code' => 'WH', 'discount' => false, 'fuel' => false, 'new_load' => true, 'gl_code' => '4110', 'commission' => 5.00],
            ['description' => 'Fuel Surcharge', 'code' => 'FUEL', 'discount' => false, 'fuel' => true, 'new_load' => true, 'gl_code' => '4120', 'commission' => 0.00],
            ['description' => 'Residential Delivery', 'code' => 'RES', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4130', 'commission' => 3.00],
            ['description' => 'Remote Area', 'code' => 'REMOTE', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4140', 'commission' => 2.50],
            ['description' => 'Oversized Item', 'code' => 'OVER', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4150', 'commission' => 4.00],
            ['description' => 'Rush Delivery', 'code' => 'RUSH', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4160', 'commission' => 10.00],
            ['description' => 'Weekend Delivery', 'code' => 'WKND', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4170', 'commission' => 7.50],
            ['description' => 'After Hours', 'code' => 'AH', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4180', 'commission' => 8.00],
            ['description' => 'Insurance', 'code' => 'INS', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4190', 'commission' => 1.50],
            ['description' => 'COD Fee', 'code' => 'COD', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4200', 'commission' => 2.00],
            ['description' => 'Discount Applied', 'code' => 'DISC', 'discount' => true, 'fuel' => false, 'new_load' => false, 'gl_code' => '4900', 'commission' => 0.00],
            ['description' => 'Multi-Stop', 'code' => 'MULTI', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4210', 'commission' => 6.00],
            ['description' => 'Temperature Control', 'code' => 'TEMP', 'discount' => false, 'fuel' => false, 'new_load' => false, 'gl_code' => '4220', 'commission' => 15.00]
        ];

        foreach ($accessorialTypes as $type) {
            AccessorialType::create($type);
        }
    }
}