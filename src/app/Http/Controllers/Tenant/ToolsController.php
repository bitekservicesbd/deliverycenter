<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ToolsController extends Controller
{
    public function importer()
    {
        return Inertia::render('tenants/tools/importer');
    }

    public function messagingQueueManager()
    {
        return Inertia::render('tenants/tools/messaging-queue-manager');
    }
}
