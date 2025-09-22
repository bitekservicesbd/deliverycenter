<?php
// database/migrations/tenant/2024_01_01_000002_create_assets_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_number')->unique();
            $table->enum('asset_type', ['vehicle', 'trailer', 'equipment']);
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->year('year')->nullable();
            $table->string('license_plate')->nullable();
            $table->string('vin')->nullable();
            $table->string('ownership_type')->nullable();
            $table->string('insurance_number')->nullable();
            $table->date('insurance_expiry')->nullable();
            $table->decimal('capacity_weight', 8, 2)->nullable();
            $table->decimal('capacity_volume', 8, 2)->nullable();
            $table->boolean('has_tailgate')->default(false);
            $table->boolean('temperature_controlled')->default(false);
            $table->foreignId('assigned_carrier_id')->nullable()->constrained('carriers')->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};