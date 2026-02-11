import { neon } from '@neondatabase/serverless'

// Helper function to check if we're in demo mode
/**
 * Checks if the application is running in Demo Mode.
 * This is determined by the `NEXT_PUBLIC_DEMO_MODE` environment variable.
 * @returns `true` if in demo mode, `false` otherwise.
 */
export function isDemoMode(): boolean {
    return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}

// Create a SQL client using Neon's serverless driver
// We use a proxy or a lazy initialization to avoid crashing if DATABASE_URL is missing 
// especially when in Demo Mode where the DB isn't actually used.
const sql = (strings: TemplateStringsArray, ...values: any[]) => {
    if (isDemoMode()) {
        console.warn('Database query attempted in Demo Mode. Returning empty result.')
        return Promise.resolve([])
    }

    const url = process.env.DATABASE_URL
    if (!url) {
        throw new Error('No database connection string was provided to `neon()`. Check your DATABASE_URL environment variable.')
    }

    const client = neon(url)
    return client(strings, ...values)
}

export { sql }
