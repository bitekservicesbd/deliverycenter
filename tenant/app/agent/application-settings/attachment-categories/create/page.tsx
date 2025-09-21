"use client";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Undo2 } from 'lucide-react';
import { useState } from 'react';
import PageNav from "@/components/server/PageNav";
import TopSearch from "@/components/agent/client/TopSearch";
import Link from "next/link";

export default function CreateAttachmentCategory() {
  const [createdDate, setCreatedDate] = useState();
  const [lastUpdatedDate, setLastUpdatedDate] = useState();
  const [openCreated, setOpenCreated] = useState(false);
  const [openUpdated, setOpenUpdated] = useState(false);

  return (
    <div>
      <TopSearch className="mb-2" />
      <PageNav>
        <span className="ms-5 font-bold text-white">Create Attachment Category</span>
      </PageNav>

      <div className="rounded border p-4">
        <div className="flex justify-end">
          <Button variant="outline" asChild>
            <Link href={`/tenant/application-settings/attachment-categories`} className="inline-flex items-center">
              <Undo2 className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Description</Label>
            <Textarea />
          </div>
          <div>
            <Label>Notify Email</Label>
            <Input />
          </div>
          <div>
            <Label>Retention Days</Label>
            <Input />
          </div>

          <div>
            <Label>Created Date</Label>
            <Popover open={openCreated} onOpenChange={setOpenCreated}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {createdDate ? format(createdDate, 'dd-MM-yyyy') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={createdDate}
                  onSelect={(date) => {
                    setCreatedDate(date);
                    setOpenCreated(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>CreatedBy ID</Label>
            <Input />
          </div>

          <div>
            <Label>Last Updated Date</Label>
            <Popover open={openUpdated} onOpenChange={setOpenUpdated}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {lastUpdatedDate ? format(lastUpdatedDate, 'dd-MM-yyyy') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={lastUpdatedDate}
                  onSelect={(date) => {
                    setLastUpdatedDate(date);
                    setOpenUpdated(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Last Updated By ID</Label>
            <Input />
          </div>
          <div>
            <Label>Attach to Load Alerts</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Attach to Invoices</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Default Driver</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Hide From Driver</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button>Save</Button>
          <Button variant="outline">Change Log</Button>
        </div>
      </div>
    </div>
  );
}
