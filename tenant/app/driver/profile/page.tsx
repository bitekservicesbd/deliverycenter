"use client";

import React from "react";
import { ArrowLeft, Camera, Pencil } from "lucide-react";
import Link from "next/link";
import AppLogo from "@/public/logo.png";
import Image from "next/image";

export default function DriverProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-green-500 p-6 pb-12 text-white">
        <div className="mb-8 flex items-center justify-between">
          <Link
            prefetch
            href={"/driver/dashboard"}
            className="text-xl text-white"
          >
            <ArrowLeft />
          </Link>
          <button className="text-xl text-white">
            <Pencil />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-green-700">
              <Image src={AppLogo} alt="Logo" />
            </div>
            <button className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-700">
              <span className="text-sm text-white">
                <Camera />
              </span>
            </button>
          </div>

          <h1 className="mb-2 text-2xl font-bold">Demo Driver (TEST)</h1>
          <p className="mb-4 text-green-100">test@gmail.com</p>

          <div className="bg-opacity-20 border-opacity-30 rounded-full border border-white bg-white px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-300"></div>
              <span className="font-semibold text-black">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-6 space-y-4 p-4">
        {/* Personal Information */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span className="text-green-700">👤</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Personal Information
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🆔", label: "Full Name", value: "Demo Driver (TEST)" },
              { icon: "📧", label: "Email Address", value: "test@gmail.com" },
              { icon: "📞", label: "Phone Number", value: "+1-416-555-0100" },
              { icon: "🏷️", label: "Driver ID", value: "DRV_TEST_001" },
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-3">
                <span className="text-gray-600">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span className="text-green-700">🚐</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Vehicle Information
            </h2>
          </div>

          <div className="mb-4 space-y-3">
            {[
              { icon: "🚗", label: "Vehicle Type", value: "Van" },
              { icon: "🔢", label: "Vehicle Number", value: "TEST-2024" },
              { icon: "💳", label: "License Number", value: "D123456789" },
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-3">
                <span className="text-gray-600">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span className="text-sm font-semibold text-green-700">
                Vehicle Verified & Insured
              </span>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span className="text-green-700">📈</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Performance Stats
            </h2>
          </div>

          <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4">
            <h3 className="mb-3 font-bold text-blue-800">
              This Month Performance
            </h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-xl font-bold text-blue-800">43</p>
                <p className="text-xs text-blue-600">Deliveries</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-800">98%</p>
                <p className="text-xs text-blue-600">On-Time %</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-800">$1,247</p>
                <p className="text-xs text-blue-600">Earnings</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                <span className="text-white">🏆</span>
              </div>
              <div>
                <p className="font-bold text-yellow-800">Top Performer!</p>
                <p className="text-sm text-yellow-700">
                  You&apos;re in the top 10% of drivers this month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-lg font-bold text-gray-800">
                Settings & Preferences
              </h2>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Notifications</p>
                    <p className="text-xs text-gray-500">
                      Push notifications for new orders
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500"></div>
                  <div className="absolute top-0.5 left-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-transform peer-checked:translate-x-full"></div>
                </label>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      Location Services
                    </p>
                    <p className="text-xs text-gray-500">
                      Real-time location tracking
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500"></div>
                  <div className="absolute top-0.5 left-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-transform peer-checked:translate-x-full"></div>
                </label>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      Auto-Accept Orders
                    </p>
                    <p className="text-xs text-gray-500">
                      Automatically accept assigned orders
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-green-500"></div>
                  <div className="absolute top-0.5 left-[2px] h-5 w-5 rounded-full border border-gray-300 bg-white transition-transform peer-checked:translate-x-full"></div>
                </label>
              </li>
            </ul>
          </div>

          <div className="divide-y divide-gray-100 rounded-2xl bg-white p-5 shadow-sm">
            <a href="#" className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Help & Support</p>
                  <p className="text-sm text-gray-500">Get help with the app</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">About</p>
                  <p className="text-sm text-gray-500">
                    App version and information
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <div className="mb-3 flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-lg font-bold text-gray-800">
                Emergency Contacts
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-green-100/60 p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-500 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-900">DC Drive Support</p>
                    <p className="text-sm font-medium text-green-800">
                      +1-800-DC-DRIVE
                    </p>
                  </div>
                </div>
                <a href="tel:1-800-DC-DRIVE" className="text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.18 6.18l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-red-100/60 p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-red-500 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-red-900">Emergency Services</p>
                    <p className="text-sm font-medium text-red-800">911</p>
                  </div>
                </div>
                <a href="tel:911" className="text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.18 6.18l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-orange-100/60 p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-orange-500 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-orange-900">
                      Roadside Assistance
                    </p>
                    <p className="text-sm font-medium text-orange-800">
                      1-800-ROADSIDE
                    </p>
                  </div>
                </div>
                <a href="tel:1-800-ROADSIDE" className="text-orange-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.18 6.18l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="flex w-full items-center justify-center space-x-2 rounded-xl bg-red-500 px-4 py-3.5 font-bold text-white transition-colors hover:bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
