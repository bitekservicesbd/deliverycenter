import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { CircleX, Search } from 'lucide-react';
import PageNav from "@/components/server/PageNav";
import TopSearch from "@/components/agent/client/TopSearch";

export default function Index() {
  return (
    <div>
      <TopSearch className="mb-2" />
      <div className="mb-2">
        <PageNav>
          <span className="ms-5 font-bold text-white">General Ledger Search</span>
        </PageNav>
      </div>

      <div className="mb-5 flex flex-wrap">
        <div className="w-full rounded md:w-12/12">
          <div className="w-full">
            <div className="bg-slate-50 dark:bg-zinc-950">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded">
                  <div className="mx-5">
                    <div className="mb-4">
                      <Label>Gl Type:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gl Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Invoiced Transportation Loads">Invoiced Transportation Loads</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="close">Close</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="Number">Number:</Label>
                      <Input type="number" id="Number" placeholder="Number" />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="Batch">Batch #:</Label>
                      <Input type="text" id="Batch" placeholder="Batch" />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="Total-Amount">Total Amount #:</Label>
                      <Input type="number" id="Total-Amount" placeholder="Total Amount" />
                    </div>

                    <div className="mb-4 flex gap-4">
                      <Checkbox id="Deleted" />
                      <Label htmlFor="Deleted">Deleted</Label>
                    </div>
                    <div className="flex gap-4">
                      <Checkbox id="Cancelled" />
                      <Label htmlFor="Cancelled">Cancelled</Label>
                    </div>
                  </div>
                </div>
                <div className="rounded">
                  <div className="mx-5">
                    <div className="w-full">
                      <div className="mb-4">
                        <Label>Company:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Company" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Bitech Services">Bitech Services</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Reference">Reference #:</Label>
                          <Input type="number" id="Reference" placeholder="Reference" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Memo">Memo #:</Label>
                          <Input type="number" id="Memo" placeholder="Memo" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label>Created From Date:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Created From Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-4">
                        <Label>Effective From Date:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Effective From Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded">
                  <div className="mx-5">
                    <div className="w-full">
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Customer-ID">Customer ID #:</Label>
                          <Input type="number" id="Customer-ID" placeholder="Customer ID" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Customer">Customer #:</Label>
                          <Input type="number" id="Customer" placeholder="Customer" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="ApplyTo">ApplyTo #:</Label>
                          <Input type="number" id="ApplyTo" placeholder="ApplyTo" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label>Created To Date:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Created To Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-4">
                        <Label>Effective To Date:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Effective To Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="6/1/2025">6/1/2025</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded">
                  <div className="mx-5">
                    <div className="w-full">
                      <div className="mb-4">
                        <Label>Currency:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="BDT">BDT</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Vendor">Vendor #:</Label>
                          <Input type="number" id="Vendor" placeholder="Vendor" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div>
                          <Label htmlFor="Amount">Amount #:</Label>
                          <Input type="number" id="Amount" placeholder="Amount" />
                        </div>
                      </div>
                      <div>
                        <Label>Payment Method:</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Payment Method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Stripe">Stripe</SelectItem>
                              <SelectItem value="2Checkout">2Checkout</SelectItem>
                              <SelectItem value="Paddle">Paddle</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-2 mt-4 w-full rounded md:mt-0 lg:mt-0">
                <div className="pb-4">
                  <div className="ms-2 flex gap-2">
                    <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                      <Search /> Search
                    </Button>
                    <Button type="button" className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                      <CircleX /> Clear
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="change-status">
        <PageNav>
          <div className="text-center text-white">
            <p>Total Loads: 0</p>
          </div>
        </PageNav>

        <Table>
          <TableHeader className="custom-nav-color">
            <TableRow>
              <TableHead className="border-r border-white px-1 py-2 text-white">Number</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">GL Type</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Batch #</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Created</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Reference</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Customer_ID</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Customer Na.</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Vendor</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Apply To</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Payment M..</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Memo</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Currency</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Effective Date</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Due Date</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Amount</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Tax Amt</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Total Amt</TableHead>
              <TableHead className="border-r border-white px-1 py-2 text-white">Running Bal..</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={18} className="border py-14 text-center font-bold">
                No Data
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Tabs>
    </div>
  );
}
