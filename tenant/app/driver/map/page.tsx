"use client";
import React from "react";
import GoogleMapReact from "google-map-react";
import { ArrowLeft, MapPin, RefreshCcw } from "lucide-react";
import Link from "next/link";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function DriverMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between bg-green-700 p-4 text-white">
        <div className="flex items-center space-x-3">
          <Link
            prefetch
            href={"/driver/dashboard"}
            className="text-xl text-white"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold">Delivery Map</h1>
        </div>
        <div className="flex space-x-2">
          <button className="text-white">
            <RefreshCcw />
          </button>
          <button className="text-white">
            <MapPin />
          </button>
        </div>
      </div>

      <div className="relative h-screen bg-green-100">
        {/* Map Legend */}
        <div className="absolute top-4 right-4 z-1 rounded-xl bg-white p-4 shadow-lg">
          <h3 className="mb-3 text-sm font-bold text-gray-800">Map Legend</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-700">
                <span className="text-xs text-white">🚛</span>
              </div>
              <span className="text-gray-700">Your Truck</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
                <span className="text-xs text-white">🏪</span>
              </div>
              <span className="text-gray-700">Pickup Store</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                <span className="text-xs text-white">🏠</span>
              </div>
              <span className="text-gray-700">Customer Home</span>
            </div>
            <hr className="my-2" />
            <div className="flex items-center space-x-2">
              <div className="h-1 w-4 bg-orange-500"></div>
              <span className="text-xs text-gray-700">Active Route</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-4 bg-green-500"></div>
              <span className="text-xs text-gray-700">Completed</span>
            </div>
          </div>
        </div>

        {/* Simulated Map with markers */}
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-200 to-green-300">
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
}
