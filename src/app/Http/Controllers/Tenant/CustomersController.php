<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CustomersController extends Controller
{
    public function search()
    {
        return Inertia::render('tenants/customers/customer_search');
    }

    public function contacts()
    {
        return Inertia::render('tenants/customers/contacts');
    }

    public function create()
    {
        return Inertia::render('tenants/customers/create');
    }
}
