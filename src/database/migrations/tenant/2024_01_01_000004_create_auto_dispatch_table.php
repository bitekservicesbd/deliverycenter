<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auto_dispatch', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dispatch_to_carrier')->constrained('carriers');
            $table->date('effective_date');
            $table->json('account'); //condition, customer name
            $table->json('service'); //condition, service class
            $table->json('pickup_zone'); //condition, pickup zone
            $table->json('pickup_dispatch_zone'); //condition, dispatch zone
            $table->json('delivery_dispatch_zone'); //condition, dispatch zone
            $table->json('delivery_zone'); //condition, delivery zone
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->json('dispatch_on_days'); //saturday, sunday, monday, tuesday, wednesday, thursday, friday - boolean
            $table->string('alert_min_before_ready')->nullable();
            $table->boolean('enable')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auto_dispatch');
    }
};