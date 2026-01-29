import { LRUCache } from 'lru-cache'

export type RateLimitResult = {
    success: boolean
    limit: number
    remaining: number
    reset: number
}

type RateLimiterOptions = {
    interval: number // in milliseconds
    uniqueTokenPerInterval: number
}

/**
 * Simple in-memory rate limiter using LRU cache
 * For production at scale, consider using @upstash/ratelimit with Redis
 */
export function createRateLimiter(options: RateLimiterOptions) {
    const tokenCache = new LRUCache<string, number[]>({
        max: options.uniqueTokenPerInterval,
        ttl: options.interval,
    })

    return {
        check: (limit: number, token: string): RateLimitResult => {
            const now = Date.now()
            const windowStart = now - options.interval

            const tokenCount = tokenCache.get(token) || []
            const validRequests = tokenCount.filter(timestamp => timestamp > windowStart)

            const currentUsage = validRequests.length
            const isRateLimited = currentUsage >= limit

            if (!isRateLimited) {
                validRequests.push(now)
                tokenCache.set(token, validRequests)
            }

            return {
                success: !isRateLimited,
                limit,
                remaining: Math.max(0, limit - currentUsage - 1),
                reset: windowStart + options.interval,
            }
        },
    }
}

// Pre-configured rate limiters for different use cases
export const apiRateLimiter = createRateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500,
})

export const authRateLimiter = createRateLimiter({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 100,
})
