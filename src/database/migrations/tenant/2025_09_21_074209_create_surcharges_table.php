<?php
// database/migrations/tenant/2024_01_01_000023_create_surcharges_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surcharges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->decimal('default_amount', 8, 2)->default(0);
            $table->enum('amount_type', ['fixed', 'percentage'])->default('fixed');
            $table->enum('apply_to', ['base_charge', 'total_charge', 'weight'])->default('base_charge');
            $table->json('conditions')->nullable(); // when to apply
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surcharges');
    }
};