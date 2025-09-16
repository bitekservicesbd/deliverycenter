import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus, Save, Undo } from 'lucide-react';
import { useState } from 'react';

export default function DataTable() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Carrier Commission Plan" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Carrier Commission Plan</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="container mx-auto w-full">
                        <div className="w-full overflow-x-auto rounded-lg">
                            <Table className="min-w-full text-left text-sm">
                                <TableHeader className="custom-nav-color">
                                    <TableRow className="">
                                        <TableHead className="text-white">
                                            <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                                                <FilePlus />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-white">Description</TableHead>
                                        <TableHead className="text-white">Plan Name</TableHead>
                                        <TableHead className="text-white">Base Rate</TableHead>
                                        <TableHead className="text-white">Weight Rate</TableHead>
                                        <TableHead className="text-white">Pieces Rate</TableHead>
                                        <TableHead className="text-white">Vehicle Rate</TableHead>
                                        <TableHead className="text-white">Fuel Rate</TableHead>
                                        <TableHead className="text-white">Afterhours Rate</TableHead>
                                        <TableHead className="text-white">Waiting Time Rate</TableHead>
                                        <TableHead className="text-white">Insurance Rate</TableHead>
                                        <TableHead className="text-white">Appointment Rate</TableHead>
                                        <TableHead className="text-white">Accessorial Rate</TableHead>
                                        <TableHead className="text-white">Dengerous Goods Rate</TableHead>
                                        <TableHead className="text-white">Signature Rate</TableHead>
                                        <TableHead className="text-white">Picture Rate</TableHead>
                                        <TableHead className="text-white">Distance Rate</TableHead>
                                        <TableHead className="text-white">Child1 Rate</TableHead>
                                        <TableHead className="text-white">Child2 Rate</TableHead>
                                        <TableHead className="text-white">Child3 Rate</TableHead>
                                        <TableHead className="text-white">Child4 Rate</TableHead>
                                        <TableHead className="text-white">Child5 Rate</TableHead>
                                        <TableHead className="text-white">Child6 Rate</TableHead>
                                        <TableHead className="text-white">Use Distance Ration</TableHead>
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
                                                <Input type="text" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">
                                                <Input type="number" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell colSpan={24} className="border py-28 text-center">
                                            No data to Display
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
