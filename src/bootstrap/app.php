<?php

use App\Http\Middleware\BlockedIPMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        then: function () {
            Route::middleware(['web', 'auth', '2fa', 'ai_agent_middleware'])
                ->prefix('central')
                ->as('central.')
                ->group(base_path('/routes/central.php'));

            Route::middleware(['web', 'ai_agent_middleware'])
                ->group(base_path('/routes/web.php'));

            Route::middleware(['web', 'tenant_auth', 'client', 'ai_agent_middleware'])
                ->prefix('client')->name('client.')
                ->group(base_path('/routes/client.php'));
            Route::middleware(['ai_agent_middleware'])->group(base_path('/routes/test.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            BlockedIPMiddleware::class,
        ]);
        $middleware->alias([
            'tenant_guest' => \App\Http\Middleware\TenantGuestMiddleware::class,
            'tenant' => \App\Http\Middleware\TenantMiddleware::class,
            'tenant_auth' => \App\Http\Middleware\TenantAuthMiddleware::class,
            'tenant_agent' => \App\Http\Middleware\TenantAgentMiddleware::class,
            'active_tenant' => \App\Http\Middleware\ActiveTenantMiddleware::class,
            'central_activation' => \App\Http\Middleware\ActiveTenantMiddleware::class,
            'is_central_user' => \App\Http\Middleware\IsCentralUserMiddleware::class,
            'is_tenant_user' => \App\Http\Middleware\IsTenantUserMiddleware::class,
            '2fa' => \App\Http\Middleware\Google2FAMiddleware::class,
            'client' => \App\Http\Middleware\ClientMiddleware::class,
            'ai_agent_middleware' => \App\Http\Middleware\AiAgentMiddleware::class,
            'cookie_set' => \App\Http\Middleware\SetCookieMiddleware::class,
            'api_guest' => \App\Http\Middleware\Api\ApiGuestMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
