'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    Building2,
    LayoutDashboard,
    Wallet,
    Heart,
    Calendar,
    Megaphone,
    Package,
    Folder,
    Users,
    ScrollText,
    Settings,
    CreditCard,
    ChevronDown,
    LogOut,
    Menu,
    X,
    Bell,
} from 'lucide-react';
import { APP_NAME, DASHBOARD_NAV_ITEMS, SETTINGS_NAV_ITEMS } from '@/lib/constants';
import { getInitials } from '@/lib/utils';
import { handleSignOut } from '@/lib/actions';
import { User } from 'next-auth';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
    'layout-dashboard': <LayoutDashboard className="w-5 h-5" />,
    wallet: <Wallet className="w-5 h-5" />,
    heart: <Heart className="w-5 h-5" />,
    calendar: <Calendar className="w-5 h-5" />,
    megaphone: <Megaphone className="w-5 h-5" />,
    package: <Package className="w-5 h-5" />,
    folder: <Folder className="w-5 h-5" />,
    users: <Users className="w-5 h-5" />,
    'scroll-text': <ScrollText className="w-5 h-5" />,
    building: <Building2 className="w-5 h-5" />,
    'credit-card': <CreditCard className="w-5 h-5" />,
};

// Sidebar Component
function Sidebar({
    isOpen,
    onClose,
    user,
}: {
    isOpen: boolean;
    onClose: () => void;
    user: User | undefined;
}) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <aside
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-lg text-neutral-900">
                            {APP_NAME}
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 hover:bg-neutral-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tenant Selector */}
                <div className="p-4 border-b border-neutral-200">
                    <button className="w-full flex items-center gap-3 p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-neutral-900 truncate">Masjid Al-Ikhlas</p>
                            <p className="text-xs text-neutral-500 capitalize">basic</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {DASHBOARD_NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={isActive(item.href) ? 'sidebar-link-active' : 'sidebar-link'}
                            onClick={onClose}
                        >
                            {iconMap[item.icon] || <LayoutDashboard className="w-5 h-5" />}
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    {/* Settings Section */}
                    <div className="pt-4 mt-4 border-t border-neutral-200">
                        <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                            Pengaturan
                        </p>
                        {SETTINGS_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={isActive(item.href) ? 'sidebar-link-active' : 'sidebar-link'}
                                onClick={onClose}
                            >
                                {iconMap[item.icon] || <Settings className="w-5 h-5" />}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* User Menu */}
                <div className="p-4 border-t border-neutral-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-700 font-semibold text-sm">
                                {getInitials(user?.name || 'User')}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                        </div>
                        <form action={handleSignOut}>
                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-error-600 transition-colors">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Header Component
function Header({
    onMenuClick,
    user,
}: {
    onMenuClick: () => void;
    user: User | undefined;
}) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200 flex items-center px-4 lg:px-6">
            {/* Mobile Menu Button */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg mr-2"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Search (placeholder) */}
            <div className="flex-1">{/* Can add search here later */}</div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 hover:bg-neutral-100 rounded-lg relative"
                    >
                        <Bell className="w-5 h-5 text-neutral-600" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
                    </button>

                    {showNotifications && (
                        <div className="dropdown">
                            <div className="px-4 py-3 border-b border-neutral-200">
                                <p className="font-medium text-sm">Notifikasi</p>
                            </div>
                            <div className="py-2">
                                <p className="px-4 py-6 text-sm text-neutral-500 text-center">
                                    Tidak ada notifikasi baru
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar (mobile) */}
                <div className="lg:hidden w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold text-xs">
                        {getInitials(user?.name || 'User')}
                    </span>
                </div>
            </div>
        </header>
    );
}

// Dashboard Shell (Client Component)
export default function DashboardShell({
    children,
    user,
}: {
    children: React.ReactNode;
    user: User | undefined;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />

            {/* Main Content */}
            <div className="lg:pl-64">
                <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
                <main className="p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
