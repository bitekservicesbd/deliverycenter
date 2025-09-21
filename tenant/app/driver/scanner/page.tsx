'use client';

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import QrCodeScanner from "@/components/driver/client/QrCodeScanner";

export default function DriverScanner() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Link
            prefetch
            href={"/driver/dashboard"}
            className="text-xl text-white"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold text-white">
            Scan Order Barcode
          </h1>
        </div>
      </div>
      <QrCodeScanner />
    </div>
  );
}
