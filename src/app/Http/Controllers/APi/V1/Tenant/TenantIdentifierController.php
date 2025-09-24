<?php

namespace App\Http\Controllers\Api\V1\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TenantIdentifierController extends Controller
{
    /**
     * Get tenant identifier
     */
    public function getTenantIdentifier(Request $request)
    {
        try {
            // Enhanced validation with custom messages
            $validated = $request->validate([
                'tenant_id' => 'nullable|string|max:255',
                'tenant_domain' => 'nullable|string|max:255|regex:/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            ], [
                'tenant_domain.regex' => 'The tenant domain must be a valid domain format.',
                'tenant_id.max' => 'The tenant ID must not exceed 255 characters.',
                'tenant_domain.max' => 'The tenant domain must not exceed 255 characters.',
            ]);

            // Require at least one identifier
            if (empty($validated['tenant_id']) && empty($validated['tenant_domain'])) {
                return errorResponse(
                    'Either tenant_id or tenant_domain must be provided',
                    422,
                    ['error_code' => 'MISSING_IDENTIFIER']
                );
            }

            $tenant = null;
            $domain = null;
            $identificationMethod = null;

            // Primary identification by tenant_id
            if (! empty($validated['tenant_id'])) {
                $tenant = \App\Models\Tenant::with(['domains'])
                    ->where('id', $validated['tenant_id'])
                    ->first();

                $identificationMethod = 'tenant_id';

                if (! $tenant) {
                    return errorResponse(
                        'Tenant not found with the provided ID',
                        404,
                        [
                            'error_code' => 'TENANT_NOT_FOUND',
                            'identifier_type' => 'tenant_id',
                            'identifier_value' => $validated['tenant_id'],
                        ]
                    );
                }
            }

            // Secondary identification by domain
            if (! empty($validated['tenant_domain'])) {
                $domain = \App\Models\Domain::with(['tenant'])
                    ->where('domain', $validated['tenant_domain'])
                    ->first();

                if (! $domain) {
                    return errorResponse(
                        'Domain not found in the system',
                        404,
                        [
                            'error_code' => 'DOMAIN_NOT_FOUND',
                            'identifier_type' => 'tenant_domain',
                            'identifier_value' => $validated['tenant_domain'],
                        ]
                    );
                }

                // If tenant wasn't found by ID, use domain's tenant
                if (! $tenant) {
                    $tenant = $domain->tenant;
                    $identificationMethod = 'tenant_domain';
                }

                // Cross-validation: if both provided, ensure they belong to same tenant
                if ($tenant && $domain && $tenant->id !== $domain->tenant_id) {
                    return errorResponse(
                        'Tenant ID and domain do not belong to the same tenant',
                        422,
                        [
                            'error_code' => 'IDENTIFIER_MISMATCH',
                            'tenant_id' => $tenant->id,
                            'domain_tenant_id' => $domain->tenant_id,
                        ]
                    );
                }
            }

            // Final verification
            if (! $tenant) {
                return errorResponse(
                    'Unable to identify tenant with provided information',
                    404,
                    ['error_code' => 'TENANT_IDENTIFICATION_FAILED']
                );
            }

            // Comprehensive status checks
            $statusValidation = $this->validateTenantAndDomainStatus($tenant, $domain);
            if (! $statusValidation['valid']) {
                return errorResponse(
                    $statusValidation['message'],
                    $statusValidation['status_code'],
                    $statusValidation['data']
                );
            }

            // Prepare response data
            $responseData = [
                'tenant' => $this->formatTenantResponse($tenant),
                'identification_method' => $identificationMethod,
                'verified_at' => now()->toISOString(),
            ];

            // Include domain info if available
            if ($domain) {
                $responseData['domain'] = $this->formatDomainResponse($domain);
            }

            // Include all tenant domains for reference
            if ($tenant->domains && $tenant->domains->isNotEmpty()) {
                $responseData['available_domains'] = $tenant->domains->map(function ($d) {
                    return $this->formatDomainResponse($d);
                });
            }

            return successResponse($responseData, 'Tenant successfully identified and verified');
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
            // Log the error for debugging
            Log::error('Tenant identification error: '.$e->getMessage(), [
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return errorResponse(
                'An error occurred during tenant identification',
                500,
                ['error_code' => 'INTERNAL_SERVER_ERROR']
            );
        }
    }

    /**
     * Validate tenant and domain status with comprehensive checks
     */
    private function validateTenantAndDomainStatus($tenant, $domain = null): array
    {
        // Check tenant account status
        if ($tenant->status === 'inactive') {
            return [
                'valid' => false,
                'message' => 'Account access restricted due to inactive status',
                'status_code' => 403,
                'data' => [
                    'error_code' => 'ACCOUNT_INACTIVE',
                    'title' => 'Account Inactive',
                    'user_message' => 'Your account is currently inactive. Please contact the administrator for reactivation assistance.',
                    'tenant_status' => $tenant->status,
                    'tenant_id' => $tenant->id,
                    'contact_support' => true,
                ],
            ];
        }

        if ($tenant->status === 'suspended') {
            return [
                'valid' => false,
                'message' => 'Account access denied due to suspension',
                'status_code' => 403,
                'data' => [
                    'error_code' => 'ACCOUNT_SUSPENDED',
                    'title' => 'Account Suspended',
                    'user_message' => 'Your account has been suspended due to policy violations or security concerns. Please contact our support team for immediate assistance.',
                    'tenant_status' => $tenant->status,
                    'tenant_id' => $tenant->id,
                    'suspended_at' => $tenant->suspended_at ?? null,
                    'contact_support' => true,
                ],
            ];
        }

        // Check payment and subscription status
        if (isset($tenant->payment_status)) {
            switch ($tenant->payment_status) {
                case 'pending':
                    return [
                        'valid' => false,
                        'message' => 'Service access restricted due to pending payment',
                        'status_code' => 402,
                        'data' => [
                            'error_code' => 'PAYMENT_PENDING',
                            'title' => 'Payment Pending',
                            'user_message' => 'Your subscription payment is currently being processed. Please allow 24-48 hours for completion, or contact our billing department if you need immediate assistance.',
                            'payment_status' => $tenant->payment_status,
                            'tenant_id' => $tenant->id,
                            'retry_after' => '24 hours',
                            'contact_billing' => true,
                        ],
                    ];

                case 'overdue':
                    return [
                        'valid' => false,
                        'message' => 'Service access suspended due to overdue payment',
                        'status_code' => 402,
                        'data' => [
                            'error_code' => 'PAYMENT_OVERDUE',
                            'title' => 'Subscription Overdue',
                            'user_message' => 'Your subscription payment is overdue and service access has been temporarily suspended. Please update your payment method and settle outstanding charges, or contact our billing team for payment arrangement options.',
                            'payment_status' => $tenant->payment_status,
                            'tenant_id' => $tenant->id,
                            'overdue_since' => $tenant->payment_due_date ?? null,
                            'contact_billing' => true,
                            'grace_period_ended' => true,
                        ],
                    ];

                case 'failed':
                    return [
                        'valid' => false,
                        'message' => 'Service access restricted due to payment failure',
                        'status_code' => 402,
                        'data' => [
                            'error_code' => 'PAYMENT_FAILED',
                            'title' => 'Payment Processing Failed',
                            'user_message' => 'Your recent payment attempt was unsuccessful due to processing issues. Please verify your payment information and try again, or contact our support team for assistance with alternative payment methods.',
                            'payment_status' => $tenant->payment_status,
                            'tenant_id' => $tenant->id,
                            'failed_at' => $tenant->payment_failed_at ?? null,
                            'retry_available' => true,
                            'contact_support' => true,
                        ],
                    ];
            }
        }

        // Check general subscription status
        if (
            isset($tenant->subscription_status) &&
            ! in_array($tenant->subscription_status, ['active', 'trial', 'grace_period'])
        ) {
            return [
                'valid' => false,
                'message' => 'Service access unavailable due to subscription status',
                'status_code' => 402,
                'data' => [
                    'error_code' => 'SUBSCRIPTION_INACTIVE',
                    'title' => 'Subscription Required',
                    'user_message' => 'Your subscription is currently inactive. Please renew your plan to continue using our services, or contact our sales team to discuss available options.',
                    'subscription_status' => $tenant->subscription_status,
                    'tenant_id' => $tenant->id,
                    'renewal_available' => true,
                    'contact_sales' => true,
                ],
            ];
        }

        return ['valid' => true];
    }

    /**
     * Format tenant response with essential information
     */
    private function formatTenantResponse($tenant): array
    {
        return [
            'id' => $tenant->id,
            'status' => $tenant->status,
            'plan' => $tenant->plan ?? 'basic',
            'payment_status' => $tenant->payment_status ?? 'active',
            'trial_ends_at' => $tenant->trial_ends_at?->toISOString() ?? null,
            'next_billing_date' => $tenant->next_billing_date?->toISOString() ?? null,
            'created_at' => $tenant->created_at?->toISOString(),
            'timezone' => $tenant->timezone ?? 'UTC',
            'locale' => $tenant->locale ?? 'en',
        ];
    }

    /**
     * Format domain response with essential information
     */
    private function formatDomainResponse($domain): array
    {
        return [
            'id' => $domain->id,
            'domain' => $domain->domain,
            'created_at' => $domain->created_at?->toISOString(),
            'verified_at' => $domain->verified_at?->toISOString(),
        ];
    }
}
