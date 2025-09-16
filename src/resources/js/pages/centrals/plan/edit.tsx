import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';

type Plan = {
    id: number;
    name: string;
    description?: string;
    monthly_price?: string | number;
    yearly_price?: string | number;
    custom_price?: string | number;
    currency?: string;
    billing_cycle?: 'monthly' | 'yearly' | 'custom';
    trial_days?: string | number;
    is_featured?: boolean;
};

type EditPlanProps = {
    open: boolean;
    onClose: () => void;
    plan: Plan;
    onSuccess?: (updatedPlan: Plan) => void;
};

type PageProps = {
    plan?: Plan;
    [key: string]: unknown;
};

export default function EditPlan({ open, onClose, plan, onSuccess }: EditPlanProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        description: '',
        monthly_price: '',
        yearly_price: '',
        custom_price: '',
        currency: 'USD',
        billing_cycle: 'monthly',
        trial_days: '14',
        is_featured: false as boolean,
    });

    const [selectedPriceType, setSelectedPriceType] = useState<'monthly' | 'yearly' | 'custom'>('monthly');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const currencyOptions = [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - British Pound' },
        { value: 'CAD', label: 'CAD - Canadian Dollar' },
        { value: 'AUD', label: 'AUD - Australian Dollar' },
    ];

    useEffect(() => {
        if (open && plan) {
            setIsDataLoaded(false);

            setData({
                name: plan.name || '',
                description: plan.description || '',
                monthly_price: plan.monthly_price?.toString() || '',
                yearly_price: plan.yearly_price?.toString() || '',
                custom_price: plan.custom_price?.toString() || '',
                currency: plan.currency || 'USD',
                billing_cycle: plan.billing_cycle || 'monthly',
                trial_days: plan.trial_days?.toString() || '14',
                is_featured: !!plan?.is_featured,
            });

            if (plan.billing_cycle) {
                setSelectedPriceType(plan.billing_cycle);
            } else if (plan.monthly_price) {
                setSelectedPriceType('monthly');
            } else if (plan.yearly_price) {
                setSelectedPriceType('yearly');
            } else if (plan.custom_price) {
                setSelectedPriceType('custom');
            }
            setTimeout(() => {
                setIsDataLoaded(true);
            }, 100);
        }
    }, [open, plan, setData]);

    useEffect(() => {
        if (!open) {
            setIsDataLoaded(false);
        }
    }, [open]);

    const handlePriceTypeChange = (type: 'monthly' | 'yearly' | 'custom') => {
        setSelectedPriceType(type);
        setData('billing_cycle', type);
    };

    const getCurrentPrice = () => {
        switch (selectedPriceType) {
            case 'monthly':
                return data.monthly_price;
            case 'yearly':
                return data.yearly_price;
            case 'custom':
                return data.custom_price;
            default:
                return '';
        }
    };

    const handlePriceChange = (value: string) => {
        switch (selectedPriceType) {
            case 'monthly':
                setData('monthly_price', value);
                break;
            case 'yearly':
                setData('yearly_price', value);
                break;
            case 'custom':
                setData('custom_price', value);
                break;
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Clean data before sending: only send selected price type
        const cleanData = {
            ...data,
            monthly_price: selectedPriceType === 'monthly' ? data.monthly_price : '',
            yearly_price: selectedPriceType === 'yearly' ? data.yearly_price : '',
            custom_price: selectedPriceType === 'custom' ? data.custom_price : '',
        };

        post(route('central.plans.store', plan.id), {
            data: cleanData,
            onSuccess: (page: { props: PageProps }) => {
                if (onSuccess) {
                    const isPlanObject = (obj: unknown): obj is Plan =>
                        obj !== null &&
                        typeof obj === 'object' &&
                        obj !== undefined &&
                        'id' in obj &&
                        'name' in obj &&
                        typeof (obj as Record<string, unknown>).id === 'number' &&
                        typeof (obj as Record<string, unknown>).name === 'string';

                    const updatedPlan = isPlanObject(page.props.plan) ? page.props.plan : plan;
                    onSuccess(updatedPlan);
                }
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        setIsDataLoaded(false);
        onClose();
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
                    <div className="bg-opacity-25 fixed inset-0 bg-black/50" />
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
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title as="h3" className="mb-6 text-xl leading-6 font-semibold text-gray-900 dark:text-slate-300">
                                    Edit Plan: {plan.name}
                                </Dialog.Title>

                                {!isDataLoaded ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-slate-300"></div>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="space-y-6">
                                        {/* Basic Information */}
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="md:col-span-2">
                                                <Label htmlFor="name">Plan Name *</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                    placeholder="e.g., Basic Plan, Pro Plan"
                                                    required
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="md:col-span-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    rows={3}
                                                    className="dark:border-slate-700 dark:text-slate-300"
                                                    placeholder="Brief description of the plan benefits..."
                                                />
                                                <InputError message={errors.description} />
                                            </div>
                                        </div>

                                        {/* Pricing Section */}
                                        <div className="border-t pt-6 dark:border-slate-700">
                                            <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-slate-300">Pricing Configuration</h4>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div>
                                                    <Label htmlFor="currency">Currency *</Label>
                                                    <Select
                                                        value={data.currency}
                                                        onValueChange={(value) => setData('currency', value)}
                                                        key={`currency-${open}-${plan.id}`}
                                                    >
                                                        <SelectTrigger className="mt-1 dark:border-slate-700 dark:text-slate-300">
                                                            <SelectValue placeholder="Select currency" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {currencyOptions.map((currency) => (
                                                                <SelectItem key={currency.value} value={currency.value}>
                                                                    {currency.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.currency} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="billing_cycle">Billing Cycle *</Label>
                                                    <Select
                                                        value={selectedPriceType}
                                                        onValueChange={(value: 'monthly' | 'yearly' | 'custom') => handlePriceTypeChange(value)}
                                                    >
                                                        <SelectTrigger className="mt-1 dark:border-slate-700 dark:text-slate-300">
                                                            <SelectValue placeholder="Select billing cycle" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="monthly">Monthly</SelectItem>
                                                            <SelectItem value="yearly">Yearly</SelectItem>
                                                            <SelectItem value="custom">Custom/One-time</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.billing_cycle} />
                                                </div>

                                                <div>
                                                    <Label htmlFor="price">
                                                        {selectedPriceType === 'monthly'
                                                            ? 'Monthly Price'
                                                            : selectedPriceType === 'yearly'
                                                              ? 'Yearly Price'
                                                              : 'Custom Price'}{' '}
                                                        *
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={getCurrentPrice()}
                                                        onChange={(e) => handlePriceChange(e.target.value)}
                                                        className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                        placeholder="0.00"
                                                        required
                                                    />
                                                    <InputError message={errors[`${selectedPriceType}_price`]} />
                                                </div>

                                                <div>
                                                    <Label htmlFor="trial_days">Trial Period (Days)</Label>
                                                    <Input
                                                        id="trial_days"
                                                        type="number"
                                                        min="0"
                                                        max="365"
                                                        value={data.trial_days}
                                                        onChange={(e) => setData('trial_days', e.target.value)}
                                                        className="mt-1 w-full dark:border-slate-700 dark:text-slate-300"
                                                        placeholder="14"
                                                    />
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                                        Number of days for free trial (0 = no trial)
                                                    </p>
                                                    <InputError message={errors.trial_days} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Plan Options */}
                                        <div className="border-t pt-6 dark:border-slate-700">
                                            <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-slate-300">Plan Options</h4>

                                            <div className="flex items-center space-x-3">
                                                <Label className="flex cursor-pointer items-center space-x-2">
                                                    <Input
                                                        type="checkbox"
                                                        checked={data.is_featured}
                                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                                                        Mark as Featured Plan
                                                    </span>
                                                </Label>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                                Featured plans will be highlighted in the pricing table
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 border-t pt-6 dark:border-slate-700">
                                            <Button type="button" onClick={handleClose} variant="outline" disabled={processing}>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-600"
                                            >
                                                {processing ? 'Updating...' : 'Update Plan'}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
