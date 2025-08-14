<?php

use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\TemplateController as AdminTemplateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WeddingController;
use App\Http\Middleware\AdminAccess;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes - Wedding invitation catalog
Route::get('/', [WeddingController::class, 'index'])->name('home');
Route::get('/templates/{template}', [WeddingController::class, 'show'])->name('templates.show');

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard (role-based)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // User order management
    Route::resource('orders', OrderController::class)->except(['edit', 'update', 'destroy']);
    Route::resource('orders.payments', PaymentController::class)->only(['store']);
    
    // Admin routes (for admin_user and super_admin roles)
    Route::middleware(AdminAccess::class)->prefix('admin')->name('admin.')->group(function () {
        
        // Template management
        Route::resource('templates', AdminTemplateController::class);
        
        // Order management
        Route::resource('orders', AdminOrderController::class)->only(['index', 'show']);
        Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';