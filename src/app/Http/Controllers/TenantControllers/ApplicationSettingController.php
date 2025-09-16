<?php

namespace App\Http\Controllers\TenantControllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ApplicationSettingController extends Controller
{
    public function accessorialTypes()
    {
        return Inertia::render('tenants/application-settings/accessorial-types');
    }

    public function assets()
    {
        return Inertia::render('tenants/application-settings/assets');
    }

    public function attachmentCategories()
    {
        return Inertia::render('tenants/application-settings/attachment-categories');
    }

    public function createAttachmentCategory()
    {
        return Inertia::render('tenants/application-settings/create-attachment-categories');
    }

    public function autoDispatch()
    {
        return Inertia::render('tenants/application-settings/auto-dispatch');
    }

    public function billFreightTerms()
    {
        return Inertia::render('tenants/application-settings/bill-freight-terms');
    }

    public function billFreightTermsCreate()
    {
        return Inertia::render('tenants/application-settings/bill-freight-terms-create');
    }

    public function billingGroup()
    {
        return Inertia::render('tenants/application-settings/billing-group');
    }

    public function billingTerms()
    {
        return Inertia::render('tenants/application-settings/billing-terms');
    }

    public function carrierCommissionPlans()
    {
        return Inertia::render('tenants/application-settings/carrier-commision-plans');
    }

    public function carrierPaymentZones()
    {
        return Inertia::render('tenants/application-settings/carrier-payment-zone');
    }

    public function carrierPaymentZonesCreate()
    {
        return Inertia::render('tenants/application-settings/carrier-payment-zone-create');
    }

    public function carrierTypes()
    {
        return Inertia::render('tenants/application-settings/carrier-types');
    }

    public function currencyTypes()
    {
        return Inertia::render('tenants/application-settings/currency-types');
    }

    public function customerRelation()
    {
        return Inertia::render('tenants/application-settings/customer-relation');
    }

    public function customerTypes()
    {
        return Inertia::render('tenants/application-settings/customer-types');
    }

    public function customerTypesCreate()
    {
        return Inertia::render('tenants/application-settings/customer-types-create');
    }

    public function deductionTypes()
    {
        return Inertia::render('tenants/application-settings/deduction-types');
    }

    public function createDeductionTypes()
    {
        return Inertia::render('tenants/application-settings/create-deduction-types');
    }

    public function deliveryConditions()
    {
        return Inertia::render('tenants/application-settings/delivery-conditions');
    }

    public function createDeliveryConditions()
    {
        return Inertia::render('tenants/application-settings/create-delivery-conditions');
    }

    public function dispatchBoards()
    {
        return Inertia::render('tenants/application-settings/dispatch-boards');
    }

    public function createDispatchBoards()
    {
        return Inertia::render('tenants/application-settings/create-dispatch-boards');
    }

    public function dispatchZones()
    {
        return Inertia::render('tenants/application-settings/dispatch-zones');
    }

    public function createDispatchZones()
    {
        return Inertia::render('tenants/application-settings/create-dispatch-zones');
    }

    public function distanceCache()
    {
        return Inertia::render('tenants/application-settings/distance-cache');
    }

    public function docks()
    {
        return Inertia::render('tenants/application-settings/docks');
    }

    public function createDocks()
    {
        return Inertia::render('tenants/application-settings/create-docks');
    }

    public function fuelSurchargesAdjustments()
    {
        return Inertia::render('tenants/application-settings/fuel-surcharges-adjustments');
    }

    public function holidays()
    {
        return Inertia::render('tenants/application-settings/holidays');
    }

    public function packages()
    {
        return Inertia::render('tenants/application-settings/packages');
    }

    public function paymentTypes()
    {
        return Inertia::render('tenants/application-settings/payment-types');
    }

    public function createPaymentTypes()
    {
        return Inertia::render('tenants/application-settings/create-payment-types');
    }

    public function pricePlans()
    {
        return Inertia::render('tenants/application-settings/price-plans');
    }

    public function pricePlanChargesAdjustments()
    {
        return Inertia::render('tenants/application-settings/price-plan-charges-adjustments');
    }

    public function pricePlanTemplates()
    {
        return Inertia::render('tenants/application-settings/price-plan-templates');
    }

    public function pricePlanZoneCount()
    {
        return Inertia::render('tenants/application-settings/price-plan-zone-count');
    }

    public function salesCommissionPlans()
    {
        return Inertia::render('tenants/application-settings/sales-commission-plans');
    }

    public function serviceClass()
    {
        return Inertia::render('tenants/application-settings/service-class');
    }

    public function provincialTaxes()
    {
        return Inertia::render('tenants/application-settings/provincial-taxes');
    }

    public function createProvincialTaxes()
    {
        return Inertia::render('tenants/application-settings/create-provincial-taxes');
    }

    public function surcharges()
    {
        return Inertia::render('tenants/application-settings/surcharges');
    }

    public function taxes()
    {
        return Inertia::render('tenants/application-settings/texes');
    }

    public function taxesCreate()
    {
        return Inertia::render('tenants/application-settings/texes-create');
    }

    public function uomTypes()
    {
        return Inertia::render('tenants/application-settings/uom-types');
    }

    public function uomTypesCreate()
    {
        return Inertia::render('tenants/application-settings/uom-types-create');
    }

    public function vehicleTypes()
    {
        return Inertia::render('tenants/application-settings/vehicle-types');
    }

    public function vendors()
    {
        return Inertia::render('tenants/application-settings/vendors');
    }

    public function vendorsCreate()
    {
        return Inertia::render('tenants/application-settings/vendors-create');
    }

    public function vendorsExpenses()
    {
        return Inertia::render('tenants/application-settings/vendors-expenses');
    }

    public function warehouse()
    {
        return Inertia::render('tenants/application-settings/warehouse');
    }

    public function zones()
    {
        return Inertia::render('tenants/application-settings/zones');
    }

    public function createZones()
    {
        return Inertia::render('tenants/application-settings/create-zones');
    }

    public function zoneCounts()
    {
        return Inertia::render('tenants/application-settings/zone-counts');
    }

    public function zoneGroup()
    {
        return Inertia::render('tenants/application-settings/zone-group');
    }
}
