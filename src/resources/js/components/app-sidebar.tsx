import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Activity, Globe, Layers, LayoutGrid, PackagePlus, Settings, Users, UserX } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        icon: Users,
        children: [
            {
                title: 'Central Users',
                href: route('central.users.index'),
            },
            {
                title: 'Tenant Users',
                href: route('central.tenant.users.index'),
            },
        ],
    },
    {
        title: 'Plans',
        href: route('central.plans.index'),
        icon: Layers,
    },
    {
        title: 'Demo Requests',
        href: route('central.demo-request.index'),
        icon: PackagePlus,
    },
    {
        title: 'Multi Tenant',
        href: route('central.tenants.index'),
        icon: Globe,
    },
    {
        title: 'Activity Log',
        href: route('central.activity-log.index'),
        icon: Activity,
    },
    {
        title: 'Settings',
        href: route('central.settings.general'),
        icon: Settings,
    },
    {
        title: 'Blocked Ip',
        href: route('central.blocked.ip.index'),
        icon: UserX,
    },
];

export function AppSidebar() {
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
