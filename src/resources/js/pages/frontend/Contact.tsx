import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CentralLayout from '@/layouts/CentralLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Clock, Globe, Mail, MapPin, Phone, Send, Shield, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ModernContactPage() {
    const [isVisible, setIsVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <CentralLayout>
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
                <Head title={'Contact'} />
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-multiply blur-xl filter"></div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 bg-white py-20 shadow-sm transition-colors duration-500 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div
                            className={`text-center transition-all delay-300 duration-1000 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            <div className="mb-4">
                                <span className="font-semibold text-blue-600">Get In Touch</span>
                            </div>
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl dark:text-white">Contact Us</h1>
                            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                                Ready to transform your logistics operations? Let's discuss how DeliveryCenter can help your business grow.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section
                    className={`relative z-10 container mx-auto bg-white px-6 py-16 transition-all delay-500 duration-1000 dark:bg-gray-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: <Phone className="h-8 w-8" />,
                                title: 'Phone',
                                info: '+1 (555) 123-4567',
                                subInfo: 'Mon-Fri 9AM-6PM EST',
                                color: 'from-blue-500 to-indigo-500',
                            },
                            {
                                icon: <Mail className="h-8 w-8" />,
                                title: 'Email',
                                info: 'contact@deliverycenter.com',
                                subInfo: 'We reply within 24 hours',
                                color: 'from-indigo-500 to-purple-500',
                            },
                            {
                                icon: <MapPin className="h-8 w-8" />,
                                title: 'Office',
                                info: '123 Business Ave',
                                subInfo: 'New York, NY 10001',
                                color: 'from-purple-500 to-blue-500',
                            },
                            {
                                icon: <Clock className="h-8 w-8" />,
                                title: 'Support',
                                info: '24/7 Available',
                                subInfo: 'Round-the-clock assistance',
                                color: 'from-blue-600 to-indigo-600',
                            },
                        ].map((contact, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-black/30"
                            >
                                <div
                                    className={`h-16 w-16 bg-gradient-to-r ${contact.color} mx-auto mb-4 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <div className="text-white">{contact.icon}</div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{contact.title}</h3>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{contact.info}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.subInfo}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form & Info Section */}
                <section className="relative z-10 bg-white py-16 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div
                                className={`transition-all delay-700 duration-1000 ${
                                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                }`}
                            >
                                <div className="rounded-2xl bg-gray-50 p-8 shadow-lg dark:bg-gray-800 dark:shadow-black/30">
                                    <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Full Name</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={handleInputChange}
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                                <InputError message={errors.name} />
                                            </div>
                                            <div>
                                                <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Email Address</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={handleInputChange}
                                                        placeholder="john@company.com"
                                                        required
                                                    />
                                                </div>
                                                <InputError message={errors.email} />
                                            </div>
                                        </div>

                                        {/* Company & Phone */}
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Company</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        name="company"
                                                        value={data.company}
                                                        onChange={handleInputChange}
                                                        placeholder="Your Company"
                                                    />
                                                </div>
                                                <InputError message={errors.company} />
                                            </div>
                                            <div>
                                                <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Phone Number</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="tel"
                                                        name="phone"
                                                        value={data.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+1 (555) 123-4567"
                                                    />
                                                </div>
                                                <InputError message={errors.phone} />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Subject</Label>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    name="subject"
                                                    value={data.subject}
                                                    onChange={handleInputChange}
                                                    placeholder="How can we help you?"
                                                    required
                                                />
                                            </div>
                                            <InputError message={errors.subject} />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <Label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">Message</Label>
                                            <Textarea
                                                name="message"
                                                value={data.message}
                                                onChange={handleInputChange}
                                                rows={5}
                                                placeholder="Tell us more about your logistics needs..."
                                                required
                                            ></Textarea>
                                            <InputError message={errors.message} />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`group flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 ${
                                                processing ? 'cursor-not-allowed opacity-50' : ''
                                            }`}
                                        >
                                            <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            {processing ? 'Submitting...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div
                                className={`transition-all delay-900 duration-1000 ${
                                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                }`}
                            >
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Why Choose DeliveryCenter?</h2>
                                        <div className="space-y-6">
                                            {[
                                                {
                                                    icon: <Shield className="h-6 w-6" />,
                                                    title: 'Trusted by 5000+ Companies',
                                                    description: 'Join thousands of businesses that trust DeliveryCenter for their logistics needs.',
                                                },
                                                {
                                                    icon: <Clock className="h-6 w-6" />,
                                                    title: '24/7 Support',
                                                    description: 'Our expert support team is available around the clock to assist you.',
                                                },
                                                {
                                                    icon: <Globe className="h-6 w-6" />,
                                                    title: 'Global Reach',
                                                    description:
                                                        'Manage your logistics operations anywhere in the world with our cloud-based platform.',
                                                },
                                                {
                                                    icon: <Zap className="h-6 w-6" />,
                                                    title: 'Fast Implementation',
                                                    description: 'Get up and running quickly with our streamlined onboarding process.',
                                                },
                                            ].map((benefit, index) => (
                                                <div key={index} className="flex items-start space-x-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                                                        <div className="text-white">{benefit.icon}</div>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                                                        <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:border-blue-600 dark:from-gray-800 dark:to-gray-700">
                                        <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h3>
                                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                                            Schedule a 14-minute strategy session to see how DeliveryCenter can transform your logistics operations.
                                        </p>
                                        <button
                                            onClick={() => router.visit('/demo')}
                                            className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            Book Demo Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative z-10 bg-white py-16 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Frequently Asked Questions</h2>
                            <p className="text-gray-600 dark:text-gray-300">Quick answers to common questions about DeliveryCenter</p>
                        </div>

                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                            {[
                                {
                                    question: 'How quickly can we implement DeliveryCenter?',
                                    answer: 'Most customers are up and running within 1-2 weeks. Our streamlined onboarding process and dedicated support team ensure a smooth transition.',
                                },
                                {
                                    question: 'Is training provided for our team?',
                                    answer: 'Yes! We provide comprehensive training for your team, including video tutorials, documentation, and live training sessions with our experts.',
                                },
                                {
                                    question: 'Can DeliveryCenter integrate with our existing systems?',
                                    answer: 'Absolutely. DeliveryCenter offers robust API integrations and can connect with most popular business systems, including ERPs, accounting software, and e-commerce platforms.',
                                },
                                {
                                    question: 'What kind of support do you offer?',
                                    answer: 'We provide 24/7 support through multiple channels including phone, email, and live chat. Our expert support team is always ready to help.',
                                },
                                {
                                    question: 'Is there a mobile app for drivers?',
                                    answer: 'Yes, DeliveryCenter Driver is available for both iOS and Android devices, providing drivers with all the tools they need for efficient deliveries.',
                                },
                                {
                                    question: 'Can we customize the platform for our specific needs?',
                                    answer: 'Definitely! DeliveryCenter is highly customizable and can be tailored to fit your specific business requirements and workflows.',
                                },
                            ].map((faq, index) => (
                                <div key={index} className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </CentralLayout>
    );
}
