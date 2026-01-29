import { NextResponse } from 'next/server'
import { getCategoriesByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') as 'income' | 'expense' | null

        const categories = await getCategoriesByTenant(auth.tenantId, type || undefined)
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}
