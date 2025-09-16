<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                    'warning' => session('warning'),
                    'info' => session('info'),
                ];
            },
            'centralAppData' => fn () => CentralDB()->table('central_app_settings')->first(),
            'auth' => fn () => auth()->check() ? auth()->user() : null,
            'USER_TYPE_CENTRAL' => USER_TYPE_CENTRAL,
            'USER_TYPE_TENANT' => USER_TYPE_TENANT,
        ]);
    }
}
