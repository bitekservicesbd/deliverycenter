<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AttachmentCategory;

class AttachmentCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Order Documents', 'description' => 'Order confirmations, invoices, receipts', 'file_types' => ['pdf', 'doc', 'docx'], 'max_file_size' => 10240],
            ['name' => 'Driver Documents', 'description' => 'Driver licenses, certifications, insurance', 'file_types' => ['pdf', 'jpg', 'png'], 'max_file_size' => 5120],
            ['name' => 'Vehicle Documents', 'description' => 'Registration, insurance, inspections', 'file_types' => ['pdf', 'jpg', 'png'], 'max_file_size' => 5120],
            ['name' => 'Customer Documents', 'description' => 'Contracts, agreements, terms', 'file_types' => ['pdf', 'doc', 'docx'], 'max_file_size' => 20480],
            ['name' => 'Proof of Delivery', 'description' => 'Delivery confirmations, signatures', 'file_types' => ['pdf', 'jpg', 'png'], 'max_file_size' => 2048],
            ['name' => 'Photos', 'description' => 'Package photos, damage reports', 'file_types' => ['jpg', 'png', 'gif'], 'max_file_size' => 5120],
            ['name' => 'Invoices', 'description' => 'Customer invoices, vendor bills', 'file_types' => ['pdf', 'xlsx', 'csv'], 'max_file_size' => 10240],
            ['name' => 'Reports', 'description' => 'System reports, analytics exports', 'file_types' => ['pdf', 'xlsx', 'csv'], 'max_file_size' => 51200]
        ];

        foreach ($categories as $category) {
            AttachmentCategory::create($category);
        }
    }
}