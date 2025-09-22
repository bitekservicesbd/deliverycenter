<?php

namespace App\Http\Controllers\Api\V1\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Tenant\ChangePasswordRequest;
use App\Http\Requests\Api\V1\Tenant\UpdateProfileRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle tenant user login
     */
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return errorResponse('Invalid credentials', 401);
        }

        if ($user->status != 'active') {
            return errorResponse('Account is inactive', 403);
        }

        // Create token with proper abilities
        $abilities = $this->getUserAbilities($user);
        $token = $user->createToken('tenant-token', $abilities)->plainTextToken;

        // $cookie = cookie('auth_token', $token, (60 * 24) * 7); // 7 days

        // * check if app is in local or not. if in not local that means apps is in production and then set secure to true
        $secure = Config::get('app.env') !== 'local' ? true : false;

        $cookie = cookie(
            'auth_token',
            $token,
            (60 * 24) * 7, // 7 days
            '/',         // path
            null,        // domain (null = current domain)
            $secure,        // secure (HTTPS only)
            $secure,        // httpOnly
            false,       // raw
            'None'     // sameSite
        );

        // Update last login
        $user->update(['last_login_at' => now()]);

        return successResponse([
            'user' => $user->toResource(),
            'tenant' => tenant('id'),
            'abilities' => $abilities,
        ], 'Login successful')->withCookie($cookie);
    }

    /**
     * Verify token validity
     */
    public function verifyToken(Request $request)
    {
        $user = $request->user();

        if (! $user || ! $user->is_active) {
            return errorResponse('Invalid or inactive user', 401);
        }

        return successResponse([
            'user' => $this->formatUserData($user),
            'tenant' => tenant('id'),
            'abilities' => $this->getUserAbilities($user),
        ], 'Token is valid');
    }

    /**
     * Get user profile
     */
    public function profile(Request $request)
    {
        return successResponse([
            'user' => $request->user()->toResource(),
        ], 'Profile');
    }

    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return successResponse([
            'user' => $this->formatUserData($user),
        ], 'Profile updated successfully');
    }

    /**
     * Change password
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $validated = $request->validated();
        $user = $request->user();

        if (! Hash::check($validated['current_password'], $user->password)) {
            return errorResponse('Current password is incorrect', 422);
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        // Revoke all tokens except current
        $user->tokens()->where('id', '!=', $user->currentAccessToken()->id)->delete();

        return successResponse([], 'Password changed successfully');
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {

        $cookie = Cookie::forget('auth_token');
        $request->user()->currentAccessToken()->delete();

        return successResponse([], 'Logged out successfully')->withCookie($cookie);
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
}
