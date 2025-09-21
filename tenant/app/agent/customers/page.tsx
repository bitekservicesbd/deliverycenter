import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronDown, CircleX, Search, Share, UserPlus } from 'lucide-react';
import PageNav from "@/components/server/PageNav";
import Link from "next/link";
import TopSearch from "@/components/agent/client/TopSearch";

export default function Index() {
  return (
    <div>
      <TopSearch className="mb-2" />
      <div className="mb-2">
        <PageNav className="py-2">
          <span className="ms-5 font-bold text-white">Customer Search</span>
        </PageNav>
      </div>
      {/* top bar end*/}
      <div className="bg-slate-50 dark:bg-zinc-950">
        <div className="grid grid-cols-1 items-center gap-3 p-3 sm:grid-cols-3 md:grid-cols-5">
          <div>
            <Label htmlFor="Customer-ID">Customer ID #:</Label>
            <Input type="text" id="Customer-ID" placeholder="Customer ID" />
          </div>
          <div>
            <Label htmlFor="Account-Code">Account Code #:</Label>
            <Input type="text" id="Account-Code" placeholder="Account Code" />
          </div>
          <div>
            <Label htmlFor="Name">Name #:</Label>
            <Input type="text" id="Name" placeholder="Name" />
          </div>
          <div>
            <Label>Customer Type:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Type A">Type A</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Warehouse:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="Street">Street #:</Label>
            <Input type="text" id="Street" placeholder="Street" />
          </div>
          <div>
            <Label htmlFor="City">City #:</Label>
            <Input type="text" id="City" placeholder="City" />
          </div>
          <div>
            <Label htmlFor="Province">Province #:</Label>
            <Input type="text" id="Province" placeholder="Province" />
          </div>
          <div>
            <Label htmlFor="Country">Country #:</Label>
            <Input type="text" id="Country" placeholder="Country" />
          </div>
          <div>
            <Label htmlFor="Postal-Code">Postal Code #:</Label>
            <Input type="text" id="Postal-Code" placeholder="Postal Code" />
          </div>
          <div>
            <Label>Billing Group:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Billing Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Net Terms:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Net Terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex gap-4">
              <Label htmlFor="Active">Active? :</Label>
              <Checkbox id="Active" />
            </div>
          </div>
          <div>
            <div className="flex gap-4">
              <Label htmlFor="Has End Date">Has End Date? :</Label>
              <Checkbox id="Has End Date" />
            </div>
          </div>
        </div>
        <div className="mb-4 w-full p-3 sm:w-1/2">
          <Label htmlFor="Where-Clause">Where Clause:</Label>
          <Textarea id="Where-Clause" />
        </div>

        <div className="w-full rounded">
          <div className="mx-2 pb-4">
            <div className="ms-2 flex justify-center gap-2 sm:justify-start">
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

      <PageNav className="py-2">
        <div className="relative flex w-full items-center">
          <div className="z-10 flex-none">
            <Button asChild className="ms-2 bg-sky-900 hover:bg-sky-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
              <Link href={`/tenant/customers/create`} className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                Add Customer
              </Link>
            </Button>
          </div>
          <div className="flex-1 text-center text-white select-text">
            <p>Total Customers: 2</p>
          </div>
        </div>
      </PageNav>

      {/* table */}
      <div className="">
        <div className="my-2 flex items-center justify-between bg-zinc-100 dark:text-white dark:hover:bg-zinc-950">
          <div className="ms-2">
            <p>Drag a column header here to group by the column</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-sky-900 hover:bg-sky-950">
                {' '}
                <Share /> Export <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Export all data to Excel</DropdownMenuItem>
                <DropdownMenuItem>Export selected row to Excel</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <Table className="min-w-full text-left text-sm rtl:text-right">
            <TableHeader className="custom-nav-color">
              <TableRow>
                <TableHead className="border-r border-white px-1 py-2 text-white">Customer</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Customer ID</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Account Code</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Customer Type</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Active</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Deleted</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Customer Ad..</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Customer Ad..</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">City</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Province</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Country</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Postal Code</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Phone Number</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Contact Name</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Contact Email</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Billing Group</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Net Terms</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Credit Limits</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Invoice Bal..</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Load Balance</TableHead>
                <TableHead className="border-r border-white px-1 py-2 text-white">Total Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: 'John Doe',
                  id: 2,
                  account: 2,
                  type: 'Courier',
                  active: true,
                  deleted: '',
                  address1: 'Ref John Doe',
                  address2: 'Ref John Doe',
                  city: 'Rajshahi',
                  province: 'Rajshahi',
                  country: 'Rajshahi',
                  postal: '12455',
                  phone: '01685235328',
                  contactName: 'John Doe',
                  contactEmail: 'example@gmail.com',
                  billing: 'Weekly',
                  terms: 'On Receipt',
                  credit: '989998',
                  invoice: '545145',
                  loadBal: '4454454',
                  totalBal: '7752474',
                },
                {
                  name: 'John Doe',
                  id: 2,
                  account: 2,
                  type: 'Courier',
                  active: true,
                  deleted: '',
                  address1: 'Ref John Doe',
                  address2: 'Ref John Doe',
                  city: 'Rajshahi',
                  province: 'Rajshahi',
                  country: 'Rajshahi',
                  postal: '12455',
                  phone: '01685235328',
                  contactName: 'John Doe',
                  contactEmail: 'example@gmail.com',
                  billing: 'Weekly',
                  terms: 'On Receipt',
                  credit: '989998',
                  invoice: '545145',
                  loadBal: '4454454',
                  totalBal: '7752474',
                },
                // You can add more rows here...
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.account}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell className="text-green-600">{row.active && <Check className="h-4 w-4" />}</TableCell>
                  <TableCell>{row.deleted}</TableCell>
                  <TableCell>{row.address1}</TableCell>
                  <TableCell>{row.address2}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.province}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.postal}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.contactName}</TableCell>
                  <TableCell className="text-blue-600">{row.contactEmail}</TableCell>
                  <TableCell>{row.billing}</TableCell>
                  <TableCell>{row.terms}</TableCell>
                  <TableCell>{row.credit}</TableCell>
                  <TableCell>{row.invoice}</TableCell>
                  <TableCell>{row.loadBal}</TableCell>
                  <TableCell>{row.totalBal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
