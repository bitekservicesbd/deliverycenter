<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function accountSetup()
    {
        return Inertia::render('clients/customer/account-setup');
    }

    public function myContact()
    {
        return Inertia::render('clients/customer/my-contact');
    }

    public function myAddress()
    {
        return Inertia::render('clients/customer/my-address');
    }

    public function invoices()
    {
        return Inertia::render('clients/customer/invoices');
    }
}
