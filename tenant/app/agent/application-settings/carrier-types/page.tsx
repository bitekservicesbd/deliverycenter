"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { FilePlus, FileX, Pencil, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";

export default function CarrierTypes() {
  const [create, setCreate] = useState(false);
  return (
    <div>
      <div>
        <TopSearch className="mb-2" />
        <div className="mb-2">
          <PageNav>
            <p className="ps-3 font-semibold text-white">Carrier Types</p>
          </PageNav>
        </div>
        <div>
          <Table>
            <TableHeader className="custom-nav-color">
              <TableRow className="">
                <TableHead className="text-white">
                  <Button type="button" className="bg-sky-900 hover:bg-sky-950" onClick={() => setCreate(true)}>
                    <FilePlus />
                  </Button>
                </TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">GL Amount</TableHead>
                <TableHead className="text-white">GL Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {create && (
                <TableRow>
                  <TableCell className="border">
                    <div className="flex gap-2">
                      <Button type="button" variant={'outline'}>
                        <Save className="h-4 w-4 cursor-pointer" />
                      </Button>
                      <Button type="button" variant={'outline'} onClick={() => setCreate(false)}>
                        <Undo2 className="h-4 w-4 cursor-pointer" />
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
                </TableRow>
              )}
              <TableRow>
                <TableCell className="border">
                  <div className="flex gap-1">
                    <Button type="button" variant={'outline'}>
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button type="button" variant={'outline'}>
                      <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="border">Agent</TableCell>
                <TableCell className="border">0</TableCell>
                <TableCell className="border"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border">
                  <div className="flex gap-1">
                    <Button type="button" variant={'outline'}>
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button type="button" variant={'outline'}>
                      <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="border">Broker</TableCell>
                <TableCell className="border">0</TableCell>
                <TableCell className="border"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border">
                  <div className="flex gap-1">
                    <Button type="button" variant={'outline'}>
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button type="button" variant={'outline'}>
                      <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="border">Employee</TableCell>
                <TableCell className="border">0</TableCell>
                <TableCell className="border"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border">
                  <div className="flex gap-1">
                    <Button type="button" variant={'outline'}>
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button type="button" variant={'outline'}>
                      <FileX className="h-4 w-4 cursor-pointer text-red-500" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="border">Other</TableCell>
                <TableCell className="border">0</TableCell>
                <TableCell className="border"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
