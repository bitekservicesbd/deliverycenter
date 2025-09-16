<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Plan;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::get();

        foreach ($plans as $plan) {
            $plan->tenants_count = Tenant::whereIn('data->status', ['trial', 'active'])
                ->where('data->plan_id', $plan->id)
                ->count();

        }

        return Inertia::render('centrals/plan/index', [
            'plans' => $plans,
        ]);
    }

    public function store(Request $request, $id = null)
    {
        $request->validate([
            'name' => ['required', 'string', Rule::unique('plans', 'name')->ignore($id)],
            'monthly_price' => 'nullable|numeric',
            'yearly_price' => 'nullable|numeric',
            'custom_price' => 'nullable|numeric',
        ]);

        try {
            $plan = Plan::updateOrCreate(
                ['id' => $id],
                [
                    'name' => $request->name,
                    'monthly_price' => $request->monthly_price,
                    'yearly_price' => $request->yearly_price,
                    'custom_price' => $request->custom_price,
                    'description' => $request->description,
                    'currency' => $request->currency,
                    'billing_cycle' => $request->billing_cycle,
                    'trial_days' => $request->trial_days,
                    'is_featured' => $request->is_featured,
                ]
            );

            // Log activity
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => $id ? 'updated' : 'created',
                'description' => ucfirst($id ? 'Updated' : 'Created').' plan: '.$plan->name.' ['.$plan->id.']',
            ]);

            return redirect()->back()->with('success', $id ? __('Updated successfully!') : __('Created successfully!'));

        } catch (\Exception $e) {
            Log::error('plan error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }

    public function delete($id)
    {
        try {
            $plan = Plan::find($id);

            if (! $plan) {
                return redirect()->back()->with('error', __('Plan not found!'));
            }

            $tenantCount = Tenant::where('data->plan_id', $plan->id)->count();

            if ($tenantCount > 0) {
                return redirect()->back()->with('error', __('Cannot delete this plan as it has :count active tenants. Please move the tenants to another plan first.', [
                    'count' => $tenantCount,
                ]));
            }

            $planName = $plan->name;
            $planId = $plan->id;

            $plan->delete();

            // Log activity
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => 'deleted',
                'description' => 'Deleted plan: '.$planName.' ['.$planId.']',
            ]);

            return redirect()->back()->with('success', __('Plan successfully deleted!'));

        } catch (\Exception $e) {
            Log::error('plan delete error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }

    public function toggleStatus($id)
    {
        try {
            $plan = Plan::findOrFail($id);
            $plan->is_active = ! $plan->is_active;
            $plan->save();

            $status = $plan->is_active ? 'activated' : 'deactivated';

            return redirect()->back()->with('success', __("Plan {$status} successfully!"));

        } catch (\Exception $e) {
            Log::error('plan error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }

    public function toggleFeatured($id)
    {
        try {
            $plan = Plan::findOrFail($id);
            $plan->is_featured = ! $plan->is_featured;
            $plan->save();

            $status = $plan->is_featured ? 'marked as featured' : 'featured removed';

            return redirect()->back()->with('success', __("Plan {$status} successfully!"));

        } catch (\Exception $e) {
            Log::error('plan error: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong. Please try again.'));
        }
    }
}
