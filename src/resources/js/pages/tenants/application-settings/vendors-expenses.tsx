import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus, FileX, Pencil, Save, Undo } from 'lucide-react';
import React from 'react';

export default function DataTable() {
    const [create, setCreate] = React.useState(false);
    return (
        <TenantLayout>
            <Head title="Vendors Expenses" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Vendors Expenses</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">
                                        <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                            <FilePlus />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">Code</TableHead>
                                    <TableHead className="text-white">Add To New Load</TableHead>
                                    <TableHead className="text-white">GL Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {create && (
                                    <TableRow>
                                        <TableCell className="border">
                                            <div className="flex gap-2">
                                                <Button type="button" variant={'outline'}>
                                                    <Save className="h-4 w-4 cursor-pointer" />
                                                </Button>
                                                <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                                    <Undo className="h-4 w-4 cursor-pointer" />
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
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Input />
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Sales Commissions</TableCell>
                                    <TableCell className="border">Sales</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="border"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
