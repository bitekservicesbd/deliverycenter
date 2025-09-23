<?php
// database/migrations/tenant/2024_01_01_000026_create_vehicle_types_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicle_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->decimal('max_weight', 8, 2)->nullable();
            $table->decimal('max_volume', 8, 2)->nullable();
            $table->boolean('requires_cdl')->default(false);
            $table->boolean('has_tailgate')->default(false);
            $table->boolean('temperature_controlled')->default(false);
            $table->json('features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicle_types');
    }
};