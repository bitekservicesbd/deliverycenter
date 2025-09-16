<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ClientToolsController extends Controller
{
    public function importer()
    {
        return Inertia::render('clients/tools/importer');
    }

    public function reports()
    {
        return Inertia::render('clients/tools/reports');
    }
}
