<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CentralControllers\StripePaymentController;
use App\Http\Controllers\CentralControllers\StripeWebhookController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DemoContactController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\UserPanelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        // Public pages
        Route::get('/', [FrontendController::class, 'index']);
        Route::get('/features', [FrontendController::class, 'features'])->name('features');
        Route::get('/resources', [FrontendController::class, 'resource'])->name('resources');
        Route::get('/demo', [FrontendController::class, 'demo'])->name('demo');
        Route::get('/downloads', [FrontendController::class, 'downloads'])->name('downloads');
        Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
        Route::post('/demo/request', [DemoContactController::class, 'demoRequest'])->name('demo.submit');

        // Authenticated pages
        Route::middleware(['auth', 'is_central_user', 'verified', '2fa'])->group(function () {
            Route::get('dashboard', function () {
                return Inertia::render('dashboard');
            })->name('dashboard');
        });

        require __DIR__.'/settings.php';
        require __DIR__.'/auth.php';
    });

    Route::post('/contact-store', [ContactController::class, 'contact'])->name('contact.store');
    Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])
        ->name('stripe.webhook');
    Route::prefix('payment')->name('stripe.')->group(function () {

        Route::get('/success', [StripePaymentController::class, 'paymentSuccess'])
            ->name('payment.success');

        Route::get('/cancel/{tenant}', [StripePaymentController::class, 'paymentCancel'])
            ->name('payment.cancel');

        Route::get('/track/{reminder}', [StripePaymentController::class, 'trackPaymentLinkClick'])
            ->name('track');
    });

    Route::middleware(['auth'])->prefix('user-panel')->name('user.panel.')->group(function () {
        Route::get('/', [UserPanelController::class, 'index'])->name('index');
        Route::post('password-change', [UserPanelController::class, 'passwordChange'])->name('password.change');
    });
    Route::get('/login-as-central/{tenant}', [AuthenticatedSessionController::class, 'loginAsCentralUser'])->name('login.as.central');
    Route::get('/login-as-tenant/{tenant}', [AuthenticatedSessionController::class, 'loginAsTenantUser'])->name('login.as.tenant');
    Route::get('/login-as-user-panel/{email}', [AuthenticatedSessionController::class, 'loginAsUserPanel'])->name('login.as.user.panel');

    // Route::post('/security-test', function (Request $request) {
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Request passed through security middleware!',
    //         'received_data' => $request->all(),
    //         'timestamp' => now()
    //     ]);
    // });
}
