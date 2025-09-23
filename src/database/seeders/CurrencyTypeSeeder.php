<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CurrencyType;

class CurrencyTypeSeeder extends Seeder
{
    public function run(): void
    {
        $currencies = [
            ['name' => 'Canadian Dollar', 'code' => 'CAD', 'symbol' => 'C$', 'exchange_rate' => 1.000000, 'is_default' => true],
            ['name' => 'US Dollar', 'code' => 'USD', 'symbol' => '$', 'exchange_rate' => 0.740000, 'is_default' => false],
            ['name' => 'Euro', 'code' => 'EUR', 'symbol' => '€', 'exchange_rate' => 0.620000, 'is_default' => false],
            ['name' => 'British Pound', 'code' => 'GBP', 'symbol' => '£', 'exchange_rate' => 0.550000, 'is_default' => false],
            ['name' => 'Mexican Peso', 'code' => 'MXN', 'symbol' => '$', 'exchange_rate' => 14.500000, 'is_default' => false]
        ];

        foreach ($currencies as $currency) {
            CurrencyType::create($currency);
        }
    }
}
