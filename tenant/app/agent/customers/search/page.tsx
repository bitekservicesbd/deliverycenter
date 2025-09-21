"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, FilePenLine, Search, Share } from 'lucide-react';
import { useState } from 'react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";

export default function Index() {
    const [rows, setRows] = useState([
        { defaultBilling: true, isAdmin: true, active: true, webAccess: true },
        { defaultBilling: true, isAdmin: false, active: false, webAccess: true },
        { defaultBilling: false, isAdmin: true, active: true, webAccess: false },
        { defaultBilling: true, isAdmin: false, active: false, webAccess: false },
        { defaultBilling: true, isAdmin: true, active: false, webAccess: true },
    ]);

    // Handle checkbox toggle
    function toggleCheckbox(rowIndex, field) {
        setRows((prev) => prev.map((row, i) => (i === rowIndex ? { ...row, [field]: !row[field] } : row)));
    }

    return (
        <div>
            <TopSearch className="mb-2" />
            <div className="mb-2">
                <PageNav className="py-2">
                    <div className="text-bold ms-2 text-white">
                        <p>Customer Contact</p>
                    </div>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div className="bg-slate-50 dark:bg-zinc-950">
                <div className="w-full border py-2 text-center">
                    <p className="font-bold">Total Count: 2</p>
                </div>
                <div>
                    <PageNav className="py-2">
                        <div className="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-sky-900 hover:bg-sky-950">
                                        {' '}
                                        <Share /> Export <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Export To Xlsx</DropdownMenuItem>
                                        <DropdownMenuItem>Export To Csv</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </PageNav>
                </div>
            </div>
            <div className="ms-2 mt-6 mb-2 flex w-full max-w-sm items-center gap-2">
                <Input type="text" id="Customer-ID" placeholder="Enter text to search" />
                <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                    <Search /> Search
                </Button>
            </div>

            {/* table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table className="w-full text-left text-sm rtl:text-right">
                    <TableHeader className="custom-nav-color text-white">
                        <TableRow>
                            <TableHead className="border-r border-white px-1 py-2 text-white"></TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Customer</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Contact Name</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Email</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Phone</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Fax</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Mobile</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Default Billing Contact</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Is Admin</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Active</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Web Access</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell className="py-2">
                                    <FilePenLine className="text-blue-500" />
                                </TableCell>
                                <TableCell className="py-2">John Doe</TableCell>
                                <TableCell className="py-2">Ref John Doe</TableCell>
                                <TableCell className="py-2">info@test.com</TableCell>
                                <TableCell className="py-2">01685235328</TableCell>
                                <TableCell className="py-2"></TableCell>
                                <TableCell className="py-2"></TableCell>
                                <TableCell className="py-2">
                                    <Checkbox checked={row.defaultBilling} onCheckedChange={() => toggleCheckbox(i, 'defaultBilling')} />
                                </TableCell>
                                <TableCell className="py-2">
                                    <Checkbox checked={row.isAdmin} onCheckedChange={() => toggleCheckbox(i, 'isAdmin')} />
                                </TableCell>
                                <TableCell className="py-2">
                                    <Checkbox checked={row.active} onCheckedChange={() => toggleCheckbox(i, 'active')} />
                                </TableCell>
                                <TableCell className="py-2">
                                    <Checkbox checked={row.webAccess} onCheckedChange={() => toggleCheckbox(i, 'webAccess')} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
