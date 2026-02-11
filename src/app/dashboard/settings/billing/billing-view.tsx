'use client'

import { useState } from 'react'
import { Check, CreditCard, QrCode, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/api-utils'

interface BillingViewProps {
    tenant: any
    plans: any[]
}

export function BillingView({ tenant, plans }: BillingViewProps) {
    const [loading, setLoading] = useState<string | null>(null)
    const [qrisData, setQrisData] = useState<{ qr_url: string, expiry_time: string } | null>(null)

    const handleUpgrade = async (planId: string) => {
        if (planId === 'free') return
        
        setLoading(planId)
        try {
            const response = await fetch('/api/billing/qris', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId })
            })
            
            const data = await response.json()
            if (data.qr_url) {
                setQrisData(data)
            } else {
                alert('Gagal membuat pembayaran. Silakan coba lagi.')
            }
        } catch (error) {
            console.error('Billing error:', error)
            alert('Terjadi kesalahan sistem.')
        } finally {
            setLoading(null)
        }
    }

    const currentPlan = plans.find(p => p.id === (tenant.plan || 'free'))

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                {/* Current Plan Summary */}
                <div className="card p-6 border-primary-100 bg-primary-50/30">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-primary-700 mb-1">Paket Saat Ini</p>
                            <h2 className="text-2xl font-bold text-neutral-900 capitalize">{currentPlan?.name}</h2>
                            <p className="text-neutral-500 mt-1">{currentPlan?.description}</p>
                        </div>
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-primary-100">
                            <Zap className="w-6 h-6 text-primary-600" />
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {plans.filter(p => p.id !== 'free').map((plan) => {
                        const isCurrent = tenant.plan === plan.id
                        return (
                            <div 
                                key={plan.id} 
                                className={cn(
                                    "card p-6 transition-all",
                                    isCurrent ? "ring-2 ring-primary-500" : "hover:border-primary-200"
                                )}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-neutral-900">{plan.name}</h3>
                                    {isCurrent && (
                                        <span className="badge-primary text-xs">Aktif</span>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-neutral-900">{formatCurrency(plan.price)}</span>
                                    <span className="text-neutral-500 text-sm">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                            <Check className="w-4 h-4 text-success-500 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleUpgrade(plan.id)}
                                    disabled={isCurrent || !!loading}
                                    className={cn(
                                        "btn w-full flex items-center justify-center gap-2",
                                        isCurrent ? "btn-secondary" : "btn-primary"
                                    )}
                                >
                                    {loading === plan.id ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : isCurrent ? (
                                        'Paket Aktif'
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4" />
                                            Upgrade Sekarang
                                        </>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="space-y-6">
                {/* QRIS Display */}
                {qrisData && (
                    <div className="card p-6 text-center animate-fade-in">
                        <h3 className="font-bold text-neutral-900 mb-2">Bayar dengan QRIS</h3>
                        <p className="text-sm text-neutral-500 mb-6">Scan kode QR di bawah menggunakan GoPay, OVO, Dana, atau Mobile Banking.</p>
                        
                        <div className="bg-white p-4 rounded-2xl border border-neutral-100 inline-block mb-6">
                            <img src={qrisData.qr_url} alt="QRIS Code" className="w-48 h-48 mx-auto" />
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-error-600 bg-error-50 py-2 px-4 rounded-xl">
                            <span className="animate-pulse">●</span>
                            Berlaku hingga: {new Date(qrisData.expiry_time).toLocaleTimeString()}
                        </div>

                        <p className="text-xs text-neutral-400 mt-6">
                            Setelah pembayaran berhasil, paket Anda akan otomatis aktif.
                        </p>
                    </div>
                )}

                {/* Billing Info */}
                <div className="card p-6 bg-neutral-50 border-neutral-200">
                    <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <QrCode className="w-4 h-4" />
                        Metode Pembayaran
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                        Saat ini kami mendukung pembayaran instan via QRIS (Go Merchant). 
                        Semua transaksi diproses secara aman.
                    </p>
                </div>
            </div>
        </div>
    )
}
