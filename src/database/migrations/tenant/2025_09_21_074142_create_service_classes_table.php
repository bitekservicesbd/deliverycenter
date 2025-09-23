<?php

// database/migrations/tenant/2024_09_21_000022_create_service_classes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->integer('delivery_days')->nullable();
            $table->time('cutoff_time')->nullable();
            $table->decimal('base_rate', 8, 2)->default(0);
            $table->json('delivery_options')->nullable(); // rush, after hours, etc.
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_classes');
    }
};
