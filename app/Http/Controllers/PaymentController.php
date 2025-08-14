<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Store a newly created payment.
     */
    public function store(Request $request, Order $order)
    {
        // Ensure user can only process payment for their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'payment_method' => 'required|string|in:credit_card,bank_transfer,e_wallet',
        ]);

        // Simulate payment processing
        $paymentSuccess = random_int(1, 10) > 2; // 80% success rate

        $payment = Payment::create([
            'order_id' => $order->id,
            'payment_method' => $request->payment_method,
            'amount' => $order->total_price,
            'payment_date' => $paymentSuccess ? now() : null,
            'status' => $paymentSuccess ? 'success' : 'failed',
            'transaction_id' => 'TXN-' . now()->format('Ymd') . '-' . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT),
            'payment_details' => [
                'gateway' => 'wedding_pay_simulator',
                'method' => $request->payment_method,
                'simulation' => true,
            ],
        ]);

        if ($paymentSuccess) {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'process',
            ]);

            return redirect()->route('orders.show', $order)
                ->with('success', 'Payment successful! Your order is now being processed.');
        } else {
            return redirect()->route('orders.show', $order)
                ->with('error', 'Payment failed. Please try again or use a different payment method.');
        }
    }
}