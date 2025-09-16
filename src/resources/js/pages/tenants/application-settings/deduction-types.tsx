import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Copy, FilePenLine, Plus } from 'lucide-react';

export default function DeductionTypes() {
    const deductionTypesData = [
        { id: 1, description: 'Handheld Rent' },
        { id: 2, description: 'Vehicle Lease' },
        { id: 3, description: 'Loan' },
        { id: 4, description: 'Garnish' },
        { id: 5, description: 'Other' },
    ];

    return (
        <TenantLayout>
            <Head title="Deduction Types" />
            <div>
                <TopSearch className="mb-2" />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Deduction Types</span>
            </PageNav>
            <div className="p-5">
                <div className="mb-4 flex gap-3">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Deduction Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Deduction Types">Deduction Types</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>Search</Button>
                </div>

                <Button asChild>
                    <Link href={route('tenant.application.settings.create.deduction.types')} className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </Button>

                <div className="mt-1 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600">
                                    Action
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {deductionTypesData.map((deductionType) => (
                                <TableRow key={deductionType.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 p-2">
                                        <FilePenLine className="text-blue-500" />
                                        <Copy className="text-green-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{deductionType.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
