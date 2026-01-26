'use client'

import { useState } from 'react'
import {
    Package,
    Plus,
    Search,
    MoreVertical,
    X,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    XCircle,
    MapPin
} from 'lucide-react'
import { demoAssets } from '@/lib/data'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { ASSET_CONDITIONS } from '@/lib/constants'

// Condition Badge
function ConditionBadge({ condition }: { condition: string }) {
    const conditionConfig = ASSET_CONDITIONS.find(c => c.value === condition) || ASSET_CONDITIONS[0]
    const icons: Record<string, React.ReactNode> = {
        excellent: <CheckCircle2 className="w-3.5 h-3.5" />,
        good: <CheckCircle2 className="w-3.5 h-3.5" />,
        fair: <AlertTriangle className="w-3.5 h-3.5" />,
        poor: <XCircle className="w-3.5 h-3.5" />,
    }
    const colors: Record<string, string> = {
        excellent: 'bg-success-100 text-success-700',
        good: 'bg-primary-100 text-primary-700',
        fair: 'bg-warning-100 text-warning-700',
        poor: 'bg-error-100 text-error-700',
    }

    return (
        <span className={cn('badge flex items-center gap-1', colors[condition])}>
            {icons[condition]}
            {conditionConfig.label}
        </span>
    )
}

// Asset Card
function AssetCard({ asset }: { asset: typeof demoAssets[0] }) {
    return (
        <div className="card p-4 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-neutral-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-900">{asset.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="badge-neutral">{asset.category}</span>
                            <ConditionBadge condition={asset.condition} />
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {asset.location}
                            </span>
                            {asset.value && (
                                <span>Nilai: {formatCurrency(asset.value)}</span>
                            )}
                        </div>
                        {asset.notes && (
                            <p className="text-sm text-neutral-600 mt-2">{asset.notes}</p>
                        )}
                    </div>
                </div>
                <button className="p-1 hover:bg-neutral-100 rounded-lg flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Inventaris</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Catat aset dan peralatan masjid untuk pemantauan kondisi dan perawatan.
            </p>
            <button onClick={onAdd} className="btn-primary">
                <Plus className="w-4 h-4" />
                Tambah Aset Pertama
            </button>
        </div>
    )
}

// Add Asset Modal
function AddAssetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        condition: 'good',
        location: '',
        value: '',
        notes: '',
    })

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Tambah Aset</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nama Aset *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input"
                            placeholder="Contoh: AC Split 2 PK"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kategori *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="input"
                                required
                            >
                                <option value="">Pilih kategori</option>
                                <option value="Elektronik">Elektronik</option>
                                <option value="Furnitur">Furnitur</option>
                                <option value="Perlengkapan">Perlengkapan</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kondisi *</label>
                            <select
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                className="input"
                                required
                            >
                                {ASSET_CONDITIONS.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Lokasi</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="input"
                            placeholder="Contoh: Ruang Utama"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nilai/Harga</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">Rp</span>
                            <input
                                type="number"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="input pl-10"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Catatan</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="input min-h-[80px] resize-none"
                            placeholder="Catatan tambahan..."
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Batal
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Main Page
export default function InventarisPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [conditionFilter, setConditionFilter] = useState<string>('all')

    const filtered = demoAssets.filter(a => {
        if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (conditionFilter !== 'all' && a.condition !== conditionFilter) return false
        return true
    })

    // Stats
    const totalValue = demoAssets.reduce((sum, a) => sum + (a.value || 0), 0)
    const needsAttention = demoAssets.filter(a => a.condition === 'poor' || a.condition === 'fair').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Inventaris</h1>
                    <p className="text-neutral-500 mt-1">Kelola aset dan peralatan masjid</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Tambah Aset
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Aset</p>
                    <p className="text-xl font-bold text-neutral-900 mt-1">{demoAssets.length} item</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Nilai</p>
                    <p className="text-xl font-bold text-primary-600 mt-1">{formatCurrency(totalValue)}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Perlu Perhatian</p>
                    <p className="text-xl font-bold text-warning-600 mt-1">{needsAttention} item</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari aset..."
                        className="input pl-10"
                    />
                </div>
                <select
                    value={conditionFilter}
                    onChange={(e) => setConditionFilter(e.target.value)}
                    className="input w-auto"
                >
                    <option value="all">Semua Kondisi</option>
                    {ASSET_CONDITIONS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            {/* Asset List */}
            {filtered.length === 0 ? (
                <EmptyState onAdd={() => setShowAddModal(true)} />
            ) : (
                <div className="grid gap-4">
                    {filtered.map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
            )}

            {/* Add Modal */}
            <AddAssetModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        </div>
    )
}
