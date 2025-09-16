import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Undo2 } from 'lucide-react';
import { useState } from 'react';

export default function CreateProvincialTaxed() {
    const [createdDate, setCreatedDate] = useState();
    const [lastUpdatedDate, setLastUpdatedDate] = useState();
    const [openCreated, setOpenCreated] = useState(false);
    const [openUpdated, setOpenUpdated] = useState(false);

    return (
        <TenantLayout>
            <Head title="Create Provincial Taxe" />
            <TopSearch className="mb-2" />
            <PageNav>
                <span className="ms-5 font-bold text-white">Create Provincial Taxe</span>
            </PageNav>
            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button variant="outline" asChild>
                        <Link href={route('tenant.application.settings.provincial.taxes')} className="inline-flex items-center">
                            <Undo2 className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
                <div className="rounded border p-4">
                    <div className="mb-8 grid grid-cols-2 gap-4">
                        <div>
                            <Label>Province/State</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Alternate Name 1</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Alternate Name 2</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Federal Tax</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Federal Tax" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GST">GST</SelectItem>
                                    <SelectItem value="PST">PST</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Provincial Tax</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Provincial Tax" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GST">GST</SelectItem>
                                    <SelectItem value="PST">PST</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Auto Fill</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Auto Fill" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">True</SelectItem>
                                    <SelectItem value="false">False</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Created Date</Label>
                            <Popover open={openCreated} onOpenChange={setOpenCreated}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        {createdDate ? format(createdDate, 'dd-MM-yyyy') : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={createdDate}
                                        onSelect={(date) => {
                                            setCreatedDate(date);
                                            setOpenCreated(false);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label>Created By ID</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Last Updated Date</Label>
                            <Popover open={openUpdated} onOpenChange={setOpenUpdated}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        {lastUpdatedDate ? format(lastUpdatedDate, 'dd-MM-yyyy') : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={lastUpdatedDate}
                                        onSelect={(date) => {
                                            setLastUpdatedDate(date);
                                            setOpenUpdated(false);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label>Last Updated By ID</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Is Deleted</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">True</SelectItem>
                                    <SelectItem value="false">False</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button>Save</Button>
                        <Button variant="outline">Change Log</Button>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
