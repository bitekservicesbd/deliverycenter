<?php

// database/migrations/tenant/2024_01_01_000007_create_carriers_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carriers', function (Blueprint $table) {
            $table->id();
            $table->string('carrier_number')->unique();
            $table->string('name');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('postal_code');
            $table->string('country');
            $table->string('phone');
            $table->string('email');
            $table->string('license_number')->nullable();
            $table->date('license_expiry')->nullable();
            $table->date('start_date')->nullable();
            $table->enum('carrier_type', ['employee', 'agent', 'broker', 'third_party']);
            $table->string('driver_app_username')->nullable();
            $table->string('driver_app_password')->nullable();
            $table->boolean('dispatch_alerts')->default(true);
            $table->string('unit_type')->default('metric');
            $table->string('weight_type')->default('kg');
            $table->string('currency', 3)->default('USD');
            $table->decimal('commission_rate', 5, 2)->default(0);
            $table->string('tax_number')->nullable();
            $table->json('payment_info')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carriers');
    }
};
