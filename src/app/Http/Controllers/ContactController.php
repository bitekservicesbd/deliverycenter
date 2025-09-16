<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(ContactRequest $request)
    {
        try {
            $data = $request->validated();
            Mail::to('info@gmail.com')->queue(new ContactMail($data));

            return redirect()->back()->with('success', __('Message sent successfully'));
        } catch (\Exception $e) {
            Log::error('contact error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }
}
