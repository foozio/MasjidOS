'use client'

import { useState } from 'react'
import {
    Plus,
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Edit2,
    Trash2,
    FileText,
    X,
    Upload,
    Calendar
} from 'lucide-react'
import { demoTransactions, demoCategories } from '@/lib/data'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Transaction } from '@/types'

// Add Transaction Modal
function AddTransactionModal({
    isOpen,
    onClose,
    onSave
}: {
    isOpen: boolean
    onClose: () => void
    onSave: (tx: Partial<Transaction>) => void
}) {
    const [formData, setFormData] = useState({
        type: 'income' as 'income' | 'expense',
        amount: '',
        categoryId: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    })

    const filteredCategories = demoCategories.filter(c => c.type === formData.type)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            type: formData.type,
            amount: parseInt(formData.amount),
            categoryId: formData.categoryId,
            description: formData.description,
            createdAt: new Date(formData.date),
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Tambah Transaksi</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Type Toggle */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
                            className={cn(
                                'flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors',
                                formData.type === 'income'
                                    ? 'bg-success-100 text-success-700'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            )}
                        >
                            <ArrowUpRight className="w-4 h-4 inline-block mr-1" />
                            Pemasukan
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
                            className={cn(
                                'flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors',
                                formData.type === 'expense'
                                    ? 'bg-error-100 text-error-700'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            )}
                        >
                            <ArrowDownRight className="w-4 h-4 inline-block mr-1" />
                            Pengeluaran
                        </button>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Jumlah</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">Rp</span>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="input pl-10"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kategori</label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="input"
                            required
                        >
                            <option value="">Pilih kategori</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Keterangan</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input"
                            placeholder="Contoh: Infaq Jumat 24 Januari"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tanggal</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="input"
                            required
                        />
                    </div>

                    {/* Attachment */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Bukti (opsional)</label>
                        <div className="border-2 border-dashed border-neutral-200 rounded-xl p-4 text-center hover:border-primary-400 transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-1" />
                            <p className="text-sm text-neutral-600">Klik untuk upload</p>
                        </div>
                    </div>

                    {/* Actions */}
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

// Empty State Component
function EmptyState() {
    return (
        <div className="empty-state">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Belum Ada Transaksi</h3>
            <p className="text-neutral-500 text-sm mb-6 max-w-sm">
                Mulai catat pemasukan dan pengeluaran masjid untuk melacak arus kas dengan lebih baik.
            </p>
            <button className="btn-primary">
                <Plus className="w-4 h-4" />
                Tambah Transaksi Pertama
            </button>
        </div>
    )
}

// Main Finance Page
export default function KeuanganPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredTransactions = demoTransactions.filter(tx => {
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false
        if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })

    const totalIncome = demoTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = demoTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const balance = totalIncome - totalExpense

    const handleSaveTransaction = (tx: Partial<Transaction>) => {
        console.log('Saving transaction:', tx)
        // In real app, this would call API
    }

    const handleExport = () => {
        const headers = ['Tanggal', 'Keterangan', 'Kategori', 'Tipe', 'Jumlah']
        const rows = filteredTransactions.map(tx => {
            const category = demoCategories.find(c => c.id === tx.categoryId)
            return [
                formatDate(tx.createdAt),
                `"${tx.description.replace(/"/g, '""')}"`, // Escape quotes
                category?.name || '-',
                tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
                tx.amount
            ]
        })

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `laporan-keuangan-${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Keuangan</h1>
                    <p className="text-neutral-500 mt-1">Kelola pemasukan dan pengeluaran masjid</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="btn-secondary">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button onClick={() => setShowAddModal(true)} className="btn-primary">
                        <Plus className="w-4 h-4" />
                        Tambah
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Saldo Kas</p>
                    <p className="text-xl font-bold text-neutral-900 mt-1">{formatCurrency(balance)}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Pemasukan</p>
                    <p className="text-xl font-bold text-success-600 mt-1">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-neutral-500">Total Pengeluaran</p>
                    <p className="text-xl font-bold text-error-600 mt-1">{formatCurrency(totalExpense)}</p>
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
                        placeholder="Cari transaksi..."
                        className="input pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'income', 'expense'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setTypeFilter(filter)}
                            className={cn(
                                'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                                typeFilter === filter
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            )}
                        >
                            {filter === 'all' ? 'Semua' : filter === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            {filteredTransactions.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="card overflow-hidden">
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-header-cell">Tanggal</th>
                                    <th className="table-header-cell">Keterangan</th>
                                    <th className="table-header-cell">Kategori</th>
                                    <th className="table-header-cell text-right">Jumlah</th>
                                    <th className="table-header-cell w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filteredTransactions.map((tx) => {
                                    const category = demoCategories.find(c => c.id === tx.categoryId)
                                    return (
                                        <tr key={tx.id} className="table-row">
                                            <td className="table-cell">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        'w-8 h-8 rounded-lg flex items-center justify-center',
                                                        tx.type === 'income' ? 'bg-success-100' : 'bg-error-100'
                                                    )}>
                                                        {tx.type === 'income' ? (
                                                            <ArrowUpRight className="w-4 h-4 text-success-600" />
                                                        ) : (
                                                            <ArrowDownRight className="w-4 h-4 text-error-600" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-neutral-900">{formatDate(tx.createdAt)}</span>
                                                </div>
                                            </td>
                                            <td className="table-cell font-medium text-neutral-900">{tx.description}</td>
                                            <td className="table-cell">
                                                <span
                                                    className="badge"
                                                    style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                                                >
                                                    {category?.name}
                                                </span>
                                            </td>
                                            <td className={cn(
                                                'table-cell text-right font-semibold',
                                                tx.type === 'income' ? 'text-success-600' : 'text-error-600'
                                            )}>
                                                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </td>
                                            <td className="table-cell">
                                                <button className="p-1 hover:bg-neutral-100 rounded-lg">
                                                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveTransaction}
            />
        </div>
    )
}
