import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopButton from '@/components/ui/TopButton';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';
import { CircleX, Minus, Plus, Save, SquarePen, SquareX, Undo } from 'lucide-react';
import { useState } from 'react';

export default function Index() {
    const [mainCreate, setMainCreate] = useState(false);
    const [create, setCreate] = useState(false);
    const [active, setActive] = useState(true);
    const [locked, setLocked] = useState(false);

    return (
        <ClientLayout>
            <Head title="My Address" />
            <TopSearch />
            <PageNav className="mt-2 py-2 text-white">
                <p className="ms-2 font-bold">My Address 1</p>
            </PageNav>
            <div>
                <Tabs defaultValue="Shipping_Address" className="mt-3">
                    <PageNav>
                        <TabsList>
                            <TabsTrigger value="Shipping_Address" className="ps-4">
                                Shipping Address
                            </TabsTrigger>
                        </TabsList>
                    </PageNav>
                    <TabsContent value="Shipping_Address">
                        <PageNav className="border bg-gray-400 py-1 dark:bg-zinc-900">
                            <p className="text-center font-bold text-white">Total Address 2</p>
                        </PageNav>
                        <div className="mx-2">
                            <Input className="mx-2 mt-2 w-5/12" placeholder="Enter text to search" />
                            <Table className="mt-3">
                                <TableHeader className="custom-nav-color">
                                    <TableRow>
                                        <TableHead className="py-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        className="bg-slate-200 text-gray-900 hover:bg-slate-300 hover:text-gray-900"
                                                        value="outline"
                                                    >
                                                        <Plus />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="my-4 max-h-[90vh] w-full max-w-full overflow-y-auto sm:my-8 sm:max-w-[425px] md:max-w-[700px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <PageNav className="mt-4 rounded p-2 text-right text-white">Edit Form</PageNav>
                                                        </DialogTitle>
                                                        <DialogDescription>Use these buttons to save or cancel.</DialogDescription>
                                                        <div className="mt-2 flex gap-2">
                                                            <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                            <DialogClose asChild>
                                                                <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                            </DialogClose>
                                                        </div>
                                                    </DialogHeader>

                                                    <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
                                                        <Card className="mx-auto w-full max-w-5xl p-4">
                                                            <CardContent className="space-y-6">
                                                                {/* Top Section */}
                                                                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <Label htmlFor="active">Active:</Label>
                                                                        <Checkbox id="active" checked={active} onCheckedChange={setActive} />
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Label htmlFor="locked">Locked:</Label>
                                                                        <Checkbox id="locked" checked={locked} onCheckedChange={setLocked} />
                                                                    </div>

                                                                    <div className="md:col-span-1">
                                                                        <Label>Name:</Label>
                                                                        <Input />
                                                                    </div>
                                                                    <div className="flex flex-col gap-4 md:col-span-1 md:flex-row">
                                                                        <div className="flex-1">
                                                                            <Label>Address Code:</Label>
                                                                            <Input />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <Label>Customer No:</Label>
                                                                            <Input />
                                                                        </div>
                                                                    </div>

                                                                    <div className="md:col-span-1">
                                                                        <Label>Close Time:</Label>
                                                                        <Input type="time" defaultValue="00:00" />
                                                                    </div>
                                                                </div>

                                                                {/* Address Section */}
                                                                <div className="space-y-3">
                                                                    {['Street 1', 'Street 2', 'Street 3', 'Street 4'].map((label, idx) => (
                                                                        <div key={idx}>
                                                                            <Label>{label}:</Label>
                                                                            <Input />
                                                                        </div>
                                                                    ))}

                                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                                        <div>
                                                                            <Label>Country:</Label>
                                                                            <Select>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Select country" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                                                                    <SelectItem value="usa">USA</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                        <div>
                                                                            <Label>Province:</Label>
                                                                            <Select>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Select province" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="dhaka">Dhaka</SelectItem>
                                                                                    <SelectItem value="ctg">Chittagong</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                                        <div>
                                                                            <Label>City:</Label>
                                                                            <Input />
                                                                        </div>
                                                                        <div>
                                                                            <Label>Postal Code:</Label>
                                                                            <Input />
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <Label>Instructions:</Label>
                                                                        <Textarea rows={3} />
                                                                    </div>
                                                                </div>

                                                                {/* Contact Section */}
                                                                <div>
                                                                    <div className="mb-2 text-sm font-semibold">Contact</div>
                                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                                                        <div>
                                                                            <Label>Name:</Label>
                                                                            <Input />
                                                                        </div>
                                                                        <div>
                                                                            <Label>Email:</Label>
                                                                            <Input />
                                                                        </div>
                                                                        <div>
                                                                            <Label>Phone:</Label>
                                                                            <Input />
                                                                        </div>
                                                                        <div>
                                                                            <Label>Fax:</Label>
                                                                            <Input />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Footer */}
                                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                                                    <div>
                                                                        <Label>Created By:</Label>
                                                                        <Input disabled />
                                                                    </div>
                                                                    <div>
                                                                        <Label>Date:</Label>
                                                                        <Input disabled />
                                                                    </div>
                                                                    <div>
                                                                        <Label>Updated By:</Label>
                                                                        <Input disabled />
                                                                    </div>
                                                                    <div>
                                                                        <Label>Date:</Label>
                                                                        <Input disabled />
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableHead>
                                        <TableHead className="py-2 text-white">Name</TableHead>
                                        <TableHead className="py-2 text-white">Customer Number</TableHead>
                                        <TableHead className="py-2 text-white">Address Code</TableHead>
                                        <TableHead className="py-2 text-white">Strate 1</TableHead>
                                        <TableHead className="py-2 text-white">Strate 2</TableHead>
                                        <TableHead className="py-2 text-white">City</TableHead>
                                        <TableHead className="py-2 text-white">Province</TableHead>
                                        <TableHead className="py-2 text-white">Country</TableHead>
                                        <TableHead className="py-2 text-white">Contact Phone</TableHead>
                                        <TableHead className="py-2 text-white">Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border">
                                        <TableCell>
                                            <div className="flex flex-wrap gap-2">
                                                <Button type="button" variant="outline" size="icon" onClick={() => setMainCreate(!mainCreate)}>
                                                    {mainCreate == false ? <Plus /> : <Minus />}
                                                </Button>
                                                <Button type="button" variant="outline" size="icon">
                                                    <SquarePen />
                                                </Button>
                                                <Button type="button" variant="outline" size="icon" className="text-red-500">
                                                    <SquareX />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>1000 - LOBLAW PHARMACY</TableCell>
                                        <TableCell>1000</TableCell>
                                        <TableCell>2H 060</TableCell>
                                        <TableCell>585 QUEEN ST. WEST</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>TORONTO</TableCell>
                                        <TableCell>ONTARIO</TableCell>
                                        <TableCell>Canada</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <Checkbox defaultChecked />
                                        </TableCell>
                                    </TableRow>
                                    {mainCreate && (
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <Table className="border">
                                                    <TableHeader className="custom-nav-color">
                                                        <TableRow>
                                                            <TableHead className="py-2">
                                                                <Button variant="outline" size="icon" onClick={() => setCreate(true)}>
                                                                    <Plus />
                                                                </Button>
                                                            </TableHead>
                                                            <TableHead className="text-white">Name</TableHead>
                                                            <TableHead className="text-white">Email</TableHead>
                                                            <TableHead className="text-white">Phone</TableHead>
                                                            <TableHead className="text-white">Fax</TableHead>
                                                            <TableHead className="text-white">Default</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {create ? (
                                                            <>
                                                                <TableRow>
                                                                    <TableCell className="border">
                                                                        <div className="flex gap-2">
                                                                            <Button type="button" variant="outline">
                                                                                <Save className="h-4 w-4 cursor-pointer" />
                                                                            </Button>
                                                                            <Button type="button" variant="outline" onClick={() => setCreate(false)}>
                                                                                <Undo className="h-4 w-4 cursor-pointer" />
                                                                            </Button>
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
                                                                        <Checkbox />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={6} className="py-14 text-center">
                                                                    No data to display
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ClientLayout>
    );
}
