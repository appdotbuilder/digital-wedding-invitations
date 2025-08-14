<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeddingController extends Controller
{
    /**
     * Display the wedding invitation catalog.
     */
    public function index(Request $request)
    {
        $query = Template::with(['category', 'owner'])
            ->active()
            ->orderBy('order_count', 'desc')
            ->orderBy('created_at', 'desc');

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Search by title
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $templates = $query->paginate(12);
        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('welcome', [
            'templates' => $templates,
            'categories' => $categories,
            'filters' => $request->only(['category', 'min_price', 'max_price', 'search']),
        ]);
    }

    /**
     * Display the specified template.
     */
    public function show(Template $template)
    {
        $template->load(['category', 'owner']);
        
        // Get related templates from the same category
        $relatedTemplates = Template::with(['category'])
            ->active()
            ->where('category_id', $template->category_id)
            ->where('id', '!=', $template->id)
            ->orderBy('order_count', 'desc')
            ->limit(4)
            ->get();

        return Inertia::render('templates/show', [
            'template' => $template,
            'relatedTemplates' => $relatedTemplates,
        ]);
    }
}