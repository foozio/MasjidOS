import {
    Transaction,
    Category,
    DonationRecord,
    Event,
    Announcement,
    Asset,
    Document,
    AuditLog,
    Tenant,
    User,
    Membership,
    Role
} from '@/types'

// Demo Tenant
export const demoTenant: Tenant = {
    id: 'tenant-1',
    name: 'Masjid Al-Ikhlas',
    slug: 'masjid-al-ikhlas',
    logoUrl: undefined,
    address: 'Jl. Masjid Raya No. 123, Kelurahan Sukamaju, Jakarta Selatan',
    phone: '021-7654321',
    plan: 'basic',
    settings: {
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        donationPublicEnabled: true,
        requireApproval: false,
    },
    createdAt: new Date('2024-01-15'),
}

// Demo User
export const demoUser: User = {
    id: 'user-1',
    email: 'admin@demo-masjid.com',
    fullName: 'H. Ahmad Fauzi',
    avatarUrl: undefined,
    createdAt: new Date('2024-01-15'),
}

// Categories
export const demoCategories: Category[] = [
    { id: 'cat-1', tenantId: 'tenant-1', name: 'Infaq Jumat', type: 'income', icon: 'coins', color: '#0d9488' },
    { id: 'cat-2', tenantId: 'tenant-1', name: 'Donasi Umum', type: 'income', icon: 'heart', color: '#059669' },
    { id: 'cat-3', tenantId: 'tenant-1', name: 'Kotak Amal', type: 'income', icon: 'box', color: '#7c3aed' },
    { id: 'cat-4', tenantId: 'tenant-1', name: 'Zakat', type: 'income', icon: 'gift', color: '#0891b2' },
    { id: 'cat-5', tenantId: 'tenant-1', name: 'Listrik & Air', type: 'expense', icon: 'zap', color: '#f59e0b' },
    { id: 'cat-6', tenantId: 'tenant-1', name: 'Kebersihan', type: 'expense', icon: 'sparkles', color: '#10b981' },
    { id: 'cat-7', tenantId: 'tenant-1', name: 'Gaji Marbot', type: 'expense', icon: 'user', color: '#8b5cf6' },
    { id: 'cat-8', tenantId: 'tenant-1', name: 'Perbaikan', type: 'expense', icon: 'wrench', color: '#6366f1' },
    { id: 'cat-9', tenantId: 'tenant-1', name: 'Kegiatan', type: 'expense', icon: 'calendar', color: '#ec4899' },
]

// Transactions
export const demoTransactions: Transaction[] = [
    { id: 'tx-1', tenantId: 'tenant-1', type: 'income', amount: 12500000, categoryId: 'cat-1', description: 'Infaq Jumat 24 Januari', createdBy: 'user-1', createdAt: new Date('2026-01-24') },
    { id: 'tx-2', tenantId: 'tenant-1', type: 'income', amount: 8750000, categoryId: 'cat-1', description: 'Infaq Jumat 17 Januari', createdBy: 'user-1', createdAt: new Date('2026-01-17') },
    { id: 'tx-3', tenantId: 'tenant-1', type: 'income', amount: 5000000, categoryId: 'cat-2', description: 'Donasi pembangunan toilet', createdBy: 'user-1', createdAt: new Date('2026-01-20') },
    { id: 'tx-4', tenantId: 'tenant-1', type: 'income', amount: 3200000, categoryId: 'cat-3', description: 'Kotak amal mingguan', createdBy: 'user-1', createdAt: new Date('2026-01-22') },
    { id: 'tx-5', tenantId: 'tenant-1', type: 'expense', amount: 1850000, categoryId: 'cat-5', description: 'Tagihan listrik Januari', createdBy: 'user-1', createdAt: new Date('2026-01-15') },
    { id: 'tx-6', tenantId: 'tenant-1', type: 'expense', amount: 2500000, categoryId: 'cat-7', description: 'Gaji marbot Januari', createdBy: 'user-1', createdAt: new Date('2026-01-25') },
    { id: 'tx-7', tenantId: 'tenant-1', type: 'expense', amount: 750000, categoryId: 'cat-6', description: 'Pembersihan karpet', createdBy: 'user-1', createdAt: new Date('2026-01-18') },
    { id: 'tx-8', tenantId: 'tenant-1', type: 'expense', amount: 3500000, categoryId: 'cat-8', description: 'Perbaikan AC ruang utama', createdBy: 'user-1', createdAt: new Date('2026-01-12') },
    { id: 'tx-9', tenantId: 'tenant-1', type: 'income', amount: 15000000, categoryId: 'cat-4', description: 'Zakat fitrah kolektif', createdBy: 'user-1', createdAt: new Date('2026-01-10') },
    { id: 'tx-10', tenantId: 'tenant-1', type: 'expense', amount: 1200000, categoryId: 'cat-9', description: 'Konsumsi pengajian akbar', createdBy: 'user-1', createdAt: new Date('2026-01-08') },
]

