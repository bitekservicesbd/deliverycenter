<?php

// database/migrations/tenant/2024_01_01_000008_create_commission_plans_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commission_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->enum('commission_type', ['percentage', 'fixed', 'tiered']);
            $table->decimal('base_rate', 5, 2)->nullable();
            $table->json('tier_structure')->nullable(); // for tiered commissions
            $table->json('criteria')->nullable(); // service_class, customer, etc.
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commission_plans');
    }
};
