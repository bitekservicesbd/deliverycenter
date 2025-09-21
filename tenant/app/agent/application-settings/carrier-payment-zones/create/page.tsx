
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Save } from 'lucide-react';
import TopSearch from "@/components/agent/client/TopSearch";
import PageNav from "@/components/server/PageNav";

export default function index() {
  return (
    <div>
      <div>
        <TopSearch className="mb-2" />
        <div className="mb-2">
          <PageNav>
            <p className="ps-3 font-semibold text-white">Carrier Payment Zone Create</p>
          </PageNav>
        </div>

        <div className="mx-2">
          <div className="rounded border">
            <Card className="m-3 w-full md:w-1/4">
              <CardContent>
                <div className="grid p-3">
                  <div className="mt-5 grid">
                    <Label htmlFor="Description" className="ms-2 mb-2">
                      Description
                    </Label>
                    <Input id="Description" placeholder="Description" />
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="CreatedDate" className="ms-2 mb-2">
                      Zone Group
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Zone Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Relay">Relay</SelectItem>
                        <SelectItem value="Matrix">Matrix</SelectItem>
                        <SelectItem value="Shoppers">Shoppers</SelectItem>
                        <SelectItem value="Shoppers Zone 20">Shoppers Zone 20</SelectItem>
                        <SelectItem value="DC 80">DC 80</SelectItem>
                        <SelectItem value="UHN">UHN</SelectItem>
                        <SelectItem value="VIALS">VIALS</SelectItem>
                        <SelectItem value="VIALS SAT">VIALS SAT</SelectItem>
                        <SelectItem value="VIALS SUN">VIALS SUN</SelectItem>
                        <SelectItem value="VIALS HOLIDAY">VIALS HOLIDAY</SelectItem>
                        <SelectItem value="VIALS ND">VIALS ND</SelectItem>
                        <SelectItem value="Specialty Health Network">Specialty Health Network</SelectItem>
                        <SelectItem value="Medslink">Medslink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="New-Zone-Group" className="ms-2 mb-2">
                      Or Create New Zone Group
                    </Label>
                    <Input id="New-Zone-Group" placeholder="Or Create New Zone Group" />
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="CreatedBy_ID" className="ms-2 mb-2">
                      CreatedBy_ID
                    </Label>
                    <Input id="CreatedBy_ID" placeholder="CreatedBy_ID" />
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="LastUpdatedDate" className="ms-2 mb-2">
                      LastUpdatedDate
                    </Label>
                    <Input id="LastUpdatedDate" placeholder="LastUpdatedDate" />
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="LastUpdatedBy_ID" className="ms-2 mb-2">
                      LastUpdatedBy_ID
                    </Label>
                    <Input id="LastUpdatedBy_ID" placeholder="LastUpdatedBy_ID" />
                  </div>
                  <div className="mt-5 grid">
                    <Label htmlFor="CreatedDate" className="ms-2 mb-2">
                      IsDeleted
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="IsDeleted" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="True">True</SelectItem>
                        <SelectItem value="False">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button type="button" className={'my-1 bg-sky-900 hover:bg-sky-950'}>
                      <Save /> Save
                    </Button>
                    <Button type="button" className={'my-1 bg-sky-900 hover:bg-sky-950'}>
                      Change Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
