import { usePage } from '@inertiajs/react';
import { Truck } from 'lucide-react';

export default function AppLogo() {
    const { centralAppData } = usePage<{ centralAppData: CentralAppData }>().props;
    return (
        <div className="flex items-center space-x-2">
            {centralAppData?.favicon ? (
                <>
                    <img src={`/storage/${centralAppData.favicon}`} alt="Logo" className="h-8 w-auto" />
                    <span className="text-l font-bold text-gray-900">{centralAppData.app_name}</span>
                </>
            ) : (
                <>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                        <Truck className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-l font-bold text-gray-900">DeliveryCenter</span>
                </>
            )}
        </div>
    );
}
