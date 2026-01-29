import { sql, isDemoMode } from './db'
import {
    demoTenant,
    demoCategories,
    demoTransactions,
    demoDonations,
    demoEvents,
    demoAnnouncements,
    demoAssets,
    demoDocuments,
    demoMembers,
    demoAuditLogs
} from './data'

// ============================================
// TENANTS
// ============================================
export async function getTenantBySlug(slug: string) {
    if (isDemoMode()) {
        return demoTenant.slug === slug ? demoTenant : null
    }

    const result = await sql`
    SELECT * FROM tenants WHERE slug = ${slug}
  `
    return result[0] || null
}

export async function getTenantById(id: string) {
    if (isDemoMode()) {
        return demoTenant.id === id ? demoTenant : null
    }

    const result = await sql`
    SELECT * FROM tenants WHERE id = ${id}
  `
    return result[0] || null
}

// ============================================
// USERS & MEMBERSHIPS
// ============================================
export async function getUserByEmail(email: string) {
    if (isDemoMode()) {
        const member = demoMembers.find(m => m.user.email === email)
        return member ? member.user : null
    }

    const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
    return result[0] || null
}

export async function getMembershipByUserAndTenant(userId: string, tenantId: string) {
    if (isDemoMode()) {
        return demoMembers.find(m => m.userId === userId && m.tenantId === tenantId) || null
    }

    const result = await sql`
    SELECT m.*, r.name as role_name, r.permissions
    FROM memberships m
    JOIN roles r ON m.role_id = r.id
    WHERE m.user_id = ${userId} AND m.tenant_id = ${tenantId}
  `
    return result[0] || null
}

export async function getUserMemberships(userId: string) {
    if (isDemoMode()) {
        return demoMembers.filter(m => m.userId === userId)
    }

    const result = await sql`
    SELECT m.*, r.name as role_name, r.permissions
    FROM memberships m
    JOIN roles r ON m.role_id = r.id
    WHERE m.user_id = ${userId}
  `
    return result
}

export async function getMembersByTenant(tenantId: string) {
    if (isDemoMode()) {
        return demoMembers.filter(m => m.tenantId === tenantId)
    }

    const result = await sql`
    SELECT m.*, u.email, u.full_name, u.avatar_url, r.name as role_name
    FROM memberships m
    JOIN users u ON m.user_id = u.id
    JOIN roles r ON m.role_id = r.id
    WHERE m.tenant_id = ${tenantId}
    ORDER BY m.created_at DESC
  `
    return result
}

// ============================================
// CATEGORIES
// ============================================
export async function getCategoriesByTenant(tenantId: string, type?: 'income' | 'expense') {
    if (isDemoMode()) {
        return type
            ? demoCategories.filter(c => c.type === type)
            : demoCategories
    }

    if (type) {
        const result = await sql`
      SELECT * FROM categories 
      WHERE tenant_id = ${tenantId} AND type = ${type}
      ORDER BY name ASC
    `
        return result
    }

    const result = await sql`
    SELECT * FROM categories 
    WHERE tenant_id = ${tenantId}
    ORDER BY name ASC
  `
    return result
}

