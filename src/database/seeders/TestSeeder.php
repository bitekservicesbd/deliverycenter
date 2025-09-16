<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('DROP DATABASE IF EXISTS test');
        $tenantUser = User::create([
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => USER_TYPE_TENANT,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        $tenantUser1 = User::create([
            'name' => 'Test User 1',
            'username' => 'testuser1',
            'email' => 'test1@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => USER_TYPE_TENANT,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        $testPlan = Plan::create([
            'name' => 'Test Plan',
            'monthly_price' => 10000,
            'currency' => 'USD',
            'billing_cycle' => 'monthly',
            'trial_days' => 14,
            'is_active' => true,
        ]);

        $tenant = Tenant::create([
            'id' => 'test',
            'tenancy_db_name' => 'test',
            'user_id' => $tenantUser->id,
            'plan_id' => $testPlan->id,
            'status' => 'trial',
            'created_by' => User::where('user_type', USER_TYPE_CENTRAL)->first()->id,
            'payment_status' => 'trial',
            'trial_ends_at' => now()->addDays(14),
        ]);

        $tenant->domains()->create([
            'domain' => 'test.localhost',
        ]);

        Artisan::call('tenants:migrate', ['--tenants' => ['test']]);
        tenantDB('test')->table('users')->insert([
            'name' => $tenantUser->name,
            'email' => $tenantUser->email,
            'role' => 'agent',
            'central_activation' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        $tenant1 = Tenant::create([
            'id' => 'speciality',
            'tenancy_db_name' => 'test',
            'user_id' => $tenantUser1->id,
            'plan_id' => $testPlan->id,
            'status' => 'trial',
            'created_by' => User::where('user_type', USER_TYPE_CENTRAL)->first()->id,
            'payment_status' => 'trial',
            'trial_ends_at' => now()->addDays(14),
        ]);

        $tenant1->domains()->create([
            'domain' => 'speciality.deliverycenter.ca',
        ]);

        Artisan::call('tenants:migrate', ['--tenants' => ['speciality']]);
        tenantDB('speciality')->table('users')->insert([
            'name' => $tenantUser1->name,
            'email' => $tenantUser1->email,
            'role' => 'agent',
            'central_activation' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
    }
}
