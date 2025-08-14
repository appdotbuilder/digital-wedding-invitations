<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WeddingInvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@wedding.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'is_active' => true,
            'phone' => '+1234567890',
            'address' => '123 Admin St, Admin City',
        ]);

        // Create Admin Users
        $adminUsers = User::factory(5)->create([
            'role' => 'admin_user',
            'is_active' => true,
        ]);

        // Create Regular Users
        $regularUsers = User::factory(20)->create([
            'role' => 'user',
            'is_active' => true,
        ]);

        // Create Categories
        $categories = [
            [
                'name' => 'Classic & Elegant',
                'description' => 'Timeless and sophisticated wedding invitation designs',
                'is_active' => true,
            ],
            [
                'name' => 'Modern & Minimalist',
                'description' => 'Clean, contemporary designs with simple elegance',
                'is_active' => true,
            ],
            [
                'name' => 'Rustic & Natural',
                'description' => 'Earthy, organic designs perfect for outdoor weddings',
                'is_active' => true,
            ],
            [
                'name' => 'Vintage & Romantic',
                'description' => 'Nostalgic designs with romantic vintage touches',
                'is_active' => true,
            ],
            [
                'name' => 'Floral & Garden',
                'description' => 'Beautiful botanical designs with floral elements',
                'is_active' => true,
            ],
            [
                'name' => 'Beach & Destination',
                'description' => 'Perfect for beach weddings and destination ceremonies',
                'is_active' => true,
            ],
            [
                'name' => 'Luxury & Glamour',
                'description' => 'Opulent designs for glamorous celebrations',
                'is_active' => true,
            ],
            [
                'name' => 'Traditional & Cultural',
                'description' => 'Cultural and traditional wedding invitation designs',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);

            // Create templates for each category
            foreach ($adminUsers as $adminUser) {
                Template::factory(random_int(2, 4))->create([
                    'category_id' => $category->id,
                    'owner_id' => $adminUser->id,
                    'status' => 'active',
                ]);
            }
        }

        // Create some orders
        $templates = Template::all();
        foreach ($regularUsers->take(15) as $user) {
            $orderCount = random_int(1, 3);
            for ($i = 0; $i < $orderCount; $i++) {
                $template = $templates->random();
                $order = Order::create([
                    'user_id' => $user->id,
                    'template_id' => $template->id,
                    'order_number' => Order::generateOrderNumber(),
                    'order_date' => now()->subDays(random_int(1, 90)),
                    'status' => fake()->randomElement(['pending', 'process', 'completed']),
                    'payment_status' => fake()->randomElement(['pending', 'paid']),
                    'total_price' => $template->price,
                    'wedding_details' => [
                        'bride_name' => fake()->firstNameFemale(),
                        'groom_name' => fake()->firstNameMale(),
                        'wedding_date' => fake()->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
                        'venue' => fake()->address(),
                        'ceremony_time' => fake()->time('H:i'),
                        'reception_time' => fake()->time('H:i'),
                        'guest_count' => random_int(50, 200),
                        'additional_info' => fake()->sentence(),
                    ],
                    'notes' => fake()->optional()->sentence(),
                ]);

                // Create payment for paid orders
                if ($order->payment_status === 'paid') {
                    Payment::create([
                        'order_id' => $order->id,
                        'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'e_wallet']),
                        'amount' => $order->total_price,
                        'payment_date' => $order->order_date->addHours(random_int(1, 24)),
                        'status' => 'success',
                        'transaction_id' => 'TXN-' . fake()->unique()->numerify('########'),
                        'payment_details' => [
                            'gateway' => 'wedding_pay',
                            'reference' => fake()->uuid(),
                        ],
                    ]);
                }

                // Update template order count
                $template->increment('order_count');
            }
        }
    }
}