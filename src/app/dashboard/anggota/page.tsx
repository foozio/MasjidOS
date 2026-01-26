'use client'

import { useState } from 'react'
import {
    Users,
    Plus,
    Search,
    MoreVertical,
    X,
    Mail,
    Shield,
    UserPlus,
    Check,
    Clock
} from 'lucide-react'
import { demoMembers } from '@/lib/data'
import { formatDate, getInitials, cn } from '@/lib/utils'
import { SYSTEM_ROLES } from '@/lib/constants'

// Role Badge Colors
const roleColors: Record<string, string> = {
    admin: 'bg-primary-100 text-primary-700',
    bendahara: 'bg-success-100 text-success-700',
    sekretaris: 'bg-accent-100 text-accent-700',
    pengurus: 'bg-neutral-100 text-neutral-700',
    viewer: 'bg-neutral-100 text-neutral-500',
}

// Member Card
function MemberCard({ member }: { member: typeof demoMembers[0] }) {
    return (
        <div className="card p-4 hover:shadow-card-hover transition-shadow">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-semibold">
                        {getInitials(member.user.fullName)}
                    </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-neutral-900">{member.user.fullName}</h3>
                        {member.status === 'invited' && (
                            <span className="badge-warning flex items-center gap-1 text-xs">
                                <Clock className="w-3 h-3" />
                                Pending
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-neutral-500 truncate">{member.user.email}</p>
                </div>

                {/* Role */}
                <span className={cn('badge', roleColors[member.role.id])}>
                    {member.role.name}
                </span>

                {/* Actions */}
                <button className="p-2 hover:bg-neutral-100 rounded-lg">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>
            </div>
        </div>
    )
}

// Invite Modal
function InviteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        email: '',
        role: 'pengurus',
    })

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Undang Anggota</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input pl-10"
                                placeholder="email@pengurus.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Peran *</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="input"
                            required
                        >
                            {SYSTEM_ROLES.filter(r => r.id !== 'admin').map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name} - {role.description}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Roles Description */}
                    <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-medium text-neutral-700 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Deskripsi Peran
                        </p>
                        <ul className="text-xs text-neutral-600 space-y-1">
                            <li><strong>Bendahara:</strong> Kelola keuangan dan donasi</li>
                            <li><strong>Sekretaris:</strong> Kelola kegiatan dan pengumuman</li>
                            <li><strong>Pengurus:</strong> Lihat dan edit terbatas</li>
                            <li><strong>Viewer:</strong> Hanya bisa melihat</li>
                        </ul>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Batal
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            <UserPlus className="w-4 h-4" />
                            Kirim Undangan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onInvite }: { onInvite: () => void }) {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Anggota Lain</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Undang pengurus lain untuk membantu mengelola masjid bersama-sama.
            </p>
            <button onClick={onInvite} className="btn-primary">
                <UserPlus className="w-4 h-4" />
                Undang Anggota
            </button>
        </div>
    )
}

// Main Page
export default function AnggotaPage() {
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = demoMembers.filter(m => {
        if (searchQuery && !m.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !m.user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })

    // Stats
    const activeCount = demoMembers.filter(m => m.status === 'active').length
    const pendingCount = demoMembers.filter(m => m.status === 'invited').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Anggota</h1>
                    <p className="text-neutral-500 mt-1">Kelola tim pengurus masjid</p>
                </div>
                <button onClick={() => setShowInviteModal(true)} className="btn-primary">
                    <UserPlus className="w-4 h-4" />
                    Undang Anggota
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Anggota</p>
                    <p className="text-xl font-bold text-neutral-900 mt-1">{demoMembers.length} orang</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Anggota Aktif</p>
                    <p className="text-xl font-bold text-success-600 mt-1">{activeCount} orang</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Undangan Pending</p>
                    <p className="text-xl font-bold text-warning-600 mt-1">{pendingCount} orang</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari anggota..."
                    className="input pl-10"
                />
            </div>

            {/* Member List */}
            {filtered.length === 0 ? (
                <EmptyState onInvite={() => setShowInviteModal(true)} />
            ) : (
                <div className="grid gap-3">
                    {filtered.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </div>
            )}

            {/* Invite Modal */}
            <InviteModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
        </div>
    )
}
