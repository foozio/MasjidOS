import { NextResponse } from 'next/server'
import { getAuditLogsByTenant } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')

        const logs = await getAuditLogsByTenant(DEMO_TENANT_ID, limit)
        return NextResponse.json(logs)
    } catch (error) {
        console.error('Error fetching audit logs:', error)
        return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
    }
}
