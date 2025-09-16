<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('central_app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('app_name')->nullable();
            $table->string('author_name')->nullable();
            $table->string('app_email')->nullable();
            $table->string('app_phone')->nullable();
            $table->string('app_logo')->nullable();
            $table->string('dark_logo')->nullable();
            $table->string('footer_copyright_text')->nullable();
            $table->string('favicon')->nullable();
            $table->string('mail_driver')->nullable();
            $table->string('port')->nullable();
            $table->string('host')->nullable();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->string('encryption')->nullable();
            $table->string('mail_from_name')->nullable();
            $table->string('mail_from_address')->nullable();
            $table->string('recaptcha_site_key')->nullable();
            $table->string('recaptcha_secret_key')->nullable();
            $table->boolean('recaptcha_status')->default(false);
            // Stripe Settings
            $table->string('stripe_public_key')->nullable();
            $table->string('stripe_secret_key')->nullable();
            $table->string('stripe_webhook_secret')->nullable();
            $table->boolean('stripe_enabled')->default(false);
            $table->string('stripe_mode')->default('sandbox');

            // PayPal Settings
            $table->string('paypal_client_id')->nullable();
            $table->string('paypal_client_secret')->nullable();
            $table->string('paypal_webhook_id')->nullable();
            $table->boolean('paypal_enabled')->default(false);
            $table->string('paypal_mode')->default('sandbox');

            // Bank Transfer Settings
            $table->boolean('bank_transfer_enabled')->default(false);
            $table->string('bank_name')->nullable();
            $table->string('bank_account_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('bank_routing_number')->nullable();
            $table->string('bank_swift_code')->nullable();
            $table->text('bank_instructions')->nullable();

            // General Payment Settings
            $table->string('default_currency', 3)->default('USD');
            $table->json('accepted_currencies')->nullable();
            $table->boolean('auto_billing_enabled')->default(false);
            $table->integer('payment_due_days')->default(7);
            $table->decimal('late_fee_percentage', 5, 2)->default(0.00);
            $table->boolean('send_payment_reminders')->default(true);

            // Trial Settings
            $table->integer('default_trial_days')->default(14);
            $table->boolean('trial_requires_payment_method')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('central_app_settings');
    }
};
