<?php

namespace Database\Seeders;

use App\Models\VendorExpense;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VendorExpenseSeeder extends Seeder
{
    public function run(): void
    {
        $vendorExpenses = [
            [
                'vendor_id' => 1, // Petro-Canada
                'expense_number' => 'EXP-2024-001',
                'expense_date' => Carbon::now()->subDays(15),
                'expense_category' => 'Fuel',
                'description' => 'Monthly fuel expenses for fleet vehicles',
                'amount' => 4850.75,
                'reference_number' => 'FUEL-JAN-2024',
                'invoice_number' => 'PC-INV-001234',
                'status' => 'paid',
                'approved_by' => 1,
                'approved_at' => Carbon::now()->subDays(10),
                'notes' => 'Regular monthly fuel billing for 15 vehicles',
            ],
            [
                'vendor_id' => 2, // MasterTech
                'expense_number' => 'EXP-2024-002',
                'expense_date' => Carbon::now()->subDays(8),
                'expense_category' => 'Vehicle Maintenance',
                'description' => 'Truck engine repair and oil change service',
                'amount' => 1250.00,
                'reference_number' => 'MAINT-VH001',
                'invoice_number' => 'MT-SVC-5678',
                'status' => 'approved',
                'approved_by' => 1,
                'approved_at' => Carbon::now()->subDays(5),
                'notes' => 'Emergency repair for Vehicle VH001',
            ],
            [
                'vendor_id' => 3, // Insurance
                'expense_number' => 'EXP-2024-003',
                'expense_date' => Carbon::now()->subDays(30),
                'expense_category' => 'Insurance Premium',
                'description' => 'Quarterly commercial vehicle insurance premium',
                'amount' => 8500.00,
                'reference_number' => 'INS-Q1-2024',
                'invoice_number' => 'CCI-PREM-9012',
                'status' => 'paid',
                'approved_by' => 1,
                'approved_at' => Carbon::now()->subDays(25),
                'notes' => 'Q1 2024 insurance premium payment',
            ],
            [
                'vendor_id' => 4, // Equipment Rental
                'expense_number' => 'EXP-2024-004',
                'expense_date' => Carbon::now()->subDays(3),
                'expense_category' => 'Equipment Rental',
                'description' => 'Weekly forklift rental for warehouse operations',
                'amount' => 450.00,
                'reference_number' => 'RENT-WK3-2024',
                'invoice_number' => 'ERS-RENT-3456',
                'status' => 'pending',
                'approved_by' => null,
                'approved_at' => null,
                'notes' => 'Weekly forklift rental - warehouse dock operations',
            ],
            [
                'vendor_id' => 5, // Cleaning Services
                'expense_number' => 'EXP-2024-005',
                'expense_date' => Carbon::now()->subDays(7),
                'expense_category' => 'Facility Maintenance',
                'description' => 'Monthly office and warehouse cleaning services',
                'amount' => 850.00,
                'reference_number' => 'CLEAN-JAN-2024',
                'invoice_number' => 'PCS-SVC-7890',
                'status' => 'approved',
                'approved_by' => 1,
                'approved_at' => Carbon::now()->subDays(2),
                'notes' => 'Regular monthly cleaning services',
            ],
            [
                'vendor_id' => 6, // Office Supplies
                'expense_number' => 'EXP-2024-006',
                'expense_date' => Carbon::now()->subDays(12),
                'expense_category' => 'Office Supplies',
                'description' => 'Office supplies and printing materials',
                'amount' => 285.50,
                'reference_number' => 'OFFICE-JAN-2024',
                'invoice_number' => 'OSP-ORD-2468',
                'status' => 'paid',
                'approved_by' => 1,
                'approved_at' => Carbon::now()->subDays(8),
                'notes' => 'Monthly office supply order',
            ],
        ];

        foreach ($vendorExpenses as $expense) {
            VendorExpense::create($expense);
        }
    }
}
