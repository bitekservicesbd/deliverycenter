<?php

namespace Database\Seeders;

use App\Models\AttachmentCategory;
use Illuminate\Database\Seeder;

class AttachmentCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'description' => 'WayBill',
                'notify_email' => '',
                'retention_days' => '365',
                'attach_to_load_alerts' => true,
                'attach_to_invoice' => false,
                'default_driver' => false,
                'hide_from_driver' => true,
                'updated_by' => null,
            ],

            [
                'description' => 'Demaged',
                'notify_email' => '',
                'retention_days' => '365',
                'attach_to_load_alerts' => false,
                'attach_to_invoice' => true,
                'default_driver' => false,
                'hide_from_driver' => true,
                'updated_by' => null,
            ],

            [
                'description' => 'Driver Document',
                'notify_email' => '',
                'retention_days' => '365',
                'attach_to_load_alerts' => false,
                'attach_to_invoice' => false,
                'default_driver' => true,
                'hide_from_driver' => false,
                'updated_by' => null,
            ],
            [
                'description' => 'Other',
                'notify_email' => '',
                'retention_days' => '365',
                'attach_to_load_alerts' => false,
                'attach_to_invoice' => false,
                'default_driver' => false,
                'hide_from_driver' => true,
                'updated_by' => null,
            ],

            [
                'description' => 'Picture POD',
                'notify_email' => 'info@deliverycenter.com',
                'retention_days' => '365',
                'attach_to_load_alerts' => false,
                'attach_to_invoice' => true,
                'default_driver' => false,
                'hide_from_driver' => true,
                'updated_by' => null,
            ],
        ];

        foreach ($categories as $category) {
            AttachmentCategory::create($category);
        }
    }
}
