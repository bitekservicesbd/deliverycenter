"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { File, Pencil } from 'lucide-react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";
import Link from "next/link";

export default function CustomerType() {
  const data = [
    {
      description: 'Courier',
      gl_account: '2100',
      gl_code: '',
      created_date: '',
      createdById: '',
      lastUpdatedDate: '',
      lastUpdatedById: '',
      isDeleted: '',
    },
    {
      description: 'Warehouse',
      gl_account: '2110',
      gl_code: '',
      created_date: '',
      createdById: '',
      lastUpdatedDate: '',
      lastUpdatedById: '',
      isDeleted: '',
    },
    {
      description: 'None Billing',
      gl_account: '',
      gl_code: '',
      created_date: '10/1/2020 4:37:01 PM',
      createdById: '1',
      lastUpdatedDate: '',
      lastUpdatedById: '',
      isDeleted: '',
    },
  ];

  return (
    <div>
      <div>
        <TopSearch className="mb-2" />
        <div className="mb-2">
          <PageNav>
            <p className="ps-3 text-white">Customer Types</p>
          </PageNav>
        </div>
        <div className="mx-2">
          <div className="my-2">
            <div className="mt-2 flex gap-2">
              <div>
                <Select>
                  <SelectTrigger defaultValue={'Customer Types'} className="">
                    <SelectValue placeholder="Customer Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Types">Customer Types</SelectItem>
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
              className="mt-2 bg-sky-900 hover:bg-sky-950"
            >
              <Link href={`/tenant/application-settings/customer-types/create`}>     Add New</Link>

            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="custom-nav-color">
                <TableRow className="">
                  <TableHead className="text-white">Action</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">GL Account</TableHead>
                  <TableHead className="text-white">GL Code</TableHead>
                  <TableHead className="text-white">Created Date</TableHead>
                  <TableHead className="text-white">CreatedBy_ID</TableHead>
                  <TableHead className="text-white">Last Updated Date</TableHead>
                  <TableHead className="text-white">Last Updated By_ID</TableHead>
                  <TableHead className="text-white">IsDeleted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="border">
                      <div className="flex gap-1">
                        <Button type="button" variant={'outline'}>
                          <Pencil className="h-4 w-4 cursor-pointer" />
                        </Button>
                        <Button type="button" variant={'outline'}>
                          <File className="h-4 w-4 cursor-pointer" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="border">{row.description}</TableCell>
                    <TableCell className="border">{row.gl_account}</TableCell>
                    <TableCell className="border">{row.gl_code}</TableCell>
                    <TableCell className="border">{row.created_date}</TableCell>
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
