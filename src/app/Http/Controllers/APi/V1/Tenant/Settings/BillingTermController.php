<?php

namespace App\Http\Controllers\Api\V1\Tenant\Settings;

use App\Http\Controllers\Controller;
use App\Models\BillingTerm;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class BillingTermController extends Controller
{
    /**
     * Display a listing of billing terms.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = BillingTerm::query();

            // Apply filters only if provided
            if ($request->filled('active')) {
                $query->where('is_active', $request->boolean('active'));
            }

            if ($request->filled('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
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
            $billingTerms = $query->get();

            return successResponse(
                $this->formatBillingTermsResponse($billingTerms),
                'Billing terms retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching billing terms: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve billing terms',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Store a newly created billing term.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'required|string|max:255',
                'code' => 'required|string|max:50|unique:billing_terms,code',
                'days' => 'required|integer|min:0|max:365',
                'discount_percent' => 'nullable|numeric|min:0|max:100',
                'discount_days' => 'nullable|integer|min:0|max:365',
                'is_default' => 'boolean',
                'is_active' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'code.required' => 'Code is required',
                'code.unique' => 'This code already exists',
                'days.required' => 'Payment days is required',
                'days.min' => 'Days must be at least 0',
                'days.max' => 'Days cannot exceed 365',
                'discount_percent.min' => 'Discount must be at least 0%',
                'discount_percent.max' => 'Discount cannot exceed 100%',
                'discount_days.min' => 'Discount days must be at least 0',
                'discount_days.max' => 'Discount days cannot exceed 365',
            ]);

            DB::beginTransaction();
            try {
                // If this is set as default, unset other defaults
                if ($validated['is_default'] ?? false) {
                    BillingTerm::where('is_default', true)->update(['is_default' => false]);
                }

                $billingTerm = BillingTerm::create(array_merge($validated, [
                    'is_active' => $validated['is_active'] ?? true,
                    'is_default' => $validated['is_default'] ?? false,
                ]));

                DB::commit();

                return successResponse(
                    $this->formatSingleBillingTermResponse($billingTerm),
                    'Billing term created successfully',
                    201
                );

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

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
            Log::error('Error creating billing term: '.$e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to create billing term',
                500,
                ['error_code' => 'CREATE_ERROR']
            );
        }
    }

    /**
     * Display the specified billing term.
     */
    public function show(BillingTerm $billingTerm): JsonResponse
    {
        try {
            return successResponse(
                $this->formatSingleBillingTermResponse($billingTerm),
                'Billing term retrieved successfully'
            );
        } catch (\Exception $e) {
            Log::error('Error fetching billing term: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve billing term',
                500,
                ['error_code' => 'FETCH_ERROR']
            );
        }
    }

    /**
     * Update the specified billing term.
     */
    public function update(Request $request, BillingTerm $billingTerm): JsonResponse
    {
        try {
            $validated = $request->validate([
                'description' => 'sometimes|required|string|max:255',
                'code' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:50',
                    Rule::unique('billing_terms', 'code')->ignore($billingTerm->id),
                ],
                'days' => 'sometimes|required|integer|min:0|max:365',
                'discount_percent' => 'nullable|numeric|min:0|max:100',
                'discount_days' => 'nullable|integer|min:0|max:365',
                'is_default' => 'boolean',
                'is_active' => 'boolean',
            ], [
                'description.required' => 'Description is required',
                'code.required' => 'Code is required',
                'code.unique' => 'This code already exists',
                'days.required' => 'Payment days is required',
                'days.min' => 'Days must be at least 0',
                'days.max' => 'Days cannot exceed 365',
                'discount_percent.min' => 'Discount must be at least 0%',
                'discount_percent.max' => 'Discount cannot exceed 100%',
                'discount_days.min' => 'Discount days must be at least 0',
                'discount_days.max' => 'Discount days cannot exceed 365',
            ]);

            DB::beginTransaction();
            try {
                // If this is set as default, unset other defaults
                if (isset($validated['is_default']) && $validated['is_default']) {
                    BillingTerm::where('is_default', true)
                        ->where('id', '!=', $billingTerm->id)
                        ->update(['is_default' => false]);
                }

                $billingTerm->update($validated);

                DB::commit();

                return successResponse(
                    $this->formatSingleBillingTermResponse($billingTerm->fresh()),
                    'Billing term updated successfully'
                );

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

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
            Log::error('Error updating billing term: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to update billing term',
                500,
                ['error_code' => 'UPDATE_ERROR']
            );
        }
    }

    /**
     * Remove the specified billing term (soft delete).
     */
    public function destroy(BillingTerm $billingTerm): JsonResponse
    {
        try {
            // Check if this is the default billing term
            if ($billingTerm->is_default) {
                return errorResponse(
                    'Cannot delete the default billing term',
                    422,
                    ['error_code' => 'DEFAULT_TERM_DELETE']
                );
            }

            // Check if term is being used in any orders/invoices
            if ($billingTerm->orders()->exists() || $billingTerm->invoices()->exists()) {
                return errorResponse(
                    'Cannot delete billing term that is being used',
                    422,
                    [
                        'error_code' => 'TERM_IN_USE',
                        'orders_count' => $billingTerm->orders()->count() ?? 0,
                        'invoices_count' => $billingTerm->invoices()->count() ?? 0,
                    ]
                );
            }

            // Soft delete by marking as inactive
            $billingTerm->update(['is_active' => false]);

            return successResponse(
                [],
                'Billing term deactivated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error deactivating billing term: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to deactivate billing term',
                500,
                ['error_code' => 'DELETE_ERROR']
            );
        }
    }

    /**
     * Restore the specified billing term.
     */
    public function restore(BillingTerm $billingTerm): JsonResponse
    {
        try {
            $billingTerm->update(['is_active' => true]);

            return successResponse(
                $this->formatSingleBillingTermResponse($billingTerm->fresh()),
                'Billing term activated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error restoring billing term: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to activate billing term',
                500,
                ['error_code' => 'RESTORE_ERROR']
            );
        }
    }

    /**
     * Get active billing terms for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        try {
            $billingTerms = BillingTerm::where('is_active', true)
                ->select('id', 'description', 'code', 'days', 'discount_percent', 'discount_days', 'is_default')
                ->orderBy('description')
                ->get();

            return successResponse(
                $billingTerms->map(function ($term) {
                    return [
                        'id' => $term->id,
                        'label' => $term->description,
                        'value' => $term->id,
                        'code' => $term->code,
                        'days' => $term->days,
                        'discount_percent' => $term->discount_percent,
                        'discount_days' => $term->discount_days,
                        'is_default' => $term->is_default,
                    ];
                })->toArray(),
                'Billing term options retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching billing term options: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve billing term options',
                500,
                ['error_code' => 'OPTIONS_ERROR']
            );
        }
    }

    /**
     * Get the default billing term.
     */
    public function default(): JsonResponse
    {
        try {
            $defaultTerm = BillingTerm::where('is_active', true)
                ->where('is_default', true)
                ->first();

            if (! $defaultTerm) {
                return errorResponse(
                    'No default billing term found',
                    404,
                    ['error_code' => 'NO_DEFAULT_TERM']
                );
            }

            return successResponse(
                $this->formatSingleBillingTermResponse($defaultTerm),
                'Default billing term retrieved successfully'
            );

        } catch (\Exception $e) {
            Log::error('Error fetching default billing term: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to retrieve default billing term',
                500,
                ['error_code' => 'DEFAULT_ERROR']
            );
        }
    }

    /**
     * Set the specified billing term as default.
     */
    public function setDefault(BillingTerm $billingTerm): JsonResponse
    {
        try {
            if (! $billingTerm->is_active) {
                return errorResponse(
                    'Cannot set inactive billing term as default',
                    422,
                    ['error_code' => 'INACTIVE_DEFAULT']
                );
            }

            DB::beginTransaction();
            try {
                // Unset all current defaults
                BillingTerm::where('is_default', true)->update(['is_default' => false]);

                // Set this term as default
                $billingTerm->update(['is_default' => true]);

                DB::commit();

                return successResponse(
                    $this->formatSingleBillingTermResponse($billingTerm->fresh()),
                    'Billing term set as default successfully'
                );

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Error setting default billing term: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to set default billing term',
                500,
                ['error_code' => 'SET_DEFAULT_ERROR']
            );
        }
    }

    /**
     * Calculate discount for a billing term based on payment date.
     */
    public function calculateDiscount(Request $request, BillingTerm $billingTerm): JsonResponse
    {
        try {
            $validated = $request->validate([
                'invoice_date' => 'required|date',
                'payment_date' => 'required|date|after_or_equal:invoice_date',
                'invoice_amount' => 'required|numeric|min:0',
            ], [
                'invoice_date.required' => 'Invoice date is required',
                'payment_date.required' => 'Payment date is required',
                'payment_date.after_or_equal' => 'Payment date must be on or after invoice date',
                'invoice_amount.required' => 'Invoice amount is required',
                'invoice_amount.min' => 'Invoice amount must be at least 0',
            ]);

            $invoiceDate = \Carbon\Carbon::parse($validated['invoice_date']);
            $paymentDate = \Carbon\Carbon::parse($validated['payment_date']);
            $invoiceAmount = $validated['invoice_amount'];

            $daysFromInvoice = $invoiceDate->diffInDays($paymentDate);
            $discountAmount = 0;
            $discountPercent = 0;

            // Check if discount applies
            if ($billingTerm->discount_percent && $billingTerm->discount_days &&
                $daysFromInvoice <= $billingTerm->discount_days) {
                $discountPercent = $billingTerm->discount_percent;
                $discountAmount = ($invoiceAmount * $discountPercent) / 100;
            }

            $finalAmount = $invoiceAmount - $discountAmount;
            $dueDate = $invoiceDate->addDays($billingTerm->days);

            return successResponse([
                'billing_term' => [
                    'id' => $billingTerm->id,
                    'description' => $billingTerm->description,
                    'days' => $billingTerm->days,
                    'discount_percent' => $billingTerm->discount_percent,
                    'discount_days' => $billingTerm->discount_days,
                ],
                'calculation' => [
                    'invoice_date' => $invoiceDate->toDateString(),
                    'payment_date' => $paymentDate->toDateString(),
                    'due_date' => $dueDate->toDateString(),
                    'days_from_invoice' => $daysFromInvoice,
                    'days_until_due' => max(0, $dueDate->diffInDays($paymentDate, false)),
                    'is_early_payment' => $daysFromInvoice <= ($billingTerm->discount_days ?? 0),
                    'is_overdue' => $paymentDate->gt($dueDate),
                ],
                'amounts' => [
                    'invoice_amount' => round($invoiceAmount, 2),
                    'discount_percent' => $discountPercent,
                    'discount_amount' => round($discountAmount, 2),
                    'final_amount' => round($finalAmount, 2),
                ],
            ], 'Discount calculated successfully');

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
            Log::error('Error calculating discount: '.$e->getMessage(), [
                'billing_term_id' => $billingTerm->id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'Failed to calculate discount',
                500,
                ['error_code' => 'CALCULATION_ERROR']
            );
        }
    }

    /**
     * Format multiple billing terms response
     */
    private function formatBillingTermsResponse($billingTerms): array
    {
        return $billingTerms->map(function ($term) {
            return $this->formatSingleBillingTermResponse($term);
        })->toArray();
    }

    /**
     * Format single billing term response
     */
    private function formatSingleBillingTermResponse($billingTerm): array
    {
        return [
            'id' => $billingTerm->id,
            'description' => $billingTerm->description,
            'code' => $billingTerm->code,
            'days' => $billingTerm->days,
            'discount_percent' => $billingTerm->discount_percent,
            'discount_days' => $billingTerm->discount_days,
            'is_default' => $billingTerm->is_default,
            'is_active' => $billingTerm->is_active,
            'orders_count' => $billingTerm->orders()->count() ?? 0,
            'invoices_count' => $billingTerm->invoices()->count() ?? 0,
            'created_at' => $billingTerm->created_at?->toISOString(),
            'updated_at' => $billingTerm->updated_at?->toISOString(),
        ];
    }
}
