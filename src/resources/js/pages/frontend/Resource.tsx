import CentralLayout from '@/layouts/CentralLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Book, Download, FileText, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResourcePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const resources = [
        {
            icon: <FileText className="h-12 w-12 text-blue-500" />,
            title: 'User Guides',
            description: 'Comprehensive documentation for all DeliveryCenter features',
            link: '#',
        },
        {
            icon: <Video className="h-12 w-12 text-indigo-500" />,
            title: 'Video Tutorials',
            description: 'Step-by-step video guides for common workflows',
            link: '#',
        },
        {
            icon: <Download className="h-12 w-12 text-purple-500" />,
            title: 'Downloads',
            description: 'Mobile apps and additional tools for your delivery operations',
            link: '#',
        },
        {
            icon: <Book className="h-12 w-12 text-green-500" />,
            title: 'Case Studies',
            description: 'Learn how other businesses succeed with DeliveryCenter',
            link: '#',
        },
    ];

    return (
        <CentralLayout>
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
                <Head title={'Resources'} />
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-multiply blur-xl filter"></div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 bg-white py-20 shadow-sm dark:bg-gray-900 dark:shadow-none">
                    <div className="container mx-auto px-6">
                        <div
                            className={`text-center transition-all delay-300 duration-1000 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">Resources & Support</h1>
                            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                                Everything you need to get the most out of DeliveryCenter
                            </p>
                        </div>
                    </div>
                </section>

                {/* Resources Grid */}
                <section className="relative z-10 bg-white py-20 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {resources.map((resource, index) => (
                                <div
                                    key={index}
                                    className={`transform rounded-xl bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                                >
                                    <div className="mb-4">{resource.icon}</div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{resource.title}</h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">{resource.description}</p>
                                    <Link href={resource.link} className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <section className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
                    <div className="container mx-auto px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold">Need Additional Help?</h2>
                            <p className="mb-8 text-blue-100">Our support team is available 24/7 to help you with any questions</p>
                            <button
                                onClick={() => router.visit('/contact')}
                                className="transform cursor-pointer rounded-full bg-white px-8 py-3 font-medium text-blue-600 transition-colors hover:scale-105 hover:bg-gray-100"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </CentralLayout>
    );
}
