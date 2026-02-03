import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge' // Assuming you might want to use twMerge, but for now sticking to clsx as per existing code, or better:
// Actually the existing code just imports clsx.
// Let's stick to the existing implementation but add docs.

/**
 * Merges class names and resolves conflicts.
 * @param inputs - List of class names or conditional class objects.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

/**
 * Formats a number into a currency string (default: IDR).
 * @param amount - The numerical amount to format.
 * @param currency - The currency code (default: 'IDR').
 * @returns Formatted currency string (e.g., "Rp 10.000").
 */
export function formatCurrency(amount: number, currency = 'IDR'): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Formats a date into a long string representation (Indonesian locale).
 * @param date - The date object or string to format.
 * @param options - Optional Intl.DateTimeFormatOptions to override defaults.
 * @returns Formatted date string (e.g., "24 Januari 2026").
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...options,
    }).format(d)
}

/**
 * Formats a date into a short date and time string (Indonesian locale).
 * @param date - The date object or string to format.
 * @returns Formatted string (e.g., "24 Jan 2026 14:30").
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d)
}

/**
 * Returns a relative time string (e.g., "5 minutes ago") from the current time.
 * @param date - The date to compare against now.
 * @returns Relative time string in Indonesian.
 */
export function formatRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 7) return formatDate(d)
    if (days > 0) return `${days} hari yang lalu`
    if (hours > 0) return `${hours} jam yang lalu`
    if (minutes > 0) return `${minutes} menit yang lalu`
    return 'Baru saja'
}

/**
 * Converts a string into a URL-friendly slug.
 * @param text - The text to slugify.
 * @returns Lowercase, hyphen-separated string with special characters removed.
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

/**
 * Truncates a string to a maximum length and appends ellipsis.
 * @param str - The string to truncate.
 * @param length - Maximum length before truncation.
 * @returns Truncated string ending with '...' if length exceeded.
 */
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.slice(0, length) + '...'
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns String with first letter uppercase.
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Extracts initials from a name (max 2 characters).
 * @param name - The full name.
 * @returns Uppercase initials (e.g., "Nuzli Latief" -> "NL").
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

/**
 * Generates a random alphanumeric ID string.
 * @returns Random ID string.
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
}
