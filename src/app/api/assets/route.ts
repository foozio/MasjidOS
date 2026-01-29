import { NextResponse } from 'next/server'
import { getAssetsByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export async function GET() {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const assets = await getAssetsByTenant(auth.tenantId)
        return NextResponse.json(assets)
    } catch (error) {
        console.error('Error fetching assets:', error)
        return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 })
    }
}
