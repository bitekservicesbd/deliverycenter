import { BarChart3, Shield, Truck, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-12 text-white">
            <div className="container mx-auto px-6">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 font-bold">About Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>DeliveryCenter is a powerful web-based suite of</li>
                            <li>tools for Courier, Transportation and</li>
                            <li>Warehousing industries.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Downloads
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Strategy Session
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    ROI Calculator
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold">Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    User Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Video Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Other Quick Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Other Quick Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    DeliveryCenter® Driver (Android)
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    DeliveryCenter® Driver (iPhone)
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-blue-400">
                                    Other Complete (Android)
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold">We Are Driven To Deliver Results</h3>
                        <div className="flex space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600">
                                <Zap className="h-6 w-6" />
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
                    <div className="mb-4 flex items-center space-x-2 md:mb-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                            <Truck className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold">DeliveryCenter.com</span>
                    </div>
                    <div className="text-sm text-gray-400">© 2025 DeliveryCenter. All rights reserved. | Powered by Whiley Solutions</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
