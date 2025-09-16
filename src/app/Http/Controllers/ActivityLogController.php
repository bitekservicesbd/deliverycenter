<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {

        $logs = ActivityLog::with('user')
            ->latest()
            ->paginate(20);

        return Inertia::render('centrals/activity-log/index', [
            'logs' => $logs,
        ]);
    }

    public function delete($id)
    {
        try {
            $log = ActivityLog::find($id);
            $log->delete();

            return redirect()->back()->with('success', 'Log has been deleted.');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
