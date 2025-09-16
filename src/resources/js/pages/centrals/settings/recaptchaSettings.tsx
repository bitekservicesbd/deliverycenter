import { Head, useForm } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';
import React from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import CentralLayout from '@/layouts/central-setting/centralLayout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'recaptcha Settings',
        href: '/settings/recaptchaSettings',
    },
];

type RecaptchaSettings = {
    recaptcha_site_key?: string;
    recaptcha_secret_key?: string;
    recaptcha_status?: boolean;
};

type RecaptchaSettingsProps = {
    setting?: RecaptchaSettings;
};

export default function RecaptchaSettings({ setting = {} }: RecaptchaSettingsProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        recaptcha_site_key: setting?.recaptcha_site_key ?? '',
        recaptcha_secret_key: setting?.recaptcha_secret_key ?? '',
        recaptcha_status: setting?.recaptcha_status ?? false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setData(name as keyof typeof data, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.settings.recaptcha.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recaptcha Settings" />
            <CentralLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Recaptcha Settings" description="Configure Google recaptcha to enhance security against spam and abuse." />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <section>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Site Key */}
                                <div>
                                    <Label htmlFor="recaptcha_site_key">Site Key</Label>
                                    <Input
                                        id="recaptcha_site_key"
                                        name="recaptcha_site_key"
                                        value={data.recaptcha_site_key}
                                        onChange={handleChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring focus:outline-none"
                                        placeholder="6LeIxAcTAAAAAJcZVd..."
                                    />
                                    <InputError message={errors.recaptcha_site_key} />
                                </div>

                                {/* Secret Key */}
                                <div>
                                    <Label htmlFor="recaptcha_secret_key">Secret Key</Label>
                                    <Input
                                        id="recaptcha_secret_key"
                                        name="recaptcha_secret_key"
                                        value={data.recaptcha_secret_key}
                                        onChange={handleChange}
                                        className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring focus:outline-none"
                                        placeholder="6LeIxAcTAAAAAGG-flmRsE..."
                                    />
                                    <InputError message={errors.recaptcha_secret_key} />
                                </div>

                                {/* Enable reCAPTCHA */}
                                <div className="mt-2 flex items-center space-x-3">
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <Input
                                            id="recaptcha_status"
                                            name="recaptcha_status"
                                            type="checkbox"
                                            checked={data.recaptcha_status}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-green-500"></div>
                                        <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-5"></div>
                                    </label>
                                    <Label htmlFor="recaptcha_status" className="text-sm text-gray-700">
                                        Enable Recaptcha
                                    </Label>
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
                </div>
            </CentralLayout>
        </AppLayout>
    );
}
