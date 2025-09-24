<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AssetController extends Controller
{
    /**
     * Display a listing of assets.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Asset::query();

            // Apply filters only if provided
            if ($request->filled('active')) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->filled('asset_type')) {
                $query->where('asset_type', $request->get('asset_type'));
            }

            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('asset_number', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('vehicle_make', 'like', "%{$search}%")
                        ->orWhere('vehicle_model', 'like', "%{$search}%")
                        ->orWhere('vehicle_license_plate', 'like', "%{$search}%");
                });
            }

            // Apply sorting if provided
            if ($request->filled('sort_by')) {
                $sortBy = $request->get('sort_by', 'asset_number');
                $sortOrder = $request->get('sort_order', 'asc');
                $query->orderBy($sortBy, $sortOrder);
            } else {
                $query->orderBy('asset_number', 'asc');
            }

            // Get all data (no server-side pagination)
            $assets = $query->get();

            return successResponse(
                $this->formatAssetsResponse($assets),
                'Assets retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching assets: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve assets',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Store a newly created asset.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'asset_type' => 'required|string|max:100',
                'asset_number' => 'required|string|max:100|unique:assets,asset_number',
                'vehicle_make' => 'nullable|string|max:100',
                'vehicle_model' => 'nullable|string|max:100',
                'vehicle_year' => 'nullable|integer|min:1900|max:'.(date('Y') + 1),
                'vin' => 'nullable|string|max:17',
                'vehicle_license_plate' => 'nullable|string|max:50',
                'vehicle_plate_expiry' => 'nullable|date',
                'last_service_date' => 'nullable|date',
                'next_service_due' => 'nullable|date|after_or_equal:today',
                'next_service_distance' => 'nullable|integer|min:0',
                'is_active' => 'boolean',
            ], [
                'name.required' => 'Asset name is required',
                'asset_type.required' => 'Asset type is required',
                'asset_number.required' => 'Asset number is required',
                'asset_number.unique' => 'This asset number already exists',
                'vehicle_year.min' => 'Year must be at least 1900',
                'vehicle_year.max' => 'Year cannot be more than next year',
                'next_service_due.after_or_equal' => 'Next service due date must be today or later',
                'next_service_distance.min' => 'Next service distance must be at least 0',
            ]);

            $asset = Asset::create(array_merge($validated, [
                'is_active' => $validated['is_active'] ?? true,
            ]));

            return successResponse(
                $this->formatSingleAssetResponse($asset),
                'Asset created successfully',
                201
            );

        } catch (\Illuminate\Validation\ValidationException $e) {
            return errorResponse(
                'Validation failed',
                422,
                [
                    'error_code' => 'VALIDATION_ERROR',
                    'validation_errors' => $e->errors(),
                ]
            );
        } catch (\Exception $e) {
            Log::error('Error creating asset: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to create asset',
                500,
                ['error_code' => 'CREATE_ERROR']
            );
        }
    }

    /**
     * Display the specified asset.
     */
    public function show(Asset $asset): JsonResponse
    {
        try {
            return successResponse(
                $this->formatSingleAssetResponse($asset),
                'Asset retrieved successfully'
            );
        } catch (\Exception $e) {
            Log::error('Error fetching asset: '.$e->getMessage(), [
                'asset_id' => $asset->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve asset',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Update the specified asset.
     */
    public function update(Request $request, Asset $asset): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'asset_type' => 'sometimes|required|string|max:100',
                'asset_number' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('assets', 'asset_number')->ignore($asset->id),
                ],
                'vehicle_make' => 'nullable|string|max:100',
                'vehicle_model' => 'nullable|string|max:100',
                'vehicle_year' => 'nullable|integer|min:1900|max:'.(date('Y') + 1),
                'vin' => 'nullable|string|max:17',
                'vehicle_license_plate' => 'nullable|string|max:50',
                'vehicle_plate_expiry' => 'nullable|date',
                'last_service_date' => 'nullable|date',
                'next_service_due' => 'nullable|date|after_or_equal:today',
                'next_service_distance' => 'nullable|integer|min:0',
                'is_active' => 'boolean',
            ], [
                'name.required' => 'Asset name is required',
                'asset_type.required' => 'Asset type is required',
                'asset_number.required' => 'Asset number is required',
                'asset_number.unique' => 'This asset number already exists',
                'vehicle_year.min' => 'Year must be at least 1900',
                'vehicle_year.max' => 'Year cannot be more than next year',
                'next_service_due.after_or_equal' => 'Next service due date must be today or later',
                'next_service_distance.min' => 'Next service distance must be at least 0',
            ]);

            $asset->update($validated);

            return successResponse(
                $this->formatSingleAssetResponse($asset->fresh()),
                'Asset updated successfully'
            );

        } catch (\Illuminate\Validation\ValidationException $e) {
            return errorResponse(
                'Validation failed',
                422,
                [
                    'error_code' => 'VALIDATION_ERROR',
                    'validation_errors' => $e->errors(),
                ]
            );
        } catch (\Exception $e) {
            Log::error('Error updating asset: '.$e->getMessage(), [
                'asset_id' => $asset->id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to update asset',
                500,
                ['error_code' => 'UPDATE_ERROR']
            );
        }
    }

    /**
     * Remove the specified asset (soft delete).
     */
    public function destroy(Asset $asset): JsonResponse
    {
        try {
            // Soft delete by marking as inactive
            $asset->update(['is_active' => false]);

            return successResponse(
                [],
                'Asset deactivated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error deactivating asset: '.$e->getMessage(), [
                'asset_id' => $asset->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to deactivate asset',
                500,
                ['error_code' => 'DELETE_ERROR']
            );
        }
    }

    /**
     * Restore the specified asset.
     */
    public function restore(Asset $asset): JsonResponse
    {
        try {
            $asset->update(['is_active' => true]);

            return successResponse(
                $this->formatSingleAssetResponse($asset->fresh()),
                'Asset activated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error restoring asset: '.$e->getMessage(), [
                'asset_id' => $asset->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to activate asset',
                500,
                ['error_code' => 'RESTORE_ERROR']
            );
        }
    }

    /**
     * Get active assets for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        try {
            $assets = Asset::where('is_active', true)
                ->select('id', 'asset_number', 'name', 'asset_type')
                ->orderBy('asset_number')
                ->get();

            return successResponse(
                $assets->map(function ($asset) {
                    return [
                        'id' => $asset->id,
                        'label' => $asset->asset_number.' - '.$asset->name,
                        'value' => $asset->id,
                        'asset_number' => $asset->asset_number,
                        'name' => $asset->name,
                        'asset_type' => $asset->asset_type,
                    ];
                })->toArray(),
                'Asset options retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching asset options: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve asset options',
                500,
                ['error_code' => 'OPTIONS_ERROR']
            );
        }
    }

    /**
     * Get assets that require service soon.
     */
    public function serviceRequired(): JsonResponse
    {
        try {
            $serviceRequiredAssets = Asset::where('is_active', true)
                ->whereNotNull('next_service_due')
                ->where('next_service_due', '<=', now()->addDays(30))
                ->orderBy('next_service_due', 'asc')
                ->get();

            return successResponse(
                $serviceRequiredAssets->map(function ($asset) {
                    return [
                        'id' => $asset->id,
                        'asset_number' => $asset->asset_number,
                        'name' => $asset->name,
                        'asset_type' => $asset->asset_type,
                        'next_service_due' => $asset->next_service_due?->toDateString(),
                        'next_service_distance' => $asset->next_service_distance,
                        'days_until_service' => $asset->next_service_due ?
                            now()->diffInDays($asset->next_service_due, false) : null,
                        'overdue' => $asset->next_service_due < now(),
                    ];
                })->toArray(),
                'Assets requiring service retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching assets requiring service: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve assets requiring service',
                500,
                ['error_code' => 'SERVICE_ERROR']
            );
        }
    }

    /**
     * Get assets with expired license plates.
     */
    public function expiredPlates(): JsonResponse
    {
        try {
            $expiredPlates = Asset::where('is_active', true)
                ->whereNotNull('vehicle_plate_expiry')
                ->where('vehicle_plate_expiry', '<=', now()->addDays(30))
                ->orderBy('vehicle_plate_expiry', 'asc')
                ->get();

            return successResponse(
                $expiredPlates->map(function ($asset) {
                    return [
                        'id' => $asset->id,
                        'asset_number' => $asset->asset_number,
                        'name' => $asset->name,
                        'vehicle_license_plate' => $asset->vehicle_license_plate,
                        'vehicle_plate_expiry' => $asset->vehicle_plate_expiry?->toDateString(),
                        'days_until_expiry' => $asset->vehicle_plate_expiry ?
                            now()->diffInDays($asset->vehicle_plate_expiry, false) : null,
                        'expired' => $asset->vehicle_plate_expiry < now(),
                    ];
                })->toArray(),
                'Assets with expired/expiring plates retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching expired plates: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve expired plates',
                500,
                ['error_code' => 'EXPIRED_PLATES_ERROR']
            );
        }
    }

    /**
     * Format multiple assets response
     */
    private function formatAssetsResponse($assets): array
    {
        return $assets->map(function ($asset) {
            return $this->formatSingleAssetResponse($asset);
        })->toArray();
    }

    /**
     * Format single asset response
     */
    private function formatSingleAssetResponse($asset): array
    {
        return [
            'id' => $asset->id,
            'name' => $asset->name,
            'asset_type' => $asset->asset_type,
            'asset_number' => $asset->asset_number,
            'vehicle_make' => $asset->vehicle_make,
            'vehicle_model' => $asset->vehicle_model,
            'vehicle_year' => $asset->vehicle_year,
            'vin' => $asset->vin,
            'vehicle_license_plate' => $asset->vehicle_license_plate,
            'vehicle_plate_expiry' => $asset->vehicle_plate_expiry?->toDateString(),
            'last_service_date' => $asset->last_service_date?->toDateString(),
            'next_service_due' => $asset->next_service_due?->toDateString(),
            'next_service_distance' => $asset->next_service_distance,
            'is_active' => $asset->is_active,
            'created_at' => $asset->created_at?->toISOString(),
            'updated_at' => $asset->updated_at?->toISOString(),
        ];
    }
}
