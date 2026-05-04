import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
            <Sidebar />
            <main className="ml-[260px] flex-1 p-8 min-h-screen bg-slate-50">
                {children}
            </main>
        </div>
    );
}
