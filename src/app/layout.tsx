import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
    title: 'MasjidOS - Kelola Masjid Lebih Rapi, Transparan, dan Modern',
    description: 'Sistem manajemen masjid modern untuk pencatatan keuangan, donasi, kegiatan, inventaris, dan dokumentasi. Transparan dan mudah digunakan.',
    keywords: ['masjid', 'manajemen masjid', 'keuangan masjid', 'donasi masjid', 'kegiatan masjid'],
    authors: [{ name: 'MasjidOS' }],
    openGraph: {
        title: 'MasjidOS - Sistem Manajemen Masjid Modern',
        description: 'Kelola masjid lebih rapi, transparan, dan modern dengan MasjidOS.',
        type: 'website',
        locale: 'id_ID',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className="scroll-smooth">
            <body className={`min-h-screen bg-neutral-50 ${inter.variable} ${plusJakartaSans.variable} font-sans`}>
                {children}
            </body>
        </html>
    )
}
