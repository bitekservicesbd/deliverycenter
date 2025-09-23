<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BillingTerm;

class BillingTermsSeeder extends Seeder
{
    public function run(): void
    {
        $billingTerms = [
            [
                'description' => 'On Receipt',
                'code' => '0',
                'days' => 0,
                'is_active' => true
            ],
            [
                'description' => 'Net 10',
                'code' => '10',
                'days' => 10,
                'is_active' => true
            ],
            [
                'description' => 'Net 30',
                'code' => '30',
                'days' => 30,
                'is_active' => true
            ],
            [
                'description' => 'Net 60',
                'code' => '60',
                'days' => 60,
                'is_active' => true
            ],
            [
                'description' => 'Net 15',
                'code' => '15',
                'days' => 15,
                'is_active' => true
            ],
            [
                'description' => 'Net 45',
                'code' => '45',
                'days' => 45,
                'is_active' => true
            ],
            [
                'description' => 'Net 90',
                'code' => '90',
                'days' => 90,
                'is_active' => true
            ],
            [
                'description' => 'Net 120',
                'code' => '120',
                'days' => 120,
                'is_active' => true
            ]
        ];

        foreach ($billingTerms as $term) {
            BillingTerm::updateOrCreate(
                ['code' => $term['code']],
                $term
            );
        }
    }
}