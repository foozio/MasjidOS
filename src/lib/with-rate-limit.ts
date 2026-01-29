import { NextResponse } from 'next/server'
import { apiRateLimiter, authRateLimiter } from '@/lib/rate-limit'

export type RateLimitConfig = {
    limit: number
    type?: 'api' | 'auth'
}

/**
 * Rate limiting wrapper for API route handlers
 * @param handler - The API route handler function
 * @param config - Rate limit configuration
 */
export function withRateLimit<T>(
    handler: (request: Request) => Promise<NextResponse<T>>,
    config: RateLimitConfig = { limit: 60, type: 'api' }
) {
    return async (request: Request): Promise<NextResponse<T | { error: string }>> => {
        // Get identifier - use IP or fallback to a header
        const forwarded = request.headers.get('x-forwarded-for')
        const ip = forwarded?.split(',')[0]?.trim() || 'anonymous'

        const limiter = config.type === 'auth' ? authRateLimiter : apiRateLimiter
        const result = limiter.check(config.limit, ip)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': result.limit.toString(),
                        'X-RateLimit-Remaining': result.remaining.toString(),
                        'X-RateLimit-Reset': result.reset.toString(),
                        'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
                    },
                }
            )
        }

        const response = await handler(request)

        // Add rate limit headers to successful responses
        response.headers.set('X-RateLimit-Limit', result.limit.toString())
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
        response.headers.set('X-RateLimit-Reset', result.reset.toString())

        return response
    }
}
