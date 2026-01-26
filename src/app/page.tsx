'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    Wallet,
    Heart,
    Calendar,
    Megaphone,
    Package,
    Folder,
    BarChart3,
    Check,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    Star,
    Shield,
    Zap,
    Users,
    Building2,
    Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { FEATURES, FAQ_ITEMS, TESTIMONIALS, PRICING_PLANS, APP_NAME, APP_TAGLINE } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
    wallet: <Wallet className="w-6 h-6" />,
    heart: <Heart className="w-6 h-6" />,
    calendar: <Calendar className="w-6 h-6" />,
    megaphone: <Megaphone className="w-6 h-6" />,
    package: <Package className="w-6 h-6" />,
    folder: <Folder className="w-6 h-6" />,
    'chart-bar': <BarChart3 className="w-6 h-6" />,
}

// Navigation
function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50">
            <div className="container-main">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-xl text-neutral-900">{APP_NAME}</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#fitur" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Fitur</a>
                        <a href="#harga" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Harga</a>
                        <a href="#faq" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">FAQ</a>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="btn-ghost">Masuk</Link>
                        <Link href="/register" className="btn-primary">Coba Gratis</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-neutral-200">
                        <div className="flex flex-col gap-4">
                            <a href="#fitur" className="text-sm font-medium text-neutral-600">Fitur</a>
                            <a href="#harga" className="text-sm font-medium text-neutral-600">Harga</a>
                            <a href="#faq" className="text-sm font-medium text-neutral-600">FAQ</a>
                            <hr className="border-neutral-200" />
                            <Link href="/login" className="text-sm font-medium text-neutral-600">Masuk</Link>
                            <Link href="/register" className="btn-primary text-center">Coba Gratis</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

