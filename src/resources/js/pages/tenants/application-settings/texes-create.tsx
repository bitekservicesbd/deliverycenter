import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TenantLayout from '@/layouts/tenant/tenant-app-layout';
import { Head } from '@inertiajs/react';
import { Save } from 'lucide-react';

export default function DataTable() {
    return (
        <TenantLayout>
            <Head title="Texes Create" />
            <div>
                <TopSearch className="mb-2" />
                <div className="mb-2">
                    <PageNav>
                        <p className="ps-3 text-white">Texes Create</p>
                    </PageNav>
                </div>
                <div className="mx-2">
                    <div className="rounded border">
                        <Card className="m-3 w-full md:w-2/4">
                            <CardContent>
                                <div className="flex flex-wrap">
                                    <div className="md:w-1/2">
                                        <div className="grid p-3">
                                            <div className="mt-5 grid">
                                                <Label htmlFor="Description" className="ms-2 mb-2">
                                                    Description
                                                </Label>
                                                <Input id="Description" placeholder="Description" />
                                            </div>
                                            <div className="mt-5 grid">
                                                <Label htmlFor="GL-code" className="ms-2 mb-2">
                                                    GL Code
                                                </Label>
                                                <Input id="GL-code" placeholder="GL Code" />
                                            </div>

                                            <div className="mt-5 grid">
                                                <Label htmlFor="Tax_Amount" className="ms-2 mb-2">
                                                    Tax_Amount
                                                </Label>
                                                <Input id="Tax_Amount" placeholder="Tax_Amount" />
                                            </div>
                                            <div className="mt-5 grid">
                                                <Label htmlFor="Federal-Tax-Number" className="ms-2 mb-2">
                                                    Federal Tax Number
                                                </Label>
                                                <Input id="Federal-Tax-Number" placeholder="Federal Tax Number" />
                                            </div>
                                            <div className="mt-5 grid">
                                                <Label htmlFor="Integration_ID" className="ms-2 mb-2">
                                                    Integration_ID
                                                </Label>
                                                <Input id="Integration_ID" placeholder="Integration_ID" />
                                            </div>
                                            <div className="mt-5 flex gap-3">
                                                <Checkbox id="IsFederalTax" />
                                                <Label htmlFor="IsFederalTax" className="ms-2 mb-2">
                                                    IsFederalTax
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:mt-3 md:w-1/2">
                                        <div className="mt-5 grid">
                                            <Label htmlFor="CreatedDate" className="ms-2 mb-2">
                                                CreatedDate
                                            </Label>
                                            <Input id="CreatedDate" placeholder="CreatedDate" />
                                        </div>
                                        <div className="mt-5 grid">
                                            <Label htmlFor="CreatedBy_ID" className="ms-2 mb-2">
                                                CreatedBy_ID
                                            </Label>
                                            <Input id="CreatedBy_ID" placeholder="CreatedBy_ID" />
                                        </div>
                                        <div className="mt-5 grid">
                                            <Label htmlFor="LastUpdatedDate" className="ms-2 mb-2">
                                                LastUpdatedDate
                                            </Label>
                                            <Input id="LastUpdatedDate" placeholder="LastUpdatedDate" />
                                        </div>
                                        <div className="mt-5 grid">
                                            <Label htmlFor="LastUpdatedBy_ID" className="ms-2 mb-2">
                                                LastUpdatedBy_ID
                                            </Label>
                                            <Input id="LastUpdatedBy_ID" placeholder="LastUpdatedBy_ID" />
                                        </div>
                                        <div className="mt-5 grid">
                                            <Label htmlFor="CreatedDate" className="ms-2 mb-2">
                                                IsDeleted
                                            </Label>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="IsDeleted" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="True">True</SelectItem>
                                                    <SelectItem value="False">False</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Button type="button" className={'my-1 bg-sky-900 hover:bg-sky-950'}>
                                        <Save /> Save
                                    </Button>
                                    <Button type="button" className={'my-1 bg-sky-900 hover:bg-sky-950'}>
                                        Change Log
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
