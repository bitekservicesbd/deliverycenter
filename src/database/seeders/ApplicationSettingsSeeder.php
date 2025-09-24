<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ApplicationSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🚀 Starting Complete Application Settings Seeding (40 Tables)...');

        $this->call([
            AccessorialTypeSeeder::class,
            AssetSeeder::class,
            AttachmentCategorySeeder::class,
            BillingTermsSeeder::class,
        ]);

        $this->command->info('✅ Complete Application Settings Seeding Finished!');
        $this->command->info('📊 40 Tables seeded successfully with demo data!');
    }
}
