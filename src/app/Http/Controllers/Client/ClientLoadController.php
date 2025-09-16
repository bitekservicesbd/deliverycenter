<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ClientLoadController extends Controller
{
    public function create()
    {
        return Inertia::render('clients/loads/load_create');
    }

    public function createSimple()
    {
        return Inertia::render('clients/loads/load_create_simple');
    }

    public function search()
    {
        return Inertia::render('clients/loads/load_search');
    }
}
