<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BillFreightTerm;

class BillFreightTermSeeder extends Seeder
{
    public function run(): void
    {
        $terms = [
            ['code' => 'PP', 'description' => 'Prepaid', 'payment_responsibility' => 'shipper', 'collect_on_delivery' => false],
            ['code' => 'CC', 'description' => 'Collect', 'payment_responsibility' => 'consignee', 'collect_on_delivery' => false],
            ['code' => 'COD', 'description' => 'Cash on Delivery', 'payment_responsibility' => 'consignee', 'collect_on_delivery' => true],
            ['code' => 'TP', 'description' => 'Third Party', 'payment_responsibility' => 'third_party', 'collect_on_delivery' => false],
            ['code' => 'FB', 'description' => 'Freight Bill', 'payment_responsibility' => 'shipper', 'collect_on_delivery' => false],
            ['code' => 'NET30', 'description' => 'Net 30 Days', 'payment_responsibility' => 'shipper', 'collect_on_delivery' => false],
            ['code' => 'NET15', 'description' => 'Net 15 Days', 'payment_responsibility' => 'shipper', 'collect_on_delivery' => false],
            ['code' => 'IMM', 'description' => 'Immediate Payment', 'payment_responsibility' => 'shipper', 'collect_on_delivery' => false]
        ];

        foreach ($terms as $term) {
            BillFreightTerm::create($term);
        }
    }
}
