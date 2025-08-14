<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'template_id' => 'required|exists:templates,id',
            'wedding_details' => 'required|array',
            'wedding_details.bride_name' => 'required|string|max:255',
            'wedding_details.groom_name' => 'required|string|max:255',
            'wedding_details.wedding_date' => 'required|date|after:today',
            'wedding_details.venue' => 'required|string|max:500',
            'wedding_details.ceremony_time' => 'required|string',
            'wedding_details.reception_time' => 'nullable|string',
            'wedding_details.guest_count' => 'nullable|integer|min:1',
            'wedding_details.additional_info' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
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
            'template_id.required' => 'Please select a wedding invitation template.',
            'template_id.exists' => 'The selected template is not available.',
            'wedding_details.required' => 'Wedding details are required.',
            'wedding_details.bride_name.required' => 'Bride name is required.',
            'wedding_details.groom_name.required' => 'Groom name is required.',
            'wedding_details.wedding_date.required' => 'Wedding date is required.',
            'wedding_details.wedding_date.after' => 'Wedding date must be in the future.',
            'wedding_details.venue.required' => 'Wedding venue is required.',
            'wedding_details.ceremony_time.required' => 'Ceremony time is required.',
        ];
    }
}