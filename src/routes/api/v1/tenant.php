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
        Route::prefix('settings')->name('settings.')->group(function () {

            // Company Management
            Route::apiResource('companies', CompanyController::class);
            Route::post('companies/{company}/set-default', [CompanyController::class, 'setDefault'])->name('companies.set-default');

            // Customer Management
            Route::apiResource('customers', CustomerController::class);
            Route::get('customers/{customer}/orders', [CustomerController::class, 'orders'])->name('customers.orders');
            Route::post('customers/{customer}/activate', [CustomerController::class, 'activate'])->name('customers.activate');

            // Carrier Management
            Route::apiResource('carriers', CarrierController::class);
            Route::get('carriers/{carrier}/performance', [CarrierController::class, 'performance'])->name('carriers.performance');

            // Zone Management
            Route::apiResource('zones', ZoneController::class);
            Route::get('zones/counts', [ZoneController::class, 'counts'])->name('zones.counts');
            Route::post('zones/bulk-import', [ZoneController::class, 'bulkImport'])->name('zones.bulk-import');

            Route::apiResource('zone-groups', ZoneGroupController::class);

            // Price Management
            Route::apiResource('price-plans', PricePlanController::class);
            Route::post('price-plans/{plan}/duplicate', [PricePlanController::class, 'duplicate'])->name('price-plans.duplicate');
            Route::apiResource('price-plan-templates', PricePlanTemplateController::class);

            // Surcharge & Commission
            Route::apiResource('surcharges', SurchargeController::class);
            Route::apiResource('commission-plans', CommissionPlanController::class);
            Route::apiResource('sales-commission-plans', SalesCommissionPlanController::class);
            Route::apiResource('fuel-surcharge-plans', FuelSurchargePlanController::class);

            // Service & Operations
            Route::apiResource('service-classes', ServiceClassController::class);
            Route::apiResource('accessorial-types', AccessorialTypeController::class);
            Route::apiResource('packages', PackageController::class);
            Route::apiResource('uom-types', UomTypeController::class);
            Route::apiResource('vehicle-types', VehicleTypeController::class);

            // Warehouse & Assets
            Route::apiResource('warehouses', WarehouseController::class);
            Route::apiResource('docks', DockController::class);
            Route::apiResource('assets', AssetController::class);

            // Vendor Management
            Route::apiResource('vendors', VendorController::class);
            Route::apiResource('vendor-expenses', VendorExpenseController::class);
            Route::get('vendor-expenses/vendor/{vendor}', [VendorExpenseController::class, 'byVendor'])->name('vendor-expenses.by-vendor');

            // Financial Settings
            Route::apiResource('bill-freight-terms', BillFreightTermController::class);
            Route::apiResource('billing-groups', BillingGroupController::class);
            Route::apiResource('taxes', TaxController::class);
            Route::apiResource('provincial-taxes', ProvincialTaxController::class);
            Route::apiResource('deduction-types', DeductionTypeController::class);
            Route::apiResource('currency-types', CurrencyTypeController::class);

            // System Settings
            Route::apiResource('attachment-categories', AttachmentCategoryController::class);
            Route::apiResource('dispatch-boards', DispatchBoardController::class);
            Route::apiResource('edi-api-settings', EdiApiSettingController::class);
            Route::apiResource('weather', WeatherController::class);
            Route::apiResource('working-holidays', WorkingHolidayController::class);

            // Bulk Operations
            Route::prefix('bulk')->name('bulk.')->group(function () {
                Route::post('customers/import', [CustomerController::class, 'bulkImport'])->name('customers.import');
                Route::post('zones/import', [ZoneController::class, 'bulkImport'])->name('zones.import');
                Route::post('carriers/import', [CarrierController::class, 'bulkImport'])->name('carriers.import');
                Route::delete('customers/delete', [CustomerController::class, 'bulkDelete'])->name('customers.delete');
            });

            // Export Operations
            Route::prefix('export')->name('export.')->group(function () {
                Route::get('customers', [CustomerController::class, 'export'])->name('customers');
                Route::get('zones', [ZoneController::class, 'export'])->name('zones');
                Route::get('price-plans', [PricePlanController::class, 'export'])->name('price-plans');
            });
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Reports & Analytics (Future)
    |--------------------------------------------------------------------------
    */
    Route::prefix('reports')->name('reports.')->group(function () {
        // Will add report endpoints here later
        Route::get('/summary', function () {
            return response()->json(['message' => 'Reports endpoint - Coming soon']);
        })->name('summary');
    });
});
