import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Plus, Save, Undo } from 'lucide-react';
import { useState } from 'react';

export default function customerRelation() {
    const [create, setCreate] = useState(false);
    const customers = [
        { id: 1, name: 'McKesson Specialty Health' },
        { id: 2, name: 'Cardinal Health' },
        { id: 3, name: 'AmerisourceBergen' },
        { id: 4, name: 'Cencora Pharma' },
        { id: 5, name: 'Owens & Minor' },
        { id: 6, name: 'Medline Industries' },
        { id: 7, name: 'Henry Schein' },
        { id: 8, name: 'BD (Becton Dickinson)' },
        { id: 9, name: 'GE Healthcare' },
        { id: 10, name: 'Siemens Healthineers' },
        { id: 11, name: 'Stryker Corporation' },
        { id: 12, name: 'Boston Scientific' },
        { id: 13, name: 'Philips Healthcare' },
        { id: 14, name: 'Fresenius Medical Care' },
        { id: 15, name: 'Roche Diagnostics' },
        { id: 16, name: 'Johnson & Johnson Medical' },
        { id: 17, name: '3M Health Care' },
        { id: 18, name: 'Zimmer Biomet' },
        { id: 19, name: 'Smith & Nephew' },
        { id: 20, name: 'Baxter International' },
    ];

    return (
        <TenantLayout>
            <Head title="Customer Relation" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Customer Relation</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="rounded-md border p-3">
                        <div className="my-3">
                            <div className="my-2 flex items-center gap-3">
                                <Label className="w-40">Customer:</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="my-2 flex items-center gap-3">
                                <Label className="w-40">Customer Contact:</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">
                                        <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                            <Plus />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Linked Customer</TableHead>
                                    <TableHead className="text-white">Allow Client Settings</TableHead>
                                    <TableHead className="text-white">Allow In bounding</TableHead>
                                    <TableHead className="text-white">Allow Out bounding</TableHead>
                                    <TableHead className="text-white">Allow Courier Orders</TableHead>
                                    <TableHead className="text-white">Allow GPS Tracking</TableHead>
                                    <TableHead className="text-white">Allow Dashboard</TableHead>
                                    <TableHead className="text-white">Allow Invoicing</TableHead>
                                    <TableHead className="text-white">Allow Payment Processing</TableHead>
                                    <TableHead className="text-white">Allow Alerts</TableHead>
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
                                            <Select>
                                                <SelectTrigger className="w-[300px]">
                                                    <SelectValue placeholder="Select customer" />
                                                </SelectTrigger>
                                                <SelectContent className="p-0">
                                                    {/* Table Header */}
                                                    <div className="grid grid-cols-2 bg-gray-200 px-2 py-1 text-xs font-semibold">
                                                        <div>Customer ID</div>
                                                        <div>Name</div>
                                                    </div>

                                                    {/* Scrollable List */}

                                                    {customers.map((customer) => (
                                                        <SelectItem key={customer.id} value={String(customer.id)}>
                                                            <div className="grid grid-cols-[80px_auto]">
                                                                <span className="text-left">{customer.id}</span>
                                                                <span className="text-left">{customer.name || '\u00A0'}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="border">
                                            <Checkbox />
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell colSpan={11} className="border py-24 text-center">
                                        No data to display
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
