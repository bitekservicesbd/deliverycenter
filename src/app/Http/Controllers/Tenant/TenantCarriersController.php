<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TenantCarriersController extends Controller
{
    public function index()
    {
        return Inertia::render('tenants/carriers/carriers_index');
    }

    public function create()
    {
        return Inertia::render('tenants/carriers/create');
    }

    public function customerBrokers()
    {
        return Inertia::render('tenants/carriers/customer-brokers');
    }

    public function customerBrokersCreate()
    {
        return Inertia::render('tenants/carriers/customer-brokers-create');
    }
}
