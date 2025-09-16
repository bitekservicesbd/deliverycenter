import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';

import { Copy, FilePenLine, FilePlus2, FileText, FileX2, MessageSquareShare, Save, Search, Settings, Trash } from 'lucide-react';
import { useState } from 'react';

export default function PricePlans() {
    const pricePlansData = [
        { id: 1, name: 'DC 80 Next Day', type: 'Advanced', zoneGroup: 'DC 80', commission: 100.0 },
        { id: 2, name: 'DC 80 Sameday', type: 'Advanced', zoneGroup: 'DC 80', commission: 100.0 },
        { id: 3, name: 'Low Box Dedicated', type: 'Zone to Zone', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 4, name: 'Matrix Direct', type: 'Advance', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 5, name: 'Matrix Next Day', type: 'Advance', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 6, name: 'Matrix Next Day By 7am', type: 'Advance', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 7, name: 'Matrix Rush', type: 'Advance', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 8, name: 'Matrix Sameday 11cut', type: 'Advance', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 9, name: 'Medslink Next Day', type: 'Advance', zoneGroup: 'Medslink', commission: 100.0 },
        { id: 10, name: 'Relay Direct', type: 'Advance', zoneGroup: 'Relay', commission: 100.0 },
        { id: 11, name: 'Relay Rush', type: 'Advance', zoneGroup: 'Relay', commission: 100.0 },
        { id: 12, name: 'Relay Sameday', type: 'Advance', zoneGroup: 'Relay', commission: 100.0 },
        { id: 13, name: 'SDM CENTRAL', type: 'Advance', zoneGroup: 'Shoppers', commission: 100.0 },
        { id: 14, name: 'SDM Vials Next Day', type: 'Advance', zoneGroup: 'VIALS ND', commission: 100.0 },
        { id: 15, name: 'SDM Vials Sat Next Day', type: 'Advance', zoneGroup: 'VIALS SAT', commission: 100.0 },
        { id: 16, name: 'SDM Vials Sunday Next Day', type: 'Advance', zoneGroup: 'VIALS SUN', commission: 100.0 },
        { id: 17, name: 'SHN Next Day', type: 'Advance', zoneGroup: 'Specialty Health Network', commission: 100.0 },
        { id: 18, name: 'Skid Rush Rates', type: 'Zone to Zone', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 19, name: 'Skid Sameday Rates', type: 'Advanced', zoneGroup: 'Matrix', commission: 100.0 },
        { id: 20, name: 'UHN COLD CHAIN NEXT DAY', type: 'Advanced', zoneGroup: 'UHN', commission: 100.0 },
        { id: 21, name: 'UHN DIRECT', type: 'Advanced', zoneGroup: 'UHN', commission: 100.0 },
        { id: 22, name: 'UHN NEXT DAY', type: 'Advanced', zoneGroup: 'UHN', commission: 100.0 },
        { id: 23, name: 'UHN RUSH', type: 'Advanced', zoneGroup: 'UHN', commission: 100.0 },
        { id: 24, name: 'UHN SAME DAY', type: 'Advanced', zoneGroup: 'UHN', commission: 100.0 },
    ];

    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Price Plans" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Price Plans</span>
            </PageNav>
            <div className="p-5">
                <p className="mt-2 border-b pb-1 text-center font-bold">Total Price Plans: 25</p>
                <div className="flex items-center gap-2 py-2">
                    <div>
                        <Select>
                            <SelectTrigger>
                                <MessageSquareShare className="h-5 w-4" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Distance Cache">
                                    <FileText className="h-4 w-4" />
                                    Export to XLXS
                                </SelectItem>
                                <SelectItem value="Another Cache">
                                    <FileText className="h-4 w-4" />
                                    Export to CSV
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="rounded-md border px-3 py-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Settings className="h-5 w-4" />
                            </DialogTrigger>
                            <DialogContent>
                                <div className="rounded border p-4"></div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input type="search" placeholder="Search..." className="pl-8" />
                            </div>
                            <Button>Search</Button>
                        </div>
                    </div>
                </div>
                <p className="pb-1 text-center">Drag a column header here to group by that column</p>
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
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Price Plan Name</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Type</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Zone Group</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Commissionable</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {create && (
                                <TableRow>
                                    <TableCell>
                                        <div className="flex justify-center gap-2">
                                            <Button type="button" variant={'outline'}>
                                                <Save className="cursor-pointer text-blue-500" />
                                            </Button>
                                            <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                                <Trash className="cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Price Plan Name" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one">One</SelectItem>
                                                <SelectItem value="two">Two</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one">One</SelectItem>
                                                <SelectItem value="two">Two</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Commissionable" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {pricePlansData.map((price) => (
                                <TableRow key={price.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 px-2 py-5">
                                        <FilePenLine className="text-blue-500" />
                                        <Copy className="text-green-500" />
                                        <FileX2 className="text-red-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{price.name}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{price.type}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{price.zoneGroup}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{price.commission}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
