<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\AttachmentCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AttachmentCategoryController extends Controller
{
    /**
     * Display a listing of attachment categories.
     */
    public function index(Request $request): JsonResponse
    {
        $query = AttachmentCategory::query();

        // Filter by active status
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Filter by required status
        if ($request->has('required')) {
            $query->where('is_required', $request->boolean('required'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $categories = $query->paginate($perPage);

        return response()->json($categories);
    }

    /**
     * Store a newly created attachment category.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:attachment_categories,code',
            'description' => 'nullable|string',
            'allowed_file_types' => 'required|string',
            'max_file_size' => 'required|integer|min:100|max:51200', // 100KB to 50MB
            'is_required' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $category = AttachmentCategory::create($validated);

        return response()->json([
            'message' => 'Attachment category created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified attachment category.
     */
    public function show(AttachmentCategory $attachmentCategory): JsonResponse
    {
        return response()->json($attachmentCategory);
    }

    /**
     * Update the specified attachment category.
     */
    public function update(Request $request, AttachmentCategory $attachmentCategory): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('attachment_categories', 'code')->ignore($attachmentCategory->id)
            ],
            'description' => 'nullable|string',
            'allowed_file_types' => 'sometimes|required|string',
            'max_file_size' => 'sometimes|required|integer|min:100|max:51200',
            'is_required' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $attachmentCategory->update($validated);

        return response()->json([
            'message' => 'Attachment category updated successfully',
            'data' => $attachmentCategory->fresh()
        ]);
    }

    /**
     * Remove the specified attachment category.
     */
    public function destroy(AttachmentCategory $attachmentCategory): JsonResponse
    {
        // Soft delete by setting inactive
        $attachmentCategory->update(['is_active' => false]);

        return response()->json([
            'message' => 'Attachment category deactivated successfully'
        ]);
    }

    /**
     * Restore the specified attachment category.
     */
    public function restore(AttachmentCategory $attachmentCategory): JsonResponse
    {
        $attachmentCategory->update(['is_active' => true]);

        return response()->json([
            'message' => 'Attachment category activated successfully',
            'data' => $attachmentCategory->fresh()
        ]);
    }

    /**
     * Get active categories for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        $categories = AttachmentCategory::active()
            ->select('id', 'name', 'code', 'allowed_file_types', 'max_file_size', 'is_required')
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    /**
     * Get required categories.
     */
    public function required(): JsonResponse
    {
        $categories = AttachmentCategory::active()
            ->where('is_required', true)
            ->select('id', 'name', 'code', 'allowed_file_types', 'max_file_size')
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }
}