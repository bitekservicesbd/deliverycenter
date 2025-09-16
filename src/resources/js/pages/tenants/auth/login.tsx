import { Head, useForm } from '@inertiajs/react';
import { Clock, Home, LoaderCircle, MapPin, Package, Truck } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
}

const generateDeliveryPoints = () => {
    const points = [];
    for (let i = 0; i < 19; i++) {
        points.push({
            id: i,
            x: Math.random() * 85 + 7.5,
            y: Math.random() * 85 + 7.5,
            delivered: false,
        });
    }
    return points;
};

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [currentIcon, setCurrentIcon] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [deliveryPoints] = useState(generateDeliveryPoints());
    const [currentDeliveryIndex, setCurrentDeliveryIndex] = useState(0);
    const [truckPosition, setTruckPosition] = useState({ x: 50, y: 50 });
    const [isDelivering, setIsDelivering] = useState(false);

    const deliveryIcons = [Package, Truck, MapPin, Clock];
    const fullText = 'Manage your deliveries with precision';

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % deliveryIcons.length);
        }, 2000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setTypingText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const deliveryAnimation = () => {
            if (currentDeliveryIndex < deliveryPoints.length) {
                const targetPoint = deliveryPoints[currentDeliveryIndex];

                setTruckPosition({ x: targetPoint.x, y: targetPoint.y });
                setIsDelivering(true);

                setTimeout(() => {
                    deliveryPoints[currentDeliveryIndex].delivered = true;
                    setIsDelivering(false);
                    setCurrentDeliveryIndex((prev) => prev + 1);
                }, 1500);
            } else {
                setTimeout(() => {
                    deliveryPoints.forEach((point) => (point.delivered = false));
                    setCurrentDeliveryIndex(0);
                    setTruckPosition({ x: 50, y: 50 });
                }, 2000);
            }
        };

        const timer = setTimeout(deliveryAnimation, currentDeliveryIndex === 0 ? 1000 : 2000);
        return () => clearTimeout(timer);
    }, [currentDeliveryIndex, deliveryPoints]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tenant.login'), {
            onFinish: () => reset('password'),
        });
    };

    const CurrentIcon = deliveryIcons[currentIcon];

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="pointer-events-none absolute inset-0">
                    {deliveryPoints.map((point) => (
                        <div
                            key={point.id}
                            className={`absolute transition-all duration-500 ${
                                point.delivered ? 'scale-110 text-green-500' : 'text-gray-400 dark:text-gray-600'
                            }`}
                            style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div className="relative">
                                <Home className="h-4 w-4" />
                                {point.delivered && <div className="absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-green-500"></div>}
                                {!point.delivered && <Package className="absolute -top-2 -right-2 h-3 w-3 animate-bounce text-orange-500" />}
                            </div>
                        </div>
                    ))}

                    <div
                        className="absolute z-10 transition-all duration-1000 ease-in-out"
                        style={{
                            left: `${truckPosition.x}%`,
                            top: `${truckPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className={`relative ${isDelivering ? 'animate-bounce' : ''}`}>
                            <Truck className="h-6 w-6 text-blue-500 drop-shadow-lg dark:text-blue-400" />
                            {isDelivering && (
                                <div className="absolute -top-2 -right-2">
                                    <Package className="h-3 w-3 animate-spin text-orange-500" />
                                </div>
                            )}
                            <div className="absolute top-1 -left-4">
                                <div className="h-1 w-1 animate-ping rounded-full bg-gray-400 opacity-60"></div>
                                <div className="h-1 w-1 animate-ping rounded-full bg-gray-300 opacity-40 delay-200"></div>
                            </div>
                        </div>
                    </div>

                    {deliveryPoints.map((point, index) => {
                        if (index <= currentDeliveryIndex) {
                            const prevPoint = index === 0 ? { x: 50, y: 50 } : deliveryPoints[index - 1];
                            const currentPoint = point;

                            return (
                                <svg key={`route-${index}`} className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
                                    <line
                                        x1={`${prevPoint.x}%`}
                                        y1={`${prevPoint.y}%`}
                                        x2={`${currentPoint.x}%`}
                                        y2={`${currentPoint.y}%`}
                                        stroke={point.delivered ? '#10b981' : '#3b82f6'}
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        className={point.delivered ? 'opacity-60' : 'opacity-30'}
                                    />
                                </svg>
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="relative z-20 w-full max-w-md">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-6 -right-6 animate-bounce text-blue-500/30 delay-300 dark:text-blue-400/30">
                            <Package className="h-8 w-8" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 animate-bounce text-green-500/30 delay-700 dark:text-green-400/30">
                            <MapPin className="h-6 w-6" />
                        </div>
                    </div>

                    <div className="relative rounded-3xl border border-gray-200/50 bg-white/95 p-8 shadow-2xl shadow-gray-900/10 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/95 dark:shadow-gray-900/30">
                        <div className="mb-8 text-center">
                            <div className="relative mx-auto mb-6 h-20 w-20">
                                <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/30 dark:shadow-blue-500/50"></div>
                                <div className="relative flex h-full w-full items-center justify-center">
                                    <CurrentIcon className="h-10 w-10 transform text-white transition-all duration-700 hover:scale-110 hover:rotate-12" />
                                </div>
                            </div>
                            <h1 className="mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-gray-100 dark:to-gray-300">
                                DeliveryCentre
                            </h1>
                            <p className="flex h-6 items-center justify-center text-base text-gray-600 dark:text-gray-400">
                                <span className="inline-block">
                                    {typingText}
                                    <span className="animate-pulse">|</span>
                                </span>
                            </p>
                        </div>

                        {status && (
                            <div className="animate-slideIn mb-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                                <div className="flex items-center justify-center text-green-700 dark:text-green-400">
                                    <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                    <span className="text-sm font-medium">{status}</span>
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></div>
                                </Label>
                                <div className="group relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className="rounded-xl border-2 border-gray-200 bg-white/70 py-4 pr-4 pl-4 text-base backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-blue-500/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/70 dark:hover:border-gray-600"
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 transition-all duration-300 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5"></div>
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Password
                                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 delay-300"></div>
                                    </Label>
                                </div>
                                <div className="group relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="rounded-xl border-2 border-gray-200 bg-white/70 py-4 pr-4 pl-4 text-base backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-green-500/10 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800/70 dark:hover:border-gray-600"
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-blue-500/0 to-green-500/0 transition-all duration-300 group-focus-within:from-green-500/5 group-focus-within:via-blue-500/5 group-focus-within:to-green-500/5"></div>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="group flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="h-5 w-5 rounded-lg border-2 border-gray-300 transition-all duration-200 hover:border-blue-400 data-[state=checked]:border-transparent data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600 dark:border-gray-600 dark:hover:border-blue-500"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm text-gray-700 transition-colors duration-200 select-none group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
                                >
                                    Remember me for 30 days
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-base font-medium text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:shadow-blue-500/50"
                                tabIndex={4}
                                disabled={processing}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="h-5 w-5 animate-spin" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Truck className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            <span>Sign in to Dashboard</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">Secure delivery management platform</p>
                            <div className="flex items-center justify-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">System operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </AuthLayout>
    );
}
