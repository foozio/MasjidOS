import { Bot, Context, webhookCallback } from 'grammy'

// Initialize bot - only create if token exists
const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
    console.warn('TELEGRAM_BOT_TOKEN not set - Telegram bot disabled')
}

export const bot = token ? new Bot(token) : null

// Bot commands setup
if (bot) {
    // /start - Welcome and register user
    bot.command('start', async (ctx: Context) => {
        const chatId = ctx.chat?.id
        const username = ctx.from?.username || ctx.from?.first_name || 'User'

        await ctx.reply(
            `🕌 *Assalamu'alaikum, ${username}!*\n\n` +
            `Selamat datang di MasjidOS Bot.\n\n` +
            `Bot ini akan mengirimkan:\n` +
            `📅 Pengingat kegiatan masjid\n` +
            `💰 Konfirmasi donasi\n` +
            `📢 Pengumuman penting\n\n` +
            `Gunakan /help untuk melihat daftar perintah.`,
            { parse_mode: 'Markdown' }
        )

        // Registration will be handled by the webhook route
        console.log(`New user started bot: ${chatId} - ${username}`)
    })

    // /stop - Unsubscribe
    bot.command('stop', async (ctx: Context) => {
        await ctx.reply(
            `👋 Anda telah berhenti berlangganan notifikasi.\n\n` +
            `Ketik /start kapan saja untuk berlangganan kembali.`
        )
    })

    // /events - List upcoming events
    bot.command('events', async (ctx: Context) => {
        // Will be enhanced to fetch real events
        await ctx.reply(
            `📅 *Kegiatan Mendatang*\n\n` +
            `Untuk melihat kegiatan lengkap, kunjungi dashboard MasjidOS Anda.`,
            { parse_mode: 'Markdown' }
        )
    })

    // /help - Show available commands
    bot.command('help', async (ctx: Context) => {
        await ctx.reply(
            `🔧 *Daftar Perintah*\n\n` +
            `/start - Mulai berlangganan notifikasi\n` +
            `/stop - Berhenti berlangganan\n` +
            `/events - Lihat kegiatan mendatang\n` +
            `/help - Tampilkan bantuan ini`,
            { parse_mode: 'Markdown' }
        )
    })

    // Handle unknown commands
    bot.on('message:text', async (ctx: Context) => {
        await ctx.reply(
            `Maaf, perintah tidak dikenali.\n` +
            `Ketik /help untuk melihat daftar perintah.`
        )
    })
}

// Webhook callback for Next.js API route
export const handleUpdate = bot ? webhookCallback(bot, 'std/http') : null

// Export bot info helper
export function isBotEnabled(): boolean {
    return bot !== null
}
