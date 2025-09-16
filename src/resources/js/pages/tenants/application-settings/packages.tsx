import PageNav from '@/components/PageNav';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePenLine, FilePlus2, FileX2, Plus, Save, Search, Trash } from 'lucide-react';

import TopSearch from '@/components/TopSearch';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

export default function Packages() {
    const packagesData = [
        {
            id: 1,
            code: 'TO',
            description: 'Tote',
            avgWt: '10.00',
            l: 10.0,
            w: 12.0,
            h: 12.0,
            totalQty: true,
            clientToUse: true,
            sizeAsDefault: false,
            sizeAsMinimum: false,
        },
        {
            id: 2,
            code: 'CS',
            description: 'Case',
            avgWt: '10.00',
            l: 10.0,
            w: 12.0,
            h: 12.0,
            totalQty: true,
            clientToUse: true,
            sizeAsDefault: false,
            sizeAsMinimum: false,
        },
        {
            id: 3,
            code: 'SK',
            description: 'Skid',
            avgWt: '10.00',
            l: 10.0,
            w: 12.0,
            h: 12.0,
            totalQty: true,
            clientToUse: true,
            sizeAsDefault: false,
            sizeAsMinimum: false,
        },
        {
            id: 4,
            code: 'CL',
            description: 'Cooler',
            avgWt: '10.00',
            l: 10.0,
            w: 12.0,
            h: 12.0,
            totalQty: true,
            clientToUse: true,
            sizeAsDefault: false,
            sizeAsMinimum: false,
        },
        {
            id: 5,
            code: 'NR',
            description: 'COS',
            avgWt: '10.00',
            l: 10.0,
            w: 12.0,
            h: 12.0,
            totalQty: true,
            clientToUse: true,
            sizeAsDefault: false,
            sizeAsMinimum: false,
        },
    ];
    const [create, setCreate] = useState(false);

    return (
        <TenantLayout>
            <Head title="Packages" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Packages</span>
            </PageNav>
            <div className="p-5 pt-0">
                <p className="mt-4 mb-2 text-center">(*) Values ​​must be according to the unit measure of the company</p>

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
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Code</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Avg Wt *</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">L *</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">W *</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">H *</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Use In Total Qty Cnt</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Allow Clients To Use</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Use Wt/Size As Defaults</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Use Wt/Size As Minimums</TableHead>
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
                                        <Input placeholder="Code" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Description" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Avg Weight" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Length" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Width" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input placeholder="Height" />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox className="h-4 w-4" />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox className="h-4 w-4" />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox className="h-4 w-4" />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                            )}

                            {packagesData.map((packageData, index) => (
                                <TableRow key={packageData.id} className="border text-center dark:border-gray-600 dark:bg-gray-700">
                                    <TableCell className="flex justify-center gap-2 px-2 py-5">
                                        <FilePenLine className="cursor-pointer text-blue-500" />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <FilePlus2 className="cursor-pointer" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-center">Serial Nos</DialogTitle>
                                                </DialogHeader>
                                                <p className="mt-2">Serial Nos for - {packageData.code}</p>
                                                <div className="rounded border p-4">
                                                    <div className="space-y-4">
                                                        <div className="flex gap-2">
                                                            <div className="relative">
                                                                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                                                <Input type="search" placeholder="search..." className="pl-8" />
                                                            </div>
                                                            <Button className="rounded">Search</Button>
                                                        </div>
                                                        <table className="w-full border">
                                                            <thead>
                                                                <tr>
                                                                    <th className="border p-2">
                                                                        <Plus className="h-5 w-5 text-black dark:text-white" />
                                                                    </th>
                                                                    <th className="border p-2">Serial No</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="border p-2">none</td>
                                                                    <td className="border p-2">none</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <FileX2 className="cursor-pointer text-red-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.code}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.description}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.avgWt}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.l}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.w}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{packageData.h}</TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">
                                        <Checkbox className="h-4 w-4" defaultChecked={packageData.totalQty} />
                                    </TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">
                                        <Checkbox className="h-4 w-4" defaultChecked={packageData.clientToUse} />
                                    </TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">
                                        <Checkbox className="h-4 w-4" defaultChecked={packageData.sizeAsDefault} />
                                    </TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">
                                        <Checkbox className="h-4 w-4" defaultChecked={packageData.sizeAsMinimum} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