// ============================================
// TRANSACTIONS
// ============================================
export async function getTransactionsByTenant(
    tenantId: string,
    options?: {
        type?: 'income' | 'expense'
        limit?: number
        offset?: number
    }
) {
    if (isDemoMode()) {
        let txs = [...demoTransactions]
        if (options?.type) {
            txs = txs.filter(t => t.type === options.type)
        }
        if (options?.limit) {
            txs = txs.slice(options.offset || 0, (options.offset || 0) + options.limit)
        }
        return txs
    }

    const limit = options?.limit || 50
    const offset = options?.offset || 0

    if (options?.type) {
        const result = await sql`
      SELECT t.*, c.name as category_name, c.color as category_color
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.tenant_id = ${tenantId} AND t.type = ${options.type}
      ORDER BY t.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
        return result
    }

    const result = await sql`
    SELECT t.*, c.name as category_name, c.color as category_color
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.tenant_id = ${tenantId}
    ORDER BY t.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
    return result
}

export async function createTransaction(data: {
    tenantId: string
    type: 'income' | 'expense'
    amount: number
    categoryId: string
    description: string
    createdBy: string
}) {
    const result = await sql`
    INSERT INTO transactions (tenant_id, type, amount, category_id, description, created_by)
    VALUES (${data.tenantId}, ${data.type}, ${data.amount}, ${data.categoryId}, ${data.description}, ${data.createdBy})
    RETURNING *
  `
    return result[0]
}

export async function getTransactionStats(tenantId: string) {
    if (isDemoMode()) {
        const income = demoTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
        const expense = demoTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        return { income, expense, balance: income - expense }
    }

    const result = await sql`
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expense
    FROM transactions
    WHERE tenant_id = ${tenantId}
  `
    const { income, expense } = result[0] as { income: number; expense: number }
    return { income, expense, balance: income - expense }
}

// ============================================
// DONATIONS
// ============================================
export async function getDonationsByTenant(tenantId: string, limit?: number) {
    if (isDemoMode()) {
        return limit ? demoDonations.slice(0, limit) : demoDonations
    }

    const result = await sql`
    SELECT * FROM donations
    WHERE tenant_id = ${tenantId}
    ORDER BY created_at DESC
    LIMIT ${limit || 50}
  `
    return result
}

export async function createDonation(data: {
    tenantId: string
    donorName?: string
    donorEmail?: string
    amount: number
    isAnonymous?: boolean
    message?: string
}) {
    const result = await sql`
    INSERT INTO donations (tenant_id, donor_name, donor_email, amount, is_anonymous, message)
    VALUES (${data.tenantId}, ${data.donorName || null}, ${data.donorEmail || null}, ${data.amount}, ${data.isAnonymous || false}, ${data.message || null})
    RETURNING *
  `
    return result[0]
}

// ============================================
// EVENTS
// ============================================
export async function getEventsByTenant(tenantId: string, upcoming?: boolean) {
    if (isDemoMode()) {
        if (upcoming) {
            return demoEvents.filter(e => e.startDate >= new Date()).sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        }
        return demoEvents
    }

    if (upcoming) {
        const result = await sql`
      SELECT * FROM events
      WHERE tenant_id = ${tenantId} AND start_date >= NOW()
      ORDER BY start_date ASC
    `
        return result
    }

    const result = await sql`
    SELECT * FROM events
    WHERE tenant_id = ${tenantId}
    ORDER BY start_date DESC
  `
    return result
}

export async function createEvent(data: {
    tenantId: string
    title: string
    description?: string
    startDate: Date
    endDate: Date
    location?: string
    maxVolunteers?: number
    createdBy: string
}) {
    const result = await sql`
    INSERT INTO events (tenant_id, title, description, start_date, end_date, location, max_volunteers, created_by)
    VALUES (${data.tenantId}, ${data.title}, ${data.description || null}, ${data.startDate.toISOString()}, ${data.endDate.toISOString()}, ${data.location || null}, ${data.maxVolunteers || null}, ${data.createdBy})
    RETURNING *
  `
    return result[0]
}

// ============================================
// ANNOUNCEMENTS
// ============================================
export async function getAnnouncementsByTenant(tenantId: string, publicOnly?: boolean) {
    if (isDemoMode()) {
        return publicOnly
            ? demoAnnouncements.filter(a => a.isPublic)
            : demoAnnouncements
    }

    if (publicOnly) {
        const result = await sql`
      SELECT * FROM announcements
      WHERE tenant_id = ${tenantId} AND is_public = true
      ORDER BY created_at DESC
    `
        return result
    }

    const result = await sql`
    SELECT * FROM announcements
    WHERE tenant_id = ${tenantId}
    ORDER BY created_at DESC
  `
    return result
}

// ============================================
// ASSETS
// ============================================
export async function getAssetsByTenant(tenantId: string) {
    if (isDemoMode()) {
        return demoAssets
    }

    const result = await sql`
    SELECT * FROM assets
    WHERE tenant_id = ${tenantId}
    ORDER BY name ASC
  `
    return result
}

// ============================================
// DOCUMENTS
// ============================================
export async function getDocumentsByTenant(tenantId: string, category?: string) {
    if (isDemoMode()) {
        return category
            ? demoDocuments.filter(d => d.category === category)
            : demoDocuments
    }

    if (category) {
        const result = await sql`
      SELECT * FROM documents
      WHERE tenant_id = ${tenantId} AND category = ${category}
      ORDER BY created_at DESC
    `
        return result
    }

    const result = await sql`
    SELECT * FROM documents
    WHERE tenant_id = ${tenantId}
    ORDER BY created_at DESC
  `
    return result
}

// ============================================
// AUDIT LOGS
// ============================================
export async function getAuditLogsByTenant(tenantId: string, limit?: number) {
    if (isDemoMode()) {
        return limit ? demoAuditLogs.slice(0, limit) : demoAuditLogs
    }

    const result = await sql`
    SELECT al.*, u.full_name as user_name
    FROM audit_logs al
    JOIN users u ON al.user_id = u.id
    WHERE al.tenant_id = ${tenantId}
    ORDER BY al.created_at DESC
    LIMIT ${limit || 50}
  `
    return result
}

export async function createAuditLog(data: {
    tenantId: string
    userId: string
    action: 'create' | 'update' | 'delete'
    entityType: string
    entityId: string
    oldValues?: object
    newValues?: object
}) {
    const result = await sql`
    INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, old_values, new_values)
    VALUES (${data.tenantId}, ${data.userId}, ${data.action}, ${data.entityType}, ${data.entityId}, ${JSON.stringify(data.oldValues || null)}, ${JSON.stringify(data.newValues || null)})
    RETURNING *
  `
    return result[0]
}

// ============================================
// TELEGRAM SUBSCRIPTIONS
// ============================================
export type TelegramSubscription = {
    id: string
    tenant_id: string
    chat_id: number
    username?: string
    notification_types: string[]
    is_active: boolean
    created_at: Date
}

export async function getTelegramSubscriptions(tenantId: string): Promise<TelegramSubscription[]> {
    if (isDemoMode()) {
        return [] // No demo subscriptions
    }

    const result = await sql`
    SELECT * FROM telegram_subscriptions
    WHERE tenant_id = ${tenantId} AND is_active = true
  `
    return result as TelegramSubscription[]
}

export async function addTelegramSubscription(data: {
    tenantId: string
    chatId: number
    username?: string
}): Promise<TelegramSubscription | null> {
    if (isDemoMode()) {
        return null
    }

    const result = await sql`
    INSERT INTO telegram_subscriptions (tenant_id, chat_id, username)
    VALUES (${data.tenantId}, ${data.chatId}, ${data.username || null})
    ON CONFLICT (chat_id) DO UPDATE SET
      is_active = true,
      updated_at = NOW()
    RETURNING *
  `
    return result[0] as TelegramSubscription
}

export async function removeTelegramSubscription(chatId: number): Promise<void> {
    if (isDemoMode()) {
        return
    }

    await sql`
    UPDATE telegram_subscriptions
    SET is_active = false, updated_at = NOW()
    WHERE chat_id = ${chatId}
  `
}

export async function getTelegramSubscriptionByChatId(chatId: number): Promise<TelegramSubscription | null> {
    if (isDemoMode()) {
        return null
    }

    const result = await sql`
    SELECT * FROM telegram_subscriptions
    WHERE chat_id = ${chatId}
  `
    return (result[0] as TelegramSubscription) || null
}
