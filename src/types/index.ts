// Types for MasjidOS

// ============ Core Types ============

export interface User {
    id: string
    email: string
    fullName: string
    avatarUrl?: string
    createdAt: Date
}

export interface Tenant {
    id: string
    name: string
    slug: string
    logoUrl?: string
    address?: string
    phone?: string
    plan: 'free' | 'basic' | 'pro' | 'enterprise'
    settings: TenantSettings
    createdAt: Date
}

export interface TenantSettings {
    currency: string
    timezone: string
    donationPublicEnabled: boolean
    requireApproval: boolean
}

export interface Membership {
    id: string
    userId: string
    tenantId: string
    roleId: string
    status: 'invited' | 'active' | 'inactive'
    invitedAt?: Date
    joinedAt?: Date
}

export interface Role {
    id: string
    name: string
    permissions: Permission[]
    isSystem: boolean
}

export type Permission =
    | 'manage_tenants'
    | 'manage_billing'
    | 'manage_members'
    | 'full_finance'
    | 'view_finance'
    | 'manage_events'
    | 'view_events'
    | 'manage_announcements'
    | 'manage_inventory'
    | 'manage_documents'
    | 'view_audit_logs'

// ============ Feature Types ============

export interface Transaction {
    id: string
    tenantId: string
    type: 'income' | 'expense'
    amount: number
    categoryId: string
    description: string
    attachmentUrl?: string
    approvedBy?: string
    createdBy: string
    createdAt: Date
}

export interface Category {
    id: string
    tenantId: string
    name: string
    type: 'income' | 'expense'
    icon: string
    color: string
}

export interface DonationRecord {
    id: string
    tenantId: string
    donorName?: string
    amount: number
    isAnonymous: boolean
    message?: string
    createdAt: Date
}

export interface Event {
    id: string
    tenantId: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    location?: string
    maxVolunteers?: number
    volunteers: string[]
    createdBy: string
    createdAt: Date
}

export interface Announcement {
    id: string
    tenantId: string
    title: string
    content: string
    isPublic: boolean
    publishedAt?: Date
    createdBy: string
    createdAt: Date
}

export interface Asset {
    id: string
    tenantId: string
    name: string
    category: string
    condition: 'excellent' | 'good' | 'fair' | 'poor'
    location: string
    purchaseDate?: Date
    value?: number
    notes?: string
    createdAt: Date
}

export interface Document {
    id: string
    tenantId: string
    name: string
    category: 'notulen' | 'proposal' | 'report' | 'photo' | 'other'
    fileUrl: string
    fileSize: number
    uploadedBy: string
    createdAt: Date
}

export interface AuditLog {
    id: string
    tenantId: string
    userId: string
    action: 'create' | 'update' | 'delete'
    entityType: string
    entityId: string
    oldValues?: Record<string, unknown>
    newValues?: Record<string, unknown>
    ipAddress?: string
    createdAt: Date
}

// ============ UI Types ============

export interface NavItem {
    label: string
    href: string
    icon: string
    permissions?: Permission[]
}

export interface KPIData {
    label: string
    value: string | number
    change?: number
    changeLabel?: string
    icon: string
    color: 'primary' | 'success' | 'warning' | 'error'
}

export interface TableColumn<T> {
    key: keyof T | string
    label: string
    render?: (value: unknown, row: T) => React.ReactNode
    sortable?: boolean
    className?: string
}
