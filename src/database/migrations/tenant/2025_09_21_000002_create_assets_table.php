<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->enum('asset_type', ['truck', 'trailor', 'van', 'car', 'other']);
            $table->string('asset_number');
            $table->string('vehicle_make')->nullable();
            $table->string('vehicle_model')->nullable();
            $table->year('vehicle_year')->nullable();
            $table->string('vin')->nullable();
            $table->string('vehicle_license_plate')->nullable();
            $table->date('vehicle_plate_expiry')->nullable();
            $table->date('last_service_date')->nullable();
            $table->date('next_service_due')->nullable();
            $table->number_format('next_service_distance')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};