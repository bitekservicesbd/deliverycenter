import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePenLine, FilePlus2, FileX2, Save, Search, Trash } from 'lucide-react';
import { useState } from 'react';

export default function Holidays() {
    const holidaysData = [{ id: 1, description: 'none', fromDate: 'none', toDate: 'none' }];

    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Working Holidays" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Working Holidays</span>
            </PageNav>
            <div className="p-5">
                <div className="relative mb-1 w-[300px]">
                    <Search className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search Holidays" className="pl-8" />
                </div>

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
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">From Date</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">To Date</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {create && (
                                <TableRow>
                                    <TableCell>
                                        <div className="justif flex gap-2">
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
                                </TableRow>
                            )}

                            {holidaysData.map((holiday) => (
                                <TableRow key={holiday.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 p-2">
                                        <FilePenLine className="text-blue-500" />
                                        <FileX2 className="text-red-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{holiday.description}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{holiday.fromDate}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{holiday.toDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
