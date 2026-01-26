'use client'

import { useState } from 'react'
import {
    Calendar,
    Plus,
    MapPin,
    Clock,
    Users,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    X
} from 'lucide-react'
import { demoEvents } from '@/lib/data'
import { formatDate, cn } from '@/lib/utils'
import { Event } from '@/types'

// Calendar View Component
function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const getEventsForDate = (day: number) => {
        return demoEvents.filter(e => {
            const eventDate = new Date(e.startDate)
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
        })
    }

    return (
        <div className="card">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex gap-1">
                    <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-lg">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-lg">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-neutral-500 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Days of month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const events = getEventsForDate(day)
                        const isToday = new Date().getDate() === day &&
                            new Date().getMonth() === currentDate.getMonth() &&
                            new Date().getFullYear() === currentDate.getFullYear()

                        return (
                            <div
                                key={day}
                                className={cn(
                                    'aspect-square p-1 rounded-lg text-center relative cursor-pointer hover:bg-neutral-50 transition-colors',
                                    isToday && 'bg-primary-50 ring-1 ring-primary-200'
                                )}
                            >
                                <span className={cn(
                                    'text-sm',
                                    isToday ? 'font-bold text-primary-700' : 'text-neutral-700'
                                )}>
                                    {day}
                                </span>
                                {events.length > 0 && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                        {events.slice(0, 2).map((_, idx) => (
                                            <div key={idx} className="w-1 h-1 rounded-full bg-primary-500" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Event Card Component
function EventCard({ event }: { event: Event }) {
    const isPast = event.endDate < new Date()
    const volunteerCount = event.volunteers.length
    const spotsLeft = event.maxVolunteers ? event.maxVolunteers - volunteerCount : null

    return (
        <div className={cn(
            'card p-4 transition-opacity',
            isPast && 'opacity-60'
        )}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                    {/* Date Badge */}
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary-700">
                            {event.startDate.getDate()}
                        </span>
                        <span className="text-xs text-primary-600 uppercase">
                            {event.startDate.toLocaleDateString('id-ID', { month: 'short' })}
                        </span>
                    </div>

                    {/* Event Details */}
                    <div>
                        <h3 className="font-semibold text-neutral-900">{event.title}</h3>
                        <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {event.startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {event.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {event.location}
                                </span>
                            )}
                            {event.maxVolunteers && (
                                <span className="flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5" />
                                    {volunteerCount}/{event.maxVolunteers} relawan
                                    {spotsLeft !== null && spotsLeft > 0 && (
                                        <span className="text-primary-600">({spotsLeft} slot tersisa)</span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <button className="p-1 hover:bg-neutral-100 rounded-lg flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Belum Ada Kegiatan</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Tambahkan kegiatan seperti pengajian, kajian, atau gotong royong untuk dikelola dan dipantau.
            </p>
            <button onClick={onAdd} className="btn-primary">
                <Plus className="w-4 h-4" />
                Tambah Kegiatan Pertama
            </button>
        </div>
    )
}

// Add Event Modal
function AddEventModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxVolunteers: '',
    })

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900">Tambah Kegiatan</h2>
                    <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Judul Kegiatan *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input"
                            placeholder="Contoh: Pengajian Akbar Bulanan"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Deskripsi</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input min-h-[80px] resize-none"
                            placeholder="Jelaskan detail kegiatan..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tanggal *</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Waktu *</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="input"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Lokasi</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="input"
                            placeholder="Contoh: Aula Utama"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kuota Relawan</label>
                        <input
                            type="number"
                            value={formData.maxVolunteers}
                            onChange={(e) => setFormData({ ...formData, maxVolunteers: e.target.value })}
                            className="input"
                            placeholder="Kosongkan jika tidak perlu relawan"
                        />
                    </div>

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

// Main Kegiatan Page
export default function KegiatanPage() {
    const [showAddModal, setShowAddModal] = useState(false)

    const upcomingEvents = demoEvents
        .filter(e => e.startDate >= new Date())
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    const pastEvents = demoEvents
        .filter(e => e.endDate < new Date())
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Kegiatan</h1>
                    <p className="text-neutral-500 mt-1">Kelola jadwal kegiatan dan pendaftaran relawan</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Tambah Kegiatan
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-1">
                    <CalendarView />
                </div>

                {/* Events List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Upcoming Events */}
                    <div>
                        <h2 className="font-semibold text-neutral-900 mb-4">Kegiatan Mendatang</h2>
                        {upcomingEvents.length === 0 ? (
                            <EmptyState onAdd={() => setShowAddModal(true)} />
                        ) : (
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <div>
                            <h2 className="font-semibold text-neutral-500 mb-4">Kegiatan Selesai</h2>
                            <div className="space-y-3">
                                {pastEvents.slice(0, 3).map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Event Modal */}
            <AddEventModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        </div>
    )
}
