import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Copy, FilePenLine, FilePlus2, Minus, Plus, Save, Search, Undo2 } from 'lucide-react';
import { useState } from 'react';

export default function SalesCommissionPlan() {
    const serviceClassData = [
        {
            id: 1,
            colour: 'Red',
            description: 'Direct',
            code: 'DR',
            glCode: '',
            deliverInDays: '0',
            deliverInMins: '90',
            vehicleType: '',
            fromTime: '00:01',
            cutOff: '23:59',
            serviceEndTime: '23:59',
            almostLatePuMin: '30',
            almostLateDelMin: '30',
            shipWindowMinutes: '0',
            deliveryWindowMinutes: '0',
            availableSat: true,
            availableSun: true,
            availableHoliday: true,
            localOnly: false,
            internalOnly: false,
        },
        {
            id: 2,
            colour: '#FF00FF',
            description: 'Direct',
            code: 'DR',
            glCode: '',
            deliverInDays: '0',
            deliverInMins: '90',
            vehicleType: '',
            fromTime: '00:01',
            cutOff: '23:59',
            serviceEndTime: '23:59',
            almostLatePuMin: '30',
            almostLateDelMin: '30',
            shipWindowMinutes: '0',
            deliveryWindowMinutes: '0',
            availableSat: true,
            availableSun: true,
            availableHoliday: true,
            localOnly: false,
            internalOnly: false,
        },
    ];

    const [create, setCreate] = useState(false);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [expandCreateStates, setExpandCreateStates] = useState<{ [key: number]: boolean }>({});
    const toggleExpandRow = (id: number) => {
        setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
    };
    const toggleExpandCreate = (rowId: number, value: boolean) => {
        setExpandCreateStates((prev) => ({
            ...prev,
            [rowId]: value,
        }));
    };
    const getExpandCreateState = (rowId: number) => {
        return expandCreateStates[rowId] || false;
    };

    return (
        <TenantLayout>
            <Head title="Service Class" />
            <TopSearch className="mb-2" />
            <PageNav>
                <span className="ms-5 font-bold text-white">Service Class</span>
            </PageNav>
            <div className="p-4">
                <div className="mb-2">
                    <div className="flex flex-row gap-2 sm:flex-1">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input type="search" placeholder="Search..." className="w-full pl-8 md:w-[200px]" />
                        </div>
                        <Button className="w-auto">Search</Button>
                    </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead
                                    className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                    onClick={() => setCreate(true)}
                                >
                                    <FilePlus2 />
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Colour</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Code</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">GL Code</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Deliver In Days</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Deliver In Mins</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Type</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">From Time</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Cut Off</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Service End Time</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Almost Late (PU) Min</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Almost Late (DEL) Min</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Ship Window Minutes</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Delivery Window Minutes</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Available Sat</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Available Sun</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Available Holiday</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Local Only</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Internal Only</TableHead>
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
                                                <Undo2 className="cursor-pointer" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border">
                                        <div className="relative w-full">
                                            <Input type="text" placeholder="Enter color code" className="w-full pl-10" />
                                            <div className="absolute top-1/2 left-2 h-4 h-6 w-5 -translate-y-1/2 transform overflow-hidden">
                                                <input type="color" />
                                            </div>
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
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="van">Van</SelectItem>
                                                <SelectItem value="truck">Truck</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>

                                    <TableCell className="border">
                                        <Input type="time" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input type="time" />
                                    </TableCell>
                                    <TableCell className="border">
                                        <Input type="time" />
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

                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                            )}

                            {serviceClassData.map((data) => (
                                <>
                                    <TableRow key={data.id} className="dark:border-gray-600">
                                        <TableCell className="flex justify-center gap-2 p-2">
                                            {expandedRows.includes(data.id) ? (
                                                <Minus className="cursor-pointer text-red-400" onClick={() => toggleExpandRow(data.id)} />
                                            ) : (
                                                <Plus className="cursor-pointer text-blue-300" onClick={() => toggleExpandRow(data.id)} />
                                            )}
                                            <Copy className="cursor-pointer text-green-500" />
                                            <FilePenLine className="cursor-pointer text-blue-500" />
                                        </TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4" style={{ backgroundColor: data.colour }}></div>
                                                {data.colour}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.description}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.code}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.glCode}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.deliverInDays}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.deliverInMins}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.vehicleType}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.fromTime}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.cutOff}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.serviceEndTime}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.almostLatePuMin}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.almostLateDelMin}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.shipWindowMinutes}</TableCell>
                                        <TableCell className="border p-2 text-start dark:border-gray-600">{data.deliveryWindowMinutes}</TableCell>
                                        <TableCell className="border p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.availableSat} />
                                        </TableCell>
                                        <TableCell className="border p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.availableSun} />
                                        </TableCell>
                                        <TableCell className="border p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.availableHoliday} />
                                        </TableCell>
                                        <TableCell className="border p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.localOnly} />
                                        </TableCell>
                                        <TableCell className="border p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.internalOnly} />
                                        </TableCell>
                                    </TableRow>

                                    {expandedRows.includes(data.id) && (
                                        <TableRow>
                                            <TableCell colSpan={20} className="p-3">
                                                <div className="mt-2 overflow-hidden rounded-lg border">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="dark:border-gray-600">
                                                                <TableHead className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600">
                                                                    <FilePlus2
                                                                        className="cursor-pointer text-white"
                                                                        onClick={() => toggleExpandCreate(data.id, true)}
                                                                    />
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Vehicle Type
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Tailgate Required
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Inside Delivery
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Package QTY
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Zone From
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Zone To
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Min Distance
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Deliver In Minutes
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">
                                                                    Deliver In Days
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>

                                                        <TableBody>
                                                            {getExpandCreateState(data.id) && (
                                                                <TableRow>
                                                                    <TableCell className="border-s">
                                                                        <div className="flex justify-center gap-2">
                                                                            <Button type="button" variant={'outline'}>
                                                                                <Save className="cursor-pointer text-blue-500" />
                                                                            </Button>
                                                                            <Button
                                                                                type="button"
                                                                                variant={'outline'}
                                                                                onClick={() => toggleExpandCreate(data.id, false)}
                                                                            >
                                                                                <Undo2 className="cursor-pointer" />
                                                                            </Button>
                                                                        </div>
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Select>
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="van">Van</SelectItem>
                                                                                <SelectItem value="truck">Truck</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </TableCell>

                                                                    <TableCell className="border text-center">
                                                                        <Checkbox />
                                                                    </TableCell>

                                                                    <TableCell className="border text-center">
                                                                        <Checkbox />
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Input type="number" />
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Select>
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="zone1">Zone 1</SelectItem>
                                                                                <SelectItem value="zone2">Zone 2</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Select>
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="zone1">Zone 1</SelectItem>
                                                                                <SelectItem value="zone2">Zone 2</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Input />
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Input type="number" />
                                                                    </TableCell>

                                                                    <TableCell className="border">
                                                                        <Input type="number" />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}

                                                            <TableRow className="text-center">
                                                                <TableCell colSpan={10}>No data to found</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
