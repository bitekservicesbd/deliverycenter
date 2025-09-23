<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AssetController extends Controller
{
    /**
     * Display a listing of assets.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Asset::query();

        // Filter by active status
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Filter by asset type
        if ($request->has('asset_type_id')) {
            $query->where('asset_type_id', $request->get('asset_type_id'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('asset_no', 'like', "%{$search}%")
                  ->orWhere('vehicle_make', 'like', "%{$search}%")
                  ->orWhere('vehicle_model', 'like', "%{$search}%")
                  ->orWhere('vehicle_license_plate', 'like', "%{$search}%")
                  ->orWhere('vin', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Include relationships if requested
        if ($request->has('with_relations')) {
            $query->with(['assetType']);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $assets = $query->paginate($perPage);

        return response()->json($assets);
    }

    /**
     * Store a newly created asset.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'asset_type_id' => 'required|integer|exists:asset_types,id',
            'asset_no' => 'required|string|max:100|unique:assets,asset_no',
            'vehicle_make' => 'nullable|string|max:100',
            'vehicle_model' => 'nullable|string|max:100',
            'vehicle_year' => 'nullable|string|max:4',
            'vin' => 'nullable|string|max:17|unique:assets,vin',
            'vehicle_license_plate' => 'nullable|string|max:20',
            'vehicle_plate_expiry' => 'nullable|date',
            'last_service_date' => 'nullable|date',
            'next_service_date' => 'nullable|date',
            'next_service_distance' => 'nullable|string|max:20',
            'is_active' => 'boolean'
        ]);

        $asset = Asset::create($validated);

        return response()->json([
            'message' => 'Asset created successfully',
            'data' => $asset->load('assetType')
        ], 201);
    }

    /**
     * Display the specified asset.
     */
    public function show(Asset $asset): JsonResponse
    {
        return response()->json($asset->load('assetType'));
    }

    /**
     * Update the specified asset.
     */
    public function update(Request $request, Asset $asset): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'asset_type_id' => 'sometimes|required|integer|exists:asset_types,id',
            'asset_no' => [
                'sometimes',
                'required',
                'string',
                'max:100',
                Rule::unique('assets', 'asset_no')->ignore($asset->id)
            ],
            'vehicle_make' => 'nullable|string|max:100',
            'vehicle_model' => 'nullable|string|max:100',
            'vehicle_year' => 'nullable|string|max:4',
            'vin' => [
                'nullable',
                'string',
                'max:17',
                Rule::unique('assets', 'vin')->ignore($asset->id)
            ],
            'vehicle_license_plate' => 'nullable|string|max:20',
            'vehicle_plate_expiry' => 'nullable|date',
            'last_service_date' => 'nullable|date',
            'next_service_date' => 'nullable|date',
            'next_service_distance' => 'nullable|string|max:20',
            'is_active' => 'boolean'
        ]);

        $asset->update($validated);

        return response()->json([
            'message' => 'Asset updated successfully',
            'data' => $asset->fresh(['assetType'])
        ]);
    }

    /**
     * Remove the specified asset.
     */
    public function destroy(Asset $asset): JsonResponse
    {
        // Soft delete by setting inactive
        $asset->update(['is_active' => false]);

        return response()->json([
            'message' => 'Asset deactivated successfully'
        ]);
    }

    /**
     * Restore the specified asset.
     */
    public function restore(Asset $asset): JsonResponse
    {
        $asset->update(['is_active' => true]);

        return response()->json([
            'message' => 'Asset activated successfully',
            'data' => $asset->fresh(['assetType'])
        ]);
    }

    /**
     * Get active assets for dropdown/select options.
     */
    public function options(Request $request): JsonResponse
    {
        $query = Asset::active()
            ->select('id', 'name', 'asset_no', 'asset_type_id');

        // Filter by asset type if provided
        if ($request->has('asset_type_id')) {
            $query->where('asset_type_id', $request->get('asset_type_id'));
        }

        $assets = $query->orderBy('name')->get();

        return response()->json($assets);
    }

    /**
     * Get assets requiring service.
     */
    public function serviceRequired(): JsonResponse
    {
        $assets = Asset::active()
            ->where(function ($query) {
                $query->where('next_service_date', '<=', now()->addDays(30))
                      ->orWhereNull('next_service_date');
            })
            ->with('assetType')
            ->orderBy('next_service_date')
            ->get();

        return response()->json($assets);
    }

    /**
     * Get assets with expired plates.
     */
    public function expiredPlates(): JsonResponse
    {
        $assets = Asset::active()
            ->where('vehicle_plate_expiry', '<=', now()->addDays(30))
            ->with('assetType')
            ->orderBy('vehicle_plate_expiry')
            ->get();

        return response()->json($assets);
    }
}