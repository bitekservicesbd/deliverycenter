import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import CentralLayout from '@/layouts/central-setting/centralLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { RefreshCcw, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';

export default function Index({ qrCodeSvg, secret, errors }) {
    const { auth } = usePage().props;
    const is2FAEnabled = !!auth?.user?.google2fa_secret;

    const [enabled, setEnabled] = useState(is2FAEnabled);

    const { data, setData, post, processing, recentlySuccessful, reset } = useForm({
        otp: '',
    });

    const handleEnable = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.settings.2fa.enable'), {
            onSuccess: () => {
                setEnabled(true);
                reset('otp');
            },
        });
    };

    const handleDisable = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('central.settings.2fa.disable'), {
            onSuccess: () => {
                setEnabled(false);
                reset('otp');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Two-Factor Authentication" />
            <CentralLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Two-Factor Authentication"
                        description="Scan the QR code with your authenticator app and enter the OTP below to enable 2FA."
                    />

                    {/* Switch Status */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-l font-medium text-gray-900 dark:text-white">Enable/Disable 2FA</h3>
                        <Label className="relative inline-flex cursor-pointer items-center">
                            <Input type="checkbox" checked={enabled} readOnly className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                        </Label>
                    </div>

                    {/* If already enabled - just show message */}
                    {enabled ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-600 dark:bg-black">
                            <ShieldCheck className="mr-2 inline-block" />
                            Two–Factor Authentication is already enabled.
                        </div>
                    ) : (
                        // If not enabled, show QR + enable form
                        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-black">
                            <p>
                                Set up your two factor authentication by scanning the barcode below. Alternatively, use this code:{' '}
                                <strong>{secret}</strong>
                            </p>

                            <div className="flex justify-center">
                                <img src={`data:image/svg+xml;base64,${qrCodeSvg}`} alt="QR Code" />
                            </div>

                            <form onSubmit={handleEnable} className="space-y-6">
                                <div>
                                    <Label htmlFor="otp">Enter OTP from App:</Label>
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        value={data.otp}
                                        onChange={(e) => setData('otp', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.otp} />
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    {recentlySuccessful && <p className="text-sm text-green-600">2FA enabled successfully!</p>}
                                    <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                        <RefreshCcw className={`h-4 w-4 ${processing ? 'animate-spin' : ''}`} />
                                        {processing ? 'Enabling...' : 'Enable 2FA'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Disable Form Only if Enabled */}
                    {enabled && (
                        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-black">
                            <p>
                                Please enter the <strong>OTP</strong> generated on your Authenticator App. Ensure you submit the current one because
                                it refreshes every 30 seconds.
                            </p>

                            <form onSubmit={handleDisable} className="space-y-6">
                                <div>
                                    <Label htmlFor="otp">Enter OTP to disable 2FA:</Label>
                                    <Input
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        value={data.otp}
                                        onChange={(e) => setData('otp', e.target.value)}
                                        placeholder="123456"
                                        required
                                    />
                                    <InputError message={errors.otp} />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    {recentlySuccessful && <p className="text-sm text-green-600">2FA disabled successfully!</p>}
                                    <Button type="submit" disabled={processing} className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500">
                                        <RefreshCcw className={`h-4 w-4 ${processing ? 'animate-spin' : ''}`} />
                                        {processing ? 'Disabling...' : 'Disable 2FA'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </CentralLayout>
        </AppLayout>
    );
}
