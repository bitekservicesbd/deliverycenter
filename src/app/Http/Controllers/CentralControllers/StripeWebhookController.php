<?php

namespace App\Http\Controllers\CentralControllers;

use App\Http\Controllers\Controller;
use App\Models\CentralAppSetting;
use App\Services\StripePaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    private $stripePaymentService;

    public function __construct(StripePaymentService $stripePaymentService)
    {
        $this->stripePaymentService = $stripePaymentService;
    }

    /**
     * Handle Stripe webhook events
     * This works with your existing TenantController markPayment logic
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        // Get webhook secret from your CentralAppSetting
        $settings = CentralAppSetting::first();
        $webhookSecret = $settings->stripe_webhook_secret ?? env('STRIPE_WEBHOOK_SECRET');

        if (! $webhookSecret) {
            Log::warning('Stripe webhook secret not configured');

            return response('Webhook secret not configured', 400);
        }

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
        } catch (SignatureVerificationException $e) {
            Log::error('Stripe webhook signature verification failed: '.$e->getMessage());

            return response('Invalid signature', 400);
        } catch (\Exception $e) {
            Log::error('Stripe webhook error: '.$e->getMessage());

            return response('Webhook error', 400);
        }

        // Handle different event types
        try {
            switch ($event->type) {
                case 'checkout.session.completed':
                    $this->handleCheckoutSessionCompleted($event->data->object);
                    break;

                case 'checkout.session.expired':
                    $this->handleCheckoutSessionExpired($event->data->object);
                    break;

                case 'payment_intent.succeeded':
                    $this->handlePaymentIntentSucceeded($event->data->object);
                    break;

                case 'payment_intent.payment_failed':
                    $this->handlePaymentIntentFailed($event->data->object);
                    break;

                default:
                    Log::info("Unhandled Stripe webhook event: {$event->type}");
            }

            return response('Webhook handled', 200);

        } catch (\Exception $e) {
            Log::error("Error handling Stripe webhook {$event->type}: ".$e->getMessage());

            return response('Webhook handling failed', 500);
        }
    }

    /**
     * Handle successful checkout session
     * Integrates with your existing tenant payment logic
     */
    private function handleCheckoutSessionCompleted($session): void
    {
        Log::info("Processing checkout session completed: {$session->id}");

        // Use your StripePaymentService which integrates with existing markPayment logic
        $success = $this->stripePaymentService->processSuccessfulPayment($session->id);

        if ($success) {
            Log::info("Successfully processed payment for session: {$session->id}");

            // Optional: Send success email notification here
            // You can integrate with your existing email system

        } else {
            Log::error("Failed to process payment for session: {$session->id}");
        }
    }

    /**
     * Handle expired checkout session
     */
    private function handleCheckoutSessionExpired($session): void
    {
        Log::info("Checkout session expired: {$session->id}");

        // Mark payment as expired in your payment_histories table
        $this->stripePaymentService->processFailedPayment($session->id);

        // Optional: Trigger new payment reminder here
        // This can call your payment reminder system
    }

    /**
     * Handle successful payment intent
     */
    private function handlePaymentIntentSucceeded($paymentIntent): void
    {
        Log::info("Payment intent succeeded: {$paymentIntent->id}");

        // This is usually handled by checkout.session.completed
        // But good to have for additional confirmation
    }

    /**
     * Handle failed payment intent
     */
    private function handlePaymentIntentFailed($paymentIntent): void
    {
        Log::info("Payment intent failed: {$paymentIntent->id}");

        // Optional: Update payment status and trigger retry logic
        // Can integrate with your existing payment reminder system
    }
}
