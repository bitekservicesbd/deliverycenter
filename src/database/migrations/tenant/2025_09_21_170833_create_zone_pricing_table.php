<?php
// database/migrations/tenant/2024_01_01_000035_create_zone_pricing_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zone_pricing', function (Blueprint $table) {
            $table->id();
            $table->foreignId('origin_zone_id')->constrained('zones')->onDelete('cascade');
            $table->foreignId('destination_zone_id')->constrained('zones')->onDelete('cascade');
            $table->foreignId('price_plan_id')->constrained()->onDelete('cascade');
            $table->decimal('base_rate', 8, 2);
            $table->decimal('per_km_rate', 8, 2)->default(0);
            $table->decimal('per_kg_rate', 8, 2)->default(0);
            $table->decimal('minimum_charge', 8, 2)->default(0);
            $table->json('additional_rates')->nullable(); // volume, packages, etc.
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->unique(['origin_zone_id', 'destination_zone_id', 'price_plan_id'], 'zone_pricing_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zone_pricing');
    }
};