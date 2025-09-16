import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopButton from '@/components/ui/TopButton';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { ChevronDownIcon, CircleX, Eye, EyeOff, FilePlus, Save, SquareX, Undo, Undo2 } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

export default function Index() {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const [end_open, end_setOpen] = React.useState(false);
    const [end_date, end_setDate] = React.useState<Date | undefined>(undefined);

    const [review_expire_open, review_expire_setOpen] = React.useState(false);
    const [review_expire_date, review_expire_setDate] = React.useState<Date | undefined>(undefined);

    const [driver_license_expire_open, driver_license_expire_setOpen] = React.useState(false);
    const [driver_license_expire_date, driver_license_expire_setDate] = React.useState<Date | undefined>(undefined);

    const [dob_open, dob_setOpen] = React.useState(false);
    const [dob_date, dob_setDate] = React.useState<Date | undefined>(undefined);

    const [insurance_expiry_open, insurance_expiry_setOpen] = React.useState(false);
    const [insurance_expiry_date, insurance_expiry_setDate] = React.useState<Date | undefined>(undefined);

    const [certificate_issued_on_open, certificate_issued_on_setOpen] = React.useState(false);
    const [certificate_issued_on_date, certificate_issued_on_setDate] = React.useState<Date | undefined>(undefined);

    const [certificate_expire_on_open, certificate_expire_on_setOpen] = React.useState(false);
    const [certificate_expire_on_date, certificate_expire_on_setDate] = React.useState<Date | undefined>(undefined);

    const [pickupAddOpen, setPickupAddOpen] = useState(false);
    const [DeliveryAddOpen, setDeliveryAddOpen] = useState(false);
    const [GuaranteedOpen, setGuaranteedOpen] = useState(false);
    const [BannedCustomerOpen, setBannedCustomerOpen] = useState(false);

    const [deductions_open, setDeductions_Open] = React.useState(false);
    const [deductions_date, set_Deductions_Date] = React.useState<Date | undefined>(undefined);

    const [deductions_end_open, setDeductions_end_Open] = React.useState(false);
    const [deductions_end_date, set_Deductions_end_Date] = React.useState<Date | undefined>(undefined);

    // Define the frequency options with their descriptions
    const frequencies = [
        { id: 'daily', label: 'Daily', description: 'Once Every Day' },
        { id: 'weekly', label: 'Weekly', description: 'Every Monday starting from the start date' },
        { id: 'bimonthly', label: 'BiMonthly', description: 'On 1st and 15th of every month' },
        { id: 'monthly', label: 'Monthly', description: 'On the 1st of every month' },
        { id: 'every-pay', label: 'Every Pay', description: 'Each time the carrier settlements are executed' },
        { id: 'one-time', label: 'One Time', description: 'Once starting from the start date' },
    ];

    const permissions = [
        'Allow Portal Access',
        'Allow Loads Management',
        'Allow Attachments',
        'Allow Settlements',
        'Allow Pricing',
        'Allow Download Manifest',
        'Allow Arrived PU',
        'Allow Picked Up',
        'Allow Un Picked Up',
        'Allow Arrived DEL',
        'Allow Delivered',
        'Allow Un Delivered',
    ];

    const half = Math.ceil(permissions.length / 2);
    const firstColumn = permissions.slice(0, half);
    const secondColumn = permissions.slice(half);

    // alert
    const alertGroups = [
        [
            'Allow Old Icons',
            'Allow Navigate To',
            'Allow Reject',
            'Allow Wait Time',
            'Allow Arrival Time',
            'Allow Gps Check',
            'Allow Return Order Consignee',
            'Allow Background Location',
            'Allow Small Signature',
            'Allow Driver Status',
            'Allow Manual Load Selection',
            'Allow Cropping',
        ],
        [
            'Allow Driver Name',
            'Allow Delivery Refused',
            'Allow Transfer',
            'Allow Notes',
            'Allow Return Order Prompt',
            'Allow Print Receipt',
            'Allow Attachment',
            'Allow New Menu Order',
            'Allow Delivery Attachment',
            'Allow Scan Barcode',
            'Expand Tabs Automatically',
            'Allow Take Over Load',
        ],
        [
            'Allow Signatureonpickup',
            'Allow Return Order',
            'Allow Pcs Weight',
            'Allow Reports',
            'Allow Confirmations',
            'Allow Return Order Waybill',
            'Allow Location',
            'Allow All Loads Without Status Folders',
            'Allow Delivered',
            'Allow Select All Loads',
            'Allow Modify Tailgate',
            'Allow Create Load From Load Scan',
        ],
    ];

    const defaultChecked = [
        'Allow Navigate To',
        'Allow Wait Time',
        'Allow Arrival Time',
        'Allow Gps Check',
        'Allow Small Signature',
        'Allow Driver Status',
        'Allow Driver Name',
        'Allow Delivery Refused',
        'Allow Notes',
        'Allow Attachment',
        'Allow New Menu Order',
        'Allow Delivery Attachment',
        'Allow Scan Barcode',
        'Allow Pcs Weight',
        'Allow Return Order Waybill',
        'Allow Location',
        'Allow Delivered',
    ];

    return (
        <TenantLayout>
            <Head title="Add Carrier" />
            {/* top bar */}
            <div>
                <TopSearch />
                <PageNav className="mt-3 py-2">
                    <span className="ms-5 font-bold text-white">Add Carrier</span>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div className="mx-2 mb-3">
                <div className="mt-3 flex gap-2 md:mt-0">
                    <TopButton icon={Save} label="Save & Close" onClick={() => {}} />
                    <TopButton icon={Save} label="Save" onClick={() => {}} />
                    <TopButton icon={SquareX} label="Close" onClick={() => {}} />
                </div>
            </div>

            <div className="mx-2">
                <Tabs defaultValue="Details">
                    <PageNav>
                        <TabsList>
                            <TabsTrigger value="Details">Details</TabsTrigger>
                            <TabsTrigger value="Contacts">Contacts</TabsTrigger>
                            <TabsTrigger value="Zone">Zone</TabsTrigger>
                            <TabsTrigger value="Guaranteed-Zone-Rates">Guaranteed Zone Rates</TabsTrigger>
                            <TabsTrigger value="Customer-Ban">Customer Ban</TabsTrigger>
                            <TabsTrigger value="Settlements">Settlements</TabsTrigger>
                            <TabsTrigger value="Files">Files</TabsTrigger>
                            <TabsTrigger value="EDI-Settings">EDI Settings</TabsTrigger>
                            <TabsTrigger value="APIs">APIs</TabsTrigger>
                            <TabsTrigger value="Deductions">Deductions</TabsTrigger>
                            <TabsTrigger value="HandHeld">HandHeld</TabsTrigger>
                            <TabsTrigger value="Carrier-Portal-Settings">Carrier Portal Settings</TabsTrigger>
                            <TabsTrigger value="Notes">Notes</TabsTrigger>
                            <TabsTrigger value="Audit">Audit</TabsTrigger>
                        </TabsList>
                    </PageNav>
                    <TabsContent value="Details">
                        <div>
                            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-zinc-800">
                                <div className="">
                                    {/* Main Form Grid */}
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        <div className="flex flex-col gap-6">
                                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                                <div className="flex flex-col gap-6">
                                                    {/* Top Header Section */}

                                                    <div className="flex items-center gap-2">
                                                        <Label>Company</Label>
                                                        <Select defaultValue="SPECIALTY LOGISTIC">
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="SPECIALTY LOGISTIC">SPECIALTY LOGISTIC</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Label>Works Status *</Label>
                                                        <Select defaultValue="Working">
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="OFF">OFF</SelectItem>
                                                                <SelectItem value="Working">Working</SelectItem>
                                                                <SelectItem value="Standby">Standby</SelectItem>
                                                                <SelectItem value="Lunch">Lunch</SelectItem>
                                                                <SelectItem value="Broken Dwon">Broken Dwon</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="ms-5 flex flex-col gap-6 ps-10">
                                                    <div className="mt-3 flex gap-2">
                                                        <Checkbox id="bookmark" />
                                                        <Label htmlFor="bookmark">Bookmark</Label>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Checkbox id="locked" />
                                                        <Label htmlFor="locked">Locked</Label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-6"></div>
                                        {/* Left Column */}
                                        <div className="flex flex-col gap-6">
                                            {/* Carrier / Driver Section */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Carrier / Driver</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label htmlFor="driver-name">Name*</Label>
                                                        <Input id="driver-name" />
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label htmlFor="contact-name">Contact Name*</Label>
                                                        <Input id="contact-name" />
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label>Street 1</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label>Street 2</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Country</Label>
                                                        <Select defaultValue="canada">
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="canada">Canada</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Province</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                                                                <SelectItem value="Rangpur">Rangpur</SelectItem>
                                                                <SelectItem value="Khulna">Khulna</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>City</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Postal</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Phone</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Email</Label>
                                                        <Input type="email" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Cell</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Fax</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Start Date</Label>
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="date-picker"
                                                                    className="w-full justify-between font-normal"
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
                                                    <div className="grid gap-2">
                                                        <Label>End Date</Label>
                                                        <Popover open={end_open} onOpenChange={end_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="end-date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {end_date ? end_date.toLocaleDateString() : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={end_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        end_setDate(date);
                                                                        end_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>License Class</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Review Expiry</Label>
                                                        <Popover open={review_expire_open} onOpenChange={review_expire_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="review-expire-date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {review_expire_date ? review_expire_date.toLocaleDateString() : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={review_expire_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        review_expire_setDate(date);
                                                                        review_expire_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Driver License Expiry</Label>
                                                        <Popover open={driver_license_expire_open} onOpenChange={driver_license_expire_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="driver-license-expire-date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {driver_license_expire_date
                                                                        ? driver_license_expire_date.toLocaleDateString()
                                                                        : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={driver_license_expire_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        driver_license_expire_setDate(date);
                                                                        end_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>SIN Number</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Date Of Birth</Label>
                                                        <Popover open={dob_open} onOpenChange={dob_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="dob-date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {dob_date ? dob_date.toLocaleDateString() : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={dob_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        dob_setDate(date);
                                                                        end_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Setup Section */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Setup</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div className="grid gap-2">
                                                        <Label>Carrier Type*</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Carrier Type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Agent">Agent</SelectItem>
                                                                <SelectItem value="Broker">Broker</SelectItem>
                                                                <SelectItem value="Employee">Employee</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="relative grid gap-2">
                                                        <Label>Driver App Password</Label>
                                                        <Input type={passwordVisible ? 'text' : 'password'} defaultValue="adfsdfds" />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-6 right-1 h-7 w-7"
                                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                                        >
                                                            {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Driver App Login</Label>
                                                        <Input defaultValue="51" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Carrier Code</Label>
                                                        <Input defaultValue="51" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Handheld Phone</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Handheld EMail</Label>
                                                        <Input />
                                                    </div>

                                                    <div className="grid gap-2 md:col-span-2">
                                                        <Label>Installed Version</Label>
                                                        <Input />
                                                    </div>

                                                    <RadioGroup defaultValue="vai-text">
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem value="vai-text" id="vai-text" />
                                                            <Label htmlFor="vai-text">Send Dispatch Alerts Via Text</Label>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem value="via-email" id="via-email" />
                                                            <Label htmlFor="via-email">Send Dispatch Alerts Via Email</Label>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <RadioGroupItem value="via-push" id="via-push" />
                                                            <Label htmlFor="via-push">Send Dispatch Alerts Via Push</Label>
                                                        </div>
                                                    </RadioGroup>

                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="send-settlements" />
                                                        <Label htmlFor="send-settlements">Send Settlements Via Email</Label>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Distance Type</Label>
                                                        <RadioGroup defaultValue="km" className="flex gap-4">
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
                                                    <div className="grid gap-2">
                                                        <Label>Weight type</Label>
                                                        <RadioGroup defaultValue="kg" className="flex gap-4">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="kg" id="kg" />
                                                                <Label htmlFor="kg">Kg</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="lbs" id="lbs" />
                                                                <Label htmlFor="lbs">Lbs</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Cubed Weight Factor</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Time Offset</Label>
                                                        <Input defaultValue="0.0" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Right Column */}
                                        <div className="flex flex-col gap-6">
                                            {/* Vehicle Section */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Vehicle</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="scan-asset" />
                                                        <Label htmlFor="scan-asset">Require scan asset during login?</Label>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div className="grid gap-2">
                                                            <Label>Ownership</Label>
                                                            <Select>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue defaultValue="Company-Owned" placeholder="Ownership" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Company-Owned">Company Owned</SelectItem>
                                                                    <SelectItem value="Driver-Owned">Driver Owned</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Asset</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Type</Label>
                                                            <Select>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Truck">Truck</SelectItem>
                                                                    <SelectItem value="Trailer">Trailer</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Year</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Make</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Model</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>License Plate</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Insurance Company</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Insurance No</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Insurance Expiry</Label>
                                                            <Popover open={insurance_expiry_open} onOpenChange={insurance_expiry_setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="insurance_expiry_date-picker"
                                                                        className="w-full justify-between font-normal"
                                                                    >
                                                                        {insurance_expiry_date
                                                                            ? insurance_expiry_date.toLocaleDateString()
                                                                            : 'Select date'}
                                                                        <ChevronDownIcon />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={insurance_expiry_date}
                                                                        captionLayout="dropdown"
                                                                        onSelect={(date) => {
                                                                            insurance_expiry_setDate(date);
                                                                            insurance_expiry_setOpen(false);
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <div className="flex items-center space-x-2">
                                                                <Checkbox id="has-tailgate" />
                                                                <Label htmlFor="has-tailgate">Has Tailgate</Label>
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Max Cargo Length</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Max Skid Spots</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Max Cargo Width</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Max Cargo Weight</Label>
                                                            <Input />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Max Cargo Height</Label>
                                                            <Input />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Dangerous Goods Section */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Dangerous Goods / Hazmat Certificate</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="flex items-center space-x-2 md:col-span-2">
                                                        <Checkbox id="has-certificate" />
                                                        <Label htmlFor="has-certificate">Carrier has certificate</Label>
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label>Issued On</Label>
                                                        <Popover open={certificate_issued_on_open} onOpenChange={certificate_issued_on_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="certificate_issued_on_date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {certificate_issued_on_date
                                                                        ? certificate_issued_on_date.toLocaleDateString()
                                                                        : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={certificate_issued_on_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        certificate_issued_on_setDate(date);
                                                                        certificate_issued_on_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Expires On</Label>
                                                        <Popover open={certificate_expire_on_open} onOpenChange={certificate_expire_on_setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    id="certificate_expire_on_date-picker"
                                                                    className="w-full justify-between font-normal"
                                                                >
                                                                    {certificate_expire_on_date
                                                                        ? certificate_expire_on_date.toLocaleDateString()
                                                                        : 'Select date'}
                                                                    <ChevronDownIcon />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={certificate_expire_on_date}
                                                                    captionLayout="dropdown"
                                                                    onSelect={(date) => {
                                                                        certificate_expire_on_setDate(date);
                                                                        certificate_expire_on_setOpen(false);
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    <div className="flex items-center space-x-2 pt-6">
                                                        <Checkbox id="has-temp-control" />
                                                        <Label htmlFor="has-temp-control">Has Temp Control</Label>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Billing Details Section */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Billing Details</CardTitle>
                                                </CardHeader>
                                                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="grid gap-2">
                                                        <Label>Billing ID</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Currency</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Currency" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="USD">USD</SelectItem>
                                                                <SelectItem value="EUR">EUR</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Commission Plan</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Tax Number1</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Tax Number2</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Default Payment Method</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Default Payment Method" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Cash">Cash</SelectItem>
                                                                <SelectItem value="Check">Check</SelectItem>
                                                                <SelectItem value="Electronic Fund Transfer">Electronic Fund Transfer</SelectItem>
                                                                <SelectItem value="Credit Card">Credit Card</SelectItem>
                                                                <SelectItem value="e-Transfer">e-Transfer</SelectItem>
                                                                <SelectItem value="Wire">Wire</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Settlement Format</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Settlement Format" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Summary">Summary</SelectItem>
                                                                <SelectItem value="Basic">Basic</SelectItem>
                                                                <SelectItem value="Detailed">Detailed</SelectItem>
                                                                <SelectItem value="Detailed /w Clint $">Detailed /w Clint $</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Payment Name</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Payment Tax</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Payment Tax" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="GTS">GTS</SelectItem>
                                                                <SelectItem value="HTS 13%">HTS 13%</SelectItem>
                                                                <SelectItem value="PTS">PTS</SelectItem>
                                                                <SelectItem value="QTS">QTS</SelectItem>
                                                                <SelectItem value="HTS 15%">HTS 15%</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Address</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>City</Label>
                                                        <Input />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Province</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Province" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Alberta">Alberta</SelectItem>
                                                                <SelectItem value="British Columbia">British Columbia</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Country</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Country" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Canada">Canada</SelectItem>
                                                                <SelectItem value="United States">United States</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Contacts">
                        <div className="overflow-y-scroll border pb-32">
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2 ps-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                                        <FilePlus />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <div className="flex gap-2">
                                                                <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                                <DialogClose asChild>
                                                                    <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                                </DialogClose>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-3">
                                                            <Checkbox id="active" />
                                                            <Label htmlFor="active">Active</Label>
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="name">Name</Label>
                                                            <Input id="name" name="name" defaultValue="" />
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="email">Email</Label>
                                                            <Input id="email" name="username" defaultValue="" />
                                                        </div>
                                                    </div>
                                                    <div className="border p-5">
                                                        <p className="mb-2 font-bold">Phone Numbers</p>
                                                        <div className="grid gap-3">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="Primary">Primary</Label>
                                                                <Input id="Primary" name="Primary" defaultValue="" />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="fax">Fax</Label>
                                                                <Input id="fax" name="fax" defaultValue="" />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="mobile">Mobile</Label>
                                                                <Input id="mobile" name="mobile" defaultValue="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border p-5">
                                                        <p className="mb-2 font-bold">Alerts</p>
                                                        <div className="grid gap-3">
                                                            <div className="flex gap-3">
                                                                <Checkbox id="dispatch-alerts-via-text" />
                                                                <Label htmlFor="dispatch-alerts-via-text">Send Dispatch Alerts Via Text:</Label>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <Checkbox id="dispatch-alerts-via-email" />
                                                                <Label htmlFor="dispatch-alerts-via-email">Send Dispatch Alerts Via Email:</Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <DialogFooter></DialogFooter> */}
                                                </DialogContent>
                                            </Dialog>
                                        </th>
                                        <th className="py-2">Name</th>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Phone</th>
                                        <th className="py-2">Fax</th>
                                        <th className="py-2">Mobile</th>
                                        <th className="py-2 pe-2">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="Zone">
                        {/* Divide in two columns on medium screens and above */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <p className="mb-3 font-bold">Pickup</p>
                                <div>
                                    <div className="overflow-y-scroll border pb-32">
                                        <table className="w-full">
                                            <thead className="custom-nav-color text-white">
                                                <tr>
                                                    <th className="py-2 ps-2">
                                                        <Button
                                                            className="bg-sky-900 px-3 text-white hover:bg-sky-950"
                                                            onClick={() => setPickupAddOpen(true)}
                                                        >
                                                            <FilePlus />
                                                        </Button>
                                                    </th>
                                                    <th className="py-2">Dispatch Zone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`border ${pickupAddOpen ? '' : 'hidden'}`}>
                                                    <td className="text-center">
                                                        <Button onClick={() => setPickupAddOpen(false)}>
                                                            <Undo2 />
                                                        </Button>
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </td>
                                                </tr>
                                                <tr className={pickupAddOpen == false ? '' : 'hidden'}>
                                                    <td colSpan={2} className="border-b py-2 text-center">
                                                        No data to display
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3">
                                <p className="mb-3 font-bold">Delivery</p>
                                <div>
                                    <div className="overflow-y-scroll border pb-32">
                                        <table className="w-full">
                                            <thead className="custom-nav-color text-white">
                                                <tr>
                                                    <th className="py-2 ps-2">
                                                        <Button
                                                            className="bg-sky-900 px-3 text-white hover:bg-sky-950"
                                                            onClick={() => setDeliveryAddOpen(true)}
                                                        >
                                                            <FilePlus />
                                                        </Button>
                                                    </th>
                                                    <th className="py-2">Dispatch Zone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`border ${DeliveryAddOpen ? '' : 'hidden'}`}>
                                                    <td className="text-center">
                                                        <Button onClick={() => setDeliveryAddOpen(false)}>
                                                            <Undo2 />
                                                        </Button>
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </td>
                                                </tr>
                                                <tr className={DeliveryAddOpen == false ? '' : 'hidden'}>
                                                    <td colSpan={2} className="border-b py-2 text-center">
                                                        No data to display
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Guaranteed-Zone-Rates">
                        {/* Divide in two columns on medium screens and above */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <div>
                                    <div className="overflow-y-scroll border pb-32">
                                        <table className="w-full">
                                            <thead className="custom-nav-color text-white">
                                                <tr>
                                                    <th className="py-2 ps-2">
                                                        <Button
                                                            className="bg-sky-900 px-3 text-white hover:bg-sky-950"
                                                            onClick={() => setGuaranteedOpen(true)}
                                                        >
                                                            <FilePlus />
                                                        </Button>
                                                    </th>
                                                    <th className="py-2">Carrier Payment Zone</th>
                                                    <th className="py-2">Daily Guarantee Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`border ${GuaranteedOpen ? '' : 'hidden'}`}>
                                                    <td className="mx-1 text-center">
                                                        <Button onClick={() => setGuaranteedOpen(false)}>
                                                            <Undo2 />
                                                        </Button>
                                                    </td>
                                                    <td className="mx-1 py-2 text-center">
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </td>
                                                    <td className="mx-1">
                                                        <Input type="text" className="w-full" />
                                                    </td>
                                                </tr>
                                                <tr className={GuaranteedOpen == false ? '' : 'hidden'}>
                                                    <td colSpan={3} className="border-b py-2 text-center">
                                                        No data to display
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3"></div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Customer-Ban">
                        {/* Divide in two columns on medium screens and above */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <div>
                                    <p className="mb-3 font-bold">Banned Customers</p>

                                    <div className="overflow-y-scroll border pb-32">
                                        <table className="w-full">
                                            <thead className="custom-nav-color text-white">
                                                <tr>
                                                    <th className="py-2 ps-2">
                                                        <Button
                                                            className="bg-sky-900 px-3 text-white hover:bg-sky-950"
                                                            onClick={() => setBannedCustomerOpen(true)}
                                                        >
                                                            <FilePlus />
                                                        </Button>
                                                    </th>
                                                    <th className="py-2">Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={`border ${BannedCustomerOpen ? '' : 'hidden'}`}>
                                                    <td className="mx-1 text-center">
                                                        <Button onClick={() => setBannedCustomerOpen(false)}>
                                                            <Undo2 />
                                                        </Button>
                                                    </td>
                                                    <td className="mx-1 py-2 text-center">
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </td>
                                                </tr>
                                                <tr className={BannedCustomerOpen == false ? '' : 'hidden'}>
                                                    <td colSpan={2} className="border-b py-2 text-center">
                                                        No data to display
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3"></div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Settlements">
                        <div className="overflow-y-scroll border pb-32">
                            <div className="mb-2 flex gap-2">
                                <Button className="bg-sky-900 text-white">Clear Selection</Button>
                                <Button className="bg-sky-900 text-white">
                                    <Undo /> Resend Settlements
                                </Button>
                            </div>
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2 ps-2">Select</th>
                                        <th className="py-2">Number</th>
                                        <th className="py-2">Batch Number</th>
                                        <th className="py-2">Amount</th>
                                        <th className="py-2">Tax Amount</th>
                                        <th className="py-2">Total Amount</th>
                                        <th className="py-2 pe-2">Memo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="Files">
                        <div>
                            <div className="overflow-y-scroll border pb-32">
                                <table className="w-full">
                                    <thead className="custom-nav-color text-white">
                                        <tr>
                                            <th className="py-2 ps-2">Action</th>
                                            <th className="py-2">Document Type</th>
                                            <th className="py-2">Reference</th>
                                            <th className="py-2">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className="border-b py-2 text-center">
                                                No data to display
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/3">
                                    <div className="mt-4 flex w-full max-w-sm items-center gap-2">
                                        <Label className="w-2/4">Document Type:</Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Insurance">Insurance</SelectItem>
                                                    <SelectItem value="License">License</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="mt-5 flex">
                                        <div className="relative w-full">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="rounded-s-gray-100 rounded-s-2 z-20 block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                                                placeholder="Select multiple files"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Upload File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="EDI-Settings">
                        <div>
                            <div className="space-y-6 p-4">
                                <Card>
                                    <CardContent className="space-y-4 p-4">
                                        <Label>Transactions (Peer ISA)</Label>
                                        <RadioGroup defaultValue="204" className="flex gap-6">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="204" id="r1" />
                                                <Label htmlFor="r1">EDI 204</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="211" id="r2" />
                                                <Label htmlFor="r2">EDI 211</Label>
                                            </div>
                                        </RadioGroup>
                                        <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                                            {['A3', 'A7', 'AF', 'AG', 'D1', 'SD', '997', '210'].map((code) => (
                                                <div className="flex items-center gap-2" key={code}>
                                                    <Checkbox id={code} />
                                                    <Label htmlFor={code}>{`EDI 214 ${code}`}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {['Local', 'Peer'].map((type) => (
                                        <Card key={type}>
                                            <CardContent className="space-y-2 p-4">
                                                <Label>Interchange ({type} ISA)</Label>
                                                {[
                                                    'Interchange Control Standards Identifier',
                                                    'Interchange Control Version Number',
                                                    'Test Indicator',
                                                    'Sub element Separator',
                                                    'Segment Separator',
                                                    'Authorization Information Qualifier',
                                                    'Authorization Information',
                                                    'Security Information Qualifier',
                                                    'Security Information',
                                                    'Interchange ID Qualifier',
                                                    'Interchange ID',
                                                ].map((label, i) => (
                                                    <div key={i}>
                                                        <Label>{label}</Label>
                                                        <Input />
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {['Local', 'Peer'].map((type) => (
                                        <Card key={type}>
                                            <CardContent className="space-y-2 p-4">
                                                <Label>FTP ({type} ISA)</Label>
                                                {['FTP Server', 'FTP Login', 'FTP Password', 'FTP Folder'].map((label, i) => (
                                                    <div key={i}>
                                                        <Label>{label}</Label>
                                                        <Input type={label.toLowerCase().includes('password') ? 'password' : 'text'} />
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {['Local', 'Peer'].map((type) => (
                                        <Card key={type}>
                                            <CardContent className="space-y-2 p-4">
                                                <Label>Files ({type} ISA)</Label>
                                                <div>
                                                    <Label>Incoming File</Label>
                                                    <Input type="file" />
                                                </div>
                                                <div>
                                                    <Label>Outgoing File</Label>
                                                    <Input type="file" />
                                                </div>
                                                <div>
                                                    <Label>File Extension (In Folder)</Label>
                                                    <Input />
                                                </div>
                                                <div>
                                                    <Label>File Extension (Out Folder)</Label>
                                                    <Input />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="APIs">
                        <div className="overflow-y-scroll border pb-32">
                            <div className="my-2 ms-1 flex w-full max-w-sm items-center">
                                <Input type="text" placeholder="Search" />
                                <Button type="button" variant="outline">
                                    Search
                                </Button>
                            </div>
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2 ps-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                                        <FilePlus />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <div className="flex gap-2">
                                                                <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                                <DialogClose asChild>
                                                                    <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                                </DialogClose>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="border p-5">
                                                        <p className="mb-2 font-bold">API Settings</p>
                                                        <div className="grid gap-3">
                                                            <div className="flex w-full max-w-sm items-center gap-2">
                                                                <Label className="w-1/4">API Type:</Label>
                                                                <Select>
                                                                    <SelectTrigger className="w-3/4">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value="Handheld">Handheld</SelectItem>
                                                                            <SelectItem value="Shopify">Shopify</SelectItem>
                                                                            <SelectItem value="location">location</SelectItem>
                                                                            <SelectItem value="rlocation">rlocation</SelectItem>
                                                                            <SelectItem value="Password SMS Gateway">Password SMS Gateway</SelectItem>
                                                                            <SelectItem value="Courier Complete">Courier Complete</SelectItem>
                                                                            <SelectItem value="Canpar">Canpar</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 flex">
                                                            <Label className="w-1/4" htmlFor="url-endpoint">
                                                                URL Endpoint:{' '}
                                                            </Label>
                                                            <Textarea className="w-3/4" id="url-endpoint" name="url-endpoint" defaultValue="" />
                                                        </div>
                                                        <div className="mt-3 flex">
                                                            <Label className="w-1/4" htmlFor="login">
                                                                Login:{' '}
                                                            </Label>
                                                            <Input className="w-3/4" id="login" name="login" defaultValue="" />
                                                        </div>
                                                        <div className="mt-3 flex">
                                                            <Label className="w-1/4" htmlFor="Pass-Key">
                                                                Pass Key:{' '}
                                                            </Label>
                                                            <Input className="w-3/4" id="Pass-Key" name="Pass-Key" defaultValue="" />
                                                        </div>
                                                        <div className="mt-3 flex">
                                                            <Label className="w-1/4" htmlFor="Command">
                                                                Command:{' '}
                                                            </Label>
                                                            <Input className="w-3/4" id="Command" name="Command" defaultValue="" />
                                                        </div>
                                                    </div>

                                                    {/* <DialogFooter></DialogFooter> */}
                                                </DialogContent>
                                            </Dialog>
                                        </th>
                                        <th className="py-2">API Type</th>
                                        <th className="py-2">URL Endpoint</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={3} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="Deductions">
                        <div className="overflow-y-scroll border pb-32">
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2 ps-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                                        <FilePlus />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <div className="flex gap-2">
                                                                <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                                <DialogClose asChild>
                                                                    <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                                </DialogClose>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 rounded border p-3">
                                                        <div className="flex gap-3">
                                                            <Checkbox id="Enabled" />
                                                            <Label htmlFor="Enabled">Enabled</Label>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Label className="w-1/4">Type:</Label>
                                                            <Select>
                                                                <SelectTrigger className="w-3/4">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="open">Open</SelectItem>
                                                                        <SelectItem value="close">Close</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Label htmlFor="frequency" className="w-1/4">
                                                                Frequency
                                                            </Label>
                                                            <Select>
                                                                <SelectTrigger className="w-3/4" id="frequency">
                                                                    <SelectValue placeholder="Select a frequency" />
                                                                </SelectTrigger>
                                                                <SelectContent position="popper">
                                                                    {/* Optional: Add a header to the dropdown */}
                                                                    <div className="text-muted-foreground grid grid-cols-[1fr_2fr] gap-4 border-b px-3 py-2 text-sm font-semibold">
                                                                        <div>Description</div>
                                                                        <div>Deduction Details</div>
                                                                    </div>
                                                                    {/* Map through the options to create the list */}
                                                                    {frequencies.map((freq) => (
                                                                        <SelectItem key={freq.id} value={freq.id} textValue={freq.label}>
                                                                            <div className="grid grid-cols-[1fr_2fr] items-start gap-4">
                                                                                <div className="font-medium">{freq.label}</div>
                                                                                <div className="text-muted-foreground text-xs whitespace-normal">
                                                                                    {freq.description}
                                                                                </div>
                                                                            </div>
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <Label htmlFor="Amount-Per-Frequency">Amount Per Frequency</Label>
                                                            <Input type="number" id="Amount-Per-Frequency" />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Label className="w-1/4">Start Date</Label>
                                                            <Popover open={deductions_open} onOpenChange={setDeductions_Open}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="deductions_date"
                                                                        className="w-3/4 justify-between font-normal"
                                                                    >
                                                                        {deductions_date ? deductions_date.toLocaleDateString() : 'Select date'}
                                                                        <ChevronDownIcon />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={deductions_date}
                                                                        captionLayout="dropdown"
                                                                        onSelect={(date) => {
                                                                            set_Deductions_Date(date);
                                                                            setDeductions_Open(false);
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Label className="w-1/4">Start Date</Label>
                                                            <Popover open={deductions_end_open} onOpenChange={setDeductions_end_Open}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        id="deductions_end_date"
                                                                        className="w-3/4 justify-between font-normal"
                                                                    >
                                                                        {deductions_end_date
                                                                            ? deductions_end_date.toLocaleDateString()
                                                                            : 'Select date'}
                                                                        <ChevronDownIcon />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={deductions_end_date}
                                                                        captionLayout="dropdown"
                                                                        onSelect={(date) => {
                                                                            set_Deductions_end_Date(date);
                                                                            setDeductions_end_Open(false);
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Label htmlFor="memo">Memo</Label>
                                                            <Textarea id="memo" />
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </th>
                                        <th className="py-2">Type</th>
                                        <th className="py-2">Enabled</th>
                                        <th className="py-2">Start Date</th>
                                        <th className="py-2">End Date</th>
                                        <th className="py-2">Amount</th>
                                        <th className="py-2">Percentage of Gross Per Frequency</th>
                                        <th className="py-2 pe-2">Paid Off</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={8} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="HandHeld">
                        <div className="w-full lg:w-8/12">
                            <div className="grid gap-6 p-4">
                                {/* Handheld Settings */}
                                <Card>
                                    <CardContent className="space-y-4 pt-6">
                                        <h2 className="text-lg font-semibold">HandHeld Settings</h2>
                                        <div className="grid grid-cols-2 gap-6 p-4">
                                            <div className="grid gap-3">
                                                <div>
                                                    <Label>TimeOut</Label>
                                                    <Input defaultValue="120" />
                                                </div>

                                                <div>
                                                    <Label>Font Size</Label>
                                                    <Input defaultValue="24" />
                                                </div>

                                                <div>
                                                    <Label>GPS Mins</Label>
                                                    <Input defaultValue="2" />
                                                </div>

                                                <div>
                                                    <Label>Options</Label>
                                                    <Input />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="">
                                                    <Label>Signature Device</Label>
                                                    <Input defaultValue="1" />
                                                </div>

                                                <div className="mt-3">
                                                    <Label>Notes</Label>
                                                    <Input />
                                                </div>

                                                <div className="mt-3">
                                                    <Label>gpsmeters</Label>
                                                    <Input defaultValue="500" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Alerts */}
                                <Card className="md:col-span-1">
                                    <CardContent className="space-y-4 pt-6">
                                        <h2 className="text-lg font-semibold">Alerts</h2>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            {alertGroups.map((group, groupIndex) => (
                                                <div key={groupIndex} className="space-y-2">
                                                    {group.map((label) => (
                                                        <div key={label} className="flex items-center space-x-2">
                                                            <Checkbox defaultChecked={defaultChecked.includes(label)} />
                                                            <Label className="text-sm">{label}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Carrier-Portal-Settings">
                        <Card className="w-full max-w-2xl">
                            <CardHeader>
                                <CardTitle className="text-xl">Permissions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                    <div className="flex flex-col gap-4">
                                        {firstColumn.map((permission) => (
                                            <div key={permission} className="flex items-center space-x-2">
                                                <Checkbox id={permission} />
                                                <Label htmlFor={permission}>{permission}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {secondColumn.map((permission) => (
                                            <div key={permission} className="flex items-center space-x-2">
                                                <Checkbox id={permission} />
                                                <Label htmlFor={permission}>{permission}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="Notes">
                        <div className="overflow-y-scroll border pb-32">
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2 ps-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                                        <FilePlus />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <div className="flex gap-2">
                                                                <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                                <DialogClose asChild>
                                                                    <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                                </DialogClose>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 rounded border p-3">
                                                        <div className="flex items-center gap-3">
                                                            <Label htmlFor="User">User:</Label>
                                                            <p className="text-sm">Date/Time: 8/2/2025 7:35:49 AM</p>
                                                        </div>
                                                        <div className="grid gap-3">
                                                            <div className="flex w-full max-w-sm items-center gap-2">
                                                                <Label className="w-1/4">Note Type:</Label>
                                                                <Select>
                                                                    <SelectTrigger className="w-3/4">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value="open">Open</SelectItem>
                                                                            <SelectItem value="close">Close</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Label htmlFor="Note">Note</Label>
                                                            <Textarea id="Note" name="Note" defaultValue="" />
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </th>
                                        <th className="py-2">Note</th>
                                        <th className="py-2">Created Date</th>
                                        <th className="py-2">Note Type</th>
                                        <th className="py-2">User Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={5} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                    <TabsContent value="Audit">
                        <div className="overflow-y-scroll border pb-32">
                            <table className="w-full">
                                <thead className="custom-nav-color text-white">
                                    <tr>
                                        <th className="py-2">Date</th>
                                        <th className="py-2">User</th>
                                        <th className="py-2">Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={3} className="border-b py-2 text-center">
                                            No data to display
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </TenantLayout>
    );
}
