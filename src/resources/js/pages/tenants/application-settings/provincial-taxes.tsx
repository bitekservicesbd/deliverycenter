import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function ProvincialTaxes() {
    return (
        <TenantLayout>
            <Head title="Provincial Taxes" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Provincial Taxes</span>
            </PageNav>
            <div className="p-3">
                <div className="mb-2">
                    <div className="mb-4 flex gap-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Provincial Taxes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Provincial Taxes">Provincial Taxes</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button>Search</Button>
                    </div>

                    <Button asChild>
                        <Link href={route('tenant.application.settings.create.provincial.taxes')} className="inline-flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New
                        </Link>
                    </Button>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="border dark:border-gray-600">
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Action</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Abbr</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Province</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Alternate Name1</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Alternate Name2</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Country</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Federal Tax</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Federal Tax Number</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Prov/State Tax</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Prov/State Tax Number</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">AutoFill</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border text-center dark:border-gray-600 dark:bg-gray-700">
                            <TableRow>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
