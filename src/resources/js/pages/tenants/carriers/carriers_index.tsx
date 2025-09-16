import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { CircleX, FilePlus2, Search } from 'lucide-react';

export default function Index() {
    return (
        <TenantLayout>
            <Head title="Finalizing Loads" />
            {/* top bar */}
            <div>
                <TopSearch className="mb-2" />
                <PageNav className="mb-2">
                    <span className="ms-5 font-bold text-white">Carriers</span>
                </PageNav>
            </div>
            {/* top bar end*/}
            <div>
                <div className="w-full">
                    <div className="mx-2 bg-slate-50 px-4 py-4 dark:bg-zinc-950">
                        <p className="mb-4 border-b border-slate-400 font-bold">Carrier Search</p>
                        <div className="grid grid-cols-1 items-center md:grid-cols-3 md:space-y-2 md:space-x-4 lg:grid-cols-5">
                            <div>
                                <div className="mb-2">
                                    <Label htmlFor="carrier-id">Carrier ID #:</Label>
                                    <Input type="text" id="carrier-id" placeholder="Carrier ID" />
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="Street">Street #:</Label>
                                    <Input type="text" id="Street" placeholder="Street" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <Label htmlFor="Carrier-Code">Carrier Code:</Label>
                                    <Input type="text" id="Carrier-Code" placeholder="Carrier Code" />
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="City">City #:</Label>
                                    <Input type="text" id="City" placeholder="City #" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <Label htmlFor="Name">Name #:</Label>
                                    <Input type="text" id="Name" placeholder="Name" />
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="Province">Province</Label>
                                    <Input type="text" id="Province" placeholder="Province" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <Label>Carrier Type:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Carrier Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="open">Delivered Transportation Loads</SelectItem>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="close">Close</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="Country">Country</Label>
                                    <Input type="text" id="Country" placeholder="Country" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <Label>Work Status:</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Work Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="open">Delivered Transportation Loads</SelectItem>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="close">Close</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="Postal-Code">Postal Code</Label>
                                    <Input type="text" id="Postal-Code" placeholder="Postal Code" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex gap-4">
                                <Label htmlFor="active">Active</Label>
                                <Checkbox id="active" />
                            </div>
                            <div className="flex gap-4">
                                <Label htmlFor="has-end-date">Has End Date</Label>
                                <Checkbox id="has-end-date" />
                            </div>
                        </div>
                        <div className="mb-4 lg:w-1/3">
                            <Label htmlFor="Clause">Where Clause:</Label>
                            <Textarea id="Clause" rows={3} />
                        </div>
                        <div className="ms-2 flex justify-center gap-2 md:justify-start">
                            <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                <Search /> Search
                            </Button>
                            <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                                <CircleX /> Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="change-status">
                <PageNav>
                    <div className="mx-2 flex items-center justify-between py-2 md:mx-5">
                        <div className="text-center">
                            <Link
                                href={route('tenant.carriers.create')}
                                className="flex items-center gap-2 rounded bg-sky-900 p-2 text-white hover:bg-sky-950 dark:bg-zinc-900 dark:hover:bg-zinc-950"
                            >
                                <FilePlus2 /> <p>Add Carrier</p>
                            </Link>
                        </div>
                        <div className="text-center text-white">Total Carriers: 0</div>
                    </div>
                </PageNav>
                {/* table */}
                <Table>
                    <TableHeader className="custom-nav-color">
                        <TableRow>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Name</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Driver Number</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Driver Code</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Active</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Deleted</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Target</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">DG Certificate</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Temp. Control</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Account Locked</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Street 1</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">City</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Phone</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Fax</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Contact Name</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Contact Email</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Credit Limit</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Invoice Bal..</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Load Balance</TableHead>
                            <TableHead className="border-r border-white px-1 py-2 text-white">Total Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={19} className="border py-14 text-center font-bold">
                                No Data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Tabs>
        </TenantLayout>
    );
}
