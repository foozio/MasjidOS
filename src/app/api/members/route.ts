import { NextResponse } from 'next/server'
import { getMembersByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export async function GET() {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const members = await getMembersByTenant(auth.tenantId)
        return NextResponse.json(members)
    } catch (error) {
        console.error('Error fetching members:', error)
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
    }
}