// Hero Section
function HeroSection() {
    return (
        <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            <div className="container-main">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        <span>Platform #1 untuk Manajemen Masjid</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-display-lg text-neutral-900 mb-6 animate-slide-up">
                        Kelola Masjid Lebih{' '}
                        <span className="text-primary-600">Rapi</span>,{' '}
                        <span className="text-primary-600">Transparan</span>, dan{' '}
                        <span className="text-primary-600">Modern</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Sistem lengkap untuk pencatatan keuangan, donasi, kegiatan, inventaris, dan dokumentasi masjid. Semua dalam satu platform yang mudah digunakan.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link href="/register" className="btn-primary btn-lg w-full sm:w-auto group">
                            Coba Gratis 14 Hari
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#demo" className="btn-secondary btn-lg w-full sm:w-auto">
                            Lihat Demo
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-neutral-500 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary-600" />
                            <span>Data Terenkripsi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary-600" />
                            <span>Setup 5 Menit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary-600" />
                            <span>1000+ Masjid</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="mt-16 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-3xl blur-2xl"></div>
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100 border-b border-neutral-200">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 bg-white rounded-md text-xs text-neutral-500">
                                        app.masjidos.com/dashboard
                                    </div>
                                </div>
                            </div>
                            {/* Dashboard Preview Image Placeholder */}
                            {/* Dashboard Preview Image */}
                            <div className="relative aspect-[16/9] bg-neutral-50">
                                <Image
                                    src="/images/dashboard-preview.png"
                                    alt="MasjidOS Dashboard Preview"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Problem Solution Section
function ProblemSolutionSection() {
    const problems = [
        { problem: 'Catatan keuangan berantakan di buku tulis', solution: 'Pencatatan digital rapi & otomatis' },
        { problem: 'Laporan manual memakan waktu', solution: 'Laporan otomatis siap cetak' },
        { problem: 'Jamaah tidak tahu alur dana', solution: 'Transparansi penuh via dashboard' },
        { problem: 'Susah koordinasi antar pengurus', solution: 'Kolaborasi real-time multi-user' },
    ]

    return (
        <section className="section bg-white">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-display-sm text-neutral-900 mb-4">
                        Dari Repot Jadi <span className="text-primary-600">Mudah</span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        MasjidOS menyelesaikan masalah administrasi yang selama ini menyita waktu pengurus
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {problems.map((item, i) => (
                        <div key={i} className="card p-6 flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center">
                                    <X className="w-5 h-5 text-error-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-neutral-500 line-through text-sm mb-2">{item.problem}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-success-600" />
                                    </div>
                                    <p className="text-neutral-900 font-medium">{item.solution}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Features Section
function FeaturesSection() {
    return (
        <section id="fitur" className="section bg-neutral-50">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-display-sm text-neutral-900 mb-4">
                        Fitur <span className="text-primary-600">Lengkap</span> untuk Masjid Modern
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Semua yang Anda butuhkan untuk mengelola masjid dengan baik
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className="card-hover p-6 group">
                            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                {iconMap[feature.icon] || <Sparkles className="w-6 h-6" />}
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Testimonials Section
function TestimonialsSection() {
    return (
        <section className="section bg-white">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-display-sm text-neutral-900 mb-4">
                        Dipercaya <span className="text-primary-600">Ratusan</span> Masjid
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Apa kata mereka yang sudah menggunakan MasjidOS
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <div key={i} className="card p-6">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 fill-accent-400 text-accent-400" />
                                ))}
                            </div>
                            <p className="text-neutral-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-primary-700 font-semibold text-sm">
                                        {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 text-sm">{testimonial.name}</p>
                                    <p className="text-neutral-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Pricing Section
function PricingSection() {
    return (
        <section id="harga" className="section bg-neutral-50">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-display-sm text-neutral-900 mb-4">
                        Harga <span className="text-primary-600">Terjangkau</span> untuk Semua
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Mulai gratis, upgrade sesuai kebutuhan masjid Anda
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {PRICING_PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`card p-6 relative ${plan.highlighted ? 'ring-2 ring-primary-500 shadow-lg' : ''}`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="badge-primary px-3 py-1">Populer</span>
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{plan.name}</h3>
                            <p className="text-neutral-500 text-sm mb-4">{plan.description}</p>
                            <div className="mb-6">
                                {plan.price !== null ? (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-neutral-900">
                                            {formatCurrency(plan.price)}
                                        </span>
                                        <span className="text-neutral-500 text-sm">{plan.period}</span>
                                    </div>
                                ) : (
                                    <span className="text-2xl font-bold text-neutral-900">Custom</span>
                                )}
                            </div>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                        <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.id === 'enterprise' ? '/contact' : '/register'}
                                className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// FAQ Section
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="section bg-white">
            <div className="container-main">
                <div className="text-center mb-16">
                    <h2 className="text-display-sm text-neutral-900 mb-4">
                        Pertanyaan yang Sering <span className="text-primary-600">Ditanyakan</span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Jawaban untuk pertanyaan umum tentang MasjidOS
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-4">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className="card overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left"
                            >
                                <span className="font-medium text-neutral-900">{item.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-neutral-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-4">
                                    <p className="text-neutral-600">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// CTA Section
function CTASection() {
    return (
        <section className="section">
            <div className="container-main">
                <div className="gradient-primary rounded-3xl p-8 md:p-16 text-center">
                    <h2 className="text-display-sm text-white mb-4">
                        Siap Kelola Masjid dengan Lebih Baik?
                    </h2>
                    <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                        Bergabung dengan ratusan masjid yang sudah merasakan kemudahan MasjidOS. Gratis 14 hari, tanpa kartu kredit.
                    </p>
                    <Link href="/register" className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg inline-flex">
                        Mulai Sekarang — Gratis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

// Footer
function Footer() {
    return (
        <footer className="bg-neutral-900 text-neutral-400 pt-16 pb-8">
            <div className="container-main">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-white">{APP_NAME}</span>
                        </div>
                        <p className="text-sm mb-4 max-w-sm">
                            {APP_TAGLINE} Sistem manajemen masjid terlengkap untuk era digital.
                        </p>
                        <p className="text-xs text-neutral-500">
                            © {new Date().getFullYear()} MasjidOS. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Produk</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#fitur" className="hover:text-white transition-colors">Fitur</a></li>
                            <li><a href="#harga" className="hover:text-white transition-colors">Harga</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Bantuan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Dokumentasi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Main Landing Page
export default function LandingPage() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <ProblemSolutionSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    )
}
