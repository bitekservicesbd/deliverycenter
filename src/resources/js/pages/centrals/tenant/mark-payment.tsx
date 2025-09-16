import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Calendar, CreditCard, DollarSign } from 'lucide-react';
import React, { Fragment } from 'react';

type Tenant = {
    id: string;
    company_name: string;
    user: {
        name: string;
        email?: string;
    };
    plan: {
        name: string;
        formatted_price?: string;
    };
    payment_status: string;
    next_billing_date?: string;
};

type MarkPaymentModalProps = {
    open: boolean;
    onClose: () => void;
    tenant: Tenant;
    onSuccess?: () => void;
};

export default function MarkPaymentModal({ open, onClose, tenant, onSuccess }: MarkPaymentModalProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        amount: '',
        payment_method: 'manual',
        billing_cycle: 'monthly',
        notes: '',
        gateway_payment_id: '',
        extend_months: '1',
    });

    const paymentMethods = [
        { value: 'manual', label: 'Manual Payment', icon: DollarSign },
        { value: 'stripe', label: 'Stripe', icon: CreditCard },
        { value: 'paypal', label: 'PayPal', icon: CreditCard },
        { value: 'bank_transfer', label: 'Bank Transfer', icon: DollarSign },
    ];

    const billingCycles = [
        { value: 'monthly', label: 'Monthly', months: 1 },
        { value: 'yearly', label: 'Yearly', months: 12 },
        { value: 'custom', label: 'Custom', months: parseInt(data.extend_months) || 1 },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('central.tenants.mark-payment', tenant.id), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const calculateNextBillingDate = () => {
        const months = billingCycles.find((cycle) => cycle.value === data.billing_cycle)?.months || 1;
        const nextDate = new Date();
        nextDate.setMonth(nextDate.getMonth() + months);
        return nextDate.toLocaleDateString();
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title className="mb-6 text-xl leading-6 font-semibold text-gray-900 dark:text-slate-300">
                                    Mark Payment Received
                                </Dialog.Title>

                                <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-300">{tenant.company_name}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{tenant.user.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{tenant.plan.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Current Status</p>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    tenant.payment_status === 'paid'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-white'
                                                        : tenant.payment_status === 'overdue'
                                                          ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-white'
                                                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-white'
                                                }`}
                                            >
                                                {tenant.payment_status.charAt(0).toUpperCase() + tenant.payment_status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="amount" className="dark:text-slate-300">
                                                Payment Amount *
                                            </Label>
                                            <Input
                                                id="amount"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                                className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                placeholder="0.00"
                                                required
                                            />
                                            <InputError message={errors.amount} />
                                        </div>

                                        <div>
                                            <Label htmlFor="payment_method" className="dark:text-slate-300">
                                                Payment Method *
                                            </Label>
                                            <Select value={data.payment_method} onValueChange={(value) => setData('payment_method', value)}>
                                                <SelectTrigger className="mt-1 dark:border-slate-700 dark:text-slate-300">
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
                                                    {paymentMethods.map((method) => (
                                                        <SelectItem key={method.value} value={method.value}>
                                                            <div className="flex items-center">
                                                                <method.icon className="mr-2 h-4 w-4" />
                                                                {method.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.payment_method} />
                                        </div>

                                        <div>
                                            <Label htmlFor="billing_cycle" className="dark:text-slate-300">
                                                Billing Cycle *
                                            </Label>
                                            <Select value={data.billing_cycle} onValueChange={(value) => setData('billing_cycle', value)}>
                                                <SelectTrigger className="mt-1 dark:border-slate-700 dark:text-slate-300">
                                                    <SelectValue placeholder="Select billing cycle" />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
                                                    {billingCycles.map((cycle) => (
                                                        <SelectItem key={cycle.value} value={cycle.value}>
                                                            {cycle.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.billing_cycle} />
                                        </div>

                                        {data.billing_cycle === 'custom' && (
                                            <div>
                                                <Label htmlFor="extend_months" className="dark:text-slate-300">
                                                    Extend Months
                                                </Label>
                                                <Input
                                                    id="extend_months"
                                                    type="number"
                                                    min="1"
                                                    max="24"
                                                    value={data.extend_months}
                                                    onChange={(e) => setData('extend_months', e.target.value)}
                                                    className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                    placeholder="1"
                                                />
                                                <InputError message={errors.extend_months} />
                                            </div>
                                        )}
                                    </div>

                                    {(data.payment_method === 'stripe' || data.payment_method === 'paypal') && (
                                        <div>
                                            <Label htmlFor="gateway_payment_id" className="dark:text-slate-300">
                                                Transaction ID
                                            </Label>
                                            <Input
                                                id="gateway_payment_id"
                                                type="text"
                                                value={data.gateway_payment_id}
                                                onChange={(e) => setData('gateway_payment_id', e.target.value)}
                                                className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                placeholder={`Enter ${data.payment_method} transaction ID`}
                                            />
                                            <InputError message={errors.gateway_payment_id} />
                                        </div>
                                    )}

                                    <div>
                                        <Label htmlFor="notes" className="dark:text-slate-300">
                                            Payment Notes
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={3}
                                            className="dark:border-slate-700 dark:text-slate-300"
                                            placeholder="Additional notes about this payment..."
                                        />
                                        <InputError message={errors.notes} />
                                    </div>

                                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-slate-800">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-blue-900 dark:text-slate-300">Next Billing Date Preview</p>
                                                <p className="text-sm text-blue-700 dark:text-slate-400">{calculateNextBillingDate()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 border-t pt-6">
                                        <Button
                                            className={'dark:border-slate-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'}
                                            type="button"
                                            onClick={handleClose}
                                            variant="outline"
                                            disabled={processing}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className={'dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800'}
                                        >
                                            {processing ? 'Processing...' : 'Mark Payment Received'}
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
