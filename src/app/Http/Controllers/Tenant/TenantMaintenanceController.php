<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TenantMaintenanceController extends Controller
{
    public function purgeLoads()
    {
        return Inertia::render('tenants/maintenance/purge-loads');
    }
}
