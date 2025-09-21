"use client";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import TopButton from "@/components/ui/TopButton";
import {
  ChevronDownIcon,
  CircleX,
  Eye,
  FilePenLine,
  FilePlus2,
  FileText,
  FileX2,
  Plus,
  Save,
  SaveOff,
  ScrollText,
  Search,
  Trash,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { useState } from 'react';
import PageNav from "@/components/server/PageNav";

export default function Index() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [createdDate, setCreatedDate] = useState<Date | undefined>(new Date());
  const [createdDateOpen, setCreatedDateOpen] = useState(false);
  const [createdTime, setCreatedTime] = useState('12:00');
  const [isChecked, setIsChecked] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(new Date());
  const [expiryDateOpen, setExpiryDateOpen] = useState(false);
  const [selectedChargeOption, setSelectedChargeOption] = useState<string | null>(null);
  const [reviewExpiry, setReviewExpiry] = useState<Date | null>(null);
  const [reviewExpiryOpen, setReviewExpiryOpen] = useState(false);
  const [createdFromDate, setCreatedFromDate] = useState<Date | undefined>();
  const [createdToDate, setCreatedToDate] = useState<Date | undefined>();
  const [createdFromOpen, setCreatedFromOpen] = useState(false);
  const [createdToOpen, setCreatedToOpen] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
  const [effectiveDateOpen, setEffectiveDateOpen] = useState(false);
  const [commenceDate, setCommenceDate] = useState<Date | undefined>(undefined);
  const [commenceDateOpen, setCommenceDateOpen] = useState(false);

  const handleChargeOptionChange = (option: string) => {
    setSelectedChargeOption((prev) => (prev === option ? null : option));
  };

  const isDisabled = (option: string) => selectedChargeOption !== null && selectedChargeOption !== option;
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [sizeWeightUnit, setSizeWeightUnit] = useState('metric');
  const handleDateTimeSelect = (date: Date | undefined) => {
    if (!date) return;

    const [hours, minutes] = createdTime.split(':').map(Number);
    const finalDate = new Date(date);
    finalDate.setHours(hours);
    finalDate.setMinutes(minutes);
    setCreatedDate(finalDate);
    setCreatedDateOpen(false);
  };
  const [create, setCreate] = useState(false);

  const [prefix, setPrefix] = useState("Waybill-")
  const [invoicePrefix, setInvoicePrefix] = useState("Invoice-")
  const [fieldOnePrefix, setFieldOnePrefix] = useState("Field1-")
  const [fieldTwoPrefix, setFieldTwoPrefix] = useState("Field2-")
  const [timeOffsetPrefix, setTimeOffsetPrefix] = useState("-5.0")
  const [attachmentPrefix, setAttachmentPrefix] = useState("POD-")

  return (
    <div>
      <div className="mx-2">
        <div className="mt-3 flex gap-2 lg:mt-0">
          <TopButton icon={SaveOff} label="Save & Close" onClick={() => {}} />
          <TopButton icon={Save} label="Save" onClick={() => {}} />
          <TopButton icon={Trash} label="Delete" onClick={() => {}} />
          <TopButton icon={CircleX} label="Close" onClick={() => {}} />
        </div>

        <div className="container">
          <Tabs defaultValue="details" className="mt-3">
            <PageNav>
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="accounting">Accounting</TabsTrigger>
                <TabsTrigger value="shipping_address">Shipping Address</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="plans">Price Plans</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="sales_people">Sales People</TabsTrigger>
                <TabsTrigger value="alternate_names">Alternate Names</TabsTrigger>
                <TabsTrigger value="custom_fields">Custom Fields</TabsTrigger>
                <TabsTrigger value="carrier_account">Carrier Account</TabsTrigger>
                <TabsTrigger value="accessorial_types">Accessorial Types</TabsTrigger>
                <TabsTrigger value="edit_settings">EDI Settings</TabsTrigger>
                <TabsTrigger value="apis">APIs</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="audit">Audit</TabsTrigger>
              </TabsList>
            </PageNav>

            <TabsContent value="details">
              <div className="grid grid-cols-1 space-y-2 space-x-6 p-5 sm:grid-cols-2 lg:grid-cols-3 dark:bg-black">
                <div>
                  <Label className="text-rose-500 dark:text-rose-400">Company</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                      <SelectGroup>
                        <SelectItem value="Special Logistics">Special Logistics</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-danger dark:text-red-400">Start Date</Label>
                  <div>
                    <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                      <PopoverTrigger asChild className="w-full">
                        <Button variant="outline" className="text-left font-normal dark:border-gray-700 dark:text-gray-200">
                          {startDate ? startDate.toLocaleDateString() : <span>Start date</span>}
                          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                        <Calendar
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
                </div>
                <div>
                  <Label className="text-danger dark:text-red-400">End Date</Label>
                  <div>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild className="w-full">
                        <Button variant="outline" className="text-left font-normal dark:border-gray-700 dark:text-gray-200">
                          {endDate ? endDate.toLocaleDateString() : <span>End date</span>}
                          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={endDate}
                          onSelect={(selectedDate) => {
                            setEndDate(selectedDate);
                            setEndDateOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label className="dark:text-gray-200">Default Warehouse</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                      <SelectGroup>
                        <SelectItem value="Default Warehouse">Default Warehouse</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="dark:text-gray-200">Customer Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                      <SelectGroup>
                        <SelectItem value="Courier">Courier</SelectItem>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="dark:text-gray-200">Bill To Customer</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                      <SelectGroup>
                        <SelectItem value="Bill To Customer">Bill To Customer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex items-center gap-8">
                  <Label htmlFor="bookmark" className="dark:text-gray-200">
                    Bookmark
                  </Label>
                  <Checkbox id="bookmark" />
                </div>
              </div>

              <div className="grid-cols-s grid grid-cols-1 gap-6 p-5 lg:grid-cols-2 dark:text-gray-200">
                <div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <h2 className="mb-4 text-lg font-semibold dark:text-gray-100">Mailing Address</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id="bill_to_same" />
                        <Label htmlFor="bill_to_same">Bill To Same</Label>
                      </div>

                      <div>
                        <Label>Customer No*</Label>
                        <Input className="flex-grow" />
                      </div>
                    </div>
                    <div className="mb-2">
                      <Label>Customer Name</Label>
                      <Input className="flex-grow" />
                    </div>
                    <div className="mb-2">
                      <Label className="text-red-500">Street 1</Label>
                      <Input className="flex-grow" />
                    </div>
                    <div className="mb-2">
                      <Label className="min-w-[120px] dark:text-gray-800">Street 2</Label>
                      <Input className="flex-grow" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-red-500">City</Label>
                        <Input className="flex-grow" />
                      </div>
                      <div>
                        <Label className="text-red-500">Province</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Alberta">Alberta</SelectItem>
                              <SelectItem value="British Columbia">British Columbia</SelectItem>
                              <SelectItem value="Manitoba">Manitoba</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-red-500">Postal Code</Label>
                        <Input />
                      </div>
                      <div>
                        <Label className="text-red-500">Country</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Mexico">Mexico</SelectItem>
                              <SelectItem value="United States">United States</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <div className="mb-4">
                      <h2 className="mb-4 text-lg font-semibold dark:text-gray-100">Billing Details</h2>
                      <p className="mb-4 border-b">Payments & Terms</p>
                      <div className="grid grid-cols-1 items-center space-y-2 lg:grid-cols-2 lg:space-x-6">
                        <div>
                          <Label>Currency</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Canadian Dollar">Canadian Dollar</SelectItem>
                                <SelectItem value="USA Dollar">USA Dollar</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Payment Method</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Check">Check</SelectItem>
                                <SelectItem value="Cache">Cache</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Terms</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="On Receipt">On Receipt</SelectItem>
                                <SelectItem value="Net 10">Net 10</SelectItem>
                                <SelectItem value="Net 30">Net 30</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Billing Group</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weakly">Weakly</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Credit Percent</Label>
                          <Input placeholder="0%" />
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox id="per_load" />
                          <Label htmlFor="per_load">One Invoice Per Load</Label>
                        </div>
                        <div>
                          <Label className="min-w-[120px] text-rose-500">Limit</Label>
                          <Input placeholder="0.00%" />
                        </div>
                        <div>
                          <Label>Running Balance</Label>
                          <Input placeholder="0.00%" />
                        </div>
                        <div>
                          <Label>Late Payment Charge</Label>
                          <Input />
                        </div>
                        <div>
                          <Label>Late Payment Interest</Label>
                          <Input />
                        </div>
                        <div className="mt-2 flex items-center gap-3 lg:col-span-2">
                          <Checkbox
                            id="max_rate"
                            checked={isChecked}
                            onCheckedChange={(checked) => setIsChecked(checked === true)}
                          />
                          <Label htmlFor="max_rate">Max Carrier Commission Rate</Label>
                          <Input disabled={!isChecked} />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-6 dark:bg-gray-900 dark:text-gray-200">
                      <div className="rounded-md border p-5 dark:bg-black">
                        <div>
                          <p className="mb-4 border-b dark:text-gray-100">Invoice Report Parameters</p>
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                              <Label>Format</Label>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Detail">Detail</SelectItem>
                                    <SelectItem value="Simple">Simple</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Sort By</Label>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="By Load Number">By Load Number</SelectItem>
                                    <SelectItem value="By Created Date">By Created Date</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Group By</Label>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="None">None</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Sub Group By</Label>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="None">None</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Checkbox id={'new_page_group'} />
                              <Label htmlFor={'new_page_group'}>New Page After Group</Label>
                            </div>
                            <div className="flex gap-2">
                              <Checkbox id={'new_page_sub_group'} />
                              <Label htmlFor={'new_page_sub_group'}>New Page After Sub Group</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 rounded-md dark:bg-black">
                      <p className="mb-4 border-b dark:text-gray-100">Tax and Discount</p>
                      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
                        <div>
                          <Label>Discount Rate</Label>
                          <Input placeholder={'0'} />
                        </div>
                        <div className="flex gap-2">
                          <Checkbox id={'discount_rate_base_only'} />
                          <Label htmlFor={'discount_rate_base_only'}>Apply To Base Only</Label>
                        </div>
                        <div>
                          <Label>Discount Rate Web</Label>
                          <Input placeholder={'0'} />
                        </div>
                        <div className="flex gap-2">
                          <Checkbox id={'discount_rate_web_base_only'} />
                          <Label htmlFor={'discount_rate_web_base_only'}>Apply To Base Only</Label>
                        </div>
                        <div>
                          <Label>Fed. Tax Exemption #</Label>
                          <Input />
                        </div>
                        <div>
                          <Label>Prov. Tax Exemption #</Label>
                          <Input />
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 rounded-md dark:bg-black">
                      <p className="mb-4 border-b dark:text-gray-100">Credit Card Details</p>

                      {/* First row */}
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                          <Label className="min-w-[100px]">Type</Label>
                          <Select>
                            <SelectTrigger className="w-full text-sm sm:max-w-[220px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="hello">Hello</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="flex items-center gap-2">
                            <Checkbox id="credit_card_details" />
                            <Label htmlFor="credit_card_details" className="text-xs">
                              Show Credit Card Details On Load
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="adhoc_card_number" />
                            <Label htmlFor="adhoc_card_number" className="text-xs">
                              Adhoc Card Number
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Second row */}
                      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                          <Label className="min-w-[100px]">Number</Label>
                          <Input className="w-full sm:max-w-[220px]" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="approve_before_dispatch"
                            checked={selectedChargeOption === 'approve_before_dispatch'}
                            onCheckedChange={() => handleChargeOptionChange('approve_before_dispatch')}
                            disabled={isDisabled('approve_before_dispatch')}
                          />
                          <Label htmlFor="approve_before_dispatch" className="text-xs">
                            Approve Before Dispatch
                          </Label>
                          <span className="text-xs">or</span>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                          <Label className="min-w-[100px]">Name on Card</Label>
                          <Input className="w-full sm:max-w-[220px]" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="charge_daily"
                            checked={selectedChargeOption === 'charge_daily'}
                            onCheckedChange={() => handleChargeOptionChange('charge_daily')}
                            disabled={isDisabled('charge_daily')}
                          />
                          <Label htmlFor="charge_daily" className="text-xs">
                            Charge Daily
                          </Label>
                          <span className="text-xs">or</span>
                        </div>

                        <div className="block w-full lg:flex lg:items-center lg:gap-3">
                          <Label className="text-danger min-w-[100px] dark:text-red-400">Expiry</Label>
                          <div>
                            <Popover open={expiryDateOpen} onOpenChange={setExpiryDateOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal sm:max-w-[220px] dark:border-gray-700 dark:text-gray-200"
                                >
                                  {expiryDate ? expiryDate.toLocaleDateString() : <span>Select Expiry</span>}
                                  <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                                <Calendar
                                  mode="single"
                                  captionLayout="dropdown"
                                  selected={expiryDate}
                                  onSelect={(selectedDate) => {
                                    setExpiryDate(selectedDate);
                                    setExpiryDateOpen(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="charge_on_net_terms"
                            checked={selectedChargeOption === 'charge_on_net_terms'}
                            onCheckedChange={() => handleChargeOptionChange('charge_on_net_terms')}
                            disabled={isDisabled('charge_on_net_terms')}
                          />
                          <Label htmlFor="charge_on_net_terms" className="text-xs">
                            Charge On Net Terms
                          </Label>
                          <span className="text-xs">or</span>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                          <Label className="min-w-[100px]">CVV</Label>
                          <Input className="w-full sm:max-w-[220px]" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="charge_manually"
                            checked={selectedChargeOption === 'charge_manually'}
                            onCheckedChange={() => handleChargeOptionChange('charge_manually')}
                            disabled={isDisabled('charge_manually')}
                          />
                          <Label htmlFor="charge_manually" className="text-xs">
                            Charge Manually
                          </Label>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                          <Label className="min-w-[100px]">Surcharge %</Label>
                          <Input type="number" className="w-full sm:max-w-[220px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b">Customer Logo</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="use_logo_for_labels" />
                        <Label htmlFor="use_logo_for_labels">Use Logo For Labels</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="use_logo_for_waybills" />
                        <Label htmlFor="use_logo_for_waybills">Use Logo For Waybills</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="use_logo_for_blind_waybills" />
                        <Label htmlFor="use_logo_for_blind_waybills">Use Logo For Blind Waybills</Label>
                      </div>
                      <div>
                        <Input type={'file'} />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b">POP and POD</p>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_pu_name" />
                        <Label htmlFor="require_pu_name">Require PU Name?</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_pu_signature" />
                        <Label htmlFor="require_pu_signature">Require PU Signature?</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_pu_image" />
                        <Label htmlFor="require_pu_image">Require PU Image?</Label>
                      </div>
                      <div className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                        <Input type="search" placeholder="Category PU Image" className="pl-8 placeholder:text-xs" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_del_name" />
                        <Label htmlFor="require_del_name">Require DEL Name?</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_del_signature" />
                        <Label htmlFor="require_del_signature">Require DEL Signature?</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="require_del_image" />
                        <Label htmlFor="require_del_image">Require DEL Image?</Label>
                      </div>
                      <div className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                        <Input type="search" placeholder="Category DEL Image" className="pl-8 placeholder:text-xs" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <div className="mb-6">
                      <p className="mb-4 border-b">Shipping</p>
                      <div className="mb-6 flex items-center">
                        <Label className="min-w-[100px]">Pickup</Label>
                        <div className="relative flex-grow">
                          <Input placeholder="Search Pickup" className="w-full pr-10" />
                          <Search className="text-muted-foreground absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Label className="min-w-[100px]">Delivery</Label>
                        <div className="relative flex-grow">
                          <Input placeholder="Search Delivery" className="w-full pr-10" />
                          <Search className="text-muted-foreground absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 border-b">Packages</p>
                      <div className="overflow-x-auto rounded-md border text-sm">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead
                                className="item flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                                onClick={() => setCreate(true)}
                              >
                                <FilePlus2 className="text-blue-500" />
                              </TableHead>
                              <TableHead className="border-s">Code</TableHead>
                              <TableHead className="border-s">Desc</TableHead>
                              <TableHead className="border-s">Avg Wt</TableHead>
                              <TableHead className="border-s">L</TableHead>
                              <TableHead className="border-s">W</TableHead>
                              <TableHead className="border-s">H</TableHead>
                              <TableHead className="border-s">
                                Use In
                                <br />
                                Total Qty Cnt
                              </TableHead>
                              <TableHead className="border-s">
                                Use
                                <br />
                                Wt/Size As Defaults
                              </TableHead>
                              <TableHead className="border-s">
                                Use
                                <br />
                                Wt/Size As Minimum
                              </TableHead>
                              <TableHead className="border-s">
                                Allow
                                <br />
                                Clients To Use
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {create && (
                              <TableRow>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button type="button" variant={'outline'}>
                                      <Save className="cursor-pointer text-blue-500" />
                                    </Button>
                                    <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                                      <Trash2 className="cursor-pointer text-red-500" />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                                <TableCell className="border">
                                  <Input />
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <h2 className="mb-4 text-lg font-semibold dark:text-gray-100">Billing Contact</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-2 xl:space-x-3">
                      <div>
                        <Label>Created Date</Label>
                        <div>
                          <Popover open={createdDateOpen} onOpenChange={setCreatedDateOpen}>
                            <PopoverTrigger asChild className="w-full">
                              <Button
                                variant="outline"
                                className="justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                              >
                                {createdDate ? createdDate.toLocaleString() : <span>Select date and time</span>}
                                <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4 dark:bg-gray-800 dark:text-gray-200" align="end">
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={createdDate}
                                onSelect={handleDateTimeSelect}
                              />
                              <div className="mt-2">
                                <Label htmlFor="time" className="mb-1 block text-sm">
                                  Time
                                </Label>
                                <input
                                  type="time"
                                  id="time"
                                  value={createdTime}
                                  onChange={(e) => setCreatedTime(e.target.value)}
                                  className="w-full rounded-md border px-2 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div>
                        <Label>Contact Name</Label>
                        <Input className="flex-grow" />
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input type="email" className="flex-grow" />
                      </div>

                      <div>
                        <Label>Phone</Label>
                        <Input type="tel" className="flex-grow" />
                      </div>

                      <div>
                        <Label>Cell Phone Number</Label>
                        <Input type="tel" className="flex-grow" />
                      </div>

                      <div>
                        <Label>Fax</Label>
                        <Input className="flex-grow" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b pb-1 font-medium">Tolls Settings</p>

                    <div className="mb-4 flex items-center space-x-2">
                      <Checkbox id={'avoid_tolls'} />
                      <Label htmlFor="avoid_tolls">Avoid Tolls</Label>
                    </div>

                    <div className="overflow-hidden rounded-md border">
                      <Table className="w-full text-left text-sm">
                        <TableHeader className="text-white">
                          <TableRow>
                            <TableHead
                              className="custom-nav-color flex cursor-pointer justify-center border-r px-1 py-2 text-white dark:border-gray-600"
                              onClick={() => setCreate(true)}
                            >
                              <FilePlus2 />
                            </TableHead>
                            <TableHead className="custom-nav-color border-r p-2 text-white">Country</TableHead>
                            <TableHead className="custom-nav-color p-2 text-white">Code</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {create && (
                            <TableRow>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button type="button" variant={'outline'}>
                                    <Save className="cursor-pointer text-blue-500" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={'outline'}
                                    onClick={() => setCreate(false)}
                                  ></Button>
                                </div>
                              </TableCell>
                              <TableCell className="border">
                                <Input />
                              </TableCell>
                              <TableCell className="border">
                                <Input />
                              </TableCell>
                            </TableRow>
                          )}

                          <TableRow className="border-t bg-gray-100 dark:bg-black">
                            <TableCell className="border-r p-2">
                              {
                                <div className="flex space-x-2">
                                  <button className="text-green-600 hover:text-green-700">
                                    <Save className="h-4 w-4 text-blue-500" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-700">
                                    <FileX2 className="h-4 w-4 text-red-500" />
                                  </button>
                                </div>
                              }
                            </TableCell>
                            <TableCell className="border-r p-2">Canada</TableCell>
                            <TableCell className="p-2">CAN</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b pb-1 font-medium">Client Settings</p>
                    <div className="flex items-center space-x-4">
                      <Label className="min-w-[180px]">Allow Load Edit Status</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b pb-1 font-medium">Other Settings</p>

                    <div className="grid grid-cols-1 items-center gap-4 xl:grid-cols-2">
                      <div>
                        <Label>Default Reference</Label>
                        <Input />
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="close_times" />
                        <Label htmlFor="close_times">Enforce Address Close Times</Label>
                      </div>
                      <div>
                        <Label className="text-xs text-rose-500">Default Package</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="case">Case</SelectItem>
                              <SelectItem value="close">Close</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Reference Template</Label>
                        <Input />
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="weekend_restrictions" />
                        <Label htmlFor="weekend_restrictions">Enforce Weekend Restrictions</Label>
                      </div>
                      <div>
                        <Label>Default Package</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="cube_van">Cube Van</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Default PO</Label>
                        <Input />
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="holiday_restrictions" />
                        <Label htmlFor="holiday_restrictions">Enforce Holiday Restrictions</Label>
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="activate_edi" />
                        <Label htmlFor="activate_edi">Activate EDI</Label>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      <div className="flex flex-col gap-2">
                        <Label className="text-xs text-rose-500">Distance Unit</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="km" checked={distanceUnit === 'km'} onCheckedChange={() => setDistanceUnit('km')} />
                          <Label htmlFor="km" className="text-xs">
                            Km
                          </Label>

                          <Checkbox id="mi" checked={distanceUnit === 'mi'} onCheckedChange={() => setDistanceUnit('mi')} />
                          <Label htmlFor="mi" className="text-xs">
                            Mi
                          </Label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="enforce_service_cutoffs" />
                        <Label htmlFor="enforce_service_cutoffs">Enforce Service Cutoffs</Label>
                      </div>
                      <div className="flex gap-2">
                        <Checkbox id="activate_api" />
                        <Label htmlFor="activate_api">Activate API</Label>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-rose-500">Size & Weight Units</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="metric"
                            checked={sizeWeightUnit === 'metric'}
                            onCheckedChange={() => setSizeWeightUnit('metric')}
                          />
                          <Label htmlFor="metric" className="text-xs">
                            Metric
                          </Label>

                          <Checkbox
                            id="imperial"
                            checked={sizeWeightUnit === 'imperial'}
                            onCheckedChange={() => setSizeWeightUnit('imperial')}
                          />
                          <Label htmlFor="imperial" className="text-xs">
                            Imperial
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Checkbox id="save_addresses" />
                        <Label htmlFor="save_addresses">Save Addresses</Label>
                      </div>

                      <div className="flex gap-2">
                        <Checkbox id="activate_importer" />
                        <Label htmlFor="activate_importer">Activate Importer</Label>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs text-rose-500">Cubed Weight Factor</Label>
                        <Input />
                        <span className="text-xs text-rose-500">
                                                    (Cubed Weight Factor must be relevant to the selected type of size and wt units)
                                                </span>
                      </div>

                      <div className="flex gap-2">
                        <Checkbox id="distance_to_picup" />
                        <Label htmlFor="distance_to_picup">Include Distance To Pickup</Label>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
                      <div className="flex gap-2">
                        <Checkbox id="deficit_weight" />
                        <Label htmlFor="deficit_weight">Use Deficit Weight</Label>
                      </div>
                      <div>
                        <Label>Waybill Prefix - PDF</Label>
                        <Input value={prefix}
                               onChange={(e) => setPrefix(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Custom Field1</Label>
                        <Input value={fieldOnePrefix} onChange={(e)=>setFieldOnePrefix(e.target.value)} />
                      </div>
                      <div>
                        <Label>Waybill Prefix - Excel</Label>
                        <Input  value={prefix}
                               onChange={(e) => setPrefix(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Custom Field2</Label>
                        <Input value={fieldTwoPrefix} onChange={(e)=>setFieldTwoPrefix(e.target.value)} />
                      </div>
                      <div>
                        <Label>Invoice Prefix - Excel</Label>
                        <Input value={invoicePrefix} onChange={(e)=>setInvoicePrefix(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Invoice Prefix - PDF</Label>
                        <Input value={invoicePrefix} onChange={(e)=>setInvoicePrefix(e.target.value)}/>
                      </div>
                      <div>
                        <Label className="w-2/3 text-xs text-rose-500">Time Offset</Label>
                        <Input value={timeOffsetPrefix} onChange={(e)=>setTimeOffsetPrefix(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Attachment Prefix</Label>
                        <Input value={attachmentPrefix} onChange={(e)=>setAttachmentPrefix(e.target.value)} />
                      </div>
                      <div>
                        <Label>Review Expiry</Label>
                        <Popover open={reviewExpiryOpen} onOpenChange={setReviewExpiryOpen}>
                          <PopoverTrigger asChild>
                            <button
                              className="flex w-full items-center justify-start rounded-md border px-3 py-2 text-left font-normal dark:border-gray-700 dark:text-gray-200"
                              type="button"
                            >
                              {reviewExpiry ? (
                                reviewExpiry.toLocaleDateString()
                              ) : (
                                <span className="text-gray-400">Select date</span>
                              )}
                              <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setReviewExpiry(date ?? null);
                                setReviewExpiryOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b pb-1 font-medium">
                      Alerts for Consignees (Use contact settings for individual user alerts)
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-end gap-4">
                        <Label htmlFor={'allow_texting'}>Allow Texting</Label>
                        <Checkbox id={'allow_texting'} />
                      </div>
                    </div>

                    <Table className={'mt-6 w-full border-0'}>
                      <TableHeader className={'mb-4'}>
                        <TableRow>
                          <TableCell className="px-4 py-2">Consignee</TableCell>
                          <TableCell className="px-4 py-2">Incl Attachment</TableCell>
                          <TableCell className="px-4 py-2">Consignee</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="new_load_email" />
                          <Label htmlFor="new_load_email">New Load Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="new_load_text" />
                          <Label htmlFor="new_load_text">New Load Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="dispatch_email" />
                          <Label htmlFor="dispatch_email">Dispatch Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="dispatch_text" />
                          <Label htmlFor="dispatch_text">Dispatch Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="pickup_arrival_email" />
                          <Label htmlFor="pickup_arrival_email">Pickup Arrival Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="pickup_arrival_text" />
                          <Label htmlFor="pickup_arrival_text">Pickup Arrival Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="pickup_email" />
                          <Label htmlFor="pickup_email">Pickup Via Email</Label>
                        </TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="pickup_text" />
                          <Label htmlFor="pickup_text">Pickup Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="delivery_arrival_email" />
                          <Label htmlFor="delivery_arrival_email">Delivery Arrival Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="delivery_arrival_text" />
                          <Label htmlFor="delivery_arrival_text">Delivery Arrival Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="delivered_email" />
                          <Label htmlFor="delivered_email">Delivered Via Email</Label>
                        </TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="delivered_text" />
                          <Label htmlFor="delivered_text">Delivered Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="cancelled_email" />
                          <Label htmlFor="cancelled_email">Cancelled Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="cancelled_text" />
                          <Label htmlFor="cancelled_text">Cancelled Via Text</Label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="waiting_time_email" />
                          <Label htmlFor="waiting_time_email">Waiting Time Via Email</Label>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="mb-3 flex items-center gap-2">
                          <Checkbox id="waiting_time_text" />
                          <Label htmlFor="waiting_time_text">Waiting Time Via Text</Label>
                        </TableCell>
                      </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mb-5 rounded-md border p-5 dark:bg-black">
                    <p className="mb-4 border-b pb-1 font-medium">
                      Alerts for Consignees (Use contact settings for individual user alerts)
                    </p>
                    <p className={'text-xs text-rose-500'}>
                      *Please select the customer(s) below for which you want the invoices to be forwarded to this customer:
                    </p>

                    <div className="overflow-hidden rounded-md">
                      <div className="relative mb-2">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                    <Search className="h-4 w-4" />
                                                </span>
                        <Input type="search" placeholder="Search..." className="pl-8" />
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="custom-nav-color">
                            <TableHead className="border-r p-2 text-white">#</TableHead>
                            <TableHead className="border-r p-2 text-white">Name</TableHead>
                            <TableHead className="p-2 text-white">Allowed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Loblaws Inc</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Loblaws Inc - DC80</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Loblaws Inc - DC80 Returns</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Loblaws Inc.</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Princess Margaret</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Shoppers Drug Mart</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Shoppers Drug Mart - MedsLink</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Shoppers Drug Mart 4868</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Specialty Health Network</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Specialty House Account</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Toronto General Hospital</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Toronto General Hospital-2</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Toronto General Hospital-3</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-t">
                            <TableCell className="border-r p-2">
                              <FilePenLine className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="border-r p-2">Toronto Western Hospital</TableCell>
                            <TableCell className="p-2 text-center">
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="accounting" className={'bg-slate-50'}>
              <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 xl:grid-cols-3 dark:bg-black">
                <div className="mb-5 rounded-md border p-5 dark:bg-black">
                  <p className="mb-4 border-b">Invoice Search</p>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <Label>GL Types:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Invoice">Invoice</SelectItem>
                            <SelectItem value="Payment">Payment</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>GL #:</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>Reference#:</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>Batch#:</Label>
                      <Input />
                    </div>
                    <div>
                      <Label htmlFor="created_from_date" className="mb-1 block text-xs">
                        Created From
                      </Label>
                      <Popover open={createdFromOpen} onOpenChange={setCreatedFromOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="created_from_date"
                            className="w-full justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                          >
                            {createdFromDate ? createdFromDate.toLocaleDateString() : <span>Pick a date</span>}
                            <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={createdFromDate}
                            onSelect={(date) => {
                              setCreatedFromDate(date);
                              setCreatedFromOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="created_to_date" className="mb-1 block text-xs">
                        Created To
                      </Label>
                      <Popover open={createdToOpen} onOpenChange={setCreatedToOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="created_to_date"
                            className="w-full justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                          >
                            {createdToDate ? createdToDate.toLocaleDateString() : <span>Pick a date</span>}
                            <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={createdToDate}
                            onSelect={(date) => {
                              setCreatedToDate(date);
                              setCreatedToOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Button type={'button'}>Search</Button>
                    <Button type={'button'}>Clear</Button>
                  </div>
                </div>
                <div className="mb-5 rounded-md border p-5 dark:bg-black">
                  <p className="mb-4 border-b">Debits and Credits</p>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <Label>GL Types:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Credit">Credit</SelectItem>
                            <SelectItem value="Debit">Debit</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="effective_date" className="mb-1 block text-xs">
                        Effective Date
                      </Label>
                      <Popover open={effectiveDateOpen} onOpenChange={setEffectiveDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                          >
                            {effectiveDate ? effectiveDate.toLocaleDateString() : <span>Effective Date</span>}
                            <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200" align="end">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={effectiveDate}
                            onSelect={(selectedDate) => {
                              setEffectiveDate(selectedDate);
                              setEffectiveDateOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Subtotal:</Label>
                      <Input />
                    </div>

                    <div>
                      <Label>Tax Type:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="GST">GST</SelectItem>
                            <SelectItem value="PST">PST</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tax:</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>Total:</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>Apply to Invoice #:</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="One">One</SelectItem>
                            <SelectItem value="Two">Two</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button type={'button'}>Save</Button>
                  </div>
                </div>
                <div className="mb-5 flex flex-col items-center justify-center gap-2 rounded-md border p-5 dark:bg-black">
                  <Button type="button" className="flex w-48 items-center justify-center">
                    <Eye className="mr-1 h-4 w-4" />
                    Credit Report
                  </Button>
                  <Button type="button" className="flex w-48 items-center justify-center">
                    <Eye className="mr-1 h-4 w-4" />
                    Statement
                  </Button>
                  <Button type="button" className="flex w-48 items-center justify-center">
                    <Undo2 className="mr-1 h-4 w-4" />
                    Resend Statement
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-4 text-center font-semibold text-rose-500 italic">
                  * Please note when the partially/fully paid invoice is cancelled, system automatically creates the credit note for
                  the received payment(s).
                </p>
                <Tabs defaultValue="change-status">
                  <PageNav className="py-2">
                    <div className="text-center">
                      <span className="text-center text-white">Total Loads: 0</span>
                    </div>
                  </PageNav>
                  <div className="flex justify-end gap-2">
                    <Button type="button" className="bg-white">
                      <FileText className="h-4 w-4 text-black" />
                    </Button>
                    <Button type="button" className="bg-white">
                      <ScrollText className="h-4 w-4 text-black" />
                    </Button>
                    <Button type="button" className="bg-white">
                      <Save className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                  <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                    <TableHead className="custom-nav-color text-left">
                      <TableRow>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Actions</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">GL Type</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Batch #</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Created</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Number</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Reference</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Apply To</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Effective</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Due Date</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Amount</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Tax Amount</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Total Amount</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Invoice Balance</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Running Balance</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Payment Method</TableHead>
                        <TableHead className="border-r px-3 py-2 text-xs text-white">Memo</TableHead>
                      </TableRow>
                    </TableHead>
                    <tbody>
                    <TableRow>
                      <TableCell colSpan={16} className="py-14 text-center font-bold text-gray-500 dark:text-gray-400">
                        No Data
                      </TableCell>
                    </TableRow>
                    </tbody>
                  </Table>
                </Tabs>
              </div>
            </TabsContent>
            <TabsContent value="shipping_address" className="bg-slate-50 dark:bg-black">
              <div className="p-5">
                <p className="mb-4 text-center font-bold">Total Addresses: 0</p>
                <div className="relative mb-4">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input type="search" placeholder="Search..." className="w-full pl-10" />
                </div>

                <div className="overflow-auto">
                  <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                    <TableHead className="custom-nav-color">
                      <TableRow>
                        <TableHead className="border-r px-2 py-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[80vh] w-full !max-w-3xl overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Form</DialogTitle>
                              </DialogHeader>

                              <div className="grid grid-cols-2 gap-6 rounded border p-3 py-4">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="active" />
                                  <Label htmlFor="active">Active</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="locked" />
                                  <Label htmlFor="locked">Locked</Label>
                                </div>
                                <div className="col-span-2 flex flex-col gap-1">
                                  <Label>Name</Label>
                                  <Input placeholder="Enter name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Address Code</Label>
                                  <Input placeholder="Enter address code" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Customer No</Label>
                                  <Input placeholder="Enter customer number" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Open Time</Label>
                                  <Input type="time" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Close Time</Label>
                                  <Input type="time" />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id="requires_tailgate" />
                                  <Label htmlFor="requires_tailgate">Requires Tailgate</Label>
                                </div>
                              </div>

                              <div className="mt-4 space-y-3 rounded border p-3">
                                <div>
                                  <Label>Street 1:</Label>
                                  <div className="relative">
                                    <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                                    <Input className="pl-8" />
                                  </div>
                                </div>
                                <div>
                                  <Label>Street 2:</Label>
                                  <Input />
                                </div>
                                <div>
                                  <Label>Street 3:</Label>
                                  <Input />
                                </div>
                                <div>
                                  <Label>Street 4:</Label>
                                  <Input />
                                </div>
                                <div>
                                  <div>
                                    <Label>City</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Province:</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="alberta">Alberta</SelectItem>
                                          <SelectItem value="British">British</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Country:</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="Canada">Canada</SelectItem>
                                          <SelectItem value="Mexico">Mexico</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Instructions:</Label>
                                    <Input />
                                  </div>
                                  <div className="col-span-2">
                                    <Label>Instructions:</Label>
                                    <Textarea className="w-full" />
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-4 rounded border p-3">
                                <div>
                                  <Label>Name</Label>
                                  <Input />
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <Input type="email" />
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <Input type="tel" />
                                </div>
                                <div>
                                  <Label>Fax</Label>
                                  <Input />
                                </div>
                              </div>

                              <div className="text-muted-foreground mt-4 grid grid-cols-[1fr_0.5fr_1fr_0.5fr] rounded text-sm">
                                <p>Created By:</p>
                                <p>Date:</p>
                                <p>Updated By:</p>
                                <p>Date:</p>
                              </div>

                              <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableHead>
                        <TableHead className="border px-2 py-2 text-white">Name</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Customer Number</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Address Code</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Street1</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Street2</TableHead>
                        <TableHead className="border px-2 py-2 text-white">City</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Province</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Country</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Active</TableHead>
                      </TableRow>
                    </TableHead>
                    <tbody>
                    <TableRow>
                      <TableCell colSpan={10} className="py-6 text-center font-medium text-gray-500 dark:text-gray-400">
                        No Addresses Found
                      </TableCell>
                    </TableRow>
                    </tbody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contacts" className="bg-slate-50 dark:bg-black">
              <div className="p-5">
                <p className="mb-4 text-center font-bold">Total Addresses: 0</p>
                <div className="relative mb-4">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input type="search" placeholder="Search..." className="w-full pl-10" />
                </div>

                <div className="overflow-auto">
                  <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                    <TableHead className="custom-nav-color">
                      <TableRow>
                        <TableHead className="border-r px-2 py-2">
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>

                              <DialogContent className="max-h-[80vh] w-full !max-w-2xl overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Form</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="rounded border p-3">
                                    <p className="bold mb-4 border-b">Details</p>
                                    <div className="mb-3 flex gap-4">
                                      <Label htmlFor="billing_contact">Default Billing Contact:</Label>
                                      <Checkbox id="billing_contact" />
                                    </div>

                                    <div className="mb-2">
                                      <Label>Contact Type:</Label>
                                      <Select>
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="Billing">Billing</SelectItem>
                                            <SelectItem value="Collections">Collections</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="mb-2">
                                      <Label>Department:</Label>
                                      <Select>
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="one">One</SelectItem>
                                            <SelectItem value="two">Two</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="mb-2">
                                      <Label>Title:</Label>
                                      <Select>
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="Dr.">Dr.</SelectItem>
                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                            <SelectItem value="Mrs.">Mrs.</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="mb-2">
                                      <Label>Name:</Label>
                                      <Input type="text" />
                                    </div>

                                    <div className="mb-2">
                                      <Label>Email:</Label>
                                      <Input type="email" />
                                    </div>

                                    <div className="mb-2">
                                      <Label>Password:</Label>
                                      <Input type="password" />
                                    </div>
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Access Settings</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="active" />
                                        <Label htmlFor="active">Active</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="is_admin" />
                                        <Label htmlFor="is_admin">Is Admin</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="web_access" />
                                        <Label htmlFor="web_access">Web Access</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="account_locked" />
                                        <Label htmlFor="account_locked">Account Locked</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="reset_password_on_login" />
                                        <Label htmlFor="reset_password_on_login">
                                          Reset Password On Login
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="allow_edit_credit_card" />
                                        <Label htmlFor="allow_edit_credit_card">Allow Edit Credit Card</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="two_factor_authorization" />
                                        <Label htmlFor="two_factor_authorization">
                                          2 Factor Authorization
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="radio"
                                            id="notification_text"
                                            name="notification_method"
                                            value="text"
                                            className="radio"
                                          />
                                          <Label htmlFor="notification_text">Text Message</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="radio"
                                            id="notification_email"
                                            name="notification_method"
                                            value="email"
                                            className="radio"
                                          />
                                          <Label htmlFor="notification_email">Email</Label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Phone Numbers</p>
                                    <div className="grid grid-cols-1 gap-4">
                                      <div>
                                        <Label>Primary:</Label>
                                        <Input />
                                      </div>
                                      <div>
                                        <Label>Fax:</Label>
                                        <Input />
                                      </div>
                                      <div>
                                        <Label>Mobile:</Label>
                                        <Input />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Notes</p>
                                    <Textarea />
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Send Load Alerts For</p>
                                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="listed_as_caller" />
                                        <Label htmlFor="listed_as_caller">Only if listed as caller</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="allowed_texting" />
                                        <Label htmlFor="allowed_texting">Allow Texting</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="invoice_excel" />
                                        <Label htmlFor="invoice_excel">Invoice Excel</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="new_load_email" />
                                        <Label htmlFor="new_load_email">New Load Via Email</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="new_load_text" />
                                        <Label htmlFor="new_load_text">New Load Via Text</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="invoice_pdf" />
                                        <Label htmlFor="invoice_pdf">Invoice PDF</Label>
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
                                        <Checkbox id="incl_waybills" />
                                        <Label htmlFor="incl_waybills">Incl Waybills</Label>
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
                                        <Checkbox id="incl_attachments" />
                                        <Label htmlFor="incl_attachments">Incl Attachments</Label>
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
                                        <Checkbox id="statement_excel" />
                                        <Label htmlFor="statement_excel">Statement Excel</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="delivery_arrival_email" />
                                        <Label htmlFor="delivery_arrival_email">
                                          Delivery Arrival Via Email
                                        </Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="delivery_arrival_text" />
                                        <Label htmlFor="delivery_arrival_text">
                                          Delivery Arrival Via Text
                                        </Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="statement_pdf" />
                                        <Label htmlFor="statement_pdf">Statement PDF</Label>
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
                                        <Checkbox id="cancelled_email" />
                                        <Label htmlFor="cancelled_email">Cancelled Via Email</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="cancelled_text" />
                                        <Label htmlFor="cancelled_text">Cancelled Via Text</Label>
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
                                        <Checkbox id="show_details" />
                                        <Label htmlFor="show_details">Show Details</Label>
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
                                        <Checkbox id="incl_invoices" />
                                        <Label htmlFor="incl_invoices">Incl Invoices</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="price_change_email" />
                                        <Label htmlFor="price_change_email">Price Change Via Email</Label>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Report Export</Label>
                                      <Select>
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="Test one">Test one</SelectItem>
                                            <SelectItem value="Test two">Test two</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Default Address Settings</p>
                                    <div className="mb-4">
                                      <Label htmlFor="pickup">PickUp</Label>
                                      <div className="relative">
                                        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                                        <Input id="pickup" className="pl-8" />
                                      </div>
                                    </div>
                                    <div className="mb-4">
                                      <Label htmlFor="delivery">Delivery</Label>
                                      <div className="relative">
                                        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                                        <Input id="delivery" className="pl-8" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rounded border p-3">
                                    <p className="mb-4 border-b">Security Settings</p>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                                        <Checkbox id="allow_inbound" />
                                        <Label htmlFor="allow_inbound">Allow Inbound</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="allow_outbound" />
                                        <Label htmlFor="allow_outbound">Allow Outbound</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="allow_account" />
                                        <Label htmlFor="allow_account">Allow Account</Label>
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
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="allow_price_breakdown" />
                                        <Label htmlFor="allow_price_breakdown">Allow Price BreakDown</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Checkbox id="allow_process_credit_card" />
                                        <Label htmlFor="allow_process_credit_card">
                                          Allow Process Credit Card
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-6 rounded border p-4">
                                    <p className="bold mb-4 border-b">Other Default Settings</p>
                                    <div>
                                      <Label>Default Page</Label>
                                      <Select>
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="my_orders">My Orders</SelectItem>
                                          <SelectItem value="my_account">My Account</SelectItem>
                                          <SelectItem value="dashboard">Dashboard</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <p className="text-xs text-rose-500">
                                        Note: This default page cannot be set to a page which user is not
                                        allowed in Security
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
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
                                      <div className="col-span-2 mb-3">
                                        <Label htmlFor="time_offset">Time Offset</Label>
                                        <Input type="number" id="time_offset" value="-5" />
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="show_total_price" />
                                        <Label htmlFor="show_total_price">Show Total Price On Waybill</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="show_detail_pricing" />
                                        <Label htmlFor="show_detail_pricing">
                                          Show Detail Pricing On Waybill
                                        </Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Checkbox id="line_weight_method" />
                                        <Label htmlFor="line_weight_method">Line Weight Method</Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <DialogFooter className="mt-4">
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button type="submit">Save</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableHead>
                        <TableHead className="border px-2 py-2 text-white">Name</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Email</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Contact Type</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Phone</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Fax</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Mobile</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Default Billing Contact</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Is Admin</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Active</TableHead>
                        <TableHead className="border px-2 py-2 text-white">Web Access</TableHead>
                      </TableRow>
                    </TableHead>
                    <tbody>
                    <TableRow>
                      <TableCell colSpan={11} className="py-6 text-center font-medium text-gray-500 dark:text-gray-400">
                        No Data to Display
                      </TableCell>
                    </TableRow>
                    </tbody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="plans" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <p className="py-3 text-center font-semibold text-rose-500 italic">Distance default is “Routed”</p>
                <Table className="w-full text-left text-xs">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r px-2 py-2 text-center dark:border-r-gray-700">
                        <div className="flex items-center justify-center gap-1 rounded bg-white p-2 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Service</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Vehicle Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Price Plan</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        Price Plan Discount
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Surcharge Plan</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        Surcharge Plan Discount
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Alternate Plan 1</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Alternate Plan 2</TableHead>
                      <TableHead className="border-r px-2 py-2 text-center text-white dark:border-r-gray-700">
                        Use higher of two Weights
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-center text-white dark:border-r-gray-700">
                        Use Dist. for Missing Price Plan
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-center text-white dark:border-r-gray-700">
                        Incl Pickup Distance
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-center text-white dark:border-r-gray-700">
                        Use Radius Distance
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-center text-white dark:border-r-gray-700">
                        Higher $ of Weight or Pieces
                      </TableHead>
                      <TableHead className="px-2 py-2 text-center text-white">Default Plan</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border-r px-2 py-2">0</TableCell>
                      <TableCell className="border-r px-2 py-2">Matrix NextDay By 7a</TableCell>
                      <TableCell className="border-r px-2 py-2"></TableCell>
                      <TableCell className="border-r px-2 py-2">UHN</TableCell>
                      <TableCell className="border-r px-2 py-2"></TableCell>
                      <TableCell className="border-r px-2 py-2"></TableCell>
                      <TableCell className="border-r px-2 py-2"></TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border-r px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Next Day by 9am (1 day delivery by 09:00:00)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Matrix Next Day By 9am</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">UHN</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Next Day by 5pm (1 day delivery by 17:00:00)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Matrix Next Day</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">UHN</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Direct (Goal is currently 90 mins)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Matrix Direct</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">Same Day</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Rush (Goal is currently 180 mins)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Matrix Rush</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">Same Day</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Sameday 11am cut off (Goal is currently 480 mins)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Matrix Sameday 11cut</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">Same Day</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Skid Rush (Goal is currently 180 mins)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Skid Rush Rates</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">Skid Surcharges</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-r px-2 py-2">
                        <div className="flex gap-2">
                          <Save className="h-4 w-4" />
                          <X className="h-4 w-4 text-rose-500" />
                        </div>
                      </TableCell>
                      <TableCell className="border px-2 py-2">Skid Sameday (Delivery time needs to be quoted.)</TableCell>
                      <TableCell className="border px-2 py-2">0</TableCell>
                      <TableCell className="border px-2 py-2">Skid Sameday Rates</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2">Skid Surcharges</TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2"></TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" defaultChecked />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-center">
                        <Checkbox className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="overflow-auto">
                <p className="py-3 text-center font-semibold italic">Price Plan Exceptions</p>

                <Table className="w-full min-w-[1500px] border border-gray-300 text-xs dark:border-gray-700">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r px-2 py-2 text-center dark:border-r-gray-700">
                        <div className="flex items-center justify-center gap-1 rounded bg-white p-2 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Org Service</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">New Service</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Org Vehicle Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">New Vehicle Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Org Price Plan</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">New Price Plan</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Org Surcharge</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">New Surcharge</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        Org Ship From Start Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        New Ship From Start Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        Org Ship From End Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        New Ship From End Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        Org Ship To Start Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">
                        New Ship To Start Dt
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Org Ship To End Dt</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">New Ship To End Dt</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">To Street</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">From Zone</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">To Zone</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Pkg Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Total Pkgs</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Total Wt</TableHead>
                    </TableRow>
                  </TableHead>

                  <tbody>
                  <TableRow>
                    <TableCell colSpan={23} className="border px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                      No Data to Display
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="departments" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <Table className="">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r border-r-white">
                        <button className="flex items-center justify-center gap-1 rounded bg-white p-1 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="border-r border-r-white text-white">Description</TableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="border border-gray-300 px-2 py-4 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
                      >
                        No Data to Display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="sales_people" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="max-w-[40px] border-r border-r-gray-300 px-2 py-2 dark:border-r-gray-700">
                        <button className="flex items-center justify-center gap-1 rounded bg-white p-1 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        Sales People
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        Commission Plan
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        Start Date
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        End Date
                      </TableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="border border-gray-300 px-2 py-4 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
                      >
                        No Data to Display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="alternate_names" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="max-w-[40px] border-r border-r-gray-300 px-2 py-2 dark:border-r-gray-700">
                        <button className="flex items-center justify-center gap-1 rounded bg-white p-1 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        Name
                      </TableHead>
                    </TableRow>
                  </TableHead>
                  <tbody>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="border border-gray-300 px-2 py-4 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    >
                      No Data to Display
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="custom_fields" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="max-w-[40px] border-r border-r-gray-300 px-2 py-2 dark:border-r-gray-700">
                        <button className="flex items-center justify-center gap-1 rounded bg-white p-1 dark:bg-black">
                          <Plus className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="border-r border-r-gray-300 px-2 py-2 text-start text-white dark:border-r-gray-700">
                        Custom Fields
                      </TableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="border border-gray-300 px-2 py-4 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
                      >
                        No Data to Display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="carrier_account" className="bg-slate-50 dark:bg-black">
              <div className="overflow-auto">
                <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="w-8 border border-gray-300 px-2 py-2 text-center text-white dark:border-gray-700"></TableHead>
                      <TableHead className="border border-gray-300 px-2 py-2 text-start text-white dark:border-gray-700">
                        Carrier
                      </TableHead>
                      <TableHead className="border border-gray-300 px-2 py-2 text-start text-white dark:border-gray-700">
                        Account #
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <FilePenLine className="h-4 w-4" />
                      </TableCell>
                      <TableCell className="">a</TableCell>
                      <TableCell className="">b</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="accessorial_types" className="bg-slate-50 pb-4 dark:bg-black">
              <p className="bold mb-3 text-center">Total Count: 21</p>
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search..." className="rounded-none pl-8 text-sm" />
              </div>
              <div className="overflow-auto">
                <Table className="min-w-full border border-gray-300 text-sm dark:border-gray-700">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="w-8 border border-gray-300 px-2 py-2 text-center text-white dark:border-gray-700">
                        #
                      </TableHead>
                      <TableHead className="border border-gray-300 px-2 py-2 text-start text-white dark:border-gray-700">
                        Description
                      </TableHead>
                      <TableHead className="border border-gray-300 px-2 py-2 text-start text-white dark:border-gray-700">
                        Apply Discount
                      </TableHead>
                      <TableHead className="border border-gray-300 px-2 py-2 text-start text-white dark:border-gray-700">
                        Include In Fuel
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <tbody>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Base Charges</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Weight Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Pieces Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Vehicle Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Fuel Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      After Hours Charge
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Waiting Time Charge (Shipper)
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Waiting Time Charge (Consignee)
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Insurance Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Appointment Charge
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      MISC Accessorial Charge
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Dangerous Goods/Hazmat
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Signature Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Picture POD/Document Charge
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Tailgate Charge</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Inside Delivery Charge
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Temperature Control
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Return Pickup</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">Ambient 20%</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">
                      Residential Delivery
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <FilePenLine className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 dark:border-gray-700">407 ETR</TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="border border-gray-300 px-2 py-2 text-center dark:border-gray-700">
                      <Checkbox className="h-4 w-4" checked />
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="edit_settings" className="bg-slate-50 pb-4 dark:bg-black">
              <div className="mb-3 flex items-center gap-6 border p-5">
                <div className="flex flex-col">
                  <Label className="mb-1 text-sm font-medium">Last 214ID</Label>
                  <Input type="number" value="0" className="w-40" />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-1 text-sm font-medium">Last 210ID</Label>
                  <Input type="number" value="0" className="w-40" />
                </div>
                <Button className="mt-5">Save</Button>
              </div>

              <p className="bold mb-3 text-center">Total Count: 21</p>
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search..." className="rounded-none pl-8 text-sm" />
              </div>
              <div className="overflow-auto">
                <Table className="w-full border border-gray-300 text-left text-xs dark:border-gray-700">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r px-2 py-2 text-center dark:border-r-gray-700">
                        <div className="flex items-center justify-center gap-1 rounded bg-white p-2 dark:bg-black">
                          <Dialog>
                            <DialogTrigger>
                              <Plus className="h-4 w-4" />
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] w-full !max-w-3xl overflow-y-auto">
                              <DialogHeader className="bold">Edit Form</DialogHeader>
                              <div>
                                <Label>EDI Connection Name</Label>
                                <Input />
                              </div>
                              <div className="rounded border">
                                <p className="bold border-b p-3">Transactions(Peer ISA)</p>
                                <div className="grid grid-cols-3 gap-4 p-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214a3" />
                                    <Label htmlFor="edi214a3">Send EDI214A3</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214a7" />
                                    <Label htmlFor="edi214a7">Send EDI214A7</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214af" />
                                    <Label htmlFor="edi214af">Send EDI214AF</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214ag" />
                                    <Label htmlFor="edi214ag">Send EDI214AG</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214d1" />
                                    <Label htmlFor="edi214d1">Send EDI214D1</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214sd" />
                                    <Label htmlFor="edi214sd">Send EDI214SD</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214x3" />
                                    <Label htmlFor="edi214x3">Send EDI214X3</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214x1" />
                                    <Label htmlFor="edi214x1">Send EDI214X1</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi214x6" />
                                    <Label htmlFor="edi214x6">Send EDI214X6</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi997" />
                                    <Label htmlFor="edi997">Send EDI997</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi210" />
                                    <Label htmlFor="edi210">Send EDI210</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="edi990" />
                                    <Label htmlFor="edi990">Send EDI990</Label>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">Interchange(Local ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>Authorization Info Qualifier ISA01</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Authorization Info ISA02</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Security Info Qualifier ISA03</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Security Info ISA04</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange ID Qualifier ISA05</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange Sender ID ISA06</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Usage Indicator ISA15</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange Control Identifier ISA11</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange Control Version Number ISA12</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Sub-Element Separator ISA16</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Segment Separator</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Application Senders Code GS02</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Functional Identifier Code GS01</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Notes</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Line Terminator</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">Interchange(Peer ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>Authorization Info Qualifier ISA01</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>AuthorizationInfo ISA02</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>SecurityInfo Qualifier ISA03</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Security Info ISA04</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange IDQualifier ISA07</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Interchange ReceiverID ISA08</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Usage Indicator ISA15</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>InterchangeControl Identifier ISA11</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>InterchangeControl VersionNumber ISA12</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>SubElement Separator ISA16</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Segment Separator</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Application Receivers Code GS03</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Out File Prefix</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Receive EDI204 or EDI211</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Line Terminator</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">FTP(Local ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>FTP Server</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>FTP Login</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>FTP Password</Label>
                                      <Input type="password" />
                                    </div>
                                    <div>
                                      <Label>Host Key</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">FTP(Peer ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>FTP Server</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>FTP Login</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>FTP Password</Label>
                                      <Input type="password" />
                                    </div>
                                    <div>
                                      <Label>Host Key</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">FTP(Local ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>Incoming File</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Outgoing File</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>File Extension (In Folder)</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>File Extension (Out Folder)</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded border p-3">
                                  <p className="bold mb-4 border-b">Files(Peer ISA)</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <Label>Incoming File</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>Outgoing File</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>File Extension (In Folder)</Label>
                                      <Input />
                                    </div>
                                    <div>
                                      <Label>File Extension (Out Folder)</Label>
                                      <Input />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableHead>
                      <TableHead className="border-r border-r-white text-white">EDI Connection Name</TableHead>
                      <TableHead className="border-r border-r-white text-white">SenderID ISA06</TableHead>
                      <TableHead className="border-r border-r-white text-white">ReceiverID ISA08</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214A7</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214SD</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI997</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214A3</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214A3</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214D1</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214X3</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214X6</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI210</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214AG</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI214X1</TableHead>
                      <TableHead className="border-r border-r-white text-white">Last210ID</TableHead>
                      <TableHead className="border-r border-r-white text-white">Send EDI990</TableHead>
                    </TableRow>
                  </TableHeader>

                  <tbody>
                  <TableRow>
                    <TableCell colSpan={17} className="py-6 text-center font-medium text-gray-500 dark:text-gray-400">
                      No Data to Display
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="apis" className="bg-slate-50 pb-4 dark:bg-black">
              <p className="bold mb-3 text-center">Total Addresses: 0</p>
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search..." className="rounded-none pl-8 text-sm" />
              </div>
              <div className="overflow-auto">
                <Table className="w-full border border-gray-300 text-left text-xs dark:border-gray-700">
                  <TableHead className="custom-nav-color">
                    <TableRow>
                      <TableHead className="text-center-r border-r px-2 py-2 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-1 rounded bg-white p-2 dark:bg-black">
                          <Dialog>
                            <DialogTrigger>
                              <Plus className="h-4 w-4" />
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] w-full !max-w-3xl overflow-y-auto">
                              <DialogHeader className="bold">Edit Form</DialogHeader>
                              <div className="rounded border">
                                <p className="bold border-b p-3">API Settings</p>
                                <div className="grid grid-cols-2 gap-4 p-4">
                                  <div>
                                    <Label>API key</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>API Pass</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Token</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Commence API</Label>
                                    <Popover open={commenceDateOpen} onOpenChange={setCommenceDateOpen}>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-full justify-start text-left font-normal dark:border-gray-700 dark:text-gray-200"
                                        >
                                          {commenceDate ? (
                                            commenceDate.toLocaleDateString()
                                          ) : (
                                            <span>Select Date</span>
                                          )}
                                          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>

                                      <PopoverContent
                                        className="w-auto p-0 dark:bg-gray-800 dark:text-gray-200"
                                        align="end"
                                      >
                                        <Calendar
                                          mode="single"
                                          captionLayout="dropdown"
                                          selected={commenceDate}
                                          onSelect={(selectedDate) => {
                                            setCommenceDate(selectedDate);
                                            setCommenceDateOpen(false);
                                          }}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div>
                                    <Label>Required Shipping Line</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>FullURL</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Required Tag</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Starting Order</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>API Type</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="location">Location</SelectItem>
                                        <SelectItem value="Shopify">Shopify</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Fire Once At</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Last ID</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Status To Import</Label>
                                    <Input />
                                  </div>
                                  <div className="flex gap-4">
                                    <Checkbox id="expire_token" />
                                    <Label htmlFor="expire_token">Expire Token</Label>
                                  </div>
                                </div>
                              </div>
                              <div className="rounded border">
                                <p className="bold border-b p-3">Other Default Settings</p>
                                <div className="grid grid-cols-2 gap-4 p-4">
                                  <div>
                                    <Label>Default Pickup Name</Label>
                                    <div className="relative">
                                      <Search className="lucide lucide-search absolute top-1.5 left-2 w-4 text-gray-400" />
                                      <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="h-9 pl-8 text-sm"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Default Pickup Street1</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Pickup Street2</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Pickup City</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Pickup Province</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Alberta">Alberta</SelectItem>
                                        <SelectItem value="British">British</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Default Pickup Postalcode</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Pickup Country</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                        <SelectItem value="Mexico">Mexico</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Default Pickup Phone</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Pickup Contact</Label>
                                    <Input />
                                  </div>
                                  <div>
                                    <Label>Default Service</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Direct">Direct</SelectItem>
                                        <SelectItem value="Next Day">Next Day</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Default Vehicle</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Van">Van</SelectItem>
                                        <SelectItem value="Cube Van">Cube Van</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Default PKG Type</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Tote">Tote</SelectItem>
                                        <SelectItem value="Case">Case</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Default PKG qty</Label>
                                    <Input />
                                  </div>
                                </div>
                              </div>
                              <div className="rounded border">
                                <p className="bold border-b p-3">Alerts</p>
                                <div className="grid grid-cols-2 gap-4 p-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="alert_consignee_on_load_creation" />
                                    <Label htmlFor="alert_consignee_on_load_creation">
                                      Alert Consignee On Load Creation
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="alert_consignee_on_load_pickup" />
                                    <Label htmlFor="alert_consignee_on_load_pickup">
                                      Alert Consignee On Load Pickup
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="alert_consignee_on_load_delivery" />
                                    <Label htmlFor="alert_consignee_on_load_delivery">
                                      Alert Consignee On Load Delivery
                                    </Label>
                                  </div>
                                </div>
                              </div>
                              <div className="rounded border">
                                <p className="border-b p-3">Post Back</p>
                                <div className="space-y-2 p-3">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="update_ecomm_order_with_load" />
                                    <Label htmlFor="update_ecomm_order_with_load">
                                      Update Ecomm Order With Load#
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="close_ecomm_order_on_delivery" />
                                    <Label htmlFor="close_ecomm_order_on_delivery">
                                      Close Ecomm Order On Delivery
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">API Key</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">API Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Token</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Full URL</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Active</TableHead>
                    </TableRow>
                  </TableHead>

                  <tbody>
                  <TableRow>
                    <TableCell colSpan={6} className="py-6 text-center font-medium text-gray-500 dark:text-gray-400">
                      No Data to Display
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="bg-slate-50 pb-4 dark:bg-black">
              <div className="overflow-auto">
                <Table className="w-full border border-gray-300 text-left text-xs dark:border-gray-700">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r px-2 py-2 text-center dark:border-r-gray-700">
                        <div className="">
                          <Dialog>
                            <DialogTrigger>
                              <Button type="button" variant="outline">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] w-full overflow-y-auto">
                              <DialogHeader className="bold">Edit Form</DialogHeader>
                              <div className="rounded border">
                                <div className="grid grid-cols-1 gap-4 p-4">
                                  <div className="flex justify-between">
                                    <div>
                                      <Label>User</Label>
                                    </div>
                                    <div>
                                      <p>Date/Time: {new Date().toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Note Type</Label>
                                    <Select>
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Address">Address</SelectItem>
                                        <SelectItem value="Audit">Audit</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Note</Label>
                                    <Textarea />
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Created Date</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Note</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">Note Type</TableHead>
                      <TableHead className="border-r px-2 py-2 text-white dark:border-r-gray-700">User Name</TableHead>
                    </TableRow>
                  </TableHeader>

                  <tbody>
                  <TableRow>
                    <TableCell colSpan={5} className="py-6 text-center font-medium text-gray-500 dark:text-gray-400">
                      No Data to Display
                    </TableCell>
                  </TableRow>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="audit" className="bg-slate-50 pb-4 dark:bg-black">
              <div className="overflow-auto">
                <Table className="w-full border border-gray-300 text-left dark:border-gray-700">
                  <TableHeader className="custom-nav-color">
                    <TableRow>
                      <TableHead className="border-r px-2 py-2 text-start text-white dark:border-r-gray-700">Date</TableHead>
                      <TableHead className="border-r px-2 py-2 text-start text-white dark:border-r-gray-700">User</TableHead>
                      <TableHead className="border-r px-2 py-2 text-start text-white dark:border-r-gray-700">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="border px-2 py-2 text-start text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        {new Date().toLocaleString()}
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-start text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        Elven
                      </TableCell>
                      <TableCell className="border px-2 py-2 text-start text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        BillTo changed from NONE to
                        <br />
                        CustomerNo changed from to 72
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
