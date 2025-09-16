import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, FilePlus, Files, FileX, Pencil, Save, Share, Undo } from 'lucide-react';
import React from 'react';

export default function Surcharges() {
    const [create, setCreate] = React.useState(false);
    return (
        <TenantLayout>
            <Head title="Surcharges" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Surcharges</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="rounded-md border">
                        <div>
                            <p className="p-2 text-center font-bold">Total Surcharges: 8</p>
                            <div className="my-2">
                                <PageNav>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="bg-sky-900 hover:bg-sky-950">
                                                {' '}
                                                <Share /> Export <ChevronDown />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="start">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>Export all data to Excel</DropdownMenuItem>
                                                <DropdownMenuItem>Export selected row to Excel</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </PageNav>
                            </div>
                            <div className="mx-2 mb-3 flex w-full gap-3 md:w-1/4">
                                <Input placeholder="Enter text to search" />
                                <Button type="button" className="bg-sky-900 hover:bg-sky-950">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">
                                        <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                            <FilePlus />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">Default Commissionable</TableHead>
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
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <Files className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Link className="text-blue-600" href="#">
                                            DC 80
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border">100.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <Files className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Link className="text-blue-600" href="#">
                                            DC 80
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border">100.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <Files className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Link className="text-blue-600" href="#">
                                            DC 80
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border">100.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <Files className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Link className="text-blue-600" href="#">
                                            DC 80
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border">100.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
