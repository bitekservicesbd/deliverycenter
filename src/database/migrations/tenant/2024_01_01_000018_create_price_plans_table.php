<?php
// database/migrations/tenant/2024_01_01_000018_create_price_plans_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['Advanced', 'Zone to Zone', 'Advance']);
            $table->string('zone_group');
            $table->decimal('commission', 8, 2)->default(0);
            $table->foreignId('service_class_id')->nullable()->constrained()->onDelete('set null');
            $table->json('rate_structure')->nullable(); // zone to zone pricing
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('price_plans');
    }
};