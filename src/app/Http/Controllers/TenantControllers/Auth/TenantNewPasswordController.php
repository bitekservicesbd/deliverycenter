<?php

namespace App\Http\Controllers\TenantControllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TenantNewPasswordController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('tenants/auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'tenant_id' => $request->tenant_id,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'tenant_id' => 'required',
        ]);

        tenantDB($request->tenant_id);

        $user = tenantDB($request->tenant_id)->table('users')->where('email', $request->email)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => [__('We can\'t find a user with that email address.')],
            ]);
        }

        $status = Password::broker('tenant_users')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            $appUrl = config('app.url');
            $scheme = parse_url($appUrl, PHP_URL_SCHEME) ?: 'http';
            $host = parse_url($appUrl, PHP_URL_HOST) ?: 'localhost';
            $port = parse_url($appUrl, PHP_URL_PORT) ?: '8000';

            $url = "{$scheme}://{$request->tenant_id}.{$host}";

            if (! empty($port)) {
                $url .= ":{$port}";
            }

            $url .= '/login';

            return Inertia::location($url);
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
