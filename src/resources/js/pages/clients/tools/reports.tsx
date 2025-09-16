import PageNav from '@/components/PageNav';
import TopSearch from '@/components/TopSearch';
import ClientLayout from '@/layouts/client/client-app-layout';
import { Head } from '@inertiajs/react';
import { FileText, Folder } from 'lucide-react';
import { useState } from 'react';

export default function Index() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <ClientLayout>
            <Head title="Reports" />
            {/* top bar */}
            <div>
                <TopSearch />
                <div className="mt-3">
                    <PageNav>
                        <p className="py-2 text-center font-bold text-white">Report Viewer</p>
                    </PageNav>
                </div>
                <div className="mt-5">
                    {/* Responsive Grid: On mobile, sidebar on top, main below; on md+, sidebar left, main right */}
                    <div className="bg-background flex h-[calc(100vh-120px)] flex-col md:grid md:grid-cols-[300px_1fr]">
                        {/* Sidebar toggle button, visible on mobile */}
                        <div className="flex justify-between border-b bg-slate-50 px-4 py-2 md:hidden dark:bg-zinc-950">
                            <span className="text-base font-semibold">Reports</span>
                            <button
                                onClick={() => setSidebarOpen((s) => !s)}
                                className="rounded p-2 hover:bg-slate-200 dark:hover:bg-zinc-800"
                                aria-label="Toggle sidebar"
                            >
                                <Folder className="h-5 w-5" />
                            </button>
                        </div>
                        {/* Left Sidebar */}
                        <aside
                            className={`w-full border-r bg-slate-50 transition-all duration-300 md:w-[300px] dark:bg-zinc-950 ${sidebarOpen ? 'absolute top-[147px] left-0 z-30 block shadow-lg md:relative md:z-auto' : 'hidden md:relative md:z-auto md:block'} max-h-[60vh] overflow-y-auto md:max-h-none`}
                        >
                            <div className="p-4">
                                {/* Hide close button on desktop */}
                                <div className="mb-4 flex justify-end md:hidden">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="rounded p-1 hover:bg-slate-200 dark:hover:bg-zinc-800"
                                        aria-label="Close sidebar"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <h2 className="mb-4 text-lg font-semibold tracking-tight">Select a report to display</h2>
                                {/* Tree View Section */}
                                <div className="space-y-1">
                                    {/* Root item */}
                                    <div className="flex items-center space-x-2 px-2 py-1.5">
                                        <Folder className="h-4 w-4 text-slate-600" />
                                        <span className="text-sm font-medium">Reports</span>
                                    </div>
                                    {/* Child items (indented) */}
                                    <div className="pl-6">
                                        <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-200 dark:hover:bg-zinc-500">
                                            <FileText className="h-4 w-4 text-slate-600" />
                                            <span>Carrier COS Manifest CLIENT</span>
                                        </div>
                                        <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-200 dark:hover:bg-zinc-500">
                                            <FileText className="h-4 w-4 text-slate-600" />
                                            <span>Carrier Manifest CLIENT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="min-h-[250px] flex-1 overflow-auto bg-slate-100 p-4 dark:bg-zinc-950">
                            {/* The rest of your page content would go here */}
                            <p className="py-10 text-center text-neutral-500">Please select a report from the sidebar.</p>
                        </main>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
