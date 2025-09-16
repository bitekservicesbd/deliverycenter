import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus2, Save, Trash } from 'lucide-react';
import { useState } from 'react';

export default function PricePlanZoneCount() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Price Plan Zone Count" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Price Plan Zone Count</span>
            </PageNav>
            <div className="p-4">
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead
                                    className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                    onClick={() => setCreate(true)}
                                >
                                    <FilePlus2 />
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Zone Count From</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Zone Count To</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Block Size</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Included</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Charges</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Block Charge</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Commissionable</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Commissionable Amount</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Commissionable%</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Minimum Price Charge</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Minimum Carrier Amount</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Price Plan</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {create && (
                                <TableRow>
                                    <TableCell>
                                        <div className="flex justify-center gap-2">
                                            <Button type="button" variant={'outline'}>
                                                <Save className="cursor-pointer text-blue-500" />
                                            </Button>
                                            <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                                <Trash className="cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input />
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow className="text-center dark:border-gray-600 dark:bg-gray-700">
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                                <TableCell className="border-s p-2 dark:border-gray-600">None</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
