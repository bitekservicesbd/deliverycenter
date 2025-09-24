<?php

// database/migrations/tenant/2024_01_01_000003_create_attachment_categories_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attachment_categories', function (Blueprint $table) {
            $table->id();
            $table->text('description')->required();
            $table->string('notify_email')->nullable();
            $table->string('retention_days')->nullable();
            $table->boolean('attach_to_load_alerts')->default(false);
            $table->boolean('attach_to_invoice')->default(false);
            $table->boolean('default_driver')->default(false);
            $table->boolean('hide_from_driver')->default(true);
            $table->string('updated_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attachment_categories');
    }
};
