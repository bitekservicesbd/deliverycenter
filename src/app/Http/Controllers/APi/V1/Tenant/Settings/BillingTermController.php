<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\BillingTerm;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class BillingTermController extends Controller
{
    /**
     * Display a listing of billing terms.
     */
    public function index(Request $request): JsonResponse
    {
        $query = BillingTerm::query();

        // Filter by active status
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'description');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $billingTerms = $query->paginate($perPage);

        return response()->json($billingTerms);
    }

    /**
     * Store a newly created billing term.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:billing_terms,code',
            'days' => 'required|integer|min:0|max:365',
            'is_active' => 'boolean'
        ]);

        $billingTerm = BillingTerm::create($validated);

        return response()->json([
            'message' => 'Billing term created successfully',
            'data' => $billingTerm
        ], 201);
    }

    /**
     * Display the specified billing term.
     */
    public function show(BillingTerm $billingTerm): JsonResponse
    {
        return response()->json($billingTerm);
    }

    /**
     * Update the specified billing term.
     */
    public function update(Request $request, BillingTerm $billingTerm): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'sometimes|required|string|max:255',
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('billing_terms', 'code')->ignore($billingTerm->id)
            ],
            'days' => 'sometimes|required|integer|min:0|max:365',
            'is_active' => 'boolean'
        ]);

        $billingTerm->update($validated);

        return response()->json([
            'message' => 'Billing term updated successfully',
            'data' => $billingTerm->fresh()
        ]);
    }

    /**
     * Remove the specified billing term.
     */
    public function destroy(BillingTerm $billingTerm): JsonResponse
    {
        // Soft delete by setting inactive
        $billingTerm->update(['is_active' => false]);

        return response()->json([
            'message' => 'Billing term deactivated successfully'
        ]);
    }

    /**
     * Restore the specified billing term.
     */
    public function restore(BillingTerm $billingTerm): JsonResponse
    {
        $billingTerm->update(['is_active' => true]);

        return response()->json([
            'message' => 'Billing term activated successfully',
            'data' => $billingTerm->fresh()
        ]);
    }

    /**
     * Get active billing terms for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        $billingTerms = BillingTerm::active()
            ->select('id', 'description', 'code', 'days')
            ->orderBy('days')
            ->get();

        return response()->json($billingTerms);
    }
}