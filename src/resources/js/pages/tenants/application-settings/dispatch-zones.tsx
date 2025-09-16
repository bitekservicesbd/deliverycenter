import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Copy, FilePenLine, FileX2, Plus } from 'lucide-react';

export default function DispatchZones() {
    const dispatchZonesData = [
        { id: 1, zone: '1A', zoneId: 14 },
        { id: 2, zone: '1B', zoneId: 22 },
        { id: 3, zone: '1C', zoneId: 15 },
        { id: 4, zone: '1E', zoneId: 12 },
        { id: 5, zone: '1H', zoneId: 20 },
        { id: 6, zone: '2A', zoneId: 30 },
        { id: 7, zone: '2B', zoneId: 31 },
        { id: 8, zone: '2C', zoneId: 16 },
        { id: 9, zone: '2K', zoneId: 29 },
        { id: 10, zone: '4B', zoneId: 21 },
        { id: 11, zone: '4S', zoneId: 23 },
        { id: 12, zone: '4T', zoneId: 24 },
        { id: 13, zone: '5P', zoneId: 33 },
        { id: 14, zone: 'H 01', zoneId: 4 },
        { id: 15, zone: 'H 02', zoneId: 6 },
        { id: 16, zone: 'H 03', zoneId: 34 },
    ];

    return (
        <TenantLayout>
            <Head title="Dispatch Zones" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Dispatch Zones</span>
            </PageNav>

            <div className="p-5">
                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Dispatch Zones" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dispatch Zones">Dispatch Zones</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                            <Label className="min-w-[150px]">Dispatch Zone Name</Label>
                            <Input />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label className="min-w-[100px]">Zone Group</Label>
                            <Input />
                        </div>

                        <Button>Search</Button>
                    </div>

                    <Button asChild>
                        <Link href={route('tenant.application.settings.create.dispatch.zones')} className="inline-flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New
                        </Link>
                    </Button>
                </div>

                <div className="mt-1 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600">
                                    Action
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Dispatch Zone</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Dispatch Zone ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dispatchZonesData.map((zone) => (
                                <TableRow key={zone.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 p-2">
                                        <FilePenLine className="text-blue-500" />
                                        <Copy className="text-green-500" />
                                        <FileX2 className="text-red-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{zone.zone}</TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">{zone.zoneId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
