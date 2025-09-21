"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePenLine, FilePlus2, FileX2, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
import PageNav from "@/components/server/PageNav";
import TopSearch from "@/components/agent/client/TopSearch";

export default function Assets() {
  const [create, setCreate] = useState(false);

  const assetsData = [
    {
      id: 1,
      name: 'SL101',
      assetTypeId: 'Truck',
      assetNo: 'SL101',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 2,
      name: 'SL102',
      assetTypeId: 'Truck',
      assetNo: 'SL102',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 3,
      name: 'SL103',
      assetTypeId: 'Truck',
      assetNo: 'SL103',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 4,
      name: 'SL104',
      assetTypeId: 'Truck',
      assetNo: 'SL104',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 5,
      name: 'SL105',
      assetTypeId: 'Truck',
      assetNo: 'SL105',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 6,
      name: 'SL106',
      assetTypeId: 'Truck',
      assetNo: 'SL106',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 7,
      name: 'SL201',
      assetTypeId: 'Truck',
      assetNo: 'SL201',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 8,
      name: 'SL202',
      assetTypeId: 'Truck',
      assetNo: 'SL202',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 9,
      name: 'SL203',
      assetTypeId: 'Truck',
      assetNo: 'SL203',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 10,
      name: 'SL204',
      assetTypeId: 'Truck',
      assetNo: 'SL204',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 11,
      name: 'SL205',
      assetTypeId: 'Truck',
      assetNo: 'SL205',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 12,
      name: 'SL206',
      assetTypeId: 'Truck',
      assetNo: 'SL206',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 13,
      name: 'SL207',
      assetTypeId: 'Truck',
      assetNo: 'SL207',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 14,
      name: 'SL208',
      assetTypeId: 'Truck',
      assetNo: 'SL208',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 15,
      name: 'SL209',
      assetTypeId: 'Truck',
      assetNo: 'SL209',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 16,
      name: 'SL210',
      assetTypeId: 'Truck',
      assetNo: 'SL210',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 17,
      name: 'SL211',
      assetTypeId: 'Truck',
      assetNo: 'SL211',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 18,
      name: 'SL212',
      assetTypeId: 'Truck',
      assetNo: 'SL212',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 19,
      name: 'SL213',
      assetTypeId: 'Truck',
      assetNo: 'SL213',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 20,
      name: 'SL214',
      assetTypeId: 'Truck',
      assetNo: 'SL214',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 21,
      name: 'SL215',
      assetTypeId: 'Truck',
      assetNo: 'SL215',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 22,
      name: 'SL216',
      assetTypeId: 'Truck',
      assetNo: 'SL216',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 23,
      name: 'SL217',
      assetTypeId: 'Truck',
      assetNo: 'SL217',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 24,
      name: 'SL218',
      assetTypeId: 'Truck',
      assetNo: 'SL218',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 25,
      name: 'SL219',
      assetTypeId: 'Truck',
      assetNo: 'SL219',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 26,
      name: 'SL220',
      assetTypeId: 'Truck',
      assetNo: 'SL220',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 27,
      name: 'SL221',
      assetTypeId: 'Truck',
      assetNo: 'SL221',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 28,
      name: 'SL222',
      assetTypeId: 'Truck',
      assetNo: 'SL222',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 29,
      name: 'SL301',
      assetTypeId: 'Truck',
      assetNo: 'SL301',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 30,
      name: 'SL302',
      assetTypeId: 'Truck',
      assetNo: 'SL302',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 31,
      name: 'SL303',
      assetTypeId: 'Truck',
      assetNo: 'SL303',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 32,
      name: 'SL401',
      assetTypeId: 'Truck',
      assetNo: 'SL401',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 33,
      name: 'SL402',
      assetTypeId: 'Truck',
      assetNo: 'SL402',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 34,
      name: 'SL403',
      assetTypeId: 'Truck',
      assetNo: 'SL403',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 35,
      name: 'SL404',
      assetTypeId: 'Truck',
      assetNo: 'SL404',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 36,
      name: 'SL405',
      assetTypeId: 'Truck',
      assetNo: 'SL405',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 37,
      name: 'SL406',
      assetTypeId: 'Truck',
      assetNo: 'SL406',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 38,
      name: 'SL407',
      assetTypeId: 'Truck',
      assetNo: 'SL407',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 39,
      name: 'SL408',
      assetTypeId: 'Truck',
      assetNo: 'SL408',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 40,
      name: 'SL409',
      assetTypeId: 'Truck',
      assetNo: 'SL409',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 41,
      name: 'SL410',
      assetTypeId: 'Truck',
      assetNo: 'SL410',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
    {
      id: 42,
      name: 'SL411',
      assetTypeId: 'Truck',
      assetNo: 'SL411',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vin: '',
      vehicleLicensePlate: '',
      vehiclePlateExpiry: '',
      lastServiceDate: '',
      nextServiceDate: '',
      nextServiceDistance: '',
    },
  ];

  return (
    <div>
      <TopSearch className="mb-2" />
      <PageNav className="mb-2">
        <span className="ms-5 font-bold text-white">Assets</span>
      </PageNav>
      <div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-600">
                <TableHead
                  className="custom-nav-color flex cursor-pointer justify-center px-1 py-2 text-white dark:border-gray-600"
                  onClick={() => setCreate(true)}
                >
                  <FilePlus2 />
                </TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Name</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Asset Type ID</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Asset No</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Make</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Model</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Year</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">VIN</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle License Plate</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Vehicle Plate Expiry</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Last Service Date</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Next Service Date</TableHead>
                <TableHead className="custom-nav-color px-1 py-2 text-white dark:border-gray-600">Next Service Distance</TableHead>
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
                        <Undo2 className="cursor-pointer" />
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
                  <TableCell className="border">
                    <Input />
                  </TableCell>
                  <TableCell className="border">
                    <Input />
                  </TableCell>
                </TableRow>
              )}

              {assetsData.map((asset) => (
                <TableRow key={asset.id} className="dark:border-gray-600">
                  <TableCell className="flex justify-center gap-2 p-2">
                    <FilePenLine className="text-blue-500" />
                    <FileX2 className="text-red-500" />
                  </TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.name}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.assetTypeId}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.assetNo}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vehicleMake}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vehicleModel}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vehicleYear}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vin}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vehicleLicensePlate}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.vehiclePlateExpiry}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.lastServiceDate}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.nextServiceDate}</TableCell>
                  <TableCell className="border-s p-2 dark:border-gray-600">{asset.nextServiceDistance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
