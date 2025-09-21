"use client";
import PageNav from '@/components/server/PageNav';
import TopButton from '@/components/ui/TopButton';
import {
    ArrowLeftRight,
    Box,
    Car,
    ChevronDown,
    CircleSlash2,
    CircleX,
    Columns2,
    HardDriveDownload,
    IdCard,
    Package,
    PackageCheck,
    PackageX,
    RotateCcw,
    Route,
    Save,
    Settings,
    Share,
    Square,
    Tag,
    Ungroup,
    User,
    UsersRound,
    UserX,
} from 'lucide-react';


import { Button } from '@/components/ui/button';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DynamicDispatchTable from "@/components/agent/client/dynamic-dispatch-table";
import DispatchVehicle from "@/components/agent/client/DispatchVehicle";

export default function DispatchBoards() {

    const [selectedCarriers, setSelectedCarriers] = React.useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCarrierSelectionChange = React.useCallback((carrierSelection: React.SetStateAction<Set<number>>) => {
        setIsLoading(true);

        setTimeout(() => {
            setSelectedCarriers(carrierSelection);
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div>
            <div className="mt-2 flex flex-wrap">
                <DispatchVehicle onCarrierSelectionChange={handleCarrierSelectionChange} />
                <div className="w-full lg:w-10/12">
                    <div className="mx-2">
                        <div className="mt-3 md:mt-0">
                            {/* Buttons Section */}
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <TopButton icon={Settings} label="Settings" onClick={() => {}} />
                                <TopButton icon={RotateCcw} label="Refresh" onClick={() => {}} />
                                <TopButton icon={User} label="Assign" onClick={() => {}} />
                                <TopButton icon={Car} label="Dispatch" onClick={() => {}} />
                                <TopButton icon={Box} label="Split Load(s)" onClick={() => {}} />
                                <TopButton icon={Car} label="Move Boards" onClick={() => {}} />
                                <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                <TopButton icon={IdCard} label="Waybill" onClick={() => {}} />
                                <TopButton icon={IdCard} label="Blind Waybill" onClick={() => {}} />
                                <TopButton icon={Tag} label="Labels" onClick={() => {}} />
                            </div>

                            {/* Info Section */}
                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
                                <div className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    Scheduled Loads
                                </div>
                                <div className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800">Web Loads</div>
                            </div>
                        </div>
                        <Tabs defaultValue="Ready-to-Ship">
                            <PageNav>
                                <TabsList>
                                    <TabsTrigger value="Ready-to-Ship">Ready to Ship</TabsTrigger>
                                    <TabsTrigger value="Quotes">Quotes</TabsTrigger>
                                    <TabsTrigger value="Schedule-Loads">Schedule Loads</TabsTrigger>
                                    <TabsTrigger value="Canceled">Canceled</TabsTrigger>
                                </TabsList>
                            </PageNav>
                            <TabsContent value="Ready-to-Ship">
                                <div className="">
                                    <PageNav className="py-2">
                                        <div className="text-center font-bold text-white">
                                            <p>Total Loads: 118 AND selected loads: 0</p>
                                        </div>
                                    </PageNav>
                                    <div className="mt-2">
                                        <div className="flex justify-between">
                                            <div>
                                                <p>Drag a column header here to group by that column</p>
                                            </div>
                                            <div>
                                                <div className="flex gap-2">
                                                    <div>
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
                                                                    <DropdownMenuItem>
                                                                        Export selected row to Excel
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="bg-sky-900 hover:bg-sky-950">
                                                                    <Columns2 />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Column Chooser</DialogTitle>
                                                                    <DialogDescription>
                                                                        To show/hide columns, check the ones you want to keep
                                                                        visible.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4">
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-City" />
                                                                        <Label htmlFor="Consignee-City">Consignee City</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Postal" />
                                                                        <Label htmlFor="Consignee-Postal">Consignee Postal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Province" />
                                                                        <Label htmlFor="Consignee-Province">
                                                                            Consignee Province
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Country" />
                                                                        <Label htmlFor="Consignee-Country">
                                                                            Consignee Country
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Instruction" />
                                                                        <Label htmlFor="Consignee-Instruction">
                                                                            Consignee Instruction
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Zone" />
                                                                        <Label htmlFor="Consignee-Zone">Consignee Zone</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Consignee-Dispatch-Zone" />
                                                                        <Label htmlFor="Consignee-Dispatch-Zone">
                                                                            Consignee Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="QTY" />
                                                                        <Label htmlFor="QTY">QTY</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Weight" />
                                                                        <Label htmlFor="Weight">Weight</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Load-ID" />
                                                                        <Label htmlFor="Load-ID">Load ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Customer-ID" />
                                                                        <Label htmlFor="Customer-ID">Customer ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Carrier-ID" />
                                                                        <Label htmlFor="Carrier-ID">Carrier ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Distance" />
                                                                        <Label htmlFor="Distance">Distance</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Dangerous-Goods" />
                                                                        <Label htmlFor="Dangerous-Goods">Dangerous Goods</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Truck-ID" />
                                                                        <Label htmlFor="Truck-ID">Truck ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tailor-ID" />
                                                                        <Label htmlFor="Tailor-ID">Tailor ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Base" />
                                                                        <Label htmlFor="Base">Base</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Fuel" />
                                                                        <Label htmlFor="Fuel">Fuel</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Other" />
                                                                        <Label htmlFor="Other">Other</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Subtotal" />
                                                                        <Label htmlFor="Subtotal">Subtotal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tax" />
                                                                        <Label htmlFor="Tax">Tax</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tax-1-Amount" />
                                                                        <Label htmlFor="Tax-1-Amount">Tax 1 Amount</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tax-1-Type" />
                                                                        <Label htmlFor="Tax-1-Type">Tax 1 Type</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tax-2-Amount" />
                                                                        <Label htmlFor="Tax-2-Amount">Tax 2 Amount</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Tax-2-Type" />
                                                                        <Label htmlFor="Tax-2-Type">Tax 2 Type</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Total-Amount" />
                                                                        <Label htmlFor="Total-Amount">Total Amount</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Column" />
                                                                        <Label htmlFor="Column">Column</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Profit" />
                                                                        <Label htmlFor="Profit">Profit</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Margin" />
                                                                        <Label htmlFor="Margin">Margin</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Load" />
                                                                        <Label htmlFor="Load">Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="LoadNoH" />
                                                                        <Label htmlFor="LoadNoH">LoadNoH</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Web-Load" />
                                                                        <Label htmlFor="Web-Load">Web Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Schedule-Load" />
                                                                        <Label htmlFor="Schedule-Load">Schedule Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox id="Declared-Value" />
                                                                        <Label htmlFor="Declared-Value">Declared Value</Label>
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancel</Button>
                                                                    </DialogClose>
                                                                    <Button type="submit">Save changes</Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <div>
                                                        <Button className="bg-sky-900 hover:bg-sky-950">
                                                            <Save />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container mt-2 w-full">
                                        {/* table */}
                                        <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
                                            <Table className="text-left text-sm rtl:text-right">
                                                <TableHeader>
                                                    <TableRow className="custom-nav-color mx-1 text-white">
                                                    <TableHead className="border-r border-white px-1 py-2">
                                                        <Square />
                                                    </TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Load</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Create</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Refe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">P.O No.</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Waybill...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Route</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Stop</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Service</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Vehicle</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp Sh...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp Sh...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp D...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp D...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Custo...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Custo...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Called...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Pickup...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Consig...</TableHead>
                                                </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border py-1">20</TableCell>
                                                        <TableCell className="border py-1">7/30/2025</TableCell>
                                                        <TableCell className="border py-1">CPACK</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2B 030</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">
                                                            <div className="flex gap-2">
                                                                <div className="h-4 w-2 bg-red-500"> </div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border py-1">Van</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">15/08/2025</TableCell>
                                                        <TableCell className="border py-1">21</TableCell>
                                                        <TableCell className="border py-1">Shopp...</TableCell>
                                                        <TableCell className="border py-1">Centra...</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">2646</TableCell>
                                                        <TableCell className="border py-1">23156T</TableCell>
                                                        <TableCell className="border py-1">Unit 1</TableCell>
                                                        <TableCell className="border py-1">Mississ</TableCell>
                                                        <TableCell className="border py-1">L4W 0..</TableCell>
                                                        <TableCell className="border py-1">Ontario</TableCell>
                                                        <TableCell className="border py-1">Canada</TableCell>
                                                        <TableCell className="border py-1">...</TableCell>
                                                        <TableCell className="border py-1">Vilas</TableCell>
                                                        <TableCell className="border py-1">H 03</TableCell>
                                                        <TableCell className="border py-1"></TableCell>
                                                        <TableCell className="border py-1">1C 180</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="Quotes">
                                <div>
                                    <PageNav className="mt-2 py-2">
                                        <div className="text-center text-white">Total Loads: 0 AND Selected Loads: 0</div>
                                    </PageNav>
                                    <div className="my-2">
                                        <div className="flex justify-between">
                                            <div>
                                                <p>Drag a column header here to group by that column</p>
                                            </div>
                                            <div>
                                                <div className="flex gap-2">
                                                    <div>
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
                                                                    <DropdownMenuItem>
                                                                        Export selected row to Excel
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="bg-sky-900 hover:bg-sky-950">
                                                                    <Columns2 />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Column Chooser</DialogTitle>
                                                                    <DialogDescription>
                                                                        To show/hide columns, check the ones you want to keep
                                                                        visible.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4">
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Alert" />
                                                                        <Label htmlFor="Alert">Alert</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Reference" />
                                                                        <Label htmlFor="Reference">Reference</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Route" />
                                                                        <Label htmlFor="Route">Route</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Stop" />
                                                                        <Label htmlFor="Stop">Stop</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Svc" />
                                                                        <Label htmlFor="Svc">Svc</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Vehicle" />
                                                                        <Label htmlFor="Vehicle">Vehicle</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Load-Status" />
                                                                        <Label htmlFor="Load-Status">Load Status</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Created-Date" />
                                                                        <Label htmlFor="Created-Date">Created Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Dispatched-Date" />
                                                                        <Label htmlFor="Dispatched-Date">Dispatched Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Ship-Date-Start" />
                                                                        <Label htmlFor="Exp-Ship-Date-Start">
                                                                            Exp Ship Date Start
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Ship-Date-End" />
                                                                        <Label htmlFor="Exp-Ship-Date-End">
                                                                            Exp Ship Date End
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Delivery-Date-Start" />
                                                                        <Label htmlFor="Exp-Delivery-Date-Start">
                                                                            Exp Delivery Date Start
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Delivery-Date-End" />
                                                                        <Label htmlFor="Exp-Delivery-Date-End">
                                                                            Exp Delivery Date End
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Arrival" />
                                                                        <Label htmlFor="Pickup-Arrival">Pickup Arrival</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Actual-Ship-Date" />
                                                                        <Label htmlFor="Actual-Ship-Date">Actual Ship Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Actual-Delivery-Date" />
                                                                        <Label htmlFor="Actual-Delivery-Date">
                                                                            Actual Delivery Date
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-Name" />
                                                                        <Label htmlFor="Customer-Name">Customer Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-Code" />
                                                                        <Label htmlFor="Customer-Code">Customer Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Called-In-By" />
                                                                        <Label htmlFor="Called-In-By">Called In By</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Code" />
                                                                        <Label htmlFor="Shipper-Code">Shipper Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Name" />
                                                                        <Label htmlFor="Shipper-Name">Shipper Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Strate-1" />
                                                                        <Label htmlFor="Shipper-Strate-1">Shipper Strate 1</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Strate-2" />
                                                                        <Label htmlFor="Shipper-Strate-2">Shipper Strate 2</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-City" />
                                                                        <Label htmlFor="Shipper-City">Shipper City</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Postal" />
                                                                        <Label htmlFor="Shipper-Postal">Shipper Postal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Province" />
                                                                        <Label htmlFor="Shipper-Province">Shipper Province</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Country" />
                                                                        <Label htmlFor="Shipper-Country">Shipper Country</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipping-Instructions" />
                                                                        <Label htmlFor="Shipping-Instructions">
                                                                            Shipping Instructions
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Zone" />
                                                                        <Label htmlFor="Shipper-Zone">Shipper Zone</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                        <Label htmlFor="Shipper-Dispatch-Zone">
                                                                            Shipper Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Rep" />
                                                                        <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                        <Label htmlFor="Shipper-Dispatch-Zone">
                                                                            Shipper Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Rep" />
                                                                        <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Code" />
                                                                        <Label htmlFor="Consignee-Code">Consignee Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Name" />
                                                                        <Label htmlFor="Consignee-Name">Consignee Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Street-1" />
                                                                        <Label htmlFor="Consignee-Street-1">
                                                                            Consignee Street 1
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Street-2" />
                                                                        <Label htmlFor="Consignee-Street-2">
                                                                            Consignee Street 2
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-City" />
                                                                        <Label htmlFor="Consignee-City">Consignee City</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Postal" />
                                                                        <Label htmlFor="Consignee-Postal">Consignee Postal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Province" />
                                                                        <Label htmlFor="Consignee-Province">
                                                                            Consignee Province
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Country" />
                                                                        <Label htmlFor="Consignee-Country">
                                                                            Consignee Country
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Instructions" />
                                                                        <Label htmlFor="Consignee-Instructions">
                                                                            Consignee Instructions
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Zone" />
                                                                        <Label htmlFor="Consignee-Zone">Consignee Zone</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Dispatch-Zone" />
                                                                        <Label htmlFor="Consignee-Dispatch-Zone">
                                                                            Consignee Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Waiting-Time" />
                                                                        <Label htmlFor="Consignee-Waiting-Time">
                                                                            Consignee Waiting Time
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="POD" />
                                                                        <Label htmlFor="POD">POD</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="P-O-No" />
                                                                        <Label htmlFor="P-O-No">P.O. No.</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Waybill/BL" />
                                                                        <Label htmlFor="Waybill/BL">Waybill/BL#</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="QTY" />
                                                                        <Label htmlFor="QTY">QTY</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Weight" />
                                                                        <Label htmlFor="Weight">Weight</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Load_ID" />
                                                                        <Label htmlFor="Load_ID">Load_ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-ID" />
                                                                        <Label htmlFor="Customer-ID">Customer ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Carrier_ID" />
                                                                        <Label htmlFor="Carrier_ID">Carrier_ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Web Load" />
                                                                        <Label htmlFor="Web Load">Web Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Scheduled Load" />
                                                                        <Label htmlFor="Scheduled Load">Scheduled Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Cubed  Weight" />
                                                                        <Label htmlFor="Cubed  Weight">Cubed Weight</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Distance" />
                                                                        <Label htmlFor="Distance">Distance</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Dangerous-Goods" />
                                                                        <Label htmlFor="Dangerous-Goods">Dangerous Goods</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Truck-ID" />
                                                                        <Label htmlFor="Truck-ID">Truck ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Trailor-ID" />
                                                                        <Label htmlFor="Trailor-ID">Trailor ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Currency" />
                                                                        <Label htmlFor="Currency">Currency</Label>
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancel</Button>
                                                                    </DialogClose>
                                                                    <Button type="submit">Save changes</Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <div>
                                                        <Button className="bg-sky-900 hover:bg-sky-950">
                                                            <Save />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* table */}
                                    <div className="container w-full">
                                        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
                                            <Table className="min-w-full text-left text-sm">
                                                <TableHeader>
                                                <TableRow className="mx-1 bg-slate-400">
                                                    <TableHead className="border-r border-white px-1 py-2"></TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Load</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Create</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Refere...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">P.O No...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Waybil...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Route</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Stop</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Service</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Vehicle</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp Sh...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp Sh...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp D...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Exp D...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Custo...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Custo...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Called...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Shippe...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Pickup...</TableHead>
                                                    <TableHead className="border-r border-white px-1 py-2">Consign...</TableHead>
                                                </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                <TableRow className="border">
                                                    <TableCell colSpan={31} className="py-14 text-center font-bold">
                                                        No Data
                                                    </TableCell>
                                                </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="Schedule-Loads">
                                <div>
                                    <PageNav className="mt-2 py-2">
                                        <div className="text-center text-white">Total Loads: 0 AND Selected Loads: 0</div>
                                    </PageNav>
                                    <div className="my-2">
                                        <div className="flex justify-between">
                                            <div>
                                                <p>Drag a column header here to group by that column</p>
                                            </div>
                                            <div>
                                                <div className="flex gap-2">
                                                    <div>
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
                                                                    <DropdownMenuItem>
                                                                        Export selected row to Excel
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button className="bg-sky-900 hover:bg-sky-950">
                                                                    <Columns2 />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Column Chooser</DialogTitle>
                                                                    <DialogDescription>
                                                                        To show/hide columns, check the ones you want to keep
                                                                        visible.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4">
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Alert" />
                                                                        <Label htmlFor="Alert">Alert</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Reference" />
                                                                        <Label htmlFor="Reference">Reference</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Route" />
                                                                        <Label htmlFor="Route">Route</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Stop" />
                                                                        <Label htmlFor="Stop">Stop</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Svc" />
                                                                        <Label htmlFor="Svc">Svc</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Vehicle" />
                                                                        <Label htmlFor="Vehicle">Vehicle</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Load-Status" />
                                                                        <Label htmlFor="Load-Status">Load Status</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Created-Date" />
                                                                        <Label htmlFor="Created-Date">Created Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Dispatched-Date" />
                                                                        <Label htmlFor="Dispatched-Date">Dispatched Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Ship-Date-Start" />
                                                                        <Label htmlFor="Exp-Ship-Date-Start">
                                                                            Exp Ship Date Start
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Ship-Date-End" />
                                                                        <Label htmlFor="Exp-Ship-Date-End">
                                                                            Exp Ship Date End
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Delivery-Date-Start" />
                                                                        <Label htmlFor="Exp-Delivery-Date-Start">
                                                                            Exp Delivery Date Start
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Exp-Delivery-Date-End" />
                                                                        <Label htmlFor="Exp-Delivery-Date-End">
                                                                            Exp Delivery Date End
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Arrival" />
                                                                        <Label htmlFor="Pickup-Arrival">Pickup Arrival</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Actual-Ship-Date" />
                                                                        <Label htmlFor="Actual-Ship-Date">Actual Ship Date</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Actual-Delivery-Date" />
                                                                        <Label htmlFor="Actual-Delivery-Date">
                                                                            Actual Delivery Date
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-Name" />
                                                                        <Label htmlFor="Customer-Name">Customer Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-Code" />
                                                                        <Label htmlFor="Customer-Code">Customer Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Called-In-By" />
                                                                        <Label htmlFor="Called-In-By">Called In By</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Code" />
                                                                        <Label htmlFor="Shipper-Code">Shipper Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Name" />
                                                                        <Label htmlFor="Shipper-Name">Shipper Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Strate-1" />
                                                                        <Label htmlFor="Shipper-Strate-1">Shipper Strate 1</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Strate-2" />
                                                                        <Label htmlFor="Shipper-Strate-2">Shipper Strate 2</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-City" />
                                                                        <Label htmlFor="Shipper-City">Shipper City</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Postal" />
                                                                        <Label htmlFor="Shipper-Postal">Shipper Postal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Province" />
                                                                        <Label htmlFor="Shipper-Province">Shipper Province</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Country" />
                                                                        <Label htmlFor="Shipper-Country">Shipper Country</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipping-Instructions" />
                                                                        <Label htmlFor="Shipping-Instructions">
                                                                            Shipping Instructions
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Zone" />
                                                                        <Label htmlFor="Shipper-Zone">Shipper Zone</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                        <Label htmlFor="Shipper-Dispatch-Zone">
                                                                            Shipper Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Rep" />
                                                                        <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                        <Label htmlFor="Shipper-Dispatch-Zone">
                                                                            Shipper Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Pickup-Rep" />
                                                                        <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Code" />
                                                                        <Label htmlFor="Consignee-Code">Consignee Code</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Name" />
                                                                        <Label htmlFor="Consignee-Name">Consignee Name</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Street-1" />
                                                                        <Label htmlFor="Consignee-Street-1">
                                                                            Consignee Street 1
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Street-2" />
                                                                        <Label htmlFor="Consignee-Street-2">
                                                                            Consignee Street 2
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-City" />
                                                                        <Label htmlFor="Consignee-City">Consignee City</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Postal" />
                                                                        <Label htmlFor="Consignee-Postal">Consignee Postal</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Province" />
                                                                        <Label htmlFor="Consignee-Province">
                                                                            Consignee Province
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Country" />
                                                                        <Label htmlFor="Consignee-Country">
                                                                            Consignee Country
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Instructions" />
                                                                        <Label htmlFor="Consignee-Instructions">
                                                                            Consignee Instructions
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Zone" />
                                                                        <Label htmlFor="Consignee-Zone">Consignee Zone</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Dispatch-Zone" />
                                                                        <Label htmlFor="Consignee-Dispatch-Zone">
                                                                            Consignee Dispatch Zone
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Consignee-Waiting-Time" />
                                                                        <Label htmlFor="Consignee-Waiting-Time">
                                                                            Consignee Waiting Time
                                                                        </Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="POD" />
                                                                        <Label htmlFor="POD">POD</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="P-O-No" />
                                                                        <Label htmlFor="P-O-No">P.O. No.</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Waybill/BL" />
                                                                        <Label htmlFor="Waybill/BL">Waybill/BL#</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="QTY" />
                                                                        <Label htmlFor="QTY">QTY</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Weight" />
                                                                        <Label htmlFor="Weight">Weight</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Load_ID" />
                                                                        <Label htmlFor="Load_ID">Load_ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Customer-ID" />
                                                                        <Label htmlFor="Customer-ID">Customer ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Carrier_ID" />
                                                                        <Label htmlFor="Carrier_ID">Carrier_ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Web Load" />
                                                                        <Label htmlFor="Web Load">Web Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Scheduled Load" />
                                                                        <Label htmlFor="Scheduled Load">Scheduled Load</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Cubed  Weight" />
                                                                        <Label htmlFor="Cubed  Weight">Cubed Weight</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Distance" />
                                                                        <Label htmlFor="Distance">Distance</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Dangerous-Goods" />
                                                                        <Label htmlFor="Dangerous-Goods">Dangerous Goods</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Truck-ID" />
                                                                        <Label htmlFor="Truck-ID">Truck ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Trailor-ID" />
                                                                        <Label htmlFor="Trailor-ID">Trailor ID</Label>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Checkbox defaultChecked id="Currency" />
                                                                        <Label htmlFor="Currency">Currency</Label>
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Cancel</Button>
                                                                    </DialogClose>
                                                                    <Button type="submit">Save changes</Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <div>
                                                        <Button className="bg-sky-900 hover:bg-sky-950">
                                                            <Save />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* table */}
                                    <div className="container mt-2">
                                        {/* table */}
                                        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
                                            <div className="min-w-full">
                                                <Table className="min-w-full text-left text-sm rtl:text-right">
                                                    <TableHeader>
                                                    <TableRow className="custom-nav-color mx-1 text-white">
                                                        <TableHead className="min-w-[50px] border-r border-white px-1 py-2">
                                                            <Square />
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">Load</TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Create
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">
                                                            Refe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            P.O No.
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Waybill...
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">
                                                            Route
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">Stop</TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Service
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Vehicle
                                                        </TableHead>
                                                        <TableHead className="min-w-[120px] border-r border-white px-1 py-2">
                                                            Exp Sh...
                                                        </TableHead>
                                                        <TableHead className="min-w-[120px] border-r border-white px-1 py-2">
                                                            Exp Sh...
                                                        </TableHead>
                                                        <TableHead className="min-w-[120px] border-r border-white px-1 py-2">
                                                            Exp D...
                                                        </TableHead>
                                                        <TableHead className="min-w-[120px] border-r border-white px-1 py-2">
                                                            Exp D...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Custo...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Custo...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Called...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Pickup...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                    </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                    <TableRow className="bg-green-400">
                                                        <TableCell className="border px-2 py-1">
                                                            <Checkbox checked />
                                                        </TableCell>
                                                        <TableCell className="border px-2 py-1">20</TableCell>
                                                        <TableCell className="border px-2 py-1">7/30/2025</TableCell>
                                                        <TableCell className="border px-2 py-1">CPACK</TableCell>
                                                        <TableCell className="border px-2 py-1"></TableCell>
                                                        <TableCell className="border px-2 py-1"></TableCell>
                                                        <TableCell className="border px-2 py-1">2B 030</TableCell>
                                                        <TableCell className="border px-2 py-1"></TableCell>
                                                        <TableCell className="border px-2 py-1">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-4 w-2 bg-red-500"></div>
                                                                <div>Nex</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border px-2 py-1">Van</TableCell>
                                                        <TableCell className="border px-2 py-1">15/08/2025</TableCell>
                                                        <TableCell className="border px-2 py-1">15/08/2025</TableCell>
                                                        <TableCell className="border px-2 py-1">15/08/2025</TableCell>
                                                        <TableCell className="border px-2 py-1">15/08/2025</TableCell>
                                                        <TableCell className="border px-2 py-1">21</TableCell>
                                                        <TableCell className="border px-2 py-1">Shopp...</TableCell>
                                                        <TableCell className="border px-2 py-1">Centra...</TableCell>
                                                        <TableCell className="border px-2 py-1"></TableCell>
                                                        <TableCell className="border px-2 py-1">2646</TableCell>
                                                        <TableCell className="border px-2 py-1">23156T</TableCell>
                                                        <TableCell className="border px-2 py-1">Unit 1</TableCell>
                                                        <TableCell className="border px-2 py-1">Mississ</TableCell>
                                                        <TableCell className="border px-2 py-1">L4W 0..</TableCell>
                                                        <TableCell className="border px-2 py-1">Ontario</TableCell>
                                                        <TableCell className="border px-2 py-1">Canada</TableCell>
                                                        <TableCell className="border px-2 py-1">...</TableCell>
                                                        <TableCell className="border px-2 py-1">Vilas</TableCell>
                                                        <TableCell className="border px-2 py-1">H 03</TableCell>
                                                        <TableCell className="border px-2 py-1"></TableCell>
                                                        <TableCell className="border px-2 py-1">1C 180</TableCell>
                                                    </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-5">
                            <Tabs defaultValue="In-Progress">
                                <PageNav>
                                    <TabsList>
                                        <TabsTrigger value="In-Progress">In Progress</TabsTrigger>
                                        <TabsTrigger value="Delivered">Delivered</TabsTrigger>
                                    </TabsList>
                                </PageNav>
                                <TabsContent value="In-Progress">
                                    <div className="w-full">
                                        <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0">
                                            <TopButton icon={RotateCcw} label="Refresh" onClick={() => {}} />
                                            <TopButton icon={UserX} label="UnAssign" onClick={() => {}} />
                                            <TopButton icon={Car} label="Dispatch" onClick={() => {}} />
                                            <TopButton icon={PackageCheck} label="Arrived at PU" onClick={() => {}} />
                                            <TopButton icon={Package} label="PickedUp" onClick={() => {}} />
                                            <TopButton icon={PackageX} label="UnPickedUp" onClick={() => {}} />
                                            <TopButton icon={PackageCheck} label="Arrived at DEL" onClick={() => {}} />
                                            <TopButton icon={PackageCheck} label="Delivered" onClick={() => {}} />
                                            <TopButton icon={ArrowLeftRight} label="Transfer" onClick={() => {}} />
                                            <TopButton icon={Ungroup} label="Split Load(s)" onClick={() => {}} />
                                            <TopButton icon={Route} label="Routing" onClick={() => {}} />
                                            <TopButton icon={IdCard} label="Waybill" onClick={() => {}} />
                                            <TopButton icon={IdCard} label="Blind Waybill" onClick={() => {}} />
                                            <TopButton icon={HardDriveDownload} label="Manifest" onClick={() => {}} />
                                            <TopButton icon={Tag} label="Labels" onClick={() => {}} />
                                            <TopButton icon={UsersRound} label="Send CC" onClick={() => {}} />
                                            <TopButton icon={UsersRound} label="View CC" onClick={() => {}} />
                                            <TopButton icon={CircleX} label="Cancel" onClick={() => {}} />
                                        </div>
                                        <div>
                                            <div className="my-2">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p>Drag a column header here to group by that column</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2">
                                                            <div>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button className="bg-sky-900 hover:bg-sky-950">
                                                                            {' '}
                                                                            <Share /> Export <ChevronDown />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="w-56" align="start">
                                                                        <DropdownMenuGroup>
                                                                            <DropdownMenuItem>
                                                                                Export all data to Excel
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                Export selected row to Excel
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuGroup>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                            <div>
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button className="bg-sky-900 hover:bg-sky-950">
                                                                            <Columns2 />
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                                                                        <DialogHeader>
                                                                            <DialogTitle>Column Chooser</DialogTitle>
                                                                            <DialogDescription>
                                                                                To show/hide columns, check the ones you want to
                                                                                keep visible.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <div className="grid gap-4">
                                                                            <div className="flex gap-3">
                                                                                <Checkbox defaultChecked id="Row" />
                                                                                <Label htmlFor="Row">Row</Label>
                                                                            </div>
                                                                            <div className="flex gap-3">
                                                                                <Checkbox defaultChecked id="Load-Number" />
                                                                                <Label htmlFor="Load-Number">Load Number</Label>
                                                                            </div>
                                                                            <div className="flex gap-3">
                                                                                <Checkbox id="LoadNoH" />
                                                                                <Label htmlFor="LoadNoH">LoadNoH</Label>
                                                                            </div>
                                                                            <div className="flex gap-3">
                                                                                <Checkbox defaultChecked id="Alert" />
                                                                                <Label htmlFor="Alert">Alert</Label>
                                                                            </div>
                                                                            <div className="flex gap-3">
                                                                                <Checkbox defaultChecked id="Reference" />
                                                                                <Label htmlFor="Reference">Reference</Label>
                                                                            </div>
                                                                            <div className="flex gap-3">
                                                                                <Checkbox defaultChecked id="Route" />
                                                                                <Label htmlFor="Route">Route</Label>
                                                                            </div>
                                                                        </div>
                                                                        <DialogFooter>
                                                                            <DialogClose asChild>
                                                                                <Button variant="outline">Cancel</Button>
                                                                            </DialogClose>
                                                                            <Button type="submit">Save changes</Button>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                            <div>
                                                                <Button className="bg-sky-900 hover:bg-sky-950">
                                                                    <Save />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <DynamicDispatchTable selectedCarriers={selectedCarriers} isLoading={isLoading} />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="Delivered">
                                    <div className="w-full">
                                        <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0">
                                            <TopButton icon={RotateCcw} label="Refresh" onClick={() => {}} />
                                            <TopButton icon={CircleSlash2} label="UnDeliver" onClick={() => {}} />
                                            <TopButton icon={UsersRound} label="View CC" onClick={() => {}} />
                                        </div>
                                    </div>
                                    <div>
                                        <PageNav className="mt-2 py-2">
                                            <div className="text-center text-white">Total Loads: 0 AND Selected Loads: 0</div>
                                        </PageNav>
                                        <div className="my-2">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p>Drag a column header here to group by that column</p>
                                                </div>
                                                <div>
                                                    <div className="flex gap-2">
                                                        <div>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button className="bg-sky-900 hover:bg-sky-950">
                                                                        {' '}
                                                                        <Share /> Export <ChevronDown />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="w-56" align="start">
                                                                    <DropdownMenuGroup>
                                                                        <DropdownMenuItem>
                                                                            Export all data to Excel
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            Export selected row to Excel
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuGroup>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                        <div>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button className="bg-sky-900 hover:bg-sky-950">
                                                                        <Columns2 />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[425px]">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Column Chooser</DialogTitle>
                                                                        <DialogDescription>
                                                                            To show/hide columns, check the ones you want to keep
                                                                            visible.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="grid gap-4">
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Alert" />
                                                                            <Label htmlFor="Alert">Alert</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Reference" />
                                                                            <Label htmlFor="Reference">Reference</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Route" />
                                                                            <Label htmlFor="Route">Route</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Stop" />
                                                                            <Label htmlFor="Stop">Stop</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Svc" />
                                                                            <Label htmlFor="Svc">Svc</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Vehicle" />
                                                                            <Label htmlFor="Vehicle">Vehicle</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Load-Status" />
                                                                            <Label htmlFor="Load-Status">Load Status</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Created-Date" />
                                                                            <Label htmlFor="Created-Date">Created Date</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Dispatched-Date" />
                                                                            <Label htmlFor="Dispatched-Date">
                                                                                Dispatched Date
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Exp-Ship-Date-Start" />
                                                                            <Label htmlFor="Exp-Ship-Date-Start">
                                                                                Exp Ship Date Start
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Exp-Ship-Date-End" />
                                                                            <Label htmlFor="Exp-Ship-Date-End">
                                                                                Exp Ship Date End
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox
                                                                                defaultChecked
                                                                                id="Exp-Delivery-Date-Start"
                                                                            />
                                                                            <Label htmlFor="Exp-Delivery-Date-Start">
                                                                                Exp Delivery Date Start
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Exp-Delivery-Date-End" />
                                                                            <Label htmlFor="Exp-Delivery-Date-End">
                                                                                Exp Delivery Date End
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Pickup-Arrival" />
                                                                            <Label htmlFor="Pickup-Arrival">Pickup Arrival</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Actual-Ship-Date" />
                                                                            <Label htmlFor="Actual-Ship-Date">
                                                                                Actual Ship Date
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Actual-Delivery-Date" />
                                                                            <Label htmlFor="Actual-Delivery-Date">
                                                                                Actual Delivery Date
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Customer-Name" />
                                                                            <Label htmlFor="Customer-Name">Customer Name</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Customer-Code" />
                                                                            <Label htmlFor="Customer-Code">Customer Code</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Called-In-By" />
                                                                            <Label htmlFor="Called-In-By">Called In By</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Code" />
                                                                            <Label htmlFor="Shipper-Code">Shipper Code</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Name" />
                                                                            <Label htmlFor="Shipper-Name">Shipper Name</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Strate-1" />
                                                                            <Label htmlFor="Shipper-Strate-1">
                                                                                Shipper Strate 1
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Strate-2" />
                                                                            <Label htmlFor="Shipper-Strate-2">
                                                                                Shipper Strate 2
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-City" />
                                                                            <Label htmlFor="Shipper-City">Shipper City</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Postal" />
                                                                            <Label htmlFor="Shipper-Postal">Shipper Postal</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Province" />
                                                                            <Label htmlFor="Shipper-Province">
                                                                                Shipper Province
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Country" />
                                                                            <Label htmlFor="Shipper-Country">
                                                                                Shipper Country
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipping-Instructions" />
                                                                            <Label htmlFor="Shipping-Instructions">
                                                                                Shipping Instructions
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Zone" />
                                                                            <Label htmlFor="Shipper-Zone">Shipper Zone</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                            <Label htmlFor="Shipper-Dispatch-Zone">
                                                                                Shipper Dispatch Zone
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Pickup-Rep" />
                                                                            <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Shipper-Dispatch-Zone" />
                                                                            <Label htmlFor="Shipper-Dispatch-Zone">
                                                                                Shipper Dispatch Zone
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Pickup-Rep" />
                                                                            <Label htmlFor="Pickup-Rep">Pickup Rep</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Code" />
                                                                            <Label htmlFor="Consignee-Code">Consignee Code</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Name" />
                                                                            <Label htmlFor="Consignee-Name">Consignee Name</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Street-1" />
                                                                            <Label htmlFor="Consignee-Street-1">
                                                                                Consignee Street 1
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Street-2" />
                                                                            <Label htmlFor="Consignee-Street-2">
                                                                                Consignee Street 2
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-City" />
                                                                            <Label htmlFor="Consignee-City">Consignee City</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Postal" />
                                                                            <Label htmlFor="Consignee-Postal">
                                                                                Consignee Postal
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Province" />
                                                                            <Label htmlFor="Consignee-Province">
                                                                                Consignee Province
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Country" />
                                                                            <Label htmlFor="Consignee-Country">
                                                                                Consignee Country
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox
                                                                                defaultChecked
                                                                                id="Consignee-Instructions"
                                                                            />
                                                                            <Label htmlFor="Consignee-Instructions">
                                                                                Consignee Instructions
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Consignee-Zone" />
                                                                            <Label htmlFor="Consignee-Zone">Consignee Zone</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox
                                                                                defaultChecked
                                                                                id="Consignee-Dispatch-Zone"
                                                                            />
                                                                            <Label htmlFor="Consignee-Dispatch-Zone">
                                                                                Consignee Dispatch Zone
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox
                                                                                defaultChecked
                                                                                id="Consignee-Waiting-Time"
                                                                            />
                                                                            <Label htmlFor="Consignee-Waiting-Time">
                                                                                Consignee Waiting Time
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="POD" />
                                                                            <Label htmlFor="POD">POD</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="P-O-No" />
                                                                            <Label htmlFor="P-O-No">P.O. No.</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Waybill/BL" />
                                                                            <Label htmlFor="Waybill/BL">Waybill/BL#</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="QTY" />
                                                                            <Label htmlFor="QTY">QTY</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Weight" />
                                                                            <Label htmlFor="Weight">Weight</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Load_ID" />
                                                                            <Label htmlFor="Load_ID">Load_ID</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Customer-ID" />
                                                                            <Label htmlFor="Customer-ID">Customer ID</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Carrier_ID" />
                                                                            <Label htmlFor="Carrier_ID">Carrier_ID</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Web Load" />
                                                                            <Label htmlFor="Web Load">Web Load</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Scheduled Load" />
                                                                            <Label htmlFor="Scheduled Load">Scheduled Load</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Cubed  Weight" />
                                                                            <Label htmlFor="Cubed  Weight">Cubed Weight</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Distance" />
                                                                            <Label htmlFor="Distance">Distance</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Dangerous-Goods" />
                                                                            <Label htmlFor="Dangerous-Goods">
                                                                                Dangerous Goods
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Truck-ID" />
                                                                            <Label htmlFor="Truck-ID">Truck ID</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Trailor-ID" />
                                                                            <Label htmlFor="Trailor-ID">Trailor ID</Label>
                                                                        </div>
                                                                        <div className="flex gap-3">
                                                                            <Checkbox defaultChecked id="Currency" />
                                                                            <Label htmlFor="Currency">Currency</Label>
                                                                        </div>
                                                                    </div>
                                                                    <DialogFooter>
                                                                        <DialogClose asChild>
                                                                            <Button variant="outline">Cancel</Button>
                                                                        </DialogClose>
                                                                        <Button type="submit">Save changes</Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                        <div>
                                                            <Button className="bg-sky-900 hover:bg-sky-950">
                                                                <Save />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container w-full">
                                            <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
                                                <Table className="min-w-full text-left text-sm">
                                                    <TableHeader>
                                                    <TableRow className="mx-1 bg-slate-400">
                                                        <TableHead className="min-w-[50px] border-r border-white px-1 py-2"></TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">Load</TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">
                                                            Row #
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">
                                                            Alert
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Refere...
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">
                                                            Route
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">Stop</TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Service
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Vehicle
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Load S...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Create...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Dispat...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Exp Sh...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Exp D...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Exp D...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Pickup...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Actual...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Custo...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Custo...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Called...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Pickup
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[80px] border-r border-white px-1 py-2">POD</TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Shippe...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Consig...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            P.O No.
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Waybill...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Load ID
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Custo...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Carrier...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Web L...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Sched...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Cubed...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Distance...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Dange...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Truck ID...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Trailor...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Currency
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Declar...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Finaliz...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Has C...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Base...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Fuel...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Other...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Subtotal...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Tax...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Tax1...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Tax1...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Tax2...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Tax2...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Total A...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Weath...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Comm...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Profit...
                                                        </TableHead>
                                                        <TableHead className="min-w-[100px] border-r border-white px-1 py-2">
                                                            Margin...
                                                        </TableHead>
                                                    </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                    <TableRow className="border">
                                                        <TableCell colSpan={75} className="py-14 text-center font-bold">
                                                            No Data
                                                        </TableCell>
                                                    </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
