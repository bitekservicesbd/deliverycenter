import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Bus, Car, FilePlus, FileX, Pencil, Save, Tractor, Undo } from 'lucide-react';
import React from 'react';

export default function DataTable() {
    const [create, setCreate] = React.useState(false);
    return (
        <TenantLayout>
            <Head title="Vehicle Types" />
            <div>
                <TopSearch className="mb-2" />
                <PageNav className="mb-2">
                    <p className="ps-3 text-center text-white">Vehicle Types</p>
                </PageNav>
                <div className="mx-2">
                    <div className="my-2">
                        <div>
                            <div>
                                <p className="my-2 font-bold">The Values are in imperial according to the company settings</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <div className="flex w-full gap-2 p-2 md:w-1/4">
                            <Input placeholder="Enter text to search" />
                            <Button className="bg-sky-900 hover:bg-sky-950">Search</Button>
                        </div>
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">
                                        <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                            <FilePlus />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">Image</TableHead>
                                    <TableHead className="text-white">Icon Color</TableHead>
                                    <TableHead className="text-white">Max Weight</TableHead>
                                    <TableHead className="text-white">Max Volume</TableHead>
                                    <TableHead className="text-white">Max Packages</TableHead>
                                    <TableHead className="text-white">Max Cubed Weight</TableHead>
                                    <TableHead className="text-white">Avg Stop Time</TableHead>
                                    <TableHead className="text-white">Code</TableHead>
                                    <TableHead className="text-white">Route As</TableHead>
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
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Province" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="car">
                                                        <Car />
                                                    </SelectItem>
                                                    <SelectItem value="bus">
                                                        <Bus />
                                                    </SelectItem>
                                                    <SelectItem value="tractor">
                                                        <Tractor />
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="border">
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="black">
                                                        <div className="h-5 w-5 bg-[#000000]"></div>
                                                    </SelectItem>
                                                    <SelectItem value="blue">
                                                        <div className="h-5 w-5 bg-[#082297]"></div>
                                                    </SelectItem>
                                                    <SelectItem value="green">
                                                        <div className="h-5 w-5 bg-[#07753e]"></div>
                                                    </SelectItem>
                                                    <SelectItem value="red">
                                                        <div className="h-5 w-5 bg-[#970808]"></div>
                                                    </SelectItem>
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
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                    <SelectItem value="US">US</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                    <TableCell className="border">Van</TableCell>
                                    <TableCell className="border">
                                        <Car />
                                    </TableCell>
                                    <TableCell className="border">
                                        {' '}
                                        <div className="flex gap-2">
                                            <div className="h-5 w-5 bg-[#000000]"></div> <span>#000000</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">1500</TableCell>
                                    <TableCell className="border">999999</TableCell>
                                    <TableCell className="border">500</TableCell>
                                    <TableCell className="border">999999</TableCell>
                                    <TableCell className="border">10</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Car/Van</TableCell>
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
                                    <TableCell className="border">Straight Track</TableCell>
                                    <TableCell className="border">
                                        <Car />
                                    </TableCell>
                                    <TableCell className="border">
                                        {' '}
                                        <div className="flex gap-2">
                                            <div className="h-5 w-5 bg-[#000000]"></div> <span>#000000</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">55000</TableCell>
                                    <TableCell className="border">1E+08</TableCell>
                                    <TableCell className="border">500</TableCell>
                                    <TableCell className="border">999999</TableCell>
                                    <TableCell className="border">10</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Truck</TableCell>
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
                                    <TableCell className="border">Cube Van</TableCell>
                                    <TableCell className="border">
                                        <Car />
                                    </TableCell>
                                    <TableCell className="border">
                                        {' '}
                                        <div className="flex gap-2">
                                            <div className="h-5 w-5 bg-[#000000]"></div> <span>#000000</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">1500</TableCell>
                                    <TableCell className="border">999999</TableCell>
                                    <TableCell className="border">500</TableCell>
                                    <TableCell className="border">999999</TableCell>
                                    <TableCell className="border">10</TableCell>
                                    <TableCell className="border"></TableCell>
                                    <TableCell className="border">Car/Van</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
