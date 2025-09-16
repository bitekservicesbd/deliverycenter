import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus, FileX, Pencil, Save, Undo } from 'lucide-react';
import React from 'react';

export default function DataTable() {
    const [create, setCreate] = React.useState(false);
    return (
        <TenantLayout>
            <Head title="Warehouse" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Warehouse</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">
                                        <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                            <FilePlus />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">Strate1</TableHead>
                                    <TableHead className="text-white">Strate2</TableHead>
                                    <TableHead className="text-white">Strate3</TableHead>
                                    <TableHead className="text-white">Strate4</TableHead>
                                    <TableHead className="text-white">City</TableHead>
                                    <TableHead className="text-white">Province</TableHead>
                                    <TableHead className="text-white">Country</TableHead>
                                    <TableHead className="text-white">Postal</TableHead>
                                    <TableHead className="text-white">Instructions</TableHead>
                                    <TableHead className="text-white">Phone</TableHead>
                                    <TableHead className="text-white">Fax</TableHead>
                                    <TableHead className="text-white">Contact Name</TableHead>
                                    <TableHead className="text-white">Email</TableHead>
                                    <TableHead className="text-white">Default Warehouse</TableHead>
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
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Province" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Alberta">Alberta</SelectItem>
                                                    <SelectItem value="dark">Dark</SelectItem>
                                                    <SelectItem value="system">System</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="border">
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                    <SelectItem value="US">US</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            <Checkbox />
                                        </TableCell>
                                    </TableRow>
                                )}

                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Specialty Logistics Inc</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Relay Logistics</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Matrix Logistics Services</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Shoppers Drug Mart</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">PMH</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border">
                                        <div className="flex gap-1">
                                            <Button type="button" variant={'outline'}>
                                                <Pencil className="h-4 w-4 cursor-pointer" />
                                            </Button>
                                            <Button type="button" variant={'outline'}>
                                                <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">Oshawa</TableCell>
                                    <TableCell className="border">4090B Sladeview Crescent</TableCell>
                                    <TableCell className="border">Unit 2</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Mississauga</TableCell>
                                    <TableCell className="border">Ontario</TableCell>
                                    <TableCell className="border">Canada</TableCell>
                                    <TableCell className="border">L5L 5Y5</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">416 737-4800</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">customerservice@specialty-logistics.ca</TableCell>
                                    <TableCell className="border">
                                        <Checkbox />
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
