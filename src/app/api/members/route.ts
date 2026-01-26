import { NextResponse } from 'next/server'
import { getMembersByTenant } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET() {
    try {
        const members = await getMembersByTenant(DEMO_TENANT_ID)
        return NextResponse.json(members)
    } catch (error) {
        console.error('Error fetching members:', error)
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
    }
}
