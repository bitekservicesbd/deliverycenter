import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Download, MoreHorizontal, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface User {
    email: string;
}

interface LoginAttempt {
    id: number;
    ip_address: string;
    email?: string;
    user?: User | null;
    user_type: 'central' | 'tenant';
    tenant_domain: string | null;
    blocked_at: string;
}

interface Props {
    loginAttempts: LoginAttempt[];
}

type SortField = 'ip_address' | 'user_email' | 'blocked_at' | 'user_type' | 'tenant_domain';
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Blocked IPs', href: route('central.blocked.ip.index') },
];

export default function Index() {
    const { loginAttempts: initialLoginAttempts } = usePage<Props>().props;
    const [blockedIPs, setBlockedIPs] = useState<LoginAttempt[]>(initialLoginAttempts?.data || []);

    // Table state
    const [filterText, setFilterText] = useState('');
    const [sortField, setSortField] = useState<SortField>('blocked_at');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLoginAttempt, setSelectedLoginAttempt] = useState<LoginAttempt | null>(null);

    // Filtered and sorted data
    const [userTypeFilter, setUserTypeFilter] = useState<string>('all');

    const filteredAndSortedIPs = useMemo(() => {
        const searchText = filterText.toLowerCase();

        let filtered = blockedIPs.filter((attempt: LoginAttempt) => {
            const ipAddress = attempt.ip_address?.toLowerCase() || '';
            const userEmail = attempt.email?.toLowerCase() || attempt?.email?.toLowerCase() || '';
            const userType = attempt.user_type?.toLowerCase() || '';
            const tenantDomain = attempt.tenant_domain?.toLowerCase() || '';

            return (
                ipAddress.includes(searchText) || userEmail.includes(searchText) || userType.includes(searchText) || tenantDomain.includes(searchText)
            );
        });

        if (userTypeFilter !== 'all') {
            filtered = filtered.filter((attempt) => attempt.user_type === userTypeFilter);
        }

        const sorted = [...filtered].sort((a, b) => {
            let aValue = a[sortField as keyof LoginAttempt];
            let bValue = b[sortField as keyof LoginAttempt];

            if (sortField === 'tenant_domain') {
                aValue = a.tenant_domain || '';
                bValue = b.tenant_domain || '';
            }

            if (sortField === 'user_type') {
                aValue = a.user_type || '';
                bValue = b.user_type || '';
            }

            return sortDirection === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
        });

        return sorted;
    }, [blockedIPs, filterText, sortField, sortDirection, userTypeFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedIPs.length / itemsPerPage);
    const paginatedIPs = filteredAndSortedIPs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    // Handle delete - show modal
    const handleDelete = (loginAttempt: LoginAttempt) => {
        setSelectedLoginAttempt(loginAttempt);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        if (selectedLoginAttempt) {
            router.delete(route('central.blocked.ip.delete', selectedLoginAttempt.id));
        }
        setShowDeleteModal(false);
        setSelectedLoginAttempt(null);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedLoginAttempt(null);
    };

    // Export to CSV
    const handleExport = () => {
        const csvContent = [
            ['IP Address', 'User Email', 'User Type', 'Tenant Domain', 'Blocked At'].join(','),
            ...filteredAndSortedIPs.map((attempt: LoginAttempt) =>
                [
                    attempt.ip_address || '-',
                    attempt.email || '-',
                    attempt.user_type || '-',
                    attempt.tenant_domain || '-',
                    attempt.blocked_at ? new Date(attempt.blocked_at).toLocaleString() : '-',
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blocked-ips.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilterText('');
        setUserTypeFilter('all');
        setCurrentPage(1);
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

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterText]);

    // Update blocked IPs when props change
    useEffect(() => {
        setBlockedIPs(initialLoginAttempts || []);
    }, [initialLoginAttempts]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blocked IPs" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blocked IP Addresses</h1>
                    <p className="mt-1 text-slate-600 dark:text-white">View and manage blocked IP addresses from failed login attempts</p>
                </div>

                {/* Filters Section */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-black">
                    <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400 dark:text-slate-300" />
                            <Input
                                type="text"
                                placeholder="Search by IP address or user email..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            />
                        </div>

                        <Select value={userTypeFilter} onValueChange={(value) => setUserTypeFilter(value)}>
                            <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                <SelectValue placeholder="Filter by User Type" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="central">Central</SelectItem>
                                <SelectItem value="tenant">Tenant</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Items per page */}
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                            <SelectTrigger className="h-10 w-32 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800 dark:text-slate-300">
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
                    <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        Showing <span className="font-medium text-slate-900 dark:text-white">{paginatedIPs.length}</span> of{' '}
                        <span className="font-medium text-slate-900 dark:text-white">{filteredAndSortedIPs.length}</span> results
                        {filterText && (
                            <span>
                                {' '}
                                for "<span className="font-medium text-blue-600 dark:text-blue-400">{filterText}</span>"
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
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('ip_address')}
                                    >
                                        <div className="flex items-center justify-between">
                                            IP Address
                                            <SortIcon field="ip_address" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('user_email')}
                                    >
                                        <div className="flex items-center justify-between">
                                            User Email
                                            <SortIcon field="user_email" />
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('user_type')}
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase"
                                    >
                                        <div className="flex items-center justify-between">
                                            User Type
                                            <SortIcon field="user_type" />
                                        </div>
                                    </th>
                                    <th
                                        onClick={() => handleSort('tenant_domain')}
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase"
                                    >
                                        <div className="flex items-center justify-between">
                                            Tenant Domain
                                            <SortIcon field="tenant_domain" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('blocked_at')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Blocked At
                                            <SortIcon field="blocked_at" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedIPs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">
                                                    No blocked IPs found
                                                </h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any blocked IP addresses matching your criteria. Try adjusting your search terms
                                                    or filters.
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
                                    paginatedIPs.map((attempt) => (
                                        <tr key={attempt.id} className="transition-colors dark:bg-black">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                <code className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
                                                    {attempt.ip_address || '-'}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-white">{attempt.email || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-white">{attempt.user_type}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-white">{attempt.tenant_domain || '-'}</td>
                                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-white">
                                                {attempt.blocked_at ? new Date(attempt.blocked_at).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            aria-label={`More actions for IP ${attempt.ip_address}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(attempt)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Record
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
                        <div className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-black">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    Page <span className="mx-1 font-medium text-slate-900 dark:text-white">{currentPage}</span> of{' '}
                                    <span className="mx-1 font-medium text-slate-900 dark:text-white">{totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
                                                        className={`h-8 w-8 p-0 text-sm ${
                                                            currentPage !== pageNum
                                                                ? 'dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                                                                : ''
                                                        }`}
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
                                        className="h-8 w-8 p-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal show={showDeleteModal} onClose={cancelDelete} onConfirm={confirmDelete} />
            </div>
        </AppLayout>
    );
}
