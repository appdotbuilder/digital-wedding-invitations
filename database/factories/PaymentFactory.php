<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Payment>
     */
    protected $model = Payment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $order = Order::factory()->create();
        $paymentMethods = ['credit_card', 'bank_transfer', 'e_wallet', 'cash'];
        
        return [
            'order_id' => $order->id,
            'payment_method' => fake()->randomElement($paymentMethods),
            'amount' => $order->total_price,
            'payment_date' => fake()->dateTimeBetween($order->order_date, 'now'),
            'status' => fake()->randomElement(['pending', 'success', 'failed']),
            'transaction_id' => 'TXN-' . fake()->unique()->numerify('########'),
            'payment_details' => [
                'gateway' => fake()->randomElement(['midtrans', 'xendit', 'payment_gateway']),
                'reference' => fake()->uuid(),
            ],
        ];
    }

    /**
     * Indicate that the payment is successful.
     */
    public function successful(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'success',
            'payment_date' => now(),
        ]);
    }

    /**
     * Indicate that the payment is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_date' => null,
        ]);
    }
}