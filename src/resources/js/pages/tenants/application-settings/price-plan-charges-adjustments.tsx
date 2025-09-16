import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import TenantLayout from '@/layouts/tenant/tenant-app-layout';

import { Head } from '@inertiajs/react';

export default function PricePlanCharges() {
    const PricePlanChargesData = [
        { id: 1, plan: 'DC 80 Next Day' },
        { id: 2, plan: 'DC 80 Sameday' },
        { id: 3, plan: 'Low Box Dedicated' },
        { id: 4, plan: 'Matrix Direct' },
        { id: 5, plan: 'Matrix Next Day' },
        { id: 6, plan: 'Matrix Next Day By 9am' },
        { id: 7, plan: 'Matrix NextDay By 7a' },
        { id: 8, plan: 'Matrix Rush' },
        { id: 9, plan: 'Matrix Sameday 11cut' },
        { id: 10, plan: 'Medslink Next Day' },
        { id: 11, plan: 'Relay Direct' },
        { id: 12, plan: 'Relay Rush' },
        { id: 13, plan: 'Relay Sameday' },
        { id: 14, plan: 'SDM CENTRAL' },
        { id: 15, plan: 'SDM Vials Next Day' },
        { id: 16, plan: 'SDM Vials Sat Next Day' },
        { id: 17, plan: 'SDM Vials Sunday Next Day' },
        { id: 18, plan: 'SHN Next Day' },
        { id: 19, plan: 'Skid Rush Rates' },
        { id: 20, plan: 'Skid Sameday Rates' },
        { id: 21, plan: 'UHN COLD CHAIN NEXT DAY' },
        { id: 22, plan: 'UHN DIRECT' },
        { id: 23, plan: 'UHN NEXT DAY' },
        { id: 24, plan: 'UHN RUSH' },
        { id: 25, plan: 'UHN SAME DAY' },
    ];

    return (
        <TenantLayout>
            <Head title="Price Plan Charges" />
            <TopSearch className="mb-2" />
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Price Plan Charges</span>
            </PageNav>
            <div className="p-5">
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border">
                        <p className="bg-gray-50 p-3 text-center dark:bg-gray-800">Please select the price plan(s) to update/adjust</p>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="dark:border-gray-600">
                                    <TableHead className="text-center">
                                        <Checkbox className="dark:bg-white" />
                                    </TableHead>
                                    <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Price Plan</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {PricePlanChargesData.map((plan) => (
                                    <TableRow key={plan.id} className="dark:border-gray-600">
                                        <TableCell className="flex justify-center p-2">
                                            <Checkbox className="dark:bg-white" />
                                        </TableCell>
                                        <TableCell className="border-s p-2 dark:border-gray-600">{plan.plan}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <div className="rounded border">
                            <div className="p-4">
                                <p className="mb-4 border-b pb-2 font-medium">Base Charge</p>

                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="w-full items-center">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Base Charge" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Increase">Increase</SelectItem>
                                                <SelectItem value="Decrease">Decrease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex w-full items-center gap-2">
                                        <Input type="radio" name="baseChargeType" id="basePercentage" className="h-4 w-4" />
                                        <Label htmlFor="basePercentage">age (%)</Label>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Input type="radio" name="baseChargeType" id="baseAmount" className="h-4 w-4" />
                                            <Label htmlFor="baseAmount">Amount ($)</Label>
                                        </div>
                                        <Input type="number" placeholder="Enter amount" className="flex-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="mb-4 border-b pb-2 font-medium">Weight Block Charge</p>

                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="w-full items-center">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Weight Block Charge" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Increase">Increase</SelectItem>
                                                <SelectItem value="Decrease">Decrease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex w-full items-center gap-2">
                                        <Input type="radio" name="weightChargeType" id="weightPercentage" className="h-4 w-4" />
                                        <Label htmlFor="weightPercentage">age (%)</Label>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Input type="radio" name="weightChargeType" id="weightAmount" className="h-4 w-4" />
                                            <Label htmlFor="weightAmount">Amount ($)</Label>
                                        </div>
                                        <Input type="number" placeholder="Enter amount" className="flex-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="mb-4 border-b pb-2 font-medium">Distance Block Charge</p>

                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="w-full items-center">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Distance Base Charge" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Increase">Increase</SelectItem>
                                                <SelectItem value="Decrease">Decrease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex w-full items-center gap-2">
                                        <Input type="radio" name="distanceChargeType" id="distancePercentage" className="h-4 w-4" />
                                        <Label htmlFor="distancePercentage">age (%)</Label>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Input type="radio" name="distanceChargeType" id="distanceAmount" className="h-4 w-4" />
                                            <Label htmlFor="distanceAmount">Amount ($)</Label>
                                        </div>
                                        <Input type="number" placeholder="Enter amount" className="flex-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="mb-4 border-b pb-2 font-medium">Qty Block Charge</p>

                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="w-full items-center">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Qty Block Charge" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Increase">Increase</SelectItem>
                                                <SelectItem value="Decrease">Decrease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex w-full items-center gap-2">
                                        <Input type="radio" name="qtyChargeType" id="qtyPercentage" className="h-4 w-4" />
                                        <Label htmlFor="qtyPercentage">age (%)</Label>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center gap-2">
                                            <Input type="radio" name="qtyChargeType" id="qtyAmount" className="h-4 w-4" />
                                            <Label htmlFor="qtyAmount">Amount ($)</Label>
                                        </div>
                                        <Input type="number" placeholder="Enter amount" className="flex-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-2 p-4 sm:flex-row">
                                <Button>Save</Button>
                                <Button className="sm:ms-2" variant="outline">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
