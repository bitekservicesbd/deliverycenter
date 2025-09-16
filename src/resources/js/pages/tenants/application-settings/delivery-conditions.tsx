import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Copy, FilePenLine, Plus } from 'lucide-react';

export default function DeliveryConditions() {
    const deliveryConditionsData = [
        { id: 1, description: 'Fog Advisery', delay: 10 },
        { id: 2, description: 'Heavy Rain', delay: 35 },
        { id: 3, description: 'Fog Advisery', delay: 10 },
        { id: 4, description: 'Heavy snow', delay: 45 },
        { id: 5, description: 'Icy Conditions', delay: 25 },
        { id: 6, description: 'Clear', delay: 0 },
        { id: 7, description: '', delay: 0 },
    ];

    return (
        <TenantLayout>
            <Head title="Delivery Condition" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Delivery Conditions</span>
            </PageNav>
            <div className="p-5">
                <div className="mb-4 flex gap-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Delivery Conditions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Delivery Conditions">Delivery Conditions</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>Search</Button>
                </div>

                <Button asChild>
                    <Link href={route('tenant.application.settings.create.delivery.conditions')} className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </Button>

                <div className="mt-1 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600">
                                    Action
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Delay</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {deliveryConditionsData.map((condition) => (
                                <TableRow key={condition.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 p-2">
                                        <FilePenLine className="text-blue-500" />
                                        <Copy className="text-green-500" />
                                    </TableCell>
                                    <TableCell className="border">{condition.description}</TableCell>
                                    <TableCell className="border">{condition.delay}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
