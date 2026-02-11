import { getAuthContext } from '@/lib/api-utils'
import { PRICING_PLANS } from '@/lib/constants'
import { getTenantById } from '@/lib/queries'
import { BillingView } from './billing-view'
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Billing & Langganan - MasjidOS',
}

export default async function BillingPage() {
    const auth = await getAuthContext()
    if (!auth.isAuthenticated) {
        redirect('/login')
    }

    const tenant = await getTenantById(auth.tenantId)
    if (!tenant) {
        redirect('/dashboard')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Billing & Langganan</h1>
                <p className="text-neutral-500">Kelola paket langganan dan metode pembayaran masjid Anda.</p>
            </div>

            <BillingView tenant={tenant} plans={PRICING_PLANS} />
        </div>
    )
}
