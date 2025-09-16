import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BoxIcon, Hourglass, IdCard, LayoutGrid, LockKeyhole, Receipt, Settings, ToolCase, Users } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Orders',
        icon: BoxIcon,
        children: [
            {
                title: 'New Load',
                href: '/load/create',
            },
            {
                title: 'Load Search',
                href: '/load/search',
            },
            {
                title: 'Dispatch Board',
                href: '/load/dispatch-board',
            },
            {
                title: 'Finalize Loads',
                href: '/load/finalize',
            },
        ],
    },

    {
        title: 'Carriers',
        icon: Users,
        children: [
            {
                title: 'Carriers',
                href: '/carriers',
            },
            {
                title: 'Customer Brokers',
                href: '/carriers/customer-brokers',
            },
        ],
    },
    {
        title: 'Accounting',
        icon: Receipt,
        children: [
            {
                title: 'Invoice',
                href: '/accounting/invoice',
            },
            {
                title: 'GL Search',
                href: '/accounting/gl-search',
            },
            {
                title: 'Manual Invoice',
                href: '/accounting/manual-invoice',
            },
            {
                title: 'Schedule Manual Invoice',
                href: route('tenant.accounting.schedule.manual.invoice'),
            },
            {
                title: 'Settle Carriers',
                href: route('tenant.accounting.settle.carriers'),
            },
        ],
    },
    {
        title: 'Tools',
        icon: ToolCase,
        children: [
            {
                title: 'Importer',
                href: route('tenant.tools.importer'),
            },
            {
                title: 'Messaging Queue Manager',
                href: route('tenant.tools.messaging.queue.manager'),
            },
        ],
    },
    {
        title: 'Maintenance',
        icon: Hourglass,
        children: [
            {
                title: 'Purge Loads',
                href: route('tenant.maintenance.purge.loads'),
            },
        ],
    },
    {
        title: 'Customers',
        icon: IdCard,
        children: [
            {
                title: 'Customers',
                href: route('tenant.customers.contacts'),
            },
            {
                title: 'Customers Search',
                href: route('tenant.customers.search'),
            },
        ],
    },
    {
        title: 'Two Factor Authentication',
        href: route('tenant.2fa.index'),
        icon: LockKeyhole,
    },
    {
        title: 'Application Settings',
        children: [
            {
                title: 'Accessorial Types',
                href: route('tenant.application.settings.accessorial.types'),
            },
            {
                title: 'Assets',
                href: route('tenant.application.settings.assets'),
            },
            {
                title: 'Attachment Categories',
                href: route('tenant.application.settings.attachment.categories'),
            },
            {
                title: 'Auto Dispatch',
                href: route('tenant.application.settings.auto.dispatch'),
            },
            {
                title: 'Bill Freight Terms',
                href: route('tenant.application.settings.bill.freight.terms'),
            },
            {
                title: 'Billing Group',
                href: route('tenant.application.settings.billing.group'),
            },
            {
                title: 'Billing Terms',
                href: route('tenant.application.settings.billing.terms'),
            },
            {
                title: 'Carrier Commission Plans',
                href: route('tenant.application.settings.carrier.commission.plans'),
            },
            {
                title: 'Carrier Payment Zones',
                href: route('tenant.application.settings.carrier.payment.zones'),
            },
            {
                title: 'Carrier Types',
                href: route('tenant.application.settings.carrier.types'),
            },
            {
                title: 'Currency Types',
                href: route('tenant.application.settings.currency.types'),
            },
            {
                title: 'Customer Relation',
                href: route('tenant.application.settings.customer.relation'),
            },
            {
                title: 'Customer Types',
                href: route('tenant.application.settings.customer.types'),
            },
            {
                title: 'Deduction Types',
                href: route('tenant.application.settings.deduction.types'),
            },
            {
                title: 'Delivery Conditions',
                href: route('tenant.application.settings.delivery.conditions'),
            },
            {
                title: 'Dispatch Boards',
                href: route('tenant.application.settings.dispatch.boards'),
            },
            {
                title: 'Dispatch Zones',
                href: route('tenant.application.settings.dispatch.zones'),
            },
            {
                title: 'Distance Cache',
                href: route('tenant.application.settings.distance.cache'),
            },
            {
                title: 'Docks',
                href: route('tenant.application.settings.docks'),
            },
            {
                title: 'Fuel Surcharges Adjustments',
                href: route('tenant.application.settings.fuel.surcharges.adjustments'),
            },
            {
                title: 'Holidays',
                href: route('tenant.application.settings.holidays'),
            },
            {
                title: 'Packages',
                href: route('tenant.application.settings.packages'),
            },
            {
                title: 'Payment Types',
                href: route('tenant.application.settings.payment.types'),
            },
            {
                title: 'Price Plans',
                href: route('tenant.application.settings.price.plans'),
            },
            {
                title: 'Price Plan Charges Adjustments',
                href: route('tenant.application.settings.price.plan.charges.adjustments'),
            },
            {
                title: 'Price Plan Templates',
                href: route('tenant.application.settings.price.plan.templates'),
            },
            {
                title: 'Price Plan Zone Count',
                href: route('tenant.application.settings.price.plan.zone.count'),
            },
            {
                title: 'Sales Commission Plans',
                href: route('tenant.application.settings.sales.commission.plans'),
            },
            {
                title: 'Service Class',
                href: route('tenant.application.settings.service.class'),
            },
            {
                title: 'State/Provincial Taxes',
                href: route('tenant.application.settings.provincial.taxes'),
            },
            {
                title: 'Surcharges',
                href: route('tenant.application.settings.surcharges'),
            },
            {
                title: 'Taxes',
                href: route('tenant.application.settings.taxes'),
            },
            {
                title: 'UOM Types',
                href: route('tenant.application.settings.uom.types'),
            },
            {
                title: 'Vehicle Types',
                href: route('tenant.application.settings.vehicle.types'),
            },
            {
                title: 'Vendors',
                href: route('tenant.application.settings.vendors'),
            },
            {
                title: 'Vendors Expenses',
                href: route('tenant.application.settings.vendors.expenses'),
            },
            {
                title: 'Warehouse',
                href: route('tenant.application.settings.warehouse'),
            },
            {
                title: 'Zones',
                href: route('tenant.application.settings.zones'),
            },
            {
                title: 'Zone Counts',
                href: route('tenant.application.settings.zone.counts'),
            },
            {
                title: 'Zone Group',
                href: route('tenant.application.settings.zone.group'),
            },
        ],
        icon: Settings,
    },
];

export function TenantAppSidebar() {
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
