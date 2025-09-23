<?php
// database/migrations/tenant/2024_01_01_000034_create_zone_counts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zone_counts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('zone_id')->constrained()->onDelete('cascade');
            $table->date('count_date');
            $table->integer('total_loads')->default(0);
            $table->integer('completed_loads')->default(0);
            $table->integer('pending_loads')->default(0);
            $table->decimal('total_revenue', 10, 2)->default(0);
            $table->decimal('average_load_value', 8, 2)->default(0);
            $table->timestamps();
            
            $table->unique(['zone_id', 'count_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zone_counts');
    }
};