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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['super_admin', 'admin_user', 'user'])->default('user')->comment('User role')->after('email_verified_at');
            $table->boolean('is_active')->default(true)->comment('Whether user is active')->after('role');
            $table->string('phone')->nullable()->comment('User phone number')->after('is_active');
            $table->text('address')->nullable()->comment('User address')->after('phone');
            
            $table->index('role');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active', 'phone', 'address']);
        });
    }
};