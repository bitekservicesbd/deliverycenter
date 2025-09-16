import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CentralLayout from '@/layouts/CentralLayout';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DemoPage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        company_name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('demo.submit'), {
            onSuccess: () => {
                setData({
                    name: '',
                    company_name: '',
                    email: '',
                    phone: '',
                });
                toast.success('Form submitted successfully!');
            },
            onError: () => {
                toast.error('There was an issue submitting the form.');
            },
        });
    };

    return (
        <CentralLayout>
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
                <Head title="Book a Demo" />
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-multiply blur-xl filter"></div>
                </div>

                <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 py-20 text-white">
                    <div className="relative z-10 container mx-auto px-6">
                        <div className="flex max-w-3xl flex-col items-start">
                            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-600 to-red-500 px-4 py-2 text-sm font-semibold">
                                Book a Demo
                            </div>
                            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Unlock the Future of Efficient Courier & Warehousing Solutions</h1>
                            <p className="mb-8 text-xl text-gray-200">
                                In just a few minutes, you'll see why DeliveryCenter® is the leading provider of web-based TMS & WMS systems.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        {/* Left Column - Form */}
                        <div className="lg:w-1/2">
                            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    This demo is customized for <span className="text-blue-600 dark:text-blue-400">you</span>.
                                </h2>
                                <p className="mb-8 text-gray-600 dark:text-gray-300">
                                    Get answers to all of your questions & find out why DeliveryCenter is the right choice for your business.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <Label htmlFor="name" className="dark:text-gray-200">
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. John Smith"
                                                />
                                            </div>

                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Company Name */}
                                        <div>
                                            <Label htmlFor="company_name" className="dark:text-gray-200">
                                                Company Name
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="company_name"
                                                    name="company_name"
                                                    value={data.company_name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Delivery Center"
                                                />
                                            </div>
                                            <InputError message={errors.company_name} />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label htmlFor="email" className="dark:text-gray-200">
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    placeholder="e.g. info@example.com"
                                                />
                                            </div>

                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <Label htmlFor="phone" className="dark:text-gray-200">
                                                Phone Number
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={data.phone}
                                                    onChange={handleChange}
                                                    placeholder="e.g. +1-234-567-8900"
                                                />
                                            </div>

                                            <InputError message={errors.phone} />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            {processing ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:w-1/2">
                            <div className="mb-10">
                                <img
                                    src="/images/dashboard-preview.png"
                                    alt="DeliveryCenter Dashboard"
                                    className="w-full rounded-xl shadow-lg dark:shadow-none"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/800x500/e2e8f0/64748b?text=DeliveryCenter+Dashboard';
                                    }}
                                />
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">Why choose DeliveryCenter?</h3>

                                <div className="space-y-4">
                                    {[
                                        'Comprehensive TMS & WMS solution designed specifically for courier and warehousing operations',
                                        'Real-time tracking and analytics to optimize your delivery operations',
                                        'Mobile apps for drivers and warehouse staff to streamline workflows',
                                        'Customizable to fit your specific business requirements',
                                    ].map((text, idx) => (
                                        <div key={idx} className="flex items-start">
                                            <div className="mt-1 flex-shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-700 dark:text-gray-300">{text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CentralLayout>
    );
}
