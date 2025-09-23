<?php

// database/migrations/tenant/2024_01_01_000011_create_customers_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_number')->unique();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('billing_address');
            $table->text('mailing_address')->nullable();
            $table->string('payment_terms')->nullable();
            $table->string('payment_method')->nullable();
            $table->decimal('credit_limit', 10, 2)->default(0);
            $table->decimal('discount_rate', 5, 2)->default(0);
            $table->json('order_alerts')->nullable();
            $table->json('billing_details')->nullable();
            $table->boolean('require_caller')->default(false);
            $table->foreignId('billing_group_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
