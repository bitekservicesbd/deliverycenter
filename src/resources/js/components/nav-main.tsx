import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.children && item.children.length > 0 ? (
                        <NavItemWithChildren key={item.title} item={item} currentUrl={page.url} />
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <Link href={item.href!} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavItemWithChildren({ item, currentUrl }: { item: NavItem; currentUrl: string }) {
    const storageKey = `sidebar-${item.title}-open`;
    const hasActiveChild = item.children?.some((child) => child.href === currentUrl);

    const [open, setOpen] = useState(() => {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : hasActiveChild;
    });

    const handleToggle = () => {
        const newOpen = !open;
        setOpen(newOpen);
        localStorage.setItem(storageKey, JSON.stringify(newOpen));
    };

    useEffect(() => {
        if (hasActiveChild && !open) {
            setOpen(true);
            localStorage.setItem(storageKey, JSON.stringify(true));
        }
    }, [hasActiveChild, open, storageKey]);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={hasActiveChild} tooltip={{ children: item.title }} onClick={handleToggle}>
                <button className="flex w-full items-center gap-2">
                    {item.icon && <item.icon />}
                    <span className="flex-1 text-left">{item.title}</span>
                    {open ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
                </button>
            </SidebarMenuButton>

            <ul
                className={`mt-1 overflow-x-hidden overflow-y-scroll pl-6 transition-all duration-300 ease-in-out ${open ? 'opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {item.children?.map((child) => (
                    <SidebarMenuItem key={child.title}>
                        <SidebarMenuButton asChild isActive={child.href === currentUrl} tooltip={{ children: child.title }}>
                            <Link href={child.href!} prefetch>
                                <span className="text-primary text-xs font-bold">-</span>
                                <span>{child.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </ul>
        </SidebarMenuItem>
    );
}
