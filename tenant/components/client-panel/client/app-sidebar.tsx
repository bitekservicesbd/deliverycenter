"use client";

import * as React from "react";
import {
  AudioWaveform,
  BoxIcon,
  Command,
  GalleryVerticalEnd,
  Settings,
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
import { ClientNavMain } from "./nav-main";
import { ClientNavUser } from "./nav-user";
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
          title: "Load Search",
          url: "/client/loads/load-search",
        },
        {
          title: "New Load",
          url: "/client/loads/create",
        },
        {
          title: "New Load Simple",
          url: "/client/loads/create/simple",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: AudioWaveform,
      isActive: true,
      items: [
        {
          title: "Account Setup",
          url: "/client/customers/account-setup",
        },
        {
          title: "My Contacts",
          url: "/client/customers/my-contacts",
        },
        {
          title: 'My Address',
          url: "/client/customers/my-address",
        },
        {
          title: 'Invoices',
          url: "/client/customers/invoices",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function ClientSidebar({
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
        <ClientNavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ClientNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
