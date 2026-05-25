<?php

namespace App\Http\Requests\Admin\Attendance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAdminAttendanceRequest extends FormRequest
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
            'clock_in' => ['required', 'date_format:H:i'],        
            'clock_out' => ['required', 'date_format:H:i', 'after:clock_in'],
            'break_times' => ['array'],
            'break_times.*.break_in' => [
                'required',
                'date_format:H:i',
                'after:clock_in',
                'before:clock_out',
            ],
            'break_times.*.break_out' => [
                'nullable',
                'date_format:H:i',
                'after:break_times.*.break_in',
                'before:clock_out',
            ],
            'note' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'clock_in.required' => '出勤時間は必須です。',
            'clock_out.required' => '退勤時間は必須です。',
            'clock_out.after' => '退勤時間は出勤時間より後でなければなりません。',

            'break_times.*.break_in.required' => '休憩開始時間は必須です。',
            'break_times.*.break_in.after' => '休憩開始時間は出勤時間より後でなければなりません。',
            'break_times.*.break_in.before' => '休憩開始時間は退勤時間より前でなければなりません。',
            'break_times.*.break_out.after' => '休憩終了時間は休憩開始時間より後でなければなりません。',
            'break_times.*.break_out.before' => '休憩終了時間は退勤時間より前でなければなりません。',

            'note.string' => '備考は文字列で入力してください。',
            'note.max' => '備考は255文字以内で入力してください。',
        ];
    }
}