// Donation Records
export const demoDonations: DonationRecord[] = [
    { id: 'don-1', tenantId: 'tenant-1', donorName: 'Bapak Haryono', amount: 5000000, isAnonymous: false, message: 'Semoga bermanfaat untuk pembangunan masjid', createdAt: new Date('2026-01-25') },
    { id: 'don-2', tenantId: 'tenant-1', donorName: undefined, amount: 2500000, isAnonymous: true, message: undefined, createdAt: new Date('2026-01-24') },
    { id: 'don-3', tenantId: 'tenant-1', donorName: 'Ibu Fatimah', amount: 1000000, isAnonymous: false, message: 'Untuk kegiatan pengajian', createdAt: new Date('2026-01-22') },
    { id: 'don-4', tenantId: 'tenant-1', donorName: 'H. Sulaiman', amount: 10000000, isAnonymous: false, message: 'Wakaf pembangunan toilet', createdAt: new Date('2026-01-20') },
    { id: 'don-5', tenantId: 'tenant-1', donorName: undefined, amount: 500000, isAnonymous: true, message: 'Jazakallahu khairan', createdAt: new Date('2026-01-18') },
]

// Events
export const demoEvents: Event[] = [
    { id: 'evt-1', tenantId: 'tenant-1', title: 'Pengajian Akbar Bulanan', description: 'Pengajian rutin bulanan dengan penceramah tamu', startDate: new Date('2026-02-01T09:00:00'), endDate: new Date('2026-02-01T12:00:00'), location: 'Aula Utama', maxVolunteers: 10, volunteers: ['user-2', 'user-3'], createdBy: 'user-1', createdAt: new Date('2026-01-15') },
    { id: 'evt-2', tenantId: 'tenant-1', title: 'Buka Puasa Bersama', description: 'Berbuka puasa bersama jamaah dan masyarakat sekitar', startDate: new Date('2026-03-15T17:30:00'), endDate: new Date('2026-03-15T19:00:00'), location: 'Halaman Masjid', maxVolunteers: 20, volunteers: [], createdBy: 'user-1', createdAt: new Date('2026-01-20') },
    { id: 'evt-3', tenantId: 'tenant-1', title: 'Kajian Fiqih Mingguan', description: 'Kajian rutin setiap Ahad pagi', startDate: new Date('2026-01-26T08:00:00'), endDate: new Date('2026-01-26T09:30:00'), location: 'Ruang Kajian', maxVolunteers: 5, volunteers: ['user-2'], createdBy: 'user-1', createdAt: new Date('2026-01-10') },
    { id: 'evt-4', tenantId: 'tenant-1', title: 'Gotong Royong Bersih Masjid', description: 'Kegiatan bersih-bersih rutin masjid', startDate: new Date('2026-02-08T06:00:00'), endDate: new Date('2026-02-08T10:00:00'), location: 'Seluruh Area Masjid', maxVolunteers: 30, volunteers: ['user-2', 'user-3', 'user-4'], createdBy: 'user-1', createdAt: new Date('2026-01-22') },
]

