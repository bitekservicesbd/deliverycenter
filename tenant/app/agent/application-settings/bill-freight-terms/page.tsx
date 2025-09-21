"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, FilePenLine } from 'lucide-react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";
import Link from "next/link";

export default function DataTable() {
  const data = [
    {
      description: '3RD Party',
      createdDate: '',
      createdById: '',
      lastUpdatedDate: '10/1/2020 4:37:01 PM',
      lastUpdatedById: '166',
      isDeleted: '',
    },
    { description: 'COD', createdDate: '', createdById: '', lastUpdatedDate: '', lastUpdatedById: '', isDeleted: '' },
    { description: 'Collect', createdDate: '', createdById: '', lastUpdatedDate: '', lastUpdatedById: '', isDeleted: '' },
    { description: 'Customer Pickup', createdDate: '', createdById: '', lastUpdatedDate: '', lastUpdatedById: '', isDeleted: '' },
    { description: 'Prepaid', createdDate: '', createdById: '', lastUpdatedDate: '', lastUpdatedById: '', isDeleted: '' },
    {
      description: '3RD Party',
      createdDate: '10/2/2020 5:07:56 PM',
      createdById: '166',
      lastUpdatedDate: '10/2/2020 5:07:56 PM',
      lastUpdatedById: '166',
      isDeleted: '',
    },
  ];

  return (
    <div>
      <div>
        <TopSearch className="mb-2" />
        <div>
          <PageNav>
            <p className="ps-3 text-white">Bill Freight Terms</p>
          </PageNav>
        </div>
        <div>
          <div className="my-2">
            <div className="mt-2 flex gap-2">
              <div>
                <Select>
                  <SelectTrigger defaultValue={'Bill Freight Terms'} className="">
                    <SelectValue placeholder="Bill Freight Terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bill Freight Terms">Bill Freight Terms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button className="bg-sky-900 hover:bg-sky-950" type="button">
                  Search
                </Button>
              </div>
            </div>
            <Button
              className="mt-2 bg-sky-900 hover:bg-sky-950">
              <Link href={`/tenant/application-settings/bill-freight-terms/create`}> Add New</Link>
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="custom-nav-color">
                <TableRow className="">
                  <TableHead className="text-white">Action</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">CreatedDate</TableHead>
                  <TableHead className="text-white">CreatedBy_ID</TableHead>
                  <TableHead className="text-white">LastUpdatedDate</TableHead>
                  <TableHead className="text-white">LastUpdatedBy_ID</TableHead>
                  <TableHead className="text-white">IsDeleted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="border">
                      <div className="flex justify-center gap-2 p-2">
                        <FilePenLine className="text-blue-500" />
                        <Copy className="text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell className="border">{row.description}</TableCell>
                    <TableCell className="border">{row.createdDate}</TableCell>
                    <TableCell className="border">{row.createdById}</TableCell>
                    <TableCell className="border">{row.lastUpdatedDate}</TableCell>
                    <TableCell className="border">{row.lastUpdatedById}</TableCell>
                    <TableCell className="border">{row.isDeleted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
