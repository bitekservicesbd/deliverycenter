import React from "react";
import { ArrowLeft, Clock, Info, Map, MapPin, Phone, ScanQrCode } from "lucide-react";
import Link from "next/link";

export default function DriverOrderDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between bg-green-700 p-4 text-white">
        <div className="flex items-center space-x-3">
          <Link
            prefetch
            href="/driver/dashboard"
            className="text-xl text-white"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold">Order Details</h1>
        </div>
        <Link prefetch href={"/driver/map"} className="text-xl text-white">
          <Map />
        </Link>
      </div>

      <div className="space-y-4 p-4">
        {/* Order Header */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Order #1
              </h2>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                Dispatched
              </span>
            </div>
            <div className="text-right">
              <span className="float-end text-2xl text-green-700">
                <Clock />
              </span>
              <p className="clear-both font-semibold text-gray-700">01:30 PM</p>
              <p className="text-sm text-gray-600">2024-01-15</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-gray-800">
            Customer Information
          </h3>
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700">
              <span className="text-lg font-bold text-white">J</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">John Smith</p>
              <p className="text-gray-600">+1-416-555-0101</p>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-green-700">
                <Phone />
              </span>
            </button>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-start space-x-2">
              <span className="text-blue-700"><Info/></span>
              <p className="text-sm text-blue-700">
                গুরুত্বপূর্ণ কাগজপত্র (Important documents)
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Route */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-gray-800">
            Delivery Route
          </h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <span className="text-orange-600">
                  <MapPin />
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-600">
                  Pickup Location
                </p>
                <p className="text-gray-700">
                  100 Queen St W, Toronto, ON M5H 2N2
                </p>
              </div>
            </div>

            <div className="ml-4 h-8 w-0.5 bg-gray-300"></div>

            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <span className="text-green-600">
                  <MapPin />
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600">
                  Delivery Location
                </p>
                <p className="text-gray-700">Jail Road, Dinajpur 5200</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Barcode */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-green-700">
              <ScanQrCode />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Order Barcode
              </p>
              <p className="font-mono text-lg font-bold text-green-700">
                DJ005
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          prefetch
          href={"/driver/scanner"}
          className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-green-700 py-4 font-semibold text-white"
        >
          <span>
            <ScanQrCode />
          </span>
          <span>Scan & Pick Up</span>
        </Link>
      </div>
    </div>
  );
}
