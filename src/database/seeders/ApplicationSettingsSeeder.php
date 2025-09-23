<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ApplicationSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🚀 Starting Complete Application Settings Seeding (40 Tables)...');
        
        $this->call([
            // Core Configuration (1-10)
            AccessorialTypeSeeder::class,
            AssetSeeder::class, 
            AttachmentCategorySeeder::class,
            AutoDispatchSeeder::class, 
            BillFreightTermSeeder::class,
            BillingGroupSeeder::class,
            CarrierSeeder::class,
            CommissionPlanSeeder::class,
            CompanySeeder::class,
            CurrencyTypeSeeder::class,
            
            // Business Settings (11-20)
            CustomerSeeder::class,
            DeductionTypeSeeder::class,
            DispatchBoardSeeder::class,
            DockSeeder::class,
            FuelSurchargePlanSeeder::class,
            PackageSeeder::class,
            PricePlanSeeder::class,
            PricePlanTemplateSeeder::class,
            ProvincialTaxSeeder::class,
            
            // Operations & Services (21-30)
            SalesCommissionPlanSeeder::class,
            ServiceClassSeeder::class,
            SurchargeSeeder::class,
            TaxSeeder::class,
            UomTypeSeeder::class,
            VehicleTypeSeeder::class,
            VendorSeeder::class,
            VendorExpenseSeeder::class,
            WarehouseSeeder::class,
            WeatherAlertSeeder::class,
            
            // Geographic & System Settings (31-40)
            WorkingHolidaySeeder::class,
            ZoneSeeder::class,
            ZoneGroupSeeder::class,
            ZoneCountSeeder::class,
            ZonePricingSeeder::class,
            CarrierAccountSeeder::class,
            UserSecuritySettingSeeder::class,
            UserAlertSettingSeeder::class,
        ]);
        
        $this->command->info('✅ Complete Application Settings Seeding Finished!');
        $this->command->info('📊 40 Tables seeded successfully with demo data!');
    }
}