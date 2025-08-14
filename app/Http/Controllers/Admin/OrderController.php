<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'template', 'payments']);

        // Admin users can only see orders for their templates
        if (!$request->user()->isSuperAdmin()) {
            $query->whereHas('template', function ($q) use ($request) {
                $q->where('owner_id', $request->user()->id);
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by payment status
        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'payment_status']),
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Ensure admin users can only view orders for their templates
        if (!auth()->user()->isSuperAdmin() && $order->template->owner_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['user', 'template.category', 'payments']);

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        // Ensure admin users can only update orders for their templates
        if (!$request->user()->isSuperAdmin() && $order->template->owner_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,process,completed,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Order status updated successfully.');
    }
}