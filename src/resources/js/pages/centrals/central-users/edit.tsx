import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { Fragment, useEffect } from 'react';

type EditUserProps = {
    open: boolean;
    onClose: () => void;
    user?: {
        id: number;
        username: string;
        name: string;
        email: string;
        status: UserStatus;
    } | null;
};
type UserStatus = 'active' | 'inactive' | 'blocked';
export default function EditUser({ open, onClose, user }: EditUserProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        id: user?.id || '',
        username: user?.username || '',
        name: user?.name || '',
        email: user?.email || '',
        status: user?.status || 'active',
    });

    useEffect(() => {
        if (user) {
            setData({
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                status: user?.status || 'active',
            });
        } else {
            reset();
        }
    }, [user, setData, reset]);

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.users.store'), {
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
                    <div className="fixed inset-0 bg-black/50 opacity-75" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-300">
                                    {user ? 'Edit User' : 'Create User'}
                                </Dialog.Title>

                                <div className="mt-4">
                                    <form onSubmit={formSubmit} className="space-y-3">
                                        <Input type="hidden" value={data.id} name="id" />
                                        <div>
                                            <Label className="dark:text-slate-300">Username</Label>
                                            <Input
                                                type="text"
                                                value={data.username}
                                                onChange={(e) => setData('username', e.target.value)}
                                                className="dark:border-slate-700 dark:text-slate-300"
                                            />
                                            <InputError message={errors.username} />
                                        </div>

                                        <div>
                                            <Label className="dark:text-slate-300">Name</Label>
                                            <Input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="dark:border-slate-700 dark:text-slate-300"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div>
                                            <Label className="dark:text-slate-300">Email</Label>
                                            <Input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="dark:border-slate-700 dark:text-slate-300"
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div>
                                            <Label htmlFor="status">Status</Label>
                                            <Select value={data.status} onValueChange={(value: UserStatus) => setData('status', value)}>
                                                <SelectTrigger id="status" className="w-full dark:border-slate-700 dark:text-slate-300">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                    <SelectItem value="blocked">Blocked</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} />
                                        </div>
                                        <div className="mt-6 flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    reset();
                                                    onClose();
                                                }}
                                                className="rounded bg-gray-500 px-4 py-2"
                                            >
                                                Cancel
                                            </Button>
                                            <Button className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800">
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
