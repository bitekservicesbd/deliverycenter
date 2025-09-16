import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, router } from '@inertiajs/react';
import { FilePlus } from 'lucide-react';

export default function DataTable() {
    return (
        <TenantLayout>
            <Head title="Carrier Payment Zone" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-center text-white">Carrier Payment Zone Create</p>
                    </PageNav>
                </div>

                <div className="mx-2">
                    <div className="rounded border p-3">
                        <div className="flex flex-wrap gap-5">
                            <div>
                                <Select>
                                    <SelectTrigger className="">
                                        <SelectValue defaultValue="Carrier Payment Zone" placeholder="Carrier Payment Zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Carrier Payment Zone">Carrier Payment Zone</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>Zone Name</Label>
                                <Select>
                                    <SelectTrigger className="">
                                        <SelectValue defaultValue="Carrier Payment Zone" placeholder="Carrier Payment Zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Carrier Payment Zone">Carrier Payment Zone</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Label>Zone Group</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-sky-900 hover:bg-sky-950" type="button">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button
                                className="bg-sky-900 hover:bg-sky-950"
                                onClick={() => router.visit(route('tenant.application.settings.carrier.payment.zones.create'))}
                            >
                                <FilePlus /> Add New
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
