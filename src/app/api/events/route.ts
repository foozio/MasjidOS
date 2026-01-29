import { NextResponse } from 'next/server'
import { getEventsByTenant, createEvent } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
const CreateEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().max(2000).optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string().max(300).optional(),
    maxVolunteers: z.number().int().nonnegative().optional(),
}).refine(data => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
})

export async function GET(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const { searchParams } = new URL(request.url)
        const upcoming = searchParams.get('upcoming') === 'true'

        const events = await getEventsByTenant(auth.tenantId, upcoming)
        return NextResponse.json(events)
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const auth = await getAuthContext()
        if (!auth.isAuthenticated) return auth.response

        const body = await request.json()
        const validated = CreateEventSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validated.error.flatten() },
                { status: 400 }
            )
        }

        const { title, description, startDate, endDate, location, maxVolunteers } = validated.data

        const event = await createEvent({
            tenantId: auth.tenantId,
            title,
            description,
            startDate,
            endDate,
            location,
            maxVolunteers,
            createdBy: auth.userId,
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error('Error creating event:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }
}

