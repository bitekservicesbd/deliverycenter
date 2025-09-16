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
        title: 'AWS Settings',
        href: route('central.settings.aws'),
    },
];

type AwsSettings = {
    aws_access_key_id?: string;
    aws_secret_access_key?: string;
    aws_default_region?: string;
    aws_bucket?: string;
    aws_url?: string;
};

type AwsSettingsProps = {
    setting?: AwsSettings;
};

export default function AwsSettings({ setting = {} }: AwsSettingsProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        aws_access_key_id: setting.aws_access_key_id ?? '',
        aws_secret_access_key: setting.aws_secret_access_key ?? '',
        aws_default_region: setting.aws_default_region ?? '',
        aws_bucket: setting.aws_bucket ?? '',
        aws_url: setting.aws_url ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.settings.aws.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AWS Settings" />
            <CentralLayout>
                <div className="space-y-6">
                    <HeadingSmall title="AWS Settings" description="Configure your AWS S3 bucket credentials." />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <section>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="aws_access_key_id">Access Key ID</Label>
                                    <Input
                                        id="aws_access_key_id"
                                        name="aws_access_key_id"
                                        value={data.aws_access_key_id}
                                        onChange={handleChange}
                                        className="w-full"
                                        placeholder="AKIAIOSFODNN7EXAMPLE"
                                    />
                                    <InputError message={errors.aws_access_key_id} />
                                </div>

                                <div>
                                    <Label htmlFor="aws_secret_access_key">Secret Access Key</Label>
                                    <Input
                                        id="aws_secret_access_key"
                                        name="aws_secret_access_key"
                                        value={data.aws_secret_access_key}
                                        onChange={handleChange}
                                        className="w-full"
                                        placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                                    />
                                    <InputError message={errors.aws_secret_access_key} />
                                </div>

                                <div>
                                    <Label htmlFor="aws_default_region">Default Region</Label>
                                    <Input
                                        id="aws_default_region"
                                        name="aws_default_region"
                                        value={data.aws_default_region}
                                        onChange={handleChange}
                                        className="w-full"
                                        placeholder="ap-south-1"
                                    />
                                    <InputError message={errors.aws_default_region} />
                                </div>

                                <div>
                                    <Label htmlFor="aws_bucket">Bucket Name</Label>
                                    <Input
                                        id="aws_bucket"
                                        name="aws_bucket"
                                        value={data.aws_bucket}
                                        onChange={handleChange}
                                        className="w-full"
                                        placeholder="aws bucket"
                                    />
                                    <InputError message={errors.aws_bucket} />
                                </div>

                                <div>
                                    <Label htmlFor="aws_url">AWS URL</Label>
                                    <Input
                                        id="aws_url"
                                        name="aws_url"
                                        type={'url'}
                                        value={data.aws_url}
                                        onChange={handleChange}
                                        className="w-full"
                                        placeholder="https..."
                                    />
                                    <InputError message={errors.aws_url} />
                                </div>
                            </div>
                        </section>

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
