'use client'

import Link from 'next/link'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, User, Check } from 'lucide-react'
import { useState } from 'react'
import { APP_NAME } from '@/lib/constants'

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate registration - redirect to onboarding
        setTimeout(() => {
            window.location.href = '/onboarding'
        }, 1000)
    }

    const passwordChecks = [
        { label: 'Minimal 8 karakter', valid: formData.password.length >= 8 },
        { label: 'Mengandung huruf', valid: /[a-zA-Z]/.test(formData.password) },
        { label: 'Mengandung angka', valid: /[0-9]/.test(formData.password) },
    ]

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                            <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl text-neutral-900">{APP_NAME}</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="card p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Buat Akun Baru</h1>
                        <p className="text-neutral-600">Mulai kelola masjid dengan lebih baik</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="input pl-10"
                                    placeholder="Ahmad Fauzi"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input pl-10"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="input pl-10 pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordChecks.map((check, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${check.valid ? 'bg-success-100 text-success-600' : 'bg-neutral-100 text-neutral-400'}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className={check.valid ? 'text-success-600' : 'text-neutral-500'}>
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <p className="text-xs text-neutral-500">
                            Dengan mendaftar, Anda menyetujui{' '}
                            <a href="#" className="text-primary-600 hover:underline">Syarat & Ketentuan</a>
                            {' '}dan{' '}
                            <a href="#" className="text-primary-600 hover:underline">Kebijakan Privasi</a>
                            {' '}kami.
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading || passwordChecks.some(c => !c.valid)}
                            className="btn-primary w-full btn-lg"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Daftar Gratis
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-neutral-600">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">
                            Masuk
                        </Link>
                    </p>
                </div>

                {/* Free Trial Badge */}
                <div className="text-center mt-6">
                    <span className="badge-primary">
                        <Check className="w-3 h-3" />
                        Gratis 14 hari, tanpa kartu kredit
                    </span>
                </div>
            </div>
        </div>
    )
}
