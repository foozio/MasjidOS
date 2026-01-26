// MasjidOS Constants

export const APP_NAME = 'MasjidOS'
export const APP_TAGLINE = 'Kelola masjid lebih rapi, transparan, dan modern.'
export const APP_DESCRIPTION = 'Sistem manajemen masjid modern untuk pencatatan keuangan, donasi, kegiatan, inventaris, dan dokumentasi.'

// Pricing Plans
export const PRICING_PLANS = [
    {
        id: 'free',
        name: 'Gratis',
        price: 0,
        period: 'selamanya',
        description: 'Untuk masjid kecil yang baru mulai',
        features: [
            '1 Admin',
            'Pencatatan keuangan dasar',
            'Hingga 50 transaksi/bulan',
            'Laporan bulanan sederhana',
        ],
        cta: 'Mulai Gratis',
        highlighted: false,
    },
    {
        id: 'basic',
        name: 'Basic',
        price: 79000,
        period: '/bulan',
        description: 'Untuk masjid yang berkembang',
        features: [
            'Hingga 5 Admin',
            'Semua fitur Gratis',
            'Transaksi unlimited',
            'Modul donasi publik',
            'Manajemen kegiatan',
            'Export PDF & CSV',
        ],
        cta: 'Coba 14 Hari Gratis',
        highlighted: true,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 199000,
        period: '/bulan',
        description: 'Untuk masjid dengan banyak pengurus',
        features: [
            'Admin unlimited',
            'Semua fitur Basic',
            'Approval workflow',
            'Audit log lengkap',
            'Manajemen inventaris',
            'Dokumentasi & arsip',
            'Dukungan prioritas',
        ],
        cta: 'Coba 14 Hari Gratis',
        highlighted: false,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: null,
        period: '',
        description: 'Untuk yayasan & organisasi besar',
        features: [
            'Semua fitur Pro',
            'Multi-masjid',
            'API akses',
            'SSO integrasi',
            'Custom branding',
            'Account manager',
            'SLA support',
        ],
        cta: 'Hubungi Kami',
        highlighted: false,
    },
]

// Default Categories
export const DEFAULT_INCOME_CATEGORIES = [
    { name: 'Infaq Jumat', icon: 'coins', color: '#0d9488' },
    { name: 'Zakat', icon: 'heart', color: '#059669' },
    { name: 'Donasi Umum', icon: 'gift', color: '#0891b2' },
    { name: 'Kotak Amal', icon: 'box', color: '#7c3aed' },
    { name: 'Wakaf', icon: 'home', color: '#c026d3' },
]

export const DEFAULT_EXPENSE_CATEGORIES = [
    { name: 'Listrik & Air', icon: 'zap', color: '#f59e0b' },
    { name: 'Kebersihan', icon: 'sparkles', color: '#10b981' },
    { name: 'Perbaikan', icon: 'wrench', color: '#6366f1' },
    { name: 'Gaji Marbot', icon: 'user', color: '#8b5cf6' },
    { name: 'Kegiatan', icon: 'calendar', color: '#ec4899' },
    { name: 'Lain-lain', icon: 'more-horizontal', color: '#64748b' },
]

// Asset Conditions
export const ASSET_CONDITIONS = [
    { value: 'excellent', label: 'Sangat Baik', color: 'success' },
    { value: 'good', label: 'Baik', color: 'primary' },
    { value: 'fair', label: 'Cukup', color: 'warning' },
    { value: 'poor', label: 'Perlu Perbaikan', color: 'error' },
]

// Document Categories
export const DOCUMENT_CATEGORIES = [
    { value: 'notulen', label: 'Notulen Rapat' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'report', label: 'Laporan' },
    { value: 'photo', label: 'Foto Kegiatan' },
    { value: 'other', label: 'Lainnya' },
]

// Roles
export const SYSTEM_ROLES = [
    { id: 'admin', name: 'Admin Masjid', description: 'Akses penuh ke semua fitur' },
    { id: 'bendahara', name: 'Bendahara', description: 'Kelola keuangan dan donasi' },
    { id: 'sekretaris', name: 'Sekretaris', description: 'Kelola kegiatan dan pengumuman' },
    { id: 'pengurus', name: 'Pengurus', description: 'Lihat dan edit terbatas' },
    { id: 'viewer', name: 'Viewer', description: 'Hanya bisa melihat' },
]

