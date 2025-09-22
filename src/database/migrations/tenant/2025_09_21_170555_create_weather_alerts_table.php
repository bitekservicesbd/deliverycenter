<?php
// database/migrations/tenant/2024_01_01_000030_create_weather_alerts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weather_alerts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->enum('severity', ['low', 'medium', 'high', 'critical']);
            $table->enum('alert_type', ['storm', 'hurricane', 'snow', 'ice', 'heat', 'other']);
            $table->json('affected_regions')->nullable(); // cities, provinces, postal codes
            $table->datetime('start_time');
            $table->datetime('end_time')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('show_on_dashboard')->default(true);
            $table->string('color', 7)->default('#ff0000'); // hex color
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weather_alerts');
    }
};