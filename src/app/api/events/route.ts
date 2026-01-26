import { NextResponse } from 'next/server'
import { getEventsByTenant, createEvent } from '@/lib/queries'
import { getAuthContext } from '@/lib/api-utils'

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
        const { title, description, startDate, endDate, location, maxVolunteers } = body

        if (!title || !startDate || !endDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const event = await createEvent({
            tenantId: auth.tenantId,
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
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
