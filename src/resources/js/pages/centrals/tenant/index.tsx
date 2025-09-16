import Countdown from '@/components/Countdown';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import ChangeStatusModal from '@/pages/centrals/tenant/change-status';
import CreateTenant from '@/pages/centrals/tenant/create';
import EditTenant from '@/pages/centrals/tenant/edit';
import GeneratePaymentLinkModal from '@/pages/centrals/tenant/generate-payment-links';
import MarkPaymentModal from '@/pages/centrals/tenant/mark-payment';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    Key,
    LinkIcon,
    MoreHorizontal,
    Plus,
    Search,
    SquarePen,
    Trash2,
    Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type User = {
    id: number;
    name: string;
    email?: string;
};

type Plan = {
    id: number;
    name: string;
    formatted_price?: string;
};

type TenantStatus = 'active' | 'inactive' | 'suspended' | 'trial';
type PaymentStatus = 'trial' | 'paid' | 'pending' | 'overdue' | 'failed';

type Tenant = {
    id: string;
    company_name: string;
    tenancy_db_name: string;
    user: User;
    plan: Plan;
    status: TenantStatus;
    payment_status: PaymentStatus;
    trial_ends_at?: string;
    next_billing_date?: string;
    trial_days_remaining?: number;
    payment_overdue_days?: number;
    days_until_next_billing?: number;
    is_active: boolean;
    is_on_trial: boolean;
    domain?: string;
    created_at?: string;
    notes?: string;
    created_by?: User;
};

type PageProps = {
    tenants: Tenant[];
    users: User[];
    plans: Plan[];
    settings: {
        default_trial_days: number;
        payment_due_days: number;
    };
};

type SortField = keyof Tenant | 'user.name' | 'plan.name' | 'status' | 'payment_status';
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Tenant Management', href: route('central.tenants.index') },
];

