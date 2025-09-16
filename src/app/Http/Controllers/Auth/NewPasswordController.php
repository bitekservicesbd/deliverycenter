<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Show the password reset page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $tenantId = null;

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request, &$tenantId) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
                $tenantId = Tenant::where('data->user_id', $user->id)->value('id');
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            if ($tenantId) {
                $appUrl = config('app.url');

                $scheme = parse_url($appUrl, PHP_URL_SCHEME) ?? 'http';
                $host = parse_url($appUrl, PHP_URL_HOST) ?? 'localhost';
                $port = parse_url($appUrl, PHP_URL_PORT) ?? '8000';
                $url = "{$scheme}://{$tenantId}.{$host}";
                if ($port) {
                    $url .= ":{$port}";
                }
                $url .= '/login';

                return Inertia::location($url);
            } else {
                return redirect()->route('login')->with('status', __($status));
            }
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
