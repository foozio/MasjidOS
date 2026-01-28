import { NextResponse } from 'next/server'
import { getDonationsByTenant, createDonation } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'
import { z } from 'zod'

const CreateDonationSchema = z.object({
    donorName: z.string().max(255).optional(),
    donorEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
    amount: z.number().positive('Amount must be positive'),
    isAnonymous: z.boolean().optional().default(false),
    message: z.string().max(1000).optional(),
})

export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')

        const donations = await getDonationsByTenant(auth.tenantId, limit)
        return NextResponse.json(donations)
    } catch (error) {
        console.error('Error fetching donations:', error)
        return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const body = await request.json()
        const validated = CreateDonationSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validated.error.flatten() },
                { status: 400 }
            )
        }

        const { donorName, donorEmail, amount, isAnonymous, message } = validated.data

        const donation = await createDonation({
            tenantId: auth.tenantId,
            donorName: isAnonymous ? undefined : donorName,
            donorEmail: isAnonymous ? undefined : (donorEmail || undefined),
            amount,
            isAnonymous,
            message,
        })

        return NextResponse.json(donation, { status: 201 })
    } catch (error) {
        console.error('Error creating donation:', error)
        return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 })
    }
}