export default function Index() {
    const { tenants: initialTenants, users, plans } = usePage<PageProps>().props;
    const [tenants, setTenants] = useState<Tenant[]>(initialTenants || []);

    const [filterText, setFilterText] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | TenantStatus>('all');
    const [paymentFilter, setPaymentFilter] = useState<'all' | PaymentStatus>('all');
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editTenantData, setEditTenantData] = useState<Tenant | null>(null);
    const [openMarkPayment, setOpenMarkPayment] = useState(false);
    const [openChangeStatus, setOpenChangeStatus] = useState(false);

    // Payment link modal
    const [openPaymentLink, setOpenPaymentLink] = useState(false);
    const [paymentLinkTenant, setPaymentLinkTenant] = useState<Tenant | null>(null);

    const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
        return path.split('.').reduce<unknown>((acc, part) => {
            if (acc && typeof acc === 'object' && part in acc) {
                return (acc as Record<string, unknown>)[part];
            }
            return undefined;
        }, obj);
    };

    const filteredAndSortedTenants = useMemo(() => {
        let filtered = tenants.filter((tenant: Tenant) => {
            const userName = tenant.user?.name?.toLowerCase() || '';
            const companyName = tenant.company_name?.toLowerCase() || '';
            const planName = tenant.plan?.name?.toLowerCase() || '';
            const matchesSearch =
                userName.includes(filterText.toLowerCase()) ||
                companyName.includes(filterText.toLowerCase()) ||
                planName.includes(filterText.toLowerCase()) ||
                tenant.id.toString().includes(filterText);

            const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
            const matchesPayment = paymentFilter === 'all' || tenant.payment_status === paymentFilter;

            return matchesSearch && matchesStatus && matchesPayment;
        });

        filtered.sort((a: Tenant, b: Tenant) => {
            let aValue: string | number | undefined;
            let bValue: string | number | undefined;

            if (sortField === 'user.name') {
                aValue = a.user?.name?.toLowerCase() || '';
                bValue = b.user?.name?.toLowerCase() || '';
            } else if (sortField === 'plan.name') {
                aValue = a.plan?.name?.toLowerCase() || '';
                bValue = b.plan?.name?.toLowerCase() || '';
            } else if (sortField === 'status' || sortField === 'payment_status') {
                aValue = a[sortField];
                bValue = b[sortField];
            } else {
                aValue = getNestedValue(a, sortField as string) as string | number | undefined;
                bValue = getNestedValue(b, sortField as string) as string | number | undefined;
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }
            }

            const aComp = aValue !== undefined ? aValue : '';
            const bComp = bValue !== undefined ? bValue : '';
            if (aComp < bComp) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aComp > bComp) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [tenants, filterText, statusFilter, paymentFilter, sortField, sortDirection]);

    const totalPages = Math.ceil(filteredAndSortedTenants.length / itemsPerPage);
    const paginatedTenants = filteredAndSortedTenants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const handleDelete = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedTenant) {
            router.delete(route('central.tenants.delete', selectedTenant.id), {
                onSuccess: () => {
                    setTenants((prevTenants) => prevTenants.filter((t) => t.id !== selectedTenant.id));
                    setShowDeleteModal(false);
                    setSelectedTenant(null);
                },
            });
        }
    };

    const openEditModal = (tenant: Tenant) => {
        setEditTenantData(tenant);
        setOpenEdit(true);
    };

    const openMarkPaymentModal = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setOpenMarkPayment(true);
    };

    const openChangeStatusModal = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setOpenChangeStatus(true);
    };

    const handleExport = () => {
        const csvContent = [
            [
                'Tenant ID',
                'Company Name',
                'User Name',
                'User Email',
                'Plan',
                'Status',
                'Payment Status',
                'Trial Ends',
                'Next Billing',
                'Created Date',
                'Domain',
            ].join(','),
            ...filteredAndSortedTenants.map((tenant: Tenant) =>
                [
                    tenant.id,
                    tenant.company_name || 'N/A',
                    tenant.user?.name || 'N/A',
                    tenant.user?.email || 'N/A',
                    tenant.plan?.name || 'N/A',
                    tenant.status,
                    tenant.payment_status,
                    tenant.trial_ends_at ? new Date(tenant.trial_ends_at).toLocaleDateString() : 'N/A',
                    tenant.next_billing_date ? new Date(tenant.next_billing_date).toLocaleDateString() : 'N/A',
                    tenant.created_at ? new Date(tenant.created_at).toLocaleDateString() : 'N/A',
                    tenant.domain || 'N/A',
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tenants.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleClearFilters = () => {
        setFilterText('');
        setStatusFilter('all');
        setPaymentFilter('all');
        setCurrentPage(1);
    };

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

    const getPaymentStatusBadge = (paymentStatus: PaymentStatus) => {
        const statusStyles = {
            trial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white',
            paid: 'bg-green-100 text-green-800 dark:bg-emerald-800 dark:text-white',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-white',
            overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white',
            failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white',
        };

        return (
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[paymentStatus]}`}>
                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
            </span>
        );
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return (
                <div className="h-4 w-4 opacity-30">
                    <ChevronUp className="h-4 w-4" />
                </div>
            );
        }
        return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />;
    };

    // Function to open payment link modal
    const openPaymentLinkModal = (tenant: Tenant) => {
        setPaymentLinkTenant(tenant);
        setOpenPaymentLink(true);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterText, statusFilter, paymentFilter]);

    useEffect(() => {
        setTenants(initialTenants || []);
    }, [initialTenants]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenant Management" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tenant Management</h1>
                        <p className="mt-1 text-slate-600 dark:text-white">Manage tenant subscriptions and billing</p>
                    </div>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="rounded-lg bg-slate-900 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Tenant
                    </Button>
                </div>

                {/* Filters Section */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-black">
                    <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search tenants..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700"
                            />
                        </div>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={(value: 'all' | TenantStatus) => setStatusFilter(value)}>
                            <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="trial">Trial</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Payment Filter */}
                        <Select value={paymentFilter} onValueChange={(value: 'all' | PaymentStatus) => setPaymentFilter(value)}>
                            <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payments</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="trial">Trial</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Items per page */}
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                            <SelectTrigger className="h-10 w-32 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 per page</SelectItem>
                                <SelectItem value="10">10 per page</SelectItem>
                                <SelectItem value="25">25 per page</SelectItem>
                                <SelectItem value="50">50 per page</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-3 dark:text-slate-300">
                            <Button
                                onClick={handleExport}
                                variant="outline"
                                size="sm"
                                className="h-10 rounded-lg border-slate-200 px-4 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>

                            <Button
                                onClick={handleClearFilters}
                                variant="outline"
                                size="sm"
                                className="h-10 rounded-lg border-slate-200 px-4 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    {/* Results summary */}
                    <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                        Showing <span className="font-medium text-slate-900 dark:text-slate-300">{paginatedTenants.length}</span> of{' '}
                        <span className="font-medium text-slate-900 dark:text-slate-300">{filteredAndSortedTenants.length}</span> results
                        {filterText && (
                            <span>
                                {' '}
                                for "<span className="font-medium text-blue-600">{filterText}</span>"
                            </span>
                        )}
                    </div>
                </div>
                {/* Data Table */}
                <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm dark:border-slate-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-black">
                                <tr>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Tenant Info
                                            <SortIcon field="id" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('user.name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            User & Plan
                                            <SortIcon field="user.name" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Status
                                            <SortIcon field="status" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('payment_status')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Payment Info
                                            <SortIcon field="payment_status" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedTenants.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">No tenants found</h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any tenants matching your criteria. Try adjusting your search terms or filters.
                                                </p>
                                                <Button
                                                    onClick={handleClearFilters}
                                                    variant="outline"
                                                    size="sm"
                                                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                >
                                                    Clear all filters
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedTenants.map((tenant: Tenant) => (
                                        <tr key={tenant.id} className="transition-colors dark:text-white">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-semibold text-slate-800 dark:text-white">
                                                            {tenant.company_name || `Tenant #${tenant.id}`}
                                                        </div>
                                                        {tenant.payment_overdue_days && tenant.payment_overdue_days > 0 && (
                                                            <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                                                        )}
                                                    </div>
                                                    <div className="mt-1 text-xs text-slate-500 dark:text-white">ID: {tenant.id}</div>
                                                    {tenant.domain && (
                                                        <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">{tenant.domain}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-white">
                                                        <Users className="mr-1 h-4 w-4 text-gray-500 dark:text-slate-400" />
                                                        {tenant.user?.name || 'N/A'}
                                                    </div>
                                                    {tenant.user?.email && (
                                                        <div className="mt-1 text-xs text-slate-500 dark:text-white">{tenant.user.email}</div>
                                                    )}
                                                    <div className="mt-1 flex items-center text-xs text-slate-600 dark:text-white">
                                                        <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                                                        {tenant.plan?.name || 'No Plan'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    {getStatusBadge(tenant.status)}
                                                    {tenant.is_on_trial && tenant.trial_ends_at && (
                                                        <div className="flex items-center text-xs text-blue-600 dark:text-white">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            <Countdown endsAt={tenant.trial_ends_at} />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    {getPaymentStatusBadge(tenant.payment_status)}
                                                    {tenant.next_billing_date && (
                                                        <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                                                            <Calendar className="mr-1 h-3 w-3" />
                                                            Next: {new Date(tenant.next_billing_date).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    {tenant.payment_overdue_days && tenant.payment_overdue_days > 0 && (
                                                        <div className="text-xs text-red-600">{tenant.payment_overdue_days} days overdue</div>
                                                    )}

                                                    {(tenant.payment_status === 'overdue' || tenant.payment_status === 'pending') && (
                                                        <Button
                                                            onClick={() => openPaymentLinkModal(tenant)}
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-6 border-purple-200 px-2 text-xs text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900"
                                                        >
                                                            <LinkIcon className="mr-1 h-3 w-3" />
                                                            Payment Link
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            aria-label={`More actions for tenant ${tenant.id}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuItem
                                                            onClick={() => openEditModal(tenant)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <SquarePen className="mr-2 h-4 w-4" />
                                                            Edit Tenant
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => openMarkPaymentModal(tenant)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <CreditCard className="mr-2 h-4 w-4 text-green-600" />
                                                            Mark Payment
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => openChangeStatusModal(tenant)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <Users className="mr-2 h-4 w-4 text-blue-600" />
                                                            Change Status
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => openPaymentLinkModal(tenant)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <LinkIcon className="mr-2 h-4 w-4 text-purple-600" />
                                                            Generate Payment Link
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(tenant)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Tenant
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex cursor-pointer items-center px-2 py-2 text-sm">
                                                            <a
                                                                href={route('login.as.central', tenant.id)}
                                                                className="flex items-center justify-center gap-2"
                                                                target={'_blank'}
                                                            >
                                                                <Key className="mr-2 h-4 w-4 text-blue-600" />
                                                                Login as tenant
                                                            </a>
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="border-t border-slate-200 bg-white px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-slate-600">
                                    Page <span className="mx-1 font-medium">{currentPage}</span> of{' '}
                                    <span className="mx-1 font-medium">{totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            const pageNum = i + 1;
                                            if (totalPages <= 5) {
                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        variant={currentPage === pageNum ? 'default' : 'outline'}
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-sm"
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <Button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals */}
                <CreateTenant open={openCreate} onClose={() => setOpenCreate(false)} users={users} plans={plans} />

                {openEdit && editTenantData && (
                    <EditTenant open={openEdit} onClose={() => setOpenEdit(false)} users={users} plans={plans} tenant={editTenantData} />
                )}

                {openMarkPayment && selectedTenant && (
                    <MarkPaymentModal
                        open={openMarkPayment}
                        onClose={() => setOpenMarkPayment(false)}
                        tenant={selectedTenant}
                        onSuccess={() => {
                            setOpenMarkPayment(false);
                            router.reload({ only: ['tenants'] });
                        }}
                    />
                )}

                {openChangeStatus && selectedTenant && (
                    <ChangeStatusModal
                        open={openChangeStatus}
                        onClose={() => setOpenChangeStatus(false)}
                        tenant={selectedTenant}
                        onSuccess={() => {
                            setOpenChangeStatus(false);
                            router.reload({ only: ['tenants'] });
                        }}
                    />
                )}

                {openPaymentLink && paymentLinkTenant && (
                    <GeneratePaymentLinkModal
                        open={openPaymentLink}
                        onClose={() => {
                            setOpenPaymentLink(false);
                            setPaymentLinkTenant(null);
                        }}
                        tenant={paymentLinkTenant}
                        onSuccess={() => {
                            setOpenPaymentLink(false);
                            router.reload({ only: ['tenants'] });
                        }}
                    />
                )}

                <DeleteConfirmationModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Delete Tenant"
                    message="Are you sure you want to delete this tenant? This will permanently delete all tenant data and cannot be undone."
                    confirmButtonText="Yes, Delete"
                    cancelButtonText="Cancel"
                />
            </div>
        </AppLayout>
    );
}
