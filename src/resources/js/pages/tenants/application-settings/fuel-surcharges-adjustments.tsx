import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

export default function FuelSurchargesAdjustments() {
    const fuelSurchargesAdjustmentsData = [
        { id: 1, surcharge: 'UHN' },
        { id: 2, surcharge: 'Skid Surcharges' },
        { id: 3, surcharge: 'SDM VIALS' },
        { id: 4, surcharge: 'SDM CENTRAL' },
        { id: 5, surcharge: 'Same Day' },
        { id: 6, surcharge: 'Medslink' },
        { id: 7, surcharge: 'Low Box Dedicated' },
        { id: 8, surcharge: 'DC 80' },
    ];

    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setOpen(false);
    };

    return (
        <TenantLayout>
            <Head title="Fuel Surcharges Update" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Fuel Surcharges Adjustments</span>
            </PageNav>
            <div className="p-5">
                <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border">
                        <p className="border-b bg-gray-50 p-3 text-center dark:bg-gray-800">
                            Please select the surcharge plan(s) to update/adjust the fuel surcharge
                        </p>

                        <Table>
                            <TableHeader>
                                <TableRow className="dark:border-gray-600">
                                    <TableHead className="text-center">
                                        <Checkbox className="dark:bg-white" />
                                    </TableHead>
                                    <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Surcharge</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {fuelSurchargesAdjustmentsData.map((surcharge) => (
                                    <TableRow key={surcharge.id} className="dark:border-gray-600">
                                        <TableCell className="flex justify-center p-2">
                                            <Checkbox className="dark:bg-white" />
                                        </TableCell>
                                        <TableCell className="border-s p-2 dark:border-gray-600">{surcharge.surcharge}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <div className="border-b bg-gray-50 p-3 dark:bg-gray-800">
                            <p className="font-medium">Update Fuel Charge Percent</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="vehicle">Vehicle</Label>
                                <Input id="vehicle" placeholder="Enter vehicle" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date Effective</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                        >
                                            {date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="charge-percent">Charge %*</Label>
                                <Input id="charge-percent" placeholder="Enter charge percentage" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="commissionable-percent">Commissionable %*</Label>
                                <Input id="commissionable-percent" defaultValue="100.00" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-4">
                            <Button>Save</Button>
                            <Button variant="outline">Clear</Button>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
