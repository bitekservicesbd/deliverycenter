import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-client';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BoxIcon, LayoutGrid, ToolCase, Users } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Orders',
        icon: BoxIcon,
        children: [
            {
                title: 'Load Search',
                href: route('client.loads.search'),
            },
            {
                title: 'New Load',
                href: route('client.loads.create'),
            },
            {
                title: 'New Load Simple',
                href: route('client.loads.create.simple'),
            },
        ],
    },

    {
        title: 'Customer',
        icon: Users,
        children: [
            {
                title: 'Account Setup',
                href: route('client.customer.account.setup'),
            },
            {
                title: 'My Contacts',
                href: route('client.customer.my.contact'),
            },
            {
                title: 'My Address',
                href: route('client.customer.my.address'),
            },
            {
                title: 'My Invoices',
                href: route('client.customer.invoices'),
            },
        ],
    },
    {
        title: 'Tools',
        icon: ToolCase,
        children: [
            {
                title: 'Importer',
                href: route('client.tools.importer'),
            },
            {
                title: 'Reports',
                href: route('client.tools.reports'),
            },
        ],
    },
];

export function ClientAppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
