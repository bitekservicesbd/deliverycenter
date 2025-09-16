import CentralLayout from '@/layouts/CentralLayout';
import { Head, router } from '@inertiajs/react';
import { ActivitySquare, ArrowRight, Box, Check, MapPinned, PackageSearch, Settings, Shield, Sparkles, Truck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <CentralLayout>
            <div className="min-h-screen overflow-hidden text-gray-900">
                <Head title="Home" />
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-multiply blur-xl filter"></div>
                </div>
                {/* Hero Section */}
                <section className="relative z-10 container mx-auto mt-5 px-6 py-12 dark:bg-gray-900">
                    <div className="flex min-h-[70vh] flex-col items-center justify-between lg:flex-row">
                        {/* Left Content */}
                        <div
                            className={`transition-all delay-300 duration-1000 lg:w-1/2 ${
                                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
                        >
                            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-6xl">
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                    One Suite For All Your
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">Logistics Needs</span>
                            </h1>

                            <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-white">
                                Unifying Your Courier & Logistics Operations with
                                <br />
                                Comprehensive Software Solutions d
                            </p>

                            <p className="mb-8 text-gray-500 dark:text-white">Join a fast-growing community of 5000+ users</p>

                            <button
                                onClick={() => router.visit('/demo')}
                                className="group flex transform cursor-pointer items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                            >
                                <span className="mr-2">Learn More</span>
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        {/* Right Content - Laptop Mockups */}
                        <div
                            className={`mt-12 transition-all delay-500 duration-1000 lg:mt-0 lg:w-1/2 ${
                                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                            }`}
                        >
                            <div className="relative">
                                <img src="https://i0.wp.com/deliverysuite.com/wp-content/uploads/2023/05/CTA_devices.png?w=1020&ssl=1" alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    className={`relative z-10 container mx-auto mt-5 px-6 py-16 transition-all delay-700 duration-1000 dark:bg-gray-900 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-3xl dark:text-white">How DeliveryCenter® Can Improve Your...</h2>
                    </div>

                    {/* Adjusted grid to show 2 columns on small screens */}
                    <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 dark:text-white">
                        {[
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: 'Automation',
                                color: 'from-blue-500 to-indigo-500',
                            },
                            {
                                icon: <Settings className="h-8 w-8" />,
                                title: 'Optimization',
                                color: 'from-indigo-500 to-purple-500',
                            },
                            {
                                icon: <Shield className="h-8 w-8" />,
                                title: 'Reliability',
                                color: 'from-purple-500 to-blue-500',
                            },
                            {
                                icon: <Sparkles className="h-8 w-8" />,
                                title: 'Integrations',
                                color: 'from-blue-600 to-indigo-600',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="group text-center">
                                <div
                                    className={`h-20 w-20 bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process Section */}
                <section className="relative z-10 mt-5 bg-white py-16 dark:bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
                            {/* Left Content */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                    Seamless Automation for Streamlined Operations
                                </h2>
                                <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                                    Embrace the future of logistics with DeliveryCenter® seamless automation. Our advanced platform revolutionizes
                                    your delivery processes by eliminating manual inefficiencies. From dynamic route optimization to intelligent task
                                    assignment, our automation streamlines every step, ensuring optimal resource allocation and enhanced customer
                                    satisfaction. With DeliveryCenter® automation, you can focus on delivering excellence while we handle the rest.
                                </p>
                                <button
                                    onClick={() => router.visit('/demo')}
                                    className="transform cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
                                >
                                    Book a Demo
                                </button>
                            </div>

                            {/* Right Content - Animation */}
                            <div className="flex w-full justify-center lg:w-1/2">
                                <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                                    {/* Background circle */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800"></div>

                                    {/* Central Truck Icon */}
                                    <div className="absolute top-1/2 left-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                                        <Truck className="h-16 w-16 text-white" />
                                    </div>

                                    {/* Floating Elements */}

                                    <div className="animate-float absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 shadow-lg dark:bg-blue-600">
                                        <PackageSearch className="h-5 w-5 text-white" />
                                    </div>

                                    <div className="animate-float animation-delay-1000 absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 shadow-lg dark:bg-indigo-600">
                                        <MapPinned className="h-5 w-5 text-white" />
                                    </div>

                                    <div className="animate-float animation-delay-2000 absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 shadow-lg dark:bg-purple-600">
                                        <Box className="h-5 w-5 text-white" />
                                    </div>

                                    <div className="animate-float animation-delay-3000 absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg dark:bg-blue-700">
                                        <ActivitySquare className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Section */}
                <section className="relative z-10 mt-5 bg-white py-16 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
                            {/* Text Content */}
                            <div className="w-full lg:w-1/2">
                                <div className="mb-4">
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">INTERESTED?</span>
                                </div>
                                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Schedule a Demo</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-300">
                                    Experience our comprehensive logistics software in action. UNLOCK fast savings, cost reductions, and complete
                                    visibility, empowering you to take control of your transportation.
                                </p>

                                <div className="mb-6 space-y-3">
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700 dark:text-gray-200">Web-Based</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700 dark:text-gray-200">24/7 Support</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700 dark:text-gray-200">Highly Customizable</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.visit('/demo')}
                                    className="transform cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
                                >
                                    Get Started
                                </button>
                            </div>

                            {/* Image Content */}
                            <div className="flex w-full justify-center lg:w-1/2">
                                <div className="relative w-full max-w-md">
                                    <img
                                        src="https://i0.wp.com/deliverysuite.com/wp-content/uploads/2023/05/CTA_devices.png?w=1020&ssl=1"
                                        alt="Delivery software demo devices"
                                        className="h-auto w-full object-contain dark:brightness-90"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </CentralLayout>
    );
}
