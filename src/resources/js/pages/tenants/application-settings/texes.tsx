import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head, router } from '@inertiajs/react';
import { File, Pencil } from 'lucide-react';

export default function DataTable() {
    const data = [
        {
            description: 'GST',
            gl_code: '',
            tax_amount: '5,0000',
            federal_tax_number: '',
            integration_id: 'G*',
            isFederalTax: 'True',
            provStateTaxNumber: '',
        },
        {
            description: 'HST 13%',
            gl_code: '',
            tax_amount: '13,0000',
            federal_tax_number: '',
            integration_id: 'HST13',
            isFederalTax: 'True',
            provStateTaxNumber: '',
        },
        {
            description: 'PST',
            gl_code: '',
            tax_amount: '5,0000',
            federal_tax_number: '',
            integration_id: 'P*',
            isFederalTax: 'False',
            provStateTaxNumber: '',
        },
        {
            description: 'QST',
            gl_code: '',
            tax_amount: '9,9750',
            federal_tax_number: '',
            integration_id: 'G*',
            isFederalTax: 'True',
            provStateTaxNumber: '',
        },
        {
            description: 'HST 15%',
            gl_code: '',
            tax_amount: '15,0000',
            federal_tax_number: '',
            integration_id: 'HST15*',
            isFederalTax: 'False',
            provStateTaxNumber: '',
        },
    ];

    return (
        <TenantLayout>
            <Head title="Taxes" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-white">Taxes</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="my-2">
                        <div className="mt-2 flex gap-2">
                            <div>
                                <Select>
                                    <SelectTrigger defaultValue={'Taxes'} className="">
                                        <SelectValue placeholder="Taxes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Taxes">Taxes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button className="bg-sky-900 hover:bg-sky-950" type="button">
                                    Search
                                </Button>
                            </div>
                        </div>
                        <Button
                            className="mt-2 bg-sky-900 hover:bg-sky-950"
                            onClick={() => router.visit(route('tenant.application.settings.taxes.create'))}
                        >
                            Add New
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader className="custom-nav-color">
                                <TableRow className="">
                                    <TableHead className="text-white">Action</TableHead>
                                    <TableHead className="text-white">Description</TableHead>
                                    <TableHead className="text-white">GL Code</TableHead>
                                    <TableHead className="text-white">Tax_Amount</TableHead>
                                    <TableHead className="text-white">Federal Tax Number</TableHead>
                                    <TableHead className="text-white">Integration ID</TableHead>
                                    <TableHead className="text-white">Is Federal Tax</TableHead>
                                    <TableHead className="text-white">Prov/State Tax Number</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="border">
                                            <div className="flex gap-1">
                                                <Button type="button" variant={'outline'}>
                                                    <Pencil className="h-4 w-4 cursor-pointer" />
                                                </Button>
                                                <Button type="button" variant={'outline'}>
                                                    <File className="h-4 w-4 cursor-pointer" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="border">{row.description}</TableCell>
                                        <TableCell className="border">{row.gl_code}</TableCell>
                                        <TableCell className="border">{row.tax_amount}</TableCell>
                                        <TableCell className="border">{row.federal_tax_number}</TableCell>
                                        <TableCell className="border">{row.integration_id}</TableCell>
                                        <TableCell className="border">{row.isFederalTax}</TableCell>
                                        <TableCell className="border">{row.provStateTaxNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
