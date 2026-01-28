import { auth } from '@/auth'
import { getUserMemberships } from '@/lib/queries'
import { NextResponse } from 'next/server'

export type AuthContext = {
    userId: string
    tenantId: string
    isAuthenticated: true
}

export async function getAuthContext(): Promise<
    | { isAuthenticated: false; response: NextResponse }
    | { isAuthenticated: true; userId: string; tenantId: string; response?: undefined }
> {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return {
                isAuthenticated: false,
                response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
            }
        }

        // Get user's tenant
        const memberships = await getUserMemberships(session.user.id)

        if (!memberships || memberships.length === 0) {
            // If user has no tenant, maybe they are a new user?
            // For MVP, we require membership.
            return {
                isAuthenticated: false,
                response: NextResponse.json({ error: 'No tenant membership found' }, { status: 403 }),
            }
        }
        // Default to first tenant for MVP
        const membership = memberships[0] as Record<string, unknown>
        const tenantId = (membership.tenant_id || membership.tenantId) as string // Handle camel/snake case mix if any

        return {
            isAuthenticated: true,
            userId: session.user.id,
            tenantId: tenantId,
        }
    } catch (error) {
        console.error('Auth context error:', error)
        return {
            isAuthenticated: false,
            response: NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
        }
    }
}
