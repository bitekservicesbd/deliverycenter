<?php

namespace Database\Seeders;

use App\Models\ProvincialTax;
use Illuminate\Database\Seeder;

class ProvincialTaxSeeder extends Seeder
{
    public function run(): void
    {
        $provincialTaxes = [
            // Federal GST/HST rates for all provinces
            ['province_code' => 'AB', 'province_name' => 'Alberta', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'BC', 'province_name' => 'British Columbia', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'BC', 'province_name' => 'British Columbia', 'tax_type' => 'PST', 'tax_rate' => 7.00, 'tax_number' => null],
            ['province_code' => 'MB', 'province_name' => 'Manitoba', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'MB', 'province_name' => 'Manitoba', 'tax_type' => 'PST', 'tax_rate' => 7.00, 'tax_number' => null],
            ['province_code' => 'NB', 'province_name' => 'New Brunswick', 'tax_type' => 'HST', 'tax_rate' => 15.00, 'tax_number' => null],
            ['province_code' => 'NL', 'province_name' => 'Newfoundland and Labrador', 'tax_type' => 'HST', 'tax_rate' => 15.00, 'tax_number' => null],
            ['province_code' => 'NT', 'province_name' => 'Northwest Territories', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'NS', 'province_name' => 'Nova Scotia', 'tax_type' => 'HST', 'tax_rate' => 15.00, 'tax_number' => null],
            ['province_code' => 'NU', 'province_name' => 'Nunavut', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'ON', 'province_name' => 'Ontario', 'tax_type' => 'HST', 'tax_rate' => 13.00, 'tax_number' => null],
            ['province_code' => 'PE', 'province_name' => 'Prince Edward Island', 'tax_type' => 'HST', 'tax_rate' => 15.00, 'tax_number' => null],
            ['province_code' => 'QC', 'province_name' => 'Quebec', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'QC', 'province_name' => 'Quebec', 'tax_type' => 'QST', 'tax_rate' => 9.975, 'tax_number' => null],
            ['province_code' => 'SK', 'province_name' => 'Saskatchewan', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
            ['province_code' => 'SK', 'province_name' => 'Saskatchewan', 'tax_type' => 'PST', 'tax_rate' => 6.00, 'tax_number' => null],
            ['province_code' => 'YT', 'province_name' => 'Yukon', 'tax_type' => 'GST', 'tax_rate' => 5.00, 'tax_number' => null],
        ];

        foreach ($provincialTaxes as $tax) {
            ProvincialTax::create($tax);
        }
    }
}
