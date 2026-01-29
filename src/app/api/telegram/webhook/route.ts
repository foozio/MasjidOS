import { NextResponse } from 'next/server'
import { handleUpdate, isBotEnabled } from '@/lib/telegram'

export async function POST(request: Request) {
    if (!isBotEnabled()) {
        return NextResponse.json(
            { error: 'Telegram bot not configured' },
            { status: 503 }
        )
    }

    try {
        // Grammy's webhookCallback handles the update
        return await handleUpdate!(request)
    } catch (error) {
        console.error('Telegram webhook error:', error)
        return NextResponse.json(
            { error: 'Failed to process update' },
            { status: 500 }
        )
    }
}

// Telegram sends GET to verify webhook
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        bot_enabled: isBotEnabled(),
    })
}
