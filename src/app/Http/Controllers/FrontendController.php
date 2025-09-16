<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        return Inertia::render('frontend/Index');
    }

    public function features()
    {
        return Inertia::render('frontend/Features');
    }

    public function resource()
    {
        return Inertia::render('frontend/Resource');
    }

    public function demo()
    {
        return Inertia::render('frontend/DemoPage');
    }

    public function downloads()
    {
        return Inertia::render('frontend/Downloads');
    }

    public function contact()
    {
        return Inertia::render('frontend/Contact');
    }
}
