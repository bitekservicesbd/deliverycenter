import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Undo2 } from 'lucide-react';

export default function CreateDeliveryConditions() {
    return (
        <TenantLayout>
            <Head title="Create Delivery Condition" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Create Delivery Condition</span>
            </PageNav>
            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button variant="outline" asChild>
                        <Link href={route('tenant.application.settings.delivery.conditions')} className="inline-flex items-center">
                            <Undo2 className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
                <div className="rounded border p-4">
                    <div className="mb-8 grid grid-cols-1">
                        <div className="mb-4">
                            <Label>Description</Label>
                            <Textarea />
                        </div>
                        <div>
                            <Label>Delay</Label>
                            <Input type="number" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button>Save</Button>
                        <Button variant="outline">Change Log</Button>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
