"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCcw } from 'lucide-react';
import PageNav from "@/components/server/PageNav";
import TopSearch from "@/components/agent/client/TopSearch";
import Customer from "@/components/agent/client/Customer";

export default function Index() {
  return (
    <div>
      <TopSearch className="mb-2" />
      <Tabs defaultValue="Importer">
        <PageNav>
          <TabsList className="!ms-0">
            <TabsTrigger value="Importer">Importer</TabsTrigger>
          </TabsList>
        </PageNav>
        <TabsContent value="Importer">
          <div className="m-4 border p-5">
            <div className="">
              <div className="flex items-center gap-3">
                <Customer className="w-full" onChange={()=>{}} value={''}/>
                <Button type="submit" className="bg-sky-900 px-2 py-6 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                  <RefreshCcw />
                </Button>
              </div>
              <div className="flex w-full max-w-sm items-center gap-2 pt-3">
                <Label className="w-1/4">Type *</Label>
                <Select defaultValue="Loads/Shipment">
                  <SelectTrigger className="w-3/4">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Loads/Shipment">Loads/Shipment</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="close">Close</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* table */}
              <div className="mt-5 border pb-60">
                <Table className="w-full">
                  <TableHeader className="w-full">
                    <TableRow>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Actions</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">View Attachment</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">ID</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Upload Date</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Import Type</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">File Name</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Data Lines</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Lines Remains</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Lines WiTableHead Errors</TableHead>
                      <TableHead className="custom-nav-color border-r px-1 py-2 text-white">Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={10} className="border-b py-5 text-center">
                        No data to display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-5 flex">
                <div className="relative">
                  <Input type="file" id="file-upload" placeholder="Select multiple files" required multiple />
                  <Button
                    type="button"
                    className="absolute end-0 top-0 rounded-s-none"
                    onClick={() => {
                      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
