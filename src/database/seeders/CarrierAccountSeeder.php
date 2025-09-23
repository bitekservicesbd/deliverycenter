<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CarrierAccount;

class CarrierAccountSeeder extends Seeder
{
    public function run(): void
    {
        $carrierAccounts = [
            [
                'carrier_name' => 'FedEx Canada',
                'account_number' => 'FDX-123456789',
                'account_type' => 'corporate',
                'contact_person' => 'Account Manager',
                'contact_email' => 'corporate@fedex.ca',
                'contact_phone' => '+1-800-463-3339',
                'billing_address' => json_encode([
                    'street' => '5985 McLaughlin Road',
                    'city' => 'Mississauga',
                    'province' => 'ON',
                    'postal_code' => 'L5R 3V8',
                    'country' => 'Canada'
                ]),
                'service_types' => json_encode(['express', 'ground', 'freight', 'international']),
                'rate_discount' => 15.50,
                'fuel_discount' => 2.50,
                'credit_limit' => 25000.00,
                'payment_terms' => 'NET30',
                'api_credentials' => json_encode([
                    'api_key' => 'fedex_api_key_placeholder',
                    'password' => 'fedex_password_placeholder',
                    'account_number' => 'FDX-123456789',
                    'meter_number' => 'FDX-METER-001'
                ])
            ],
            [
                'carrier_name' => 'UPS Canada',
                'account_number' => 'UPS-987654321',
                'account_type' => 'business',
                'contact_person' => 'Business Solutions',
                'contact_email' => 'business@ups.ca',
                'contact_phone' => '+1-800-742-5877',
                'billing_address' => json_encode([
                    'street' => '2000 Meadowvale Boulevard',
                    'city' => 'Mississauga',
                    'province' => 'ON',
                    'postal_code' => 'L5N 8E7',
                    'country' => 'Canada'
                ]),
                'service_types' => json_encode(['next_day', 'ground', 'freight', 'logistics']),
                'rate_discount' => 12.75,
                'fuel_discount' => 1.85,
                'credit_limit' => 30000.00,
                'payment_terms' => 'NET15',
                'api_credentials' => json_encode([
                    'api_key' => 'ups_api_key_placeholder',
                    'username' => 'ups_username_placeholder',
                    'password' => 'ups_password_placeholder',
                    'account_number' => 'UPS-987654321'
                ])
            ],
            [
                'carrier_name' => 'Canada Post',
                'account_number' => 'CP-456789123',
                'account_type' => 'commercial',
                'contact_person' => 'Commercial Services',
                'contact_email' => 'commercial@canadapost.ca',
                'contact_phone' => '+1-800-267-1177',
                'billing_address' => json_encode([
                    'street' => '2701 Riverside Drive',
                    'city' => 'Ottawa',
                    'province' => 'ON',
                    'postal_code' => 'K1A 0B1',
                    'country' => 'Canada'
                ]),
                'service_types' => json_encode(['priority', 'regular_parcel', 'expedited', 'xpresspost']),
                'rate_discount' => 8.25,
                'fuel_discount' => 0.00,
                'credit_limit' => 15000.00,
                'payment_terms' => 'NET30',
                'api_credentials' => json_encode([
                    'customer_number' => 'CP-456789123',
                    'contract_number' => 'CP-CONTRACT-001',
                    'username' => 'cp_api_username',
                    'password' => 'cp_api_password'
                ])
            ],
            [
                'carrier_name' => 'Purolator',
                'account_number' => 'PUR-789123456',
                'account_type' => 'business',
                'contact_person' => 'Business Development',
                'contact_email' => 'business@purolator.com',
                'contact_phone' => '+1-888-744-7123',
                'billing_address' => json_encode([
                    'street' => '5995 Avebury Road',
                    'city' => 'Mississauga',
                    'province' => 'ON',
                    'postal_code' => 'L5R 3T8',
                    'country' => 'Canada'
                ]),
                'service_types' => json_encode(['express', 'ground', 'freight', 'logistics']),
                'rate_discount' => 10.50,
                'fuel_discount' => 1.25,
                'credit_limit' => 20000.00,
                'payment_terms' => 'NET30',
                'api_credentials' => json_encode([
                    'api_key' => 'purolator_api_key_placeholder',
                    'key_token' => 'purolator_token_placeholder',
                    'account_number' => 'PUR-789123456',
                    'billing_account' => 'PUR-BILL-001'
                ])
            ]
        ];

        foreach ($carrierAccounts as $account) {
            CarrierAccount::create($account);
        }
    }
}