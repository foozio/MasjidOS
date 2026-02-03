'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { APP_NAME } from '@/lib/constants';

// Submit Button Component
function LoginButton({ isPending }: { isPending: boolean }) {
    return (
        <button className="btn-primary w-full btn-lg" type="submit" disabled={isPending}>
            {isPending ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Memproses...
                </>
            ) : (
                <>
                    Masuk <ArrowRight className="w-5 h-5 ml-2" />
                </>
            )}
        </button>
    );
}

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);

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
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Selamat Datang Kembali</h1>
                        <p className="text-neutral-600">Masuk untuk melanjutkan ke dashboard</p>
                    </div>

                    <form action={dispatch} className="space-y-5">
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
                                    name="email"
                                    className="input pl-10"
                                    placeholder="nama@masjid.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                                    Lupa password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="input pl-10 pr-10"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="flex items-center gap-2 p-3 bg-error-50 text-error-700 rounded-lg text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <LoginButton isPending={isPending} />
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-neutral-500">atau</span>
                        </div>
                    </div>

                    {/* Demo Access - Hidden inputs for demo */}
                    <form action={dispatch}>
                        <input type="hidden" name="email" value="admin@demo-masjid.com" />
                        <input type="hidden" name="password" value="password123" />
                        <button className="btn-secondary w-full" type="submit" disabled={isPending}>
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Memproses...
                                </span>
                            ) : (
                                'Akses Demo'
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-neutral-600">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-primary-600 font-medium hover:text-primary-700">
                            Daftar gratis
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
