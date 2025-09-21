'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageNav from "@/components/server/PageNav";
import * as React from "react";

export default function TopSearch({ className }: { className?: string }) {
  return (
    <PageNav className={`rounded p-4 ${className ?? ""}`}>
      <div className="flex flex-col gap-4 py-3 lg:flex-row lg:justify-end">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Label htmlFor="load" className="text-white sm:w-auto lg:w-1/4">
            Load #
          </Label>
          <Input
            type="text"
            className="bg-slate-100 sm:flex-1 lg:w-3/4 dark:bg-zinc-700"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Label
            htmlFor="Reference"
            className="text-white sm:w-auto lg:w-2/4"
          >
            Reference #
          </Label>
          <Input
            type="text"
            className="bg-slate-100 sm:flex-1 lg:w-3/4 dark:bg-zinc-700"
          />
        </div>
        <div className="lg:mr-4">
          <Button
            type="button"
            className="w-full bg-sky-900 sm:w-auto dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950"
          >
            Search
          </Button>
        </div>
      </div>
    </PageNav>
  );
}
