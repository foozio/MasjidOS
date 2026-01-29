import { NextResponse } from 'next/server'
import { getTransactionsByTenant, getTransactionStats, createTransaction } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'
import { withRateLimit } from '@/lib/with-rate-limit'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
const CreateTransactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive('Amount must be positive'),
    categoryId: z.string().uuid('Invalid category ID'),
    description: z.string().min(1, 'Description is required').max(500),
})

async function handleGET(request: Request) {
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

async function handlePOST(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const body = await request.json()
        const validated = CreateTransactionSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validated.error.flatten() },
                { status: 400 }
            )
        }

        const { type, amount, categoryId, description } = validated.data

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

// Apply rate limiting: 60 requests per minute
export const GET = withRateLimit(handleGET, { limit: 60 })
export const POST = withRateLimit(handlePOST, { limit: 30 })

