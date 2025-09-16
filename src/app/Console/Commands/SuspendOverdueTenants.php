<?php

namespace App\Console\Commands;

use App\Models\ActivityLog;
use App\Models\CentralAppSetting;
use App\Models\Tenant;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SuspendOverdueTenants extends Command
{
    protected $signature = 'tenants:suspend-overdue {--dry-run : Show what would be suspended without making changes}';

    protected $description = 'Suspend tenants with overdue payments beyond grace period';

    public function handle()
    {
        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->info('🔍 DRY RUN MODE - No suspensions will be made');
        }

        $this->info('⚠️  Checking for overdue tenants to suspend...');

        // Get grace period from settings
        $settings = CentralAppSetting::first();
        $gracePeriodDays = $settings->payment_due_days ?? 7;

        // Find tenants overdue beyond grace period
        $suspensionDate = Carbon::now()->subDays($gracePeriodDays);

        $overdueTenants = Tenant::where('data->status', '!=', 'suspended')
            ->where('data->payment_status', '!=', 'paid')
            ->whereDate('data->next_billing_date', '<', $suspensionDate)
            ->with(['user', 'plan'])
            ->get();

        if ($overdueTenants->isEmpty()) {
            $this->info('✅ No tenants found for suspension');

            return Command::SUCCESS;
        }

        $this->info("📋 Found {$overdueTenants->count()} tenants to suspend (overdue more than {$gracePeriodDays} days)");

        $suspended = 0;
        foreach ($overdueTenants as $tenant) {
            $daysOverdue = Carbon::parse($tenant->next_billing_date)->diffInDays(Carbon::now());

            $this->line("   Processing: {$tenant->company_name} ({$daysOverdue} days overdue)");

            if ($isDryRun) {
                $this->line("   Would suspend tenant due to {$daysOverdue} days overdue");
                $suspended++;

                continue;
            }

            try {
                $tenant->update([
                    'status' => 'suspended',
                    'payment_status' => 'overdue',
                    'notes' => ($tenant->notes ?? '')."\nSuspended for overdue payment ({$daysOverdue} days) on ".Carbon::now()->format('Y-m-d H:i').' (auto-suspended)',
                ]);

                // Log the activity
                ActivityLog::create([
                    'admin_user_id' => User::where('user_type', 1)->first()->id,
                    'action' => 'tenant_suspended',
                    'description' => "Tenant suspended for overdue payment: {$tenant->company_name} [{$tenant->id}] - {$daysOverdue} days overdue",
                ]);

                $this->line("   🚫 Suspended: {$tenant->company_name}");
                $suspended++;

                // Optional: Send suspension notification email here
                // Mail::to($tenant->user->email)->queue(new TenantSuspensionMail($tenant));

            } catch (\Exception $e) {
                $this->error("   ❌ Failed to suspend {$tenant->company_name}: ".$e->getMessage());
            }
        }

        if ($isDryRun) {
            $this->info("✨ DRY RUN COMPLETE - Would have suspended {$suspended} tenants");
        } else {
            $this->info("✅ Overdue suspension check completed - Suspended {$suspended}/{$overdueTenants->count()} tenants");

            if ($suspended > 0) {
                $this->warn("⚠️  {$suspended} tenants have been suspended for overdue payments");
            }
        }

        return Command::SUCCESS;
    }
}
