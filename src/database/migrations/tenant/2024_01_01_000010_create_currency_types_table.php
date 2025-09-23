<?php

// database/migrations/tenant/2024_01_01_000010_create_currency_types_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('currency_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 3)->unique(); // USD, EUR, CAD
            $table->string('symbol')->nullable(); // $, €, £
            $table->decimal('exchange_rate', 10, 6)->default(1.00);
            $table->boolean('is_default')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('currency_types');
    }
};
