import { NextResponse } from 'next/server'
import { getAssetsByTenant } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET() {
    try {
        const assets = await getAssetsByTenant(DEMO_TENANT_ID)
        return NextResponse.json(assets)
    } catch (error) {
        console.error('Error fetching assets:', error)
        return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 })
    }
}
