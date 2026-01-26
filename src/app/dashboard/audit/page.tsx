'use client'

import { useState } from 'react'
import {
    ScrollText,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    Plus,
    Edit,
    Trash2,
    User
} from 'lucide-react'
import { demoAuditLogs, demoMembers } from '@/lib/data'
import { formatDateTime, cn } from '@/lib/utils'

// Action Badge
function ActionBadge({ action }: { action: 'create' | 'update' | 'delete' }) {
    const config = {
        create: { label: 'Buat', icon: Plus, color: 'bg-success-100 text-success-700' },
        update: { label: 'Edit', icon: Edit, color: 'bg-primary-100 text-primary-700' },
        delete: { label: 'Hapus', icon: Trash2, color: 'bg-error-100 text-error-700' },
    }
    const { label, icon: Icon, color } = config[action]

    return (
        <span className={cn('badge flex items-center gap-1', color)}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    )
}

// Entity Type Label
const entityLabels: Record<string, string> = {
    transaction: 'Transaksi',
    announcement: 'Pengumuman',
    event: 'Kegiatan',
    document: 'Dokumen',
    asset: 'Aset',
    user: 'Pengguna',
}

// Log Entry
function LogEntry({ log, isExpanded, onToggle }: {
    log: typeof demoAuditLogs[0]
    isExpanded: boolean
    onToggle: () => void
}) {
    const user = demoMembers.find(m => m.userId === log.userId)
    const entityLabel = entityLabels[log.entityType] || log.entityType

    return (
        <div className="border-b border-neutral-100 last:border-0">
            <button
                onClick={onToggle}
                className="w-full p-4 text-left hover:bg-neutral-50 transition-colors"
            >
                <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        {user ? (
                            <span className="text-neutral-600 font-medium text-sm">
                                {user.user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                        ) : (
                            <User className="w-5 h-5 text-neutral-400" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-neutral-900">
                                {user?.user.fullName || 'Unknown User'}
                            </span>
                            <ActionBadge action={log.action} />
                            <span className="badge-neutral">{entityLabel}</span>
                        </div>
                        <p className="text-sm text-neutral-500 mt-1">
                            {formatDateTime(log.createdAt)}
                        </p>
                    </div>

                    {/* Expand Arrow */}
                    {(log.oldValues || log.newValues) && (
                        <div className="flex-shrink-0">
                            {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-neutral-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-neutral-400" />
                            )}
                        </div>
                    )}
                </div>
            </button>

            {/* Expanded Details */}
            {isExpanded && (log.oldValues || log.newValues) && (
                <div className="px-4 pb-4 pl-18">
                    <div className="bg-neutral-50 rounded-lg p-4 text-sm">
                        {log.oldValues && (
                            <div className="mb-3">
                                <p className="text-xs font-medium text-neutral-500 mb-1">Nilai Lama:</p>
                                <pre className="text-neutral-700 text-xs bg-white rounded p-2 overflow-x-auto">
                                    {JSON.stringify(log.oldValues, null, 2)}
                                </pre>
                            </div>
                        )}
                        {log.newValues && (
                            <div>
                                <p className="text-xs font-medium text-neutral-500 mb-1">Nilai Baru:</p>
                                <pre className="text-neutral-700 text-xs bg-white rounded p-2 overflow-x-auto">
                                    {JSON.stringify(log.newValues, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// Empty State
function EmptyState() {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ScrollText className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Aktivitas</h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                Riwayat aktivitas pengurus akan muncul di sini untuk transparansi dan akuntabilitas.
            </p>
        </div>
    )
}

// Main Page
export default function AuditPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [actionFilter, setActionFilter] = useState<string>('all')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const filtered = demoAuditLogs.filter(log => {
        if (actionFilter !== 'all' && log.action !== actionFilter) return false
        // Can add more filters like entity type or user
        return true
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Audit Log</h1>
                <p className="text-neutral-500 mt-1">Riwayat aktivitas pengurus untuk transparansi</p>
            </div>

            {/* Info Card */}
            <div className="card p-4 bg-primary-50 border-primary-100">
                <div className="flex items-start gap-3">
                    <ScrollText className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-primary-900">Apa itu Audit Log?</p>
                        <p className="text-sm text-primary-700 mt-1">
                            Audit log mencatat semua perubahan yang dilakukan oleh pengurus, seperti penambahan transaksi,
                            edit pengumuman, atau penghapusan dokumen. Ini membantu menjaga transparansi dan akuntabilitas.
                        </p>
                    </div>
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
                        placeholder="Cari aktivitas..."
                        className="input pl-10"
                    />
                </div>
                <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="input w-auto"
                >
                    <option value="all">Semua Aksi</option>
                    <option value="create">Buat</option>
                    <option value="update">Edit</option>
                    <option value="delete">Hapus</option>
                </select>
            </div>

            {/* Audit Logs */}
            {filtered.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="card overflow-hidden">
                    {filtered.map((log) => (
                        <LogEntry
                            key={log.id}
                            log={log}
                            isExpanded={expandedId === log.id}
                            onToggle={() => setExpandedId(expandedId === log.id ? null : log.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
