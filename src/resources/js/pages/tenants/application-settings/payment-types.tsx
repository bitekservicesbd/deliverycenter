import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Copy, FilePenLine, FileX2, Plus, Search } from 'lucide-react';

export default function PaymentTypes() {
    const paymentTypesData = [
        { id: 1, description: 'Cash', code: 'CAS' },
        { id: 2, description: 'Cheque', code: 'CHQ' },
        { id: 3, description: 'Electronic Funds Transfer', code: 'EFT' },
        { id: 4, description: 'Credit Card', code: 'CC' },
        { id: 5, description: 'e-Transfer', code: 'ETR' },
        { id: 6, description: 'Wire', code: 'WRE' },
        { id: 7, description: 'Credits', code: 'CRD' },
    ];

    return (
        <TenantLayout>
            <Head title="Payment Types" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Payment Types</span>
            </PageNav>
            <div className="p-5">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Payment Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Payment Types">Payment Types</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input type="search" placeholder="Search..." className="pl-8" />
                        </div>
                        <Button>Search</Button>
                    </div>
                </div>

                <Button asChild>
                    <Link href={route('tenant.application.settings.create.payment.types')} className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </Button>
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bordr dark:border-gray-600">
                                <TableHead className="custom-nav-color px-1 py-2 text-center text-white dark:border-gray-600">Action</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Code</TableHead>
                            </TableRow>
                        </TableHeader>

                        {paymentTypesData.map((payment) => (
                            <TableRow key={payment.id} className="dark:border-gray-600">
                                <TableCell className="flex justify-center gap-2 p-2">
                                    <FilePenLine className="text-blue-500" />
                                    <Copy className="text-green-500" />
                                    <FileX2 className="text-red-500" />
                                </TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">{payment.description}</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">{payment.code}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
