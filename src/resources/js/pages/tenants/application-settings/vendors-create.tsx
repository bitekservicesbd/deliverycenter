import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopButton from '@/components/ui/TopButton';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Save, SquareX } from 'lucide-react';

export default function DataTable() {
    return (
        <TenantLayout>
            <Head title="Vendor Add/Edit" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-white">Vendor Add/Edit</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="my-2"></div>
                    <div className="rounded-md border">
                        <div className="mt-3 flex flex-wrap items-center gap-2 p-3 md:mt-0">
                            <TopButton icon={Save} label="Save & Close" onClick={() => {}} />
                            <TopButton icon={Save} label="Save" onClick={() => {}} />
                            <TopButton icon={SquareX} label="Delete" onClick={() => {}} />
                            <TopButton icon={SquareX} label="Close" onClick={() => {}} />
                        </div>
                        <div className="ms-4">
                            <Tabs defaultValue="Details">
                                <PageNav>
                                    <TabsList>
                                        <TabsTrigger value="Details">Details</TabsTrigger>
                                    </TabsList>
                                </PageNav>
                                <TabsContent value="Details">
                                    <div className="bg-muted/20 space-y-4 rounded-md border p-4">
                                        {/* Top Row */}
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Checkbox id="active" defaultChecked />
                                                <Label htmlFor="active">Active</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="vendorId" className="whitespace-nowrap">
                                                    Vendor ID
                                                </Label>
                                                <Input id="vendorId" className="w-20" defaultValue="1" />
                                            </div>
                                            <div className="flex flex-1 items-center gap-2">
                                                <Label htmlFor="name" className="whitespace-nowrap">
                                                    Name<span className="text-red-500">*</span>
                                                </Label>
                                                <Input id="name" className="flex-1" />
                                            </div>
                                        </div>

                                        {/* Middle Section */}
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            {/* Contact Section */}
                                            <div className="space-y-2 rounded-md border bg-white p-3">
                                                <div className="text-sm font-semibold">Contact</div>
                                                <div>
                                                    <Label>Name</Label>
                                                    <Input />
                                                </div>
                                                <div>
                                                    <Label>Email</Label>
                                                    <Input type="email" />
                                                </div>
                                                <div>
                                                    <Label>Phone</Label>
                                                    <Input placeholder="+1 (___) ___-____" />
                                                </div>
                                                <div>
                                                    <Label>Fax</Label>
                                                    <Input />
                                                </div>
                                            </div>

                                            {/* Mailing Address Section */}
                                            <div className="space-y-2 rounded-md border bg-white p-3">
                                                <div className="text-sm font-semibold">Mailing Address</div>
                                                <div>
                                                    <Label>Street 1</Label>
                                                    <Input />
                                                </div>
                                                <div>
                                                    <Label>Street 2</Label>
                                                    <Input />
                                                </div>
                                                <div>
                                                    <Label>Country</Label>
                                                    <Select defaultValue="Canada">
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Canada">Canada</SelectItem>
                                                            <SelectItem value="USA">USA</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <Label>Province</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="ON">Ontario</SelectItem>
                                                                <SelectItem value="BC">British Columbia</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label>Postal</Label>
                                                        <Input />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>City</Label>
                                                    <Input />
                                                </div>
                                            </div>

                                            {/* Notes Section */}
                                            <div className="rounded-md border bg-white p-3">
                                                <Label>Note</Label>
                                                <Textarea className="h-full min-h-[150px]" />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
