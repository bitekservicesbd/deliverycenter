<?php
// database/migrations/tenant/2024_01_01_000016_create_fuel_surcharge_plans_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fuel_surcharge_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->decimal('base_fuel_price', 8, 3);
            $table->decimal('current_fuel_price', 8, 3);
            $table->enum('calculation_method', ['percentage', 'per_mile', 'fixed']);
            $table->json('rate_table'); // fuel price ranges and surcharge rates
            $table->date('effective_date');
            $table->boolean('auto_update')->default(false);
            $table->string('fuel_index_source')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fuel_surcharge_plans');
    }
};