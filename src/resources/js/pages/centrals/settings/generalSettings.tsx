import { Head, useForm } from '@inertiajs/react';
import { RefreshCcw, Upload, X } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import CentralLayout from '@/layouts/central-setting/centralLayout';
import type { BreadcrumbItem } from '@/types';

// Types
interface Setting {
    [key: string]: string | File | null | undefined;
    app_name: string;
    author_name: string;
    app_email: string;
    app_phone: string;
    app_logo: File | string | null;
    dark_logo: File | string | null;
    favicon: File | string | null;
    footer_copyright_text: string;
}

interface GeneralSettingsProps {
    setting?: Partial<Setting>;
    routes: {
        update: string;
    };
}

// Main Component
export default function GeneralSettings({ setting = {} }: GeneralSettingsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'General settings',
            href: '/settings/general',
        },
    ];

    // Initialize form data with defaults
    const initialData: Setting = {
        app_name: setting?.app_name || '',
        author_name: setting?.author_name || '',
        app_email: setting?.app_email || '',
        app_phone: setting?.app_phone || '',
        app_logo: setting?.app_logo || null,
        dark_logo: setting?.dark_logo || null,
        favicon: setting?.favicon || null,
        footer_copyright_text: setting?.footer_copyright_text || '',
    };

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm(initialData);

    // State for file previews
    const [previews, setPreviews] = useState<{
        app_logo: File | string | null;
        dark_logo: File | string | null;
        favicon: File | string | null;
    }>({
        app_logo: typeof setting?.app_logo === 'string' ? setting.app_logo : null,
        dark_logo: typeof setting?.dark_logo === 'string' ? setting.dark_logo : null,
        favicon: typeof setting?.favicon === 'string' ? setting.favicon : null,
    });

    // Handle text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof Setting, value);
    };

    // Handle file input changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'app_logo' | 'dark_logo' | 'favicon') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 5MB.');
            return;
        }

        setData(fieldName, file);
        setPreviews((prev) => ({ ...prev, [fieldName]: file }));
    };

    // Remove file preview
    const handleRemovePreview = (fieldName: 'app_logo' | 'dark_logo' | 'favicon') => {
        setData(fieldName, null);
        setPreviews((prev) => ({ ...prev, [fieldName]: null }));
    };

    // Handle form submission
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        post(route('central.settings.general.update'), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="General Settings" />

            <CentralLayout>
                <div className="space-y-6">
                    <HeadingSmall title="General Settings" description="Update your application's general configurations and branding." />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <section className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Application Name */}
                                <div className="space-y-2">
                                    <Label>Application Name</Label>
                                    <Input
                                        id="app_name"
                                        name="app_name"
                                        type="text"
                                        value={data.app_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter application name"
                                        required
                                        className={errors.app_name ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    <InputError message={errors.app_name} />
                                </div>

                                {/* Author Name */}
                                <div className="space-y-2">
                                    <Label>Author Name</Label>
                                    <Input
                                        id="author_name"
                                        name="author_name"
                                        type="text"
                                        value={data.author_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter author name"
                                        required
                                        className={errors.author_name ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    <InputError message={errors.author_name} />
                                </div>

                                {/* Application Email */}
                                <div className="space-y-2">
                                    <Label>Application Email</Label>
                                    <Input
                                        id="app_email"
                                        name="app_email"
                                        type="email"
                                        value={data.app_email}
                                        onChange={handleInputChange}
                                        placeholder="Enter application email"
                                        required
                                        className={errors.app_email ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    <InputError message={errors.app_email} />
                                </div>

                                {/* Application Phone */}
                                <div className="space-y-2">
                                    <Label>Application Phone</Label>
                                    <Input
                                        id="app_phone"
                                        name="app_phone"
                                        type="tel"
                                        value={data.app_phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter application phone"
                                        className={errors.app_phone ? 'border-red-500 focus:border-red-500' : ''}
                                    />
                                    <InputError message={errors.app_phone} />
                                </div>
                            </div>
                        </section>

                        {/* Branding */}
                        <section className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Branding</h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Application Logo */}
                                <div className="space-y-2">
                                    <Label htmlFor="app_logo">Application Logo</Label>

                                    {previews.app_logo && (
                                        <div className="relative">
                                            <img
                                                src={
                                                    typeof previews.app_logo === 'string' ? previews.app_logo : URL.createObjectURL(previews.app_logo)
                                                }
                                                alt="Application Logo"
                                                className="mt-2 h-20 rounded-lg border object-cover shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePreview('app_logo')}
                                                className="absolute -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('app_logo')?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Choose File
                                        </Button>

                                        <input
                                            id="app_logo"
                                            name="app_logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'app_logo')}
                                            className="hidden"
                                        />
                                    </div>

                                    <InputError message={errors.app_logo} />
                                </div>

                                {/* Application Logo */}
                                <div className="space-y-2">
                                    <Label htmlFor="dark_logo">Dark Logo</Label>

                                    {previews.dark_logo && (
                                        <div className="relative">
                                            <img
                                                src={
                                                    typeof previews.dark_logo === 'string'
                                                        ? previews.dark_logo
                                                        : URL.createObjectURL(previews.dark_logo)
                                                }
                                                alt="Dark Logo"
                                                className="mt-2 h-20 rounded-lg border object-cover shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePreview('dark_logo')}
                                                className="absolute -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('dark_logo')?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Choose File
                                        </Button>

                                        <input
                                            id="dark_logo"
                                            name="dark_logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'dark_logo')}
                                            className="hidden"
                                        />
                                    </div>

                                    <InputError message={errors.dark_logo} />
                                </div>

                                {/* Favicon */}
                                <div className="space-y-2">
                                    <Label htmlFor="favicon">Favicon</Label>

                                    {previews.favicon && (
                                        <div className="relative">
                                            <img
                                                src={typeof previews.favicon === 'string' ? previews.favicon : URL.createObjectURL(previews.favicon)}
                                                alt="Favicon"
                                                className="mt-2 h-20 rounded-lg border object-cover shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePreview('favicon')}
                                                className="absolute -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('favicon')?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Choose File
                                        </Button>

                                        <input
                                            id="favicon"
                                            name="favicon"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'favicon')}
                                            className="hidden"
                                        />
                                    </div>

                                    <InputError message={errors.favicon} />
                                </div>
                            </div>
                        </section>

                        {/* Footer Settings */}
                        <section className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Footer Settings</h3>

                            <div className="space-y-2">
                                <Label htmlFor="footer_copyright_text">Copyright Text</Label>
                                <Textarea
                                    id="footer_copyright_text"
                                    name="footer_copyright_text"
                                    value={data.footer_copyright_text}
                                    onChange={handleInputChange}
                                    placeholder="Enter footer copyright text"
                                    rows={3}
                                    className={errors.footer_copyright_text ? 'border-red-500 focus:border-red-500' : ''}
                                />
                                <InputError message={errors.footer_copyright_text} />
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
