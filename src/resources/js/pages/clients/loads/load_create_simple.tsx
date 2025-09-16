import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';

import { ChevronDownIcon, Plus, Save, Undo } from 'lucide-react';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const [deliveryOpen, setDeliveryOpen] = React.useState(false);
    const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>(undefined);
    const [create, setCreate] = React.useState(false);
    return (
        <ClientLayout>
            <Head title="Simple Load Create" />
            <div>
                <div>
                    <TopSearch />
                    <div>
                        <div className="mx-4 mt-3">
                            {/* order information */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <p className="font-bold">Order Information</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-5">
                                            <div>
                                                <Select>
                                                    <SelectTrigger className="w-full min-w-[180px]">
                                                        <SelectValue placeholder="Customer" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Select>
                                                    <SelectTrigger className="w-full min-w-[180px]">
                                                        <SelectValue placeholder="Service Class" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Input className="w-full" placeholder="Total Price" />
                                            </div>
                                            <div>
                                                <Input className="w-full" placeholder="Total Weight" />
                                            </div>
                                            <div>
                                                <Input className="w-full" placeholder="Total DM Weight" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {/* Pickup Card */}
                                <div>
                                    <Card className="w-full">
                                        <CardHeader>
                                            <p className="text-lg font-bold sm:text-xl">Pickup</p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mt-5">
                                                <div className=" ">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input type="text" className="w-full" id="name" placeholder="Name" />
                                                </div>

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="City">City</Label>
                                                        <Input type="text" className="w-full" id="City" placeholder="City" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="State">State</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="State" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Zip">Zip</Label>
                                                        <Input type="text" className="w-full" id="Zip" placeholder="Zip" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="Country">Country</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Country" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <Label htmlFor="Zone">Zone</Label>
                                                    <Select>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Zone" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                            <SelectItem value="dark">Dark</SelectItem>
                                                            <SelectItem value="system">System</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="mt-3">
                                                    <Label htmlFor="Instruction">Instruction</Label>
                                                    <Textarea></Textarea>
                                                </div>
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Contact">Contact</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Contact" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="Phone">Phone</Label>
                                                        <Input type="text" className="w-full" id="Phone" placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Email">Email</Label>
                                                        <Input type="text" className="w-full" id="Email" placeholder="Email" />
                                                    </div>
                                                    <div className="mt-0 sm:mt-8">
                                                        <Button type="button" variant={'outline'}>
                                                            Save Address
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Delivery Card */}
                                <div>
                                    <Card className="w-full">
                                        <CardHeader>
                                            <p className="text-lg font-bold sm:text-xl">Delivery</p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mt-5">
                                                <div className=" ">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input type="text" className="w-full" id="name" placeholder="Name" />
                                                </div>

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="City">City</Label>
                                                        <Input type="text" className="w-full" id="City" placeholder="City" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="State">State</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="State" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Zip">Zip</Label>
                                                        <Input type="text" className="w-full" id="Zip" placeholder="Zip" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="Country">Country</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Country" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <Label htmlFor="Zone">Zone</Label>
                                                    <Select>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Zone" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                            <SelectItem value="dark">Dark</SelectItem>
                                                            <SelectItem value="system">System</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="mt-3">
                                                    <Label htmlFor="Instruction">Instruction</Label>
                                                    <Textarea></Textarea>
                                                </div>
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Contact">Contact</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Contact" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                                <SelectItem value="dark">Dark</SelectItem>
                                                                <SelectItem value="system">System</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="mt-3">
                                                        <Label htmlFor="Phone">Phone</Label>
                                                        <Input type="text" className="w-full" id="Phone" placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
                                                    <div className="mt-3">
                                                        <Label htmlFor="Email">Email</Label>
                                                        <Input type="text" className="w-full" id="Email" placeholder="Email" />
                                                    </div>
                                                    <div className="mt-0 sm:mt-8">
                                                        <Button type="button" variant={'outline'}>
                                                            Save Address
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <Card className="mt-5 w-full">
                                    <CardHeader>
                                        <CardTitle>Additional Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-5">
                                            <div className="mt-3">
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="date-picker" className="px-1">
                                                            Ready Date
                                                        </Label>
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date-picker"
                                                                    className="w-32 justify-between font-normal"
                                                                >
                                                                    {date ? date.toLocaleDateString() : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        setDate(date);
                                                                        setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="time-picker" className="px-1">
                                                            Time
                                                        </Label>
                                                        <Input
                                                            type="time"
                                                            id="time-picker"
                                                            step="1"
                                                            defaultValue="10:30:00"
                                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="date-picker" className="px-1">
                                                            Delivery Date
                                                        </Label>
                                                        <Popover open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date-picker"
                                                                    className="w-32 justify-between font-normal"
                                                                >
                                                                    {deliveryDate ? deliveryDate.toLocaleDateString() : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={deliveryDate}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(deliveryDate) => {
                                                                        setDeliveryDate(deliveryDate);
                                                                        setDeliveryOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <Label htmlFor="time-picker" className="px-1">
                                                            Time
                                                        </Label>
                                                        <Input
                                                            type="time"
                                                            id="time-picker"
                                                            step="1"
                                                            defaultValue="10:30:00"
                                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Label htmlFor="Reference-No">Reference No</Label>
                                                <Input type="number" className="w-full" id="Reference-No" placeholder="Reference No" />
                                            </div>
                                            <div className="mt-3">
                                                <Label>Department ID</Label>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Department ID" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="mt-3">
                                                <Label>Vehicle</Label>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Vehicle" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* packages */}
                            <div>
                                <Card className="mt-5 w-full">
                                    <CardHeader>Packages</CardHeader>
                                    <CardContent>
                                        <div className="">
                                            <div className="overflow-x-auto">
                                                <Table className="border">
                                                    <TableHeader className="custom-nav-color">
                                                        <TableRow>
                                                            <TableHead className="py-2">
                                                                <Button variant="outline" onClick={() => setCreate(true)}>
                                                                    <Plus />
                                                                </Button>
                                                            </TableHead>
                                                            <TableHead className="py-2 text-white">Qty</TableHead>
                                                            <TableHead className="py-2 text-white">Package Type</TableHead>
                                                            <TableHead className="py-2 text-white">
                                                                Desc <small>(Max 25 chars)</small>
                                                            </TableHead>
                                                            <TableHead className="py-2 text-white">Weight</TableHead>
                                                            <TableHead className="py-2 text-white">L</TableHead>
                                                            <TableHead className="py-2 text-white">W</TableHead>
                                                            <TableHead className="py-2 text-white">H</TableHead>
                                                            <TableHead className="py-2 text-white">LineWt</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {create && (
                                                            <TableRow>
                                                                <TableCell className="border">
                                                                    <div className="flex gap-2">
                                                                        <Button type="button" variant={'outline'}>
                                                                            <Save className="h-4 w-4 cursor-pointer" />
                                                                        </Button>
                                                                        <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                                                            <Undo className="h-4 w-4 cursor-pointer" />
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Select>
                                                                        <SelectTrigger className="w-full min-w-[180px]">
                                                                            <SelectValue defaultValue={'light'} />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="light">Light</SelectItem>
                                                                            <SelectItem value="dark">Dark</SelectItem>
                                                                            <SelectItem value="system">System</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Input type="number" />
                                                                </TableCell>
                                                                <TableCell className="border">
                                                                    <Checkbox />
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                        <TableRow>
                                                            <TableCell colSpan={9} className="font-fold border py-14 text-center">
                                                                No data
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
