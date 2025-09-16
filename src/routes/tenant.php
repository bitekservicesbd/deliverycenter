<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\AccountingController;
use App\Http\Controllers\Tenant\CustomersController;
use App\Http\Controllers\Tenant\LoadController;
use App\Http\Controllers\Tenant\TenantCarriersController;
use App\Http\Controllers\Tenant\TenantMaintenanceController;
use App\Http\Controllers\Tenant\TenantPasswordController;
use App\Http\Controllers\Tenant\TenantProfileController;
use App\Http\Controllers\Tenant\ToolsController;
use App\Http\Controllers\TenantControllers\ApplicationSettingController;
use App\Http\Controllers\TenantControllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TenantControllers\TwoFactorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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
            return redirect()->route('tenant.dashboard');
        });

        Route::middleware('tenant_guest')->group(function () {
            Route::get('/login', function () {
                return Inertia::render('tenants/auth/login');
            })->name('tenant.login');
            Route::post('/login', [AuthenticatedSessionController::class, 'login']);
        });
        Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])->name('tenant.logout')->middleware('auth');

        Route::middleware(['tenant_auth', 'tenant_agent', 'active_tenant', 'central_activation', '2fa'])->as('tenant.')->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('tenants/dashboard');
            })->name('dashboard');

            Route::controller(TenantProfileController::class)->prefix('settings')->name('profile.')->group(function () {
                Route::redirect('/', 'profile');
                Route::get('profile', 'edit')->name('edit');
                Route::patch('profile', 'update')->name('update');
                Route::delete('profile', 'destroy')->name('destroy');

                Route::get('password', 'edit')->name('password.edit');
                Route::put('password', 'update')->name('password.update');

                Route::get('appearance', function () {
                    return Inertia::render('tenants/settings/appearance');
                })->name('appearance');
            });

            Route::controller(TenantPasswordController::class)->prefix('settings/password')->name('password.')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
            });

            // load
            Route::controller(LoadController::class)->prefix('load')->name('load.')->group(function () {
                Route::get('/create', 'create')->name('create');
                Route::get('/search', 'search')->name('search');
                Route::get('/dispatch-board', 'dispatchBoard')->name('dispatch-board');
                Route::get('/finalize', 'finalize')->name('finalize');
            });

            // carriers
            Route::controller(TenantCarriersController::class)->prefix('carriers')->name('carriers.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::get('/customer-brokers', 'customerBrokers')->name('customer.brokers');
                Route::get('/customer-brokers/create', 'customerBrokersCreate')->name('customer.brokers.create');
            });

            // accounting
            Route::controller(AccountingController::class)->prefix('accounting')->name('accounting.')->group(function () {
                Route::get('/invoice', 'invoice')->name('invoice');
                Route::get('/gl-search', 'glSearch')->name('gl.search');
                Route::get('/manual-invoice', 'manualInvoice')->name('manual.invoice');
                Route::get('/schedule/manual-invoice', 'scheduleManualInvoice')->name('schedule.manual.invoice');
                Route::get('/settle-carriers', 'settleCarriers')->name('settle.carriers');
            });

            // tools
            Route::controller(ToolsController::class)->prefix('tools')->name('tools.')->group(function () {
                Route::get('/importer', 'importer')->name('importer');
                Route::get('/messaging-queue-manager', 'messagingQueueManager')->name('messaging.queue.manager');
            });

            // maintenance
            Route::controller(TenantMaintenanceController::class)->prefix('maintenance')->name('maintenance.')->group(function () {
                Route::get('/purge-loads', 'purgeLoads')->name('purge.loads');
            });

            // customers
            Route::controller(CustomersController::class)->prefix('customers')->name('customers.')->group(function () {
                Route::get('/search', 'search')->name('search');
                Route::get('/contacts', 'contacts')->name('contacts');
                Route::get('/create', 'create')->name('create');
            });

            // two factor authentication
            Route::prefix('tenant/2fa')->as('2fa.')->group(function () {
                Route::get('/', [TwoFactorController::class, 'index'])->name('index');
                Route::middleware(['2fa'])->group(function () {
                    Route::post('/', function () {
                        return redirect()->route('tenant.dashboard');
                    });
                    Route::post('/enable', [TwoFactorController::class, 'enable'])->name('enable');
                    Route::post('/disable', [TwoFactorController::class, 'disable'])->name('disable');
                    Route::get('/verify', [TwoFactorController::class, 'verify'])->name('verify');
                });
            });

            // application settings
            Route::controller(ApplicationSettingController::class)->prefix('application-settings')->as('application.settings.')->group(function () {
                Route::get('/accessorial-types', 'accessorialTypes')->name('accessorial.types');
                Route::get('/assets', 'assets')->name('assets');
                Route::get('/attachment-categories', 'attachmentCategories')->name('attachment.categories');
                Route::get('/create-attachment-category', 'createAttachmentCategory')->name('create.attachment.category');
                Route::get('/auto-dispatch', 'autoDispatch')->name('auto.dispatch');
                Route::get('/bill-freight-terms', 'billFreightTerms')->name('bill.freight.terms');
                Route::get('/bill-freight-terms-create', 'billFreightTermsCreate')->name('bill.freight.terms.create');
                Route::get('/billing-group', 'billingGroup')->name('billing.group');
                Route::get('/billing-terms', 'billingTerms')->name('billing.terms');
                Route::get('/carrier-commission-plans', 'carrierCommissionPlans')->name('carrier.commission.plans');
                Route::get('carrier-payment-zones', 'carrierPaymentZones')->name('carrier.payment.zones');
                Route::get('carrier-payment-zones-create', 'carrierPaymentZonesCreate')->name('carrier.payment.zones.create');
                Route::get('carrier-types', 'carrierTypes')->name('carrier.types');
                Route::get('currency-types', 'currencyTypes')->name('currency.types');
                Route::get('customer-relation', 'customerRelation')->name('customer.relation');
                Route::get('customer-types', 'customerTypes')->name('customer.types');
                Route::get('customer-types-create', 'customerTypesCreate')->name('customer.types.create');
                Route::get('deduction-types', 'deductionTypes')->name('deduction.types');
                Route::get('create-deduction-types', 'createDeductionTypes')->name('create.deduction.types');
                Route::get('delivery-conditions', 'deliveryConditions')->name('delivery.conditions');
                Route::get('create-delivery-conditions', 'createdeliveryConditions')->name('create.delivery.conditions');
                Route::get('dispatch-boards', 'dispatchBoards')->name('dispatch.boards');
                Route::get('create-dispatch-boards', 'createDispatchBoards')->name('create.dispatch.boards');
                Route::get('dispatch-zones', 'dispatchZones')->name('dispatch.zones');
                Route::get('create-dispatch-zones', 'createDispatchZones')->name('create.dispatch.zones');
                Route::get('distance-cache', 'distanceCache')->name('distance.cache');
                Route::get('docks', 'docks')->name('docks');
                Route::get('create-docks', 'createDocks')->name('create.docks');
                Route::get('fuel-surcharges-adjustments', 'fuelSurchargesAdjustments')->name('fuel.surcharges.adjustments');
                Route::get('holidays', 'holidays')->name('holidays');
                Route::get('packages', 'packages')->name('packages');
                Route::get('payment-types', 'paymentTypes')->name('payment.types');
                Route::get('create-payment-types', 'createPaymentTypes')->name('create.payment.types');
                Route::get('price-plans', 'pricePlans')->name('price.plans');
                Route::get('price-plan-charges-adjustments', 'pricePlanChargesAdjustments')->name('price.plan.charges.adjustments');
                Route::get('price-plan-templates', 'pricePlanTemplates')->name('price.plan.templates');
                Route::get('price-plan-zone-count', 'pricePlanZoneCount')->name('price.plan.zone.count');
                Route::get('sales-commission-plans', 'salesCommissionPlans')->name('sales.commission.plans');
                Route::get('service-class', 'serviceClass')->name('service.class');
                Route::get('provincial-taxes', 'provincialTaxes')->name('provincial.taxes');
                Route::get('create-provincial-taxes', 'createProvincialTaxes')->name('create.provincial.taxes');
                Route::get('surcharges', 'surcharges')->name('surcharges');
                Route::get('taxes', 'taxes')->name('taxes');
                Route::get('taxes-create', 'taxesCreate')->name('taxes.create');
                Route::get('uom-types', 'uomTypes')->name('uom.types');
                Route::get('uom-types/create', 'uomTypesCreate')->name('uom.types.create');
                Route::get('vehicle-types', 'vehicleTypes')->name('vehicle.types');
                Route::get('vendors', 'vendors')->name('vendors');
                Route::get('vendors-create', 'vendorsCreate')->name('vendors.create');
                Route::get('vendors-expenses', 'vendorsExpenses')->name('vendors.expenses');
                Route::get('warehouse', 'warehouse')->name('warehouse');
                Route::get('zones', 'zones')->name('zones');
                Route::get('create-zones', 'createZones')->name('create.zones');
                Route::get('zone-counts', 'zoneCounts')->name('zone.counts');
                Route::get('zone-group', 'zoneGroup')->name('zone.group');
            });
        });
        Route::get('/sso-central-login', [AuthenticatedSessionController::class, 'ssoCentralLogin'])->name('tenant.sso.central.login');
        Route::get('/sso-tenant-login', [AuthenticatedSessionController::class, 'ssoTenantLogin'])->name('tenant.sso.tenant.login');
    });
