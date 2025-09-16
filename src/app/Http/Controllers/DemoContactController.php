<?php

namespace App\Http\Controllers;

use App\Http\Requests\DemoBookRequest;
use App\Mail\DemoRequestMail;
use App\Models\DemoRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DemoContactController extends Controller
{
    public function demoRequest(DemoBookRequest $request)
    {
        try {
            $data = $request->all();
            DemoRequest::create($data);
            Mail::to($request->email)->queue(new DemoRequestMail($data));

            return redirect()->back()->with('success', __('Your demo request has been submitted!'));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }
}
