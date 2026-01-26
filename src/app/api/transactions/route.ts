import { NextResponse } from 'next/server'
import { getTransactionsByTenant, getTransactionStats, createTransaction } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') as 'income' | 'expense' | null
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = parseInt(searchParams.get('offset') || '0')
        const stats = searchParams.get('stats') === 'true'

        if (stats) {
            const data = await getTransactionStats(DEMO_TENANT_ID)
            return NextResponse.json(data)
        }

        const transactions = await getTransactionsByTenant(DEMO_TENANT_ID, {
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
        const body = await request.json()
        const { type, amount, categoryId, description } = body

        if (!type || !amount || !categoryId || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const transaction = await createTransaction({
            tenantId: DEMO_TENANT_ID,
            type,
            amount,
            categoryId,
            description,
            createdBy: '22222222-2222-2222-2222-222222222222', // Demo admin user
        })

        return NextResponse.json(transaction, { status: 201 })
    } catch (error) {
        console.error('Error creating transaction:', error)
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
    }
}
