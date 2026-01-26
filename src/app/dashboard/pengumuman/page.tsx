'use client'

import { useState } from 'react'
import {
    Megaphone,
    Plus,
    Globe,
    Lock,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    X,
    Calendar
} from 'lucide-react'
import { demoAnnouncements } from '@/lib/data'
import { formatDate, formatRelativeTime, cn } from '@/lib/utils'

// Announcement Card
function AnnouncementCard({ announcement }: { announcement: typeof demoAnnouncements[0] }) {
    return (
        <div className="card p-5 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        {announcement.isPublic ? (
                            <span className="badge-success flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Publik
                            </span>
                        ) : (
                            <span className="badge-neutral flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Internal
                            </span>
                        )}
                        <span className="text-xs text-neutral-500">
                            {formatRelativeTime(announcement.createdAt)}
                        </span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{announcement.title}</h3>
                    <p className="text-sm text-neutral-600 line-clamp-3 whitespace-pre-line">
                        {announcement.content}
                    </p>
                </div>
                <button className="p-1 hover:bg-neutral-100 rounded-lg flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>
            </div>
        </div>
    )
}

// Add Announcement Modal
function AddAnnouncementModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        isPublic: true,
    })

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Buat Pengumuman</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Judul *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input"
                            placeholder="Contoh: Jadwal Imam Sholat Jumat"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Isi Pengumuman *</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="input min-h-[200px] resize-none"
                            placeholder="Tulis isi pengumuman..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Visibilitas</label>
                        <div className="flex gap-3">
                            <label className={cn(
                                'flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                                formData.isPublic ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:bg-neutral-50'
                            )}>
                                <input
                                    type="radio"
                                    checked={formData.isPublic}
                                    onChange={() => setFormData({ ...formData, isPublic: true })}
                                    className="sr-only"
                                />
                                <Globe className={cn('w-5 h-5', formData.isPublic ? 'text-primary-600' : 'text-neutral-400')} />
                                <div>
                                    <p className="font-medium text-sm">Publik</p>
                                    <p className="text-xs text-neutral-500">Tampil di halaman publik</p>
                                </div>
                            </label>
                            <label className={cn(
                                'flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                                !formData.isPublic ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:bg-neutral-50'
                            )}>
                                <input
                                    type="radio"
                                    checked={!formData.isPublic}
                                    onChange={() => setFormData({ ...formData, isPublic: false })}
                                    className="sr-only"
                                />
                                <Lock className={cn('w-5 h-5', !formData.isPublic ? 'text-primary-600' : 'text-neutral-400')} />
                                <div>
                                    <p className="font-medium text-sm">Internal</p>
                                    <p className="text-xs text-neutral-500">Hanya pengurus</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Batal
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            Publikasikan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Pengumuman</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Buat pengumuman untuk jadwal imam, kegiatan, atau informasi penting lainnya.
            </p>
            <button onClick={onAdd} className="btn-primary">
                <Plus className="w-4 h-4" />
                Buat Pengumuman Pertama
            </button>
        </div>
    )
}

// Main Page
export default function PengumumanPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [filter, setFilter] = useState<'all' | 'public' | 'internal'>('all')

    const filtered = demoAnnouncements.filter(a => {
        if (filter === 'public') return a.isPublic
        if (filter === 'internal') return !a.isPublic
        return true
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Pengumuman</h1>
                    <p className="text-neutral-500 mt-1">Kelola pengumuman untuk jamaah dan pengurus</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Buat Pengumuman
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['all', 'public', 'internal'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                            filter === f
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        )}
                    >
                        {f === 'all' ? 'Semua' : f === 'public' ? 'Publik' : 'Internal'}
                    </button>
                ))}
            </div>

            {/* Announcements List */}
            {filtered.length === 0 ? (
                <EmptyState onAdd={() => setShowAddModal(true)} />
            ) : (
                <div className="grid gap-4">
                    {filtered.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))}
                </div>
            )}

            {/* Add Modal */}
            <AddAnnouncementModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        </div>
    )
}
