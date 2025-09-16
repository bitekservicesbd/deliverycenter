<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('clients/dashboard');
    }
}
