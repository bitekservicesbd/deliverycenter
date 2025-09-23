<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tax;

class TaxSeeder extends Seeder
{
    public function run(): void
    {
        $taxes = [
            [
                'tax_name' => 'HST Ontario',
                'tax_code' => 'HST_ON',
                'tax_rate' => 13.00,
                'tax_type' => 'HST',
                'applies_to' => 'total_charges',
                'province_code' => 'ON',
                'is_compound' => false,
                'tax_number' => 'RT0001',
                'effective_date' => '2024-01-01'
            ],
            [
                'tax_name' => 'GST Federal',
                'tax_code' => 'GST_CA',
                'tax_rate' => 5.00,
                'tax_type' => 'GST',
                'applies_to' => 'total_charges',
                'province_code' => 'AB',
                'is_compound' => false,
                'tax_number' => 'RT0001',
                'effective_date' => '2024-01-01'
            ],
            [
                'tax_name' => 'PST British Columbia',
                'tax_code' => 'PST_BC',
                'tax_rate' => 7.00,
                'tax_type' => 'PST',
                'applies_to' => 'subtotal',
                'province_code' => 'BC',
                'is_compound' => false,
                'tax_number' => 'PST-12345',
                'effective_date' => '2024-01-01'
            ],
            [
                'tax_name' => 'QST Quebec',
                'tax_code' => 'QST_QC',
                'tax_rate' => 9.975,
                'tax_type' => 'QST',
                'applies_to' => 'gst_inclusive',
                'province_code' => 'QC',
                'is_compound' => true,
                'tax_number' => 'QST-67890',
                'effective_date' => '2024-01-01'
            ],
            [
                'tax_name' => 'HST Nova Scotia',
                'tax_code' => 'HST_NS',
                'tax_rate' => 15.00,
                'tax_type' => 'HST',
                'applies_to' => 'total_charges',
                'province_code' => 'NS',
                'is_compound' => false,
                'tax_number' => 'RT0001',
                'effective_date' => '2024-01-01'
            ]
        ];

        foreach ($taxes as $tax) {
            Tax::create($tax);
        }
    }
}