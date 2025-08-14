<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Order>
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $template = Template::factory()->create();
        
        return [
            'user_id' => User::factory()->state(['role' => 'user']),
            'template_id' => $template->id,
            'order_number' => Order::generateOrderNumber(),
            'order_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'status' => fake()->randomElement(['pending', 'process', 'completed', 'cancelled']),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'failed']),
            'total_price' => $template->price,
            'wedding_details' => [
                'bride_name' => fake()->firstNameFemale(),
                'groom_name' => fake()->firstNameMale(),
                'wedding_date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                'venue' => fake()->address(),
                'ceremony_time' => fake()->time('H:i'),
                'reception_time' => fake()->time('H:i'),
                'additional_info' => fake()->sentence(),
            ],
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_status' => 'paid',
        ]);
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }
}