<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LoadController extends Controller
{
    public function create()
    {
        return Inertia::render('tenants/loads/load_create');
    }

    public function search()
    {
        return Inertia::render('tenants/loads/load_search');
    }

    public function dispatchBoard()
    {
        return Inertia::render('tenants/loads/dispatch_board');
    }

    public function finalize()
    {
        return Inertia::render('tenants/loads/finalize_loads');
    }
}
