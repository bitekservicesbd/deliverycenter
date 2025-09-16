import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePenLine, FilePlus2, FileX2, Save, Search, Undo2, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PricePlanTemplates() {
    const [create, setCreate] = useState(false);
    const pricePlanTemplatesData = [
        { id: 1, select: false, description: 'Matrix', defaultTemplate: true },
        { id: 2, select: false, description: 'Medslink', defaultTemplate: true },
        { id: 3, select: false, description: 'Relay', defaultTemplate: true },
        { id: 4, select: false, description: 'SDM Central', defaultTemplate: true },
        { id: 5, select: false, description: 'UHN', defaultTemplate: true },
    ];
    const pricePlanAssignData = [
        { id: 1, name: 'Loblaws Inc' },
        { id: 2, name: 'Loblaws Inc - DC80' },
        { id: 3, name: 'Loblaws Inc - DC80 Returns' },
        { id: 4, name: 'Loblaws Inc.' },
        { id: 5, name: 'Princess Margaret' },
        { id: 6, name: 'Shoppers Drug Mart' },
        { id: 7, name: 'Shoppers Drug Mart - MedsLink' },
        { id: 8, name: 'Shoppers Drug Mart 4868' },
        { id: 9, name: 'Specialty Health Network' },
        { id: 10, name: 'Specialty House Account' },
        { id: 11, name: 'Toronto General Hospital' },
        { id: 12, name: 'Toronto General Hospital-2' },
        { id: 13, name: 'Toronto General Hospital-3' },
        { id: 14, name: 'Toronto Western Hospital' },
    ];
    const [selectedIds, setSelectedIds] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        setAllSelected(selectedIds.length === pricePlanAssignData.length && selectedIds.length > 0);
    }, [selectedIds]);

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(pricePlanAssignData.map((item) => item.id));
        }
    };

    const toggleSingle = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <TenantLayout>
            <Head title="Price Plan Templates" />
            <div>
                <TopSearch className="mb-2" />
            </div>
            <PageNav>
                <span className="ms-5 font-bold text-white">Price Plan</span>
            </PageNav>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="h-62 overflow-hidden rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="dark:border-gray-600">
                                    <TableHead
                                        className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                        onClick={() => setCreate(true)}
                                    >
                                        <FilePlus2 />
                                    </TableHead>
                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Select</TableHead>
                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                        Default Template
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {create && (
                                    <TableRow>
                                        <TableCell>
                                            <div className="flex justify-center gap-2">
                                                <Button type="button" variant={'outline'}>
                                                    <Save className="cursor-pointer text-blue-500" />
                                                </Button>
                                                <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                                    <Undo2 className="cursor-pointer" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="d-none border"></TableCell>
                                        <TableCell className="border">
                                            <Input />
                                        </TableCell>
                                        <TableCell className="border text-center">
                                            <Checkbox />
                                        </TableCell>
                                    </TableRow>
                                )}
                                {pricePlanTemplatesData.map((data) => (
                                    <TableRow key={data.id} className="dark:border-gray-600">
                                        <TableCell className="flex justify-center gap-2 p-2">
                                            <FilePenLine className="text-blue-500" />
                                            <FileX2 className="text-red-500" />
                                        </TableCell>
                                        <TableCell className="border-s p-2 dark:border-gray-600">
                                            <div className="flex justify-center">
                                                <RadioGroup
                                                    value={selectedTemplate?.toString()}
                                                    onValueChange={(value) => setSelectedTemplate(parseInt(value))}
                                                >
                                                    <RadioGroupItem value={data.id.toString()} checked={selectedTemplate === data.id} />
                                                </RadioGroup>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-s p-2 dark:border-gray-600">{data.description}</TableCell>
                                        <TableCell className="border-s p-2 text-center dark:border-gray-600">
                                            <Checkbox defaultChecked={data.defaultTemplate} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <div className="flex flex-row gap-2 sm:flex-1">
                                <div className="relative flex-1 md:flex-none">
                                    <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input type="search" placeholder="String search..." className="w-full pl-8 md:w-[200px]" />
                                </div>
                                <Button className="w-auto">Search</Button>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <div className="flex gap-2">
                                        <User className="h-4 w-4" />
                                        <p>Assign</p>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user1">User 1</SelectItem>
                                    <SelectItem value="user2">User 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="h-62 overflow-y-auto border-b">
                            <Table>
                                <TableHeader>
                                    <TableRow className="dark:border-gray-600">
                                        <TableHead className="custom-nav-color px-1 py-2 text-center text-white dark:border-gray-600">
                                            <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                                        </TableHead>
                                        <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Name</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {pricePlanAssignData.map((data) => (
                                        <TableRow key={data.id} className="dark:border-gray-600">
                                            <TableCell className="border-s p-2 text-center dark:border-gray-600">
                                                <Checkbox checked={selectedIds.includes(data.id)} onCheckedChange={() => toggleSingle(data.id)} />
                                            </TableCell>
                                            <TableCell className="border-s p-2 dark:border-gray-600">{data.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead
                                    className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                    onClick={() => setCreate(true)}
                                >
                                    <FilePlus2 />
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Service</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Vehicle Type</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Price Plan</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Price Plan Discount
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Alternate Plan 1
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Alternate Plan 2
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Surcharge Plan</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Surcharge Plan Discount
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Use Dist. for Missing Price Plan
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Incl. Pickup Distance
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Use Radius Distance
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Higher Charge Wt Or Pieces
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Default Plan</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {create && (
                                <TableRow>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button type="button" variant={'outline'}>
                                                <Save className="cursor-pointer text-blue-500" />
                                            </Button>
                                            <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
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
                                    <TableCell className="border text-center">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                            )}

                            <TableRow className="text-center dark:border-gray-600">
                                <TableCell className="border-s p-2 dark:border-gray-600" colSpan={10}>
                                    No Data Found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <p className="mt-6 mb-2 text-center font-bold dark:text-white">Price Plan Exceptions</p>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead
                                    className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                    onClick={() => setCreate(true)}
                                >
                                    <FilePlus2 />
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Org Service</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">New Service</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Org Vehicle Type
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    New Vehicle Type
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Org Price Plan</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">New Price Plan</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">Org Surcharge</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">New Surcharge</TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Org Ship From Start Dt
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    New Ship From Start Dt
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    Org Ship From End Dt
                                </TableHead>
                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white dark:border-gray-600">
                                    New Ship From End Dt
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Org Ship To Start Dt</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">New Ship To Start Dt</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Org Ship To End Dt</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">New Ship To End Dt</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">From Street</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">To Street</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">From Zone</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">To Zone</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Pkg Type</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Total Pkgs</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Total Wt</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow className="text-center dark:border-gray-600">
                                <TableCell className="border-s p-2 dark:border-gray-600" colSpan={20}>
                                    No Data Found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
