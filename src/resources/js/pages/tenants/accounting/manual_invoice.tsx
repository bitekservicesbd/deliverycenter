import Customer from '@/components/Customer';
import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { FilePlus, Printer, RotateCcw, Search } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Finalizing Loads" />
            <TopSearch className="mb-3" />
            <Tabs defaultValue="Manual-Invoice">
                <PageNav>
                    <TabsList className="!-ms-0">
                        <TabsTrigger value="Manual-Invoice">Manual Invoice</TabsTrigger>
                    </TabsList>
                </PageNav>
                <TabsContent value="Manual-Invoice">
                    <div className="border">
                        <div className="flex flex-wrap">
                            <div className="w-full rounded md:w-5/12">
                                <div className="p-4">
                                    <div className="flex gap-3">
                                        <div className="flex w-full max-w-sm items-center gap-2 pt-3">
                                            <Label className="w-1/4">Start Date:</Label>
                                            <Select defaultValue="7/14/25">
                                                <SelectTrigger className="w-3/4">
                                                    <SelectValue placeholder="Start Date" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="7/14/25">7/14/25</SelectItem>
                                                        <SelectItem value="open">Open</SelectItem>
                                                        <SelectItem value="close">Close</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex w-full max-w-sm items-center gap-2 pt-3">
                                            <Label className="w-1/4">End Date:</Label>
                                            <Select defaultValue="7/14/25">
                                                <SelectTrigger className="w-3/4">
                                                    <SelectValue placeholder="End Date" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="7/14/25">7/14/25</SelectItem>
                                                        <SelectItem value="open">Open</SelectItem>
                                                        <SelectItem value="close">Close</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {/* buttons */}
                                    <div className="mt-5 flex gap-3">
                                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                            <Search /> Search
                                        </Button>
                                        <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                            <RotateCcw /> Reset
                                        </Button>
                                    </div>

                                    {/* table */}
                                    <div className="mt-5 border pb-60">
                                        <Table className="w-full">
                                            <TableHeader className="w-full">
                                                <TableRow>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">#</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Customer</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Invoice</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Amount</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Created DT</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Created By</TableHead>
                                                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">#</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={7} className="border-b py-5 text-center">
                                                        No data to display
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded md:w-7/12">
                                <Tabs defaultValue="Detail">
                                    <PageNav>
                                        <TabsList>
                                            <TabsTrigger value="Detail">Detail</TabsTrigger>
                                            <TabsTrigger value="Audit">Audit</TabsTrigger>
                                        </TabsList>
                                    </PageNav>
                                    <div>
                                        <TabsContent value="Detail">
                                            <div className="border p-4">
                                                <div>
                                                    <Customer value={'Search'} onChange={() => {}} />
                                                </div>
                                                <div className="flex pt-3">
                                                    <div className="flex w-full max-w-sm items-center gap-2">
                                                        <Label htmlFor="Invoice-Date" className="w-1/4">
                                                            Invoice Date:
                                                        </Label>
                                                        <Input type="text" id="Invoice-Date" className="w-3/4" placeholder="Invoice Date" />
                                                    </div>
                                                </div>
                                                <div className="flex pt-3">
                                                    <div className="flex w-full max-w-sm items-center gap-2">
                                                        <Label htmlFor="Due-Date" className="w-1/4">
                                                            Due Date:
                                                        </Label>
                                                        <Input type="text" id="Due-Date" className="w-3/4" placeholder="Due Date" />
                                                    </div>
                                                </div>
                                                {/* table */}
                                                <div className="mt-5 border pb-32">
                                                    <Table className="w-full">
                                                        <TableHeader className="w-full">
                                                            <TableRow>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    <FilePlus />
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    Description
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Qty</TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    Client Rate
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    Client Amount
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    Fed Tax
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    State/Prov Tax
                                                                </TableHead>
                                                                <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                                                                    GL Code
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell colSpan={8} className="border-b py-5 text-center">
                                                                    No data to display
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                <div className="mt-6 w-full rounded">
                                                    <div>
                                                        <Label htmlFor="Comments">Comments:</Label>
                                                        <Textarea className="w-full" id="Comments" />
                                                    </div>
                                                </div>
                                                {/* buttons */}
                                                <div className="mt-5 flex gap-3">
                                                    <Button
                                                        type="button"
                                                        className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
                                                    >
                                                        <FilePlus /> New
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
                                                    >
                                                        <Printer /> Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="Audit">
                                            <div className="border pb-60">
                                                <Table className="w-full">
                                                    <TableHeader className="w-full">
                                                        <TableRow>
                                                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Date</TableHead>
                                                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white">User</TableHead>
                                                            <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Change</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell colSpan={3} className="border-b py-5 text-center">
                                                                No data to display
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </TenantLayout>
    );
}
