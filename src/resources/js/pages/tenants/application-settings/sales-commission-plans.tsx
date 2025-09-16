import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus2, Save, Trash } from 'lucide-react';
import { useState } from 'react';

export default function SalesCommissionPlan() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Sales Commission Plans" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Sales Commission Plans</span>
            </PageNav>
            <div className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow className="dark:border-gray-600">
                            <TableHead
                                className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                onClick={() => setCreate(true)}
                            >
                                <FilePlus2 />
                            </TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Plan Name</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Base Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Weight Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Pieces Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Fuel Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Afterhours Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Waiting Time Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Insurance Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Accessorial Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Distance Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child1Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child2Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child3Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child4Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child5Rate</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Child6Rate</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {create && (
                            <TableRow>
                                <TableCell className="border-s">
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

                        <TableRow className="border text-center dark:border-gray-600 dark:bg-gray-700">
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                            <TableCell className="border p-2 text-start dark:border-gray-600">None</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </TenantLayout>
    );
}
