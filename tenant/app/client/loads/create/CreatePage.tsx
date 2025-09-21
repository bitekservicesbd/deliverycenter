'use client'
// import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from '@/components/server/PageNav';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TopButton from '@/components/ui/TopButton';

import { ArrowLeftRight, CircleOff, CircleX, Copy, Edit, MapPin, Plus, PlusIcon, Printer, RefreshCcw, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopDropdownButton from '@/components/ui/TopDropdownButton';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, 'Please select an email to display.')
    .email(),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast('You submitted the following values', {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

export default function Index() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [open, setOpen] = React.useState(false);
  const [end_open, end_setOpen] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [end_date, end_setDate] = React.useState<Date | undefined>(undefined);

  const [shipToOpen, setShipToOpen] = React.useState(false);
  const [shipToDate, setShipToDate] = React.useState<Date | undefined>(undefined);

  const [shipToEndOpen, setShipToEndOpen] = React.useState(false);
  const [shipToEndDate, setShipToEndDate] = React.useState<Date | undefined>(undefined);

  const [createDateOpen, setCreateDateOpen] = React.useState(false);
  const [createDate, setCreateDate] = React.useState<Date | undefined>(undefined);

  const [DispatchedDateOpen, setDispatchedDateOpen] = React.useState(false);
  const [DispatchedDate, setDispatchedDate] = React.useState<Date | undefined>(undefined);

  const [CancelledDateOpen, setCancelledDateOpen] = React.useState(false);
  const [CancelledDate, setCancelledDate] = React.useState<Date | undefined>(undefined);

  const [vehicle_unit, setVehicleUnit] = React.useState('LB');
  const [dim_unit, setDimUnit] = React.useState('LB');
  const [distance_unit] = React.useState('KM');
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <div className="mb-3">
                  <TopSearch />
                </div>
                <div className="container mx-2 overflow-x-auto">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="mt-3 flex flex-wrap gap-2 md:mt-0">
                      <TopDropdownButton
                        icon={Save}
                        label="Save"
                        onClick={() => console.log('Main button clicked')}
                        dropdownItems={[
                          { label: 'Save $ Print', onClick: () => console.log('Save') },
                          { label: 'Save & New', onClick: () => console.log('Save & Print') },
                          { label: 'Save & Close', onClick: () => console.log('Save & Exit') }
                        ]}
                      />

                      <TopButton icon={Edit} label="Edit" onClick={() => { }} />
                      <TopButton icon={CircleOff} label="Cancel" onClick={() => { }} />
                      <TopButton icon={Copy} label="Duplicate" onClick={() => { }} />
                      <TopButton icon={ArrowLeftRight} label="Return Load" onClick={() => { }} />
                      <TopButton icon={Printer} label="Forms" onClick={() => { }} />
                      <TopButton icon={CircleX} label="Close" onClick={() => { }} />
                    </div>
                  </div>

                  <Tabs defaultValue="load_info" className="mt-3">
                    <PageNav>
                      <TabsList>
                        <TabsTrigger value="load_info" className="ps-4">
                          LOAD INFO
                        </TabsTrigger>
                        <TabsTrigger value="CHARGES">CHARGES</TabsTrigger>
                        <TabsTrigger value="NOTE">NOTE</TabsTrigger>
                        <TabsTrigger value="FILES">FILES</TabsTrigger>
                      </TabsList>
                    </PageNav>
                    <TabsContent value="load_info">
                      <div className="mt-3">
                        <div className="flex flex-wrap">
                          <div className="w-full rounded md:w-2/2 xl:w-1/3">
                            <div className="mx-2 bg-slate-50 px-4 pb-5 dark:bg-zinc-950">
                              <FormItem>
                                <div className="mt-3">
                                  <FormLabel>Customer</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a customer" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="John">John</SelectItem>
                                      <SelectItem value="Paul">Paul</SelectItem>
                                      <SelectItem value="Ringo">Ringo</SelectItem>
                                      <SelectItem value="George">George</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </div>
                                <div className="mt-3 flex">
                                  <div className="mx-1 md:w-1/3">
                                    <FormLabel>Called In By</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Called In By" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                  <div className="mx-1 md:w-2/3">
                                    <FormLabel>Service Class</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Service Class" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                </div>
                                <div className="mt-3 flex">
                                  <div className="mx-1 md:w-2/3">
                                    <FormLabel>Department ID</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Department ID" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                  <div className="mx-1 md:w-1/3">
                                    <FormLabel>RO</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="RO" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                </div>
                              </FormItem>
                            </div>

                            <div className="mx-2 mt-3 bg-slate-50 px-4 pt-1 pb-5 dark:bg-zinc-950">
                              <Tabs defaultValue="SHIP_FROM">
                                <div>
                                  <PageNav>
                                    <TabsList>
                                      <TabsTrigger value="SHIP_FROM">SHIP FROM</TabsTrigger>
                                      <TabsTrigger value="POP">POP</TabsTrigger>
                                    </TabsList>
                                  </PageNav>
                                </div>
                                <TabsContent value="SHIP_FROM">
                                  <div>
                                    <div>
                                      <p className="mt-2 font-bold">Planed Ship Date Window</p>
                                      <div className="mt-2">
                                        <div className="grid">
                                          <div className="mx-1 mt-3 w-full">
                                            <div className="">
                                              <div className="grid md:flex md:flex-col">
                                                <Label htmlFor="date-picker" className="px-1">
                                                  Ready Time
                                                </Label>
                                                {/* <Input type="datetime-local" id="date-picker" /> */}
                                                <Popover open={open} onOpenChange={setOpen}>
                                                  <div className="flex">
                                                    <PopoverTrigger asChild>
                                                      <Button
                                                        variant="outline"
                                                        id="date-picker"
                                                        className="w-32 justify-between font-normal"
                                                      >
                                                        {date
                                                          ? date.toLocaleDateString()
                                                          : 'Select date'}
                                                        <ChevronDownIcon />
                                                      </Button>
                                                    </PopoverTrigger>
                                                    <Input
                                                      type="time"
                                                      id="time-picker"
                                                      step="1"
                                                      defaultValue="10:30:00"
                                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                    />
                                                  </div>
                                                  <PopoverContent
                                                    className="w-auto overflow-hidden p-0"
                                                    align="start"
                                                  >
                                                    <Calendar
                                                      mode="single"
                                                      selected={date}
                                                      captionLayout="dropdown"
                                                      onSelect={(date) => {
                                                        setDate(date);
                                                        setOpen(false);
                                                      }}
                                                    />
                                                  </PopoverContent>
                                                </Popover>
                                              </div>
                                              <div className="flex flex-col"></div>
                                            </div>
                                          </div>
                                          <div className="mx-1 mt-3 w-full">
                                            <div className="">
                                              <div className="flex flex-col">
                                                <Label htmlFor="end-date-picker" className="px-1">
                                                  End
                                                </Label>
                                                {/* <Input type="datetime-local" id="end-date-picker" /> */}
                                                <Popover open={end_open} onOpenChange={end_setOpen}>
                                                  <div className="flex">
                                                    <PopoverTrigger asChild>
                                                      <Button
                                                        variant="outline"
                                                        id="end-date-picker"
                                                        className="w-32 justify-between font-normal"
                                                      >
                                                        {end_date
                                                          ? end_date.toLocaleDateString()
                                                          : 'Select date'}
                                                        <ChevronDownIcon />
                                                      </Button>
                                                    </PopoverTrigger>
                                                    <Input
                                                      type="time"
                                                      id="end-time-picker"
                                                      step="1"
                                                      defaultValue="10:30:00"
                                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                    />
                                                  </div>
                                                  <PopoverContent
                                                    className="w-auto overflow-hidden p-0"
                                                    align="start"
                                                  >
                                                    <Calendar
                                                      mode="single"
                                                      selected={end_date}
                                                      captionLayout="dropdown"
                                                      onSelect={(end_date) => {
                                                        end_setDate(end_date);
                                                        end_setOpen(false);
                                                      }}
                                                    />
                                                  </PopoverContent>
                                                </Popover>
                                              </div>
                                              <div className="flex flex-col"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-md mt-3 font-bold">Appt. (Pickup)</p>
                                          <hr />
                                          <div className="mt-2">
                                            <div className="w-1/3">
                                              <div className="flex justify-between">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>
                                            </div>
                                            <div className="mt-2 w-1/3">
                                              <div className="flex justify-between">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Created
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-3">
                                          <hr />
                                          <div>
                                            <div className="mt-2 grid grid-cols-4 gap-4">
                                              {/* Icon and Button */}
                                              <div className="flex flex-col items-center gap-2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                                                  <MapPin />
                                                </div>
                                                <Button variant="outline">Save Address</Button>
                                              </div>

                                              {/* First Column of Checkboxes */}
                                              <div className="flex flex-col gap-2">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Name Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Image Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>

                                              {/* Second Column of Checkboxes */}
                                              <div className="flex flex-col gap-2">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Sign Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Requires Tallgate
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>

                                              <div className="flex flex-col items-center gap-2">
                                                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                                                  <RefreshCcw />
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="mt-2">
                                                <FormLabel>Address Type</FormLabel>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl className="w-full">
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select Address Type" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </div>
                                            </div>

                                            <div className="mt-5">
                                              <div className="block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="name">Name</Label>
                                                  <Input type="text" id="name" placeholder="Name" />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="code">Code</Label>
                                                  <Input
                                                    type="number"
                                                    id="code"
                                                    placeholder="Code"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Strate_One">Strate 1</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Strate_One"
                                                  placeholder="Strate 1"
                                                />
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Strate_Two">Strate 2</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Strate_Two"
                                                  placeholder="Strate 2"
                                                />
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="city">City</Label>
                                                  <Input type="text" id="city" placeholder="City" />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <FormLabel>Province</FormLabel>
                                                  <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                  >
                                                    <FormControl className="w-full">
                                                      <SelectTrigger>
                                                        <SelectValue placeholder="Select Province" />
                                                      </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                      <SelectItem value="Rajshahi">
                                                        Rajshahi
                                                      </SelectItem>
                                                      <SelectItem value="Rangpur">
                                                        Rangpur
                                                      </SelectItem>
                                                      <SelectItem value="Dhaka">
                                                        Dhaka
                                                      </SelectItem>
                                                      <SelectItem value="Chittagong">
                                                        Chittagong
                                                      </SelectItem>
                                                      <SelectItem value="Khulna">
                                                        Khulna
                                                      </SelectItem>
                                                      <SelectItem value="Barishal">
                                                        Barishal
                                                      </SelectItem>
                                                      <SelectItem value="Sylhet">
                                                        Sylhet
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                  <FormMessage />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Postal_Code">Postal Code</Label>
                                                  <Input
                                                    type="text"
                                                    id="Postal_Code"
                                                    placeholder="Postal Code"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <FormLabel>Country</FormLabel>
                                                  <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                  >
                                                    <FormControl className="w-full">
                                                      <SelectTrigger>
                                                        <SelectValue placeholder="Select Country" />
                                                      </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                      <SelectItem value="Bangladesh">
                                                        Bangladesh
                                                      </SelectItem>
                                                      <SelectItem value="Pakistan">
                                                        Pakistan
                                                      </SelectItem>
                                                      <SelectItem value="Nepal">
                                                        Nepal
                                                      </SelectItem>
                                                      <SelectItem value="Srilanka">
                                                        Srilanka
                                                      </SelectItem>
                                                      <SelectItem value="Bhutan">
                                                        Bhutan
                                                      </SelectItem>
                                                      <SelectItem value="Myanmar">
                                                        Myanmar
                                                      </SelectItem>
                                                      <SelectItem value="Maldives">
                                                        Maldives
                                                      </SelectItem>
                                                      <SelectItem value="Thailand">
                                                        Thailand
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                  <FormMessage />
                                                </div>
                                              </div>
                                              <div className="mt-3">
                                                <FormLabel>Zone</FormLabel>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl className="w-full">
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select Zone" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="Bangladesh">
                                                      Bangladesh
                                                    </SelectItem>
                                                    <SelectItem value="US">US</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Instructions">Instructions</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Instructions"
                                                  placeholder="Instructions"
                                                />
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Contact">Contact</Label>
                                                  <Input
                                                    type="text"
                                                    id="Contact"
                                                    placeholder="Contact"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="open-time" className="px-1">
                                                    Open Time
                                                  </Label>
                                                  <Input
                                                    type="time"
                                                    id="open-time"
                                                    step="1"
                                                    defaultValue="10:30:00"
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Phone">Phone</Label>
                                                  <Input
                                                    type="text"
                                                    id="Phone"
                                                    placeholder="Phone"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="close-time" className="px-1">
                                                    Close Time
                                                  </Label>
                                                  <Input
                                                    type="time"
                                                    id="close-time"
                                                    step="1"
                                                    defaultValue="10:30:00"
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Email">Email</Label>
                                                  <Input
                                                    type="email"
                                                    id="Email"
                                                    placeholder="Email"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <div>
                                                    <FormItem className="flex md:mt-5">
                                                      <FormLabel className="text-sm font-normal">
                                                        Save Contact
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Checkbox />
                                                      </FormControl>
                                                    </FormItem>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="mt-3">
                                                <div>
                                                  <hr />
                                                </div>
                                                <p className="mb-3 text-lg font-bold">
                                                  Actual Ship Times
                                                </p>
                                                <div className="block gap-2 md:flex">
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="Driver-Arrive">
                                                      Driver Arrive
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      id="Driver-Arrive"
                                                      placeholder="Driver Arrive"
                                                    />
                                                  </div>
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="Actual-Ship-Date">
                                                      Actual Ship Date
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      id="Actual-Ship-Date"
                                                      placeholder="Actual Ship Date"
                                                    />
                                                  </div>
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="wait-time">Wait Time</Label>
                                                    <Input
                                                      type="number"
                                                      id="wait-time"
                                                      placeholder="Wait Time"
                                                    />
                                                  </div>
                                                  <div className="flex w-full max-w-sm items-center gap-3 md:mt-5">
                                                    <Checkbox id="lock_from" />
                                                    <Label htmlFor="lock_from">Lock</Label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="POP">
                                  <div>
                                    <Input type="text" id="POP" placeholder="POP" />
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>

                          <div className="w-full rounded md:w-2/2 xl:w-1/3">
                            <div className="mx-2 bg-slate-50 px-4 pb-5 dark:bg-zinc-950">
                              <FormItem>
                                <div className="mt-3 block gap-2 md:flex">
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="load">Load</Label>
                                    <Input type="number" id="load" placeholder="Load" />
                                  </div>
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                </div>
                                <div className="mt-3 block gap-2 md:flex">
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="Reference_No">Reference No</Label>
                                    <Input type="text" id="Reference_No" placeholder="Reference No" />
                                  </div>
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="Route">Route</Label>
                                    <Input type="text" id="Route" placeholder="Route" />
                                  </div>
                                </div>
                                <div className="mt-3 block gap-2 md:flex">
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="way_bill">WayBill/BL #</Label>
                                    <Input type="text" id="way_bill" placeholder="WayBill/BL #" />
                                  </div>
                                  <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="Stop">Stop</Label>
                                    <Input type="text" id="Stop" placeholder="Stop" />
                                  </div>
                                </div>
                              </FormItem>
                            </div>
                            <div className="mx-2 mt-3 bg-slate-50 px-4 pt-1 pb-5 dark:bg-zinc-950">
                              <Tabs defaultValue="SHIP_TO">
                                <div>
                                  <PageNav>
                                    <TabsList>
                                      <TabsTrigger value="SHIP_TO">SHIP TO</TabsTrigger>
                                      <TabsTrigger value="POD">POD</TabsTrigger>
                                    </TabsList>
                                  </PageNav>
                                </div>
                                <TabsContent value="SHIP_TO">
                                  <div>
                                    <div>
                                      <p className="mt-2 font-bold">Planed Ship Date Window</p>
                                      <div className="mt-2">
                                        <div className="grid md:flex md:flex-col">
                                          <div className="mx-1 w-full">
                                            <div className="">
                                              <div className="flex flex-col">
                                                <Label htmlFor="date-picker" className="px-1">
                                                  Ready Time
                                                </Label>
                                                {/* <Input type="datetime-local" id="date-picker" /> */}
                                                <Popover
                                                  open={shipToOpen}
                                                  onOpenChange={setShipToOpen}
                                                >
                                                  <div className="flex">
                                                    <PopoverTrigger asChild>
                                                      <Button
                                                        variant="outline"
                                                        id="date-picker"
                                                        className="w-32 justify-between font-normal"
                                                      >
                                                        {shipToDate
                                                          ? shipToDate.toLocaleDateString()
                                                          : 'Select date'}
                                                        <ChevronDownIcon />
                                                      </Button>
                                                    </PopoverTrigger>
                                                    <Input
                                                      type="time"
                                                      id="time-picker"
                                                      step="1"
                                                      defaultValue="10:30:00"
                                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                    />
                                                  </div>
                                                  <PopoverContent
                                                    className="w-auto overflow-hidden p-0"
                                                    align="start"
                                                  >
                                                    <Calendar
                                                      mode="single"
                                                      selected={shipToDate}
                                                      captionLayout="dropdown"
                                                      onSelect={(shipToDate) => {
                                                        setShipToDate(shipToDate);
                                                        setShipToOpen(false);
                                                      }}
                                                    />
                                                  </PopoverContent>
                                                </Popover>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mx-1 mt-3 md:w-3/3">
                                            <div className="">
                                              <div className="flex flex-col">
                                                <Label htmlFor="end-date-picker" className="px-1">
                                                  End
                                                </Label>
                                                {/* <Input type="datetime-local" id="end-date-picker" /> */}
                                                <Popover
                                                  open={shipToEndOpen}
                                                  onOpenChange={setShipToEndOpen}
                                                >
                                                  <div className="flex">
                                                    <PopoverTrigger asChild>
                                                      <Button
                                                        variant="outline"
                                                        id="end-date-picker"
                                                        className="w-32 justify-between font-normal"
                                                      >
                                                        {shipToEndDate
                                                          ? shipToEndDate.toLocaleDateString()
                                                          : 'Select date'}
                                                        <ChevronDownIcon />
                                                      </Button>
                                                    </PopoverTrigger>
                                                    <Input
                                                      type="time"
                                                      id="end-time-picker"
                                                      step="1"
                                                      defaultValue="10:30:00"
                                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                    />
                                                  </div>
                                                  <PopoverContent
                                                    className="w-auto overflow-hidden p-0"
                                                    align="start"
                                                  >
                                                    <Calendar
                                                      mode="single"
                                                      selected={shipToEndDate}
                                                      captionLayout="dropdown"
                                                      onSelect={(shipToEndDate) => {
                                                        setShipToEndDate(shipToEndDate);
                                                        setShipToEndOpen(false);
                                                      }}
                                                    />
                                                  </PopoverContent>
                                                </Popover>
                                              </div>
                                              <div className="flex flex-col"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-md mt-3 font-bold">Appt. (Pickup)</p>
                                          <hr />
                                          <div className="mt-2">
                                            <div className="w-1/3">
                                              <div className="flex justify-between">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>
                                            </div>
                                            <div className="mt-2 w-1/3">
                                              <div className="flex justify-between">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Created
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-3">
                                          <hr />
                                          <div>
                                            <div className="mt-2 grid grid-cols-4 gap-4">
                                              {/* Icon and Button */}
                                              <div className="flex flex-col items-center gap-2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                                                  <MapPin />
                                                </div>
                                                <Button variant="outline">Save Address</Button>
                                              </div>

                                              {/* First Column of Checkboxes */}
                                              <div className="flex flex-col gap-2">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Name Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Image Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>

                                              {/* Second Column of Checkboxes */}
                                              <div className="flex flex-col gap-2">
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Sign Required
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center justify-between">
                                                  <FormLabel className="text-sm font-normal">
                                                    Requires Tallgate
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Checkbox />
                                                  </FormControl>
                                                </FormItem>
                                              </div>

                                              <div className="flex flex-col items-center gap-2">
                                                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                                                  <RefreshCcw />
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="mt-2">
                                                <FormLabel>Address Type</FormLabel>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl className="w-full">
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select Address Type" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </div>
                                            </div>

                                            <div className="mt-5">
                                              <div className="block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="name">Name</Label>
                                                  <Input type="text" id="name" placeholder="Name" />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="code">Code</Label>
                                                  <Input
                                                    type="number"
                                                    id="code"
                                                    placeholder="Code"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Strate_One">Strate 1</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Strate_One"
                                                  placeholder="Strate 1"
                                                />
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Strate_Two">Strate 2</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Strate_Two"
                                                  placeholder="Strate 2"
                                                />
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="city">City</Label>
                                                  <Input type="text" id="city" placeholder="City" />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <FormLabel>Province</FormLabel>
                                                  <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                  >
                                                    <FormControl className="w-full">
                                                      <SelectTrigger>
                                                        <SelectValue placeholder="Select Province" />
                                                      </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                      <SelectItem value="Rajshahi">
                                                        Rajshahi
                                                      </SelectItem>
                                                      <SelectItem value="Rangpur">
                                                        Rangpur
                                                      </SelectItem>
                                                      <SelectItem value="Dhaka">
                                                        Dhaka
                                                      </SelectItem>
                                                      <SelectItem value="Chittagong">
                                                        Chittagong
                                                      </SelectItem>
                                                      <SelectItem value="Khulna">
                                                        Khulna
                                                      </SelectItem>
                                                      <SelectItem value="Barishal">
                                                        Barishal
                                                      </SelectItem>
                                                      <SelectItem value="Sylhet">
                                                        Sylhet
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                  <FormMessage />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Postal_Code">Postal Code</Label>
                                                  <Input
                                                    type="text"
                                                    id="Postal_Code"
                                                    placeholder="Postal Code"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <FormLabel>Country</FormLabel>
                                                  <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                  >
                                                    <FormControl className="w-full">
                                                      <SelectTrigger>
                                                        <SelectValue placeholder="Select Country" />
                                                      </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                      <SelectItem value="Bangladesh">
                                                        Bangladesh
                                                      </SelectItem>
                                                      <SelectItem value="Pakistan">
                                                        Pakistan
                                                      </SelectItem>
                                                      <SelectItem value="Nepal">
                                                        Nepal
                                                      </SelectItem>
                                                      <SelectItem value="Srilanka">
                                                        Srilanka
                                                      </SelectItem>
                                                      <SelectItem value="Bhutan">
                                                        Bhutan
                                                      </SelectItem>
                                                      <SelectItem value="Myanmar">
                                                        Myanmar
                                                      </SelectItem>
                                                      <SelectItem value="Maldives">
                                                        Maldives
                                                      </SelectItem>
                                                      <SelectItem value="Thailand">
                                                        Thailand
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                  <FormMessage />
                                                </div>
                                              </div>
                                              <div className="mt-3">
                                                <FormLabel>Zone</FormLabel>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl className="w-full">
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select Zone" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="Bangladesh">
                                                      Bangladesh
                                                    </SelectItem>
                                                    <SelectItem value="US">US</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </div>
                                              <div className="mt-3">
                                                <Label htmlFor="Instructions">Instructions</Label>
                                                <Input
                                                  type="text"
                                                  className="w-full"
                                                  id="Instructions"
                                                  placeholder="Instructions"
                                                />
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Contact">Contact</Label>
                                                  <Input
                                                    type="text"
                                                    id="Contact"
                                                    placeholder="Contact"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="open-time" className="px-1">
                                                    Open Time
                                                  </Label>
                                                  <Input
                                                    type="time"
                                                    id="open-time"
                                                    step="1"
                                                    defaultValue="10:30:00"
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Phone">Phone</Label>
                                                  <Input
                                                    type="text"
                                                    id="Phone"
                                                    placeholder="Phone"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="close-time" className="px-1">
                                                    Close Time
                                                  </Label>
                                                  <Input
                                                    type="time"
                                                    id="close-time"
                                                    step="1"
                                                    defaultValue="10:30:00"
                                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3 block gap-2 md:flex">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="Email">Email</Label>
                                                  <Input
                                                    type="email"
                                                    id="Email"
                                                    placeholder="Email"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <div>
                                                    <FormItem className="flex md:mt-5">
                                                      <FormLabel className="text-sm font-normal">
                                                        Save Contact
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Checkbox />
                                                      </FormControl>
                                                    </FormItem>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="mt-3">
                                                <div>
                                                  <hr />
                                                </div>
                                                <p className="mb-3 text-lg font-bold">
                                                  Actual Ship Times
                                                </p>
                                                <div className="block gap-2 md:flex">
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="Driver-Arrive">
                                                      Driver Arrive
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      id="Driver-Arrive"
                                                      placeholder="Driver Arrive"
                                                    />
                                                  </div>
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="Actual-Ship-Date">
                                                      Actual Ship Date
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      id="Actual-Ship-Date"
                                                      placeholder="Actual Ship Date"
                                                    />
                                                  </div>
                                                  <div className="grid w-full max-w-sm items-center gap-3">
                                                    <Label htmlFor="wait-time">Wait Time</Label>
                                                    <Input
                                                      type="number"
                                                      id="wait-time"
                                                      placeholder="Wait Time"
                                                    />
                                                  </div>
                                                  <div className="flex w-full max-w-sm items-center gap-3 md:mt-5">
                                                    <Checkbox id="lock_to" />
                                                    <Label htmlFor="lock_to">Lock</Label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="POD">
                                  <div>
                                    <Input type="text" id="POD" placeholder="POD" />
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                          <div className="w-full rounded md:w-2/2 xl:w-1/3">
                            <div className="mx-2 bg-slate-50 dark:bg-zinc-950">
                              <div className="mx-3">
                                <div className="flex justify-evenly gap-3">
                                  <div className="md:w-1/2">
                                    <Label htmlFor="date-picker" className="px-1">
                                      Create Date
                                    </Label>
                                    {/* <Input type="datetime-local" id="date-picker" /> */}
                                    <Popover open={createDateOpen} onOpenChange={setCreateDateOpen}>
                                      <div className="flex">
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            id="date-picker"
                                            className="w-full justify-between font-normal"
                                          >
                                            {createDate ? createDate.toLocaleDateString() : 'Select date'}
                                            <ChevronDownIcon />
                                          </Button>
                                        </PopoverTrigger>
                                      </div>
                                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                          mode="single"
                                          selected={createDate}
                                          captionLayout="dropdown"
                                          onSelect={(createDate) => {
                                            setCreateDate(createDate);
                                            setCreateDateOpen(false);
                                          }}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="md:w-1/2">
                                    <div>
                                      <Label htmlFor="Total_Price">Total Price</Label>
                                      <Input type="number" id="Total_Price" placeholder="Total Price" />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <div className="flex flex-col">
                                    <Label htmlFor="date-picker" className="px-1">
                                      Dispatched Date Time
                                    </Label>
                                    {/* <Input type="datetime-local" id="date-picker" /> */}
                                    <Popover open={DispatchedDateOpen} onOpenChange={setDispatchedDateOpen}>
                                      <div className="flex">
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            id="date-picker"
                                            className="w-32 justify-between font-normal"
                                          >
                                            {DispatchedDate
                                              ? DispatchedDate.toLocaleDateString()
                                              : 'Select date'}
                                            <ChevronDownIcon />
                                          </Button>
                                        </PopoverTrigger>
                                        <Input
                                          type="time"
                                          id="time-picker"
                                          step="1"
                                          defaultValue="10:30:00"
                                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                      </div>
                                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                          mode="single"
                                          selected={DispatchedDate}
                                          captionLayout="dropdown"
                                          onSelect={(DispatchedDate) => {
                                            setDispatchedDate(DispatchedDate);
                                            setDispatchedDateOpen(false);
                                          }}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <Label htmlFor="carrier_payment_amount">Carrier Payment Amount</Label>
                                  <Input
                                    type="number"
                                    id="carrier_payment_amount"
                                    placeholder="Carrier Payment Amount"
                                  />
                                </div>
                                <div className="mt-3">
                                  <div className="flex flex-col">
                                    <Label htmlFor="date-picker" className="px-1">
                                      Cancelled Date
                                    </Label>
                                    {/* <Input type="datetime-local" id="date-picker" /> */}
                                    <Popover open={CancelledDateOpen} onOpenChange={setCancelledDateOpen}>
                                      <div className="flex">
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            id="date-picker"
                                            className="w-32 justify-between font-normal"
                                          >
                                            {CancelledDate
                                              ? CancelledDate.toLocaleDateString()
                                              : 'Select date'}
                                            <ChevronDownIcon />
                                          </Button>
                                        </PopoverTrigger>
                                        <Input
                                          type="time"
                                          id="time-picker"
                                          step="1"
                                          defaultValue="10:30:00"
                                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                      </div>
                                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                          mode="single"
                                          selected={CancelledDate}
                                          captionLayout="dropdown"
                                          onSelect={(CancelledDate) => {
                                            setCancelledDate(CancelledDate);
                                            setCancelledDateOpen(false);
                                          }}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <div className="">
                                    <FormLabel>Vehicle</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select Vehicle" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="5 Tons">5 Tons</SelectItem>
                                        <SelectItem value="10 Tons">10 Tons</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                  <div>
                                    <Label htmlFor="total_weight">
                                      Total Weight <span className="font-bold">({vehicle_unit})</span>{' '}
                                    </Label>
                                    <Input type="number" id="total_weight" placeholder="Total Weight" />
                                  </div>
                                  <div>
                                    <div className="mt-5">
                                      <Button
                                        type="button"
                                        onClick={() => setVehicleUnit(vehicle_unit === 'LB' ? 'KG' : 'LB')}
                                        variant={'outline'}
                                      >
                                        <ArrowLeftRight />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="mt-5 flex gap-2">
                                    <Checkbox />
                                    <Label>Lock</Label>
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <div className="">
                                    <Label htmlFor="invoice">Invoice</Label>
                                    <Input type="text" id="invoice" placeholder="Invoice" />
                                  </div>
                                  <div>
                                    <Label htmlFor="total_dim_weight">
                                      Total DIM Weight <span>({dim_unit})</span>
                                    </Label>
                                    <Input type="text" id="total_dim_weight" placeholder="Total DIM Weight" />
                                  </div>
                                  <div>
                                    <div className="mt-5">
                                      <Button
                                        type="button"
                                        onClick={() => setDimUnit(dim_unit === 'LB' ? 'KG' : 'LB')}
                                        variant={'outline'}
                                      >
                                        <ArrowLeftRight />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="mt-5 flex gap-2">
                                    <Checkbox />
                                    <Label>Lock</Label>
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <div className="">
                                    <FormLabel>Currency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl className="w-full">
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select Vehicle" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                        <SelectItem value="CNY">CNY</SelectItem>
                                        <SelectItem value="BDT">BDT</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </div>
                                  <div className="mt-5 flex flex-col items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                                      <MapPin />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="total_distance">
                                      Total Distance <span>({distance_unit})</span>
                                    </Label>
                                    <Input type="number" id="total_distance" placeholder="Total Distance" />
                                  </div>
                                  <div>
                                    <div className="mt-5">
                                      <Button
                                        type="button"
                                        // onClick={() => setDimUnit(dim_unit === 'KM' ? 'Mile' : 'KM')}
                                        variant={'outline'}
                                      >
                                        <ArrowLeftRight />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="mt-5 flex gap-2">
                                    <Checkbox />
                                    <Label>Lock</Label>
                                  </div>
                                </div>

                                <div className="mt-3 px-4 pt-1 pb-5">
                                  <Tabs defaultValue="PACKAGES">
                                    <div>
                                      <PageNav>
                                        <TabsList>
                                          <TabsTrigger value="PACKAGES">PACKAGES</TabsTrigger>
                                          <TabsTrigger value="CUSTOM_FIELDS">CUSTOM FIELDS</TabsTrigger>
                                        </TabsList>
                                      </PageNav>
                                    </div>
                                    <TabsContent value="PACKAGES">
                                      <div>
                                        <div>
                                          <div className="mt-2">
                                            <div className="mt-3">
                                              <hr />
                                              <div>
                                                <div className="mt-2 grid grid-cols-2 gap-4">
                                                  {/* First Column of Checkboxes */}
                                                  <div className="flex flex-col gap-2">
                                                    <FormItem className="flex items-center">
                                                      <FormLabel className="text-sm font-normal">
                                                        Chain Of Custody
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Checkbox />
                                                      </FormControl>
                                                    </FormItem>
                                                  </div>
                                                  <div className="flex flex-col gap-2">
                                                    <FormItem className="flex items-center">
                                                      <FormLabel className="text-sm font-normal">
                                                        Inside Delivery
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Checkbox />
                                                      </FormControl>
                                                    </FormItem>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="mt-5 flex gap-5">
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="size_weight_unit">
                                                    Size/Weight Unit
                                                  </Label>
                                                  <Input
                                                    type="text"
                                                    id="size_weight_unit"
                                                    placeholder="Size/Weight Unit"
                                                  />
                                                </div>
                                                <div className="grid w-full max-w-sm items-center gap-3">
                                                  <Label htmlFor="declared-value">
                                                    Declared Value
                                                  </Label>
                                                  <Input
                                                    type="number"
                                                    id="declared-value"
                                                    placeholder="Declared Value"
                                                  />
                                                </div>
                                              </div>
                                              <div className="mt-3">
                                                <p className="text-lg font-bold">Packages</p>

                                                <div className="w-full overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                                                  <table className="min-w-full text-left text-sm rtl:text-right">
                                                    <thead className="custom-nav-color">
                                                      <tr>
                                                        <th className="border border-slate-300 px-4 py-2">
                                                          <Dialog>
                                                            <DialogTrigger asChild>
                                                              <Button
                                                                type="button"
                                                                className="bg-slate-200 text-gray-900 hover:bg-slate-300 hover:text-gray-900"
                                                                value="outline"
                                                              >
                                                                <PlusIcon />
                                                              </Button>
                                                            </DialogTrigger>

                                                            <DialogContent className="my-4 max-h-[90vh] w-full max-w-full overflow-y-auto sm:my-8 sm:max-w-[425px] md:max-w-[700px]">
                                                              <DialogHeader>
                                                                <DialogTitle>
                                                                  <PageNav className="mt-4 rounded p-2 text-white">
                                                                    Packages
                                                                  </PageNav>
                                                                </DialogTitle>
                                                              </DialogHeader>

                                                              <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
                                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                                  <div>
                                                                    <Label>
                                                                      Qty
                                                                    </Label>
                                                                    <Input
                                                                      placeholder="Qty"
                                                                      className="w-full"
                                                                    />
                                                                  </div>
                                                                  <div className="sm:col-span-2">
                                                                    <Label>
                                                                      Package
                                                                      Type *
                                                                    </Label>
                                                                    <Select>
                                                                      <SelectTrigger>
                                                                        <SelectValue placeholder="Select package type" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                        <SelectItem value="box">
                                                                          Box
                                                                        </SelectItem>
                                                                        <SelectItem value="envelope">
                                                                          Envelope
                                                                        </SelectItem>
                                                                        <SelectItem value="pallet">
                                                                          Pallet
                                                                        </SelectItem>
                                                                      </SelectContent>
                                                                    </Select>
                                                                  </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-4">
                                                                  <div className="sm:col-span-3">
                                                                    <Label>
                                                                      Desc (Max
                                                                      25 chars)
                                                                    </Label>
                                                                    <Input
                                                                      maxLength={
                                                                        25
                                                                      }
                                                                      className="w-full"
                                                                    />
                                                                  </div>
                                                                  <div className="flex items-center space-x-2 pt-2 sm:pt-5">
                                                                    <Checkbox id="linewt" />
                                                                    <Label htmlFor="linewt">
                                                                      LineWt
                                                                    </Label>
                                                                  </div>
                                                                </div>

                                                                <div>
                                                                  <Label className="font-bold">
                                                                    Metric (Cm,Kg)
                                                                  </Label>
                                                                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                                                    <Input placeholder="Weight" />
                                                                    <Input placeholder="L" />
                                                                    <Input placeholder="W" />
                                                                    <Input placeholder="H" />
                                                                  </div>
                                                                </div>

                                                                <div>
                                                                  <Label className="font-bold">
                                                                    Imperial
                                                                    (In,Lbs)
                                                                  </Label>
                                                                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                                                    <Input placeholder="Weight" />
                                                                    <Input placeholder="L" />
                                                                    <Input placeholder="W" />
                                                                    <Input placeholder="H" />
                                                                  </div>
                                                                </div>

                                                                <div>
                                                                  <Label className="font-bold">
                                                                    Cross Border
                                                                  </Label>
                                                                  <div className="mt-2 space-y-4">
                                                                    <Input placeholder="Product Code" />
                                                                    <Textarea placeholder="Description Of Goods" />
                                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                      <Input placeholder="Country Origin" />
                                                                      <Input placeholder="Country Destination" />
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                      <Input placeholder="MC" />
                                                                      <Input placeholder="FEI" />
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                      <Input placeholder="EIN" />
                                                                      <Input placeholder="Total Price" />
                                                                    </div>
                                                                    <Textarea placeholder="List Contents" />
                                                                  </div>
                                                                </div>
                                                              </div>

                                                              <DialogFooter className="flex flex-col gap-2 p-4 sm:flex-row sm:gap-4">
                                                                <Button
                                                                  type="button"
                                                                  variant="outline"
                                                                  className="w-full sm:w-auto"
                                                                >
                                                                  Save
                                                                </Button>
                                                                <DialogClose asChild>
                                                                  <Button
                                                                    variant="outline"
                                                                    className="w-full sm:w-auto"
                                                                  >
                                                                    Cancel
                                                                  </Button>
                                                                </DialogClose>
                                                              </DialogFooter>
                                                            </DialogContent>
                                                          </Dialog>
                                                        </th>
                                                        <th className="border border-slate-300 px-4 py-2">
                                                          QTY Package Type
                                                        </th>
                                                        <th className="border border-slate-300 px-4 py-2">
                                                          Weight
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td className="border border-slate-300 px-4 py-2"></td>
                                                        <td className="border border-slate-300 px-4 py-2"></td>
                                                        <td className="border border-slate-300 px-4 py-2"></td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          colSpan={3}
                                                          className="border border-slate-300 px-4 py-5 text-center"
                                                        >
                                                          No Data
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="CUSTOM_FIELDS"></TabsContent>
                                  </Tabs>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="CHARGES">
                      <div>
                        <Table className="w-full">
                          <TableHeader className="custom-nav-color">
                            <TableRow>
                              <TableHead className="py-2 text-white">Description</TableHead>
                              <TableHead className="py-2 text-white">Client Charges</TableHead>
                              <TableHead className="py-2 text-white">Fed Tax</TableHead>
                              <TableHead className="py-2 text-white">State Tax</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border">
                              <TableCell colSpan={4} className="border py-14 text-center font-bold">
                                No Data
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="NOTE">
                      <div>
                        <Table className="w-full">
                          <TableHeader className="custom-nav-color">
                            <TableRow>
                              <TableHead className="py-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button type="button" size="sm" variant="outline">
                                      <Plus />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        <PageNav className="mt-4 rounded p-2 text-white">Note</PageNav>
                                      </DialogTitle>
                                      <DialogDescription />
                                    </DialogHeader>
                                    <div className="border p-5">
                                      <div className="flex gap-3">
                                        <div>
                                          <Label htmlFor="note_type" className="ms-1">
                                            Note Type
                                          </Label>
                                          <Select>
                                            <FormControl className="mt-2 w-full" id="note_type">
                                              <SelectTrigger>
                                                <SelectValue placeholder="Note Type" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="Audit">Audit</SelectItem>
                                              <SelectItem value="Bypass Pricing">
                                                Bypass Pricing
                                              </SelectItem>
                                              <SelectItem value="External Comment">
                                                External Comment
                                              </SelectItem>
                                              <SelectItem value="Internal Comment">
                                                Internal Comment
                                              </SelectItem>
                                              <SelectItem value="Invoice">Invoice</SelectItem>
                                              <SelectItem value="Invoice Note">Invoice Note</SelectItem>
                                              <SelectItem value="Service Issue">
                                                Service Issue
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </div>
                                        <div className="grid gap-3">
                                          <Label htmlFor="note_created_date" className="ms-1">
                                            Note Created Date
                                          </Label>
                                          <Input
                                            id="note_created_date"
                                            name="note_created_date"
                                            placeholder="Created Date"
                                          />
                                        </div>
                                      </div>
                                      <div className="mt-5 grid gap-3">
                                        <Label htmlFor="note" className="ms-1">
                                          Note
                                        </Label>
                                        <Textarea
                                          id="note"
                                          name="note"
                                          className="w-full"
                                          placeholder="Note"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <div className="flex gap-2">
                                        <Button type="button" variant="outline">
                                          Save
                                        </Button>
                                        <DialogClose asChild>
                                          <Button type="button" variant="outline">
                                            Cancel
                                          </Button>
                                        </DialogClose>
                                      </div>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </TableHead>
                              <TableHead className="py-2 text-white">Created Date</TableHead>
                              <TableHead className="py-2 text-white">Note</TableHead>
                              <TableHead className="py-2 text-white">Note Type</TableHead>
                              <TableHead className="py-2 text-white">User</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={5} className="border-s border-e border-b py-10 text-center">
                                No Data
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="FILES">
                      <div>
                        <Table className="w-full">
                          <TableHeader className="custom-nav-color">
                            <TableRow>
                              <TableHead className="py-2">
                                <Button type="button" size="sm" variant="outline">
                                  <Plus />
                                </Button>
                              </TableHead>
                              <TableHead className="py-2 text-white">Reference</TableHead>
                              <TableHead className="py-2 text-white">Document Type</TableHead>
                              <TableHead className="py-2 text-white">Created</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={4} className="border-s border-e border-b py-10 text-center">
                                No Data
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </>
  );
}
