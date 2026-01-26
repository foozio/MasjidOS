import { NextResponse } from 'next/server'
import { getAnnouncementsByTenant } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const publicOnly = searchParams.get('public') === 'true'

        const announcements = await getAnnouncementsByTenant(DEMO_TENANT_ID, publicOnly)
        return NextResponse.json(announcements)
    } catch (error) {
        console.error('Error fetching announcements:', error)
        return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
    }
}
