import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { Fragment } from 'react';

type CreateUserProps = {
    open: boolean;
    onClose: () => void;
};

export default function CreateUser({ open, onClose }: CreateUserProps) {
    const { data, setData, post, errors, processing, reset } = useForm({
        username: '',
        name: '',
        email: '',
        company_name: '',
    });

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.tenant.users.store'), {
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-300">
                                    Create New User
                                </Dialog.Title>

                                <div className="mt-4">
                                    <form onSubmit={formSubmit} className="space-y-3">
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
                                            <Label className="dark:text-slate-300">Company Name</Label>
                                            <Input
                                                type="text"
                                                value={data.company_name}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                                className="dark:border-slate-700 dark:text-slate-300"
                                            />
                                            <InputError message={errors.company_name} />
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

                                        <div className="mt-6 flex justify-end gap-2">
                                            <Button type="button" onClick={onClose} className="rounded bg-gray-400 px-4 py-2">
                                                Cancel
                                            </Button>
                                            <Button className={'dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800'}>
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
