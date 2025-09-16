import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { ChevronDown, CircleX, Redo, Search, Share } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Messaging Queue Manager" />
            {/* top bar */}
            <TopSearch className="mb-2" />
            <div className="mb-2">
                <PageNav>
                    <span className="ms-5 font-bold text-white">Messaging Queue Manager</span>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div className="mx-2 mb-5 flex flex-wrap">
                <div className="w-full rounded bg-slate-50 sm:w-full lg:w-8/12 dark:bg-zinc-950">
                    <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="Customer">Customer #:</Label>
                            <Input type="text" id="Customer" placeholder="Customer" />
                        </div>
                        <div>
                            <Label htmlFor="Caller">Caller #:</Label>
                            <Input type="text" id="Caller" placeholder="Caller" />
                        </div>
                        <div>
                            <Label>Type:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Invoiced Transportation Loads">Invoiced Transportation Loads</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Transport:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Transport" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Invoiced Transportation Loads">Invoiced Transportation Loads</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="Number">Number #:</Label>
                            <Input type="number" id="Number" placeholder="Number" />
                        </div>
                        <div>
                            <Label htmlFor="To-Email">To Email #:</Label>
                            <Input type="email" id="To-Email" placeholder="To Email" />
                        </div>
                        <div>
                            <Label>Queue From:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Queue From" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Invoiced Transportation Loads">Invoiced Transportation Loads</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Queue To:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Queue From" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Invoiced Transportation Loads">Invoiced Transportation Loads</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <div className="ms-2 mt-6 pb-4">
                            <div className="flex gap-2">
                                <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                    <Search /> Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded md:w-2/2">
                <div className="mx-2 pb-4">
                    <div className="ms-2 flex gap-2">
                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            <Redo /> Resend
                        </Button>
                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            <CircleX /> Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <PageNav>
                <div className="text-center text-white">
                    <p>Total Message: 0</p>
                </div>
            </PageNav>
            <div className="my-2 flex items-center justify-between bg-zinc-100 dark:text-white dark:hover:bg-zinc-950">
                <div className="ms-2">
                    <p>Drag a column header here to group by the column</p>
                </div>
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
            </div>
            {/* table */}
            <Table className="w-full">
                <TableHeader className="custom-nav-color">
                    <TableRow>
                        <TableHead className="border-r border-white px-1 py-2 text-white">ID</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Number</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Customer Name</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Type</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Transport</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Contact Name</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Email To</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Body Format</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Queued Date</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Tries</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Send Date</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Times Opened</TableHead>
                        <TableHead className="border-r border-white px-1 py-2 text-white">Last Opened</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={13} className="border py-14 text-center font-bold">
                            No Data
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TenantLayout>
    );
}
