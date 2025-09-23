<?php

// database/migrations/tenant/2024_01_01_000005_create_bill_freight_terms_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bill_freight_terms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description');
            $table->enum('payment_timing', ['order_placed', 'shipped', 'delivered', 'net_days']);
            $table->integer('net_days')->nullable();
            $table->decimal('discount_rate', 5, 2)->default(0);
            $table->integer('discount_days')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bill_freight_terms');
    }
};
