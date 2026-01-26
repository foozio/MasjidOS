'use client'

import { useState } from 'react'
import {
    Heart,
    Share2,
    Copy,
    Check,
    ExternalLink,
    Search,
    Download,
    User,
    MessageCircle
} from 'lucide-react'
import { demoDonations, demoTenant } from '@/lib/data'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'

// Donation Link Card
function DonationLinkCard() {
    const [copied, setCopied] = useState(false)
    const donationLink = `https://masjidos.com/donasi/${demoTenant.slug}`

    const handleCopy = () => {
        navigator.clipboard.writeText(donationLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100/50">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">Link Donasi Publik</h3>
                    <p className="text-sm text-neutral-600 mb-4">
                        Bagikan link ini agar jamaah dan masyarakat dapat berdonasi langsung ke masjid.
                    </p>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-white rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 truncate">
                            {donationLink}
                        </div>
                        <button onClick={handleCopy} className="btn-secondary">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Tersalin!' : 'Salin'}
                        </button>
                        <button className="btn-primary">
                            <ExternalLink className="w-4 h-4" />
                            Buka
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Stats Cards
function StatsCards() {
    const totalDonations = demoDonations.reduce((sum, d) => sum + d.amount, 0)
    const thisMonth = demoDonations.filter(d => {
        const now = new Date()
        return d.createdAt.getMonth() === now.getMonth() && d.createdAt.getFullYear() === now.getFullYear()
    })
    const thisMonthTotal = thisMonth.reduce((sum, d) => sum + d.amount, 0)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-4">
                <p className="text-sm text-neutral-500">Total Donasi</p>
                <p className="text-xl font-bold text-neutral-900 mt-1">{formatCurrency(totalDonations)}</p>
            </div>
            <div className="card p-4">
                <p className="text-sm text-neutral-500">Bulan Ini</p>
                <p className="text-xl font-bold text-primary-600 mt-1">{formatCurrency(thisMonthTotal)}</p>
            </div>
            <div className="card p-4">
                <p className="text-sm text-neutral-500">Jumlah Donatur</p>
                <p className="text-xl font-bold text-neutral-900 mt-1">{demoDonations.length}</p>
            </div>
        </div>
    )
}

// Donation List
function DonationList({ searchQuery }: { searchQuery: string }) {
    const filtered = demoDonations.filter(d => {
        if (!searchQuery) return true
        const name = d.isAnonymous ? 'Hamba Allah' : d.donorName
        return name?.toLowerCase().includes(searchQuery.toLowerCase())
    })

    if (filtered.length === 0) {
        return (
            <div className="card p-12 text-center">
                <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Donasi</h3>
                <p className="text-sm text-neutral-500 mb-4">
                    Bagikan link donasi publik untuk mulai menerima donasi online.
                </p>
                <button className="btn-primary">
                    <Share2 className="w-4 h-4" />
                    Bagikan Link Donasi
                </button>
            </div>
        )
    }

    return (
        <div className="card overflow-hidden">
            <div className="divide-y divide-neutral-100">
                {filtered.map((donation) => (
                    <div key={donation.id} className="p-4 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                {donation.isAnonymous ? (
                                    <Heart className="w-5 h-5 text-primary-600" />
                                ) : (
                                    <User className="w-5 h-5 text-primary-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-neutral-900">
                                            {donation.isAnonymous ? 'Hamba Allah' : donation.donorName}
                                            {donation.isAnonymous && (
                                                <span className="ml-2 text-xs text-neutral-500">(Anonim)</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            {formatDate(donation.createdAt)} • {formatRelativeTime(donation.createdAt)}
                                        </p>
                                    </div>
                                    <p className="text-lg font-bold text-primary-600">
                                        {formatCurrency(donation.amount)}
                                    </p>
                                </div>
                                {donation.message && (
                                    <div className="mt-2 flex items-start gap-2 text-sm text-neutral-600 bg-neutral-50 rounded-lg p-2">
                                        <MessageCircle className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                                        <p>"{donation.message}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Main Donasi Page
export default function DonasiPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Donasi</h1>
                    <p className="text-neutral-500 mt-1">Kelola donasi dan link donasi publik</p>
                </div>
                <button className="btn-secondary">
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>

            {/* Donation Link */}
            <DonationLinkCard />

            {/* Stats */}
            <StatsCards />

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari donatur..."
                    className="input pl-10"
                />
            </div>

            {/* Donation List */}
            <DonationList searchQuery={searchQuery} />
        </div>
    )
}
