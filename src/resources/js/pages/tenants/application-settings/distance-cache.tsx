import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus2, FileText, MessageSquareShare, Save, Trash } from 'lucide-react';
import { useState } from 'react';

export default function DistanceCache() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Distance Cache" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Geo Distances</span>
            </PageNav>
            <div className="p-5">
                <div className="rounded border p-5">
                    <p className="mb-4 border-b">Search Parameters</p>
                    <div className="grid grid-cols-2 items-center gap-4 py-4">
                        <div>
                            <Label>From Postal Code</Label>
                            <Input placeholder="From Postal Code" />
                        </div>
                        <div>
                            <Label>To Postal Code</Label>
                            <Input placeholder="To Postal Code" />
                        </div>

                        <div>
                            <Label>Route Type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Distance Cache" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Distance Cache">Distance Cache</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Route As</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Distance Cache" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Distance Cache">Distance Cache</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4 flex items-center gap-2">
                            <Label htmlFor="disroute_as">DisRoute As</Label>
                            <Checkbox id="disroute_as" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button>Search</Button>
                        <Button variant="secondary">Clear</Button>
                    </div>
                </div>

                <PageNav className="custom-nav-color mt-2 mt-4 block w-full py-2 text-center dark:bg-zinc-800">
                    <span className="text-center font-bold text-white">Total Distances: 0</span>
                </PageNav>
                <div className="flex items-center justify-end gap-2 py-2">
                    <Select>
                        <SelectTrigger>
                            <MessageSquareShare className="h-5 w-4" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Distance Cache">
                                <FileText className="h-4 w-4" />
                                Export all data to Excel
                            </SelectItem>
                            <SelectItem value="Another Cache">
                                <FileText className="h-4 w-4" />
                                Export Selected Rows to Excel
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table className="w-full">
                    <TableHeader className="w-full">
                        <TableRow className="border dark:border-gray-600">
                            <TableHead
                                className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                onClick={() => setCreate(true)}
                            >
                                <FilePlus2 />
                            </TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">From Postal Code</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">To Postal Code</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Route Type</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Avoid Tolls</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                Avoid Environmental Zones
                            </TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Route As</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Distance</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Distance Unit</TableHead>
                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Travel Minutes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {create && (
                            <TableRow>
                                <TableCell className="border-s">
                                    <div className="flex gap-2">
                                        <Button type="button" variant={'outline'}>
                                            <Save className="cursor-pointer text-blue-500" />
                                        </Button>
                                        <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                            <Trash className="cursor-pointer text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                                <TableCell className="border">
                                    <Input />
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow className="border text-center dark:border-gray-600">
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 dark:border-gray-600">None</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </TenantLayout>
    );
}
