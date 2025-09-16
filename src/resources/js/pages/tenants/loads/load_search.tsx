'use client';
// import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import PageNav from '@/components/PageNav';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { CircleX, Printer, SearchIcon } from 'lucide-react';

const FormSchema = z.object({
    email: z
        .string({
            required_error: 'Please select an email to display.',
        })
        .email(),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('You submitted the following values', {
        description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
    });
}

export default function Index() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <TenantLayout>
            <Head title="Load Search" />
            {/* top bar */}
            <div>
                <PageNav className="rounded p-4">
                    <div className="flex flex-col gap-4 py-3 lg:flex-row lg:justify-end">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Label htmlFor="load" className="text-white sm:w-auto lg:w-1/4">
                                Load #
                            </Label>
                            <Input type="text" className="bg-slate-100 sm:flex-1 lg:w-3/4 dark:bg-zinc-700" />
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Label htmlFor="Reference" className="text-white sm:w-auto lg:w-2/4">
                                Reference #
                            </Label>
                            <Input type="text" className="bg-slate-100 sm:flex-1 lg:w-3/4 dark:bg-zinc-700" />
                        </div>
                        <div className="lg:mr-4">
                            <Button type="button" className="w-full bg-sky-900 sm:w-auto dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                Search
                            </Button>
                        </div>
                    </div>
                </PageNav>
            </div>
            {/* top bar end*/}
            <Form {...form}>
                <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-6 p-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Load Search Column */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Load Search</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="load-input" className="text-sm font-medium">
                                                    Load #:
                                                </Label>
                                                <Input type="text" id="load-input" placeholder="Load" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Status:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Created date from:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Created date from" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Created date to:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Created date to" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Created by:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Created by" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Modified by:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Modified by" />
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
                                    </div>

                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="service" className="text-sm font-medium">
                                                    Service:
                                                </Label>
                                                <Input type="text" id="service" placeholder="Service" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Vehicle:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Vehicle" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="bus">Bus</SelectItem>
                                                            <SelectItem value="car">Car</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="po" className="text-sm font-medium">
                                                    P.O. #:
                                                </Label>
                                                <Input type="text" id="po" placeholder="P.O. #" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="notes" className="text-sm font-medium">
                                                    Notes:
                                                </Label>
                                                <Input type="text" id="notes" placeholder="Notes" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="instructions" className="text-sm font-medium">
                                                    Instructions:
                                                </Label>
                                                <Input type="text" id="instructions" placeholder="Instructions" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="packages_types" className="text-sm font-medium">
                                                    Packages Types:
                                                </Label>
                                                <Input type="text" id="packages_types" placeholder="Packages Types" className="w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Fields Column */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="waybill" className="text-sm font-medium">
                                                    Waybill #:
                                                </Label>
                                                <Input type="text" id="waybill" placeholder="Waybill" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="reference" className="text-sm font-medium">
                                                    Reference:
                                                </Label>
                                                <Input type="text" id="reference" placeholder="Reference" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="caller" className="text-sm font-medium">
                                                    Caller:
                                                </Label>
                                                <Input type="text" id="caller" placeholder="Caller" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="field_one" className="text-sm font-medium">
                                                    Field 1:
                                                </Label>
                                                <Input type="text" id="field_one" placeholder="Field 1" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="field_two" className="text-sm font-medium">
                                                    Field 2:
                                                </Label>
                                                <Input type="text" id="field_two" placeholder="Field 2" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pickup Section */}
                            <div className="lg:col-span-4">
                                <div className="h-full rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                    <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Pickup</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-name" className="text-sm font-medium">
                                                    Name:
                                                </Label>
                                                <Input type="text" id="pickup-name" placeholder="Name" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-city" className="text-sm font-medium">
                                                    City:
                                                </Label>
                                                <Input type="text" id="pickup-city" placeholder="City" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-province" className="text-sm font-medium">
                                                    Province:
                                                </Label>
                                                <Input type="text" id="pickup-province" placeholder="Province" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Ship Start Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Ship Start Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date 1</SelectItem>
                                                            <SelectItem value="date2">Date 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Ship End Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Ship End Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date 1</SelectItem>
                                                            <SelectItem value="date2">Date 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-street" className="text-sm font-medium">
                                                    Street:
                                                </Label>
                                                <Input type="text" id="pickup-street" placeholder="Street" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-postal" className="text-sm font-medium">
                                                    Postal:
                                                </Label>
                                                <Input type="number" id="pickup-postal" placeholder="Postal" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-country" className="text-sm font-medium">
                                                    Country:
                                                </Label>
                                                <Input type="text" id="pickup-country" placeholder="Country" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-zone-name" className="text-sm font-medium">
                                                    Zone Name:
                                                </Label>
                                                <Input type="text" id="pickup-zone-name" placeholder="Zone Name" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-zone-id" className="text-sm font-medium">
                                                    Zone ID:
                                                </Label>
                                                <Input type="text" id="pickup-zone-id" placeholder="Zone ID" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Carrier */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Carrier</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="carrier-id" className="text-sm font-medium">
                                                    ID #:
                                                </Label>
                                                <Input type="text" id="carrier-id" placeholder="ID" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="carrier-statement" className="text-sm font-medium">
                                                    Statement #:
                                                </Label>
                                                <Input type="text" id="carrier-statement" placeholder="Statement" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="carrier-code" className="text-sm font-medium">
                                                    Code #:
                                                </Label>
                                                <Input type="text" id="carrier-code" placeholder="Code" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="carrier-name" className="text-sm font-medium">
                                                    Name:
                                                </Label>
                                                <Input type="text" id="carrier-name" placeholder="Name" className="w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Customer</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="customer-id" className="text-sm font-medium">
                                                    ID #:
                                                </Label>
                                                <Input type="text" id="customer-id" placeholder="ID" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="customer-code" className="text-sm font-medium">
                                                    Code #:
                                                </Label>
                                                <Input type="text" id="customer-code" placeholder="Code" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="customer-name" className="text-sm font-medium">
                                                    Name:
                                                </Label>
                                                <Input type="text" id="customer-name" placeholder="Name" className="w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Invoice */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Invoice</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="invoice-hash" className="text-sm font-medium">
                                                    #:
                                                </Label>
                                                <Input type="text" id="invoice-hash" placeholder="" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="invoice-from" className="text-sm font-medium">
                                                    From #:
                                                </Label>
                                                <Input type="text" id="invoice-from" placeholder="From" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="invoice-to" className="text-sm font-medium">
                                                    To #:
                                                </Label>
                                                <Input type="text" id="invoice-to" placeholder="To" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Section */}
                            <div className="lg:col-span-4">
                                <div className="h-full rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                    <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Delivery</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-name" className="text-sm font-medium">
                                                    Name:
                                                </Label>
                                                <Input type="text" id="delivery-name" placeholder="Name" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-city" className="text-sm font-medium">
                                                    City:
                                                </Label>
                                                <Input type="text" id="delivery-city" placeholder="City" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-province" className="text-sm font-medium">
                                                    Province:
                                                </Label>
                                                <Input type="text" id="delivery-province" placeholder="Province" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Ship Start Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Ship Start Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date 1</SelectItem>
                                                            <SelectItem value="date2">Date 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Ship End Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Ship End Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date 1</SelectItem>
                                                            <SelectItem value="date2">Date 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-street" className="text-sm font-medium">
                                                    Street:
                                                </Label>
                                                <Input type="text" id="delivery-street" placeholder="Street" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-postal" className="text-sm font-medium">
                                                    Postal:
                                                </Label>
                                                <Input type="number" id="delivery-postal" placeholder="Postal" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-country" className="text-sm font-medium">
                                                    Country:
                                                </Label>
                                                <Input type="text" id="delivery-country" placeholder="Country" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-zone-name" className="text-sm font-medium">
                                                    Zone Name:
                                                </Label>
                                                <Input type="text" id="delivery-zone-name" placeholder="Zone Name" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="delivery-zone-id" className="text-sm font-medium">
                                                    Zone ID:
                                                </Label>
                                                <Input type="text" id="delivery-zone-id" placeholder="Zone ID" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {/* Include Section */}
                            <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Include</p>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="dispatch-hold" className="text-sm font-medium">
                                                Dispatch Hold?
                                            </Label>
                                            <Checkbox id="dispatch-hold" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="finalize-hold" className="text-sm font-medium">
                                                Finalize Hold?
                                            </Label>
                                            <Checkbox id="finalize-hold" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="child-loads" className="text-sm font-medium">
                                                Child Loads?
                                            </Label>
                                            <Checkbox id="child-loads" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="dispatch-hold-2" className="text-sm font-medium">
                                                Dispatch Hold?
                                            </Label>
                                            <Checkbox id="dispatch-hold-2" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="finalize-hold-2" className="text-sm font-medium">
                                                Finalize Hold?
                                            </Label>
                                            <Checkbox id="finalize-hold-2" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="child-loads-2" className="text-sm font-medium">
                                                Child Loads?
                                            </Label>
                                            <Checkbox id="child-loads-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                <div className="space-y-4">
                                    <Label htmlFor="clause" className="text-sm font-medium">
                                        Where Clause:
                                    </Label>
                                    <Textarea className="min-h-[120px] w-full resize-y" id="clause" placeholder="Enter your where clause here..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button type="button" className="flex items-center gap-2">
                                <SearchIcon className="h-4 w-4" /> Search
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <CircleX className="h-4 w-4" /> Clear
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" /> Waybill
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" /> Blind Waybill
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" /> Labels
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="change-status" className="mt-5">
                        <PageNav>
                            <TabsList className="flex flex-wrap">
                                <TabsTrigger value="change-status" className="w-full sm:w-auto">
                                    Change Status
                                </TabsTrigger>
                                <div className="mt-2 mb-2 w-full min-w-[150px] sm:w-auto">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue className="text-white" placeholder="Change Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <TabsTrigger value="Recalculate" className="w-full sm:w-auto">
                                    Recalculate
                                </TabsTrigger>
                                <TabsTrigger value="Send-Notification" className="w-full sm:w-auto">
                                    Send Notification
                                </TabsTrigger>
                            </TabsList>
                        </PageNav>
                        <TabsContent value="change-status">
                            {/* table */}
                            <div className="mt-5 overflow-x-auto">
                                <span className="text-dark py-2 text-center">Total Load: 0 AND selected loads: 0</span>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr className="mx-1 bg-slate-400">
                                            <th className="border-r border-white px-1 py-2 text-xs">Load..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Create..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Custo..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Custo..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Called..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Refere..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Stop..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Service..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Status..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Dipot..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">HasChi..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Shippe..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                            <th className="border-r border-white px-1 py-2 text-xs">Consing..</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={29} className="py-14 text-center font-bold">
                                                No Data
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </TenantLayout>
    );
}
