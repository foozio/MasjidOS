'use server';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@/lib/db';
import { getUserMemberships } from '@/lib/queries';
import { revalidatePath } from 'next/cache';
import { TransactionSchema, EventSchema, DocumentSchema, AssetSchema } from '@/lib/validations';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    await signOut();
}

// Helper for auth context in actions
async function getActionContext() {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error('Unauthorized')
    }
    const memberships = await getUserMemberships(session.user.id)
    if (!memberships || memberships.length === 0) {
        throw new Error('No tenant membership found')
    }
    // Default to first tenant
    // Handle camel/snake case confusion if any, similar to api-utils
    const mem = memberships[0] as any
    const tenantId = mem.tenant_id || mem.tenantId
    return { userId: session.user.id, tenantId }
}

export async function createTransaction(formData: FormData) {
    try {
        const { userId, tenantId } = await getActionContext()

        const rawData = {
            amount: formData.get('amount'),
            type: formData.get('type'),
            categoryId: formData.get('categoryId'),
            description: formData.get('description'),
            date: formData.get('date'),
        }

        const validatedFields = TransactionSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: 'Invalid fields', details: validatedFields.error.flatten() }
        }

        const { amount, type, categoryId, description, date } = validatedFields.data

        await sql`
            INSERT INTO transactions (
                tenant_id, 
                category_id, 
                type, 
                amount, 
                description, 
                date, 
                created_by
            ) VALUES (
                ${tenantId}, 
                ${categoryId}, 
                ${type}, 
                ${amount}, 
                ${description}, 
                ${date}, 
                ${userId}
            )
        `

        revalidatePath('/dashboard/finance')
        return { success: true }
    } catch (error) {
        console.error('Failed to create transaction:', error)
        return { error: 'Failed to create transaction' }
    }
}

export async function createEvent(formData: FormData) {
    try {
        const { userId, tenantId } = await getActionContext()

        const rawData = {
            title: formData.get('title'),
            description: formData.get('description'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            maxVolunteers: formData.get('maxVolunteers'),
        }

        const validatedFields = EventSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: 'Invalid fields', details: validatedFields.error.flatten() }
        }

        const { title, description, startDate, endDate, maxVolunteers } = validatedFields.data

        await sql`
             INSERT INTO events (
                tenant_id,
                title,
                description,
                start_date,
                end_date,
                max_volunteers,
                created_by
            ) VALUES (
                ${tenantId},
                ${title},
                ${description},
                ${startDate},
                ${endDate},
                ${maxVolunteers},
                ${userId}
            )
        `

        revalidatePath('/dashboard/activities')
        return { success: true }
    } catch (error) {
        console.error('Failed to create event:', error)
        return { error: 'Failed to create event' }
    }
}

export async function createDocument(formData: FormData) {
    try {
        const { userId, tenantId } = await getActionContext()

        const rawData = {
            name: formData.get('name'),
            category: formData.get('category'),
            fileUrl: formData.get('fileUrl'),
            fileSize: formData.get('fileSize'),
        }

        const validatedFields = DocumentSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: 'Invalid fields', details: validatedFields.error.flatten() }
        }

        const { name, category, fileUrl, fileSize } = validatedFields.data

        await sql`
            INSERT INTO documents (
                tenant_id,
                name,
                category,
                file_url,
                file_size,
                uploaded_by
            ) VALUES (
                ${tenantId},
                ${name},
                ${category},
                ${fileUrl},
                ${fileSize},
                ${userId}
            )
        `

        revalidatePath('/dashboard/dokumen')
        return { success: true }
    } catch (error) {
        console.error('Failed to create document:', error)
        return { error: 'Failed to create document' }
    }
}

export async function createAsset(formData: FormData) {
    try {
        const { userId, tenantId } = await getActionContext()

        const rawData = {
            name: formData.get('name'),
            category: formData.get('category'),
            condition: formData.get('condition'),
            location: formData.get('location'),
            value: formData.get('value') || undefined,
            notes: formData.get('notes'),
            imageUrl: formData.get('imageUrl'),
        }

        const validatedFields = AssetSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: 'Invalid fields', details: validatedFields.error.flatten() }
        }

        const { name, category, condition, location, value, notes, imageUrl } = validatedFields.data

        await sql`
            INSERT INTO assets (
                tenant_id,
                name,
                category,
                condition,
                location,
                value,
                notes,
                image_url,
                created_by
            ) VALUES (
                ${tenantId},
                ${name},
                ${category},
                ${condition},
                ${location || null},
                ${value || 0},
                ${notes || null},
                ${imageUrl || null},
                ${userId}
            )
        `

        revalidatePath('/dashboard/inventaris')
        return { success: true }
    } catch (error) {
        console.error('Failed to create asset:', error)
        return { error: 'Failed to create asset' }
    }
}

export async function updateTenantLogo(formData: FormData) {
    try {
        const { tenantId } = await getActionContext()
        const logoUrl = formData.get('logoUrl')

        if (!logoUrl || typeof logoUrl !== 'string') {
            return { error: 'Invalid logo URL' }
        }

        await sql`
            UPDATE tenants 
            SET logo_url = ${logoUrl}
            WHERE id = ${tenantId}
        `

        revalidatePath('/dashboard/settings')
        revalidatePath('/dashboard') // Revalidate layout where logo might be shown
        return { success: true }
    } catch (error) {
        console.error('Failed to update logo:', error)
        return { error: 'Failed to update logo' }
    }
}
