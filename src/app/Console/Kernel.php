<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Send payment reminders daily at 9 AM
        $schedule->command('payments:send-reminders')
            ->dailyAt('09:00')
            ->withoutOverlapping()
            ->runInBackground()
            ->appendOutputTo(storage_path('logs/payment-reminders.log'));

        // Check for trial expiry daily at 10 AM
        $schedule->command('tenants:check-trial-expiry')
            ->dailyAt('10:00')
            ->withoutOverlapping()
            ->runInBackground()
            ->appendOutputTo(storage_path('logs/trial-expiry.log'));

        // Suspend overdue tenants daily at 11 AM
        $schedule->command('tenants:suspend-overdue')
            ->dailyAt('11:00')
            ->withoutOverlapping()
            ->runInBackground()
            ->appendOutputTo(storage_path('logs/tenant-suspension.log'));

        // Clean up expired payment links weekly
        $schedule->command('payments:cleanup-expired-links')
            ->weeklyOn(1, '02:00')
            ->withoutOverlapping()
            ->runInBackground();

        // Generate monthly payment reports
        $schedule->command('reports:generate-monthly-payment-report')
            ->monthlyOn(1, '03:00')
            ->withoutOverlapping()
            ->runInBackground();

        // Optional: Test payments every hour during business hours (for debugging)
        $schedule->command('payments:send-reminders --dry-run')
            ->everyMinute()
            ->between('9:00', '17:00')
            ->environments(['local', 'staging']);
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
