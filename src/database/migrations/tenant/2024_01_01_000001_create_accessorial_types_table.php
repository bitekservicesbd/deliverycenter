<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accessorial_types', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('code')->unique();
            $table->boolean('discount')->default(false);
            $table->boolean('fuel')->default(false);
            $table->boolean('new_load')->default(true);
            $table->string('gl_code')->nullable();
            $table->decimal('commission', 5, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accessorial_types');
    }
};
