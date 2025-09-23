<?php

// database/migrations/tenant/2024_01_01_000004_create_auto_dispatch_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auto_dispatch_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('criteria'); // customer, service_class, zone, etc.
            $table->json('carrier_selection_method'); // random, rotation, proximity, etc.
            $table->json('carrier_pool')->nullable(); // specific carriers
            $table->boolean('auto_assign')->default(true);
            $table->boolean('auto_dispatch')->default(false);
            $table->integer('priority')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auto_dispatch_rules');
    }
};
