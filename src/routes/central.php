<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\CentralControllers\AppSettingController;
use App\Http\Controllers\CentralControllers\BlockedIpController;
use App\Http\Controllers\CentralControllers\CentralUserController;
use App\Http\Controllers\CentralControllers\DemoRequestController;
use App\Http\Controllers\CentralControllers\PlanController;
use App\Http\Controllers\CentralControllers\StripePaymentController;
use App\Http\Controllers\CentralControllers\TenantController;
use App\Http\Controllers\CentralControllers\TenantUserController;
use App\Http\Controllers\CentralControllers\TwoFactorController;
use Illuminate\Support\Facades\Route;

Route::prefix('settings')->as('settings.')->group(function () {
    Route::get('/general', [AppSettingController::class, 'general'])->name('general');
    Route::post('/general/update', [AppSettingController::class, 'generalUpdate'])->name('general.update');
    Route::get('/mail', [AppSettingController::class, 'mail'])->name('mail');
    Route::post('/mail/update', [AppSettingController::class, 'mailUpdate'])->name('mail.update');
    Route::get('/recaptcha', [AppSettingController::class, 'recaptcha'])->name('recaptcha');
    Route::post('/recaptcha/update', [AppSettingController::class, 'recaptchaUpdate'])->name('recaptcha.update');
    Route::get('/aws', [AppSettingController::class, 'aws'])->name('aws');
    Route::post('/aws/update', [AppSettingController::class, 'awsUpdate'])->name('aws.update');

    Route::get('/payment-settings', [AppSettingController::class, 'paymentSettings'])->name('payment');
    Route::post('/payment-settings/update', [AppSettingController::class, 'paymentSettingsUpdate'])->name('payment.update');

    Route::post('/stripe/test', [StripePaymentController::class, 'testStripeConfig'])->name('stripe.test');

    Route::prefix('2fa')->as('2fa.')->group(function () {
        Route::get('/', [TwoFactorController::class, 'index'])->name('index')->withoutMiddleware('2fa');
        Route::post('/', function () {
            return redirect()->route('dashboard');
        });
        Route::post('/enable', [TwoFactorController::class, 'enable'])->name('enable');
        Route::post('/disable', [TwoFactorController::class, 'disable'])->name('disable');
        Route::get('/verify', [TwoFactorController::class, 'verify'])->name('verify');
    });
});

// Enhanced Plan Management Routes
Route::prefix('plans')->as('plans.')->group(function () {
    Route::get('/', [PlanController::class, 'index'])->name('index');
    Route::post('/{id?}', [PlanController::class, 'store'])->name('store');
    Route::delete('/{id}', [PlanController::class, 'delete'])->name('delete');
    Route::post('/toggle-status/{id}', [PlanController::class, 'toggleStatus'])->name('toggle.status');
    // NEW: Additional payment-related routes
    Route::post('/toggle-featured/{id}', [PlanController::class, 'toggleFeatured'])->name('toggle.featured');
    Route::post('/bulk-action', [PlanController::class, 'bulkAction'])->name('bulk-action');
    Route::get('/statistics', [PlanController::class, 'getStatistics'])->name('statistics');
    Route::get('/export', [PlanController::class, 'export'])->name('export');
});

Route::prefix('demo-request')->as('demo-request.')->group(function () {
    Route::get('/', [DemoRequestController::class, 'index'])->name('index');
    Route::get('/delete/{id}', [DemoRequestController::class, 'delete'])->name('delete');
});

// Enhanced Tenant Management Routes
Route::prefix('tenants')->as('tenants.')->group(function () {
    Route::get('/', [TenantController::class, 'index'])->name('index');
    Route::post('/store', [TenantController::class, 'store'])->name('store');
    Route::delete('/{id}', [TenantController::class, 'delete'])->name('delete');

    Route::post('/{id}/mark-payment', [TenantController::class, 'markPayment'])->name('mark-payment');
    Route::post('/{id}/change-status', [TenantController::class, 'changeStatus'])->name('change-status');

    Route::get('/overdue-payments', [TenantController::class, 'overduePayments'])->name('overdue-payments');
    Route::get('/trial-expiring', [TenantController::class, 'trialExpiring'])->name('trial-expiring');

    Route::post('/{tenant}/generate-payment-link', [StripePaymentController::class, 'generatePaymentLink'])
        ->name('generate-payment-link');

    // Manual Payment Link Send (extends your existing markPayment functionality)
    Route::post('/{tenant}/send-payment-reminder', [StripePaymentController::class, 'sendPaymentReminder'])
        ->name('send-payment-reminder');

    // Payment History for Tenant (extends your existing tenant management)
    Route::get('/{tenant}/payment-history', [StripePaymentController::class, 'getPaymentHistory'])
        ->name('payment-history');
});

Route::prefix('users')->as('users.')->group(function () {
    Route::get('/', [CentralUserController::class, 'index'])->name('index');
    Route::post('/store', [CentralUserController::class, 'store'])->name('store');
    Route::put('/toggle-status/{id}', [CentralUserController::class, 'toggleStatus'])->name('toggle');
    Route::delete('/delete/{id}', [CentralUserController::class, 'delete'])->name('delete');
    Route::post('/reset-password/{id}', [CentralUserController::class, 'resetPassword'])->name('reset.password');
    Route::post('/tenant/reset-password/{id}/{tenantId}', [CentralUserController::class, 'tenantUserResetPassword'])->name('tenant.reset.password');
});

Route::prefix('tenant-users')->as('tenant.users.')->group(function () {
    Route::get('/', [TenantUserController::class, 'index'])->name('index');
    Route::post('/store', [TenantUserController::class, 'store'])->name('store');
    Route::put('/toggle-status/{id}', [TenantUserController::class, 'toggleStatus'])->name('toggle');
    Route::delete('/delete/{id}', [TenantUserController::class, 'delete'])->name('delete');
});
Route::prefix('activityLog')->as('activity-log.')->group(function () {
    Route::get('/', [ActivityLogController::class, 'index'])->name('index');
    Route::delete('/delete/{id}', [ActivityLogController::class, 'delete'])->name('delete');
});
Route::prefix('blocked-ip')->as('blocked.ip.')->group(function () {
    Route::get('/', [BlockedIpController::class, 'index'])->name('index');
    Route::delete('/delete/{id}', [BlockedIpController::class, 'delete'])->name('delete');
});
