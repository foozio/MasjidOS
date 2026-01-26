'use client'

import Link from 'next/link'
import { Building2, MapPin, Phone, Users, ArrowRight, ArrowLeft, Check, Upload, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { APP_NAME, SYSTEM_ROLES } from '@/lib/constants'

type Step = 1 | 2 | 3

const steps = [
    { number: 1, title: 'Profil Masjid', description: 'Informasi dasar masjid' },
    { number: 2, title: 'Pilih Paket', description: 'Sesuaikan dengan kebutuhan' },
    { number: 3, title: 'Undang Tim', description: 'Tambah pengurus lain' },
]

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1)
    const [formData, setFormData] = useState({
        // Step 1 - Masjid Profile
        masjidName: '',
        address: '',
        phone: '',
        // Step 2 - Plan
        selectedPlan: 'basic',
        // Step 3 - Invites
        invites: [{ email: '', role: 'bendahara' }],
    })

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep((currentStep + 1) as Step)
        } else {
            // Complete onboarding
            window.location.href = '/dashboard'
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step)
        }
    }

    const addInvite = () => {
        setFormData({
            ...formData,
            invites: [...formData.invites, { email: '', role: 'pengurus' }],
        })
    }

    const removeInvite = (index: number) => {
        setFormData({
            ...formData,
            invites: formData.invites.filter((_, i) => i !== index),
        })
    }

    const updateInvite = (index: number, field: 'email' | 'role', value: string) => {
        const newInvites = [...formData.invites]
        newInvites[index][field] = value
        setFormData({ ...formData, invites: newInvites })
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200">
                <div className="container-main py-4">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-xl text-neutral-900">{APP_NAME}</span>
                    </Link>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white border-b border-neutral-200">
                <div className="container-main py-6">
                    <div className="flex items-center justify-center gap-4 md:gap-8">
                        {steps.map((step, i) => (
                            <div key={step.number} className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step.number < currentStep
                                            ? 'bg-primary-600 text-white'
                                            : step.number === currentStep
                                                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-600'
                                                : 'bg-neutral-100 text-neutral-400'
                                        }`}>
                                        {step.number < currentStep ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            step.number
                                        )}
                                    </div>
                                    <div className="hidden md:block">
                                        <p className={`text-sm font-medium ${step.number === currentStep ? 'text-neutral-900' : 'text-neutral-500'}`}>
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-neutral-400">{step.description}</p>
                                    </div>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-12 md:w-24 h-0.5 ${step.number < currentStep ? 'bg-primary-600' : 'bg-neutral-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-main py-8 md:py-12">
                <div className="max-w-lg mx-auto">
                    {/* Step 1: Masjid Profile */}
                    {currentStep === 1 && (
                        <div className="card p-6 md:p-8 animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-primary-600" />
                                </div>
                                <h1 className="text-xl font-bold text-neutral-900 mb-2">Profil Masjid</h1>
                                <p className="text-neutral-600">Lengkapi informasi dasar masjid Anda</p>
                            </div>

                            <div className="space-y-5">
                                {/* Logo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        Logo Masjid (opsional)
                                    </label>
                                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                        <p className="text-sm text-neutral-600">Klik untuk upload logo</p>
                                        <p className="text-xs text-neutral-400 mt-1">PNG, JPG hingga 2MB</p>
                                    </div>
                                </div>

                                {/* Masjid Name */}
                                <div>
                                    <label htmlFor="masjidName" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        Nama Masjid *
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            id="masjidName"
                                            type="text"
                                            value={formData.masjidName}
                                            onChange={(e) => setFormData({ ...formData, masjidName: e.target.value })}
                                            className="input pl-10"
                                            placeholder="Masjid Al-Ikhlas"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        Alamat
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                                        <textarea
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="input pl-10 min-h-[80px] resize-none"
                                            placeholder="Jl. Masjid Raya No. 123, Jakarta"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input pl-10"
                                            placeholder="021-1234567"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Choose Plan */}
                    {currentStep === 2 && (
                        <div className="animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-primary-600" />
                                </div>
                                <h1 className="text-xl font-bold text-neutral-900 mb-2">Pilih Paket</h1>
                                <p className="text-neutral-600">Semua paket termasuk 14 hari gratis</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: 'free', name: 'Gratis', price: 'Rp0', desc: '1 Admin, fitur dasar' },
                                    { id: 'basic', name: 'Basic', price: 'Rp79k/bln', desc: '5 Admin, donasi publik, export', recommended: true },
                                    { id: 'pro', name: 'Pro', price: 'Rp199k/bln', desc: 'Admin unlimited, audit log, inventaris' },
                                ].map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setFormData({ ...formData, selectedPlan: plan.id })}
                                        className={`card p-4 cursor-pointer transition-all ${formData.selectedPlan === plan.id
                                                ? 'ring-2 ring-primary-600 bg-primary-50'
                                                : 'hover:border-neutral-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.selectedPlan === plan.id
                                                    ? 'border-primary-600 bg-primary-600'
                                                    : 'border-neutral-300'
                                                }`}>
                                                {formData.selectedPlan === plan.id && (
                                                    <Check className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-neutral-900">{plan.name}</span>
                                                    {plan.recommended && (
                                                        <span className="badge-primary text-xs">Populer</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-neutral-500">{plan.desc}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-neutral-900">{plan.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Invite Team */}
                    {currentStep === 3 && (
                        <div className="card p-6 md:p-8 animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-primary-600" />
                                </div>
                                <h1 className="text-xl font-bold text-neutral-900 mb-2">Undang Pengurus</h1>
                                <p className="text-neutral-600">Anda bisa melewati langkah ini dan mengundang nanti</p>
                            </div>

                            <div className="space-y-4">
                                {formData.invites.map((invite, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="flex-1">
                                            <input
                                                type="email"
                                                value={invite.email}
                                                onChange={(e) => updateInvite(index, 'email', e.target.value)}
                                                className="input"
                                                placeholder="email@pengurus.com"
                                            />
                                        </div>
                                        <select
                                            value={invite.role}
                                            onChange={(e) => updateInvite(index, 'role', e.target.value)}
                                            className="input w-36"
                                        >
                                            {SYSTEM_ROLES.filter(r => r.id !== 'admin').map((role) => (
                                                <option key={role.id} value={role.id}>{role.name}</option>
                                            ))}
                                        </select>
                                        {formData.invites.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeInvite(index)}
                                                className="btn-ghost px-3 text-neutral-400 hover:text-error-600"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addInvite}
                                    className="btn-secondary w-full"
                                >
                                    + Tambah Pengurus Lain
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className={`btn-ghost ${currentStep === 1 ? 'invisible' : ''}`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Kembali
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentStep === 1 && !formData.masjidName}
                            className="btn-primary"
                        >
                            {currentStep === 3 ? (
                                <>
                                    Selesai & Masuk Dashboard
                                    <Check className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    Lanjut
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Skip link for step 3 */}
                    {currentStep === 3 && (
                        <p className="text-center mt-4">
                            <button
                                type="button"
                                onClick={handleNext}
                                className="text-sm text-neutral-500 hover:text-neutral-700"
                            >
                                Lewati, undang nanti
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
