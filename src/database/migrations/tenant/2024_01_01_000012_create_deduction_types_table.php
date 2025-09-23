<?php

// database/migrations/tenant/2024_01_01_000012_create_deduction_types_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deduction_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->enum('deduction_category', ['garnishment', 'loan', 'service', 'vehicle_lease', 'handheld_rent', 'other']);
            $table->decimal('default_amount', 8, 2)->default(0);
            $table->enum('amount_type', ['fixed', 'percentage'])->default('fixed');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deduction_types');
    }
};
