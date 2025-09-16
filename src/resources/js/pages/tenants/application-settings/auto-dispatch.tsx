import PageNav from '@/components/PageNav';
import SearchComp from '@/components/SearchComp';
import TopSearch from '@/components/TopSearch';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopButton from '@/components/ui/TopButton';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { ArrowLeftRight, CircleX, User, Users } from 'lucide-react';

export default function autoDispatch() {
    return (
        <TenantLayout>
            <Head title="Auto Dispatch" />
            <div>
                <div>
                    <TopSearch />
                </div>
                <div className="mt-2 flex flex-wrap">
                    <div className="w-full md:w-2/12">
                        <div className="mx-1 min-h-screen border px-3">
                            <SearchComp placeholder="Search" className="mt-3 w-full" />
                            <div className="mt-3">
                                <Table>
                                    <TableHeader className="custom-nav-color">
                                        <TableRow className="border">
                                            <TableHead className="w-[100px]">
                                                <Checkbox />
                                            </TableHead>
                                            <TableHead className="text-white">Name</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">1A Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">2A Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="border">3C Balraj</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-10/12">
                        <div className="px-2">
                            <div className="mt-2">
                                {' '}
                                <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0">
                                    <TopButton icon={User} label="Enable ALl" onClick={() => {}} />
                                    <TopButton icon={CircleX} label="Disable ALl" onClick={() => {}} />
                                    <TopButton icon={ArrowLeftRight} label="ChangeDriver" onClick={() => {}} />
                                    <TopButton icon={User} label="Refresh" onClick={() => {}} />
                                    <TopButton icon={Users} label="View Report" onClick={() => {}} />
                                </div>
                                <Tabs defaultValue="Zones">
                                    <PageNav className="ms-2">
                                        <TabsList>
                                            <TabsTrigger value="Zones">Zones</TabsTrigger>
                                        </TabsList>
                                    </PageNav>
                                    <TabsContent value="Zones">
                                        <div>
                                            <PageNav>
                                                <div className="text-center font-bold text-white">Total Settings: 0 AND selected settings: 0</div>
                                            </PageNav>
                                        </div>
                                        {/* table */}
                                        <div className="container w-full">
                                            <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
                                                <Table className="min-w-full text-left text-sm">
                                                    <TableHeader className="custom-nav-color">
                                                        {/* First row */}
                                                        <TableRow className="border">
                                                            <TableHead className="border text-white" rowSpan={2}>
                                                                Dispatch To Carrier
                                                            </TableHead>
                                                            <TableHead className="border text-white" rowSpan={2}>
                                                                Effective Date
                                                            </TableHead>

                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Account
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Service
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Pickup Zone
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Pickup Dispatch Zone
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Delivery Zone
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={2}>
                                                                Delivery Dispatch Zone
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" rowSpan={2}>
                                                                Start Time
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" rowSpan={2}>
                                                                End Time
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" colSpan={7}>
                                                                Dispatch On Days
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" rowSpan={2}>
                                                                Alert Min Before Ready
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" rowSpan={2}>
                                                                Enabled
                                                            </TableHead>
                                                            <TableHead className="border text-center text-white" rowSpan={2}>
                                                                Date Created
                                                            </TableHead>
                                                        </TableRow>

                                                        {/* Second row */}
                                                        <TableRow className="border">
                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Customer Name</TableHead>

                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Service Name</TableHead>

                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Zone</TableHead>

                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Dispatch Zone</TableHead>

                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Zone</TableHead>

                                                            <TableHead className="border text-white">Condition</TableHead>
                                                            <TableHead className="border text-white">Dispatch Zone</TableHead>

                                                            <TableHead className="border text-white">S</TableHead>
                                                            <TableHead className="border text-white">M</TableHead>
                                                            <TableHead className="border text-white">T</TableHead>
                                                            <TableHead className="border text-white">W</TableHead>
                                                            <TableHead className="border text-white">T</TableHead>
                                                            <TableHead className="border text-white">F</TableHead>
                                                            <TableHead className="border text-white">S</TableHead>
                                                        </TableRow>
                                                    </TableHeader>

                                                    <TableBody>
                                                        {/* Example data row */}
                                                        <TableRow>
                                                            <TableCell className="border py-26 text-center" colSpan={26}>
                                                                No Data
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
                </div>
            </div>
        </TenantLayout>
    );
}
