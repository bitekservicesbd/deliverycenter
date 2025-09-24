<?php

use App\Http\Controllers\Api\V1\Tenant\AuthController;
// Application Settings Controllers
use App\Http\Controllers\Api\V1\Tenant\Settings\AccessorialTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\AssetController;
use App\Http\Controllers\Api\V1\Tenant\Settings\AttachmentCategoryController;
use App\Http\Controllers\Api\V1\Tenant\Settings\BillingTermController;
use App\Http\Controllers\Api\V1\Tenant\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tenant Authentication Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->name('auth.')->middleware(['cookie_set'])->group(function () {
    // Public authentication endpoints
    Route::post('/login', [AuthController::class, 'login'])->name('login')->middleware('api_guest');
    Route::post('/verify-token', [AuthController::class, 'verifyToken'])->name('verify-token');

    // Protected authentication endpoints
    Route::middleware(['auth:sanctum', 'tenant_auth'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
        Route::put('/profile', [AuthController::class, 'updateProfile'])->name('update-profile');
        Route::put('/change-password', [AuthController::class, 'changePassword'])->name('change-password');
    });
});

/*
|--------------------------------------------------------------------------
| Protected Tenant Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['cookie_set'])->group(function () {


    /*
    |--------------------------------------------------------------------------
    | Agent Route
    |--------------------------------------------------------------------------
    */
    Route::prefix('agent')->name('agent.')->group(function () {
        // Application Settings Routes
        Route::prefix('settings')->name('settings.')->group(function () {

            // Accessorial Types Routes
            Route::prefix('accessorial-types')->name('accessorial-types.')->group(function () {
                Route::get('/', [AccessorialTypeController::class, 'index'])->name('index');
                Route::post('/', [AccessorialTypeController::class, 'store'])->name('store');
                Route::get('/options', [AccessorialTypeController::class, 'options'])->name('options');
                Route::get('/fuel', [AccessorialTypeController::class, 'fuel'])->name('fuel');
                Route::get('/new-load', [AccessorialTypeController::class, 'newLoad'])->name('new-load');
                Route::get('/{accessorialType}', [AccessorialTypeController::class, 'show'])->name('show');
                Route::put('/{accessorialType}', [AccessorialTypeController::class, 'update'])->name('update');
                Route::delete('/{accessorialType}', [AccessorialTypeController::class, 'destroy'])->name('destroy');
                Route::patch('/{accessorialType}/restore', [AccessorialTypeController::class, 'restore'])->name('restore');
            });

            // Attachment Categories Routes
            Route::prefix('attachment-categories')->name('attachment-categories.')->group(function () {
                Route::get('/', [AttachmentCategoryController::class, 'index'])->name('index');
                Route::post('/', [AttachmentCategoryController::class, 'store'])->name('store');
                Route::get('/options', [AttachmentCategoryController::class, 'options'])->name('options');
                Route::get('/required', [AttachmentCategoryController::class, 'required'])->name('required');
                Route::get('/{attachmentCategory}', [AttachmentCategoryController::class, 'show'])->name('show');
                Route::put('/{attachmentCategory}', [AttachmentCategoryController::class, 'update'])->name('update');
                Route::delete('/{attachmentCategory}', [AttachmentCategoryController::class, 'destroy'])->name('destroy');
                Route::patch('/{attachmentCategory}/restore', [AttachmentCategoryController::class, 'restore'])->name('restore');
            });

            // Assets Routes
            Route::prefix('assets')->name('assets.')->group(function () {
                Route::get('/', [AssetController::class, 'index'])->name('index');
                Route::post('/', [AssetController::class, 'store'])->name('store');
                Route::get('/options', [AssetController::class, 'options'])->name('options');
                Route::get('/service-required', [AssetController::class, 'serviceRequired'])->name('service-required');
                Route::get('/expired-plates', [AssetController::class, 'expiredPlates'])->name('expired-plates');
                Route::get('/{asset}', [AssetController::class, 'show'])->name('show');
                Route::put('/{asset}', [AssetController::class, 'update'])->name('update');
                Route::delete('/{asset}', [AssetController::class, 'destroy'])->name('destroy');
                Route::patch('/{asset}/restore', [AssetController::class, 'restore'])->name('restore');
            });

            // Billing Terms Routes
            Route::prefix('billing-terms')->name('billing-terms.')->group(function () {
                Route::get('/', [BillingTermController::class, 'index'])->name('index');
                Route::post('/', [BillingTermController::class, 'store'])->name('store');
                Route::get('/options', [BillingTermController::class, 'options'])->name('options');
                Route::get('/default', [BillingTermController::class, 'default'])->name('default');
                Route::get('/{billingTerm}', [BillingTermController::class, 'show'])->name('show');
                Route::put('/{billingTerm}', [BillingTermController::class, 'update'])->name('update');
                Route::delete('/{billingTerm}', [BillingTermController::class, 'destroy'])->name('destroy');
                Route::patch('/{billingTerm}/restore', [BillingTermController::class, 'restore'])->name('restore');
                Route::patch('/{billingTerm}/set-default', [BillingTermController::class, 'setDefault'])->name('set-default');
                Route::post('/{billingTerm}/calculate-discount', [BillingTermController::class, 'calculateDiscount'])->name('calculate-discount');
            });
        });
    });
});
