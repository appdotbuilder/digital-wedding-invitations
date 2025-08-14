<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Template title');
            $table->text('description')->nullable()->comment('Template description');
            $table->decimal('price', 10, 2)->comment('Template price');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->string('thumbnail')->nullable()->comment('Template thumbnail image path');
            $table->text('preview_images')->nullable()->comment('JSON array of preview images');
            $table->string('template_file')->nullable()->comment('Template file path');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active')->comment('Template status');
            $table->integer('order_count')->default(0)->comment('Number of orders for this template');
            $table->timestamps();
            
            $table->index('title');
            $table->index(['category_id', 'status']);
            $table->index(['owner_id', 'status']);
            $table->index('status');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};