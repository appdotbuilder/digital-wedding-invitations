<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Template>
 */
class TemplateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Template>
     */
    protected $model = Template::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Elegant Rose Garden',
            'Modern Gold Minimalist',
            'Vintage Lace Romance',
            'Rustic Woodland Dreams',
            'Classic Ivory Elegance',
            'Floral Watercolor Bliss',
            'Bohemian Desert Sunset',
            'Luxury Black & Gold',
            'Tropical Beach Paradise',
            'Timeless Marble & Gold',
            'Romantic Pink Blush',
            'Industrial Chic Modern',
            'Garden Party Florals',
            'Art Deco Glamour',
            'Countryside Charm'
        ];

        return [
            'title' => fake()->unique()->randomElement($titles),
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 25, 150),
            'category_id' => Category::factory(),
            'owner_id' => User::factory()->state(['role' => 'admin_user']),
            'thumbnail' => 'templates/thumbnails/' . fake()->slug() . '.jpg',
            'preview_images' => json_encode([
                'templates/previews/' . fake()->slug() . '_1.jpg',
                'templates/previews/' . fake()->slug() . '_2.jpg',
                'templates/previews/' . fake()->slug() . '_3.jpg',
            ]),
            'template_file' => 'templates/files/' . fake()->slug() . '.zip',
            'status' => 'active',
            'order_count' => fake()->numberBetween(0, 50),
        ];
    }

    /**
     * Indicate that the template is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the template is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}