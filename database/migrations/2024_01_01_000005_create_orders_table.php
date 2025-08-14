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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('template_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique()->comment('Unique order number');
            $table->timestamp('order_date')->useCurrent()->comment('Order date');
            $table->enum('status', ['pending', 'process', 'completed', 'cancelled'])->default('pending')->comment('Order status');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending')->comment('Payment status');
            $table->decimal('total_price', 10, 2)->comment('Total order price');
            $table->json('wedding_details')->nullable()->comment('Wedding details JSON');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index('order_number');
            $table->index(['user_id', 'status']);
            $table->index(['status', 'payment_status']);
            $table->index('order_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};