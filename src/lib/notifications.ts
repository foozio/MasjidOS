import { Resend } from 'resend'

// Initialize Resend with API key from environment
// If no key is provided, the service will fallback to console logging (dev mode)
const resend = process.env.RESEND_API_KEY 
    ? new Resend(process.env.RESEND_API_KEY) 
    : null

type EmailPayload = {
    to: string
    subject: string
    html: string
    text?: string // Fallback plain text
}

/**
 * Sends an email notification using Resend or logs to console in dev mode.
 * @param payload - Email details (to, subject, html)
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: any }> {
    const { to, subject, html, text } = payload

    // 1. Dev Mode / No API Key: Log to console
    if (!resend) {
        console.log('---------------------------------------------------')
        console.log(`[Mock Email] To: ${to}`)
        console.log(`[Mock Email] Subject: ${subject}`)
        console.log(`[Mock Email] Body: ${text || html.substring(0, 100) + '...'}`)
        console.log('---------------------------------------------------')
        return { success: true, id: 'mock-email-id' }
    }

    // 2. Production Mode: Send via Resend
    try {
        const { data, error } = await resend.emails.send({
            from: 'MasjidOS <notifications@masjidos.com>', // Replace with verified domain
            to,
            subject,
            html,
            text,
        })

        if (error) {
            console.error('Resend API Error:', error)
            return { success: false, error }
        }

        return { success: true, id: data?.id }
    } catch (error) {
        console.error('Email sending failed:', error)
        return { success: false, error }
    }
}

/**
 * Sends a welcome email to a new user.
 */
export async function sendWelcomeEmail(email: string, name: string) {
    return sendEmail({
        to: email,
        subject: 'Selamat Datang di MasjidOS',
        html: `
            <h1>Assalamu'alaikum, ${name}!</h1>
            <p>Terima kasih telah bergabung dengan MasjidOS. Kami senang Anda di sini.</p>
            <p>Silakan login ke dashboard Anda untuk mulai mengelola masjid Anda.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login">Login Dashboard</a>
        `,
        text: `Assalamu'alaikum, ${name}! Terima kasih telah bergabung dengan MasjidOS. Login di: ${process.env.NEXT_PUBLIC_APP_URL}/login`
    })
}

/**
 * Sends a notification about a new donation.
 */
export async function sendDonationNotification(adminEmail: string, donationAmount: number, donorName: string) {
    const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(donationAmount)
    
    return sendEmail({
        to: adminEmail,
        subject: 'Donasi Baru Diterima',
        html: `
            <h2>Donasi Baru!</h2>
            <p>Anda telah menerima donasi sebesar <strong>${formattedAmount}</strong> dari ${donorName}.</p>
            <p>Cek detailnya di dashboard keuangan.</p>
        `,
        text: `Donasi Baru! Anda menerima ${formattedAmount} dari ${donorName}.`
    })
}
