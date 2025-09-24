<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\AttachmentCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AttachmentCategoryController extends Controller
{
    /**
     * Display a listing of attachment categories.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = AttachmentCategory::query();

            // Apply filters only if provided
            if ($request->filled('attach_to_load_alerts')) {
                $query->where('attach_to_load_alerts', $request->boolean('attach_to_load_alerts'));
            }

            if ($request->filled('attach_to_invoice')) {
                $query->where('attach_to_invoice', $request->boolean('attach_to_invoice'));
            }

            if ($request->filled('default_driver')) {
                $query->where('default_driver', $request->boolean('default_driver'));
            }

            if ($request->filled('hide_from_driver')) {
                $query->where('hide_from_driver', $request->boolean('hide_from_driver'));
            }

            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhere('notify_email', 'like', "%{$search}%");
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
            $categories = $query->get();

            return successResponse(
                $this->formatAttachmentCategoriesResponse($categories),
                'Attachment categories retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching attachment categories: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve attachment categories',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Store a newly created attachment category.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'required|string|max:255',
                'notify_email' => 'nullable|email|max:255',
                'retention_days' => 'nullable|integer|min:0|max:3650', // 0 to 10 years
                'attach_to_load_alerts' => 'boolean',
                'attach_to_invoice' => 'boolean',
                'default_driver' => 'boolean',
                'hide_from_driver' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'notify_email.email' => 'Please provide a valid email address',
                'retention_days.min' => 'Retention days must be at least 0',
                'retention_days.max' => 'Retention days cannot exceed 3650 days (10 years)',
            ]);

            $category = AttachmentCategory::create(array_merge($validated, [
                'attach_to_load_alerts' => $validated['attach_to_load_alerts'] ?? false,
                'attach_to_invoice' => $validated['attach_to_invoice'] ?? false,
                'default_driver' => $validated['default_driver'] ?? false,
                'hide_from_driver' => $validated['hide_from_driver'] ?? false,
                'updated_by' => Auth::id(),
            ]));

            return successResponse(
                $this->formatSingleAttachmentCategoryResponse($category),
                'Attachment category created successfully',
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
            Log::error('Error creating attachment category: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to create attachment category',
                500,
                ['error_code' => 'CREATE_ERROR']
            );
        }
    }

    /**
     * Display the specified attachment category.
     */
    public function show(AttachmentCategory $attachmentCategory): JsonResponse
    {
        try {
            return successResponse(
                $this->formatSingleAttachmentCategoryResponse($attachmentCategory),
                'Attachment category retrieved successfully'
            );
        } catch (\Exception $e) {
            Log::error('Error fetching attachment category: '.$e->getMessage(), [
                'attachment_category_id' => $attachmentCategory->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve attachment category',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Update the specified attachment category.
     */
    public function update(Request $request, AttachmentCategory $attachmentCategory): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'sometimes|required|string|max:255',
                'notify_email' => 'nullable|email|max:255',
                'retention_days' => 'nullable|integer|min:0|max:3650',
                'attach_to_load_alerts' => 'boolean',
                'attach_to_invoice' => 'boolean',
                'default_driver' => 'boolean',
                'hide_from_driver' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'notify_email.email' => 'Please provide a valid email address',
                'retention_days.min' => 'Retention days must be at least 0',
                'retention_days.max' => 'Retention days cannot exceed 3650 days (10 years)',
            ]);

            $attachmentCategory->update(array_merge($validated, [
                'updated_by' => Auth::id(),
            ]));

            return successResponse(
                $this->formatSingleAttachmentCategoryResponse($attachmentCategory->fresh()),
                'Attachment category updated successfully'
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
            Log::error('Error updating attachment category: '.$e->getMessage(), [
                'attachment_category_id' => $attachmentCategory->id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to update attachment category',
                500,
                ['error_code' => 'UPDATE_ERROR']
            );
        }
    }

    /**
     * Remove the specified attachment category.
     */
    public function destroy(AttachmentCategory $attachmentCategory): JsonResponse
    {
        try {
            // Check if category is being used (if attachments relationship exists)
            if (method_exists($attachmentCategory, 'attachments') && $attachmentCategory->attachments()->exists()) {
                return errorResponse(
                    'Cannot delete category that has attachments',
                    422,
                    [
                        'error_code' => 'CATEGORY_IN_USE',
                        'attachments_count' => $attachmentCategory->attachments()->count(),
                    ]
                );
            }

            $attachmentCategory->delete();

            return successResponse(
                [],
                'Attachment category deleted successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error deleting attachment category: '.$e->getMessage(), [
                'attachment_category_id' => $attachmentCategory->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to delete attachment category',
                500,
                ['error_code' => 'DELETE_ERROR']
            );
        }
    }

    /**
     * Restore the specified attachment category.
     */
    public function restore(AttachmentCategory $attachmentCategory): JsonResponse
    {
        try {
            // Since model doesn't have soft deletes, we'll treat this as reactivation
            $attachmentCategory->update([
                'updated_by' => Auth::id(),
            ]);

            return successResponse(
                $this->formatSingleAttachmentCategoryResponse($attachmentCategory->fresh()),
                'Attachment category restored successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error restoring attachment category: '.$e->getMessage(), [
                'attachment_category_id' => $attachmentCategory->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to restore attachment category',
                500,
                ['error_code' => 'RESTORE_ERROR']
            );
        }
    }

    /**
     * Get attachment categories for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        try {
            $categories = AttachmentCategory::select('id', 'description', 'default_driver', 'hide_from_driver')
                ->orderBy('description')
                ->get();

            return successResponse(
                $categories->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'label' => $category->description,
                        'value' => $category->id,
                        'default_driver' => $category->default_driver,
                        'hide_from_driver' => $category->hide_from_driver,
                    ];
                })->toArray(),
                'Attachment category options retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching attachment category options: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve attachment category options',
                500,
                ['error_code' => 'OPTIONS_ERROR']
            );
        }
    }

    /**
     * Get attachment categories that are required for drivers.
     */
    public function required(): JsonResponse
    {
        try {
            $requiredCategories = AttachmentCategory::where('default_driver', true)
                ->where('hide_from_driver', false)
                ->select('id', 'description', 'notify_email', 'retention_days')
                ->orderBy('description')
                ->get();

            return successResponse(
                $requiredCategories->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'description' => $category->description,
                        'notify_email' => $category->notify_email,
                        'retention_days' => $category->retention_days,
                    ];
                })->toArray(),
                'Required attachment categories retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching required attachment categories: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve required attachment categories',
                500,
                ['error_code' => 'REQUIRED_ERROR']
            );
        }
    }

    /**
     * Format multiple attachment categories response
     */
    private function formatAttachmentCategoriesResponse($categories): array
    {
        return $categories->map(function ($category) {
            return $this->formatSingleAttachmentCategoryResponse($category);
        })->toArray();
    }

    /**
     * Format single attachment category response
     */
    private function formatSingleAttachmentCategoryResponse($category): array
    {
        return [
            'id' => $category->id,
            'description' => $category->description,
            'notify_email' => $category->notify_email,
            'retention_days' => $category->retention_days,
            'attach_to_load_alerts' => $category->attach_to_load_alerts,
            'attach_to_invoice' => $category->attach_to_invoice,
            'default_driver' => $category->default_driver,
            'hide_from_driver' => $category->hide_from_driver,
            'updated_by' => $category->updated_by,
            'attachments_count' => method_exists($category, 'attachments') ? $category->attachments()->count() : 0,
            'created_at' => $category->created_at?->toISOString(),
            'updated_at' => $category->updated_at?->toISOString(),
        ];
    }
}
