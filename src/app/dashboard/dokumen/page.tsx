'use client'

import { useState } from 'react'
import {
    Folder,
    Plus,
    Search,
    MoreVertical,
    X,
    Upload,
    FileText,
    Image,
    Download,
    Eye,
    Trash2
} from 'lucide-react'
import { demoDocuments } from '@/lib/data'
import { formatDate, cn } from '@/lib/utils'
import { DOCUMENT_CATEGORIES } from '@/lib/constants'

// Format file size
function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
}

// Document Icon
function DocumentIcon({ category }: { category: string }) {
    const icons: Record<string, React.ReactNode> = {
        notulen: <FileText className="w-5 h-5" />,
        proposal: <FileText className="w-5 h-5" />,
        report: <FileText className="w-5 h-5" />,
        photo: <Image className="w-5 h-5" />,
        other: <Folder className="w-5 h-5" />,
    }
    const colors: Record<string, string> = {
        notulen: 'bg-primary-100 text-primary-600',
        proposal: 'bg-accent-100 text-accent-600',
        report: 'bg-success-100 text-success-600',
        photo: 'bg-error-100 text-error-600',
        other: 'bg-neutral-100 text-neutral-600',
    }

    return (
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors[category])}>
            {icons[category]}
        </div>
    )
}

// Document Card
function DocumentCard({ document }: { document: typeof demoDocuments[0] }) {
    const category = DOCUMENT_CATEGORIES.find(c => c.value === document.category)

    return (
        <div className="card p-4 hover:shadow-card-hover transition-shadow">
            <div className="flex items-center gap-4">
                <DocumentIcon category={document.category} />
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 truncate">{document.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                        <span>{category?.label}</span>
                        <span>•</span>
                        <span>{formatFileSize(document.fileSize)}</span>
                        <span>•</span>
                        <span>{formatDate(document.createdAt)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-primary-600">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-primary-600">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-error-600">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Folder className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Dokumen</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Upload notulen rapat, proposal, laporan, atau foto kegiatan masjid.
            </p>
            <button onClick={onAdd} className="btn-primary">
                <Upload className="w-4 h-4" />
                Upload Dokumen
            </button>
        </div>
    )
}

// Upload Modal
function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
    })

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Upload Dokumen</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-4 space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                        <p className="font-medium text-neutral-900 mb-1">Klik untuk upload file</p>
                        <p className="text-sm text-neutral-500">PDF, DOC, JPG, PNG hingga 10MB</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nama Dokumen</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input"
                            placeholder="Contoh: Notulen Rapat Januari 2026"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kategori *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input"
                            required
                        >
                            <option value="">Pilih kategori</option>
                            {DOCUMENT_CATEGORIES.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Batal
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Main Page
export default function DokumenPage() {
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')

    const filtered = demoDocuments.filter(d => {
        if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (categoryFilter !== 'all' && d.category !== categoryFilter) return false
        return true
    })

    // Stats
    const totalSize = demoDocuments.reduce((sum, d) => sum + d.fileSize, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Dokumen</h1>
                    <p className="text-neutral-500 mt-1">Kelola arsip dan dokumentasi masjid</p>
                </div>
                <button onClick={() => setShowUploadModal(true)} className="btn-primary">
                    <Upload className="w-4 h-4" />
                    Upload
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Dokumen</p>
                    <p className="text-xl font-bold text-neutral-900 mt-1">{demoDocuments.length} file</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Ukuran</p>
                    <p className="text-xl font-bold text-primary-600 mt-1">{formatFileSize(totalSize)}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Terakhir Upload</p>
                    <p className="text-xl font-bold text-neutral-900 mt-1">{formatDate(demoDocuments[0]?.createdAt || new Date())}</p>
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
                        placeholder="Cari dokumen..."
                        className="input pl-10"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="input w-auto"
                >
                    <option value="all">Semua Kategori</option>
                    {DOCUMENT_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </div>

            {/* Document List */}
            {filtered.length === 0 ? (
                <EmptyState onAdd={() => setShowUploadModal(true)} />
            ) : (
                <div className="grid gap-3">
                    {filtered.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
        </div>
    )
}
