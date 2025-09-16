import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Docks() {
    return (
        <TenantLayout>
            <Head title="Docks" />
            <div className="mb-2">
                <TopSearch />
            </div>
            <PageNav className="mb-2">
                <span className="ms-5 font-bold text-white">Docks</span>
            </PageNav>
            <div className="p-5">
                <div className="mb-4 flex gap-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Docks" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Docks">Docks</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>Search</Button>
                </div>

                <Button asChild>
                    <Link href={route('tenant.application.settings.create.docks')} className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </Button>
            </div>
        </TenantLayout>
    );
}
