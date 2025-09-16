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
import { Tabs } from '@/components/ui/tabs';
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
            <Head title="Finalizing Loads" />
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
                        {/* Main Layout Grid */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Finalizing Loads Column */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Finalizing Loads</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <FormLabel>Load Status:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="delivered">Delivered Transportation Loads</SelectItem>
                                                            <SelectItem value="open">Open</SelectItem>
                                                            <SelectItem value="close">Close</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="load-input" className="text-sm font-medium">
                                                    Load #:
                                                </Label>
                                                <Input type="text" id="load-input" placeholder="Load" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="waybill" className="text-sm font-medium">
                                                    Waybill #:
                                                </Label>
                                                <Input type="text" id="waybill" placeholder="Waybill" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="service" className="text-sm font-medium">
                                                    Service #:
                                                </Label>
                                                <Input type="text" id="service" placeholder="Service" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="customer-code" className="text-sm font-medium">
                                                    Customer Code #:
                                                </Label>
                                                <Input type="text" id="customer-code" placeholder="Customer Code" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="carrier-code" className="text-sm font-medium">
                                                    Carrier Code #:
                                                </Label>
                                                <Input type="text" id="carrier-code" placeholder="Carrier Code" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>Start Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Start Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date Option 1</SelectItem>
                                                            <SelectItem value="date2">Date Option 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="caller" className="text-sm font-medium">
                                                    Caller #:
                                                </Label>
                                                <Input type="text" id="caller" placeholder="Caller" className="w-full" />
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <Label htmlFor="child-loads" className="text-sm font-medium">
                                                    Child Loads?
                                                </Label>
                                                <Checkbox id="child-loads" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="reference" className="text-sm font-medium">
                                                    Reference:
                                                </Label>
                                                <Input type="text" id="reference" placeholder="Reference" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="po" className="text-sm font-medium">
                                                    P.O. #:
                                                </Label>
                                                <Input type="text" id="po" placeholder="P.O. #" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="vehicle" className="text-sm font-medium">
                                                    Vehicle:
                                                </Label>
                                                <Input type="text" id="vehicle" placeholder="Vehicle" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="customer" className="text-sm font-medium">
                                                    Customer:
                                                </Label>
                                                <Input type="text" id="customer" placeholder="Customer" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="carrier" className="text-sm font-medium">
                                                    Carrier:
                                                </Label>
                                                <Input type="text" id="carrier" placeholder="Carrier" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <FormLabel>End Date:</FormLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="End Date" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="date1">Date Option 1</SelectItem>
                                                            <SelectItem value="date2">Date Option 2</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pickup Column */}
                                    <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                        <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Pickup</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-name" className="text-sm font-medium">
                                                    Name #:
                                                </Label>
                                                <Input type="text" id="pickup-name" placeholder="Name" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-state" className="text-sm font-medium">
                                                    State:
                                                </Label>
                                                <Input type="text" id="pickup-state" placeholder="State" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-city" className="text-sm font-medium">
                                                    City:
                                                </Label>
                                                <Input type="text" id="pickup-city" placeholder="City" className="w-full" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="pickup-postal" className="text-sm font-medium">
                                                    Postal:
                                                </Label>
                                                <Input type="text" id="pickup-postal" placeholder="Postal" className="w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="h-full rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                                    <p className="mb-4 border-b border-slate-400 pb-2 font-bold">Delivery</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="delivery-name" className="text-sm font-medium">
                                                Name #:
                                            </Label>
                                            <Input type="text" id="delivery-name" placeholder="Name" className="w-full" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="delivery-state" className="text-sm font-medium">
                                                State:
                                            </Label>
                                            <Input type="text" id="delivery-state" placeholder="State" className="w-full" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="delivery-city" className="text-sm font-medium">
                                                City:
                                            </Label>
                                            <Input type="text" id="delivery-city" placeholder="City" className="w-full" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="delivery-postal" className="text-sm font-medium">
                                                Postal:
                                            </Label>
                                            <Input type="text" id="delivery-postal" placeholder="Postal" className="w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ms-2 mt-5 lg:ms-5">
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" className="flex items-center gap-2">
                                <SearchIcon className="h-4 w-4" /> Search
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <CircleX className="h-4 w-4" /> Clear
                            </Button>
                            <Button type="button" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" /> View Report
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="mt-5 flex w-full flex-col gap-4 p-2 sm:flex-row sm:items-center lg:ms-5 lg:max-w-4xl">
                            <FormLabel className="sm:w-auto lg:w-1/4">Effective Finalize Date:</FormLabel>
                            <Select defaultValue="7/14/2025">
                                <SelectTrigger className="sm:w-auto lg:w-1/4">
                                    <SelectValue placeholder="Effective Finalize Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="7/14/2025">7/14/2025</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button type="button" className="sm:w-auto">
                                Finalize Selected Loads
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="change-status">
                        <PageNav className="mt-2 py-2">
                            <div className="text-center">
                                <span className="text-center text-white">Total Load: 0 AND selected loads: 0</span>
                            </div>
                        </PageNav>
                        {/* table */}
                        <div className="w-full overflow-x-auto border">
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
                    </Tabs>
                </form>
            </Form>
        </TenantLayout>
    );
}
