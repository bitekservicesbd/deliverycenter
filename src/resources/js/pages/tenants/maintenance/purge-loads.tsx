import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { ChevronDown, CircleX, Search, Share, Undo } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Messaging Queue Manager" />
            {/* top bar */}
            <TopSearch className="mb-2" />
            <div className="mb-2">
                <PageNav>
                    <span className="ms-5 font-bold text-white">Load Search</span>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div className="bg-slate-50 p-2 dark:bg-zinc-950">
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="mb-4 grid grid-cols-1 space-y-1 space-x-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="Load">Load #:</Label>
                            <Input type="text" id="Load" placeholder="Load" />
                        </div>
                        <div>
                            <Label htmlFor="Reference">Reference #:</Label>
                            <Input type="text" id="Reference" placeholder="Reference" />
                        </div>
                        <div>
                            <Label htmlFor="Waybill">Waybill #:</Label>
                            <Input type="text" id="Waybill" placeholder="Waybill" />
                        </div>
                        <div>
                            <Label htmlFor="P.O">P.O #:</Label>
                            <Input type="text" id="P.O" placeholder="P.O" />
                        </div>
                        <div>
                            <Label htmlFor="Customer">Customer #:</Label>
                            <Input type="text" id="Customer" placeholder="Customer" />
                        </div>
                        <div>
                            <Label htmlFor="Caller">Caller #:</Label>
                            <Input type="text" id="Caller" placeholder="Caller" />
                        </div>
                        <div>
                            <Label htmlFor="Carrier">Carrier #:</Label>
                            <Input type="text" id="Carrier" placeholder="Carrier" />
                        </div>
                        <div>
                            <Label>Vehicle:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Status:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="Service">Service #:</Label>
                            <Input type="text" id="Service" placeholder="Service" />
                        </div>
                        <div>
                            <Label>Start Date:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Start Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>End Date:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="End Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="Invoice">Invoice #:</Label>
                            <Input type="text" id="Invoice" placeholder="Invoice" />
                        </div>
                        <div>
                            <div className="mt-3 mb-3 flex gap-4">
                                <Checkbox id="Unfinished" />
                                <Label htmlFor="Unfinished">Unfinished</Label>
                            </div>
                            <div className="flex gap-4">
                                <Checkbox id="Child-Loads" />
                                <Label htmlFor="Child-Loads">Child Loads</Label>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-4">
                            <Checkbox id="Deleted" />
                            <Label htmlFor="Deleted">Deleted</Label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="ms-0 border-b font-bold">Pickup</p>
                            <div className="mt-5">
                                <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="Name">Name #:</Label>
                                        <Input type="text" id="Name" placeholder="Name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Strate">Strate #:</Label>
                                        <Input type="text" id="Strate" placeholder="Strate" />
                                    </div>
                                    <div>
                                        <Label htmlFor="City">City #:</Label>
                                        <Input type="text" id="City" placeholder="City" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Postal">Postal #:</Label>
                                        <Input type="text" id="Postal" placeholder="Postal" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Start-Date">Start Date #:</Label>
                                        <Input type="text" id="Start-Date" placeholder="Start Date" />
                                    </div>
                                    <div>
                                        <Label htmlFor="End-Date">End Date #:</Label>
                                        <Input type="text" id="End-Date" placeholder="End Date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className="ms-0 border-b font-bold">Delivery</p>
                            <div className="mt-5">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="Name">Name #:</Label>
                                        <Input type="text" id="Name" placeholder="Name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Strate">Strate #:</Label>
                                        <Input type="text" id="Strate" placeholder="Strate" />
                                    </div>
                                    <div>
                                        <Label htmlFor="City">City #:</Label>
                                        <Input type="text" id="City" placeholder="City" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Postal">Postal #:</Label>
                                        <Input type="text" id="Postal" placeholder="Postal" />
                                    </div>
                                    <div>
                                        <Label htmlFor="Start-Date">Start Date #:</Label>
                                        <Input type="text" id="Start-Date" placeholder="Start Date" />
                                    </div>
                                    <div>
                                        <Label htmlFor="End-Date">End Date #:</Label>
                                        <Input type="text" id="End-Date" placeholder="End Date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-2 pb-4">
                    <div className="ms-2 flex justify-center gap-2 sm:justify-start">
                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            <Search /> Search
                        </Button>
                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            <CircleX /> Clear
                        </Button>
                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            <Undo /> Purge
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border py-2 text-center">
                <p>Total Loads: 0</p>
            </div>
            <PageNav>
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
                                <DropdownMenuItem>Export all data to Excel</DropdownMenuItem>
                                <DropdownMenuItem>Export selected row to Excel</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </PageNav>
            <div className="">
                <div className="py-2 text-center">
                    <p>Drag a column header here to group by the column</p>
                </div>
            </div>
            {/* table */}
            <div className="container mx-auto pb-14">
                <div className="w-full overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                    <Table className="min-w-full text-left text-sm">
                        <TableHeader className="custom-nav-color">
                            <TableRow>
                                <TableHead className="sticky left-0 z-10 min-w-[50px] border-r border-white px-2 py-2 text-white">#</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Created Date</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Load Number</TableHead>
                                <TableHead className="min-w-[180px] px-2 py-2 text-white">Customer Name/Company</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Reference</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Route</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">Stop</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Service Type</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Status</TableHead>
                                <TableHead className="min-w-[180px] px-2 py-2 text-white">Shipper Name/Company</TableHead>
                                <TableHead className="min-w-[150px] px-2 py-2 text-white">Shipper Address</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Shipper City</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Shipper Province</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Shipper Postal</TableHead>
                                <TableHead className="min-w-[180px] px-2 py-2 text-white">Consignee Name/Company</TableHead>
                                <TableHead className="min-w-[150px] px-2 py-2 text-white">Consignee Address</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Consignee City</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Consignee Province</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Consignee Postal</TableHead>
                                <TableHead className="min-w-[140px] px-2 py-2 text-white">Shipping Date Actual</TableHead>
                                <TableHead className="min-w-[140px] px-2 py-2 text-white">Delivered Date Actual</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">POD</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Carrier Number</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Weight</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Cubed Weight</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">QTY</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Base Price</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">Fuel</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">Taxes</TableHead>
                                <TableHead className="min-w-[120px] px-2 py-2 text-white">Deliver Commission</TableHead>
                                <TableHead className="min-w-[80px] px-2 py-2 text-white">Other</TableHead>
                                <TableHead className="min-w-[100px] px-2 py-2 text-white">Subtotal</TableHead>
                                <TableHead className="min-w-[150px] px-2 py-2 text-white">Shipping Instruction</TableHead>
                                <TableHead className="min-w-[150px] px-2 py-2 text-white">Consignee Instruction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={34} className="border py-14 text-center font-bold">
                                    No Data
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
