import { NextResponse } from 'next/server'
import { getAuthContext } from '@/lib/api-utils'
import { PRICING_PLANS } from '@/lib/constants'
import { getTenantById } from '@/lib/queries'

export async function POST(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { planId } = await request.json()
        const plan = PRICING_PLANS.find(p => p.id === planId)

        if (!plan || plan.price === 0) {
            return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 })
        }

        const tenant = await getTenantById(auth.tenantId)
        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
        }

        const serverKey = process.env.MIDTRANS_SERVER_KEY
        const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'
        
        if (!serverKey) {
            console.error('MIDTRANS_SERVER_KEY is missing')
            // For demo purposes, if key is missing, return a dummy QR code
            return NextResponse.json({
                qr_url: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MasjidOS-Demo-Payment',
                expiry_time: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                order_id: `BILL-${Date.now()}`
            })
        }

        const midtransUrl = isProduction 
            ? 'https://api.midtrans.com/v2/charge' 
            : 'https://api.sandbox.midtrans.com/v2/charge'

        const authHeader = Buffer.from(`${serverKey}:`).toString('base64')

        const orderId = `BILL-${auth.tenantId.substring(0, 8)}-${Date.now()}`

        const response = await fetch(midtransUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authHeader}`
            },
            body: JSON.stringify({
                payment_type: 'gopay',
                transaction_details: {
                    order_id: orderId,
                    gross_amount: plan.price
                },
                gopay: {
                    enable_callback: true,
                    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing`
                },
                customer_details: {
                    first_name: tenant.name,
                    email: auth.userId // or tenant email if available
                }
            })
        })

        const data = await response.json()

        if (data.status_code !== '201') {
            console.error('Midtrans Error:', data)
            return NextResponse.json({ error: 'Midtrans API Error', details: data }, { status: 500 })
        }

        // Midtrans returns QR code URL in actions
        const qrisAction = data.actions.find((a: any) => a.name === 'generate-qr-code')

        return NextResponse.json({
            qr_url: qrisAction.url,
            expiry_time: data.expiry_time,
            order_id: orderId
        })

    } catch (error) {
        console.error('Billing API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
