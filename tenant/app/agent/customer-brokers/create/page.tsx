"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopButton from '@/components/ui/TopButton';
import { CircleX, FilePlus, Save, SaveIcon, SquareX } from 'lucide-react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";


export default function Index() {

  return (
   <div>
       <TopSearch />
       <div className="ms-2 mt-3 flex gap-4 md:ms-5">
           <TopButton icon={SaveIcon} label="Save and Close" onClick={() => {}} />
           <TopButton icon={SaveIcon} label="Save" onClick={() => {}} />
           <TopButton icon={SquareX} label="Delete" onClick={() => {}} />
           <TopButton icon={SquareX} label="Close" onClick={() => {}} />
       </div>
       <div className="mx-2">
           <Tabs defaultValue="Details">
               <PageNav className="ms-2">
                   <TabsList className="!-ms-0">
                       <TabsTrigger value="Details">Details</TabsTrigger>
                       <TabsTrigger value="Contacts">Contacts</TabsTrigger>
                       <TabsTrigger value="Notes">Notes</TabsTrigger>
                   </TabsList>
               </PageNav>
               <TabsContent value="Details">
                   <div>
                       <div className="mt-5 grid grid-cols-3 p-2">
                           <div className="w-full sm:w-2/12">
                               <div className="">
                                   <div className="mb-4 flex gap-4">
                                       <Checkbox id="Active" defaultChecked />
                                       <Label htmlFor="Active">Active</Label>
                                   </div>
                                   <div className="mb-4 flex gap-4">
                                       <Checkbox id="Locked" />
                                       <Label htmlFor="Locked">Locked</Label>
                                   </div>
                                   <div className="mb-4 flex gap-4">
                                       <Checkbox id="is-broker" defaultChecked />
                                       <Label htmlFor="is-broker" className="whitespace-nowrap">
                                           Is Broker
                                       </Label>
                                   </div>
                               </div>
                           </div>

                           <div className="col-span-2 mx-2 w-full md:col-span-1">
                               <div>
                                   <div>
                                       <Label htmlFor="Name">Name*</Label>
                                       <Input id="Name" className="w-full" />
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="mt-5">
                           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                               <div className="w-full rounded-md">
                                   <div className="bg-slate-100 px-5 pt-3 pb-18 dark:bg-zinc-950">
                                       <p className="border-b">Contact</p>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Name" className="w-1/4">
                                                   Name
                                               </Label>
                                               <Input type="text" id="Name" className="w-3/4" placeholder="Name" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Email" className="w-1/4">
                                                   Email
                                               </Label>
                                               <Input type="email" id="Email" className="w-3/4" placeholder="Email" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Phone" className="w-1/4">
                                                   Phone
                                               </Label>
                                               <Input type="number" id="Phone" className="w-3/4" placeholder="Phone" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Mobile" className="w-1/4">
                                                   Mobile
                                               </Label>
                                               <Input type="number" id="Mobile" className="w-3/4" placeholder="Mobile" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Fax" className="w-1/4">
                                                   Fax
                                               </Label>
                                               <Input type="text" id="Fax" className="w-3/4" placeholder="Fax" />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="w-full rounded-md">
                                   <div className="bg-slate-100 px-5 pt-3 pb-5 dark:bg-zinc-950">
                                       <p className="border-b">Mailing Address</p>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor=" Strate-1" className="w-1/4">
                                                   Strate 1
                                               </Label>
                                               <Input type="text" id=" Strate-1" className="w-3/4" placeholder=" Strate 1" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor=" Strate-2" className="w-1/4">
                                                   Strate 2
                                               </Label>
                                               <Input type="text" id=" Strate-2" className="w-3/4" placeholder=" Strate 2" />
                                           </div>
                                       </div>
                                       <div className="mt-3 flex">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label className="w-1/4">Country:</Label>
                                               <Select>
                                                   <SelectTrigger className="w-3/4">
                                                       <SelectValue placeholder="Country" />
                                                   </SelectTrigger>
                                                   <SelectContent>
                                                       <SelectGroup>
                                                           <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                           <SelectItem value="US">US</SelectItem>
                                                       </SelectGroup>
                                                   </SelectContent>
                                               </Select>
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="City" className="w-1/4">
                                                   City
                                               </Label>
                                               <Input type="text" id="City" className="w-3/4" placeholder="City" />
                                           </div>
                                       </div>
                                       <div className="mt-3 flex">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label className="w-1/4">Province:</Label>
                                               <Select>
                                                   <SelectTrigger className="w-3/4">
                                                       <SelectValue placeholder="Province" />
                                                   </SelectTrigger>
                                                   <SelectContent>
                                                       <SelectGroup>
                                                           <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                                                           <SelectItem value="Rangpur">Rangpur</SelectItem>
                                                       </SelectGroup>
                                                   </SelectContent>
                                               </Select>
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Postal" className="w-1/4">
                                                   Postal
                                               </Label>
                                               <Input type="text" id="Postal" className="w-3/4" placeholder="Postal" />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="w-full rounded-md">
                                   <div className="bg-slate-100 px-5 pt-3 pb-5 md:pb-36 dark:bg-zinc-950">
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Broker-ID" className="w-1/4">
                                                   Broker ID
                                               </Label>
                                               <Input type="number" id="Broker-ID" className="w-3/4" placeholder="Broker ID" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Filer-Code" className="w-1/4">
                                                   Filer Code
                                               </Label>
                                               <Input type="number" id="Filer-Code" className="w-3/4" placeholder="Filer Code" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Flat-Fee" className="w-1/4">
                                                   Flat Fee
                                               </Label>
                                               <Input type="number" id="Flat-Fee" className="w-3/4" placeholder="Flat Fee" />
                                           </div>
                                       </div>
                                       <div className="flex pt-3">
                                           <div className="flex w-full max-w-sm items-center gap-2">
                                               <Label htmlFor="Rate-Percentage" className="w-1/4">
                                                   Rate Percentage
                                               </Label>
                                               <Input
                                                   type="number"
                                                   id="Rate-Percentage"
                                                   className="w-3/4"
                                                   placeholder="Rate Percentage"
                                               />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </TabsContent>
               <TabsContent value="Contacts">
                   <Table>
                       <TableHeader className="custom-nav-color">
                           <TableRow>
                               <TableHead className="text-white">
                                   <Dialog>
                                       <DialogTrigger asChild>
                                           <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                               <FilePlus />
                                           </Button>
                                       </DialogTrigger>
                                       <DialogContent className="sm:max-w-[425px]">
                                           <DialogHeader>
                                               <DialogTitle>
                                                   <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                               </DialogTitle>
                                               <DialogDescription asChild>
                                                   <div className="flex gap-2">
                                                       <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                       <DialogClose asChild>
                                                           <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                       </DialogClose>
                                                   </div>
                                               </DialogDescription>
                                           </DialogHeader>
                                           <div className="grid gap-4">
                                               <div className="flex gap-3">
                                                   <Checkbox id="active" />
                                                   <Label htmlFor="active">Active</Label>
                                               </div>
                                               <div className="grid gap-3">
                                                   <Label htmlFor="name">Name</Label>
                                                   <Input id="name" name="name" defaultValue="" />
                                               </div>
                                               <div className="grid gap-3">
                                                   <Label htmlFor="email">Email</Label>
                                                   <Input id="email" name="username" defaultValue="" />
                                               </div>
                                           </div>
                                           <div className="border p-5">
                                               <p className="mb-2 font-bold">Phone Numbers</p>
                                               <div className="grid gap-3">
                                                   <div className="grid gap-3">
                                                       <Label htmlFor="Primary">Primary</Label>
                                                       <Input id="Primary" name="Primary" defaultValue="" />
                                                   </div>
                                                   <div className="grid gap-3">
                                                       <Label htmlFor="fax">Fax</Label>
                                                       <Input id="fax" name="fax" defaultValue="" />
                                                   </div>
                                                   <div className="grid gap-3">
                                                       <Label htmlFor="mobile">Mobile</Label>
                                                       <Input id="mobile" name="mobile" defaultValue="" />
                                                   </div>
                                               </div>
                                           </div>
                                           {/* <DialogFooter></DialogFooter> */}
                                       </DialogContent>
                                   </Dialog>
                               </TableHead>
                               <TableHead className="border p-1 text-white">Name</TableHead>
                               <TableHead className="border p-1 text-white">Email</TableHead>
                               <TableHead className="border p-1 text-white">Phone</TableHead>
                               <TableHead className="border p-1 text-white">Fax</TableHead>
                               <TableHead className="border p-1 text-white">Mobile</TableHead>
                               <TableHead className="border p-1 text-white">Active</TableHead>
                           </TableRow>
                       </TableHeader>
                       <TableBody>
                           <TableRow>
                               <TableCell colSpan={7} className="border py-24 text-center">
                                   No data to display
                               </TableCell>
                           </TableRow>
                       </TableBody>
                   </Table>
               </TabsContent>
               <TabsContent value="Notes">
                   <Table>
                       <TableHeader className="custom-nav-color">
                           <TableRow>
                               <TableHead className="text-white">
                                   <Dialog>
                                       <DialogTrigger asChild>
                                           <Button className="bg-sky-900 px-3 text-white hover:bg-sky-950">
                                               <FilePlus />
                                           </Button>
                                       </DialogTrigger>
                                       <DialogContent className="sm:max-w-[425px]">
                                           <DialogHeader>
                                               <DialogTitle>
                                                   <PageNav className="mt-4 rounded p-2 text-white">Edit Form</PageNav>
                                               </DialogTitle>
                                               <DialogDescription asChild>
                                                   <div className="flex gap-2">
                                                       <TopButton type="submit" icon={Save} label="Save" onClick={() => {}} />
                                                       <DialogClose asChild>
                                                           <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                                       </DialogClose>
                                                   </div>
                                               </DialogDescription>
                                           </DialogHeader>
                                           <div className="grid gap-4 rounded border p-3">
                                               <div className="flex items-center gap-3">
                                                   <Label htmlFor="User">User:</Label>
                                                   <p className="text-sm">Date/Time: 8/2/2025 7:35:49 AM</p>
                                               </div>
                                               <div className="grid gap-3">
                                                   <div className="flex w-full max-w-sm items-center gap-2">
                                                       <Label className="w-1/4">Note Type:</Label>
                                                       <Select>
                                                           <SelectTrigger className="w-3/4">
                                                               <SelectValue />
                                                           </SelectTrigger>
                                                           <SelectContent>
                                                               <SelectGroup>
                                                                   <SelectItem value="Order">Order</SelectItem>
                                                                   <SelectItem value="Billing">Billing</SelectItem>
                                                                   <SelectItem value="Service">Service</SelectItem>
                                                                   <SelectItem value="Internal Comment">Internal Comment</SelectItem>
                                                                   <SelectItem value="External Comment">External Comment</SelectItem>
                                                                   <SelectItem value="Audit">Audit</SelectItem>
                                                               </SelectGroup>
                                                           </SelectContent>
                                                       </Select>
                                                   </div>
                                               </div>
                                               <div className="flex items-center gap-3">
                                                   <Label htmlFor="Note">Note</Label>
                                                   <Textarea id="Note" name="Note" defaultValue="" />
                                               </div>
                                           </div>
                                       </DialogContent>
                                   </Dialog>
                               </TableHead>
                               <TableHead className="border p-1 text-white">Note</TableHead>
                               <TableHead className="border p-1 text-white">Created Date</TableHead>
                               <TableHead className="border p-1 text-white">Note Type</TableHead>
                               <TableHead className="border p-1 text-white">User Name</TableHead>
                           </TableRow>
                       </TableHeader>
                       <TableBody>
                           <TableRow>
                               <TableCell colSpan={5} className="border py-24 text-center">
                                   No data to display
                               </TableCell>
                           </TableRow>
                       </TableBody>
                   </Table>
               </TabsContent>
           </Tabs>
       </div>
   </div>
  );
}
