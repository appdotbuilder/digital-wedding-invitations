<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTemplateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && (auth()->user()->isAdminUser() || auth()->user()->isSuperAdmin());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:999.99',
            'category_id' => 'required|exists:categories,id',
            'thumbnail' => 'nullable|string|max:500',
            'preview_images' => 'nullable|json',
            'template_file' => 'nullable|string|max:500',
            'status' => 'nullable|in:active,inactive,pending',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Template title is required.',
            'title.max' => 'Template title cannot exceed 255 characters.',
            'price.required' => 'Template price is required.',
            'price.numeric' => 'Template price must be a valid number.',
            'price.min' => 'Template price cannot be negative.',
            'price.max' => 'Template price cannot exceed $999.99.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'status.in' => 'Status must be active, inactive, or pending.',
        ];
    }
}