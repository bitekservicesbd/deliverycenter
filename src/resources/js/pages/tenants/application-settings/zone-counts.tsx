import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus2, Save, Search, Trash } from 'lucide-react';
import { useState } from 'react';

export default function ZoneCounts() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Zone Counts" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Zone Counts</span>
            </PageNav>
            <div className="p-3">
                <div className="relative mb-1 w-[300px]">
                    <Search className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search Zone Counts" className="pl-8" />
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <Table className="w-full">
                        <TableHeader className="w-full">
                            <TableRow className="border dark:border-gray-600">
                                <TableHead
                                    className="custom-nav-color flex cursor-pointer justify-center border-r px-1 py-2 text-white dark:border-gray-600"
                                    onClick={() => setCreate(true)}
                                >
                                    <FilePlus2 />
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Zone Group</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Zone From</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Zone To</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Hopes Count</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {create && (
                                <TableRow>
                                    <TableCell>
                                        <div className="flex gap-2">
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
                                </TableRow>
                            )}
                            <TableRow className="border text-center dark:border-gray-600 dark:bg-gray-700">
                                <TableCell className="border-s p-2">None</TableCell>
                                <TableCell className="border-s p-2">None</TableCell>
                                <TableCell className="border-s p-2">None</TableCell>
                                <TableCell className="border-s p-2">None</TableCell>
                                <TableCell className="border-s p-2">None</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
