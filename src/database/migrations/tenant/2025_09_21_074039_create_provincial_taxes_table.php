<?php
// database/migrations/tenant/2024_01_01_000020_create_provincial_taxes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provincial_taxes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('province_code');
            $table->string('tax_code')->unique();
            $table->decimal('tax_rate', 5, 4); // e.g., 0.1300 for 13%
            $table->enum('tax_type', ['GST', 'PST', 'HST', 'QST']);
            $table->boolean('is_compound')->default(false);
            $table->date('effective_date');
            $table->date('expiry_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provincial_taxes');
    }
};