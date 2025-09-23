<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'customer_number' => 'CUST001',
                'name' => 'Tech Solutions Inc.',
                'contact_person' => 'Alice Johnson',
                'email' => 'orders@techsolutions.ca',
                'phone' => '+1-416-555-1001',
                'address' => '400 Bay Street',
                'city' => 'Toronto',
                'province' => 'ON',
                'postal_code' => 'M5H 2Y2',
                'country' => 'Canada',
                'customer_type' => 'business',
                'billing_group_id' => 1,
                'credit_limit' => 25000.00,
                'payment_terms' => 'NET30'
            ],
            [
                'customer_number' => 'CUST002', 
                'name' => 'Medical Supplies Direct',
                'contact_person' => 'Dr. Robert Chen',
                'email' => 'shipping@medsupplies.ca',
                'phone' => '+1-416-555-1002',
                'address' => '150 University Ave',
                'city' => 'Toronto',
                'province' => 'ON',
                'postal_code' => 'M5H 3M5',
                'country' => 'Canada',
                'customer_type' => 'business',
                'billing_group_id' => 1,
                'credit_limit' => 50000.00,
                'payment_terms' => 'NET15'
            ],
            [
                'customer_number' => 'CUST003',
                'name' => 'Fashion Boutique Ltd.',
                'contact_person' => 'Maria Rodriguez',
                'email' => 'orders@fashionboutique.ca',
                'phone' => '+1-416-555-1003',
                'address' => '225 Queen Street West',
                'city' => 'Toronto',
                'province' => 'ON',
                'postal_code' => 'M5V 1Z4',
                'country' => 'Canada',
                'customer_type' => 'retail',
                'billing_group_id' => 3,
                'credit_limit' => 10000.00,
                'payment_terms' => 'COD'
            ],
            [
                'customer_number' => 'CUST004',
                'name' => 'Manufacturing Corp',
                'contact_person' => 'James Wilson',
                'email' => 'logistics@manufacturing.ca',
                'phone' => '+1-905-555-1004',
                'address' => '500 Industrial Road',
                'city' => 'Mississauga',
                'province' => 'ON',
                'postal_code' => 'L4Z 2G1',
                'country' => 'Canada',
                'customer_type' => 'business',
                'billing_group_id' => 4,
                'credit_limit' => 100000.00,
                'payment_terms' => 'NET45'
            ]
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}