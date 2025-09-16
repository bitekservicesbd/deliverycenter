import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';

type FlashMessages = {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
};

export default function FlashToast() {
    const { props } = usePage<{ flash?: FlashMessages }>();
    const previousFlash = useRef<string | null>(null);

    useEffect(() => {
        const { success, error, warning, info } = props.flash || {};

        const currentFlash = JSON.stringify(props.flash);

        if (currentFlash !== previousFlash.current) {
            if (success) {
                toast.success(success, {
                    duration: 4000,
                    position: 'top-right',
                });
            }

            if (error) {
                toast.error(error, {
                    duration: 5000,
                    position: 'top-right',
                });
            }

            if (warning) {
                toast(warning, {
                    icon: '⚠️',
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#FEF3C7',
                        color: '#92400E',
                    },
                });
            }

            if (info) {
                toast(info, {
                    icon: 'ℹ️',
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#DBEAFE',
                        color: '#1E40AF',
                    },
                });
            }

            previousFlash.current = currentFlash;
        }
    }, [props.flash]);

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#fff',
                    color: '#363636',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                success: {
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
}
