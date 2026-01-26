import { neon } from '@neondatabase/serverless'

// Create a SQL client using Neon's serverless driver
const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Helper types for database queries
export type QueryResult<T> = T[]

// Helper function to check if we're in demo mode
export function isDemoMode(): boolean {
    return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}
