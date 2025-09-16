import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import CentralLayout from '@/layouts/central-setting/centralLayout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Payment Settings',
        href: route('central.settings.payment'),
    },
];

export default function PaymentSettings({ settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        // Stripe Settings
        stripe_enabled: settings?.stripe_enabled || false,
        stripe_public_key: settings?.stripe_public_key || '',
        stripe_secret_key: settings?.stripe_secret_key || '',
        stripe_webhook_secret: settings?.stripe_webhook_secret || '',
        stripe_mode: settings?.stripe_mode || 'sandbox',

        // PayPal Settings
        paypal_enabled: settings?.paypal_enabled || false,
        paypal_client_id: settings?.paypal_client_id || '',
        paypal_client_secret: settings?.paypal_client_secret || '',
        paypal_webhook_id: settings?.paypal_webhook_id || '',
        paypal_mode: settings?.paypal_mode || 'sandbox',

        // General Payment Settings
        default_currency: settings?.default_currency || 'USD',
        auto_billing_enabled: settings?.auto_billing_enabled || false,
        payment_due_days: settings?.payment_due_days || 7,
        late_fee_percentage: settings?.late_fee_percentage || 0,
        send_payment_reminders: settings?.send_payment_reminders || true,

        // Trial Settings
        default_trial_days: settings?.default_trial_days || 14,
        trial_requires_payment_method: settings?.trial_requires_payment_method || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('central.settings.payment.update'));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const currencyOptions = [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - British Pound' },
        { value: 'CAD', label: 'CAD - Canadian Dollar' },
        { value: 'AUD', label: 'AUD - Australian Dollar' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Settings" />
            <CentralLayout>
                <HeadingSmall title="Payment Settings" description="Configure payment methods and billing settings for your tenants." />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Stripe Settings */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-l font-medium text-gray-900 dark:text-white">Stripe Payment Gateway</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-300">Configure Stripe payment processing</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    name="stripe_enabled"
                                    checked={data.stripe_enabled}
                                    onChange={handleInputChange}
                                    className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </label>
                        </div>

                        {data.stripe_enabled && (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="stripe_mode">Stripe Mode</Label>
                                    <Select value={data.stripe_mode} onValueChange={(value) => setData('stripe_mode', value)}>
                                        <SelectTrigger className="w-full rounded-md border px-4 py-2">
                                            {data.stripe_mode === 'sandbox' ? 'Sandbox (Test)' : 'Live (Production)'}
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="sandbox">Sandbox (Test)</SelectItem>
                                            <SelectItem value="live">Live (Production)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.stripe_mode} />
                                </div>

                                <div>
                                    <Label htmlFor="stripe_public_key">Publishable Key</Label>
                                    <Input
                                        id="stripe_public_key"
                                        name="stripe_public_key"
                                        value={data.stripe_public_key}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="pk_test_..."
                                    />
                                    <InputError message={errors.stripe_public_key} />
                                </div>

                                <div>
                                    <Label htmlFor="stripe_secret_key">Secret Key</Label>
                                    <Input
                                        id="stripe_secret_key"
                                        name="stripe_secret_key"
                                        type="password"
                                        value={data.stripe_secret_key}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="sk_test_..."
                                    />
                                    <InputError message={errors.stripe_secret_key} />
                                </div>

                                <div>
                                    <Label htmlFor="stripe_webhook_secret">Webhook Secret (Optional)</Label>
                                    <Input
                                        id="stripe_webhook_secret"
                                        name="stripe_webhook_secret"
                                        type="password"
                                        value={data.stripe_webhook_secret}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="whsec_..."
                                    />
                                    <InputError message={errors.stripe_webhook_secret} />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* PayPal Settings */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-l font-medium text-gray-900 dark:text-white">PayPal Payment Gateway</h3>
                                <p className="text-sm text-gray-500 dark:text-white">Configure PayPal payment processing</p>
                            </div>
                            <Label className="relative inline-flex cursor-pointer items-center">
                                <Input
                                    type="checkbox"
                                    name="paypal_enabled"
                                    checked={data.paypal_enabled}
                                    onChange={handleInputChange}
                                    className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </Label>
                        </div>

                        {data.paypal_enabled && (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="paypal_mode">PayPal Mode</Label>
                                    <Select value={data.paypal_mode} onValueChange={(value) => setData('paypal_mode', value)}>
                                        <SelectTrigger className="w-full rounded-md border px-4 py-2">
                                            {data.paypal_mode === 'sandbox' ? 'Sandbox (Test)' : 'Live (Production)'}
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="sandbox">Sandbox (Test)</SelectItem>
                                            <SelectItem value="live">Live (Production)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.paypal_mode} />
                                </div>

                                <div>
                                    <Label htmlFor="paypal_client_id">Client ID</Label>
                                    <Input
                                        id="paypal_client_id"
                                        name="paypal_client_id"
                                        value={data.paypal_client_id}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="PayPal Client ID"
                                    />
                                    <InputError message={errors.paypal_client_id} />
                                </div>

                                <div>
                                    <Label htmlFor="paypal_client_secret">Client Secret</Label>
                                    <Input
                                        id="paypal_client_secret"
                                        name="paypal_client_secret"
                                        type="password"
                                        value={data.paypal_client_secret}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="PayPal Client Secret"
                                    />
                                    <InputError message={errors.paypal_client_secret} />
                                </div>

                                <div>
                                    <Label htmlFor="paypal_webhook_id">Webhook ID (Optional)</Label>
                                    <Input
                                        id="paypal_webhook_id"
                                        name="paypal_webhook_id"
                                        value={data.paypal_webhook_id}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                        placeholder="PayPal Webhook ID"
                                    />
                                    <InputError message={errors.paypal_webhook_id} />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* General Payment Settings */}
                    <section className="space-y-6">
                        <div>
                            <h3 className="text-l font-medium text-gray-900 dark:text-white">General Payment Settings</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-300">Configure billing and trial settings</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <Label htmlFor="default_currency">Default Currency</Label>
                                <Select value={data.default_currency} onValueChange={(value) => setData('default_currency', value)}>
                                    <SelectTrigger id="default_currency" className="w-full">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencyOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.default_currency} />
                            </div>

                            <div>
                                <Label htmlFor="payment_due_days">Payment Due Days</Label>
                                <Input
                                    id="payment_due_days"
                                    name="payment_due_days"
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={data.payment_due_days}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                    placeholder="7"
                                />
                                <p className="mt-1 text-xs text-gray-500">Days before marking tenant as inactive</p>
                                <InputError message={errors.payment_due_days} />
                            </div>

                            <div>
                                <Label htmlFor="late_fee_percentage">Late Fee Percentage</Label>
                                <Input
                                    id="late_fee_percentage"
                                    name="late_fee_percentage"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={data.late_fee_percentage}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                    placeholder="0.00"
                                />
                                <p className="mt-1 text-xs text-gray-500">Percentage of late fee to charge</p>
                                <InputError message={errors.late_fee_percentage} />
                            </div>

                            <div>
                                <Label htmlFor="default_trial_days">Default Trial Days</Label>
                                <Input
                                    id="default_trial_days"
                                    name="default_trial_days"
                                    type="number"
                                    min="0"
                                    max="365"
                                    value={data.default_trial_days}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                    placeholder="14"
                                />
                                <InputError message={errors.default_trial_days} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Auto Billing</Label>
                                    <p className="text-sm text-gray-500">Automatically charge tenants when payments are due</p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        name="auto_billing_enabled"
                                        checked={data.auto_billing_enabled}
                                        onChange={handleInputChange}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Payment Reminders</Label>
                                    <p className="text-sm text-gray-500">Send email reminders before payment due dates</p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        name="send_payment_reminders"
                                        checked={data.send_payment_reminders}
                                        onChange={handleInputChange}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Trial Requires Payment Method</Label>
                                    <p className="text-sm text-gray-500">Require payment method to start trial period</p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        name="trial_requires_payment_method"
                                        checked={data.trial_requires_payment_method}
                                        onChange={handleInputChange}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-4">
                        {recentlySuccessful && <p className="text-sm text-green-600">Settings saved successfully!</p>}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800"
                        >
                            <RefreshCcw className={`h-4 w-4 ${processing ? 'animate-spin' : ''}`} />
                            {processing ? 'Updating...' : 'Update Settings'}
                        </Button>
                    </div>
                </form>
            </CentralLayout>
        </AppLayout>
    );
}
