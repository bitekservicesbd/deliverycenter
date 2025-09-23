<?php

// database/seeders/WorkingHolidaySeeder.php

namespace Database\Seeders;

use App\Models\WorkingHoliday;
use Illuminate\Database\Seeder;

class WorkingHolidaySeeder extends Seeder
{
    public function run(): void
    {
        $holidays = [
            [
                'name' => 'New Year\'s Day',
                'holiday_date' => '2025-01-01',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'New Year\'s Day statutory holiday - no deliveries',
                'is_active' => true,
            ],
            [
                'name' => 'Good Friday',
                'holiday_date' => '2025-04-18',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Good Friday statutory holiday - office closed',
                'is_active' => true,
            ],
            [
                'name' => 'Victoria Day',
                'holiday_date' => '2025-05-19',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Victoria Day statutory holiday (except Quebec)',
                'is_active' => true,
            ],
            [
                'name' => 'Canada Day',
                'holiday_date' => '2025-07-01',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Canada Day statutory holiday - all operations closed',
                'is_active' => true,
            ],
            [
                'name' => 'Labour Day',
                'holiday_date' => '2025-09-01',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Labour Day statutory holiday - no operations',
                'is_active' => true,
            ],
            [
                'name' => 'Thanksgiving',
                'holiday_date' => '2025-10-13',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Canadian Thanksgiving - limited operations in some provinces',
                'is_active' => true,
            ],
            [
                'name' => 'Christmas Day',
                'holiday_date' => '2025-12-25',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Christmas Day statutory holiday - all operations closed',
                'is_active' => true,
            ],
            [
                'name' => 'Boxing Day',
                'holiday_date' => '2025-12-26',
                'recurrence' => 'yearly',
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'is_working_day' => true,
                'notes' => 'Boxing Day - limited operations with reduced hours',
                'is_active' => true,
            ],
            [
                'name' => 'Family Day (Ontario)',
                'holiday_date' => '2025-02-17',
                'recurrence' => 'yearly',
                'start_time' => null,
                'end_time' => null,
                'is_working_day' => false,
                'notes' => 'Family Day provincial holiday - Ontario, Alberta, BC, Saskatchewan, New Brunswick',
                'is_active' => true,
            ],
            [
                'name' => 'Company Maintenance Day',
                'holiday_date' => '2025-12-31',
                'recurrence' => 'yearly',
                'start_time' => '09:00:00',
                'end_time' => '15:00:00',
                'is_working_day' => true,
                'notes' => 'Year-end maintenance and inventory - limited staff on duty',
                'is_active' => true,
            ],
        ];

        foreach ($holidays as $holiday) {
            WorkingHoliday::create($holiday);
        }
    }
}
