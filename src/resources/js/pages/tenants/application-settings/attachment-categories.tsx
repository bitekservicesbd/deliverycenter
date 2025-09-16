import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, Link } from '@inertiajs/react';
import { Copy, FilePenLine, Plus, Search } from 'lucide-react';

export default function AccessorialTypes() {
    const attachmentCategoriesData = [
        {
            id: 1,
            description: 'Waybill',
            notifyEmail: '',
            retentionDays: 365,
            attachToLoadAlerts: false,
            attachToInvoices: false,
            defaultDriver: false,
            hideFromDriver: false,
        },
        {
            id: 2,
            description: 'Damaged',
            notifyEmail: '',
            retentionDays: 365,
            attachToLoadAlerts: false,
            attachToInvoices: false,
            defaultDriver: false,
            hideFromDriver: false,
        },
        {
            id: 3,
            description: 'Other',
            notifyEmail: '',
            retentionDays: 365,
            attachToLoadAlerts: false,
            attachToInvoices: false,
            defaultDriver: false,
            hideFromDriver: false,
        },
        {
            id: 4,
            description: 'PICTURE POD',
            notifyEmail: '',
            retentionDays: 365,
            attachToLoadAlerts: false,
            attachToInvoices: false,
            defaultDriver: false,
            hideFromDriver: false,
        },
    ];

    return (
        <TenantLayout>
            <Head title="Attachment Categories" />
            <div>
                <TopSearch className="mb-2" />
            </div>
            <PageNav>
                <span className="ms-5 font-bold text-white">Attachment Categories</span>
            </PageNav>
            <div className="p-5">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    {/* Select field */}
                    <Select>
                        <SelectTrigger className="w-full sm:w-[250px]">
                            <SelectValue placeholder="Attachment Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AttachmentCategories">Attachment Categories</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Search + Button */}
                    <div className="flex flex-row gap-2 sm:flex-1">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input type="search" placeholder="String search..." className="w-full pl-8 md:w-[200px]" />
                        </div>
                        <Button className="w-auto">Search</Button>
                    </div>
                </div>

                <Button asChild>
                    <Link href={route('tenant.application.settings.create.attachment.category')} className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </Button>

                <div className="mt-4 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="dark:border-gray-600">
                                <TableHead className="custom-nav-color flex justify-center px-1 py-2 text-white dark:border-gray-600">
                                    Action
                                </TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Description</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Falsetify Email</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Retention Days</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Attach to Load Alerts</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Attach to Invoices</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Default Driver</TableHead>
                                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Hide From Driver</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {attachmentCategoriesData.map((category) => (
                                <TableRow key={category.id} className="dark:border-gray-600">
                                    <TableCell className="flex justify-center gap-2 p-2">
                                        <FilePenLine className="text-blue-500" />
                                        <Copy className="text-green-500" />
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{category.description}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{category.notifyEmail}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{category.retentionDays}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">
                                        {category.attachToLoadAlerts ? 'True' : 'False'}
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">
                                        {category.attachToInvoices ? 'True' : 'False'}
                                    </TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{category.defaultDriver ? 'True' : 'False'}</TableCell>
                                    <TableCell className="border-s p-2 dark:border-gray-600">{category.hideFromDriver ? 'True' : 'False'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TenantLayout>
    );
}