// Announcements
export const demoAnnouncements: Announcement[] = [
    { id: 'ann-1', tenantId: 'tenant-1', title: 'Jadwal Imam Sholat Jumat Januari', content: 'Berikut jadwal imam sholat jumat bulan Januari:\n- 3 Jan: Ust. Ahmad\n- 10 Jan: Ust. Ridwan\n- 17 Jan: Ust. Farid\n- 24 Jan: Ust. Ahmad\n- 31 Jan: Ust. Ridwan', isPublic: true, publishedAt: new Date('2026-01-01'), createdBy: 'user-1', createdAt: new Date('2026-01-01') },
    { id: 'ann-2', tenantId: 'tenant-1', title: 'Pemberitahuan Renovasi Toilet', content: 'Diinformasikan kepada jamaah bahwa toilet akan direnovasi mulai tanggal 5 Februari 2026. Harap gunakan toilet cadangan di sebelah selatan. Mohon maaf atas ketidaknyamanannya.', isPublic: true, publishedAt: new Date('2026-01-25'), createdBy: 'user-1', createdAt: new Date('2026-01-25') },
    { id: 'ann-3', tenantId: 'tenant-1', title: 'Undangan Pengajian Akbar', content: 'Mengundang seluruh jamaah untuk menghadiri pengajian akbar pada hari Sabtu, 1 Februari 2026 pukul 09:00 WIB. Penceramah: Ust. Dr. Abdullah Gymnastiar.', isPublic: true, publishedAt: new Date('2026-01-20'), createdBy: 'user-1', createdAt: new Date('2026-01-20') },
]

// Assets
export const demoAssets: Asset[] = [
    { id: 'ast-1', tenantId: 'tenant-1', name: 'AC Split 2 PK', category: 'Elektronik', condition: 'good', location: 'Ruang Utama', purchaseDate: new Date('2023-06-15'), value: 8500000, notes: 'Baru diperbaiki Januari 2026', createdAt: new Date('2023-06-15') },
    { id: 'ast-2', tenantId: 'tenant-1', name: 'Sound System', category: 'Elektronik', condition: 'excellent', location: 'Ruang Utama', purchaseDate: new Date('2024-01-10'), value: 25000000, notes: 'Termasuk 4 speaker dan mixer', createdAt: new Date('2024-01-10') },
    { id: 'ast-3', tenantId: 'tenant-1', name: 'Karpet Sholat', category: 'Perlengkapan', condition: 'good', location: 'Ruang Utama', purchaseDate: new Date('2022-05-20'), value: 15000000, notes: '100 m2', createdAt: new Date('2022-05-20') },
    { id: 'ast-4', tenantId: 'tenant-1', name: 'Mimbar', category: 'Furnitur', condition: 'excellent', location: 'Ruang Utama', purchaseDate: new Date('2020-08-15'), value: 12000000, notes: 'Kayu jati ukir', createdAt: new Date('2020-08-15') },
    { id: 'ast-5', tenantId: 'tenant-1', name: 'Proyektor', category: 'Elektronik', condition: 'fair', location: 'Aula', purchaseDate: new Date('2021-03-10'), value: 5000000, notes: 'Perlu ganti lampu', createdAt: new Date('2021-03-10') },
    { id: 'ast-6', tenantId: 'tenant-1', name: 'Rak Al-Quran', category: 'Furnitur', condition: 'good', location: 'Ruang Utama', purchaseDate: new Date('2022-01-15'), value: 3500000, notes: '50 slot', createdAt: new Date('2022-01-15') },
]

// Documents
export const demoDocuments: Document[] = [
    { id: 'doc-1', tenantId: 'tenant-1', name: 'Notulen Rapat Pengurus Jan 2026', category: 'notulen', fileUrl: '#', fileSize: 245000, uploadedBy: 'user-1', createdAt: new Date('2026-01-20') },
    { id: 'doc-2', tenantId: 'tenant-1', name: 'Proposal Renovasi Toilet', category: 'proposal', fileUrl: '#', fileSize: 1250000, uploadedBy: 'user-1', createdAt: new Date('2026-01-15') },
    { id: 'doc-3', tenantId: 'tenant-1', name: 'Laporan Keuangan Desember 2025', category: 'report', fileUrl: '#', fileSize: 520000, uploadedBy: 'user-1', createdAt: new Date('2026-01-05') },
    { id: 'doc-4', tenantId: 'tenant-1', name: 'Foto Pengajian Akbar Des 2025', category: 'photo', fileUrl: '#', fileSize: 8500000, uploadedBy: 'user-1', createdAt: new Date('2025-12-28') },
]

