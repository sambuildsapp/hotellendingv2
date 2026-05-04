'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        href: '/dashboard', label: 'Dashboard', icon: (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 13h6M9 17h4" />
            </svg>
        )
    },
    {
        href: '/dashboard/loans', label: 'Loans', icon: (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    },
    {
        href: '/dashboard/hotels', label: 'Hotels', icon: (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 3v15" />
                <path d="M9 9h1M9 13h1M9 17h1" />
            </svg>
        )
    },
    {
        href: '/dashboard/market', label: 'Market Data', icon: (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8 l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        )
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-slate-200 p-6 flex flex-col z-50">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white font-sans from-indigo-500 via-purple-500 to-fuchsia-500 bg-gradient-to-br">HL</div>
                <span className="font-semibold text-base text-slate-900">Hotel Lending</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-all ${isActive(item.href) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                    v1.0.0 • Phase 4 Complete
                </div>
            </div>
        </aside>
    );
}
