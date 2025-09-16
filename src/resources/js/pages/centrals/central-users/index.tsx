import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import CreateUser from '@/pages/centrals/central-users/create';
import EditUser from '@/pages/centrals/central-users/edit';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Download,
    Filter,
    KeyRound,
    MoreHorizontal,
    Plus,
    Search,
    SquarePen,
    Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type User = {
    id: number;
    username: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'blocked';
};

type PageProps = {
    users: User[];
};

type SortField = keyof User;
type SortDirection = 'asc' | 'desc';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Central Users', href: route('central.users.index') },
];

export default function Index() {
    const { users: initialUsers } = usePage<PageProps>().props;
    const [users, setUsers] = useState<User[]>(initialUsers || []);

    // Table state
    const [filterText, setFilterText] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'blocked'>('all');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Modal states
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);

    // Filtered and sorted data
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = users.filter((user: User) => {
            const matchesSearch =
                user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
                user.username?.toLowerCase().includes(filterText.toLowerCase()) ||
                user.email?.toLowerCase().includes(filterText.toLowerCase());
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        // Sort data
        filtered.sort((a: User, b: User) => {
            let aValue: string | boolean = a[sortField] as string | boolean;
            let bValue: string | boolean = b[sortField] as string | boolean;

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
    }, [users, filterText, statusFilter, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
    const paginatedUsers = filteredAndSortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    const handleRowSelect = (userId: number) => {
        setSelectedRows((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
    };

    const handleSelectAll = () => {
        if (selectedRows.length === paginatedUsers.length && paginatedUsers.length > 0) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedUsers.map((user) => user.id));
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!selectedUserId) return;

        router.delete(route('central.users.delete', selectedUserId), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedUserId(null);
                router.reload({ only: ['users'] });
            },
        });
    };

    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;
        setShowBulkDeleteModal(true);
    };

    const confirmBulkDelete = () => {
        if (selectedRows.length === 0) return;

        selectedRows.forEach((planId) => {
            router.delete(route('central.users.delete', planId), {
                onSuccess: () => {
                    router.reload({ only: ['users'] });
                },
            });
        });

        setSelectedRows([]);
        setShowBulkDeleteModal(false);
    };

    const openEditModal = (user: User) => {
        setEditUser(user);
        setOpenEdit(true);
    };

    const handleResetPasswordSent = (id: number) => {
        router.post(
            route('central.users.reset.password', id),
            {},
            {
                onSuccess: () => {
                    router.reload({ only: ['users'] });
                },
            },
        );
    };

    // Utility functions
    const handleExport = () => {
        const csvContent = [
            ['Username', 'Name', 'Email', 'Status'].join(','),
            ...filteredAndSortedUsers.map((user: User) =>
                [user.username || 'N/A', user.name || 'N/A', user.email || 'N/A', user.status.charAt(0).toUpperCase() + user.status.slice(1)].join(
                    ',',
                ),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleClearFilters = () => {
        setFilterText('');
        setStatusFilter('all');
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

    // Effects
    useEffect(() => {
        setCurrentPage(1);
        setSelectedRows([]);
    }, [filterText, statusFilter]);

    useEffect(() => {
        setUsers(initialUsers || []);
    }, [initialUsers]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-black">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Central Users</h1>
                        <p className="mt-1 text-slate-600 dark:text-white">Manage your central users</p>
                    </div>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="rounded-lg bg-slate-900 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:shadow-xl"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
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
                                placeholder="Search users by name, username, or email..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="h-10 rounded-lg border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive' | 'blocked') => setStatusFilter(value)}>
                                <SelectTrigger className="h-10 w-40 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:text-slate-300">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="blocked">Blocked</SelectItem>
                                </SelectContent>
                            </Select>
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

                            {selectedRows.length > 0 && (
                                <Button
                                    onClick={handleBulkDelete}
                                    className="h-10 rounded-lg bg-red-500 px-4 hover:bg-red-600 dark:text-slate-300"
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
                        Showing <span className="font-medium text-slate-900">{paginatedUsers.length}</span> of{' '}
                        <span className="font-medium text-slate-900">{filteredAndSortedUsers.length}</span> results
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
                                            checked={selectedRows.length === paginatedUsers.length && paginatedUsers.length > 0}
                                            onCheckedChange={handleSelectAll}
                                            className="border-slate-300"
                                        />
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none dark:text-slate-500"
                                        onClick={() => handleSort('username')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Username
                                            <SortIcon field="username" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none dark:text-slate-500"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Name
                                            <SortIcon field="name" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none dark:text-slate-500"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Email
                                            <SortIcon field="email" />
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase transition-colors select-none dark:text-slate-500"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Status
                                            <SortIcon field="status" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-black">
                                {paginatedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-300">No users found</h3>
                                                <p className="mb-4 max-w-md text-center text-slate-500 dark:text-slate-300">
                                                    We couldn't find any users matching your criteria. Try adjusting your search terms or filters.
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
                                    paginatedUsers.map((user: User) => (
                                        <tr key={user.id} className="transition-colors dark:text-white">
                                            <td className="px-6 py-4 dark:text-white">
                                                <Checkbox
                                                    checked={selectedRows.includes(user.id)}
                                                    onCheckedChange={() => handleRowSelect(user.id)}
                                                    className="border-slate-700 dark:text-slate-700"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-slate-800 dark:text-white">{user.username || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{user.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span
                                                        className={`ml-3 rounded-full px-2 py-1 text-xs font-medium ${
                                                            user.status === 'active'
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-white'
                                                                : user.status === 'inactive'
                                                                  ? 'bg-slate-100 text-slate-600 dark:text-rose-600'
                                                                  : 'bg-rose-100 text-rose-600'
                                                        }`}
                                                    >
                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                                                            aria-label={`More actions for ${user.name}`}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => openEditModal(user)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <SquarePen className="mr-2 h-4 w-4" />
                                                            Edit User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleResetPasswordSent(user.id)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm"
                                                        >
                                                            <KeyRound className="mr-2 h-4 w-4" />
                                                            Reset Password Sent
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteClick(user.id)}
                                                            className="flex cursor-pointer items-center px-2 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete User
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
            </div>

            {/* Modals */}
            <CreateUser open={openCreate} onClose={() => setOpenCreate(false)} />
            {editUser && <EditUser open={openEdit} onClose={() => setOpenEdit(false)} user={editUser} />}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user?"
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
        </AppLayout>
    );
}
