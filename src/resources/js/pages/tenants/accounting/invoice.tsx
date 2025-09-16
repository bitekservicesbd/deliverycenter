import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { CircleX, MoveUp, Printer, Redo, Search } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Finalizing Loads" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-4 py-1">
                <span className="ms-5 font-bold text-white">Invoicing Finalizing Loads</span>
            </PageNav>

            <div className="mb-5 gap-4 md:mx-2">
                <div className="w-full rounded">
                    <div className="w-full">
                        <div className="mb-5 w-full bg-slate-100 dark:bg-zinc-950">
                            <div className="mb-4 grid grid-cols-1 lg:grid-cols-2">
                                <div className="w-full rounded">
                                    <div className="mx-5">
                                        <div className="w-full">
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Load Status:</Label>
                                                <Select defaultValue="Invoiced Transportation Loads">
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Load Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Invoiced Transportation Loads">
                                                                Invoiced Transportation Loads
                                                            </SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Load" className="w-1/3 whitespace-nowrap">
                                                    Load #:
                                                </Label>
                                                <Input type="text" id="Load" className="w-2/3" placeholder="Load" />
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Customer" className="w-1/3 whitespace-nowrap">
                                                    Customer #:
                                                </Label>
                                                <Input type="text" id="Customer" className="w-2/3" placeholder="Customer" />
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Customer-Code" className="w-1/3 whitespace-nowrap">
                                                    Customer Code #:
                                                </Label>
                                                <Input type="text" id="Customer-Code" className="w-2/3" placeholder="Customer Code" />
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Created From Date:</Label>
                                                <Select defaultValue="6/1/2025">
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Created From Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Invoice From Date:</Label>
                                                <Select defaultValue="6/1/2025">
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Invoice From Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Invoice" className="w-1/3 whitespace-nowrap">
                                                    Invoice #:
                                                </Label>
                                                <Input type="text" id="Invoice" className="w-2/3" placeholder="Invoice" />
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Billing Group:</Label>
                                                <Select defaultValue="6/1/2025">
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Billing Group" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Cancelled" className="w-1/3 whitespace-nowrap">
                                                    Cancelled:
                                                </Label>
                                                <div className="w-2/3">
                                                    <Checkbox id="Cancelled" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full rounded">
                                    <div className="mx-5">
                                        <div className="w-full">
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Company:</Label>
                                                <Select>
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Company" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Bitech Services">Bitech Services</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label htmlFor="Customer-ID" className="w-1/3 whitespace-nowrap">
                                                    Customer ID #:
                                                </Label>
                                                <Input type="number" id="Customer-ID" className="w-2/3" placeholder="Customer ID" />
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Created To Date:</Label>
                                                <Select>
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Created To Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Invoice To Date:</Label>
                                                <Select>
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Invoice To Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-full items-center gap-2 pt-3">
                                                <Label className="w-1/3 whitespace-nowrap">Created By:</Label>
                                                <Select>
                                                    <SelectTrigger className="w-2/3">
                                                        <SelectValue placeholder="Created By" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mx-2 pb-4">
                                    <div className="ms-2 flex gap-2">
                                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                            <Search /> Search
                                        </Button>
                                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                            <CircleX /> Clear
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="change-status">
                <PageNav>
                    <div className="flex items-center">
                        <div className="flex">
                            <Button type="button" variant={'ghost'} className="text-white hover:text-black">
                                {' '}
                                <Redo /> Resend Invoices
                            </Button>
                            <Button type="button" variant={'ghost'} className="text-white hover:text-black">
                                {' '}
                                <CircleX /> Cancel Invoices
                            </Button>
                            <Button type="button" variant={'ghost'} className="text-white hover:text-black">
                                {' '}
                                <Printer /> Print Invoices
                            </Button>
                            <Button type="button" variant={'ghost'} className="text-white hover:text-black">
                                {' '}
                                <MoveUp /> Export Invoices
                            </Button>
                        </div>
                        <div className="text-center text-white">
                            <p>Total Loads: 0 AND Selected Loads: 0</p>
                        </div>
                    </div>
                </PageNav>
                <Table>
                    <TableHeader className="custom-nav-color">
                        <TableRow>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Edit</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Invoice</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Status</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">GL Type</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Invoice No</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Customer</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Ref.</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Invoice Date</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Due Date</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Amount</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Tax Amount</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Total Amount</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Running Bala..</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Customer ID</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Created Date</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Federal Tax</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Prov/State Tax</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Cancelled</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={18} className="border py-14 text-center font-bold">
                                No Data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Tabs>
        </TenantLayout>
    );
}
