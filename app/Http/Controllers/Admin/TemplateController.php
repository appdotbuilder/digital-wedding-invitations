<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTemplateRequest;
use App\Http\Requests\UpdateTemplateRequest;
use App\Models\Category;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Template::with(['category']);

        // Super admin can see all templates, admin users only their own
        if (!$request->user()->isSuperAdmin()) {
            $query->where('owner_id', $request->user()->id);
        }

        $templates = $query->orderBy('created_at', 'desc')->paginate(10);
        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/templates/index', [
            'templates' => $templates,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/templates/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTemplateRequest $request)
    {
        $template = Template::create([
            ...$request->validated(),
            'owner_id' => $request->user()->id,
            'status' => 'active',
        ]);

        return redirect()->route('admin.templates.index')
            ->with('success', 'Template created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        // Ensure admin users can only view their own templates
        if (!auth()->user()->isSuperAdmin() && $template->owner_id !== auth()->id()) {
            abort(403);
        }

        $template->load(['category', 'owner', 'orders.user']);

        return Inertia::render('admin/templates/show', [
            'template' => $template,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Template $template)
    {
        // Ensure admin users can only edit their own templates
        if (!auth()->user()->isSuperAdmin() && $template->owner_id !== auth()->id()) {
            abort(403);
        }

        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('admin/templates/edit', [
            'template' => $template,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTemplateRequest $request, Template $template)
    {
        // Ensure admin users can only update their own templates
        if (!$request->user()->isSuperAdmin() && $template->owner_id !== $request->user()->id) {
            abort(403);
        }

        $template->update($request->validated());

        return redirect()->route('admin.templates.index')
            ->with('success', 'Template updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        // Ensure admin users can only delete their own templates
        if (!auth()->user()->isSuperAdmin() && $template->owner_id !== auth()->id()) {
            abort(403);
        }

        $template->delete();

        return redirect()->route('admin.templates.index')
            ->with('success', 'Template deleted successfully.');
    }
}