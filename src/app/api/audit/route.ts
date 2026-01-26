import { NextResponse } from 'next/server'
import { getAuditLogsByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')

        const logs = await getAuditLogsByTenant(auth.tenantId, limit)
        return NextResponse.json(logs)
    } catch (error) {
        console.error('Error fetching audit logs:', error)
        return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
    }
}
