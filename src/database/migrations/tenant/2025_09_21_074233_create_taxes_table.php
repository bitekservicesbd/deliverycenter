<?php
// database/migrations/tenant/2024_01_01_000024_create_taxes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tax_code')->unique();
            $table->string('country');
            $table->string('state_province')->nullable();
            $table->string('region')->nullable();
            $table->decimal('tax_rate', 5, 4);
            $table->enum('tax_type', ['sales_tax', 'provincial_tax', 'federal_tax', 'vat', 'gst', 'hst']);
            $table->boolean('is_compound')->default(false);
            $table->date('effective_date');
            $table->date('expiry_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('taxes');
    }
};