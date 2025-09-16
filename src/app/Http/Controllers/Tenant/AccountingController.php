<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AccountingController extends Controller
{
    public function invoice()
    {
        return Inertia::render('tenants/accounting/invoice');
    }

    public function glSearch()
    {
        return Inertia::render('tenants/accounting/gl_search');
    }

    public function manualInvoice()
    {
        return Inertia::render('tenants/accounting/manual_invoice');
    }

    public function scheduleManualInvoice()
    {
        return Inertia::render('tenants/accounting/schedule_manual_invoice');
    }

    public function settleCarriers()
    {
        return Inertia::render('tenants/accounting/settle_carriers');
    }
}
