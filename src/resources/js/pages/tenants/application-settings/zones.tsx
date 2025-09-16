import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Zone() {
    const zonesData = [
        { id: 1, name: 'DC RO ZONE 1', group: 'DC RO' },
        { id: 2, name: 'DC RO ZONE 2', group: 'DC RO' },
        { id: 3, name: 'DC RO ZONE 3', group: 'DC RO' },
        { id: 4, name: 'Malvix Zone 1', group: 'Malvix' },
        { id: 5, name: 'Malvix Zone 2', group: 'Malvix' },
        { id: 6, name: 'Mediclink Zone 1', group: 'Mediclink' },
        { id: 7, name: 'Mediclink Zone 2', group: 'Mediclink' },
        { id: 8, name: 'Mediclink Zone 3', group: 'Mediclink' },
        { id: 9, name: 'Mediclink Zone 4', group: 'Mediclink' },
        { id: 10, name: 'Mediclink Zone 5', group: 'Mediclink' },
        { id: 11, name: 'Mediclink Zone 6', group: 'Mediclink' },
        { id: 12, name: 'Relay Zone 2', group: 'Relay' },
        { id: 13, name: 'Relay Zone1', group: 'Relay' },
        { id: 14, name: 'SHH NO ZONE 1', group: 'Specialty Health Network' },
        { id: 15, name: 'SHH NO ZONE 2', group: 'Specialty Health Network' },
        { id: 16, name: 'SHH NO ZONE 3', group: 'Specialty Health Network' },
        { id: 17, name: 'SHH NO ZONE 4', group: 'Specialty Health Network' },
        { id: 18, name: 'SHH NO ZONE 6', group: 'Specialty Health Network' },
        { id: 19, name: 'SHH NO ZONE 7', group: 'Specialty Health Network' },
        { id: 20, name: 'SHH NO ZONE 8', group: 'Specialty Health Network' },
        { id: 21, name: 'UHH ZONE 1', group: 'UHH' },
        { id: 22, name: 'UHH ZONE 2', group: 'UHH' },
        { id: 23, name: 'UHH ZONE 3', group: 'UHH' },
        { id: 24, name: 'UHH ZONE 4', group: 'UHH' },
        { id: 25, name: 'UHH ZONE 5', group: 'UHH' },
        { id: 26, name: 'UHH ZONE 6', group: 'UHH' },
        { id: 27, name: 'VZLS NO ZONE 1', group: 'VZLS NO' },
        { id: 28, name: 'VZLS NO ZONE 10', group: 'VZLS NO' },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredZones = zonesData.filter(
        (zone) => zone.name.toLowerCase().includes(searchTerm.toLowerCase()) || zone.group.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <TenantLayout>
            <Head title="Zones" />
            <TopSearch className="mb-2" />
            <PageNav>
                <span className="ms-5 font-bold text-white">Zone</span>
            </PageNav>
            <div className="mt-3 mb-3 p-5 pt-0">
                <Button variant="outline" className="mb-4 bg-sky-900 text-white hover:bg-sky-800">
                    Create Zone
                </Button>
                <div className="relative mb-1 w-[300px]">
                    <Search className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search Zone Counts" className="pl-8" />
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <Table className="w-full">
                        <TableHeader className="w-full">
                            <TableRow className="border dark:border-gray-600">
                                <TableHead className="custom-nav-color border px-1 py-2 text-white dark:border-gray-600"></TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Red Zone</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Zone Group</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredZones.map((zone) => (
                                <TableRow key={zone.id} className="border dark:border-gray-600">
                                    <TableCell className="border p-2 dark:border-gray-600">
                                        <Button variant="ghost" size="lg" className="h-10 w-10 p-1 hover:bg-red-100">
                                            <Trash2 className="h-8 w-8 text-red-500" />
                                        </Button>
                                        <Button variant="ghost" size="lg" className="h-10 w-10 p-1 hover:bg-blue-100">
                                            <Edit className="h-8 w-8 text-blue-500" />
                                        </Button>
                                        <Button variant="ghost" size="lg" className="h-10 w-10 p-1 hover:bg-orange-100">
                                            <Plus className="h-8 w-8 text-orange-500" />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">{zone.name}</TableCell>
                                    <TableCell className="border p-2 dark:border-gray-600">{zone.group}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
