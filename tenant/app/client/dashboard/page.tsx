import React from "react";

export default function ClientDashboard() {
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
