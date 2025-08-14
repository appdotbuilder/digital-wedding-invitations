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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('payment_method')->comment('Payment method used');
            $table->decimal('amount', 10, 2)->comment('Payment amount');
            $table->timestamp('payment_date')->nullable()->comment('Payment date');
            $table->enum('status', ['pending', 'success', 'failed', 'refunded'])->default('pending')->comment('Payment status');
            $table->string('transaction_id')->nullable()->comment('External transaction ID');
            $table->json('payment_details')->nullable()->comment('Payment details JSON');
            $table->timestamps();
            
            $table->index(['order_id', 'status']);
            $table->index('transaction_id');
            $table->index('payment_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};