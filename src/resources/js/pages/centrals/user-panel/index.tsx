import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CentralLayout from '@/layouts/CentralLayout';
import PasswordModal from '@/pages/centrals/user-panel/password-change';
import { Head, router } from '@inertiajs/react';
import { Key, MoreHorizontal, RotateCcw, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type TenantStatus = 'active' | 'inactive' | 'suspended' | 'trial';
type TenantPaymentStatus = 'trial' | 'paid' | 'pending' | 'overdue' | 'failed';

const getStatusBadge = (status: TenantStatus) => {
    const statusStyles = {
        active: 'bg-green-100 text-green-800 dark:bg-emerald-800 dark:text-white',
        trial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-yellow-900 dark:text-white',
        suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white',
    };

    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};
const getPaymentStatusBadge = (status: TenantPaymentStatus) => {
    const statusStyles = {
        trial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white',
        paid: 'bg-green-100 text-green-800 dark:bg-emerald-800 dark:text-white',
        pending: 'bg-gray-100 text-gray-800 dark:bg-yellow-900 dark:text-white',
        overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white',
        failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white',
    };

    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function Index({ tenants }) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedTenantId, setSelectedTenantId] = useState<number | null>(null);
    const [selectedTenantEmail, setSelectedTenantEmail] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target) && isProfileDropdownOpen) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    return (
        <CentralLayout>
            <Head title={'My Dashboard'} />
            <h1 className="pb-5 text-center text-2xl font-semibold">My Dashboard</h1>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-1">
                            <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-black">
                                <nav className="space-y-2">
                                    <a
                                        href="#"
                                        className="flex items-center rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-white/50"
                                    >
                                        Dashboard
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-white/50"
                                    >
                                        Billing
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-white/50"
                                    >
                                        Profile
                                    </a>
                                    <Button
                                        onClick={() => router.post(route('logout'))}
                                        className="w-full cursor-pointer justify-start bg-gray-50 text-gray-700 hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-white/50"
                                    >
                                        Logout
                                    </Button>
                                </nav>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-black">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div></div>
                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-gray-600">Domains</div>
                                </div>

                                <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-black">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div></div>
                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-gray-600">Trial Domains</div>
                                </div>

                                <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-black">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div></div>
                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-gray-600">Active Domains</div>
                                </div>

                                <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-black">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div></div>
                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-gray-600">Suspended Domains</div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="border-b border-slate-300 dark:border-slate-700 dark:bg-black">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Domain Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Plan Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Issue Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Expiry Date
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Payment Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                            {tenants.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-16 text-center">
                                                        <div className="flex flex-col items-center">
                                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                                <Search className="h-8 w-8 text-slate-400" />
                                                            </div>
                                                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">
                                                                No tenants found
                                                            </h3>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                tenants.map((tenant) => (
                                                    <tr key={tenant.id} className="transition-colors dark:bg-black">
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-semibold text-slate-800 dark:text-white">{tenant.id}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-slate-700 dark:text-white">{tenant.plan?.name || 'N/A'}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-slate-700 dark:text-white">
                                                                {tenant.created_at ? new Date(tenant.created_at).toLocaleDateString() : 'N/A'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-slate-700 dark:text-white">
                                                                {tenant.trial_ends_at || tenant.next_billing_date
                                                                    ? new Date(tenant.trial_ends_at || tenant.next_billing_date).toLocaleDateString()
                                                                    : 'N/A'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="space-y-2">{getPaymentStatusBadge(tenant.payment_status)}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="space-y-2">{getStatusBadge(tenant.status)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                                    >
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48">
                                                                    <DropdownMenuItem className="flex cursor-pointer items-center px-2 py-2 text-sm">
                                                                        <a
                                                                            href={route('login.as.tenant', tenant.id)}
                                                                            className={`flex items-center ${
                                                                                tenant.status === 'inactive' || tenant.status === 'suspended'
                                                                                    ? 'pointer-events-none opacity-50'
                                                                                    : ''
                                                                            }`}
                                                                            target="_blank"
                                                                        >
                                                                            <Key className="mr-2 h-4 w-4" />
                                                                            Login as tenant
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setSelectedTenantId(tenant.id);
                                                                            setSelectedTenantEmail(tenant.user.email);
                                                                            setShowPasswordModal(true);
                                                                        }}
                                                                        className="flex cursor-pointer items-center gap-0 px-2 py-2 text-sm"
                                                                    >
                                                                        <RotateCcw className="mr-2 h-4 w-4" />
                                                                        Change Password
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PasswordModal
                open={showPasswordModal}
                onClose={() => {
                    setShowPasswordModal(false);
                    setSelectedTenantId(null);
                }}
                tenantId={selectedTenantId}
                tenantEmail={selectedTenantEmail}
            />
        </CentralLayout>
    );
}
