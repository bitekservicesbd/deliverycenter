import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, router } from '@inertiajs/react';
import { File, Pencil } from 'lucide-react';

export default function DataTable() {
    const data = [
        {
            code: 'PCS',
            description: 'Pieces',
            created_date: '',
            created_by_id: '',
            last_updated_date: '10/1/2020 4:37:01 PM',
            last_updated_by_id: '165',
            is_deleted: '',
        },
        {
            code: 'CASE',
            description: 'Case',
            created_date: '',
            created_by_id: '',
            last_updated_date: '10/1/2020 4:37:01 PM',
            last_updated_by_id: '1',
            is_deleted: '',
        },
        {
            code: 'SKID',
            description: 'Skid',
            created_date: '',
            created_by_id: '',
            last_updated_date: '',
            last_updated_by_id: '',
            is_deleted: '',
        },
        {
            code: 'CRATE',
            description: 'Crate',
            created_date: '',
            created_by_id: '',
            last_updated_date: '',
            last_updated_by_id: '',
            is_deleted: '',
        },
        {
            code: '6 PACK',
            description: '6 Pack',
            created_date: '',
            created_by_id: '',
            last_updated_date: '',
            last_updated_by_id: '',
            is_deleted: '',
        },
        {
            code: '12 PACK',
            description: '12 Pack',
            created_date: '',
            created_by_id: '',
            last_updated_date: '',
            last_updated_by_id: '',
            is_deleted: '',
        },
    ];

    return (
        <TenantLayout>
            <Head title="UOM Types" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-white">UOM Types</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="my-2">
                        <div className="mt-2 flex gap-2">
                            <div>
                                <Select>
                                    <SelectTrigger defaultValue={'UOM Types'} className="">
                                        <SelectValue placeholder="UOM Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UOM Types">UOM Types</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button className="bg-sky-900 hover:bg-sky-950" type="button">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <Button
                            className="mt-2 bg-sky-900 hover:bg-sky-950"
                            onClick={() => router.visit(route('tenant.application.settings.uom.types.create'))}
                        >
                            Add New
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">Action</TableHead>
                                    <TableHead className="text-white">Code</TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">Created Date</TableHead>
                                    <TableHead className="text-white">Created By_ID</TableHead>
                                    <TableHead className="text-white">Last Updated Date</TableHead>
                                    <TableHead className="text-white">Last Updated By_ID</TableHead>
                                    <TableHead className="text-white">IsDeleted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="border">
                                            <div className="flex gap-1">
                                                <Button type="button" variant={'outline'}>
                                                    <Pencil className="h-4 w-4 cursor-pointer" />
                                                </Button>
                                                <Button type="button" variant={'outline'}>
                                                    <File className="h-4 w-4 cursor-pointer" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border">{row.code}</TableCell>
                                        <TableCell className="border">{row.description}</TableCell>
                                        <TableCell className="border">{row.created_date}</TableCell>
                                        <TableCell className="border">{row.created_by_id}</TableCell>
                                        <TableCell className="border">{row.last_updated_date}</TableCell>
                                        <TableCell className="border">{row.last_updated_by_id}</TableCell>
                                        <TableCell className="border">{row.is_deleted}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
