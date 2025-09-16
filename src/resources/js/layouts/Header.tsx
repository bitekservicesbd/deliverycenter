import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Truck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const { auth, centralAppData, url, USER_TYPE_CENTRAL } = usePage().props as unknown as {
        auth: { user: { id: number; user_type: string } | null };
        centralAppData: { app_logo?: string };
        url: string;
        USER_TYPE_CENTRAL: string;
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Resources', href: '/resources' },
        { name: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            setIsVisible(window.scrollY < lastScrollY);
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dashboardRoute = auth?.user?.user_type === USER_TYPE_CENTRAL ? route('dashboard') : route('user.panel.index');

    return (
        <header className={`relative z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <nav className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        {centralAppData?.app_logo ? (
                            <img src={`/storage/${centralAppData.app_logo}`} alt="Logo" className="h-10 w-auto" />
                        ) : (
                            <>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                                    <Truck className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">DeliveryCenter</span>
                            </>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-8 md:flex">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium transition-colors ${
                                    url === item.href ? 'border-b-2 border-blue-600 pb-1 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth & CTA */}
                    <div className="hidden items-center space-x-4 md:flex">
                        <Link
                            href="/demo"
                            className="transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                        >
                            Book a Demo
                        </Link>

                        {auth?.user ? (
                            <Link
                                href={dashboardRoute}
                                className="transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="transform rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="mt-6 border-t border-gray-200 py-6 md:hidden">
                        <div className="flex flex-col space-y-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`transition-colors ${url === item.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {auth?.user && (
                                <Link href={dashboardRoute} className="rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Dashboard
                                </Link>
                            )}

                            {!auth?.user && (
                                <Link
                                    href="/login"
                                    className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Login
                                </Link>
                            )}

                            <Link
                                href="/demo"
                                className="mt-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                            >
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
