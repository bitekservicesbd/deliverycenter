<?php

namespace App\Http\Controllers\CentralControllers;

use App\Mail\PaymentReminderMail;
use App\Models\PaymentHistory;
use App\Models\PaymentReminder;
use App\Models\Tenant;
use App\Services\StripePaymentService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class StripePaymentController extends Controller
{
    private $stripePaymentService;

    public function __construct(StripePaymentService $stripePaymentService)
    {
        $this->stripePaymentService = $stripePaymentService;
    }

    /**
     * Generate payment link for tenant (extends your existing tenant management)
     * This can be called from your existing tenant index page
     */
    public function generatePaymentLink(Request $request, Tenant $tenant)
    {
        try {
            if (! $this->stripePaymentService->isConfigured()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stripe is not configured. Please configure Stripe in payment settings.',
                ], 400);
            }

            $reminderType = $request->input('type', 'payment_due');

            $checkoutData = $this->stripePaymentService->createCheckoutSession($tenant, $reminderType);

            if (! $checkoutData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate payment link. Please try again.',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Payment link generated successfully',
                'data' => [
                    'checkout_url' => $checkoutData['checkout_url'],
                    'session_id' => $checkoutData['session_id'],
                    'amount' => $checkoutData['amount'],
                    'currency' => $checkoutData['currency'],
                ],
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to generate payment link for tenant {$tenant->id}: ".$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while generating payment link.',
            ], 500);
        }
    }

    /**
     * Send payment reminder email with Stripe checkout link
     * Integrates with your existing email system
     */
    public function sendPaymentReminder(Request $request, Tenant $tenant)
    {
        $request->validate([
            'type' => 'required|in:payment_due_soon,payment_due_today,payment_overdue,trial_ending,final_warning',
        ]);

        try {
            $reminderType = $request->input('type');

            // Generate Stripe checkout link
            $checkoutData = $this->stripePaymentService->createCheckoutSession($tenant, $reminderType);

            if (! $checkoutData) {
                return redirect()->back()->with('error', 'Failed to generate payment link');
            }

            // Create payment reminder record
            $reminder = PaymentReminder::create([
                'tenant_id' => $tenant->id,
                'type' => $reminderType,
                'stripe_checkout_url' => $checkoutData['checkout_url'],
                'stripe_checkout_session_id' => $checkoutData['session_id'],
                'expires_at' => now()->addDays(7),
                'email_data' => [
                    'amount' => $checkoutData['amount'],
                    'currency' => $checkoutData['currency'],
                    'plan_name' => $tenant->plan->name,
                ],
            ]);

            // Send email (integrate with your existing mail system)
            Mail::to($tenant->user->email)->queue(new PaymentReminderMail($tenant, $reminder));

            // Mark reminder as sent
            $reminder->markAsSent();

            return redirect()->back()->with('success', 'Payment reminder sent successfully with payment link');
        } catch (\Exception $e) {
            Log::error("Failed to send payment reminder for tenant {$tenant->id}: ".$e->getMessage());

            return redirect()->back()->with('error', 'Failed to send payment reminder');
        }
    }

    /**
     * Get payment history for tenant (extends your existing tenant details)
     */
    public function getPaymentHistory(Tenant $tenant)
    {
        $paymentHistory = PaymentHistory::where('tenant_id', $tenant->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $paymentReminders = PaymentReminder::where('tenant_id', $tenant->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'payment_history' => $paymentHistory,
            'payment_reminders' => $paymentReminders,
            'total_payments' => PaymentHistory::where('tenant_id', $tenant->id)->where('status', 'succeeded')->sum('amount'),
            'failed_payments' => PaymentHistory::where('tenant_id', $tenant->id)->where('status', 'failed')->count(),
        ]);
    }

    /**
     * Payment success page for customers
     */
    public function paymentSuccess(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret_key'));

        $sessionId = $request->query('session_id');

        // Retrieve the Checkout Session
        $session = Session::retrieve($sessionId);

        // Retrieve the Payment Intent from the session
        $paymentIntentId = $session->payment_intent;

        $paymentIntent = PaymentIntent::retrieve($paymentIntentId);

        // get payment history
        $paymentHistory = PaymentHistory::where('stripe_checkout_session_id', $sessionId)->first();
        // get tenant
        $tenant = Tenant::find($paymentIntent->metadata->tenant_id);
        $message = '';

        // check if payment history exists
        if ($paymentHistory) {
            if ($paymentHistory->status === 'succeeded') {
                $message = 'You have already paid!';
            } else {

                $next_billing_date = $paymentIntent->metadata->billing_cycle === 'yearly'
                    ? now()->addYear()
                    : now()->addMonth();

                $tenantData = json_decode($tenant->getRawOriginal('data'), true);
                $today = Carbon::today();

                if (! empty($tenantData['next_billing_date'])) {
                    $nextBillingDate = Carbon::parse($tenantData['next_billing_date']);

                    if ($nextBillingDate->isFuture()) {
                        // Add remaining days if next_billing_date is in the future
                        $daysRemaining = $today->diffInDays($nextBillingDate);
                        $next_billing_date->addDays($daysRemaining);
                    }
                }

                // update tenant
                $tenant->status = 'active';
                $tenant->payment_status = 'paid';
                $tenant->plan_id = $paymentIntent->metadata->plan_id;
                $tenant->payment_method = 'stripe';
                $tenant->next_billing_date = $next_billing_date;
                $tenant->note = 'Stripe payment received: '.($paymentIntent->amount / 100).' '.strtoupper($paymentIntent->currency).' on '.now()->format('Y-m-d H:i').'. Tenant Activated.';
                $tenant->save();

                // update payment history
                if ($paymentHistory) {
                    $paymentHistory->stripe_payment_intent_id = $paymentIntentId;
                    $paymentHistory->status = 'succeeded';
                    $paymentHistory->paid_at = now();
                    $paymentHistory->save();
                }

                if ($sessionId) {
                    // Mark reminder as clicked
                    PaymentReminder::where('stripe_checkout_session_id', $sessionId)
                        ->update(['is_clicked' => true, 'clicked_at' => now()]);
                }

                $message = 'Payment successful!';
            }
        } else {
            $message = 'Payment history not found!';
        }

        return Inertia::render('frontend/payments/Success', [
            'tenant' => $tenant,
            'sessionId' => $sessionId,
            'message' => $message,
        ]);
    }

    /**
     * Payment cancel page for customers
     */
    public function paymentCancel(Tenant $tenant)
    {
        return Inertia::render('frontend/payments/Cancel', [
            'tenant' => $tenant,
        ]);
    }

    /**
     * Track payment link clicks for analytics
     */
    public function trackPaymentLinkClick(PaymentReminder $reminder)
    {
        $reminder->markAsClicked();

        return redirect($reminder->stripe_checkout_url);
    }

    /**
     * Test Stripe configuration from your payment settings page
     */
    public function testStripeConfig()
    {
        try {
            if (! $this->stripePaymentService->isConfigured()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stripe keys are not configured',
                ]);
            }

            // Try to create a test customer to verify connection
            \Stripe\Stripe::setApiKey($this->stripePaymentService->getPublicKey());

            $testCustomer = \Stripe\Customer::create([
                'email' => 'test@example.com',
                'name' => 'Test Customer',
                'description' => 'Test customer for configuration verification',
            ]);

            // Delete the test customer
            $testCustomer->delete();

            return response()->json([
                'success' => true,
                'message' => 'Stripe configuration is working properly',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Stripe configuration error: '.$e->getMessage(),
            ]);
        }
    }
}
