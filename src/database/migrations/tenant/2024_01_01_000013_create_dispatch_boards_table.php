<?php

// database/migrations/tenant/2024_01_01_000013_create_dispatch_boards_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dispatch_boards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->text('description')->nullable();
            $table->json('filter_criteria')->nullable(); // drivers, customers, status filters
            $table->json('column_settings')->nullable(); // visible columns, order
            $table->json('display_options')->nullable(); // colors, grouping
            $table->boolean('is_default')->default(false);
            $table->boolean('is_shared')->default(false);
            $table->foreignId('created_by_user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispatch_boards');
    }
};
