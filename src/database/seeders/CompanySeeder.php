<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            [
                'name' => 'DeliveryCenter TMS',
                'legal_name' => 'DeliveryCenter Transportation Management Systems Inc.',
                'business_number' => '123456789RT0001',
                'tax_number' => 'HST-789012345',
                'address' => '100 King Street West',
                'city' => 'Toronto',
                'province' => 'Ontario',
                'postal_code' => 'M5X 1A1',
                'country' => 'Canada',
                'phone' => '+1-416-555-0001',
                'email' => 'info@deliverycenter.ca',
                'website' => 'https://deliverycenter.ca',
                'industry' => 'Transportation & Logistics',
                'company_size' => 'medium',
                'annual_revenue' => 5000000.00,
                'incorporated_date' => '2020-01-15',
                'logo_url' => '/assets/company-logo.png'
            ],
            [
                'name' => 'Regional Transport Co.',
                'legal_name' => 'Regional Transportation Company Limited',
                'business_number' => '987654321RT0002',
                'tax_number' => 'HST-345678901',
                'address' => '250 Dundas Street East',
                'city' => 'Toronto',
                'province' => 'Ontario',
                'postal_code' => 'M5A 2B2',
                'country' => 'Canada',
                'phone' => '+1-416-555-0002',
                'email' => 'contact@regionaltransport.ca',
                'website' => 'https://regionaltransport.ca',
                'industry' => 'Transportation & Logistics',
                'company_size' => 'large',
                'annual_revenue' => 15000000.00,
                'incorporated_date' => '2018-06-01',
                'logo_url' => '/assets/regional-transport-logo.png'
            ]
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}