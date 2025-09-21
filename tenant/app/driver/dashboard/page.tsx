'use client';

import React from "react";
import {
  Box,
  Car,
  CarIcon,
  CircleCheck,
  Clock,
  Map,
  MapPin,
  NotepadText,
  Phone,
  Route,
  ScanQrCode,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("dispatched");

  // Mock data
  const orders = [
    {
      id: "1",
      customerName: "John Smith",
      customerPhone: "+1-416-555-0101",
      pickupAddress: "100 Queen St W, Toronto, ON M5H 2N2",
      deliveryAddress: "Jail Road, Dinajpur 5200",
      status: "dispatched",
      orderTime: "01:30 PM",
      orderDate: "2024-01-15",
      specialInstructions: "গুরুত্বপূর্ণ কাগজপত্র (Important documents)",
      trackingCode: "DJ005",
    },
    {
      id: "DJ006",
      customerName: "নাসির উদ্দিন (Nasir Uddin)",
      customerPhone: "+880-1716-789012",
      pickupAddress: "City Shopping Complex, Station Road",
      deliveryAddress: "Sutrapur, Dinajpur 5200",
      status: "picked_up",
      orderTime: "02:15 PM",
      orderDate: "2024-01-15",
      specialInstructions: "ভাঙ্গুর জিনিস (Fragile items)",
      trackingCode: "DJ006",
    },
  ];

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-gray-50 shadow-xl">
      {/* Header */}
      <div className="bg-green-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Hello, Demo Driver (...)</h1>
            <p className="text-sm text-green-100">
              Paba Upazila, Bangladesh • TEST
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-black">Online</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-green-200 peer-checked:bg-green-900 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
            <Link
              prefetch
              href={"/driver/profile"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
            >
              <span className="text-green-700">
                <User className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-green-700 to-green-600 p-5 text-white shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today&apos;s Summary</h2>
            <span className="text-2xl">
              <CarIcon />
            </span>
          </div>

          <div className="flex justify-between">
            <div className="text-center">
              <div className="bg-opacity-20 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 p-2">
                <span>
                  <CircleCheck />
                </span>
              </div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs">Delivered</p>
            </div>
            <div className="bg-opacity-30 w-px bg-white"></div>
            <div className="text-center">
              <div className="bg-opacity-20 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 p-2">
                <span>
                  <Car />
                </span>
              </div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs">Picked Up</p>
            </div>
            <div className="bg-opacity-30 w-px bg-white"></div>
            <div className="text-center">
              <div className="bg-opacity-20 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 p-2">
                <span>
                  <NotepadText />
                </span>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs">Dispatched</p>
            </div>
          </div>

          <div className="bg-opacity-20 mt-4 rounded-lg bg-green-500 p-2">
            <div className="flex items-center gap-2 text-sm text-gray-50">
              <Clock /> <div>Online: 6h 24m</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="flex">
          {[
            { id: "dispatched", label: "Dispatched Orders", count: 0 },
            { id: "picked_up", label: "Picked Up", count: 0 },
            { id: "completed", label: "Completed", count: 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 border-b-2 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4 p-4">
        {orders
          .filter((order) =>
            activeTab === "dispatched"
              ? order.status === "dispatched"
              : activeTab === "picked_up"
                ? order.status === "picked_up"
                : order.status === "delivered"
          )
          .map((order) => (
            <div key={order.id}>
              <Link prefetch href={"/driver/orders/" + 5}>
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                          order.status === "dispatched"
                            ? "bg-orange-100 text-orange-600"
                            : order.status === "picked_up"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {order.status === "dispatched"
                          ? "Dispatched"
                          : order.status === "picked_up"
                            ? "Picked Up"
                            : "Delivered"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="float-end text-green-700">
                        <Clock />
                      </span>
                      <p className="clear-both text-sm font-semibold text-gray-700">
                        {order.orderTime}
                      </p>
                      <p className="text-xs text-gray-500">{order.orderDate}</p>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-black">
                        <User className="h-5 w-5" />
                      </span>
                      <span className="font-medium text-gray-800">
                        {order.customerName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-black">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="text-xs text-gray-600">
                        {order.customerPhone}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="mt-1 text-orange-500">
                        <MapPin />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-orange-600">
                          Pickup
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.pickupAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="mt-1 text-green-500">
                        <MapPin />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-green-600">
                          Delivery
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-gray-800">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">
                        <Route />
                      </span>
                      <span className="text-xs text-gray-600">2.5 km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">
                        <Box />
                      </span>
                      <span className="text-xs text-gray-600">Package</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

        {orders.filter((order) =>
          activeTab === "dispatched"
            ? order.status === "dispatched"
            : activeTab === "picked_up"
              ? order.status === "picked_up"
              : order.status === "delivered"
        ).length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">📥</div>
            <h3 className="mb-2 text-lg font-medium text-gray-600">
              {activeTab === "dispatched"
                ? "No dispatched orders available"
                : activeTab === "picked_up"
                  ? "No picked up orders"
                  : "No completed deliveries yet"}
            </h3>
            <p className="text-sm text-gray-500">Pull down to refresh</p>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      {/* <div className="fixed right-6 bottom-6 space-y-3">
                    <Link
                        prefetch
                        href={'/driver/scanner'}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-xl text-white shadow-lg transition-colors hover:bg-orange-700"
                    >
                        <ScanQrCode />
                    </Link>
                    <Link
                        prefetch
                        href={'/driver/map'}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl text-white shadow-lg transition-colors hover:bg-green-800"
                    >
                        <Map />
                    </Link>
                </div> */}

      <div className="absolute right-6 bottom-6 space-y-3">
        <Link
          prefetch
          href={"/driver/scanner"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-xl text-white shadow-lg transition-colors hover:bg-orange-700"
        >
          <ScanQrCode />
        </Link>
        <Link
          prefetch
          href={"/driver/map"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl text-white shadow-lg transition-colors hover:bg-green-800"
        >
          <Map />
        </Link>
      </div>
    </div>
  );
}
