
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TopButton from '@/components/ui/TopButton';
import { CircleX, FilePenLine, FilePlus2, FileX2, Save, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import TopSearch from "@/components/tenant/client/TopSearch";
import PageNav from "@/components/server/PageNav";

export default function MyContact() {
  const myAccountData = [
    { id: 1, name: 'Specialty House Account', email: '1@2.com', phone: '416', fax: '', mobile: '', active: true, webAccess: false },
    { id: 2, name: 'Elven', email: 'info@bitekservices.com', phone: '', fax: '', mobile: '', active: true, webAccess: true },
  ];
  const [enabled, setEnabled] = useState(false);
  const [method, setMethod] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setMethod(null);
    }
  }, [enabled]);
  return (
    <>
      <TopSearch />
      <PageNav className="my-2 p-2 text-white">
        <p className="font-bold">Edit Customer : 4</p>
      </PageNav>
      <PageNav>
        <p className="text-center font-bold text-white">Total Count: 2</p>
      </PageNav>
      <div className="p-3">
        <div className="mb-4 flex gap-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input type="search" placeholder="Search..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="border dark:border-gray-600">
                <TableHead className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600">
                  <Dialog>
                    <DialogTrigger>
                      <FilePlus2 />
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] !w-3xl overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          <PageNav className="mt-2">
                            <p className="p-1 text-white">Edit Form</p>
                          </PageNav>
                        </DialogTitle>
                        <div className="flex gap-2">
                          <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                          <DialogClose asChild>
                            <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                          </DialogClose>
                        </div>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div>
                          <div className="mb-3 flex gap-2">
                            <Checkbox id="active" />
                            <Label htmlFor="active">Active</Label>
                          </div>
                          <div className="mb-3 flex gap-2">
                            <Checkbox id="web_access" />
                            <Label htmlFor="web_access" className="whitespace-nowrap">
                              Web Access
                            </Label>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div>
                            <Label>Name</Label>
                            <Input />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input type="email" />
                          </div>
                          <div>
                            <Label>Password</Label>
                            <Input type="password" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Checkbox id="2fa" checked={enabled} onCheckedChange={(checked) => setEnabled(!!checked)} />
                          <Label htmlFor="2fa" className="whitespace-nowrap">
                            2-Way Authorization
                          </Label>
                        </div>

                        <RadioGroup className="ms-3" value={method ?? ''} onValueChange={setMethod}>
                          <div className="flex gap-3">
                            <div className="flex gap-2">
                              <RadioGroupItem value="text_message" id="text_message" disabled={!enabled} />
                              <Label
                                htmlFor="text_message"
                                className={`${enabled ? '' : 'text-gray-400'} whitespace-nowrap`}
                              >
                                Text Message
                              </Label>
                            </div>
                            <div className="flex gap-2">
                              <RadioGroupItem value="email" id="email" disabled={!enabled} />
                              <Label htmlFor="email" className={`${enabled ? '' : 'text-gray-400'} whitespace-nowrap`}>
                                Email
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="rounded border p-3">
                        <p className="mb-4 border-b">Send Load Alerts For</p>
                        <div className="mb-4 grid grid-cols-3 gap-3">
                          <div className="flex items-center gap-2">
                            <Checkbox id="new_load_email" />
                            <Label htmlFor="new_load_email">New Load Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="new_load_text" />
                            <Label htmlFor="new_load_text">New Load Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="invoice_excel" />
                            <Label htmlFor="invoice_excel">Invoice Excel</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="dispatch_email" />
                            <Label htmlFor="dispatch_email">Dispatch Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="dispatch_text" />
                            <Label htmlFor="dispatch_text">Dispatch Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="invoice_pdf" />
                            <Label htmlFor="invoice_pdf">Invoice PDF</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="pickup_arrival_email" />
                            <Label htmlFor="pickup_arrival_email">Pickup Arrival Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="pickup_arrival_text" />
                            <Label htmlFor="pickup_arrival_text">Pickup Arrival Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="incl_waybills" />
                            <Label htmlFor="incl_waybills">Incl Waybills</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="pickup_email" />
                            <Label htmlFor="pickup_email">Pickup Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="pickup_text" />
                            <Label htmlFor="pickup_text">Pickup Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="incl_attachments" />
                            <Label htmlFor="incl_attachments">Incl Attachments</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="delivery_arrival_email" />
                            <Label htmlFor="delivery_arrival_email">Delivery Arrival Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="delivery_arrival_text" />
                            <Label htmlFor="delivery_arrival_text">Delivery Arrival Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="statement_excel" />
                            <Label htmlFor="statement_excel">Statement Excel</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="delivered_email" />
                            <Label htmlFor="delivered_email">Delivered Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="delivered_text" />
                            <Label htmlFor="delivered_text">Delivered Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="statement_pdf" />
                            <Label htmlFor="statement_pdf">Statement PDF</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="cancelled_email" />
                            <Label htmlFor="cancelled_email">Cancelled Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="cancelled_text" />
                            <Label htmlFor="cancelled_text">Cancelled Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="show_details" />
                            <Label htmlFor="show_details">Show Details</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="waiting_time_email" />
                            <Label htmlFor="waiting_time_email">Waiting Time Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="waiting_time_text" />
                            <Label htmlFor="waiting_time_text">Waiting Time Via Text</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="incl_invoices" />
                            <Label htmlFor="incl_invoices">Incl Invoices</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="quote_email" />
                            <Label htmlFor="quote_email">Quote Via Email</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="quote_text" />
                            <Label htmlFor="quote_text">Quote Via Text</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="price_change_email" />
                            <Label htmlFor="price_change_email">Price Change Via Email</Label>
                          </div>
                        </div>
                      </div>
                      <div className="rounded border p-3">
                        <p className="mb-4 border-b">Default Address</p>
                        <div>
                          <div className="space-y-2">
                            <Label htmlFor="pickup">Pickup</Label>
                            <div className="flex gap-2">
                              <Input id="pickup" defaultValue="11359" />
                              <Button variant="outline" size="icon">
                                <Search className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="delivery">Delivery</Label>
                            <div className="flex gap-2">
                              <Input id="delivery" />
                              <Button variant="outline" size="icon">
                                <Search className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded border p-3">
                        <p className="mb-4 border-b">Default Page</p>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <Label>Default Page</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="class_a">My Order</SelectItem>
                                <SelectItem value="class_a">My Account</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Default Load Search Status</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Default Service Class</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="class_a">Class A</SelectItem>
                                <SelectItem value="class_b">Class B</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="show_total_price" />
                            <Label htmlFor="show_total_price">Show Total Price On Waybill</Label>
                          </div>

                          <div>
                            <Label>Default Vehicle</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="van">Van</SelectItem>
                                <SelectItem value="truck">Truck</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="show_detail_pricing" />
                            <Label htmlFor="show_detail_pricing">Show Detail Pricing On Waybill</Label>
                          </div>
                          <div>
                            <Label>Default Package</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="express">Express</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="time_offset">Time Offset</Label>
                            <Input type="number" id="time_offset" />
                          </div>
                        </div>
                      </div>
                      <div className="rounded border p-3">
                        <p className="mb-4 border-b">Security Settings</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_new_order" />
                            <Label htmlFor="allow_new_order">Allow New Order</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_accounting" />
                            <Label htmlFor="allow_accounting">Allow Accounting</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_dashboard" />
                            <Label htmlFor="allow_dashboard">Allow Dashboard</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_importer" />
                            <Label htmlFor="allow_importer">Allow Importer</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_load_search" />
                            <Label htmlFor="allow_load_search">Allow Load Search</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_contacts" />
                            <Label htmlFor="allow_contacts">Allow Contacts</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="allow_addresses" />
                            <Label htmlFor="allow_addresses">Allow Addresses</Label>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Name</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Email</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Phone</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Fax</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Mobile</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Active</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Web Access</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {myAccountData.map((data) => (
                <TableRow key={data.id} className="dark:border-gray-600">
                  <TableCell className="flex justify-center gap-2 p-2">
                    <FilePenLine className="text-blue-500" />
                    <FileX2 className="text-red-500" />
                  </TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{data.name}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{data.email}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{data.phone}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{data.fax}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{data.mobile}</TableCell>
                  <TableCell className="border-s p-2 text-center dark:border-gray-600">
                    <Checkbox defaultChecked={data.active} />
                  </TableCell>
                  <TableCell className="border-s p-2 text-center dark:border-gray-600">
                    <Checkbox defaultChecked={data.webAccess} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
