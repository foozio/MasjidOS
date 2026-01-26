import { NextResponse } from 'next/server'
import { getDonationsByTenant, createDonation } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')

        const donations = await getDonationsByTenant(DEMO_TENANT_ID, limit)
        return NextResponse.json(donations)
    } catch (error) {
        console.error('Error fetching donations:', error)
        return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { donorName, donorEmail, amount, isAnonymous, message } = body

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        const donation = await createDonation({
            tenantId: DEMO_TENANT_ID,
            donorName: isAnonymous ? null : donorName,
            donorEmail: isAnonymous ? null : donorEmail,
            amount,
            isAnonymous: isAnonymous || false,
            message,
        })

        return NextResponse.json(donation, { status: 201 })
    } catch (error) {
        console.error('Error creating donation:', error)
        return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 })
    }
}
