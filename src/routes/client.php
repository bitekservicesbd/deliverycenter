<?php

use App\Http\Controllers\Client\ClientDashboardController;
use App\Http\Controllers\Client\ClientLoadController;
use App\Http\Controllers\Client\ClientProfileController;
use App\Http\Controllers\Client\ClientToolsController;
use App\Http\Controllers\Client\CustomerController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
    'tenant',
])
    ->group(function () {
        Route::get('/', function () {
            return redirect()->route('client.dashboard');
        });

        // dashboard
        Route::get('/dashboard', [ClientDashboardController::class, 'index'])->name('dashboard');

        Route::controller(ClientProfileController::class)->prefix('settings')->name('profile.')->group(function () {
            Route::redirect('/', 'profile');
            Route::get('profile', 'edit')->name('edit');
            Route::patch('profile', 'update')->name('update');
            Route::delete('profile', 'destroy')->name('destroy');
            Route::get('password', 'editPassword')->name('password.edit');
            Route::put('password', 'updatePassword')->name('password.update');
            Route::get('appearance', 'appearance')->name('appearance');
        });

        Route::post('/logout', [ClientProfileController::class, 'logout'])->name('logout')->middleware('auth');

        // loads
        Route::controller(ClientLoadController::class)->prefix('loads')->name('loads.')->group(function () {
            Route::get('/create', 'create')->name('create');
            Route::get('/create/simple', 'createSimple')->name('create.simple');
            Route::get('/search', 'search')->name('search');
        });

        // customer
        Route::controller(CustomerController::class)->prefix('customer')->name('customer.')->group(function () {
            Route::get('/account-setup', 'accountSetup')->name('account.setup');
            Route::get('/my-contact', 'myContact')->name('my.contact');
            Route::get('/my-address', 'myAddress')->name('my.address');
            Route::get('/invoices', 'invoices')->name('invoices');
        });

        // tools
        Route::controller(ClientToolsController::class)->prefix('tools')->name('tools.')->group(function () {
            Route::get('/importer', 'importer')->name('importer');
            Route::get('/reports', 'reports')->name('reports');
        });
    });
