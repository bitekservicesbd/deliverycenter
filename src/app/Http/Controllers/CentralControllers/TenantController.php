<?php

namespace App\Http\Controllers\CentralControllers;

use App\Events\TenantProvisioned;
use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\CentralAppSetting;
use App\Models\Plan;
use App\Models\Tenant;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::with(['user', 'plan', 'createdBy'])
            ->get()
            ->map(function ($tenant) {
                return [
                    'id' => $tenant->id,
                    'company_name' => $tenant->company_name,
                    'tenancy_db_name' => $tenant->tenancy_db_name,
                    'status' => $tenant->status,
                    'payment_status' => $tenant->payment_status,
                    'user' => $tenant->user,
                    'plan' => $tenant->plan,
                    'created_by' => $tenant->createdBy,
                    'trial_ends_at' => $tenant->trial_ends_at,
                    'next_billing_date' => $tenant->next_billing_date,
                    'trial_days_remaining' => $tenant->trial_days_remaining,
                    'payment_overdue_days' => $tenant->payment_overdue_days,
                    'days_until_next_billing' => $tenant->days_until_next_billing,
                    'is_active' => $tenant->is_active,
                    'is_on_trial' => $tenant->is_on_trial,
                    'domain' => $tenant->domains?->first()?->domain ?? null,
                    'created_at' => $tenant->created_at,
                    'notes' => $tenant->notes,
                ];
            });

        $users = User::where('user_type', USER_TYPE_TENANT)->get();
        $plans = Plan::where('is_active', true)->get();

        $settings = CentralAppSetting::first();

        return Inertia::render('centrals/tenant/index', [
            'tenants' => $tenants,
            'users' => $users,
            'plans' => $plans,
            'settings' => [
                'default_trial_days' => $settings->default_trial_days ?? 14,
                'payment_due_days' => $settings->payment_due_days ?? 7,
            ],
        ]);
    }

    // Existing store method enhanced
    public function store(Request $request)
    {
        $request->merge([
            'name' => strtolower($request->name),
        ]);

        $request->validate([
            'name' => [$request->id ? 'nullable' : 'required', 'string', 'alpha_dash', 'unique:tenants,id'],
            'user_id' => 'required|exists:users,id',
            'plan_id' => 'required|exists:plans,id',
        ]);

        // DB::beginTransaction();

        // try {

        $plan = Plan::findOrFail($request->plan_id);
        $settings = CentralAppSetting::first();
        $trialDays = $request->trial_days ?: ($settings->default_trial_days ?? 14);
        $user = User::findOrFail($request->user_id);

        $tenantData = [
            'id' => $request->id ?: $request->name,
            'tenancy_db_name' => $request->name,
            'company_name' => $request->company_name,
            'user_id' => $request->user_id,
            'plan_id' => $request->plan_id,
            'status' => $request->status ?: 'trial',
            'payment_status' => $request->status === 'active' ? 'paid' : 'trial',
            'created_by' => auth()->id(),
            'notes' => $request->notes,
        ];

        // Set trial period if status is trial
        if (($request->status ?: 'trial') === 'trial') {
            $tenantData['trial_ends_at'] = now()->addDays($trialDays);
        }

        // Set next billing date if active
        if ($request->status === 'active') {
            $tenantData['next_billing_date'] = $plan->billing_cycle === 'yearly'
                ? now()->addYear()
                : now()->addMonth();
        }

        // must create tenant  outside of the transaction
        // coz, mysql autocommit is on by default when a new database is created
        if (! isset($request->id)) {
            // create tenant
            $tenant = Tenant::create($tenantData);

            return $this->createTenant($request, $tenant, $user);
        } else {
            // update tenant
            DB::beginTransaction();
            try {
                $tenant = Tenant::where('id', $request->id)->firstOrFail();
                // $tenant->user_id = $request->user_id;
                $tenant->plan_id = $request->plan_id;
                $tenant->save();

                ActivityLog::create([
                    'admin_user_id' => auth()->id(),
                    'action' => $request->id ? 'updated' : 'created',
                    'description' => 'Updated'.' tenant: '.$tenant->company_name.' ['.$tenant->id.']',
                ]);

                DB::commit();

                return redirect()->back()->with('success', __('Tenant saved successfully'));
            } catch (\Throwable $th) {
                DB::rollback();
                Log::error('Tenant save failed: '.$th->getMessage());

                return redirect()->back()->with('error', __('Tenant save failed: '.$th->getMessage()));
            }
        }
    }

    private function createTenant(Request $request, Tenant $tenant, User $user)
    {
        try {

            // Create or update domain
            $tenant->domains()->updateOrCreate(
                ['tenant_id' => $tenant->id],
                ['domain' => strtolower($request->name).'.'.request()->getHost()]
            );

            // create a user as admin to this tenant's user table
            TenantProvisioned::dispatch(
                $tenant,
                $user
            );

            // Log activity
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => $request->id ? 'updated' : 'created',
                'description' => ucfirst($request->id ? 'Updated' : 'Created').' tenant: '.$tenant->company_name.' ['.$tenant->id.']',
            ]);

            DB::commit();

            return redirect()->back()->with('success', __('Tenant saved successfully'));
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Tenant save failed: '.$e->getMessage());

            return redirect()->back()->with('error', __('Tenant save failed: '.$e->getMessage()));
        }
    }

    // New method: Mark Payment
    public function markPayment(Request $request, $tenantId)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method' => ['required', Rule::in(['manual', 'stripe', 'paypal', 'bank_transfer'])],
            'billing_cycle' => ['required', Rule::in(['monthly', 'yearly', 'custom'])],
            'notes' => 'nullable|string|max:500',
            'extend_months' => 'nullable|integer|min:1|max:24',
        ]);

        try {
            $tenant = Tenant::findOrFail($tenantId);
            $plan = $tenant->plan;

            // Ensure we get an integer value
            $extendMonths = $request->extend_months;

            // calculate based on billing cycle
            if (! $extendMonths) {
                $extendMonths = $request->billing_cycle === 'yearly' ? 12 : 1;
            }

            // Double-check it's an integer
            $extendMonths = (int) $extendMonths;

            $nextBilling = now()->addMonths($extendMonths);

            // Update tenant status
            $tenant->update([
                'status' => 'active',
                'payment_status' => 'paid',
                'next_billing_date' => $nextBilling,
                'payment_method' => $request->payment_method,
                'notes' => $tenant->notes."\nPayment marked: ".$request->amount.' '.($plan->currency ?? 'USD').' on '.now()->format('Y-m-d H:i'),
            ]);

            // Log activity
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => 'payment_marked',
                'description' => 'Marked payment of '.$request->amount.' '.($plan->currency ?? 'USD').' for tenant: '.$tenant->company_name,
            ]);

            return redirect()->back()->with('success', __('Payment marked successfully'));
        } catch (\Exception $e) {
            Log::error('Mark payment failed: '.$e->getMessage());

            return redirect()->back()->with('error', __('Failed to mark payment: '.$e->getMessage()));
        }
    }

    // New method: Change Status
    public function changeStatus(Request $request, $tenantId)
    {
        $request->validate([
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended', 'trial'])],
            'reason' => 'nullable|string|max:500',
        ]);

        try {
            $tenant = Tenant::findOrFail($tenantId);
            $oldStatus = $tenant->status;

            $tenant->update([
                'status' => $request->status,
                'notes' => $tenant->notes."\nStatus changed from {$oldStatus} to {$request->status}".
                    ($request->reason ? ' - Reason: '.$request->reason : '').
                    ' on '.now()->format('Y-m-d H:i'),
            ]);

            // Log activity
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => 'status_changed',
                'description' => "Changed tenant status from {$oldStatus} to {$request->status}".
                    ($request->reason ? ' - Reason: '.$request->reason : ''),
            ]);

            return redirect()->back()->with('success', __('Tenant status updated successfully'));
        } catch (\Exception $e) {
            Log::error('Status change failed: '.$e->getMessage());

            return redirect()->back()->with('error', __('Failed to update status: '.$e->getMessage()));
        }
    }

    // Existing delete method
    public function delete($id)
    {
        try {
            $tenant = Tenant::findOrFail($id);
            $tenant->domains()->delete();
            $tenant->delete();
            ActivityLog::create([
                'admin_user_id' => auth()->id(),
                'action' => 'deleted',
                'description' => 'Deleted tenant: ['.$tenant->id.']',
            ]);

            return redirect()->back()->with('success', __('Tenant deleted successfully'));
        } catch (Exception $e) {
            Log::error('Tenant delete failed: '.$e->getMessage());

            return redirect()->back()->with('error', __('Something went wrong'));
        }
    }
}
