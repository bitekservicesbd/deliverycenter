'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";

export default function Index() {
  const [date, setDate] = React.useState<Date>();

  return (
    <>
      <div>
        <TopSearch />
        <div className="mt-3">
          <PageNav className="p-2 text-white">
            <p className="font-bold">Invoices</p>
          </PageNav>
        </div>
        <div className="container ms-0 sm:ms-2">
          <div className="mt-5">
            <Tabs defaultValue="Accounting" className="mt-3">
              <PageNav className="ms-2">
                <TabsList>
                  <TabsTrigger value="Accounting" className="ps-4">
                    Accounting
                  </TabsTrigger>
                </TabsList>
              </PageNav>
              <TabsContent value="Accounting">
                <div>
                  <div className="mx-2 mt-3 grid gap-4 sm:mx-0 sm:flex sm:flex-wrap sm:items-center">
                    <div className="flex w-full items-center gap-3 sm:w-auto">
                      <Label>Effective Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal sm:w-[280px]"
                          >
                            <CalendarIcon />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="w-full sm:w-auto">
                      <Button type="button" className="w-full sm:w-auto">
                        Process Credit Card
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 rounded border p-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Input type="text" className="w-full md:w-4/12" />
                      <Button
                        type="button"
                        className="w-full bg-sky-900 hover:bg-sky-950 md:w-auto dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900"
                      >
                        Search
                      </Button>
                    </div>

                    {/* table */}
                    <div className="mt-5">
                      <Table>
                        <TableHeader className="custom-nav-color">
                          <TableRow>
                            <TableHead className="py-2 text-white">
                              <Checkbox />
                            </TableHead>
                            <TableHead className="py-2 text-white">GL Type</TableHead>
                            <TableHead className="py-2 text-white">Created</TableHead>
                            <TableHead className="py-2 text-white">Number</TableHead>
                            <TableHead className="py-2 text-white">Reference</TableHead>
                            <TableHead className="py-2 text-white">Effective</TableHead>
                            <TableHead className="py-2 text-white">Due Date</TableHead>
                            <TableHead className="py-2 text-white">Amount</TableHead>
                            <TableHead className="py-2 text-white">Tax Amount</TableHead>
                            <TableHead className="py-2 text-white">Total Amount</TableHead>
                            <TableHead className="py-2 text-white">Balance</TableHead>
                            <TableHead className="py-2 text-white">Paid</TableHead>
                            <TableHead className="py-2 text-white">Running Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>Invoice</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>1632</TableCell>
                            <TableCell>Cancelled</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell>215.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>Invoice</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>1632</TableCell>
                            <TableCell>Cancelled</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>11/22/2023</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>0.00</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell>215.00</TableCell>
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
    </>
  );
}
