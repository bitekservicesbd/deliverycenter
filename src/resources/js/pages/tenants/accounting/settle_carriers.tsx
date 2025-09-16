import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { CircleX, Search } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Settle Carriers" />
            <TopSearch className="mb-2" />
            {/* top bar */}
            <div>
                <PageNav>
                    <span className="ms-5 font-bold text-white">Settle Carriers</span>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div>
                <div className="mt-6 grid grid-cols-1 gap-4 bg-slate-50 px-4 pb-24 md:grid-cols-2 dark:bg-zinc-950">
                    <div className="">
                        <div className="mb-3 flex w-full max-w-sm items-center gap-2">
                            <Label>Settlement Status:</Label>
                            <Select defaultValue="Unsettled">
                                <SelectTrigger>
                                    <SelectValue placeholder="Settlement Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Unsettled">Unsettled</SelectItem>
                                        <SelectItem value="Settlement">Settlement</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-wrap border px-2 pb-5">
                            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                                <div>
                                    <Label>Currency:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="BDT">BDT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="Reference">Reference #:</Label>
                                    <Input type="text" id="Reference" placeholder="Reference" />
                                </div>
                                <div>
                                    <Label htmlFor="Load">Load #:</Label>
                                    <Input type="text" id="Load" placeholder="Load" />
                                </div>
                                <div>
                                    <Label htmlFor="Carrier">Carrier #:</Label>
                                    <Input type="text" id="Carrier" placeholder="Carrier" />
                                </div>
                                <div>
                                    <Label htmlFor="Invoice">Invoice #:</Label>
                                    <Input type="text" id="Invoice" placeholder="Invoice" />
                                </div>
                                <div>
                                    <Label htmlFor="Customer">Customer #:</Label>
                                    <Input type="text" id="Customer" placeholder="Customer" />
                                </div>
                                <div>
                                    <Label htmlFor="BOL">BOL #:</Label>
                                    <Input type="text" id="BOL" placeholder="BOL" />
                                </div>
                                <div>
                                    <Label htmlFor="Service">Service #:</Label>
                                    <Input type="text" id="Service" placeholder="Service" />
                                </div>
                                <div>
                                    <Label>Carrier Type:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Carrier Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="BDT">BDT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Created End Date:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Created End Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="7/27/2025">7/27/2025</SelectItem>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="close">Close</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Created Start Date:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Created Start Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="BDT">BDT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Invoice End Date:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Invoice End Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="7/27/2025">7/27/2025</SelectItem>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="close">Close</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Invoice Start Date:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Invoice Start Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="BDT">BDT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
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
                <div>
                    <div className="w-full rounded md:w-2/2">
                        <div className="mx-2 bg-slate-50 pb-4 dark:bg-zinc-950">
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

                <Tabs defaultValue="change-status">
                    <PageNav>
                        <div className="flex justify-around">
                            <div className="text-center text-white">Add Carrier</div>
                            <div className="text-center text-white">Total Carriers: 0</div>
                        </div>
                    </PageNav>

                    <Table>
                        <TableHeader className="custom-nav-color">
                            <TableRow>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Load</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ref</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">SVC</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Created Date</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship Date</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Delivered Date</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Customer</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Carrier</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Carrier</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Cont...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Cont..</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Subtotal</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Cust...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Carrier Total</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Ship...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Con...</TableHead>
                                <TableHead className="border-r border-white px-1 py-2 text-white">Con...</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={28} className="border py-14 text-center font-bold">
                                    No Data
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Tabs>
            </div>
        </TenantLayout>
    );
}
