<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_terms', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('code')->unique();
            $table->integer('days')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['code']);
            $table->index(['is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_terms');
    }
};