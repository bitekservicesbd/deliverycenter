
'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import PageNav from "@/components/server/PageNav";


//dummy load data for specific carriers
const generateLoadData = (carrierId: number) => {
    const loadCount = Math.floor(Math.random() * 8) + 1;

    return Array.from({ length: loadCount }, (_, index) => ({
        id: `${carrierId}-${index + 1}`,
        loadNumber: `${20 + carrierId}${index + 1}`,
        rowNumber: index + 1,
        alert: Math.random() > 0.7 ? 'HIGH' : '',
        reference: ['CPACK', 'DPACK', 'EPACK', 'FPACK'][Math.floor(Math.random() * 4)],
        route: `${carrierId}B 0${30 + index}`,
        stop: index + 1,
        service: {
            color: ['red', 'blue', 'green', 'orange'][Math.floor(Math.random() * 4)],
            name: ['Nex', 'Exp', 'Std', 'Prem'][Math.floor(Math.random() * 4)],
        },
        vehicle: ['Van', 'Truck', 'Semi', 'Cube'][Math.floor(Math.random() * 4)],
        loadStatus: ['Ready', 'In Transit', 'Delivered'][Math.floor(Math.random() * 3)],
        createdDate: `7/${25 + index}/2025`,
        dispatchedDate: `8/${10 + index}/2025`,
        expShipStart: `15/08/2025`,
        expShipEnd: `16/08/2025`,
        expDelStart: `17/08/2025`,
        expDelEnd: `18/08/2025`,
        pickupArrival: `8/${15 + index}/2025`,
        actualShip: `8/${16 + index}/2025`,
        customerCode: `${20 + carrierId}`,
        customerName: ['Shopp...', 'Retail...', 'Corp...', 'Enter...'][Math.floor(Math.random() * 4)],
        calledBy: ['Central...', 'North...', 'South...', 'East...'][Math.floor(Math.random() * 4)],
        shipperCode: `${2600 + carrierId * 10}`,
        shipperName: `${23150 + carrierId}T`,
        shipperStreet1: `Unit ${index + 1}`,
        shipperCity: ['Mississ', 'Toronto', 'Ottawa', 'Montreal'][Math.floor(Math.random() * 4)],
        shipperPostal: `L4W 0${index}${carrierId}`,
        shipperProvince: 'Ontario',
        shipperCountry: 'Canada',
        shippingInstructions: '...',
        shipperZone: `${String.fromCharCode(72 + index)} 0${carrierId}`,
        pickupRep: `Rep${carrierId}`,
        consigneeCode: `${1000 + carrierId}`,
        consigneeName: `Consignee ${carrierId}`,
        consigneeStreet1: `${index + 100} Main St`,
        consigneeCity: ['Toronto', 'Mississauga', 'Brampton', 'Oakville'][Math.floor(Math.random() * 4)],
        consigneePostal: `M${carrierId}C ${index}${carrierId}${index}`,
        consigneeProvince: 'ON',
        consigneeCountry: 'CA',
        consigneeInstructions: 'Handle with care',
        consigneeZone: `${carrierId}C ${180 + index}`,
        pod: Math.random() > 0.5 ? 'Y' : 'N',
        poNumber: `PO${carrierId}${String(index + 1).padStart(3, '0')}`,
        waybill: `WB${carrierId}${String(index + 1).padStart(4, '0')}`,
        qty: Math.floor(Math.random() * 10) + 1,
        weight: `${(Math.random() * 100 + 10).toFixed(1)} lbs`,
        loadId: `LD${carrierId}${String(index + 1).padStart(3, '0')}`,
        customerId: `CU${carrierId}`,
        carrierId: `CR${carrierId}`,
        webLoad: Math.random() > 0.5 ? 'Y' : 'N',
        scheduledLoad: Math.random() > 0.5 ? 'Y' : 'N',
        cubedWeight: `${(Math.random() * 50 + 5).toFixed(1)} ft³`,
        distance: `${Math.floor(Math.random() * 500 + 50)} km`,
        dangerousGoods: Math.random() > 0.8 ? 'Y' : 'N',
        truckId: `TK${carrierId}${String(index + 1).padStart(2, '0')}`,
        trailorId: `TR${carrierId}${String(index + 1).padStart(2, '0')}`,
        currency: 'CAD',
        declaredValue: `$${Math.floor(Math.random() * 10000 + 1000)}`,
        finalizeHold: Math.random() > 0.7 ? 'Y' : 'N',
        hasComments: Math.random() > 0.6 ? 'Y' : 'N',
        baseAmount: `$${(Math.random() * 500 + 100).toFixed(2)}`,
        fuelAmount: `$${(Math.random() * 100 + 20).toFixed(2)}`,
        otherAmount: `$${(Math.random() * 50).toFixed(2)}`,
        subtotal: `$${(Math.random() * 650 + 120).toFixed(2)}`,
        tax: `$${(Math.random() * 80 + 15).toFixed(2)}`,
        tax1Amount: `$${(Math.random() * 40 + 8).toFixed(2)}`,
        tax1Type: 'HST',
        tax2Amount: `$${(Math.random() * 30 + 5).toFixed(2)}`,
        tax2Type: 'GST',
        totalAmount: `$${(Math.random() * 750 + 150).toFixed(2)}`,
        weather: ['Clear', 'Rain', 'Snow', 'Fog'][Math.floor(Math.random() * 4)],
        commission: `$${(Math.random() * 50 + 10).toFixed(2)}`,
        profit: `$${(Math.random() * 200 + 50).toFixed(2)}`,
        margin: `${(Math.random() * 20 + 5).toFixed(1)}%`,
    }));
};

