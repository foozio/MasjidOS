import { NextResponse } from 'next/server'
import { getEventsByTenant, createEvent } from '@/lib/queries'

const DEMO_TENANT_ID = '11111111-1111-1111-1111-111111111111'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const upcoming = searchParams.get('upcoming') === 'true'

        const events = await getEventsByTenant(DEMO_TENANT_ID, upcoming)
        return NextResponse.json(events)
    } catch (error) {
        console.error('Error fetching events:', error)
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { title, description, startDate, endDate, location, maxVolunteers } = body

        if (!title || !startDate || !endDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const event = await createEvent({
            tenantId: DEMO_TENANT_ID,
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            location,
            maxVolunteers,
            createdBy: '22222222-2222-2222-2222-222222222222',
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error('Error creating event:', error)
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }
}
