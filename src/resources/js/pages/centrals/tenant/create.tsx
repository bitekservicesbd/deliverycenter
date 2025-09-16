import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { Fragment } from 'react';

type User = {
    id: number;
    name: string;
};
type Plan = {
    id: number;
    name: string;
    price: number;
};
type CreateTenantProps = {
    open: boolean;
    onClose: () => void;
    users: User[];
    plans: Plan[];
};

export default function CreateTenant({ open, onClose, users, plans }: CreateTenantProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        user_id: '',
        plan_id: '',
    });

    const formSubmit = (e: React.FormEvent) => {
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
            <Dialog
                as="div"
                className="relative z-50"
                // onClose={onClose}
                onClose={() => {}}
            >
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Create New Tenant
                                </Dialog.Title>

                                <div className="mt-4">
                                    <form onSubmit={formSubmit} className="space-y-4">
                                        <div>
                                            <Label className="dark:text-gray-300">Tenant Domain Name</Label>
                                            <Input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-slate-600 dark:text-white"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div>
                                            <Label className="text-gray-700 dark:text-gray-300">Assign User</Label>
                                            <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)}>
                                                <SelectTrigger className="w-full border border-gray-300 dark:border-slate-700 dark:text-gray-200">
                                                    <SelectValue placeholder="Select a user" className="dark:text-gray-300" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-black dark:text-gray-200">
                                                    {(users ?? []).map((user) => (
                                                        <SelectItem
                                                            key={user.id}
                                                            value={user.id.toString()}
                                                            className="hover:bg-gray-00 dark:hover:bg-gray-700"
                                                        >
                                                            {user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.user_id} />
                                        </div>

                                        <div>
                                            <Label className="text-gray-700 dark:text-gray-300">Assign Plan</Label>
                                            <Select value={data.plan_id} onValueChange={(value) => setData('plan_id', value)}>
                                                <SelectTrigger className="w-full border border-gray-300 dark:border-slate-700 dark:text-gray-200">
                                                    <SelectValue placeholder="Select a plan" className="dark:text-gray-300" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-black dark:text-gray-200">
                                                    {(plans ?? []).map((plan) => (
                                                        <SelectItem
                                                            key={plan.id}
                                                            value={plan.id.toString()}
                                                            className="hover:bg-gray-00 dark:hover:bg-gray-700"
                                                        >
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
                                            <Button className={'dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-600'}>
                                                {processing ? 'Saving...' : 'Save'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
