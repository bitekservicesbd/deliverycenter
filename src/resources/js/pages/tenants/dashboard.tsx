import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Index() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [location, setLocation] = useState({ city: '', country: '' });
    const [locationInfo, setLocationInfo] = useState(null);
    // Add the missing hourlyForecast state
    const [hourlyForecast, setHourlyForecast] = useState(null);

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000,
                },
            );
        });
    };

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        const { latitude, longitude } = pos.coords;

                        try {
                            setLoading(true);
                            setError('');

                            // Get city name using Nominatim
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                            const data = await res.json();

                            const cityName = data.address.city || data.address.town || data.address.village || 'Unknown';
                            const countryName = data.address.country || '';

                            setLocation({
                                city: cityName,
                                country: countryName,
                            });

                            setLocationInfo({
                                latitude,
                                longitude,
                                cityName,
                                country: countryName,
                                state: data.address.state || '',
                            });

                            // Fetch weather using city name for better accuracy
                            let weatherUrl;
                            if (cityName && cityName !== 'Unknown') {
                                weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`;
                            } else {
                                weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`;
                            }

                            const weatherResponse = await fetch(weatherUrl);

                            if (!weatherResponse.ok) {
                                throw new Error(`Weather API failed: ${weatherResponse.status}`);
                            }

                            const weatherData = await weatherResponse.json();
                            setWeather(weatherData);

                            // Fetch hourly forecast
                            let forecastUrl;
                            if (cityName && cityName !== 'Unknown') {
                                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`;
                            } else {
                                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`;
                            }

                            const forecastResponse = await fetch(forecastUrl);
                            if (forecastResponse.ok) {
                                const forecastData = await forecastResponse.json();
                                setHourlyForecast(forecastData);
                            }
                        } catch (err) {
                            console.error('Location/Weather fetch error:', err);
                            setError('Failed to fetch location and weather data.');

                            // Fallback to Dinajpur
                            try {
                                const fallbackResponse = await fetch(
                                    `https://api.openweathermap.org/data/2.5/weather?q=Dinajpur,BD&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`,
                                );
                                if (fallbackResponse.ok) {
                                    const fallbackData = await fallbackResponse.json();
                                    setWeather(fallbackData);
                                    setLocation({ city: 'Dinajpur', country: 'Bangladesh' });

                                    // Fetch fallback hourly forecast
                                    const fallbackForecastResponse = await fetch(
                                        `https://api.openweathermap.org/data/2.5/forecast?q=Dinajpur,BD&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`,
                                    );
                                    if (fallbackForecastResponse.ok) {
                                        const fallbackForecastData = await fallbackForecastResponse.json();
                                        setHourlyForecast(fallbackForecastData);
                                    }
                                }
                            } catch (fallbackErr) {
                                console.error('Fallback failed:', fallbackErr);
                            }
                        } finally {
                            setLoading(false);
                        }
                    },
                    (err) => {
                        console.error('Geolocation error:', err);
                        setError('Location permission denied.');
                        setLoading(false);

                        // Fallback to Dinajpur when location is denied
                        Promise.all([
                            fetch(
                                `https://api.openweathermap.org/data/2.5/weather?q=Dinajpur,BD&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`,
                            ),
                            fetch(
                                `https://api.openweathermap.org/data/2.5/forecast?q=Dinajpur,BD&appid=a62ec26b74e44db3f361d7db22e26b3b&units=metric`,
                            ),
                        ])
                            .then(([weatherRes, forecastRes]) => Promise.all([weatherRes.json(), forecastRes.json()]))
                            .then(([weatherData, forecastData]) => {
                                setWeather(weatherData);
                                setHourlyForecast(forecastData);
                                setLocation({ city: 'Dinajpur', country: 'Bangladesh' });
                            })
                            .catch((weatherErr) => console.error('Fallback weather failed:', weatherErr));
                    },
                );
            } else {
                setError('Geolocation is not supported by your browser.');
                setLoading(false);
            }
        };

        fetchLocationAndWeather();

        // Update every 10 minutes
        const interval = setInterval(fetchLocationAndWeather, 600000);
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (iconCode, main) => {
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 18;

        const iconMap = {
            '01d': '☀️',
            '01n': '🌙',
            '02d': '🌤️',
            '02n': '☁️',
            '03d': '⛅',
            '03n': '☁️',
            '04d': '☁️',
            '04n': '☁️',
            '09d': '🌧️',
            '09n': '🌧️',
            '10d': '🌦️',
            '10n': '🌧️',
            '11d': '⛈️',
            '11n': '⛈️',
            '13d': '❄️',
            '13n': '❄️',
            '50d': '🌫️',
            '50n': '🌫️',
        };

        return iconMap[iconCode] || (isDay ? '☀️' : '🌙');
    };

    const HourlyForecastSlider = ({ hourlyForecast, getWeatherIcon }) => {
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollLeft, setScrollLeft] = useState(0);
        const [scrollProgress, setScrollProgress] = useState(0);
        const sliderRef = useRef(null);

        const updateScrollProgress = () => {
            if (sliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
                const maxScroll = scrollWidth - clientWidth;
                const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
                setScrollProgress(Math.min(progress, 100));
            }
        };

        const handleStart = (clientX) => {
            setIsDragging(true);
            setStartX(clientX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        const handleMove = (clientX) => {
            if (!isDragging || !sliderRef.current) return;
            const x = clientX - sliderRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            sliderRef.current.scrollLeft = scrollLeft - walk;
            updateScrollProgress();
        };

        // Mouse events
        const handleMouseDown = (e) => {
            e.preventDefault();
            handleStart(e.pageX);
        };

        const handleMouseMove = (e) => {
            e.preventDefault();
            handleMove(e.pageX);
        };

        // Touch events
        const handleTouchStart = (e) => {
            handleStart(e.touches[0].clientX);
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            handleMove(e.touches[0].clientX);
        };

        useEffect(() => {
            const handleGlobalMouseMove = (e) => handleMouseMove(e);
            const handleGlobalMouseUp = () => handleEnd();
            const handleGlobalTouchMove = (e) => handleTouchMove(e);
            const handleGlobalTouchEnd = () => handleEnd();

            if (isDragging) {
                document.addEventListener('mousemove', handleGlobalMouseMove);
                document.addEventListener('mouseup', handleGlobalMouseUp);
                document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
                document.addEventListener('touchend', handleGlobalTouchEnd);
            }

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
                document.removeEventListener('touchmove', handleGlobalTouchMove);
                document.removeEventListener('touchend', handleGlobalTouchEnd);
            };
        }, [isDragging, startX, scrollLeft]);

        useEffect(() => {
            updateScrollProgress();
        }, []);

        return (
            <div className="relative">
                <div
                    ref={sliderRef}
                    className={`flex space-x-3 overflow-x-hidden pb-2 transition-all duration-200 select-none ${
                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onScroll={updateScrollProgress}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {hourlyForecast.list.slice(0, 12).map((hour, index) => {
                        const time = new Date(hour.dt * 1000);
                        const hourStr =
                            time.getHours() === 0 ? '12 AM' : time.getHours() <= 12 ? `${time.getHours()} AM` : `${time.getHours() - 12} PM`;
                        return (
                            <div
                                key={index}
                                className="pointer-events-none min-w-[60px] flex-shrink-0 text-center transition-transform hover:scale-105"
                            >
                                <p className="mb-1 text-xs opacity-75">{hourStr}</p>
                                <div className="mb-1 text-lg">{getWeatherIcon(hour.weather[0].icon, hour.weather[0].main)}</div>
                                <p className="text-sm font-semibold">{Math.round(hour.main.temp)}°</p>
                                {hour.pop > 0.2 && <p className="text-xs opacity-75">💧 {Math.round(hour.pop * 100)}%</p>}
                            </div>
                        );
                    })}
                </div>

                {/* Custom Slider Track */}
                <div className="relative mt-3">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
                        <div
                            className="h-1 rounded-full bg-white/80 shadow-sm transition-all duration-300"
                            style={{ width: `${scrollProgress}%` }}
                        ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs opacity-60">
                        <span>Now</span>
                        <span>+12hrs</span>
                    </div>
                </div>

                {/* Drag hint */}
                <div className="mt-2 text-center">
                    <p className="text-xs opacity-50">
                        <span className="mr-1 inline-block">👆</span>
                        Drag to scroll through forecast
                    </p>
                </div>
            </div>
        );
    };

    const WeatherWidget = () => {
        const [isExpanded, setIsExpanded] = useState(false);

        if (loading) {
            return (
                <div className="relative">
                    <div className="flex cursor-pointer items-center rounded-lg bg-blue-50 p-3 transition-colors hover:bg-blue-100">
                        <div className="mr-3 h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <span className="text-sm text-blue-600">Loading weather...</span>
                    </div>
                </div>
            );
        }

        if (!weather) {
            return (
                <div className="relative">
                    <div className="flex cursor-pointer items-center rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                        <span className="mr-3 text-2xl">❌</span>
                        <span className="text-sm text-gray-600">Weather unavailable</span>
                    </div>
                </div>
            );
        }

        const currentWeather = weather.weather[0];
        const temp = Math.round(weather.main.temp);
        const feelsLike = Math.round(weather.main.feels_like);

        return (
            <div className="relative">
                <div
                    className="flex cursor-pointer items-center rounded-lg bg-blue-50 p-3 transition-all duration-200 hover:bg-blue-100 hover:shadow-md"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className="mr-3 text-3xl">{getWeatherIcon(currentWeather.icon, currentWeather.main)}</span>
                    <div>
                        <div className="text-xl font-bold text-gray-900">{temp}°C</div>
                        <div className="text-xs text-gray-600 capitalize">{location.city ? `📍 ${location.city}` : '📍 Current Location'}</div>
                    </div>
                    <div className="ml-3 text-gray-400">
                        <svg
                            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div
                    className={`absolute top-full right-0 z-50 mt-2 w-80 transform rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white shadow-xl transition-all duration-300 ${
                        isExpanded ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                    }`}
                >
                    <div className="relative overflow-hidden p-6">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4 text-6xl opacity-20">☁</div>
                            <div className="absolute bottom-4 left-4 text-4xl opacity-20">🌤</div>
                        </div>

                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Current Weather</h3>
                                    <p className="text-sm opacity-90">
                                        {location.city && location.country ? `${location.city}, ${location.country}` : weather.name}
                                    </p>
                                    {locationInfo && (
                                        <p className="text-xs opacity-75">
                                            {locationInfo.latitude.toFixed(2)}, {locationInfo.longitude.toFixed(2)}
                                        </p>
                                    )}
                                    {error && <p className="text-xs text-yellow-200 opacity-75">{error}</p>}
                                </div>
                                <div className="text-4xl">{getWeatherIcon(currentWeather.icon, currentWeather.main)}</div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold">{temp}°</span>
                                    <span className="ml-1 text-lg">C</span>
                                </div>
                                <p className="text-sm capitalize opacity-90">{currentWeather.description}</p>
                                <p className="text-sm opacity-75">Feels like {feelsLike}°C</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                                    <div className="mb-1 flex items-center">
                                        <span className="mr-2">💧</span>
                                        <span className="font-medium">Humidity</span>
                                    </div>
                                    <p className="text-lg font-semibold">{weather.main.humidity}%</p>
                                </div>

                                <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                                    <div className="mb-1 flex items-center">
                                        <span className="mr-2">💨</span>
                                        <span className="font-medium">Wind</span>
                                    </div>
                                    <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
                                </div>

                                <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                                    <div className="mb-1 flex items-center">
                                        <span className="mr-2">🌡</span>
                                        <span className="font-medium">Pressure</span>
                                    </div>
                                    <p className="text-lg font-semibold">{weather.main.pressure} hPa</p>
                                </div>

                                <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                                    <div className="mb-1 flex items-center">
                                        <span className="mr-2">👁</span>
                                        <span className="font-medium">Visibility</span>
                                    </div>
                                    <p className="text-lg font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-white/20 pt-3">
                                {/* Hourly Forecast */}
                                {hourlyForecast && (
                                    <div className="mb-4">
                                        <h4 className="mb-3 text-sm font-semibold opacity-90">24-Hour Forecast</h4>
                                        <HourlyForecastSlider hourlyForecast={hourlyForecast} getWeatherIcon={getWeatherIcon} />
                                    </div>
                                )}

                                <p className="text-center text-xs opacity-75">Last updated: {new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {isExpanded && <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)}></div>}
            </div>
        );
    };

    const orderStatusData = [
        { name: 'QUOT', value: 6, color: '#3b82f6' },
        { name: 'DELIV', value: 6, color: '#eab308' },
        { name: 'TCC', value: 0, color: '#10b981' },
        { name: 'CANC', value: 0, color: '#f97316' },
    ];

    const timeStatusData = [
        { name: 'On-Time', value: 6503, color: '#3b82f6' },
        { name: 'Late', value: 0, color: '#ef4444' },
    ];

    const driversData = [{ name: 'Max', value: 12, color: '#1e40af' }];

    const orderServiceData = [
        { name: 'Skid Rush', value: 1, color: '#ef4444' },
        { name: 'Same Day', value: 11, color: '#3b82f6' },
    ];

    const clientsData = [
        { name: 'Shoppers Drug Mart', value: 4896, amount: 240.13, color: '#ef4444' },
        { name: 'Shoppers Drug Mart 2', value: 541.96, color: '#10b981' },
        { name: 'Max Inc.', value: 1118.71, color: '#f59e0b' },
    ];

    const earningsData = [
        { name: 'Total charges (Client)', value: 0, color: '#10b981' },
        { name: 'Total charges (Driver)', value: 0, color: '#ef4444' },
    ];

    const revenueData = [
        { name: 'Direct', today: 2000, yesterday: 0 },
        { name: 'Low Bid Estimated', today: 8000, yesterday: 0 },
        { name: 'Next Day by Semi', today: 95000, yesterday: 0 },
        { name: 'Next Day Saturday', today: 45000, yesterday: 0 },
        { name: 'Next Day Cold Chain', today: 1000, yesterday: 0 },
        { name: 'Rush', today: 15000, yesterday: 0 },
        { name: 'Same Day 11am cut off', today: 18000, yesterday: 0 },
        { name: 'Skid Sameday', today: 8000, yesterday: 0 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.dataKey}: ${entry.value?.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const PieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                    <p className="text-sm font-medium text-gray-800">{data.name}</p>
                    <p className="text-sm" style={{ color: data.payload.color }}>
                        Value: {data.value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <TenantLayout>
            <Head title="Agent Dashboard" />

            <div className="min-h-screen bg-gray-50 p-4 md:p-6">
                <div className="relative mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Dashboard</h1>
                            <p className="text-lg text-gray-600">Welcome to your agent dashboard</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    Last updated:{' '}
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        <WeatherWidget />
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">Total Order (By Status)</h3>
                        <p className="mb-4 text-sm text-gray-500">14 Aug 2025</p>

                        <div className="mb-4 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                                        {orderStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {orderStatusData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-700">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">Time Status</h3>
                        <p className="mb-4 text-sm text-gray-500">Aug 2025</p>

                        <div className="mb-4 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={timeStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                        {timeStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-2">
                            {timeStatusData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-700">
                                        {item.name}: {item.value.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">Top 5 Drivers</h3>
                        <p className="mb-4 text-sm text-gray-500">14 Aug 2025</p>

                        <div className="mb-4 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={driversData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                                        {driversData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-2">
                            {driversData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-700">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Order (By Service)</h3>
                        <p className="mb-4 text-xs text-gray-500">14 Aug 2025</p>

                        <div className="mb-4 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={orderServiceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                                        {orderServiceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-1">
                            {orderServiceData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-gray-600">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Time Status</h3>
                        <p className="mb-4 text-xs text-gray-500">14 Aug 25</p>

                        <div className="mb-4 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ name: 'No Data', value: 1, color: '#ef4444' }]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        dataKey="value"
                                    >
                                        <Cell fill="#ef4444" />
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                <span className="text-xs text-gray-600">Late: 0</span>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                                <span className="text-xs text-gray-600">On-Time: 0</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Top 5 Clients</h3>
                        <p className="mb-4 text-xs text-gray-500">14 Aug 2025</p>

                        <div className="mb-4 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={clientsData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                                        {clientsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-1">
                            {clientsData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="truncate text-xs text-gray-600">
                                        {item.name}: {item.amount || item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Earnings Report</h3>
                        <p className="mb-4 text-xs text-gray-500">14 Aug 2025</p>

                        <div className="mb-4 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ name: 'No Earnings', value: 1, color: '#10b981' }]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        dataKey="value"
                                    >
                                        <Cell fill="#10b981" />
                                    </Pie>
                                    <Tooltip content={<PieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-1">
                            {earningsData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-gray-600">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                    <div className="mb-6">
                        <h3 className="mb-2 text-2xl font-bold text-gray-900">Total Revenue By Service</h3>
                        <p className="text-gray-500">Aug 2025</p>
                    </div>

                    <div className="mb-6 h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={revenueData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 80,
                                }}
                                barCategoryGap="15%"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <YAxis tickFormatter={(value) => `${value / 1000}k`} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="today" fill="#3b82f6" name="Today" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="yesterday" fill="#ef4444" name="Yesterday" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
