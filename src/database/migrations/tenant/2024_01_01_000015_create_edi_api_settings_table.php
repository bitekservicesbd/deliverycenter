<?php
// database/migrations/tenant/2024_01_01_000015_create_edi_api_settings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('edi_api_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // EDI, API, webhook
            $table->json('configuration');
            $table->string('endpoint_url')->nullable();
            $table->string('api_key')->nullable();
            $table->json('authentication_details')->nullable();
            $table->json('mapping_rules')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamp('last_sync')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('edi_api_settings');
    }
};