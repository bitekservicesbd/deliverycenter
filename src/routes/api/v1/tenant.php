<?php

use App\Http\Controllers\Api\V1\Tenant\AuthController;
// Application Settings Controllers
use App\Http\Controllers\Api\V1\Tenant\Settings\AccessorialTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\AssetController;
use App\Http\Controllers\Api\V1\Tenant\Settings\AttachmentCategoryController;
use App\Http\Controllers\Api\V1\Tenant\Settings\BillFreightTermController;
use App\Http\Controllers\Api\V1\Tenant\Settings\BillingGroupController;
use App\Http\Controllers\Api\V1\Tenant\Settings\CarrierController;
use App\Http\Controllers\Api\V1\Tenant\Settings\CommissionPlanController;
use App\Http\Controllers\Api\V1\Tenant\Settings\CompanyController;
use App\Http\Controllers\Api\V1\Tenant\Settings\CurrencyTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\CustomerController;
use App\Http\Controllers\Api\V1\Tenant\Settings\DeductionTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\DispatchBoardController;
use App\Http\Controllers\Api\V1\Tenant\Settings\DockController;
use App\Http\Controllers\Api\V1\Tenant\Settings\EdiApiSettingController;
use App\Http\Controllers\Api\V1\Tenant\Settings\FuelSurchargePlanController;
use App\Http\Controllers\Api\V1\Tenant\Settings\PackageController;
use App\Http\Controllers\Api\V1\Tenant\Settings\PricePlanController;
use App\Http\Controllers\Api\V1\Tenant\Settings\PricePlanTemplateController;
use App\Http\Controllers\Api\V1\Tenant\Settings\ProvincialTaxController;
use App\Http\Controllers\Api\V1\Tenant\Settings\SalesCommissionPlanController;
use App\Http\Controllers\Api\V1\Tenant\Settings\ServiceClassController;
use App\Http\Controllers\Api\V1\Tenant\Settings\SurchargeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\TaxController;
use App\Http\Controllers\Api\V1\Tenant\Settings\UomTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\UserController;
use App\Http\Controllers\Api\V1\Tenant\Settings\VehicleTypeController;
use App\Http\Controllers\Api\V1\Tenant\Settings\VendorController;
use App\Http\Controllers\Api\V1\Tenant\Settings\VendorExpenseController;
use App\Http\Controllers\Api\V1\Tenant\Settings\WarehouseController;
use App\Http\Controllers\Api\V1\Tenant\Settings\WeatherController;
use App\Http\Controllers\Api\V1\Tenant\Settings\WorkingHolidayController;
use App\Http\Controllers\Api\V1\Tenant\Settings\ZoneController;
use App\Http\Controllers\Api\V1\Tenant\Settings\ZoneGroupController;
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
Route::middleware(['auth:sanctum', 'tenant.auth', 'throttle:api'])->group(function () {

    // Test Routes
    Route::get('/test', [TestController::class, 'index'])->name('test');
    Route::get('/test/database', [TestController::class, 'testDatabase'])->name('test.database');
    Route::get('/test/permissions', [TestController::class, 'testPermissions'])->name('test.permissions');

    /*
    |--------------------------------------------------------------------------
    | Application Settings Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('agent')->name('agent.')->group(function () {
    });
});
