<?php

namespace App\Http\Controllers\Api\V1\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    /**
     * Test API connection
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Tenant API v1 is working perfectly! 🚀',
            'data' => [
                'tenant_id' => tenant('id'),
                'tenant_db' => tenant('tenancy_db_name'),
                'user_id' => $user->id,
                'user_name' => $user->name,
                'user_type' => $user->user_type,
                'api_version' => 'v1',
                'timestamp' => now()->toISOString(),
                'environment' => app()->environment(),
                'laravel_version' => app()->version(),
            ],
        ]);
    }

    /**
     * Test database connection
     */
    public function testDatabase(Request $request)
    {
        try {
            $tables = DB::select('SHOW TABLES');
            $userCount = DB::table('users')->count();

            return response()->json([
                'success' => true,
                'message' => 'Database connection successful',
                'data' => [
                    'tenant_id' => tenant('id'),
                    'database_name' => config('database.connections.tenant.database'),
                    'total_tables' => count($tables),
                    'user_count' => $userCount,
                    'connection_status' => 'active',
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Test user permissions
     */
    public function testPermissions(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Permission check completed',
            'data' => [
                'user_type' => $user->user_type,
                'permissions' => $user->permissions ?? [],
                'is_admin' => $user->user_type === 'admin',
                'can_access_settings' => in_array('settings.*', $user->permissions ?? []) || $user->user_type === 'admin',
                'token_abilities' => $user->currentAccessToken()?->abilities ?? [],
            ],
        ]);
    }
}