const DynamicDispatchTable = ({ selectedCarriers, isLoading }) => {
    const [selectedLoads, setSelectedLoads] = useState(new Set());
    const [selectAllLoads, setSelectAllLoads] = useState(false);

    //load data for all selected carriers
    const allLoads = useMemo(() => {
        if (selectedCarriers.size === 0) return [];

        let loads = [];
        selectedCarriers.forEach((carrierId) => {
            const carrierLoads = generateLoadData(carrierId);
            loads = [...loads, ...carrierLoads];
        });

        return loads.sort((a, b) => a.loadNumber.localeCompare(b.loadNumber));
    }, [selectedCarriers]);

    const handleSelectAllLoads = useCallback(
        (checked) => {
            setSelectAllLoads(checked);
            if (checked) {
                const allLoadIds = new Set(allLoads.map((load) => load.id));
                setSelectedLoads(allLoadIds);
            } else {
                setSelectedLoads(new Set());
            }
        },
        [allLoads],
    );

    const handleLoadSelect = useCallback(
        (loadId, checked) => {
            const newSelectedLoads = new Set(selectedLoads);

            if (checked) {
                newSelectedLoads.add(loadId);
            } else {
                newSelectedLoads.delete(loadId);
            }

            setSelectedLoads(newSelectedLoads);

            if (newSelectedLoads.size === allLoads.length && allLoads.length > 0) {
                setSelectAllLoads(true);
            } else {
                setSelectAllLoads(false);
            }
        },
        [selectedLoads, allLoads.length],
    );

    const getServiceColor = (color) => {
        const colors = {
            red: 'bg-red-500',
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            orange: 'bg-orange-500',
        };
        return colors[color] || 'bg-gray-500';
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="container w-full">
                <div className="mb-4 rounded bg-slate-600 py-2 text-center text-white">
                    <p>Loading loads data...</p>
                </div>
                <div className="flex h-64 items-center justify-center">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="text-lg text-gray-600">Loading carrier loads...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container w-full">
            <PageNav className="mt-2 py-2">
                <p className="text-center text-white">
                    Total Loads: {allLoads.length} AND Selected Loads: {selectedLoads.size}
                </p>
            </PageNav>

            {/* Table Container */}
            <div className="mt-2 w-full overflow-x-auto rounded-lg border border-gray-300">
                <table className="min-w-full text-left text-sm">
                    <thead>
                    <tr className="bg-slate-400 text-white">
                        <th className="min-w-[50px] border-r border-white px-1 py-2">
                            <Checkbox checked={selectAllLoads} onCheckedChange={handleSelectAllLoads} />
                        </th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">Load</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">Row #</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">Alert</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Reference</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">Route</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">Stop</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Service</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Vehicle</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Load Status</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Created</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Dispatched</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Exp Ship Start</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Exp Ship End</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Exp Del Start</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Exp Del End</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Pickup Arrival</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Actual Ship</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Customer Code</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Customer Name</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Called By</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Code</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Name</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Street</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper City</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Postal</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Province</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Country</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipping Instructions</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Shipper Zone</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Pickup Rep</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Code</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Name</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Street</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee City</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Postal</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Province</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Country</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Instructions</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Consignee Zone</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">POD</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">P.O. Number</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Waybill</th>
                        <th className="min-w-[80px] border-r border-white px-1 py-2">QTY</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Weight</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Load ID</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Customer ID</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Carrier ID</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Web Load</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Scheduled Load</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Cubed Weight</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Distance</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Dangerous Goods</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Truck ID</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Trailor ID</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Currency</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Declared Value</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Finalize Hold</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Has Comments</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Base Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Fuel Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Other Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Subtotal</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Tax</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Tax 1 Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Tax 1 Type</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Tax 2 Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Tax 2 Type</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Total Amount</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Weather</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Commission</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Profit</th>
                        <th className="min-w-[100px] border-r border-white px-1 py-2">Margin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allLoads.length > 0 ? (
                        allLoads.map((load) => (
                            <tr key={load.id} className="border-b bg-green-100 hover:bg-green-200">
                                <td className="border px-2 py-1">
                                    <Checkbox
                                        checked={selectedLoads.has(load.id)}
                                        onCheckedChange={(checked) => handleLoadSelect(load.id, checked)}
                                    />
                                </td>
                                <td className="border px-2 py-1">{load.loadNumber}</td>
                                <td className="border px-2 py-1">{load.rowNumber}</td>
                                <td className="border px-2 py-1">
                                    {load.alert && <span className="rounded bg-red-500 px-1 text-xs text-white">{load.alert}</span>}
                                </td>
                                <td className="border px-2 py-1">{load.reference}</td>
                                <td className="border px-2 py-1">{load.route}</td>
                                <td className="border px-2 py-1">{load.stop}</td>
                                <td className="border px-2 py-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-4 w-2 ${getServiceColor(load.service.color)}`}></div>
                                        <span>{load.service.name}</span>
                                    </div>
                                </td>
                                <td className="border px-2 py-1">{load.vehicle}</td>
                                <td className="border px-2 py-1">{load.loadStatus}</td>
                                <td className="border px-2 py-1">{load.createdDate}</td>
                                <td className="border px-2 py-1">{load.dispatchedDate}</td>
                                <td className="border px-2 py-1">{load.expShipStart}</td>
                                <td className="border px-2 py-1">{load.expShipEnd}</td>
                                <td className="border px-2 py-1">{load.expDelStart}</td>
                                <td className="border px-2 py-1">{load.expDelEnd}</td>
                                <td className="border px-2 py-1">{load.pickupArrival}</td>
                                <td className="border px-2 py-1">{load.actualShip}</td>
                                <td className="border px-2 py-1">{load.customerCode}</td>
                                <td className="border px-2 py-1">{load.customerName}</td>
                                <td className="border px-2 py-1">{load.calledBy}</td>
                                <td className="border px-2 py-1">{load.shipperCode}</td>
                                <td className="border px-2 py-1">{load.shipperName}</td>
                                <td className="border px-2 py-1">{load.shipperStreet1}</td>
                                <td className="border px-2 py-1">{load.shipperCity}</td>
                                <td className="border px-2 py-1">{load.shipperPostal}</td>
                                <td className="border px-2 py-1">{load.shipperProvince}</td>
                                <td className="border px-2 py-1">{load.shipperCountry}</td>
                                <td className="border px-2 py-1">{load.shippingInstructions}</td>
                                <td className="border px-2 py-1">{load.shipperZone}</td>
                                <td className="border px-2 py-1">{load.pickupRep}</td>
                                <td className="border px-2 py-1">{load.consigneeCode}</td>
                                <td className="border px-2 py-1">{load.consigneeName}</td>
                                <td className="border px-2 py-1">{load.consigneeStreet1}</td>
                                <td className="border px-2 py-1">{load.consigneeCity}</td>
                                <td className="border px-2 py-1">{load.consigneePostal}</td>
                                <td className="border px-2 py-1">{load.consigneeProvince}</td>
                                <td className="border px-2 py-1">{load.consigneeCountry}</td>
                                <td className="border px-2 py-1">{load.consigneeInstructions}</td>
                                <td className="border px-2 py-1">{load.consigneeZone}</td>
                                <td className="border px-2 py-1">{load.pod}</td>
                                <td className="border px-2 py-1">{load.poNumber}</td>
                                <td className="border px-2 py-1">{load.waybill}</td>
                                <td className="border px-2 py-1">{load.qty}</td>
                                <td className="border px-2 py-1">{load.weight}</td>
                                <td className="border px-2 py-1">{load.loadId}</td>
                                <td className="border px-2 py-1">{load.customerId}</td>
                                <td className="border px-2 py-1">{load.carrierId}</td>
                                <td className="border px-2 py-1">{load.webLoad}</td>
                                <td className="border px-2 py-1">{load.scheduledLoad}</td>
                                <td className="border px-2 py-1">{load.cubedWeight}</td>
                                <td className="border px-2 py-1">{load.distance}</td>
                                <td className="border px-2 py-1">{load.dangerousGoods}</td>
                                <td className="border px-2 py-1">{load.truckId}</td>
                                <td className="border px-2 py-1">{load.trailorId}</td>
                                <td className="border px-2 py-1">{load.currency}</td>
                                <td className="border px-2 py-1">{load.declaredValue}</td>
                                <td className="border px-2 py-1">{load.finalizeHold}</td>
                                <td className="border px-2 py-1">{load.hasComments}</td>
                                <td className="border px-2 py-1">{load.baseAmount}</td>
                                <td className="border px-2 py-1">{load.fuelAmount}</td>
                                <td className="border px-2 py-1">{load.otherAmount}</td>
                                <td className="border px-2 py-1">{load.subtotal}</td>
                                <td className="border px-2 py-1">{load.tax}</td>
                                <td className="border px-2 py-1">{load.tax1Amount}</td>
                                <td className="border px-2 py-1">{load.tax1Type}</td>
                                <td className="border px-2 py-1">{load.tax2Amount}</td>
                                <td className="border px-2 py-1">{load.tax2Type}</td>
                                <td className="border px-2 py-1">{load.totalAmount}</td>
                                <td className="border px-2 py-1">{load.weather}</td>
                                <td className="border px-2 py-1">{load.commission}</td>
                                <td className="border px-2 py-1">{load.profit}</td>
                                <td className="border px-2 py-1">{load.margin}</td>
                            </tr>
                        ))
                    ) : selectedCarriers.size === 0 ? (
                        <tr className="border">
                            <td colSpan={75} className="py-14 text-center font-bold text-gray-500">
                                No carriers selected. Select carriers from the sidebar to view load data.
                            </td>
                        </tr>
                    ) : (
                        <tr className="border">
                            <td colSpan={75} className="py-14 text-center font-bold text-gray-500">
                                No loads found for selected carriers.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DynamicDispatchTable;
