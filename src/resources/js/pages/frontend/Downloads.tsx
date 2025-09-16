import CentralLayout from '@/layouts/CentralLayout';
import { BarChart3, Bell, Camera, Check, Clock, Edit, FileText, MapPin, Package, Route, Target, Truck, Users, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DownloadesPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const tmsFeatures = [
        { icon: <BarChart3 className="h-8 w-8" />, title: 'Customizable Reports', color: 'from-blue-500 to-indigo-500' },
        { icon: <Package className="h-8 w-8" />, title: '3PL Management', color: 'from-blue-500 to-indigo-500' },
        { icon: <Clock className="h-8 w-8" />, title: 'Automated Scheduling', color: 'from-blue-500 to-indigo-500' },
        { icon: <FileText className="h-8 w-8" />, title: 'Accounting & Invoicing', color: 'from-blue-500 to-indigo-500' },
        { icon: <Route className="h-8 w-8" />, title: 'Route Optimization', color: 'from-blue-500 to-indigo-500' },
        { icon: <Truck className="h-8 w-8" />, title: 'Delivery Tracking', color: 'from-blue-500 to-indigo-500' },
        { icon: <MapPin className="h-8 w-8" />, title: 'Order & Location Tracking', color: 'from-blue-500 to-indigo-500' },
        { icon: <Target className="h-8 w-8" />, title: 'Fleet Management', color: 'from-blue-500 to-indigo-500' },
    ];

    const driverFeatures = [
        { icon: <Camera className="h-8 w-8" />, title: 'Barcode Scanning', color: 'from-blue-500 to-indigo-500' },
        { icon: <Edit className="h-8 w-8" />, title: 'Modify Orders', color: 'from-blue-500 to-indigo-500' },
        { icon: <FileText className="h-8 w-8" />, title: 'Image Upload', color: 'from-blue-500 to-indigo-500' },
        { icon: <Bell className="h-8 w-8" />, title: 'Live Order Updates', color: 'from-blue-500 to-indigo-500' },
        { icon: <FileText className="h-8 w-8" />, title: 'Driver Notes', color: 'from-blue-500 to-indigo-500' },
        { icon: <Users className="h-8 w-8" />, title: 'Unlimited Drivers', color: 'from-blue-500 to-indigo-500' },
        { icon: <Wifi className="h-8 w-8" />, title: 'GPS Tracking', color: 'from-blue-500 to-indigo-500' },
        { icon: <Edit className="h-8 w-8" />, title: 'Electronic Signatures', color: 'from-blue-500 to-indigo-500' },
    ];

    return (
        <CentralLayout>
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-10 mix-blend-multiply blur-xl filter"></div>
                    <div className="animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-multiply blur-xl filter"></div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 bg-white py-20 shadow-sm">
                    <div className="container mx-auto px-6">
                        <div
                            className={`text-center transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <div className="mb-4">
                                <span className="font-semibold text-blue-600">DeliveryCenter's</span>
                            </div>
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">Features</h1>
                            <p className="mx-auto max-w-3xl text-xl text-gray-600">
                                Powerful Features Tailored to Enhance Your Courier & Warehousing Workflow
                            </p>
                        </div>
                    </div>
                </section>

                {/* Product Overview Section */}
                <section
                    className={`relative z-10 container mx-auto px-6 py-16 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Transportation Management System */}
                        <div className="text-center">
                            <img src="https://i0.wp.com/deliverysuite.com/wp-content/uploads/2023/05/features-tms.jpeg?w=1000&ssl=1" alt="" />

                            <h3 className="mb-4 text-2xl font-bold text-gray-900">Transportation Management System (TMS)</h3>
                            <p className="leading-relaxed text-gray-600">
                                DeliveryCenter Transportation Management System is a highly efficient solution that simplifies the process of
                                overseeing and coordinating deliveries. With the latest technology and a user-friendly interface, the system
                                streamlines the need for expensive server hosting expenses, making it accessible from any web-enabled device without
                                requiring official installation. As a result, DeliveryCenter TMS is the ideal solution for today's complex global
                                transport network, providing an easy-to-use, efficient, and cost-effective way to manage dispatch operations.
                            </p>
                        </div>

                        {/* DeliveryCenter Driver */}
                        <div className="text-center">
                            <div>
                                <img src="https://i0.wp.com/deliverysuite.com/wp-content/uploads/2023/05/features-driver.jpeg?w=1000&ssl=1" alt="" />
                            </div>

                            <h3 className="mb-4 text-2xl font-bold text-gray-900">DeliveryCenter Driver</h3>
                            <p className="leading-relaxed text-gray-600">
                                DeliveryCenter Driver is an innovative solution that uses advanced technology to eliminate unnecessary workforce and
                                delivery processing delays. It combines excellent features like two-way scanning, GPS tracking, and courier data to
                                streamline delivery operations, allowing businesses to monitor and track deliveries in real time. This significant
                                capture and code scanning features make it easy to verify deliveries, while GPS tracking helps businesses keep track
                                of their couriers' locations. This solution is a game-changer for businesses looking to improve their delivery
                                processes and make them more efficient.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Top Software Features Section */}
                <section className="relative z-10 bg-gray-50 py-16">
                    <div className="container mx-auto px-6">
                        <div
                            className={`mb-12 text-center transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        >
                            <h2 className="mb-2 text-sm text-gray-500">Discover the Power of Our</h2>
                            <h3 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">Top Software Features</h3>
                        </div>

                        {/* TMS Features */}
                        <div className="mb-16">
                            <h4 className="mb-8 text-2xl font-bold text-blue-600">Transportation Management System (TMS)</h4>
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {tmsFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-1000 hover:shadow-xl delay-${(index + 1) * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    >
                                        <div
                                            className={`h-20 w-20 bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <div className="text-white">{feature.icon}</div>
                                        </div>
                                        <h5 className="text-lg font-semibold text-gray-900">{feature.title}</h5>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="text-center">
                                <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full transition-all border border-gray-200 shadow-sm">
                                    Full Features List
                                </button>
                            </div> */}
                        </div>

                        {/* Driver Features */}
                        <div>
                            <h4 className="mb-8 text-2xl font-bold text-blue-600">DeliveryCenter Driver</h4>
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {driverFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`group rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-1000 hover:shadow-xl delay-${(index + 1) * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    >
                                        <div
                                            className={`h-20 w-20 bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <div className="text-white">{feature.icon}</div>
                                        </div>
                                        <h5 className="text-lg font-semibold text-gray-900">{feature.title}</h5>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="text-center">
                                <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full transition-all border border-gray-200 shadow-sm">
                                    Full Features List
                                </button>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Demo Section */}
                <section className="relative z-10 bg-white py-16">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-between lg:flex-row">
                            <div className="mb-8 lg:mb-0 lg:w-1/2">
                                {/* Device Mockups */}
                                <div className="relative">
                                    <img src="https://i0.wp.com/deliverysuite.com/wp-content/uploads/2023/05/CTA_devices.png?w=1020&ssl=1" alt="" />
                                </div>
                            </div>

                            <div className="lg:w-1/2 lg:pl-12">
                                <div className="mb-4">
                                    <span className="font-semibold text-blue-600">INTERESTED?</span>
                                </div>
                                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Schedule a Demo</h2>
                                <p className="mb-6 text-gray-600">
                                    Experience our comprehensive logistics software in action. UNLOCK fast savings, cost reductions, and complete
                                    visibility, empowering you to take control of your transportation.
                                </p>

                                <div className="mb-6 space-y-3">
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700">Web-Based</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700">24/7 Support</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="mr-3 h-5 w-5 text-green-500" />
                                        <span className="text-gray-700">Highly Customizable</span>
                                    </div>
                                </div>

                                <button className="transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-3000 {
                    animation-delay: 3s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .perspective-1000 {
                    perspective: 1000px;
                }

                .rotate-y-12 {
                    transform: rotateY(-12deg);
                }

                .rotate-y-6 {
                    transform: rotateY(-6deg);
                }
            `}</style>
            </div>
        </CentralLayout>
    );
}
