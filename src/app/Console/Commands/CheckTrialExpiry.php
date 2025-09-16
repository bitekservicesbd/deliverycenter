<?php

namespace App\Console\Commands;

use App\Models\ActivityLog;
use App\Models\Tenant;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckTrialExpiry extends Command
{
    protected $signature = 'tenants:check-trial-expiry {--dry-run : Show what would be updated without making changes}';

    protected $description = 'Check for expired trials and update tenant status';

    public function handle()
    {
        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->info('🔍 DRY RUN MODE - No changes will be made');
        }

        $this->info('🔍 Checking for expired trials...');

        // Find tenants with expired trials
        $expiredTrials = Tenant::where('data->status', 'trial')
            ->whereDate('data->trial_ends_at', '<', Carbon::now())
            ->with(['user', 'plan'])
            ->get();

        if ($expiredTrials->isEmpty()) {
            $this->info('✅ No expired trials found');

            return Command::SUCCESS;
        }

        $this->info("📋 Found {$expiredTrials->count()} expired trials");

        $updated = 0;
        foreach ($expiredTrials as $tenant) {
            $daysExpired = Carbon::parse($tenant->trial_ends_at)->diffInDays(Carbon::now());

            $this->line("   Processing: {$tenant->company_name} (expired {$daysExpired} days ago)");

            if ($isDryRun) {
                $this->line("   Would update status from 'trial' to 'inactive'");
                $updated++;

                continue;
            }

            try {
                // Update tenant status
                $tenant->update([
                    'status' => 'inactive',
                    'payment_status' => 'pending',
                    'notes' => ($tenant->notes ?? '')."\nTrial expired on ".Carbon::parse($tenant->trial_ends_at)->format('Y-m-d').' (auto-updated)',
                ]);

                // Log the activity
                ActivityLog::create([
                    'admin_user_id' => User::where('user_type', 1)->first()->id,
                    'action' => 'trial_expired',
                    'description' => "Trial expired for tenant: {$tenant->company_name} [{$tenant->id}] - Status changed to inactive",
                ]);

                $this->line("   ✅ Updated: {$tenant->company_name}");
                $updated++;

            } catch (\Exception $e) {
                $this->error("   ❌ Failed to update {$tenant->company_name}: ".$e->getMessage());
            }
        }

        if ($isDryRun) {
            $this->info("✨ DRY RUN COMPLETE - Would have updated {$updated} tenants");
        } else {
            $this->info("✅ Trial expiry check completed - Updated {$updated}/{$expiredTrials->count()} tenants");
        }

        return Command::SUCCESS;
    }
}
