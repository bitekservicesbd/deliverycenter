import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default function page() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
    </>
  );
}
