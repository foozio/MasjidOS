import { bot } from './telegram'
import { getTelegramSubscriptions } from './queries'

type Event = {
    id: string
    title: string
    description?: string | null
    startDate: Date
    location?: string | null
}

type Donation = {
    id: string
    donorName?: string | null
    amount: number
    isAnonymous?: boolean
    message?: string | null
}

/**
 * Send event reminder to all subscribed chats
 */
export async function sendEventReminder(tenantId: string, event: Event): Promise<void> {
    if (!bot) {
        console.warn('Telegram bot not configured - skipping notification')
        return
    }

    try {
        const subscriptions = await getTelegramSubscriptions(tenantId)

        const message =
            `📅 *Pengingat Kegiatan*\n\n` +
            `*${event.title}*\n` +
            `${event.description ? `${event.description}\n\n` : '\n'}` +
            `🕐 ${formatDate(event.startDate)}\n` +
            `${event.location ? `📍 ${event.location}` : ''}`

        for (const sub of subscriptions) {
            if (sub.notification_types?.includes('events') && sub.is_active) {
                try {
                    await bot.api.sendMessage(sub.chat_id, message, {
                        parse_mode: 'Markdown',
                    })
                } catch (err) {
                    console.error(`Failed to send to chat ${sub.chat_id}:`, err)
                }
            }
        }
    } catch (error) {
        console.error('Error sending event reminder:', error)
    }
}

/**
 * Send donation receipt to all subscribed chats
 */
export async function sendDonationReceipt(tenantId: string, donation: Donation): Promise<void> {
    if (!bot) {
        console.warn('Telegram bot not configured - skipping notification')
        return
    }

    try {
        const subscriptions = await getTelegramSubscriptions(tenantId)

        const donorDisplay = donation.isAnonymous ? 'Hamba Allah' : (donation.donorName || 'Donatur')
        const message =
            `💰 *Donasi Diterima*\n\n` +
            `Terima kasih kepada *${donorDisplay}* atas donasi sebesar:\n` +
            `*Rp ${formatCurrency(donation.amount)}*\n` +
            `${donation.message ? `\n💬 "${donation.message}"` : ''}\n\n` +
            `Jazakallahu khairan! 🤲`

        for (const sub of subscriptions) {
            if (sub.notification_types?.includes('donations') && sub.is_active) {
                try {
                    await bot.api.sendMessage(sub.chat_id, message, {
                        parse_mode: 'Markdown',
                    })
                } catch (err) {
                    console.error(`Failed to send to chat ${sub.chat_id}:`, err)
                }
            }
        }
    } catch (error) {
        console.error('Error sending donation receipt:', error)
    }
}

/**
 * Send announcement to all subscribed chats
 */
export async function sendAnnouncement(tenantId: string, title: string, content: string): Promise<void> {
    if (!bot) return

    try {
        const subscriptions = await getTelegramSubscriptions(tenantId)

        const message = `📢 *${title}*\n\n${content}`

        for (const sub of subscriptions) {
            if (sub.is_active) {
                try {
                    await bot.api.sendMessage(sub.chat_id, message, {
                        parse_mode: 'Markdown',
                    })
                } catch (err) {
                    console.error(`Failed to send to chat ${sub.chat_id}:`, err)
                }
            }
        }
    } catch (error) {
        console.error('Error sending announcement:', error)
    }
}

// Helper functions
function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(date)
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID').format(amount)
}
