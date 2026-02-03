'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, Check, LayoutDashboard, Wallet, Calendar } from 'lucide-react'

const TOUR_STEPS = [
    {
        title: 'Selamat Datang di MasjidOS!',
        description: 'Platform manajemen masjid modern untuk membantu operasional masjid Anda menjadi lebih efisien dan transparan.',
        icon: LayoutDashboard,
        color: 'bg-primary-100 text-primary-600',
    },
    {
        title: 'Kelola Keuangan',
        description: 'Catat pemasukan dan pengeluaran, lacak donasi, dan export laporan keuangan dengan mudah di menu Keuangan.',
        icon: Wallet,
        color: 'bg-success-100 text-success-600',
    },
    {
        title: 'Jadwal Kegiatan',
        description: 'Atur jadwal kegiatan masjid, kajian rutin, dan kelola relawan dalam satu kalender terintegrasi.',
        icon: Calendar,
        color: 'bg-violet-100 text-violet-600',
    }
]

export default function DashboardTour() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('masjidos_tour_seen')
        if (!hasSeenTour) {
            // Add a small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleNext = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleClose()
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem('masjidos_tour_seen', 'true')
    }

    if (!isOpen) return null

    const StepIcon = TOUR_STEPS[currentStep].icon

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hiddenQl relative">
                {/*ZS Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Progress Bar */}
                <div className="h-1 bg-neutral-100 w-full">
                    <div
                        className="h-full bg-primary-600 transition-all duration-300 ease-out"
                        style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                    />
                </div>

                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${TOUR_STEPS[currentStep].color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 scale-100`}>
                        <StepIcon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h2 className="text-xl font-bold text-neutral-900 mb-3">
                        {TOUR_STEPS[currentStep].title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-8">
                        {TOUR_STEPS[currentStep].description}
                    </p>

                    {/* Actions */}
                    <button
                        onClick={handleNext}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                        {currentStep === TOUR_STEPS.length - 1 ? (
                            <>
                                Mulai Sekarang
                                <Check className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Lanjut
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {TOUR_STEPS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    idx === currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
