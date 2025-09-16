import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { FilePlus } from 'lucide-react';

export default function DataTable() {
    return (
        <TenantLayout>
            <Head title="Customer Broker" />
            <div>
                <TopSearch />

                <div className="mx-2">
                    <div className="my-2">
                        <div>
                            <PageNav>
                                <p className="ps-3 text-white">Customer Broker</p>
                            </PageNav>
                            <div></div>
                        </div>
                    </div>
                    <div className="rounded-md border p-3">
                        <div className="flex flex-wrap items-center gap-5">
                            <div>
                                <Select>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Brokers" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Brokers">Brokers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Checkbox id="show-deleted" />
                                <Label htmlFor="show-deleted">Show Deleted?</Label>
                            </div>
                            <div>
                                <Button type="button" className="bg-sky-900 text-white hover:bg-sky-950 dark:bg-zinc-800 dark:hover:bg-zinc-900">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <Link
                            href="/carriers/customer-brokers/create"
                            className="mt-8 flex w-32 gap-2 rounded bg-sky-900 px-3 py-2 text-white hover:bg-sky-950 dark:bg-zinc-800 dark:hover:bg-zinc-900"
                        >
                            <FilePlus /> <span>Add New</span>
                        </Link>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
