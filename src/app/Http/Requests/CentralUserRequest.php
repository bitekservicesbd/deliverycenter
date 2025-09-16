<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CentralUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'username' => strtolower($this->username),
            'email' => strtolower($this->email),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->id ?? null;

        return [
            'name' => 'required|string|between:2,30',
            'company_name' => 'required', 'string', 'between:2,50',
            'username' => ['required', 'string', 'between:2,30', Rule::unique('users', 'username')->ignore($userId), 'alpha_dash'],
            'email' => ['required', 'string', 'email', 'max:100', Rule::unique('users', 'email')->ignore($userId)],
            'status' => [$userId ? 'required' : 'nullable', Rule::in(['active', 'inactive', 'blocked'])],
        ];
    }
}
