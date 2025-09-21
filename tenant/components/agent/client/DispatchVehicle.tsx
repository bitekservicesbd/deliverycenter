"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Mail, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Customer from './Customer';
import PageNav from "@/components/server/PageNav";

const DispatchVehicle = ({ onCarrierSelectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCarriers, setSelectedCarriers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [allCarriers, setAllCarriers] = useState([]);

  // Generate carrier data ONLY on client side
  useEffect(() => {
    const carriers = Array.from({ length: 14 }, (_, index) => ({
      id: index + 1,
      name: `Carrier ${index + 1}`,
      status: { h: true, c: Math.random() > 0.5 },
      stats: [
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
      ],
    }));
    setAllCarriers(carriers);
  }, []);

  const filteredCarriers = allCarriers.filter((carrier) => {
    if (!searchTerm.trim()) return true;
    return carrier.id.toString().includes(searchTerm.trim()) || carrier.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleSearch = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
      const newSelectedCarriers = new Set();
      setSelectedCarriers(newSelectedCarriers);
      setSelectAll(false);
      if (onCarrierSelectionChange) {
        onCarrierSelectionChange(newSelectedCarriers);
      }
    },
    [onCarrierSelectionChange],
  );

  const handleSelectAll = useCallback(
    (checked) => {
      setSelectAll(checked);
      const newSelection = checked ? new Set(filteredCarriers.map((carrier) => carrier.id)) : new Set();
      setSelectedCarriers(newSelection);
      if (onCarrierSelectionChange) {
        onCarrierSelectionChange(newSelection);
      }
    },
    [filteredCarriers, onCarrierSelectionChange],
  );

  const handleCarrierSelect = useCallback(
    (carrierId, checked) => {
      const newSelectedCarriers = new Set(selectedCarriers);
      if (checked) newSelectedCarriers.add(carrierId);
      else newSelectedCarriers.delete(carrierId);

      setSelectedCarriers(newSelectedCarriers);
      if (onCarrierSelectionChange) {
        onCarrierSelectionChange(newSelectedCarriers);
      }
      setSelectAll(newSelectedCarriers.size === filteredCarriers.length && filteredCarriers.length > 0);
    },
    [selectedCarriers, filteredCarriers, onCarrierSelectionChange],
  );

  return (
    <div className="w-full lg:w-2/12">
      <div className="mb-2 lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center gap-2 rounded-md bg-blue-600 p-2 text-white shadow transition-colors hover:bg-blue-700"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-sm">Vehicle</span>
        </button>
      </div>

      <div className="hidden lg:block">
        <div className="mx-1 min-h-screen">
          <SidebarContent
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            carriers={filteredCarriers}
            selectedCarriers={selectedCarriers}
            handleCarrierSelect={handleCarrierSelect}
            allCarriers={allCarriers}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } `}
      >
        <div className="mt-2 border-t">
          <SidebarContent
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            carriers={filteredCarriers}
            selectedCarriers={selectedCarriers}
            handleCarrierSelect={handleCarrierSelect}
            allCarriers={allCarriers}
          />
        </div>
      </div>
    </div>
  );
};

// SidebarContent
const SidebarContent = ({ searchTerm, handleSearch, selectAll, handleSelectAll, carriers, selectedCarriers, handleCarrierSelect, allCarriers }) => (
  <div className="h-full border bg-white px-3 dark:bg-zinc-900">
    <PageNav className="w-full py-1">
      <div className="flex items-center justify-center gap-3 text-white">
        <span>Send Message</span> <Mail />
      </div>
    </PageNav>
    <div className="mt-2">
      <Select defaultValue="All">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="close">Close</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="mt-3 w-32">
      <div className="flex items-center gap-2">
        <Checkbox id="Has-Loads" />
        <Label htmlFor="Has-Loads">Has Loads?</Label>
      </div>
    </div>
    <div className="mt-8">
      <Customer placeholder="Search by ID or Name..." value={searchTerm} onChange={handleSearch} />
    </div>
    <div className="container mt-3 w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[250px] border">
          <thead>
          <tr className="mx-1 bg-slate-400">
            <th className="w-8 border-r border-white px-1 py-2">
              <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
            </th>
            <th className="border-r border-white px-1 py-2">Carrier Name</th>
          </tr>
          </thead>
          <tbody>
          {carriers.length > 0 ? (
            carriers.map((carrier) => (
              <tr key={carrier.id}>
                <td className="border px-2">
                  <Checkbox
                    checked={selectedCarriers.has(carrier.id)}
                    onCheckedChange={(checked) => handleCarrierSelect(carrier.id, checked)}
                  />
                </td>
                <td className="border px-2">
                  <p>
                    {carrier.id}{' '}
                    {carrier.status.h && <span className="rounded bg-green-400 px-1">H</span>}
                    {carrier.status.c && <span className="ml-1 rounded bg-orange-400 px-1">C</span>}
                  </p>
                  <div className="flex items-center gap-3">
                    <p>({carrier.stats.join('|')})</p>
                    <Car size={16} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="border px-4 py-8 text-center text-gray-500">
                No carriers found
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-4 text-xs text-gray-600">
      Selected: {selectedCarriers.size} of {carriers.length}
      {searchTerm && <span className="ml-2">(filtered from {allCarriers.length})</span>}
    </div>
  </div>
);

export default DispatchVehicle;
