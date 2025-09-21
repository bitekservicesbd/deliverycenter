"use client";

import * as React from "react";
import {
  AudioWaveform,
  Banknote,
  BoxIcon,
  Command,
  GalleryVerticalEnd,
  Hourglass,
  IdCard,
  Settings,
  ToolCase,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import AppLogo from "@/public/logo.png";
import Image from "next/image";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Orders",
      url: "#",
      icon: BoxIcon,
      isActive: true,
      items: [
        {
          title: "New Load",
          url: "/agent/load/create",
        },
        {
          title: "Load Search",
          url: "/agent/load/search",
        },
        {
          title: "Dispatch Board",
          url: "/agent/load/dispatch-boards",
        },
        {
          title: "Finalize Loads",
          url: "/agent/load/finalize-loads",
        },
      ],
    },
    {
      title: "Carriers",
      url: "#",
      icon: Users2,
      isActive: false,
      items: [
        {
          title: "Carriers",
          url: "/agent/carriers",
        },
        {
          title: "Customer Brokers",
          url: "/agent/customer-brokers",
        },
      ],
    },
    {
      title: "Accounting",
      url: "#",
      icon: Banknote,
      isActive: false,
      items: [
        {
          title: "Invoice",
          url: "/agent/accounting/invoice",
        },
        {
          title: "GL Search",
          url: "/agent/accounting/gl-search",
        },
        {
          title: "Manual Invoice",
          url: "/agent/accounting/manual-invoice",
        },
        {
          title: "Schedule Manual Invoice",
          url: "/agent/accounting/schedule-manual-invoice",
        },
        {
          title: "Settle Carriers",
          url: "/agent/accounting/settle-carriers",
        },
      ],
    },
    {
      title: "Tools",
      url: "#",
      icon: ToolCase,
      isActive: false,
      items: [
        {
          title: "Importer",
          url: "/agent/tools/importer",
        },
        {
          title: "Messaging Queue Manager",
          url: "/agent/tools/messaging-queue-manager",
        },
      ],
    },
    {
      title: "Maintenance",
      url: "#",
      icon: Hourglass,
      isActive: false,
      items: [
        {
          title: "Purge Loads",
          url: "/agent/maintenance/purge-loads",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: IdCard,
      isActive: false,
      items: [
        {
          title: "Customers",
          url: "/agent/customers",
        },
        {
          title: "Customers Search",
          url: "/agent/customers/search",
        },
      ],
    },
    {
      title: "Application Settings",
      url: "#",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "Accessorial Types",
          url: "/agent/application-settings/accessorial-types",
        },
        {
          title: "Assets",
          url: "/agent/application-settings/assets",
        },
        {
          title: "Attachment Categories",
          url: "/agent/application-settings/attachment-categories",
        },
        {
          title: "Auto Dispatch",
          url: "/agent/application-settings/auto-dispatch",
        },
        {
          title: "Bill Freight Terms",
          url: "/agent/application-settings/bill-freight-terms",
        },
        {
          title: "Billing Group",
          url: "/agent/application-settings/billing-group",
        },
        {
          title: "Billing Terms",
          url: "/agent/application-settings/billing-terms",
        },
        {
          title: "Carrier Commission Plans",
          url: "/agent/application-settings/carrier-commission-plans",
        },
        {
          title: "Carrier Payment Zones",
          url: "/agent/application-settings/carrier-payment-zones",
        },
        {
          title: "Carrier Types",
          url: "/agent/application-settings/carrier-types",
        },
        {
          title: "Currency Types",
          url: "/agent/application-settings/currency-types",
        },
        {
          title: "Customer Relation",
          url: "/agent/application-settings/customer-relation",
        },
        {
          title: "Customer Types",
          url: "/agent/application-settings/customer-types",
        },
        {
          title: "Deduction Types",
          url: "/agent/application-settings/deduction-types",
        },
        {
          title: "Delivery Conditions",
          url: "/agent/application-settings/delivery-conditions",
        },
        {
          title: "Dispatch Boards",
          url: "/agent/application-settings/dispatch-boards",
        },
        {
          title: "Dispatch Zones",
          url: "/agent/application-settings/dispatch-zones",
        },
        {
          title: "Distance Cache",
          url: "/agent/application-settings/distance-cache",
        },
        {
          title: "Docks",
          url: "/agent/application-settings/docks",
        },
        {
          title: "Fuel Surcharges Adjustments",
          url: "/agent/application-settings/fuel-surcharges-adjustments",
        },
        {
          title: "Holidays",
          url: "/agent/application-settings/holidays",
        },
        {
          title: "Packages",
          url: "/agent/application-settings/packages",
        },
        {
          title: "Payment Types",
          url: "/agent/application-settings/payment-types",
        },
        {
          title: "Price Plans",
          url: "/agent/application-settings/price-plans",
        },
        {
          title: "Price Plan Charges Adjustments",
          url: "/agent/application-settings/price-plan-charges-adjustments",
        },
        {
          title: "Price Plan Templates",
          url: "/agent/application-settings/price-plan-templates",
        },
        {
          title: "Price Plan Zone Count",
          url: "/agent/application-settings/price-plan-zone-count",
        },
        {
          title: "Sales Commission Plans",
          url: "/agent/application-settings/sales-commission-plans",
        },
        {
          title: "Service Class",
          url: "/agent/application-settings/service-class",
        },
        {
          title: "State/Provincial Taxes",
          url: "/agent/application-settings/provincial-taxes",
        },
        {
          title: "Surcharges",
          url: "/agent/application-settings/surcharges",
        },
        {
          title: "Taxes",
          url: "/agent/application-settings/taxes",
        },
        {
          title: "UOM Types",
          url: "/agent/application-settings/uom-types",
        },
        {
          title: "Vehicle Types",
          url: "/agent/application-settings/vehicle-types",
        },
        {
          title: "Vendors",
          url: "/agent/application-settings/vendors",
        },
        {
          title: "Vendors Expenses",
          url: "/agent/application-settings/vendors-expenses",
        },
        {
          title: "Warehouse",
          url: "/agent/application-settings/warehouse",
        },
        {
          title: "Zones",
          url: "/agent/application-settings/zones",
        },
        {
          title: "Zone Counts",
          url: "/agent/application-settings/zone-counts",
        },
        {
          title: "Zone Group",
          url: "/agent/application-settings/zone-group",
        },
      ],
    },
  ],
};

export function TenantSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/tenant/dashboard">
                <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={AppLogo} alt="App Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Dashboard</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
