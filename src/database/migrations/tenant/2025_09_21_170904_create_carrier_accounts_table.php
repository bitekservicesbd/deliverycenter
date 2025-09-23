<?php

// database/migrations/tenant/2024_01_01_000036_create_carrier_accounts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carrier_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('carrier_name');
            $table->string('account_number');
            $table->string('account_name')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->text('notes')->nullable();
            $table->enum('account_type', ['fuel', 'shipping', 'maintenance', 'insurance', 'other']);
            $table->json('account_details')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carrier_accounts');
    }
};
