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

type DemoRequest = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company_name: string;
    created_at?: string;
};

type PageProps = {
    demo: DemoRequest[];
};

type SortField = keyof DemoRequest;
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Demo Requests', href: route('central.demo-request.index') },
];

export default function Index() {
    const { demo: initialDemo } = usePage<PageProps>().props;
    const [demoRequests, setDemoRequests] = useState<DemoRequest[]>(initialDemo || []);

    // Table state
    const [filterText, setFilterText] = useState('');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);

    // Filtered and sorted data
    const filteredAndSortedDemo = useMemo(() => {
        let filtered = demoRequests.filter((request: DemoRequest) => {
            const matchesSearch =
                request.name?.toLowerCase().includes(filterText.toLowerCase()) ||
                request.email?.toLowerCase().includes(filterText.toLowerCase()) ||
                request.company_name?.toLowerCase().includes(filterText.toLowerCase()) ||
                request.phone?.includes(filterText) ||
                false;

            return matchesSearch;
        });

        // Sort data
        filtered.sort((a: DemoRequest, b: DemoRequest) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [demoRequests, filterText, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedDemo.length / itemsPerPage);
    const paginatedDemo = filteredAndSortedDemo.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    const handleDelete = (request: DemoRequest) => {
        setSelectedRequest(request);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        if (selectedRequest) {
            router.visit(route('central.demo-request.delete', selectedRequest.id));
        }
        setShowDeleteModal(false);
        setSelectedRequest(null);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedRequest(null);
    };

    const handleExport = () => {
        const csvContent = [
            ['Name', 'Email', 'Phone', 'Company', 'Date'].join(','),
            ...filteredAndSortedDemo.map((request: DemoRequest) =>
                [
                    request.name || 'N/A',
                    request.email || 'N/A',
                    request.phone || 'N/A',
                    request.company_name || 'N/A',
                    request.created_at ? new Date(request.created_at).toLocaleDateString() : 'N/A',
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'demo-requests.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleClearFilters = () => {
        setFilterText('');
        setCurrentPage(1);
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

    // Reset filters when they change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterText]);

    useEffect(() => {
        setDemoRequests(initialDemo || []);
    }, [initialDemo]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Demo Requests" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Demo Requests</h1>
                        <p className="mt-1 text-slate-600 dark:text-white">Manage and track demo requests from potential customers</p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-black">
                    <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search by name, email, company, or phone..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700"
                            />
                        </div>

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
                        </div>
                    </div>

                    {/* Results summary */}
                    <div className="mt-4 text-sm text-slate-600">
                        Showing <span className="font-medium text-slate-900">{paginatedDemo.length}</span> of{' '}
                        <span className="font-medium text-slate-900">{filteredAndSortedDemo.length}</span> results
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
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Name
                                            <SortIcon field="name" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Email
                                            <SortIcon field="email" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('phone')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Phone
                                            <SortIcon field="phone" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('company_name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Company
                                            <SortIcon field="company_name" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedDemo.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">
                                                    No demo requests found
                                                </h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any demo requests matching your criteria. Try adjusting your search terms or
                                                    filters.
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
                                    paginatedDemo.map((request: DemoRequest) => (
                                        <tr key={request.id} className="transition-colors dark:bg-black">
                                            <td className="px-6 py-4 dark:text-slate-500 dark:hover:text-white">
                                                <div className="text-sm font-semibold text-slate-800 dark:text-white">{request.name || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 dark:text-white">
                                                <div className="text-sm text-slate-700 dark:text-white">{request.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700 dark:text-white">{request.phone || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700 dark:text-white">{request.company_name || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-700 dark:text-white">
                                                    {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            aria-label={`More actions for demo request from ${request.name}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(request)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Request
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

                                    {/* Page numbers */}
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

                <DeleteConfirmationModal show={showDeleteModal} onClose={cancelDelete} onConfirm={confirmDelete} />
            </div>
        </AppLayout>
    );
}
