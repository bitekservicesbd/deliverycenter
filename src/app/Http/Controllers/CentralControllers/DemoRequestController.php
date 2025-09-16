<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Models\DemoRequest;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DemoRequestController extends Controller
{
    public function index()
    {
        $demo = DemoRequest::get();

        return Inertia::render('centrals/demo-request/index', [
            'demo' => $demo,
        ]);
    }

    public function delete($id)
    {
        try {
            DemoRequest::find($id)->delete();

            return redirect()->back()->with('success', __('Request deleted successfully'));
        } catch (Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
