<?php

namespace App\Http\Controllers\Api\V1\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Http\Requests\Api\V1\Tenant\{
    LoginRequest,
    UpdateProfileRequest,
    ChangePasswordRequest
};
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /**
     * Handle tenant user login
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->errorResponse('Invalid credentials', 401);
        }

        if ($user->status != 'active') {
            return $this->errorResponse('Account is inactive', 403);
        }

        // Create token with proper abilities
        $abilities = $this->getUserAbilities($user);
        $token = $user->createToken('tenant-token', $abilities)->plainTextToken;

        $cookie = cookie('tenant_token', $token, 60 * 24 * 7); // 7 days

        // Update last login
        $user->update(['last_login_at' => now()]);

        return $this->successResponse([
            'user' => $this->formatUserData($user),
            'tenant' => tenant('id'),
            'abilities' => $abilities
        ], 'Login successful')->withCookie($cookie);
    }

    /**
     * Verify token validity
     */
    public function verifyToken(Request $request)
    {
        $user = $request->user();
        
        if (!$user || !$user->is_active) {
            return $this->errorResponse('Invalid or inactive user', 401);
        }

        return $this->successResponse([
            'user' => $this->formatUserData($user),
            'tenant' => tenant('id'),
            'abilities' => $this->getUserAbilities($user)
        ], 'Token is valid');
    }

    /**
     * Get user profile
     */
    public function profile(Request $request)
    {
        return $this->successResponse([
            'user' => $this->formatUserData($request->user())
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return $this->successResponse([
            'user' => $this->formatUserData($user)
        ], 'Profile updated successfully');
    }

    /**
     * Change password
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $request->user();
        
        if (!Hash::check($request->current_password, $user->password)) {
            return $this->errorResponse('Current password is incorrect', 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        // Revoke all tokens except current
        $user->tokens()->where('id', '!=', $user->currentAccessToken()->id)->delete();

        return $this->successResponse([], 'Password changed successfully');
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $cookie = Cookie::forget('tenant_token');
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse([], 'Logged out successfully')->withCookie($cookie);
    }

    /**
     * Get user abilities based on role and permissions
     */
    private function getUserAbilities(User $user): array
    {
        $abilities = [];
        
        // Add role-based abilities
        switch ($user->user_type) {
            case 'admin':
                $abilities = ['*']; // All permissions
                break;
            case 'dispatcher':
                $abilities = ['dispatch.*', 'orders.*', 'customers.read'];
                break;
            case 'sales':
                $abilities = ['customers.*', 'quotes.*', 'reports.read'];
                break;
            case 'driver':
                $abilities = ['orders.read', 'deliveries.*'];
                break;
            default:
                $abilities = ['profile.read'];
        }
        
        // Add custom permissions
        if ($user->permissions) {
            $abilities = array_merge($abilities, $user->permissions);
        }
        
        return array_unique($abilities);
    }

    /**
     * Format user data for response
     */
    private function formatUserData(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'user_type' => $user->user_type,
            'employee_number' => $user->employee_number,
            'hire_date' => $user->hire_date,
            'avatar' => $user->avatar,
            'last_login_at' => $user->last_login_at,
            'is_active' => $user->is_active,
            'permissions' => $user->permissions,
        ];
    }

    /**
     * Success response helper
     */
    private function successResponse($data = [], string $message = 'Success', int $status = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Error response helper
     */
    private function errorResponse(string $message, int $status = 400, $errors = null)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $status);
    }
}