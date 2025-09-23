<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DispatchBoard;

class DispatchBoardSeeder extends Seeder
{
    public function run(): void
    {
        $dispatchBoards = [
            [
                'name' => 'Express Deliveries',
                'description' => 'High priority express and rush orders',
                'board_type' => 'priority',
                'auto_refresh_interval' => 30,
                'display_columns' => json_encode([
                    'order_number', 'customer', 'pickup_time', 'delivery_time', 
                    'status', 'driver', 'priority'
                ]),
                'filter_criteria' => json_encode([
                    'service_class' => ['express', 'rush'],
                    'status' => ['pending', 'assigned', 'in_transit']
                ]),
                'sort_order' => json_encode([
                    'field' => 'pickup_time',
                    'direction' => 'asc'
                ])
            ],
            [
                'name' => 'Same Day Operations',
                'description' => 'Same day delivery coordination board',
                'board_type' => 'operational',
                'auto_refresh_interval' => 60,
                'display_columns' => json_encode([
                    'order_number', 'pickup_address', 'delivery_address',
                    'driver', 'vehicle', 'estimated_delivery'
                ]),
                'filter_criteria' => json_encode([
                    'delivery_type' => 'same_day',
                    'date_range' => 'today'
                ]),
                'sort_order' => json_encode([
                    'field' => 'estimated_delivery',
                    'direction' => 'asc'
                ])
            ],
            [
                'name' => 'Route Planning',
                'description' => 'Route optimization and planning board',
                'board_type' => 'planning',
                'auto_refresh_interval' => 120,
                'display_columns' => json_encode([
                    'route_id', 'driver', 'stops_count', 'total_distance',
                    'estimated_duration', 'status'
                ]),
                'filter_criteria' => json_encode([
                    'status' => ['planned', 'optimized', 'assigned'],
                    'date_range' => 'next_24_hours'
                ]),
                'sort_order' => json_encode([
                    'field' => 'estimated_duration',
                    'direction' => 'desc'
                ])
            ],
            [
                'name' => 'Customer Service',
                'description' => 'Customer service and exception handling',
                'board_type' => 'service',
                'auto_refresh_interval' => 45,
                'display_columns' => json_encode([
                    'order_number', 'customer', 'issue_type', 'priority',
                    'assigned_to', 'last_update'
                ]),
                'filter_criteria' => json_encode([
                    'has_issues' => true,
                    'status' => ['exception', 'delayed', 'failed_delivery']
                ]),
                'sort_order' => json_encode([
                    'field' => 'priority',
                    'direction' => 'desc'
                ])
            ]
        ];

        foreach ($dispatchBoards as $board) {
            DispatchBoard::create($board);
        }
    }
}