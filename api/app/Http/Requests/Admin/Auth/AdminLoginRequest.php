<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AdminLoginRequest extends FormRequest
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
            'email' => ['required', 'email', 'max:100'],
            'password' => [
                'required',
                Password::min(8)
                    ->max(32)
                    ->mixedCase()
                    ->numbers(),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'email.max' => 'メールアドレスは100文字以内でなければなりません。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは8文字以上でなければなりません。',
            'password.max' => 'パスワードは32文字以内でなければなりません。',
            'password.mixedCase' => 'パスワードは大文字と小文字を両方含める必要があります。',
            'password.numbers' => 'パスワードは数字を含める必要があります。',
        ];
    }
}
