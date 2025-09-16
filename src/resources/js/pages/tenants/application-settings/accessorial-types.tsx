import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePenLine, FilePlus2, FileX2, Save, Trash } from 'lucide-react';
import { useState } from 'react';

const AccessorialTypeData = [
    { description: 'Bas Charges', code: 'BAS', discount: true, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Weight Charge', code: 'WGT', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '' },
    { description: 'Pieces Charge', code: 'PCS', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '' },
    { description: 'Vehicle Charge', code: 'VCL', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '' },
    { description: 'Fuel Charge', code: 'FUL', discount: false, fuel: false, newLoad: true, gl_code: '', commission: '' },
    { description: 'After Hours Charge', code: 'AFT', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Waiting Time Charge (Shipper)', code: 'WT1', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Waiting Time Charge (Consignee)', code: 'WT2', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Insurance Charge', code: 'INS', discount: false, fuel: false, newLoad: true, gl_code: '', commission: '' },
    { description: 'Appointment Charge', code: 'APP', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'MISC Accessorial Charge', code: 'ACI', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Dangerous Goods/Hazmat', code: 'DGH', discount: false, fuel: false, newLoad: true, gl_code: '', commission: '' },
    { description: 'Signature Charge', code: 'SGN', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Picture POD/Document Charge', code: 'DOC', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Tailgate Charge', code: 'TG', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Inside Delivery Charge', code: 'IDS', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Temporary Control', code: 'TMP', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
    { description: 'Return Pickup', code: 'RP', discount: false, fuel: true, newLoad: false, gl_code: '', commission: '' },
    { description: 'Ambient 20%', code: 'AMB', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '' },
    { description: 'Residential Delivery', code: 'RSD', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '' },
    { description: '407 ETR', code: '407', discount: false, fuel: true, newLoad: true, gl_code: '', commission: '0' },
];

export default function AccessorialTypes() {
    const [create, setCreate] = useState(false);
    return (
        <TenantLayout>
            <Head title="Accessorial Types" />
            <div>
                <TopSearch className="mb-2" />
            </div>
            <PageNav>
                <span className="ms-5 font-bold text-white">Accessorial Types</span>
            </PageNav>
            <div className="p-5">
                <Table className="w-full">
                    <TableHeader className="w-full">
                        <TableRow className="border dark:border-gray-600">
                            <TableHead
                                className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600"
                                onClick={() => setCreate(true)}
                            >
                                <FilePlus2 />
                            </TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Code</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Apply Discount</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Include In Fuel</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Add To New Load</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">GL Code</TableHead>
                            <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Commissionable Percent</TableHead>
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
                            </TableRow>
                        )}

                        {AccessorialTypeData.map((row, idx) => (
                            <TableRow
                                key={idx}
                                className={`border text-center dark:border-gray-600 ${idx % 2 === 0 ? 'dark:bg-gray-700' : 'dark:bg-gray-800'}`}
                            >
                                <TableCell className="flex justify-center gap-2 px-2 py-5">
                                    <FilePenLine className="text-blue-500" />
                                    {(row.code === 'AMB' || row.code === 'RSD' || row.code === '407') && <FileX2 className="text-red-500" />}
                                </TableCell>
                                <TableCell className="border p-2 text-start dark:border-gray-600">{row.description}</TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">{row.code}</TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">
                                    <Checkbox className="h-4 w-4 bg-white" checked={row.discount} />
                                </TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">
                                    <Checkbox className="h-4 w-4 bg-white" checked={row.fuel} />
                                </TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">
                                    <Checkbox className="h-4 w-4 bg-white" checked={row.newLoad} />
                                </TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">{row.gl_code}</TableCell>
                                <TableCell className="border p-2 dark:border-gray-600">{row.commission}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TenantLayout>
    );
}
