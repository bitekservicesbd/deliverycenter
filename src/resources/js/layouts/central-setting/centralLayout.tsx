import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function CentralLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }
    const currentPath = window.location.pathname;

    const sidebarNavItems: NavItem[] = [
        {
            title: 'General',
            href: route('central.settings.general'),
            icon: null,
        },
        {
            title: 'Mail Settings',
            href: route('central.settings.mail'),
            icon: null,
        },
        {
            title: 'Recaptcha Settings',
            href: route('central.settings.recaptcha'),
            icon: null,
        },
        {
            title: 'AWS Settings',
            href: route('central.settings.aws'),
            icon: null,
        },
        {
            title: 'Payment Settings',
            href: route('central.settings.payment'),
            icon: null,
        },
        {
            title: 'Two Factor Authentication',
            href: route('central.settings.2fa.index'),
            icon: null,
        },
    ];

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => {
                            const itemPath = item.href.startsWith('http') ? new URL(item.href).pathname : item.href;

                            return (
                                <Button
                                    key={`${item.href}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === itemPath,
                                    })}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
