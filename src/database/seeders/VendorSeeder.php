<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = [
            [
                'vendor_number' => 'VEN001',
                'name' => 'Petro-Canada Fuel Services',
                'contact_person' => 'Fleet Manager',
                'email' => 'fleet@petrocanada.ca',
                'phone' => '+1-800-668-0220',
                'address' => '150 6th Avenue SW',
                'city' => 'Calgary',
                'state' => 'AB',
                'postal_code' => 'T2P 3Y7',
                'country' => 'Canada',
                'tax_number' => 'GST-123456789',
                'vendor_type' => 'fuel',
                'payment_terms' => json_encode(['net_30', 'fleet_card_available']),
            ],
            [
                'vendor_number' => 'VEN002',
                'name' => 'MasterTech Vehicle Maintenance',
                'contact_person' => 'Service Director',
                'email' => 'service@mastertech.ca',
                'phone' => '+1-416-555-7890',
                'address' => '2500 Steeles Avenue West',
                'city' => 'Toronto',
                'state' => 'ON',
                'postal_code' => 'M3J 3A1',
                'country' => 'Canada',
                'tax_number' => 'HST-987654321',
                'vendor_type' => 'maintenance',
                'payment_terms' => json_encode(['net_15', 'emergency_service_available']),
            ],
            [
                'vendor_number' => 'VEN003',
                'name' => 'Canadian Commercial Insurance',
                'contact_person' => 'Account Manager',
                'email' => 'commercial@caninsurance.ca',
                'phone' => '+1-416-555-4567',
                'address' => '1 Adelaide Street East',
                'city' => 'Toronto',
                'state' => 'ON',
                'postal_code' => 'M5C 2V9',
                'country' => 'Canada',
                'tax_number' => 'HST-456789123',
                'vendor_type' => 'insurance',
                'payment_terms' => json_encode(['annual_payment', 'quarterly_payment_available']),
            ],
            [
                'vendor_number' => 'VEN004',
                'name' => 'Equipment Rental Solutions',
                'contact_person' => 'Rental Coordinator',
                'email' => 'rentals@equipmentsolutions.ca',
                'phone' => '+1-905-555-3456',
                'address' => '500 Industrial Drive',
                'city' => 'Mississauga',
                'state' => 'ON',
                'postal_code' => 'L4Z 1X9',
                'country' => 'Canada',
                'tax_number' => 'HST-789123456',
                'vendor_type' => 'equipment',
                'payment_terms' => json_encode(['net_30', 'weekly_rental_terms']),
            ],
            [
                'vendor_number' => 'VEN005',
                'name' => 'Professional Cleaning Services',
                'contact_person' => 'Operations Manager',
                'email' => 'operations@proclean.ca',
                'phone' => '+1-416-555-2345',
                'address' => '123 Service Road',
                'city' => 'Toronto',
                'state' => 'ON',
                'postal_code' => 'M1B 3G4',
                'country' => 'Canada',
                'tax_number' => 'HST-321654987',
                'vendor_type' => 'service',
                'payment_terms' => json_encode(['net_15', 'monthly_billing']),
            ],
            [
                'vendor_number' => 'VEN006',
                'name' => 'Office Supply Plus',
                'contact_person' => 'Sales Representative',
                'email' => 'sales@officesupplyplus.ca',
                'phone' => '+1-416-555-1234',
                'address' => '789 Business Park Drive',
                'city' => 'Markham',
                'state' => 'ON',
                'postal_code' => 'L3R 8T4',
                'country' => 'Canada',
                'tax_number' => 'HST-654987321',
                'vendor_type' => 'other',
                'payment_terms' => json_encode(['net_30', 'volume_discounts_available']),
            ],
        ];

        foreach ($vendors as $vendor) {
            Vendor::create($vendor);
        }
    }
}
