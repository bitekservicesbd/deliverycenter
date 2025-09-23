<?php

// database/migrations/tenant/2024_09_22_000019_create_price_plan_templates_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_plan_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('price_plan_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicle_type_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('service_class_id')->constrained()->onDelete('cascade');
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('cascade'); // null = global
            $table->json('surcharge_settings')->nullable();
            $table->json('weight_distance_options')->nullable();
            $table->boolean('is_global')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('price_plan_templates');
    }
};
