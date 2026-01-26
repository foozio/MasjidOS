import { NextResponse } from 'next/server'
import { getCategoriesByTenant } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') as 'income' | 'expense' | null

        const categories = await getCategoriesByTenant(DEMO_TENANT_ID, type || undefined)
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}
