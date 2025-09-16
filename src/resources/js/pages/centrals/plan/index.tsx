import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import CreatePlan from '@/pages/centrals/plan/create';
import EditPlan from '@/pages/centrals/plan/edit';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    DollarSign,
    Download,
    Filter,
    Globe,
    MoreHorizontal,
    Plus,
    Search,
    SquarePen,
    Star,
    Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Plan = {
    id: number;
    name: string;
    description?: string;
    monthly_price?: number;
    yearly_price?: number;
    custom_price?: number;
    currency?: string;
    billing_cycle?: 'monthly' | 'yearly' | 'custom';
    trial_days?: number;
    is_active: boolean;
    is_featured?: boolean;
    tenants_count?: number;
    formatted_price?: string;
    created_at?: string;
    updated_at?: string;
};

type PageProps = {
    plans: Plan[];
};

type SortField = keyof Plan;
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Plan Management', href: route('central.plans.index') },
];

export default function Index() {
    const { plans: initialPlans = [] } = usePage<PageProps>().props;
    const [plans, setPlans] = useState<Plan[]>(initialPlans);

    // Table state
    const [filterText, setFilterText] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [billingFilter, setBillingFilter] = useState<'all' | 'monthly' | 'yearly' | 'custom'>('all');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Modal states
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editPlan, setEditPlan] = useState<Plan | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

    // Filtered and sorted data
    const filteredAndSortedPlans = useMemo(() => {
        const filtered = plans.filter((plan: Plan) => {
            const matchesSearch = plan.name?.toLowerCase().includes(filterText.toLowerCase()) ?? false;
            const matchesStatus =
                statusFilter === 'all' || (statusFilter === 'active' && plan.is_active) || (statusFilter === 'inactive' && !plan.is_active);
            const matchesBilling = billingFilter === 'all' || plan.billing_cycle === billingFilter;

            return matchesSearch && matchesStatus && matchesBilling;
        });

        filtered.sort((a: Plan, b: Plan) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Provide default values for undefined
            if (aValue === undefined || aValue === null) aValue = '';
            if (bValue === undefined || bValue === null) bValue = '';

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [plans, filterText, statusFilter, billingFilter, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedPlans.length / itemsPerPage);
    const paginatedPlans = filteredAndSortedPlans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Dynamic pagination range
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        const pages: (number | string)[] = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    // Handle sorting
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    // Handle row selection
    const handleRowSelect = (planId: number) => {
        setSelectedRows((prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]));
    };

    const handleSelectAll = () => {
        if (selectedRows.length === paginatedPlans.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedPlans.map((plan) => plan.id));
        }
    };

    // Toggle active status
    const toggleActive = (id: number) => {
        router.post(
            route('central.plans.toggle.status', id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPlans((prevPlans) => prevPlans.map((plan) => (plan.id === id ? { ...plan, is_active: !plan.is_active } : plan)));
                },
                onError: () => {
                    alert('Failed to update status.');
                },
            },
        );
    };

    // Toggle featured status
    const toggleFeatured = (id: number) => {
        router.post(
            route('central.plans.toggle.featured', id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPlans((prevPlans) => prevPlans.map((plan) => (plan.id === id ? { ...plan, is_featured: !plan.is_featured } : plan)));
                },
                onError: () => {
                    alert('Failed to update featured status.');
                },
            },
        );
    };

    // Handle single delete
    const handleDeleteClick = (id: number) => {
        setSelectedPlanId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!selectedPlanId) return;

        router.delete(route('central.plans.delete', selectedPlanId), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedPlanId(null);
                setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== selectedPlanId));
            },
            onError: () => {
                alert('Failed to delete plan.');
            },
        });
    };

    // Handle bulk delete
    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;
        setShowBulkDeleteModal(true);
    };

    const confirmBulkDelete = async () => {
        if (selectedRows.length === 0) return;

        try {
            await Promise.all(
                selectedRows.map(
                    (planId) =>
                        new Promise((resolve, reject) =>
                            router.delete(route('central.plans.delete', planId), {
                                onSuccess: () => resolve(true),
                                onError: () => reject(new Error(`Failed to delete plan ${planId}`)),
                            }),
                        ),
                ),
            );
            setPlans((prevPlans) => prevPlans.filter((plan) => !selectedRows.includes(plan.id)));
            setSelectedRows([]);
            setShowBulkDeleteModal(false);
        } catch (error) {
            alert('Some plans could not be deleted.');
            console.error(error);
        }
    };

    // Open edit modal
    const openEditModal = (plan: Plan) => {
        setEditPlan({ ...plan });
        setOpenEdit(true);
    };

    // Handle edit success
    const handleEditSuccess = (updatedPlan: Plan) => {
        setPlans((prevPlans) => prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
        setOpenEdit(false);
        setEditPlan(null);
    };

    // Format price display
    const getPriceDisplay = (plan: Plan): string => {
        if (plan.formatted_price) return plan.formatted_price;

        const currency = plan.currency || 'USD';
        if (plan.custom_price) {
            return `${plan.custom_price} ${currency} / Custom`;
        } else if (plan.monthly_price) {
            return `${plan.monthly_price} ${currency} / Month`;
        } else if (plan.yearly_price) {
            return `${plan.yearly_price} ${currency} / Year`;
        }
        return 'Contact for pricing';
    };

    // Export to CSV
    const handleExport = () => {
        const csvContent = [
            ['Name', 'Description', 'Pricing', 'Billing Cycle', 'Trial Days', 'Status', 'Featured', 'Active Tenants'].join(','),
            ...filteredAndSortedPlans.map((plan: Plan) =>
                [
                    plan.name || 'N/A',
                    plan.description || 'N/A',
                    getPriceDisplay(plan),
                    plan.billing_cycle || 'N/A',
                    plan.trial_days || '0',
                    plan.is_active ? 'Active' : 'Inactive',
                    plan.is_featured ? 'Yes' : 'No',
                    plan.tenants_count || '0',
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plans.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilterText('');
        setStatusFilter('all');
        setBillingFilter('all');
        setCurrentPage(1);
        setSelectedRows([]);
    };

    // Sort icon component
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

    // Reset filters and selections
    useEffect(() => {
        setCurrentPage(1);
        setSelectedRows([]);
    }, [filterText, statusFilter, billingFilter]);

    useEffect(() => {
        setPlans(initialPlans || []);
    }, [initialPlans]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plan Management" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscription Plans</h1>
                        <p className="mt-1 text-slate-600 dark:text-white">Manage pricing plans and billing cycles</p>
                    </div>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="rounded-lg bg-slate-900 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Plan
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
                                placeholder="Search plans..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                                <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Billing Cycle Filter */}
                        <Select value={billingFilter} onValueChange={(value: 'all' | 'monthly' | 'yearly' | 'custom') => setBillingFilter(value)}>
                            <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                <SelectValue placeholder="All Billing" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Billing</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
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
                        <div className="flex items-center space-x-3">
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
                            {selectedRows.length > 0 && (
                                <Button
                                    onClick={handleBulkDelete}
                                    className="h-10 rounded-lg bg-red-500 px-4 text-white hover:bg-red-600 dark:text-slate-300"
                                    size="sm"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete ({selectedRows.length})
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Results summary */}
                    <div className="mt-4 text-sm text-slate-600">
                        Showing <span className="font-medium text-slate-900">{paginatedPlans.length}</span> of{' '}
                        <span className="font-medium text-slate-900">{filteredAndSortedPlans.length}</span> results
                        {filterText && (
                            <span>
                                {' '}
                                for "<span className="font-medium text-blue-600">{filterText}</span>"
                            </span>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-slate-300 dark:border-slate-700 dark:bg-black">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        <Checkbox
                                            checked={selectedRows.length === paginatedPlans.length && paginatedPlans.length > 0}
                                            onCheckedChange={handleSelectAll}
                                            className="border-slate-300"
                                            aria-label="Select all plans"
                                        />
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Plan Name
                                            <SortIcon field="name" />
                                        </div>
                                    </th>
                                    <th className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                        Pricing & Billing
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('trial_days')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Trial Period
                                            <SortIcon field="trial_days" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('tenants_count')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Active Tenants
                                            <SortIcon field="tenants_count" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('is_active')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Status
                                            <SortIcon field="is_active" />
                                        </div>
                                    </th>
                                    <th className="cursor-pointer px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedPlans.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">No plans found</h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any plans matching your criteria. Try adjusting your search terms or filters.
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
                                    paginatedPlans.map((plan: Plan) => (
                                        <tr key={plan.id} className="transition-colors dark:bg-black">
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    checked={selectedRows.includes(plan.id)}
                                                    onCheckedChange={() => handleRowSelect(plan.id)}
                                                    className="border-slate-300 dark:text-slate-500 dark:hover:text-white"
                                                    aria-label={`Select plan ${plan.name}`}
                                                />
                                            </td>
                                            <td className="px-6 py-4 dark:text-white">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-semibold text-slate-800 dark:text-white">
                                                                {plan.name || 'N/A'}
                                                            </div>
                                                            {plan.is_featured && <Star className="ml-2 h-4 w-4 fill-current text-yellow-500" />}
                                                        </div>
                                                        {plan.description && (
                                                            <div className="mt-1 text-xs text-slate-500 dark:text-white">{plan.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <div className="flex items-center font-medium text-slate-800 dark:text-white">
                                                        <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                                                        {getPriceDisplay(plan)}
                                                    </div>
                                                    <div className="mt-1 text-xs text-slate-500 capitalize dark:text-white">
                                                        {plan.billing_cycle || 'Not set'} billing
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-slate-700 dark:text-white">
                                                    <Clock className="mr-1 h-4 w-4 text-blue-600 dark:text-white dark:hover:text-white" />
                                                    {plan.trial_days || 0} days
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-slate-700 dark:text-white">
                                                    <Globe className="mr-1 h-4 w-4 text-purple-600" />
                                                    {plan.tenants_count || 0} tenants
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <label className="relative inline-flex cursor-pointer items-center dark:text-slate-500">
                                                        <input
                                                            type="checkbox"
                                                            checked={plan.is_active}
                                                            onChange={() => toggleActive(plan.id)}
                                                            className="peer sr-only"
                                                            aria-label={`Toggle active status for ${plan.name}`}
                                                        />
                                                        <div
                                                            title={'Change Status'}
                                                            className="peer h-6 w-11 rounded-full bg-rose-600 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
                                                        ></div>
                                                    </label>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            plan.is_active
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500 dark:text-white'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-rose-600 dark:text-white'
                                                        }`}
                                                    >
                                                        {plan.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            aria-label={`More actions for ${plan.name}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => openEditModal(plan)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <SquarePen className="mr-2 h-4 w-4" />
                                                            Edit Plan
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => toggleFeatured(plan.id)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <Star className="mr-2 h-4 w-4" />
                                                            {plan.is_featured ? 'Remove Featured' : 'Mark Featured'}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(plan.id)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Plan
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
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {getPageNumbers().map((page, index) =>
                                            typeof page === 'string' ? (
                                                <span key={index} className="px-2 text-slate-600">
                                                    {page}
                                                </span>
                                            ) : (
                                                <Button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    variant={currentPage === page ? 'default' : 'outline'}
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-sm"
                                                    aria-label={`Go to page ${page}`}
                                                >
                                                    {page}
                                                </Button>
                                            ),
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Create Plan Modal */}
                <CreatePlan open={openCreate} onClose={() => setOpenCreate(false)} />

                {/* Edit Plan Modal */}
                {editPlan && <EditPlan open={openEdit} onClose={() => setOpenEdit(false)} plan={editPlan} onSuccess={handleEditSuccess} />}

                {/* Delete Confirmation Modals */}
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Delete Plan"
                    message="Are you sure you want to delete this plan? This action cannot be undone."
                    confirmButtonText="Yes, Delete"
                    cancelButtonText="Cancel"
                />
                <DeleteConfirmationModal
                    show={showBulkDeleteModal}
                    onClose={() => setShowBulkDeleteModal(false)}
                    onConfirm={confirmBulkDelete}
                    title="Delete Multiple Plans"
                    message={`Are you sure you want to delete ${selectedRows.length} plan(s)? This action cannot be undone.`}
                    confirmButtonText="Yes, Delete All"
                    cancelButtonText="Cancel"
                />
            </div>
        </AppLayout>
    );
}
