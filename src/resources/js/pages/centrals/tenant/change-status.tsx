import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import React, { Fragment } from 'react';

type TenantStatus = 'active' | 'inactive' | 'suspended' | 'trial';

type Tenant = {
    id: string;
    company_name: string;
    user: {
        name: string;
        email?: string;
    };
    plan: {
        name: string;
    };
    status: TenantStatus;
    payment_status: string;
};

type ChangeStatusModalProps = {
    open: boolean;
    onClose: () => void;
    tenant: Tenant;
    onSuccess?: () => void;
};

export default function ChangeStatusModal({ open, onClose, tenant, onSuccess }: ChangeStatusModalProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        status: tenant.status,
        reason: '',
    });

    const statusOptions = [
        {
            value: 'active',
            label: 'Active',
            icon: CheckCircle,
            color: 'text-green-600',
            description: 'Tenant can access all features and services',
        },
        {
            value: 'trial',
            label: 'Trial',
            icon: Clock,
            color: 'text-blue-600',
            description: 'Tenant is in trial period with limited access',
        },
        {
            value: 'inactive',
            label: 'Inactive',
            icon: XCircle,
            color: 'text-gray-600',
            description: 'Tenant cannot access services (usually due to non-payment)',
        },
        {
            value: 'suspended',
            label: 'Suspended',
            icon: AlertTriangle,
            color: 'text-red-600',
            description: 'Tenant is temporarily suspended (policy violation, etc.)',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('central.tenants.change-status', tenant.id), {
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

    const selectedStatus = statusOptions.find((option) => option.value === data.status);
    const isStatusChanged = data.status !== tenant.status;

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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title className="mb-6 text-xl leading-6 font-semibold text-gray-900 dark:text-slate-200">
                                    Change Tenant Status
                                </Dialog.Title>

                                <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                                    <div className="flex items-center">
                                        <Users className="mr-3 h-5 w-5 text-slate-600 dark:text-slate-300" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{tenant.company_name}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{tenant.user.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-500">{tenant.plan.name}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Current Status:</span>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    tenant.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                        : tenant.status === 'trial'
                                                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                          : tenant.status === 'inactive'
                                                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                }`}
                                            >
                                                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="status">New Status *</Label>
                                        <Select value={data.status} onValueChange={(value: TenantStatus) => setData('status', value)}>
                                            <SelectTrigger className="mt-1 h-12 dark:border-slate-700 dark:text-slate-300">
                                                <SelectValue placeholder="Select new status" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-slate-800 dark:text-slate-200">
                                                {statusOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="py-3">
                                                        <div className="flex items-center">
                                                            <option.icon className={`mr-3 h-4 w-4 ${option.color}`} />
                                                            <div>
                                                                <div className="font-medium">{option.label}</div>
                                                                <div className="text-xs text-slate-500">{option.description}</div>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>

                                    {selectedStatus && (
                                        <div
                                            className={`rounded-lg p-4 ${
                                                selectedStatus.value === 'active'
                                                    ? 'border border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900'
                                                    : selectedStatus.value === 'trial'
                                                      ? 'border border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900'
                                                      : selectedStatus.value === 'inactive'
                                                        ? 'border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'
                                                        : 'border border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <selectedStatus.icon className={`mr-2 h-5 w-5 ${selectedStatus.color}`} />
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-slate-100">{selectedStatus.label} Status</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{selectedStatus.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isStatusChanged && (
                                        <div>
                                            <Label htmlFor="reason">
                                                Reason for Status Change<span className="text-red-500"> *</span>
                                            </Label>
                                            <Textarea
                                                id="reason"
                                                value={data.reason}
                                                onChange={(e) => setData('reason', e.target.value)}
                                                className="mt-1 w-full dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                                rows={3}
                                                placeholder="Explain why you're changing the tenant status..."
                                                required
                                            />
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                This will be logged in the tenant's activity history.
                                            </p>
                                            <InputError message={errors.reason} />
                                        </div>
                                    )}

                                    {(data.status === 'inactive' || data.status === 'suspended') && data.status !== tenant.status && (
                                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900">
                                            <div className="flex">
                                                <AlertTriangle className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-yellow-600" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                                                        Warning: Service Interruption
                                                    </h4>
                                                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                                                        Changing status to "{data.status}" will prevent the tenant from accessing their services. Make
                                                        sure this is intentional.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-3 border-t pt-6 dark:border-slate-700">
                                        <Button
                                            type="button"
                                            onClick={handleClose}
                                            variant="outline"
                                            disabled={processing}
                                            className={'dark:border-slate-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing || !isStatusChanged}
                                            className={'dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800'}
                                        >
                                            {processing ? 'Updating...' : 'Update Status'}
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
