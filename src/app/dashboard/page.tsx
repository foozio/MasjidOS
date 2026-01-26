'use client'

import Link from 'next/link'
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Calendar,
    Heart,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Package
} from 'lucide-react'
import { getSummaryData, demoTransactions, demoCategories, demoDonations, demoEvents, demoTenant } from '@/lib/data'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'

// KPI Card Component
function KPICard({
    label,
    value,
    change,
    trend,
    icon: Icon,
    color
}: {
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down'
    icon: React.ElementType
    color: 'primary' | 'success' | 'warning' | 'error'
}) {
    const colorClasses = {
        primary: 'bg-primary-100 text-primary-600',
        success: 'bg-success-100 text-success-600',
        warning: 'bg-warning-100 text-warning-600',
        error: 'bg-error-100 text-error-600',
    }

    return (
        <div className="card p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">{label}</p>
                    <p className="text-2xl font-bold text-neutral-900">{value}</p>
                    {change && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-success-600' : 'text-error-600'}`}>
                            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{change}</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

// Recent Transactions Component
function RecentTransactions() {
    const recentTx = demoTransactions.slice(0, 5)

    return (
        <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-900">Transaksi Terbaru</h3>
                <Link href="/dashboard/keuangan" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Lihat semua
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="divide-y divide-neutral-100">
                {recentTx.map((tx) => {
                    const category = demoCategories.find(c => c.id === tx.categoryId)
                    return (
                        <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-success-100' : 'bg-error-100'}`}>
                                {tx.type === 'income' ? (
                                    <ArrowUpRight className="w-5 h-5 text-success-600" />
                                ) : (
                                    <ArrowDownRight className="w-5 h-5 text-error-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 truncate">{tx.description}</p>
                                <p className="text-xs text-neutral-500">{category?.name} • {formatRelativeTime(tx.createdAt)}</p>
                            </div>
                            <div className={`text-sm font-semibold ${tx.type === 'income' ? 'text-success-600' : 'text-error-600'}`}>
                                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Recent Donations Component
function RecentDonations() {
    const recentDonations = demoDonations.slice(0, 4)

    return (
        <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-900">Donasi Terbaru</h3>
                <Link href="/dashboard/donasi" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Lihat semua
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="divide-y divide-neutral-100">
                {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900">
                                {donation.isAnonymous ? 'Hamba Allah' : donation.donorName}
                            </p>
                            <p className="text-xs text-neutral-500">{formatRelativeTime(donation.createdAt)}</p>
                        </div>
                        <div className="text-sm font-semibold text-primary-600">
                            +{formatCurrency(donation.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Upcoming Events Component
function UpcomingEvents() {
    const upcoming = demoEvents
        .filter(e => e.startDate > new Date())
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .slice(0, 3)

    return (
        <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-900">Kegiatan Mendatang</h3>
                <Link href="/dashboard/kegiatan" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Lihat semua
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="divide-y divide-neutral-100">
                {upcoming.length === 0 ? (
                    <div className="p-8 text-center">
                        <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                        <p className="text-neutral-500 text-sm">Tidak ada kegiatan terjadwal</p>
                    </div>
                ) : (
                    upcoming.map((event) => (
                        <div key={event.id} className="flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-accent-100 flex flex-col items-center justify-center">
                                <span className="text-xs font-semibold text-accent-700">
                                    {event.startDate.toLocaleDateString('id-ID', { day: 'numeric' })}
                                </span>
                                <span className="text-[10px] text-accent-600 uppercase">
                                    {event.startDate.toLocaleDateString('id-ID', { month: 'short' })}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900">{event.title}</p>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                    {event.startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} • {event.location}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

// Quick Actions Component
function QuickActions() {
    const actions = [
        { label: 'Tambah Transaksi', href: '/dashboard/keuangan?add=true', icon: Wallet, color: 'bg-primary-600' },
        { label: 'Buat Pengumuman', href: '/dashboard/pengumuman?add=true', icon: Calendar, color: 'bg-accent-500' },
        { label: 'Undang Anggota', href: '/dashboard/anggota?invite=true', icon: Users, color: 'bg-success-600' },
    ]

    return (
        <div className="card p-4">
            <h3 className="font-semibold text-neutral-900 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-3 gap-3">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                        <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                            <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-neutral-600 text-center">{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

// Main Overview Page
export default function DashboardPage() {
    const summary = getSummaryData()

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500 mt-1">Selamat datang kembali! Berikut ringkasan {demoTenant.name}.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    label="Saldo Kas"
                    value={formatCurrency(summary.balance)}
                    change="+12.5% dari bulan lalu"
                    trend="up"
                    icon={Wallet}
                    color="primary"
                />
                <KPICard
                    label="Pemasukan Bulan Ini"
                    value={formatCurrency(summary.totalIncome)}
                    change="+8.2%"
                    trend="up"
                    icon={TrendingUp}
                    color="success"
                />
                <KPICard
                    label="Donasi Diterima"
                    value={formatCurrency(summary.totalDonations)}
                    icon={Heart}
                    color="warning"
                />
                <KPICard
                    label="Kegiatan Terjadwal"
                    value={summary.upcomingEvents.toString()}
                    icon={Calendar}
                    color="primary"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Transactions & Actions */}
                <div className="lg:col-span-2 space-y-6">
                    <RecentTransactions />
                </div>

                {/* Right Column - Donations, Events, Quick Actions */}
                <div className="space-y-6">
                    <QuickActions />
                    <RecentDonations />
                    <UpcomingEvents />
                </div>
            </div>
        </div>
    )
}
