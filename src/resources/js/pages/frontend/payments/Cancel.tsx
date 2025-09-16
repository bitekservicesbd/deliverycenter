import CentralLayout from '@/layouts/CentralLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <CentralLayout>
            <Head title="Contact" />
            <div className="min-h-screen overflow-hidden bg-gradient-to-br text-gray-900">
                <p className="text-center text-lg font-bold dark:text-white">Payment Canceled</p>
            </div>
        </CentralLayout>
    );
}
