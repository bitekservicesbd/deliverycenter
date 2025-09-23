<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UomType;

class UomTypeSeeder extends Seeder
{
    public function run(): void
    {
        $uomTypes = [
            // Weight Units
            ['name' => 'Kilogram', 'code' => 'KG', 'category' => 'weight', 'base_unit' => true, 'conversion_factor' => 1.000000, 'symbol' => 'kg'],
            ['name' => 'Gram', 'code' => 'G', 'category' => 'weight', 'base_unit' => false, 'conversion_factor' => 0.001000, 'symbol' => 'g'],
            ['name' => 'Pound', 'code' => 'LB', 'category' => 'weight', 'base_unit' => false, 'conversion_factor' => 0.453592, 'symbol' => 'lbs'],
            ['name' => 'Ounce', 'code' => 'OZ', 'category' => 'weight', 'base_unit' => false, 'conversion_factor' => 0.028350, 'symbol' => 'oz'],
            
            // Length/Distance Units
            ['name' => 'Centimeter', 'code' => 'CM', 'category' => 'length', 'base_unit' => true, 'conversion_factor' => 1.000000, 'symbol' => 'cm'],
            ['name' => 'Meter', 'code' => 'M', 'category' => 'length', 'base_unit' => false, 'conversion_factor' => 100.000000, 'symbol' => 'm'],
            ['name' => 'Inch', 'code' => 'IN', 'category' => 'length', 'base_unit' => false, 'conversion_factor' => 2.540000, 'symbol' => 'in'],
            ['name' => 'Foot', 'code' => 'FT', 'category' => 'length', 'base_unit' => false, 'conversion_factor' => 30.480000, 'symbol' => 'ft'],
            ['name' => 'Kilometer', 'code' => 'KM', 'category' => 'distance', 'base_unit' => true, 'conversion_factor' => 1.000000, 'symbol' => 'km'],
            ['name' => 'Mile', 'code' => 'MI', 'category' => 'distance', 'base_unit' => false, 'conversion_factor' => 1.609344, 'symbol' => 'mi'],
            
            // Volume Units
            ['name' => 'Cubic Meter', 'code' => 'CBM', 'category' => 'volume', 'base_unit' => true, 'conversion_factor' => 1.000000, 'symbol' => 'm³'],
            ['name' => 'Cubic Centimeter', 'code' => 'CCM', 'category' => 'volume', 'base_unit' => false, 'conversion_factor' => 0.000001, 'symbol' => 'cm³'],
            ['name' => 'Cubic Foot', 'code' => 'CFT', 'category' => 'volume', 'base_unit' => false, 'conversion_factor' => 0.028317, 'symbol' => 'ft³'],
            ['name' => 'Liter', 'code' => 'L', 'category' => 'volume', 'base_unit' => false, 'conversion_factor' => 0.001000, 'symbol' => 'L'],
            
            // Count Units
            ['name' => 'Piece', 'code' => 'PC', 'category' => 'count', 'base_unit' => true, 'conversion_factor' => 1.000000, 'symbol' => 'pc'],
            ['name' => 'Package', 'code' => 'PKG', 'category' => 'count', 'base_unit' => false, 'conversion_factor' => 1.000000, 'symbol' => 'pkg'],
            ['name' => 'Pallet', 'code' => 'PAL', 'category' => 'count', 'base_unit' => false, 'conversion_factor' => 1.000000, 'symbol' => 'pal'],
            ['name' => 'Carton', 'code' => 'CTN', 'category' => 'count', 'base_unit' => false, 'conversion_factor' => 1.000000, 'symbol' => 'ctn']
        ];

        foreach ($uomTypes as $uom) {
            UomType::create($uom);
        }
    }
}