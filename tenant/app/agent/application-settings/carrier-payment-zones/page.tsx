
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";
import Link from "next/link";

export default function CarrierPaymentZones() {
    return (
        <div>
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 font-semibold text-white">Carrier Payment Zone Create</p>
                    </PageNav>
                </div>

                <div>
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
                            >
                                <Link href={`/tenant/application-settings/carrier-payment-zones/create`}> Add New</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
