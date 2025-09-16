'use client';

import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, Share } from 'lucide-react';
import { useState } from 'react';

export default function Index() {
    const [status, setStatus] = useState('Open');

    const handleSearch = () => {
        // Implement search logic
        console.log('Search clicked');
    };

    const handleClear = () => {
        // Implement clear logic
        console.log('Clear clicked');
    };

    return (
        <ClientLayout>
            <Head title="Load Search" />
            {/* top bar */}
            <div>
                <PageNav>
                    <TopSearch />
                </PageNav>
            </div>
            {/* top bar end*/}
            <div className="min-h-screen space-y-6 p-6">
                {/* Search Form */}
                <div className="space-y-4 rounded-md border p-4 shadow-sm">
                    <h2 className="font-semibold text-gray-700">Load Search</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Column 1 */}
                        <div className="space-y-2 rounded border p-3">
                            <div>
                                <Label htmlFor="loadNumber">Load#</Label>
                                <Input id="loadNumber" />
                            </div>
                            <div>
                                <Label htmlFor="poNumber">P.O. #</Label>
                                <Input id="poNumber" />
                            </div>
                            <div>
                                <Label htmlFor="vehicle">Vehicle</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Truck">Truck</SelectItem>
                                        <SelectItem value="Van">Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="createdFrom">Created Date From</Label>
                                <Input id="createdFrom" type="date" />
                            </div>
                            <div>
                                <Label htmlFor="instructions">Instructions</Label>
                                <Input id="instructions" />
                            </div>
                            <div>
                                <Label htmlFor="field1">Field 1</Label>
                                <Input id="field1" />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2 rounded border p-3">
                            <div>
                                <Label htmlFor="reference">Reference#</Label>
                                <Input id="reference" />
                            </div>
                            <div>
                                <Label htmlFor="customer">Customer</Label>
                                <Input id="customer" />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Open">Open</SelectItem>
                                        <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="createdTo">Created Date To</Label>
                                <Input id="createdTo" type="date" />
                            </div>
                            <div>
                                <Label htmlFor="packageTypes">Package Types</Label>
                                <Input id="packageTypes" />
                            </div>
                            <div>
                                <Label htmlFor="field2">Field 2</Label>
                                <Input id="field2" />
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-2 rounded border p-3">
                            <div>
                                <Label htmlFor="Waybill">Waybill#</Label>
                                <Input id="Waybill" />
                            </div>
                            <div>
                                <Label htmlFor="Caller">Caller</Label>
                                <Input id="Caller" />
                            </div>
                            <div>
                                <Label htmlFor="Service">Service</Label>
                                <Input id="Service" />
                            </div>
                            <div>
                                <Label htmlFor="Notes">Notes</Label>
                                <Input id="Notes" />
                            </div>
                            <div>
                                <Label htmlFor="Invoice">Invoice #</Label>
                                <Input id="Invoice" />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: PickUp & Delivery */}
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-1">
                        {/* Pickup */}
                        <div className="space-y-2 rounded border p-2">
                            <h3 className="font-semibold text-gray-600">PickUp</h3>
                            <div>
                                <Label htmlFor="pickupName">Name</Label>
                                <Input id="pickupName" />
                            </div>
                            <div>
                                <Label htmlFor="pickupStreet">Street</Label>
                                <Input id="pickupStreet" />
                            </div>
                            <div>
                                <Label htmlFor="pickupCity">City</Label>
                                <Input id="pickupCity" />
                            </div>
                            <div>
                                <Label htmlFor="pickupPostal">Postal</Label>
                                <Input id="pickupPostal" />
                            </div>
                            <div>
                                <Label htmlFor="pickupStart">Ship Start Date</Label>
                                <Input id="pickupStart" type="date" />
                            </div>
                            <div>
                                <Label htmlFor="pickupEnd">Ship End Date</Label>
                                <Input id="pickupEnd" type="date" />
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="space-y-2 rounded border p-2">
                            <h3 className="font-semibold text-gray-600">Delivery</h3>
                            <div>
                                <Label htmlFor="deliveryName">Name</Label>
                                <Input id="deliveryName" />
                            </div>
                            <div>
                                <Label htmlFor="deliveryStreet">Street</Label>
                                <Input id="deliveryStreet" />
                            </div>
                            <div>
                                <Label htmlFor="deliveryCity">City</Label>
                                <Input id="deliveryCity" />
                            </div>
                            <div>
                                <Label htmlFor="deliveryPostal">Postal</Label>
                                <Input id="deliveryPostal" />
                            </div>
                            <div>
                                <Label htmlFor="deliveryStart">Delivery Start Date</Label>
                                <Input id="deliveryStart" type="date" />
                            </div>
                            <div>
                                <Label htmlFor="deliveryEnd">Delivery End Date</Label>
                                <Input id="deliveryEnd" type="date" />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        <Button onClick={handleSearch}>Search</Button>
                        <Button variant="outline" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button>Waybill</Button>
                        <Button>Blind Waybill</Button>
                        <Button>Labels</Button>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="p-2 font-semibold">Total Loads: 0</div>
                    <PageNav>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="bg-sky-900 hover:bg-sky-950 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-800">
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
                </div>
                {/* Table Section */}
                <div className="">
                    <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow>
                                    <TableHead className="text-white">#</TableHead>
                                    <TableHead className="text-white">Load Number</TableHead>
                                    <TableHead className="text-white">Created Date</TableHead>
                                    <TableHead className="text-white">Customer Name/Company</TableHead>
                                    <TableHead className="text-white">Reference</TableHead>
                                    <TableHead className="text-white">Service Type</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-white">Shipper Name/Company</TableHead>
                                    <TableHead className="text-white">Shipper Address</TableHead>
                                    <TableHead className="text-white">Shipper City</TableHead>
                                    <TableHead className="text-white">Shipper Province</TableHead>
                                    <TableHead className="text-white">Shipper Postal</TableHead>
                                    <TableHead className="text-white">Route</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={13} className="border py-10 text-center">
                                        No data to display
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
