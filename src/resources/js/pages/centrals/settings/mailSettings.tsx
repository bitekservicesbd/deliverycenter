import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import CentralLayout from '@/layouts/central-setting/centralLayout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Mail Settings',
        href: route('central.settings.mail'),
    },
];

type MailSetting = {
    mail_driver: string;
    host: string;
    port: string;
    username: string;
    password?: string;
    encryption: string;
    mail_from_name: string;
    mail_from_address: string;
};
type MailSettingsProps = {
    setting?: MailSetting;
};
export default function MailSettings({
    setting = {
        mail_driver: '',
        host: '',
        port: '',
        username: '',
        encryption: '',
        mail_from_name: '',
        mail_from_address: '',
    },
}: MailSettingsProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        mail_driver: setting?.mail_driver ?? '',
        host: setting?.host ?? '',
        port: setting?.port ?? '',
        username: setting?.username ?? '',
        password: setting?.password ?? '',
        encryption: setting?.encryption ?? '',
        mail_from_name: setting?.mail_from_name ?? '',
        mail_from_address: setting?.mail_from_address ?? '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.settings.mail.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mail Settings" />
            <CentralLayout>
                <HeadingSmall title="Mail Settings" description="Configure how your application sends emails." />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Mail Driver */}
                        <div>
                            <Label htmlFor="mail_driver">Mail Driver</Label>
                            <Input
                                id="mail_driver"
                                name="mail_driver"
                                value={data.mail_driver}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="smtp"
                            />
                            <InputError message={errors.mail_driver} />
                        </div>

                        {/* Host */}
                        <div>
                            <Label htmlFor="host">SMTP Host</Label>
                            <Input
                                id="host"
                                name="host"
                                value={data.host}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="smtp.gmail.com"
                            />
                            <InputError message={errors.host} />
                        </div>

                        {/* Port */}
                        <div>
                            <Label htmlFor="port">Port</Label>
                            <Input
                                id="port"
                                name="port"
                                value={data.port}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="587"
                            />
                            <InputError message={errors.port} />
                        </div>

                        {/* Encryption */}
                        <div>
                            <Label htmlFor="encryption">Encryption</Label>
                            <Input
                                id="encryption"
                                name="encryption"
                                value={data.encryption}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="tls"
                            />
                            <InputError message={errors.encryption} />
                        </div>

                        {/* Username */}
                        <div>
                            <Label htmlFor="username">SMTP Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={data.username}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="user@gmail.com"
                            />
                            <InputError message={errors.username} />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">SMTP Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* From Name */}
                        <div>
                            <Label htmlFor="mail_from_name">From Name</Label>
                            <Input
                                id="mail_from_name"
                                name="mail_from_name"
                                value={data.mail_from_name}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="MyApp"
                            />
                            <InputError message={errors.mail_from_name} />
                        </div>

                        {/* From Address */}
                        <div>
                            <Label htmlFor="mail_from_address">From Address</Label>
                            <Input
                                id="mail_from_address"
                                name="mail_from_address"
                                value={data.mail_from_address}
                                onChange={handleInputChange}
                                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring"
                                placeholder="no-reply@myapp.com"
                            />
                            <InputError message={errors.mail_from_address} />
                        </div>
                    </div>

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
