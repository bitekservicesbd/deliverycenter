"use client";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon, FilePlus, Play, Printer } from "lucide-react";
import { useState } from "react";
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";
import Customer from "@/components/agent/client/Customer";

export default function ScheduleManualInvoice() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endBy, setEndBy] = useState<Date | undefined>(new Date());
  const [endByOpen, setEndByOpen] = useState(false);

  return (
    <div>
      <TopSearch className="mb-3" />
      <div className="flex flex-wrap">
        <div className="w-full rounded md:w-5/12">
          <div className="p-4">
            {/* buttons */}
            <div className="mt-5 flex gap-3">
              <Button
                type="button"
                className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
              >
                <Play /> Run Schedule
              </Button>
            </div>

            {/* table */}
            <div className="mt-5 border pb-60">
              <p className="p-2 font-bold">Schedule Invoices</p>
              <Table className="w-full">
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      #
                    </TableHead>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      ID
                    </TableHead>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      Customer
                    </TableHead>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      Created Dt
                    </TableHead>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      Created By
                    </TableHead>
                    <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                      Enabled
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="border-b py-5 text-center"
                    >
                      No data to display
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="w-full rounded md:w-7/12">
          <Tabs defaultValue="Manual-Invoice">
            <PageNav>
              <TabsList>
                <TabsTrigger value="Manual-Invoice">Manual Invoice</TabsTrigger>
                <TabsTrigger value="Schedule-Settings">
                  Schedule Settings
                </TabsTrigger>
              </TabsList>
            </PageNav>
            <div>
              <TabsContent value="Manual-Invoice">
                <div className="border p-4">
                  <div>
                    <Customer value={"Search"} onChange={() => {}} />
                  </div>
                  {/* table */}
                  <div className="mt-5 border pb-32">
                    <Table className="w-full">
                      <TableHeader className="w-full">
                        <TableRow>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            <FilePlus />
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            Description
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            Qty
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            Client Rate
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            Client Amount
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            Fed Tax
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            State/Prov Tax
                          </TableHead>
                          <TableHead className="custom-nav-color border-r px-1 py-2 text-white">
                            GL Code
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="border-b py-5 text-center"
                          >
                            No data to display
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="w-full rounded">
                    <div className="mt-6">
                      <Label htmlFor="Comments">Comments:</Label>
                      <Textarea id="Comments" />
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="mt-5 flex gap-3">
                    <Button
                      type="button"
                      className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
                    >
                      <FilePlus /> New
                    </Button>
                    <Button
                      type="button"
                      className="bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
                    >
                      <Printer /> Save
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="Schedule-Settings">
                <div className="border p-4">
                  <p className="mb-4">
                    Please specify the period during which the schedule will
                    execute
                  </p>

                  <div className="mb-4 flex gap-4">
                    <div>
                      <h5 className="text-lg font-semibold">Schedule Range:</h5>
                    </div>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          className="h-4 w-4"
                          id="schedule_range_enabled"
                        />
                        <Label htmlFor="schedule_range_enabled">Enabled</Label>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Label>Start Date:</Label>
                        <Popover
                          open={startDateOpen}
                          onOpenChange={setStartDateOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="min-w-[180px] justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                            >
                              {startDate ? (
                                startDate.toLocaleDateString()
                              ) : (
                                <span>Start date</span>
                              )}
                              <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200"
                            align="end"
                          >
                            <CalendarComponent
                              mode="single"
                              captionLayout="dropdown"
                              selected={startDate}
                              onSelect={(selectedDate) => {
                                setStartDate(selectedDate);
                                setStartDateOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <p className="text-sm text-gray-600">
                        (All settings will work in reference to the start date
                        to create the manual invoice)
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="endOption"
                            id="no_end_date"
                          />
                          <Label htmlFor="no_end_date">No End Date</Label>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <input type="radio" name="endOption" id="end_after" />
                          <Label htmlFor="end_after">End After</Label>
                          <Input type="number" className="w-20" />
                          <span>occurrences</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <input type="radio" name="endOption" id="end_by" />
                          <Label htmlFor="end_by">End By</Label>
                          <Popover open={endByOpen} onOpenChange={setEndByOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="min-w-[180px] justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                              >
                                {endBy ? (
                                  endBy.toLocaleDateString()
                                ) : (
                                  <span>End by</span>
                                )}
                                <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200"
                              align="end"
                            >
                              <CalendarComponent
                                mode="single"
                                captionLayout="dropdown"
                                selected={endBy}
                                onSelect={(selectedDate) => {
                                  setEndBy(selectedDate);
                                  setEndByOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <h5 className="text-lg font-semibold">Schedule Type:</h5>
                    <div className="flex flex-wrap items-center gap-4">
                      {["daily", "weekly", "monthly", "yearly"].map((type) => (
                        <div key={type} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="scheduleType"
                            id={`schedule_type_${type}`}
                          />
                          <Label htmlFor={`schedule_type_${type}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 flex gap-4">
                    <div>
                      <h5 className="text-lg font-semibold">
                        Weekly Settings:
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Label htmlFor="weekly_recur">Recur every</Label>
                        <Input type="number" className="w-16" placeholder="1" />
                        <span>week(s) on</span>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {[
                          "sunday",
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                        ].map((day) => (
                          <div key={day} className="flex items-center gap-1">
                            <Checkbox className="h-4 w-4" id={day} checked />
                            <Label htmlFor={day}>
                              {day.slice(0, 3).toUpperCase()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex gap-4">
                    <div>
                      <h5 className="text-lg font-semibold">
                        Monthly Settings:
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="radio"
                          name="monthlyType"
                          id="day"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="day">Day</Label>
                        <Input type="number" className="w-32" placeholder="1" />
                        <span>of every</span>
                        <Input type="number" className="w-32" placeholder="1" />
                        <span>month(s)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="radio"
                          name="monthlyType"
                          id="the"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="the">The</Label>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="First" />
                          </SelectTrigger>
                          <SelectContent>
                            {["first", "second", "third", "fourth", "last"].map(
                              (val) => (
                                <SelectItem key={val} value={val}>
                                  {val.charAt(0).toUpperCase() + val.slice(1)}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "sunday",
                              "monday",
                              "tuesday",
                              "wednesday",
                              "thursday",
                              "friday",
                              "saturday",
                            ].map((day) => (
                              <SelectItem key={day} value={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>of every</span>
                        <Input type="number" className="w-16" placeholder="1" />
                        <span>month(s)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex gap-4">
                    <div>
                      <h5 className="text-lg font-semibold">
                        Yearly Settings:
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="radio"
                          name="yearlyType"
                          id="every"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="every">Every</Label>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="January" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "january",
                              "february",
                              "march",
                              "april",
                              "may",
                              "june",
                              "july",
                              "august",
                              "september",
                              "october",
                              "november",
                              "december",
                            ].map((month) => (
                              <SelectItem key={month} value={month}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input type="number" className="w-16" placeholder="1" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="radio"
                          name="yearlyType"
                          id="yearly_the"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="yearly_the">The</Label>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="First" />
                          </SelectTrigger>
                          <SelectContent>
                            {["first", "second", "third", "fourth", "last"].map(
                              (val) => (
                                <SelectItem key={val} value={val}>
                                  {val.charAt(0).toUpperCase() + val.slice(1)}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "sunday",
                              "monday",
                              "tuesday",
                              "wednesday",
                              "thursday",
                              "friday",
                              "saturday",
                            ].map((day) => (
                              <SelectItem key={day} value={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>of</span>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="January" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "january",
                              "february",
                              "march",
                              "april",
                              "may",
                              "june",
                              "july",
                              "august",
                              "september",
                              "october",
                              "november",
                              "december",
                            ].map((month) => (
                              <SelectItem key={month} value={month}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
