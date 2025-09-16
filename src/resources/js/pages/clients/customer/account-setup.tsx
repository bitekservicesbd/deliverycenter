import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopButton from '@/components/ui/TopButton';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';
import { Plus, Save, Search, SquareX, Undo } from 'lucide-react';
import React from 'react';

export default function Index() {
    const [create, setCreate] = React.useState(false);
    return (
        <ClientLayout>
            <Head title="Account Setup" />
            <div>
                <TopSearch />
                <div className="mt-3">
                    <PageNav className="p-2 text-white">
                        <p className="font-bold">Edit Customer</p>
                    </PageNav>
                </div>
                <div className="container ms-0 sm:ms-2">
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <TopButton icon={Save} label="Save & Close" onClick={() => {}} />
                        <TopButton icon={Save} label="Save" onClick={() => {}} />
                        <TopButton icon={SquareX} label="Close" onClick={() => {}} />
                    </div>

                    <div className="mt-5">
                        <Tabs defaultValue="Details" className="mt-3">
                            <PageNav className="ms-2">
                                <TabsList>
                                    <TabsTrigger value="Details" className="ps-4">
                                        Details
                                    </TabsTrigger>
                                    <TabsTrigger value="Departments">Departments</TabsTrigger>
                                </TabsList>
                            </PageNav>
                            <TabsContent value="Details">
                                <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 dark:bg-zinc-950">
                                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-5">
                                        {/* Left Column */}
                                        <div className="flex flex-col gap-6 lg:col-span-3">
                                            <Card>
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle>Mailing Address</CardTitle>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="bill-to-same" defaultChecked />
                                                            <Label htmlFor="bill-to-same">Bill To Same</Label>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="customer-no">Customer No*</Label>
                                                            <Input id="customer-no" defaultValue="4" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="customer-name">Customer Name</Label>
                                                            <Input id="customer-name" defaultValue="Specialty House Account" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="street-1">Street 1</Label>
                                                        <Input id="street-1" defaultValue="2 - 4090B Sladeview Crescent" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="street-2">Street 2</Label>
                                                        <Input id="street-2" />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="country">Country</Label>
                                                            <Select defaultValue="canada">
                                                                <SelectTrigger id="country" className="w-full">
                                                                    <SelectValue placeholder="Select country" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="canada">Canada</SelectItem>
                                                                    <SelectItem value="usa">USA</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="province">Province</Label>
                                                            <Select defaultValue="ontario">
                                                                <SelectTrigger id="province" className="w-full">
                                                                    <SelectValue placeholder="Select province" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="ontario">Ontario</SelectItem>
                                                                    <SelectItem value="quebec">Quebec</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2 sm:col-span-2">
                                                            <Label htmlFor="city">City</Label>
                                                            <Input id="city" defaultValue="Mississauga" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="postal-code">Postal Code</Label>
                                                        <Input id="postal-code" defaultValue="L5L 5Y5" className="w-full sm:w-1/2 lg:w-1/4" />
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="space-y-4 rounded-lg border bg-white p-4 dark:bg-black">
                                                    <div className="flex flex-wrap items-center space-x-6">
                                                        <div className="mt-3 space-y-2">
                                                            <Label>Distance Unit</Label>
                                                            <RadioGroup defaultValue="km" className="mt-2 flex space-x-4">
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="km" id="km" />
                                                                    <Label htmlFor="km">Km</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="mi" id="mi" />
                                                                    <Label htmlFor="mi">Mi</Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                        <div className="mt-3 space-y-2">
                                                            <Label>Weight Unit</Label>
                                                            <RadioGroup defaultValue="kg" className="mt-2 flex space-x-4">
                                                                <div className="flex flex-wrap items-center space-x-2">
                                                                    <RadioGroupItem value="kg" id="kg" />
                                                                    <Label htmlFor="kg">Kg</Label>
                                                                </div>
                                                                <div className="flex flex-wrap items-center space-x-2">
                                                                    <RadioGroupItem value="lbs" id="lbs" />
                                                                    <Label htmlFor="lbs">Lbs</Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="cubed-weight">Cubed Weight Factor</Label>
                                                            <Input id="cubed-weight" defaultValue="166" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="time-offset">Time Offset</Label>
                                                            <Input id="time-offset" defaultValue="-5.0" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Required Fields</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="req-reference" />
                                                            <Label htmlFor="req-reference">Require Reference</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="req-department" />
                                                            <Label htmlFor="req-department">Require Department</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="req-weight" />
                                                            <Label htmlFor="req-weight">Require Weight</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="req-caller" />
                                                            <Label htmlFor="req-caller">Require Caller</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox id="req-pieces" />
                                                            <Label htmlFor="req-pieces">Require Pieces</Label>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="flex flex-col gap-6 lg:col-span-2">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Billing Contact</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="created-date">Created Date</Label>
                                                        <Input id="created-date" defaultValue="7/20/2021 8:28:57 PM" disabled />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="contact-name">Contact Name</Label>
                                                        <Input id="contact-name" defaultValue="Specialty House Account" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input id="email" type="email" defaultValue="1@2.com" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone</Label>
                                                        <Input id="phone" type="tel" defaultValue="416" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cell-phone">Cell Phone Number</Label>
                                                        <Input id="cell-phone" type="tel" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="fax">Fax</Label>
                                                        <Input id="fax" />
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Default Address</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="pickup">Pickup</Label>
                                                        <div className="flex gap-2">
                                                            <Input id="pickup" defaultValue="11359" />
                                                            <Button variant="outline" size="icon">
                                                                <Search className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="delivery">Delivery</Label>
                                                        <div className="flex gap-2">
                                                            <Input id="delivery" />
                                                            <Button variant="outline" size="icon">
                                                                <Search className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="Departments">
                                <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 dark:bg-zinc-950">
                                    <div>
                                        <Table className="w-full border">
                                            <TableHeader className="custom-nav-color">
                                                <TableRow>
                                                    <TableHead className="border-r border-r-white py-2">
                                                        <Button variant="outline" size="icon" onClick={() => setCreate(true)}>
                                                            <Plus />
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead className="border-r border-r-white py-2 text-white">Description</TableHead>
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
                                                            <Input />
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                <TableRow>
                                                    <TableCell colSpan={2} className="py-10 text-center">
                                                        No data to display
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