// Audit Logs
export const demoAuditLogs: AuditLog[] = [
    { id: 'log-1', tenantId: 'tenant-1', userId: 'user-1', action: 'create', entityType: 'transaction', entityId: 'tx-1', newValues: { amount: 12500000, description: 'Infaq Jumat 24 Januari' }, createdAt: new Date('2026-01-24T14:30:00') },
    { id: 'log-2', tenantId: 'tenant-1', userId: 'user-1', action: 'update', entityType: 'announcement', entityId: 'ann-2', oldValues: { title: 'Pemberitahuan Renovasi' }, newValues: { title: 'Pemberitahuan Renovasi Toilet' }, createdAt: new Date('2026-01-25T09:15:00') },
    { id: 'log-3', tenantId: 'tenant-1', userId: 'user-1', action: 'create', entityType: 'event', entityId: 'evt-2', newValues: { title: 'Buka Puasa Bersama' }, createdAt: new Date('2026-01-20T16:00:00') },
    { id: 'log-4', tenantId: 'tenant-1', userId: 'user-2', action: 'update', entityType: 'transaction', entityId: 'tx-5', oldValues: { amount: 1800000 }, newValues: { amount: 1850000 }, createdAt: new Date('2026-01-15T10:20:00') },
    { id: 'log-5', tenantId: 'tenant-1', userId: 'user-1', action: 'delete', entityType: 'document', entityId: 'doc-old', oldValues: { name: 'Dokumen Lama' }, createdAt: new Date('2026-01-12T11:45:00') },
]

// Team Members (Memberships)
export const demoMembers: (Membership & { user: User; role: Role })[] = [
    {
        id: 'mem-1',
        userId: 'user-1',
        tenantId: 'tenant-1',
        roleId: 'admin',
        status: 'active',
        joinedAt: new Date('2024-01-15'),
        user: { id: 'user-1', email: 'admin@demo-masjid.com', fullName: 'H. Ahmad Fauzi', createdAt: new Date('2024-01-15') },
        role: { id: 'admin', name: 'Admin Masjid', permissions: [], isSystem: true }
    },
    {
        id: 'mem-2',
        userId: 'user-2',
        tenantId: 'tenant-1',
        roleId: 'bendahara',
        status: 'active',
        joinedAt: new Date('2024-01-20'),
        user: { id: 'user-2', email: 'bendahara@demo-masjid.com', fullName: 'Bapak Haryono', createdAt: new Date('2024-01-20') },
        role: { id: 'bendahara', name: 'Bendahara', permissions: [], isSystem: true }
    },
    {
        id: 'mem-3',
        userId: 'user-3',
        tenantId: 'tenant-1',
        roleId: 'sekretaris',
        status: 'active',
        joinedAt: new Date('2024-02-01'),
        user: { id: 'user-3', email: 'sekretaris@demo-masjid.com', fullName: 'Ustadz Ridwan', createdAt: new Date('2024-02-01') },
        role: { id: 'sekretaris', name: 'Sekretaris', permissions: [], isSystem: true }
    },
    {
        id: 'mem-4',
        userId: 'user-4',
        tenantId: 'tenant-1',
        roleId: 'pengurus',
        status: 'active',
        joinedAt: new Date('2024-03-10'),
        user: { id: 'user-4', email: 'pengurus@demo-masjid.com', fullName: 'Bapak Suryo', createdAt: new Date('2024-03-10') },
        role: { id: 'pengurus', name: 'Pengurus', permissions: [], isSystem: true }
    },
]

// Summary data for overview
export function getSummaryData() {
    const totalIncome = demoTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = demoTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpense

    const totalDonations = demoDonations.reduce((sum, d) => sum + d.amount, 0)

    const upcomingEvents = demoEvents.filter(e => e.startDate > new Date()).length

    return {
        balance,
        totalIncome,
        totalExpense,
        totalDonations,
        upcomingEvents,
        totalAssets: demoAssets.length,
        totalMembers: demoMembers.length,
        recentTransactions: demoTransactions.slice(0, 5),
        recentDonations: demoDonations.slice(0, 3),
    }
}
