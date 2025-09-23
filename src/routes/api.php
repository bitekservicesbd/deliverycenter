<?php

use App\Http\Controllers\Api\V1\Tenant\TenantIdentifierController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::prefix('v1')->name('api.v1.tenant.')->group(function () {
    Route::post('/tenant-identifier', [TenantIdentifierController::class, 'getTenantIdentifier'])->name('tenant-identifier');
});

Route::middleware([
    'api',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
    'tenant',
])->prefix('v1')->name('api.v1.tenant.')->group(function () {
    require __DIR__.'/api/v1/tenant.php';
});
