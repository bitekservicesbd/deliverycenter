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
    name: string;
}

interface Log {
    id: number;
    user: User | null;
    action: string;
    description: string;
    created_at: string;
}

interface Props {
    logs: {
        data: Log[];
    };
}

type SortField = 'user.name' | 'action' | 'description' | 'created_at';
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Activity Log', href: route('central.activity-log.index') },
];

export default function ActivityLog() {
    const { logs: initialLogs } = usePage<Props>().props;
    const [activityLogs, setActivityLogs] = useState<Log[]>(initialLogs.data || []);

    // Table state
    const [filterText, setFilterText] = useState('');
    const [sortField, setSortField] = useState<SortField>('created_at');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState<Log | null>(null);

    // Filtered and sorted data
    const filteredAndSortedLogs = useMemo(() => {
        const filtered = activityLogs.filter((log: Log) => {
            const searchText = filterText.toLowerCase();
            const userName = log.user?.name?.toLowerCase() || '';
            const action = log.action?.toLowerCase() || '';
            const description = log.description?.toLowerCase() || '';
            return userName.includes(searchText) || action.includes(searchText) || description.includes(searchText);
        });

        filtered.sort((a: Log, b: Log) => {
            let aValue: string | Date = '';
            let bValue: string | Date = '';

            if (sortField === 'user.name') {
                aValue = a.user?.name?.toLowerCase() || '';
                bValue = b.user?.name?.toLowerCase() || '';
            } else if (sortField === 'action') {
                aValue = a.action?.toLowerCase() || '';
                bValue = b.action?.toLowerCase() || '';
            } else if (sortField === 'description') {
                aValue = a.description?.toLowerCase() || '';
                bValue = b.description?.toLowerCase() || '';
            } else if (sortField === 'created_at') {
                aValue = new Date(a.created_at);
                bValue = new Date(b.created_at);
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [activityLogs, filterText, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedLogs.length / itemsPerPage);
    const paginatedLogs = filteredAndSortedLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    const handleDelete = (log: Log) => {
        setSelectedLog(log);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        if (selectedLog) {
            router.delete(route('central.activity-log.delete', selectedLog.id));
        }
        setShowDeleteModal(false);
        setSelectedLog(null);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedLog(null);
    };

    // Export to CSV
    const handleExport = () => {
        const csvContent = [
            ['User', 'Action', 'Description', 'Timestamp'].join(','),
            ...filteredAndSortedLogs.map((log: Log) =>
                [
                    log.user?.name || 'Unknown',
                    log.action || 'N/A',
                    log.description || 'N/A',
                    log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A',
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'activity-logs.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilterText('');
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

    // Update logs when props change
    useEffect(() => {
        setActivityLogs(initialLogs.data || []);
    }, [initialLogs]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Log" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
                    <p className="mt-1 text-slate-600 dark:text-white">View and manage system activity logs</p>
                </div>

                {/* Filters Section */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-black">
                    <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400 dark:text-slate-300" />
                            <Input
                                type="text"
                                placeholder="Search by user, action, or description..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                            />
                        </div>

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
                        Showing <span className="font-medium text-slate-900 dark:text-white">{paginatedLogs.length}</span> of{' '}
                        <span className="font-medium text-slate-900 dark:text-white">{filteredAndSortedLogs.length}</span> results
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
                                        onClick={() => handleSort('user.name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            User
                                            <SortIcon field="user.name" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('action')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Action
                                            <SortIcon field="action" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('description')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Description
                                            <SortIcon field="description" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none"
                                        onClick={() => handleSort('created_at')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Timestamp
                                            <SortIcon field="created_at" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">No logs found</h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any logs matching your criteria. Try adjusting your search terms or filters.
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
                                    paginatedLogs.map((log) => (
                                        <tr key={log.id} className="transition-colors dark:bg-black">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                {log.user?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-white">{log.action || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-white">{log.description || 'N/A'}</td>
                                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-white">
                                                {log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            aria-label={`More actions for log ${log.action} by ${log.user?.name || 'Unknown'}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(log)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Log
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
