"use client";

import React from "react";
import { Camera, Eye, IdCard, Info, Lock, LogIn } from "lucide-react";
import AppLogo from "@/public/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DriverLogin() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-700 to-green-900">
      {/* Header */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full">
            <Image src={AppLogo} alt="App Logo" />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-wider text-white">
          DC Drive
        </h1>
        <div className="bg-opacity-20 border-opacity-30 rounded-full border border-white bg-green-600 px-4 py-1">
          <span className="text-xs font-bold tracking-wider text-white">
            Delivery Partner Portal
          </span>
        </div>
      </div>

      {/* Login Form */}
      <div className="rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-green-700">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to start your delivery shift</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-green-700">
                <Camera />
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-black focus:border-green-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Logistics ID
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-green-700">
                <IdCard />
              </span>
              <input
                type="text"
                placeholder="Enter your logistics id"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-black focus:border-green-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Password
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-green-700">
                <Lock />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-black focus:border-green-700 focus:outline-none"
              />
              <span className="absolute top-3 right-3 cursor-pointer text-gray-500">
                <Eye />
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push("/driver/otp")}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-green-700 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            <span>
              <LogIn />
            </span>
            <span>Sign In</span>
          </button>

          <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4">
            <div className="mb-2 flex items-start space-x-2">
              <div className="bg-opacity-10 rounded-full bg-green-700 p-1">
                <span className="text-xs text-green-700">
                  <Info className="h-5 w-5 text-white" />
                </span>
              </div>
              <span className="text-sm font-semibold text-green-700">
                Demo Credentials
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex">
                <span className="w-12 text-green-700">Email:</span>
                <span className="font-mono text-green-900">test@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-12 text-green-700">Code:</span>
                <span className="font-mono text-green-900">test</span>
              </div>
              <div className="flex">
                <span className="w-12 text-green-700">Pass:</span>
                <span className="font-mono text-green-900">123456</span>
              </div>
              <p className="mt-2 text-xs text-green-800 italic">
                OTP will be: 1234
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
