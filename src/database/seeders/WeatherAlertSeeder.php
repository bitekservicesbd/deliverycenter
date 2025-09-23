<?php

namespace Database\Seeders;

use App\Models\Weather;
use Illuminate\Database\Seeder;
use App\Models\WeatherAlert;
use Carbon\Carbon;

class WeatherAlertSeeder extends Seeder
{
    public function run(): void
    {
        $weatherAlerts = [
            [
                'alert_type' => 'winter_storm',
                'severity' => 'high',
                'affected_regions' => json_encode(['Southern Ontario', 'GTA', 'Hamilton']),
                'description' => 'Major winter storm expected with 25-35cm snowfall',
                'start_time' => Carbon::now()->addHours(6),
                'end_time' => Carbon::now()->addHours(30),
                'impact_assessment' => json_encode([
                    'delivery_delays' => 'severe',
                    'route_disruptions' => 'major',
                    'vehicle_restrictions' => ['no_motorcycles', 'chains_required'],
                    'recommended_actions' => [
                        'reschedule_non_urgent_deliveries',
                        'increase_delivery_windows',
                        'monitor_driver_safety'
                    ]
                ]),
                'auto_notifications_sent' => false
            ],
            [
                'alert_type' => 'fog',
                'severity' => 'medium',
                'affected_regions' => json_encode(['Highway 401 Corridor', 'Windsor to London']),
                'description' => 'Dense fog reducing visibility to less than 100 meters',
                'start_time' => Carbon::now()->subHours(2),
                'end_time' => Carbon::now()->addHours(4),
                'impact_assessment' => json_encode([
                    'delivery_delays' => 'moderate',
                    'route_disruptions' => 'minor',
                    'vehicle_restrictions' => ['reduced_speed_required'],
                    'recommended_actions' => [
                        'use_alternate_routes',
                        'extend_delivery_windows',
                        'increase_following_distance'
                    ]
                ]),
                'auto_notifications_sent' => true
            ],
            [
                'alert_type' => 'heat_wave',
                'severity' => 'medium',
                'affected_regions' => json_encode(['All of Ontario', 'Southern Quebec']),
                'description' => 'Extreme heat warning - temperatures above 35°C for 3+ days',
                'start_time' => Carbon::now()->addDays(1),
                'end_time' => Carbon::now()->addDays(4),
                'impact_assessment' => json_encode([
                    'delivery_delays' => 'minimal',
                    'route_disruptions' => 'none',
                    'vehicle_restrictions' => ['avoid_afternoon_peak'],
                    'recommended_actions' => [
                        'schedule_early_morning_deliveries',
                        'monitor_temperature_sensitive_goods',
                        'ensure_driver_hydration',
                        'check_refrigeration_units'
                    ]
                ]),
                'auto_notifications_sent' => false
            ]
        ];

        foreach ($weatherAlerts as $alert) {
            Weather::create($alert);
        }
    }
}