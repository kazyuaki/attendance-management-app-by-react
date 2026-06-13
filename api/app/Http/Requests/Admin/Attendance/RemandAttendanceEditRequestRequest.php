<?php

namespace App\Http\Requests\Admin\Attendance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RemandAttendanceEditRequestRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'rejected_reason' => ['required', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'rejected_reason.required' => '差し戻し理由を入力してください。',
            'rejected_reason.max' => '差し戻し理由は1000文字以内で入力してください。',
        ];
    }
}