<?php
// database/migrations/tenant/2024_01_01_000039_create_application_settings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('application_settings', function (Blueprint $table) {
            $table->id();
            $table->string('setting_key');
            $table->text('setting_value')->nullable();
            $table->string('setting_type')->default('string'); // string, integer, boolean, json, decimal
            $table->string('setting_group')->nullable(); // general, units, defaults, notifications, etc.
            $table->text('description')->nullable();
            $table->boolean('is_system')->default(false); // system vs user configurable
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->unique(['setting_key']);
            $table->index(['setting_group']);
            $table->index(['is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('application_settings');
    }
};