import { NextResponse } from 'next/server'
import { getTransactionsByTenant, getTransactionStats, createTransaction } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') as 'income' | 'expense' | null
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = parseInt(searchParams.get('offset') || '0')
        const stats = searchParams.get('stats') === 'true'

        if (stats) {
            const data = await getTransactionStats(auth.tenantId)
            return NextResponse.json(data)
        }

        const transactions = await getTransactionsByTenant(auth.tenantId, {
            type: type || undefined,
            limit,
            offset,
        })

        return NextResponse.json(transactions)
    } catch (error) {
        console.error('Error fetching transactions:', error)
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const body = await request.json()
        const { type, amount, categoryId, description } = body

        if (!type || !amount || !categoryId || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const transaction = await createTransaction({
            tenantId: auth.tenantId,
            type,
            amount,
            categoryId,
            description,
            createdBy: auth.userId,
        })

        return NextResponse.json(transaction, { status: 201 })
    } catch (error) {
        console.error('Error creating transaction:', error)
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
    }
}
