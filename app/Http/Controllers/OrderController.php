<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with(['template', 'payments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(Template $template)
    {
        $template->load(['category', 'owner']);

        return Inertia::render('orders/create', [
            'template' => $template,
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request)
    {
        $template = Template::findOrFail($request->template_id);
        
        $order = Order::create([
            'user_id' => $request->user()->id,
            'template_id' => $template->id,
            'order_number' => Order::generateOrderNumber(),
            'order_date' => now(),
            'status' => 'pending',
            'payment_status' => 'pending',
            'total_price' => $template->price,
            'wedding_details' => $request->wedding_details,
            'notes' => $request->notes,
        ]);

        // Increment template order count
        $template->increment('order_count');

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully! Please proceed with payment.');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Ensure user can only view their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['template.category', 'payments']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }


}