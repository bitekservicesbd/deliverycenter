<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BillingGroup;

class BillingGroupSeeder extends Seeder
{
    public function run(): void
    {
        $billingGroups = [
            [
                'name' => 'Corporate Accounts',
                'description' => 'Large corporate customers with monthly billing',
                'billing_cycle' => 'monthly',
                'payment_terms' => 'NET30',
                'auto_generate_invoices' => true,
                'consolidate_orders' => true,
                'discount_percentage' => 15.00,
                'credit_limit' => 50000.00
            ],
            [
                'name' => 'Small Business',
                'description' => 'Small to medium business customers',
                'billing_cycle' => 'bi_weekly',
                'payment_terms' => 'NET15',
                'auto_generate_invoices' => true,
                'consolidate_orders' => true,
                'discount_percentage' => 8.00,
                'credit_limit' => 10000.00
            ],
            [
                'name' => 'Retail Customers',
                'description' => 'Individual and retail customers',
                'billing_cycle' => 'immediate',
                'payment_terms' => 'COD',
                'auto_generate_invoices' => false,
                'consolidate_orders' => false,
                'discount_percentage' => 0.00,
                'credit_limit' => 1000.00
            ],
            [
                'name' => 'Premium Partners',
                'description' => 'High-volume strategic partners',
                'billing_cycle' => 'monthly',
                'payment_terms' => 'NET45',
                'auto_generate_invoices' => true,
                'consolidate_orders' => true,
                'discount_percentage' => 25.00,
                'credit_limit' => 100000.00
            ],
            [
                'name' => 'Government Accounts',
                'description' => 'Government and institutional customers',
                'billing_cycle' => 'monthly',
                'payment_terms' => 'NET60',
                'auto_generate_invoices' => true,
                'consolidate_orders' => true,
                'discount_percentage' => 5.00,
                'credit_limit' => 75000.00
            ]
        ];

        foreach ($billingGroups as $group) {
            BillingGroup::create($group);
        }
    }
}