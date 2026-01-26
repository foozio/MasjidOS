import { NextResponse } from 'next/server'
import { getAnnouncementsByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const publicOnly = searchParams.get('public') === 'true'

        const announcements = await getAnnouncementsByTenant(auth.tenantId, publicOnly)
        return NextResponse.json(announcements)
    } catch (error) {
        console.error('Error fetching announcements:', error)
        return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
    }
}
