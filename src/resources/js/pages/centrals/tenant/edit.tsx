import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { Fragment, useEffect } from 'react';

type User = {
    id: number;
    name: string;
};

type Plan = {
    id: number;
    name: string;
    price: number;
};

type EditTenantProps = {
    open: boolean;
    onClose: () => void;
    users: User[];
    plans: Plan[];
    tenant: {
        id: number;
        user: User;
        plan: Plan;
        created_at?: string;
    };
};

export default function EditTenant({ open, onClose, users, plans, tenant }: EditTenantProps) {
    const { data, setData, errors, processing, reset, post } = useForm({
        id: tenant.id.toString(),
        user_id: tenant.user?.id.toString() ?? '',
        plan_id: tenant.plan?.id.toString() ?? '',
    });

    useEffect(() => {
        if (tenant) {
            setData({
                id: tenant.id.toString(),
                user_id: tenant.user?.id.toString() ?? '',
                plan_id: tenant.plan?.id.toString() ?? '',
            });
        }
    }, [tenant, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.tenants.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
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
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-300">
                                    Edit Tenant
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <Input type={'hidden'} value={data.id} />

                                    <div>
                                        <Label htmlFor="userId" className="dark:text-slate-300">
                                            User
                                        </Label>
                                        <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)} disabled>
                                            <SelectTrigger id="userId" className="w-full dark:border-slate-700 dark:text-slate-300">
                                                <SelectValue placeholder="Select a user" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.user_id} />
                                    </div>

                                    <div>
                                        <Label htmlFor="planId" className="dark:text-slate-300">
                                            Assign Plan
                                        </Label>
                                        <Select value={data.plan_id} onValueChange={(value) => setData('plan_id', value)}>
                                            <SelectTrigger id="planId" className="w-full dark:border-slate-700 dark:text-slate-300">
                                                <SelectValue placeholder="Select a plan" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
                                                {plans.map((plan) => (
                                                    <SelectItem key={plan.id} value={plan.id.toString()}>
                                                        {plan.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.plan_id} />
                                    </div>

                                    <div className="mt-6 flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            onClick={onClose}
                                            className="rounded bg-gray-400 px-4 py-2 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className={'dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-600'}>
                                            {processing ? 'Updating...' : 'Update'}
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