// FAQ
export const FAQ_ITEMS = [
    {
        question: 'Apakah MasjidOS benar-benar gratis?',
        answer: 'Ya! Paket Gratis bisa digunakan selamanya tanpa biaya. Anda bisa upgrade kapan saja jika butuh fitur lebih lengkap.',
    },
    {
        question: 'Bagaimana keamanan data kami?',
        answer: 'Data Anda terenkripsi dan tersimpan di server yang aman. Kami menggunakan standar keamanan enterprise untuk melindungi semua informasi.',
    },
    {
        question: 'Bisakah diakses dari HP?',
        answer: 'Tentu! MasjidOS dirancang mobile-first sehingga bisa diakses optimal dari smartphone, tablet, maupun komputer.',
    },
    {
        question: 'Apakah ada batasan jumlah transaksi?',
        answer: 'Paket Gratis hingga 50 transaksi/bulan. Paket berbayar tidak ada batasan transaksi.',
    },
    {
        question: 'Bagaimana cara memulai?',
        answer: 'Cukup daftar, buat profil masjid, dan mulai mencatat. Tidak perlu instalasi atau setup rumit.',
    },
    {
        question: 'Bisa invite pengurus lain?',
        answer: 'Ya! Anda bisa mengundang pengurus lain dan mengatur peran mereka sesuai kebutuhan.',
    },
]

// Testimonials (Dummy)
export const TESTIMONIALS = [
    {
        name: 'H. Ahmad Fauzi',
        role: 'Ketua DKM Masjid Al-Ikhlas',
        content: 'Sejak pakai MasjidOS, laporan keuangan jadi lebih rapi dan transparan. Jamaah juga lebih percaya karena bisa lihat laporan.',
        avatar: null,
    },
    {
        name: 'Ustadz Ridwan',
        role: 'Sekretaris Masjid Ar-Rahman',
        content: 'Fitur pengumumannya sangat membantu. Tidak perlu lagi cetak kertas, langsung bisa share ke jamaah.',
        avatar: null,
    },
    {
        name: 'Bapak Haryono',
        role: 'Bendahara Masjid Baitul Makmur',
        content: 'Export laporan ke PDF tinggal klik. Waktu rapat pengurus jadi lebih efisien karena data sudah lengkap.',
        avatar: null,
    },
]

// Features for Landing Page
export const FEATURES = [
    {
        title: 'Pencatatan Keuangan',
        description: 'Catat pemasukan & pengeluaran dengan mudah. Kategori otomatis, lampiran bukti, dan approval opsional.',
        icon: 'wallet',
    },
    {
        title: 'Donasi Online',
        description: 'Terima donasi dari jamaah dengan link khusus. Support anonim dan pesan dari donatur.',
        icon: 'heart',
    },
    {
        title: 'Manajemen Kegiatan',
        description: 'Jadwalkan kajian, pengajian, dan kegiatan lainnya. Kelola pendaftaran relawan dengan mudah.',
        icon: 'calendar',
    },
    {
        title: 'Pengumuman Digital',
        description: 'Buat dan bagikan pengumuman ke jamaah. Template khutbah dan kajian siap pakai.',
        icon: 'megaphone',
    },
    {
        title: 'Inventaris Aset',
        description: 'Pantau kondisi peralatan masjid. Catat lokasi, nilai, dan riwayat perawatan.',
        icon: 'package',
    },
    {
        title: 'Arsip Dokumen',
        description: 'Simpan notulen rapat, proposal, dan foto kegiatan di satu tempat yang aman.',
        icon: 'folder',
    },
    {
        title: 'Laporan Transparan',
        description: 'Generate laporan otomatis bulanan. Export ke PDF atau CSV untuk rapat pengurus.',
        icon: 'chart-bar',
    },
]

// Navigation Items
export const DASHBOARD_NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard', icon: 'layout-dashboard' },
    { label: 'Keuangan', href: '/dashboard/keuangan', icon: 'wallet' },
    { label: 'Donasi', href: '/dashboard/donasi', icon: 'heart' },
    { label: 'Kegiatan', href: '/dashboard/kegiatan', icon: 'calendar' },
    { label: 'Pengumuman', href: '/dashboard/pengumuman', icon: 'megaphone' },
    { label: 'Inventaris', href: '/dashboard/inventaris', icon: 'package' },
    { label: 'Dokumen', href: '/dashboard/dokumen', icon: 'folder' },
    { label: 'Anggota', href: '/dashboard/anggota', icon: 'users' },
    { label: 'Audit Log', href: '/dashboard/audit', icon: 'scroll-text' },
]

export const SETTINGS_NAV_ITEMS = [
    { label: 'Profil Masjid', href: '/dashboard/settings', icon: 'building' },
    { label: 'Billing', href: '/dashboard/settings/billing', icon: 'credit-card' },
]
