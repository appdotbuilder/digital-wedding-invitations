<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Template
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property float $price
 * @property int $category_id
 * @property int $owner_id
 * @property string|null $thumbnail
 * @property string|null $preview_images
 * @property string|null $template_file
 * @property string $status
 * @property int $order_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * @property-read int|null $orders_count
 * @property-read array $preview_images_array
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Template newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template query()
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereOrderCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template wherePreviewImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereTemplateFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template active()
 * @method static \Database\Factories\TemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Template extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'category_id',
        'owner_id',
        'thumbnail',
        'preview_images',
        'template_file',
        'status',
        'order_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'order_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the template.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the user that owns the template.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the orders for the template.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the preview images as an array.
     *
     * @return array
     */
    public function getPreviewImagesArrayAttribute(): array
    {
        return $this->preview_images ? json_decode($this->preview_images, true) : [];
    }

    /**
     * Scope a query to only include active templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}