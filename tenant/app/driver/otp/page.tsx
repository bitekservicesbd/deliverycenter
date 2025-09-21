"use client";
import React from "react";
import { ArrowLeft, Info, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DriverOTP() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="p-4">
        <Link prefetch href="/driver/login" className="text-xl text-black">
          <ArrowLeft />
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-700 shadow-lg">
          <span className="text-2xl text-white">
            <MessageSquareText />
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-green-700">Verify Email</h1>
        <p className="mb-12 text-center text-gray-600">
          Enter the 4-digit code sent to
          <br />
          test@gmail.com
        </p>

        <div className="mb-8 flex space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              className="h-14 w-14 rounded-xl border-2 border-gray-300 text-center text-xl font-semibold focus:border-green-700 focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/driver/dashboard")}
          className="mb-8 flex w-full items-center justify-center space-x-2 rounded-xl bg-green-700 py-3 font-semibold text-white disabled:bg-gray-400"
        >
          <span>✓</span>
          <span>Verify OTP</span>
        </button>

        <div className="text-center">
          <p className="mb-2 text-gray-600">Didn&apos;t receive the code?</p>
          <p className="text-gray-500">Resend in 52s</p>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-green-600 p-2">
              <span className="text-sm text-white">
                <Info />
              </span>
            </div>
            <div>
              <p className="font-semibold text-green-700">Demo OTP: 1234</p>
              <p className="text-xs text-green-600">
                Use this code for demo login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
