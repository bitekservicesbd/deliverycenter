<?php

// database/migrations/tenant/2024_01_01_000038_create_user_alert_settings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_alert_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('new_order_email')->default(false);
            $table->boolean('new_order_sms')->default(false);
            $table->boolean('dispatch_email')->default(false);
            $table->boolean('dispatch_sms')->default(false);
            $table->boolean('quote_email')->default(false);
            $table->boolean('quote_sms')->default(false);
            $table->boolean('pickup_email')->default(false);
            $table->boolean('pickup_sms')->default(false);
            $table->boolean('delivered_email')->default(false);
            $table->boolean('delivered_sms')->default(false);
            $table->boolean('cancelled_email')->default(false);
            $table->boolean('cancelled_sms')->default(false);
            $table->boolean('invoice_alerts')->default(false);
            $table->boolean('statement_alerts')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_alert_settings');
    }
};
