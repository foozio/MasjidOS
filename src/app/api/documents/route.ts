import { NextResponse } from 'next/server'
import { getDocumentsByTenant } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const documents = await getDocumentsByTenant(auth.tenantId, category || undefined)
        return NextResponse.json(documents)
    } catch (error) {
        console.error('Error fetching documents:', error)
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }
}
