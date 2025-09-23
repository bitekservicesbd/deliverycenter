<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\AccessorialType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AccessorialTypeController extends Controller
{
    /**
     * Display a listing of accessorial types.
     */
    public function index(Request $request): JsonResponse
    {
        $query = AccessorialType::query();

        // Filter by active status
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Filter by fuel
        if ($request->has('fuel')) {
            $query->where('fuel', $request->boolean('fuel'));
        }

        // Filter by new_load
        if ($request->has('new_load')) {
            $query->where('new_load', $request->boolean('new_load'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('gl_code', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'description');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $accessorialTypes = $query->paginate($perPage);

        return response()->json($accessorialTypes);
    }

    /**
     * Store a newly created accessorial type.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:accessorial_types,code',
            'discount' => 'boolean',
            'fuel' => 'boolean',
            'new_load' => 'boolean',
            'gl_code' => 'nullable|string|max:100',
            'commission' => 'nullable|numeric|min:0|max:100',
            'is_active' => 'boolean'
        ]);

        $accessorialType = AccessorialType::create($validated);

        return response()->json([
            'message' => 'Accessorial type created successfully',
            'data' => $accessorialType
        ], 201);
    }

    /**
     * Display the specified accessorial type.
     */
    public function show(AccessorialType $accessorialType): JsonResponse
    {
        return response()->json($accessorialType);
    }

    /**
     * Update the specified accessorial type.
     */
    public function update(Request $request, AccessorialType $accessorialType): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'sometimes|required|string|max:255',
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('accessorial_types', 'code')->ignore($accessorialType->id)
            ],
            'discount' => 'boolean',
            'fuel' => 'boolean',
            'new_load' => 'boolean',
            'gl_code' => 'nullable|string|max:100',
            'commission' => 'nullable|numeric|min:0|max:100',
            'is_active' => 'boolean'
        ]);

        $accessorialType->update($validated);

        return response()->json([
            'message' => 'Accessorial type updated successfully',
            'data' => $accessorialType->fresh()
        ]);
    }

    /**
     * Remove the specified accessorial type.
     */
    public function destroy(AccessorialType $accessorialType): JsonResponse
    {
        // Soft delete by setting inactive instead of actual deletion
        $accessorialType->update(['is_active' => false]);

        return response()->json([
            'message' => 'Accessorial type deactivated successfully'
        ]);
    }

    /**
     * Restore the specified accessorial type.
     */
    public function restore(AccessorialType $accessorialType): JsonResponse
    {
        $accessorialType->update(['is_active' => true]);

        return response()->json([
            'message' => 'Accessorial type activated successfully',
            'data' => $accessorialType->fresh()
        ]);
    }

    /**
     * Get active accessorial types for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        $accessorialTypes = AccessorialType::where('is_active', true)
            ->select('id', 'description', 'code', 'commission', 'fuel', 'new_load')
            ->orderBy('description')
            ->get();

        return response()->json($accessorialTypes);
    }

    /**
     * Get fuel surcharge accessorial types.
     */
    public function fuel(): JsonResponse
    {
        $fuelTypes = AccessorialType::where('is_active', true)
            ->where('fuel', true)
            ->select('id', 'description', 'code', 'commission')
            ->orderBy('description')
            ->get();

        return response()->json($fuelTypes);
    }

    /**
     * Get new load accessorial types.
     */
    public function newLoad(): JsonResponse
    {
        $newLoadTypes = AccessorialType::where('is_active', true)
            ->where('new_load', true)
            ->select('id', 'description', 'code', 'commission')
            ->orderBy('description')
            ->get();

        return response()->json($newLoadTypes);
    }
}