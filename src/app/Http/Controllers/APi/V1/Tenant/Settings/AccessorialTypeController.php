<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\AccessorialType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AccessorialTypeController extends Controller
{
    /**
     * Display a listing of accessorial types.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = AccessorialType::query();

            // Apply filters only if provided
            if ($request->filled('active')) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->filled('fuel')) {
                $query->where('fuel', $request->boolean('fuel'));
            }

            if ($request->filled('new_load')) {
                $query->where('new_load', $request->boolean('new_load'));
            }

            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('gl_code', 'like', "%{$search}%");
                });
            }

            // Apply sorting if provided
            if ($request->filled('sort_by')) {
                $sortBy = $request->get('sort_by', 'description');
                $sortOrder = $request->get('sort_order', 'asc');
                $query->orderBy($sortBy, $sortOrder);
            } else {
                $query->orderBy('description', 'asc');
            }

            // Get all data (no server-side pagination)
            $accessorialTypes = $query->get();

            return successResponse(
                $this->formatAccessorialTypesResponse($accessorialTypes),
                'Accessorial types retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching accessorial types: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve accessorial types',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Store a newly created accessorial type.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'required|string|max:255',
                'code' => 'required|string|max:50|unique:accessorial_types,code',
                'discount' => 'boolean',
                'fuel' => 'boolean',
                'new_load' => 'boolean',
                'gl_code' => 'nullable|string|max:100',
                'commission' => 'nullable|numeric|min:0|max:100',
                'is_active' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'code.required' => 'Code is required',
                'code.unique' => 'This code already exists',
                'commission.min' => 'Commission must be at least 0%',
                'commission.max' => 'Commission cannot exceed 100%',
            ]);

            $accessorialType = AccessorialType::create(array_merge($validated, [
                'is_active' => $validated['is_active'] ?? true,
                'discount' => $validated['discount'] ?? false,
                'fuel' => $validated['fuel'] ?? false,
                'new_load' => $validated['new_load'] ?? false,
            ]));

            return successResponse(
                $this->formatSingleAccessorialTypeResponse($accessorialType),
                'Accessorial type created successfully',
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
            Log::error('Error creating accessorial type: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to create accessorial type',
                500,
                ['error_code' => 'CREATE_ERROR']
            );
        }
    }

    /**
     * Display the specified accessorial type.
     */
    public function show(AccessorialType $accessorialType): JsonResponse
    {
        try {
            return successResponse(
                $this->formatSingleAccessorialTypeResponse($accessorialType),
                'Accessorial type retrieved successfully'
            );
        } catch (\Exception $e) {
            Log::error('Error fetching accessorial type: '.$e->getMessage(), [
                'accessorial_type_id' => $accessorialType->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve accessorial type',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Update the specified accessorial type.
     */
    public function update(Request $request, AccessorialType $accessorialType): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'sometimes|required|string|max:255',
                'code' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:50',
                    Rule::unique('accessorial_types', 'code')->ignore($accessorialType->id),
                ],
                'discount' => 'boolean',
                'fuel' => 'boolean',
                'new_load' => 'boolean',
                'gl_code' => 'nullable|string|max:100',
                'commission' => 'nullable|numeric|min:0|max:100',
                'is_active' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'code.required' => 'Code is required',
                'code.unique' => 'This code already exists',
                'commission.min' => 'Commission must be at least 0%',
                'commission.max' => 'Commission cannot exceed 100%',
            ]);

            $accessorialType->update($validated);

            return successResponse(
                $this->formatSingleAccessorialTypeResponse($accessorialType->fresh()),
                'Accessorial type updated successfully'
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
            Log::error('Error updating accessorial type: '.$e->getMessage(), [
                'accessorial_type_id' => $accessorialType->id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to update accessorial type',
                500,
                ['error_code' => 'UPDATE_ERROR']
            );
        }
    }

    /**
     * Remove the specified accessorial type (soft delete).
     */
    public function destroy(AccessorialType $accessorialType): JsonResponse
    {
        try {
            // Soft delete by marking as inactive
            $accessorialType->update(['is_active' => false]);

            return successResponse(
                [],
                'Accessorial type deactivated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error deactivating accessorial type: '.$e->getMessage(), [
                'accessorial_type_id' => $accessorialType->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to deactivate accessorial type',
                500,
                ['error_code' => 'DELETE_ERROR']
            );
        }
    }

    /**
     * Restore the specified accessorial type.
     */
    public function restore(AccessorialType $accessorialType): JsonResponse
    {
        try {
            $accessorialType->update(['is_active' => true]);

            return successResponse(
                $this->formatSingleAccessorialTypeResponse($accessorialType->fresh()),
                'Accessorial type activated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error restoring accessorial type: '.$e->getMessage(), [
                'accessorial_type_id' => $accessorialType->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to activate accessorial type',
                500,
                ['error_code' => 'RESTORE_ERROR']
            );
        }
    }

    /**
     * Get active accessorial types for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        try {
            $accessorialTypes = AccessorialType::where('is_active', true)
                ->select('id', 'description', 'code', 'commission', 'fuel', 'new_load')
                ->orderBy('description')
                ->get();

            return successResponse(
                $accessorialTypes->map(function ($type) {
                    return [
                        'id' => $type->id,
                        'label' => $type->description,
                        'value' => $type->id,
                        'code' => $type->code,
                        'commission' => $type->commission,
                        'fuel' => $type->fuel,
                        'new_load' => $type->new_load,
                    ];
                })->toArray(),
                'Accessorial type options retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching accessorial type options: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve accessorial type options',
                500,
                ['error_code' => 'OPTIONS_ERROR']
            );
        }
    }

    /**
     * Get fuel surcharge accessorial types.
     */
    public function fuel(): JsonResponse
    {
        try {
            $fuelTypes = AccessorialType::where('is_active', true)
                ->where('fuel', true)
                ->select('id', 'description', 'code', 'commission')
                ->orderBy('description')
                ->get();

            return successResponse(
                $fuelTypes->map(function ($type) {
                    return [
                        'id' => $type->id,
                        'description' => $type->description,
                        'code' => $type->code,
                        'commission' => $type->commission,
                    ];
                })->toArray(),
                'Fuel accessorial types retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching fuel accessorial types: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve fuel accessorial types',
                500,
                ['error_code' => 'FUEL_ERROR']
            );
        }
    }

    /**
     * Get new load accessorial types.
     */
    public function newLoad(): JsonResponse
    {
        try {
            $newLoadTypes = AccessorialType::where('is_active', true)
                ->where('new_load', true)
                ->select('id', 'description', 'code', 'commission')
                ->orderBy('description')
                ->get();

            return successResponse(
                $newLoadTypes->map(function ($type) {
                    return [
                        'id' => $type->id,
                        'description' => $type->description,
                        'code' => $type->code,
                        'commission' => $type->commission,
                    ];
                })->toArray(),
                'New load accessorial types retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching new load accessorial types: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve new load accessorial types',
                500,
                ['error_code' => 'NEW_LOAD_ERROR']
            );
        }
    }

    /**
     * Format multiple accessorial types response
     */
    private function formatAccessorialTypesResponse($accessorialTypes): array
    {
        return $accessorialTypes->map(function ($type) {
            return $this->formatSingleAccessorialTypeResponse($type);
        })->toArray();
    }

    /**
     * Format single accessorial type response
     */
    private function formatSingleAccessorialTypeResponse($accessorialType): array
    {
        return [
            'id' => $accessorialType->id,
            'description' => $accessorialType->description,
            'code' => $accessorialType->code,
            'gl_code' => $accessorialType->gl_code,
            'commission' => $accessorialType->commission,
            'discount' => $accessorialType->discount,
            'fuel' => $accessorialType->fuel,
            'new_load' => $accessorialType->new_load,
            'is_active' => $accessorialType->is_active,
            'created_at' => $accessorialType->created_at?->toISOString(),
            'updated_at' => $accessorialType->updated_at?->toISOString(),
        ];
    }
}
