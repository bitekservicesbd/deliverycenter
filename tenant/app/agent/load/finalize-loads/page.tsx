import PageNav from "@/components/server/PageNav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { CircleX, Printer, SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TopSearch from "@/components/agent/client/TopSearch";

export default function FinalizeLoads() {
  return (
    <div>
      <TopSearch />
      <form className="mt-5">
        <div className="space-y-6 p-4">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Finalizing Loads Column */}
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                  <p className="mb-4 border-b border-slate-400 pb-2 font-bold">
                    Finalizing Loads
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Load Status:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="delivered">
                              Delivered Transportation Loads
                            </SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="close">Close</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="load-input"
                        className="text-sm font-medium"
                      >
                        Load #:
                      </Label>
                      <Input
                        type="text"
                        id="load-input"
                        placeholder="Load"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="waybill" className="text-sm font-medium">
                        Waybill #:
                      </Label>
                      <Input
                        type="text"
                        id="waybill"
                        placeholder="Waybill"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-medium">
                        Service #:
                      </Label>
                      <Input
                        type="text"
                        id="service"
                        placeholder="Service"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="customer-code"
                        className="text-sm font-medium"
                      >
                        Customer Code #:
                      </Label>
                      <Input
                        type="text"
                        id="customer-code"
                        placeholder="Customer Code"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="carrier-code"
                        className="text-sm font-medium"
                      >
                        Carrier Code #:
                      </Label>
                      <Input
                        type="text"
                        id="carrier-code"
                        placeholder="Carrier Code"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Start Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="date1">Date Option 1</SelectItem>
                            <SelectItem value="date2">Date Option 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caller" className="text-sm font-medium">
                        Caller #:
                      </Label>
                      <Input
                        type="text"
                        id="caller"
                        placeholder="Caller"
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Label
                        htmlFor="child-loads"
                        className="text-sm font-medium"
                      >
                        Child Loads?
                      </Label>
                      <Checkbox id="child-loads" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="reference"
                        className="text-sm font-medium"
                      >
                        Reference:
                      </Label>
                      <Input
                        type="text"
                        id="reference"
                        placeholder="Reference"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="po" className="text-sm font-medium">
                        P.O. #:
                      </Label>
                      <Input
                        type="text"
                        id="po"
                        placeholder="P.O. #"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle" className="text-sm font-medium">
                        Vehicle:
                      </Label>
                      <Input
                        type="text"
                        id="vehicle"
                        placeholder="Vehicle"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer" className="text-sm font-medium">
                        Customer:
                      </Label>
                      <Input
                        type="text"
                        id="customer"
                        placeholder="Customer"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carrier" className="text-sm font-medium">
                        Carrier:
                      </Label>
                      <Input
                        type="text"
                        id="carrier"
                        placeholder="Carrier"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>End Date:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="End Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="date1">Date Option 1</SelectItem>
                            <SelectItem value="date2">Date Option 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Pickup Column */}
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                  <p className="mb-4 border-b border-slate-400 pb-2 font-bold">
                    Pickup
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-name"
                        className="text-sm font-medium"
                      >
                        Name #:
                      </Label>
                      <Input
                        type="text"
                        id="pickup-name"
                        placeholder="Name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-state"
                        className="text-sm font-medium"
                      >
                        State:
                      </Label>
                      <Input
                        type="text"
                        id="pickup-state"
                        placeholder="State"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-city"
                        className="text-sm font-medium"
                      >
                        City:
                      </Label>
                      <Input
                        type="text"
                        id="pickup-city"
                        placeholder="City"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="pickup-postal"
                        className="text-sm font-medium"
                      >
                        Postal:
                      </Label>
                      <Input
                        type="text"
                        id="pickup-postal"
                        placeholder="Postal"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="h-full rounded-lg bg-slate-50 p-4 dark:bg-zinc-950">
                <p className="mb-4 border-b border-slate-400 pb-2 font-bold">
                  Delivery
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="delivery-name"
                      className="text-sm font-medium"
                    >
                      Name #:
                    </Label>
                    <Input
                      type="text"
                      id="delivery-name"
                      placeholder="Name"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="delivery-state"
                      className="text-sm font-medium"
                    >
                      State:
                    </Label>
                    <Input
                      type="text"
                      id="delivery-state"
                      placeholder="State"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="delivery-city"
                      className="text-sm font-medium"
                    >
                      City:
                    </Label>
                    <Input
                      type="text"
                      id="delivery-city"
                      placeholder="City"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="delivery-postal"
                      className="text-sm font-medium"
                    >
                      Postal:
                    </Label>
                    <Input
                      type="text"
                      id="delivery-postal"
                      placeholder="Postal"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-2 mt-5 lg:ms-5">
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" /> Search
            </Button>
            <Button type="button" className="flex items-center gap-2">
              <CircleX className="h-4 w-4" /> Clear
            </Button>
            <Button type="button" className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> View Report
            </Button>
          </div>
        </div>
        <div>
          <div className="mt-5 flex w-full flex-col gap-4 p-2 sm:flex-row sm:items-center lg:ms-5 lg:max-w-4xl">
            <Label className="sm:w-auto lg:w-1/4">
              Effective Finalize Date:
            </Label>
            <Select defaultValue="7/14/2025">
              <SelectTrigger className="sm:w-auto lg:w-1/4">
                <SelectValue placeholder="Effective Finalize Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7/14/2025">7/14/2025</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="close">Close</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="button" className="sm:w-auto">
              Finalize Selected Loads
            </Button>
          </div>
        </div>

        <Tabs defaultValue="change-status">
          <PageNav className="mt-2 py-2">
            <div className="text-center">
              <span className="text-center text-white">
                Total Load: 0 AND selected loads: 0
              </span>
            </div>
          </PageNav>
          {/* table */}
          <div className="w-full overflow-x-auto border">
            <Table className="w-full min-w-max">
              <TableHeader>
                <TableRow className="mx-1 bg-slate-400">
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Load..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Create..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Custo..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Custo..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Called..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Refere..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Stop..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Service..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Status..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Dipot..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    HasChi..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Shippe..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                  <TableHead className="border-r border-white px-1 py-2 text-xs">
                    Consing..
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={29}
                    className="py-14 text-center font-bold"
                  >
                    No Data
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </form>
    </div>
  );
}
