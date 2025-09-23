<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DeductionType;

class DeductionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $deductionTypes = [
            [
                'name' => 'Volume Discount',
                'code' => 'VOL_DISC',
                'description' => 'Discount based on shipping volume',
                'deduction_type' => 'percentage',
                'default_amount' => 10.00,
                'min_threshold' => 1000.00,
                'max_deduction' => 500.00,
                'applies_to' => 'base_charges'
            ],
            [
                'name' => 'Customer Loyalty',
                'code' => 'LOYALTY',
                'description' => 'Loyalty discount for long-term customers',
                'deduction_type' => 'percentage',
                'default_amount' => 5.00,
                'min_threshold' => 500.00,
                'max_deduction' => 250.00,
                'applies_to' => 'total_charges'
            ],
            [
                'name' => 'Promotional Discount',
                'code' => 'PROMO',
                'description' => 'Temporary promotional discounts',
                'deduction_type' => 'fixed',
                'default_amount' => 25.00,
                'min_threshold' => 100.00,
                'max_deduction' => 100.00,
                'applies_to' => 'total_charges'
            ],
            [
                'name' => 'Early Payment',
                'code' => 'EARLY_PAY',
                'description' => 'Discount for early payment',
                'deduction_type' => 'percentage',
                'default_amount' => 2.00,
                'min_threshold' => 0.00,
                'max_deduction' => 100.00,
                'applies_to' => 'total_charges'
            ],
            [
                'name' => 'Bulk Order',
                'code' => 'BULK',
                'description' => 'Discount for bulk orders',
                'deduction_type' => 'percentage',
                'default_amount' => 15.00,
                'min_threshold' => 2000.00,
                'max_deduction' => 1000.00,
                'applies_to' => 'base_charges'
            ]
        ];

        foreach ($deductionTypes as $type) {
            DeductionType::create($type);
        }
    }
}