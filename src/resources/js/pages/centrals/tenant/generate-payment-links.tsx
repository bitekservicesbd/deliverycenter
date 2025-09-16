import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { AlertCircle, CheckCircle, Copy, CreditCard, ExternalLink, Mail } from 'lucide-react';
import { Fragment, useState } from 'react';

type Tenant = {
    id: string;
    company_name: string;
    user: {
        name: string;
        email: string;
    };
    plan: {
        name: string;
        formatted_price?: string;
    };
    status: string;
    payment_status: string;
};

type PaymentLinkData = {
    checkout_url: string;
    amount: string;
    currency: string;
    [key: string]: unknown;
};

type GeneratePaymentLinkProps = {
    open: boolean;
    onClose: () => void;
    tenant: Tenant;
    onSuccess?: () => void;
};

export default function GeneratePaymentLinkModal({ open, onClose, tenant, onSuccess }: GeneratePaymentLinkProps) {
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [linkData, setLinkData] = useState<PaymentLinkData | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, reset } = useForm({
        type: 'payment_due_today',
    });

    const reminderTypes = [
        {
            value: 'payment_due_soon',
            label: 'Payment Due Soon (3 days notice)',
            description: 'Friendly reminder for upcoming payment',
            urgency: 'low',
        },
        {
            value: 'payment_due_today',
            label: 'Payment Due Today',
            description: 'Payment is due today',
            urgency: 'medium',
        },
        {
            value: 'payment_overdue',
            label: 'Payment Overdue',
            description: 'Payment is past due',
            urgency: 'high',
        },
        {
            value: 'trial_ending',
            label: 'Trial Ending Soon',
            description: 'Trial period is ending',
            urgency: 'medium',
        },
        {
            value: 'final_warning',
            label: 'Final Warning',
            description: 'Last notice before suspension',
            urgency: 'critical',
        },
    ];

    const generatePaymentLink = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post(route('central.tenants.generate-payment-link', tenant.id), { type: data.type });

            const result = response.data;
            console.log(result);

            if (result.success) {
                setGeneratedLink(result.data.checkout_url);
                setLinkData(result.data);
            } else {
                alert(result.message || 'Failed to generate payment link');
            }
        } catch (err) {
            console.error('Error generating payment link:', err);
            alert('Failed to generate payment link');
        } finally {
            setIsGenerating(false);
        }
    };

    const sendEmailReminder = () => {
        setIsSendingEmail(true);
        post(route('central.tenants.send-payment-reminder', tenant.id), {
            data: { type: data.type },
            onSuccess: () => {
                setEmailSent(true);
                setIsSendingEmail(false);
                if (onSuccess) onSuccess();
            },
            onError: () => {
                setIsSendingEmail(false);
                alert('Failed to send email reminder');
            },
        });
    };

    const copyToClipboard = async () => {
        if (generatedLink) {
            try {
                await navigator.clipboard.writeText(generatedLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (_err) {
                const textArea = document.createElement('textarea');
                textArea.value = generatedLink;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                console.log(_err);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    const handleClose = () => {
        reset();
        setGeneratedLink(null);
        setLinkData(null);
        setEmailSent(false);
        setCopied(false);
        onClose();
    };

    const selectedType = reminderTypes.find((type) => type.value === data.type);
    const urgencyColors = {
        low: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900 dark:border-blue-800',
        medium: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900 dark:border-yellow-800',
        high: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900 dark:border-orange-800',
        critical: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900 dark:border-red-800',
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                // onClose={handleClose}
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
                                <Dialog.Title className="mb-6 text-xl leading-6 font-semibold text-gray-900 dark:text-gray-100">
                                    Generate Payment Link
                                </Dialog.Title>

                                {/* Tenant Info */}
                                <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{tenant.company_name}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {tenant.user.name} • {tenant.user.email}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{tenant.plan.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    tenant.payment_status === 'paid'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                                                        : tenant.payment_status === 'overdue'
                                                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                                                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400'
                                                }`}
                                            >
                                                {tenant.payment_status.charAt(0).toUpperCase() + tenant.payment_status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {!generatedLink ? (
                                    <>
                                        {/* Reminder Type Selection */}
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="reminder-type" className="dark:text-gray-300">
                                                    Reminder Type
                                                </Label>
                                                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                                    <SelectTrigger className="mt-1 dark:bg-slate-700 dark:text-gray-300">
                                                        <SelectValue placeholder="Select reminder type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="dark:bg-slate-700 dark:text-gray-300">
                                                        {reminderTypes.map((type) => (
                                                            <SelectItem
                                                                key={type.value}
                                                                value={type.value}
                                                                className="dark:bg-slate-700 dark:text-gray-300"
                                                            >
                                                                <div className="flex w-full items-center justify-between">
                                                                    <div>
                                                                        <div className="font-medium dark:text-gray-200">{type.label}</div>
                                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                                            {type.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Selected Type Preview */}
                                            {selectedType && (
                                                <div
                                                    className={`rounded-lg border p-3 ${urgencyColors[selectedType.urgency as keyof typeof urgencyColors]}`}
                                                >
                                                    <div className="flex items-center">
                                                        <AlertCircle className="mr-2 h-4 w-4" />
                                                        <div>
                                                            <p className="font-medium">{selectedType.label}</p>
                                                            <p className="text-sm">{selectedType.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Generate Button */}
                                            <div className="flex justify-center pt-4">
                                                <Button
                                                    onClick={generatePaymentLink}
                                                    disabled={isGenerating}
                                                    className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                            Generating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CreditCard className="mr-2 h-4 w-4" />
                                                            Generate Stripe Payment Link
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Generated Link Display */}
                                        <div className="space-y-6">
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900">
                                                <div className="mb-2 flex items-center">
                                                    <CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                                                    <h4 className="font-medium text-green-900 dark:text-green-200">
                                                        Payment Link Generated Successfully!
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-green-700 dark:text-green-300">
                                                    The secure Stripe payment link is ready to use.
                                                </p>
                                            </div>

                                            {/* Payment Details */}
                                            {linkData && (
                                                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                                                    <h5 className="mb-3 font-medium text-slate-900 dark:text-slate-100">Payment Details</h5>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-slate-600 dark:text-slate-400">Amount:</span>
                                                            <span className="ml-2 font-medium">
                                                                {linkData.amount} {linkData.currency}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-600 dark:text-slate-400">Plan:</span>
                                                            <span className="ml-2 font-medium">{tenant.plan.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Payment Link */}
                                            <div>
                                                <Label className="dark:text-gray-300">Secure Payment Link</Label>
                                                <div className="mt-1 flex">
                                                    <input
                                                        type="text"
                                                        value={generatedLink}
                                                        readOnly
                                                        className="min-w-0 flex-1 rounded-l-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-700 dark:text-white"
                                                    />
                                                    <Button
                                                        onClick={copyToClipboard}
                                                        variant="outline"
                                                        className="rounded-l-none border-l-0 dark:border-slate-700 dark:text-gray-300"
                                                    >
                                                        {copied ? (
                                                            <>
                                                                <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                                                                Copied!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="mr-1 h-4 w-4" />
                                                                Copy
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <Button
                                                    onClick={() => window.open(generatedLink, '_blank')}
                                                    variant="outline"
                                                    className="flex-1 dark:border-slate-700 dark:text-gray-300"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Preview Payment Page
                                                </Button>

                                                <Button
                                                    onClick={sendEmailReminder}
                                                    disabled={isSendingEmail || emailSent}
                                                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                                                >
                                                    {isSendingEmail ? (
                                                        <>
                                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                                            Sending...
                                                        </>
                                                    ) : emailSent ? (
                                                        <>
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Email Sent!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            Send Email to Customer
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                            {emailSent && (
                                                <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900">
                                                    <p className="text-sm text-green-700 dark:text-green-300">
                                                        ✅ Payment reminder email sent successfully to {tenant.user.email}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Footer */}
                                <div className="mt-6 flex justify-end gap-3 border-t pt-6 dark:border-slate-700">
                                    {!generatedLink ? (
                                        <Button
                                            type="button"
                                            onClick={handleClose}
                                            variant="outline"
                                            className="dark:border-slate-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={handleClose}
                                            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800"
                                        >
                                            Done
                                        </Button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
