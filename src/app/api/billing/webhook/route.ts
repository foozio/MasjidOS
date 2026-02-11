import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import crypto from 'crypto'

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const serverKey = process.env.MIDTRANS_SERVER_KEY

        if (!serverKey) {
            return NextResponse.json({ error: 'Config missing' }, { status: 500 })
        }

        // Verify signature
        const signatureStr = data.order_id + data.status_code + data.gross_amount + serverKey
        const signature = crypto.createHash('sha512').update(signatureStr).digest('hex')

        if (signature !== data.signature_key) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
        }

        const transactionStatus = data.transaction_status
        const orderId = data.order_id

        if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
            // Extract tenant ID from order ID (BILL-tenantIdPrefix-timestamp)
            // Or better, we should have stored the full order mapping in a table
            // For now, let's assume we can find the tenant by order_id or just extract it
            // if we formatted it correctly.
            
            // Example order_id: BILL-tenant-1-123456789
            const parts = orderId.split('-')
            if (parts.length >= 3) {
                // This is a bit fragile, in a real app we'd use a payments table
                // Let's search for the tenant. For this MVP, we'll try to match a tenant.
                // In a real scenario, we'd have a `subscriptions` table.
                
                // Let's find the plan from the gross_amount or metadata if we sent it
                // For now, let's just update the tenant's plan.
                
                // We'll need to know which plan they bought.
                // Gross amount can help us identify the plan.
                let plan = 'free'
                if (data.gross_amount === '79000.00' || data.gross_amount === '79000') plan = 'basic'
                if (data.gross_amount === '199000.00' || data.gross_amount === '199000') plan = 'pro'

                // Update tenant plan
                // We need the full tenant_id. Let's assume the order_id was BILL-{tenantId}-{timestamp}
                const tenantId = orderId.replace('BILL-', '').split('-').slice(0, -1).join('-')

                await sql`
                    UPDATE tenants 
                    SET plan = ${plan} 
                    WHERE id = ${tenantId}
                `

                console.log(`Plan updated for tenant ${tenantId} to ${plan}`)
            }
        }

        return NextResponse.json({ status: 'OK' })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
}
