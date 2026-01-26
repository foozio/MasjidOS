'use client'

import { useState } from 'react'
import {
    Building2,
    Save,
    Upload,
    MapPin,
    Phone,
    Globe,
    Mail
} from 'lucide-react'
import { demoTenant } from '@/lib/data'

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        name: demoTenant.name,
        address: demoTenant.address || '',
        phone: demoTenant.phone || '',
        email: '',
        website: '',
        donationPublicEnabled: demoTenant.settings.donationPublicEnabled,
    })
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        // Simulate save
        setTimeout(() => {
            setIsSaving(false)
            alert('Perubahan tersimpan!')
        }, 1000)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Profil Masjid</h1>
                <p className="text-neutral-500 mt-1">Kelola informasi dan pengaturan masjid</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="card">
                        <div className="p-6 border-b border-neutral-100">
                            <h2 className="font-semibold text-neutral-900">Informasi Dasar</h2>
                            <p className="text-sm text-neutral-500 mt-1">Informasi ini akan ditampilkan di halaman publik</p>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Logo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Logo Masjid</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center">
                                        <Building2 className="w-10 h-10 text-primary-600" />
                                    </div>
                                    <div>
                                        <button type="button" className="btn-secondary btn-sm">
                                            <Upload className="w-4 h-4" />
                                            Ganti Logo
                                        </button>
                                        <p className="text-xs text-neutral-500 mt-2">PNG, JPG hingga 2MB</p>
                                    </div>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nama Masjid *</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Alamat</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="input pl-10 min-h-[80px] resize-none"
                                    />
                                </div>
                            </div>

                            {/* Phone & Email */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Telepon</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input pl-10"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="input pl-10"
                                        placeholder="https://masjid-anda.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-neutral-100 flex justify-end">
                            <button type="submit" disabled={isSaving} className="btn-primary">
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Simpan Perubahan
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    {/* Public Settings */}
                    <div className="card p-6">
                        <h3 className="font-semibold text-neutral-900 mb-4">Pengaturan Publik</h3>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.donationPublicEnabled}
                                    onChange={(e) => setFormData({ ...formData, donationPublicEnabled: e.target.checked })}
                                    className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                                />
                                <div>
                                    <p className="font-medium text-sm text-neutral-900">Donasi Publik</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">Aktifkan halaman donasi publik untuk jamaah</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Current Plan */}
                    <div className="card p-6">
                        <h3 className="font-semibold text-neutral-900 mb-4">Paket Saat Ini</h3>
                        <div className="bg-primary-50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-primary-900 capitalize">{demoTenant.plan}</span>
                                <span className="badge-primary">Aktif</span>
                            </div>
                            <p className="text-sm text-primary-700 mt-2">5 Admin, transaksi unlimited</p>
                        </div>
                        <button className="btn-secondary w-full mt-4">
                            Upgrade Paket
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="card p-6 border-error-200">
                        <h3 className="font-semibold text-error-600 mb-2">Zona Bahaya</h3>
                        <p className="text-sm text-neutral-600 mb-4">
                            Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan.
                        </p>
                        <button className="btn-danger btn-sm w-full">
                            Hapus Masjid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
