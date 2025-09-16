'use client';
// import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Customer from '@/components/Customer';
import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';

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
        <ClientLayout>
            <Head title="Importer" />
            {/* top bar */}
            <div>
                <TopSearch />
            </div>
            <Form {...form}>
                <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <Tabs defaultValue="Importer">
                        <div className="ms-4">
                            <PageNav>
                                <TabsList>
                                    <TabsTrigger value="Importer">Importer</TabsTrigger>
                                </TabsList>
                            </PageNav>
                        </div>
                        <TabsContent value="Importer">
                            <div className="m-4 border p-5">
                                <div className="">
                                    <div className="flex items-center gap-3">
                                        <Customer className="w-full" value={'Search'} onChange={() => {}} />
                                        <Button
                                            type="submit"
                                            className="bg-sky-900 px-2 py-6 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
                                        >
                                            <RefreshCcw />
                                        </Button>
                                    </div>
                                    <div className="flex w-full max-w-sm items-center gap-2 pt-3">
                                        <FormLabel className="w-1/4">Type *</FormLabel>
                                        <Select defaultValue="Loads/Shipment">
                                            <SelectTrigger className="w-3/4">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Loads/Shipment">Loads/Shipment</SelectItem>
                                                    <SelectItem value="open">Open</SelectItem>
                                                    <SelectItem value="close">Close</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* table */}
                                    <div className="mt-5 border pb-60">
                                        <Table className="w-full">
                                            <TableHeader className="custom-nav-color">
                                                <TableRow>
                                                    <TableHead className="border-r px-1 py-2 text-white">Actions</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">View Attachment</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">ID</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Upload Date</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Import Type</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">File Name</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Data Lines</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Lines Remains</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Lines With Errors</TableHead>
                                                    <TableHead className="border-r px-1 py-2 text-white">Message</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={10} className="border-b py-5 text-center">
                                                        No data to display
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="mt-5 flex">
                                        <div className="relative w-full">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="rounded-s-gray-100 rounded-s-2 z-20 block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500"
                                                placeholder="Select multiple files"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute end-0 top-0 h-full rounded-e-lg border border-sky-900 bg-sky-900 p-2.5 text-sm font-medium text-white hover:bg-sky-950 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-900 dark:hover:bg-gray-950 dark:focus:ring-gray-800"
                                            >
                                                Upload File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </ClientLayout>
    );
}
