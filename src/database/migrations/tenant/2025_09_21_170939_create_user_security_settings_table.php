<?php

// database/migrations/tenant/2024_01_01_000037_create_user_security_settings_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_security_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('allow_dispatch')->default(false);
            $table->boolean('allow_invoicing')->default(false);
            $table->boolean('allow_payment_processing')->default(false);
            $table->boolean('allow_client_settings')->default(false);
            $table->boolean('allow_inbounding')->default(false);
            $table->boolean('allow_outbounding')->default(false);
            $table->boolean('allow_courier_orders')->default(false);
            $table->boolean('allow_gps_tracking')->default(false);
            $table->boolean('allow_visual_dispatch')->default(false);
            $table->boolean('allow_delivery_monitor')->default(false);
            $table->boolean('allow_dashboard')->default(false);
            $table->boolean('allow_routing')->default(false);
            $table->boolean('allow_attachments')->default(false);
            $table->boolean('allow_view_pricing')->default(false);
            $table->boolean('allow_importer')->default(false);
            $table->boolean('allow_custom_order')->default(false);
            $table->boolean('allow_global_address_list')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_security_settings');
    }
};
