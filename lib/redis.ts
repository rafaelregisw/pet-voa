import Redis from 'ioredis'

// Redis client singleton
let redis: Redis | null = null

/**
 * Get Redis client instance
 * Uses environment variables for configuration
 * Defaults to localhost:6379 for local development
 */
export function getRedisClient(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
      reconnectOnError(err) {
        const targetError = 'READONLY'
        if (err.message.includes(targetError)) {
          // Only reconnect when the error contains "READONLY"
          return true
        }
        return false
      },
    })

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })

    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error)
    })
  }

  return redis
}

/**
 * Cache wrapper with TTL support
 */
export async function cacheWrapper<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600 // Default 1 hour
): Promise<T> {
  const client = getRedisClient()
  
  try {
    // Try to get from cache
    const cached = await client.get(key)
    if (cached) {
      console.log(`📦 Cache hit for key: ${key}`)
      return JSON.parse(cached)
    }
    
    // Fetch fresh data
    console.log(`🔄 Cache miss for key: ${key}, fetching...`)
    const data = await fetcher()
    
    // Store in cache with TTL
    await client.setex(key, ttl, JSON.stringify(data))
    
    return data
  } catch (error) {
    console.error('Cache error:', error)
    // Fallback to fetcher if Redis fails
    return await fetcher()
  }
}

/**
 * Rate limiter using Redis
 */
export async function rateLimiter(
  identifier: string,
  limit: number = 10,
  window: number = 60 // seconds
): Promise<{ allowed: boolean; remaining: number }> {
  const client = getRedisClient()
  const key = `rate_limit:${identifier}`
  
  try {
    const current = await client.incr(key)
    
    if (current === 1) {
      await client.expire(key, window)
    }
    
    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current)
    }
  } catch (error) {
    console.error('Rate limiter error:', error)
    // Allow request if Redis fails
    return { allowed: true, remaining: limit }
  }
}

/**
 * Session storage
 */
export async function setSession(sessionId: string, data: any, ttl: number = 86400) {
  const client = getRedisClient()
  const key = `session:${sessionId}`
  
  try {
    await client.setex(key, ttl, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Session storage error:', error)
    return false
  }
}

export async function getSession(sessionId: string) {
  const client = getRedisClient()
  const key = `session:${sessionId}`
  
  try {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Session retrieval error:', error)
    return null
  }
}

export async function deleteSession(sessionId: string) {
  const client = getRedisClient()
  const key = `session:${sessionId}`
  
  try {
    await client.del(key)
    return true
  } catch (error) {
    console.error('Session deletion error:', error)
    return false
  }
}

/**
 * Simple counter
 */
export async function incrementCounter(name: string): Promise<number> {
  const client = getRedisClient()
  const key = `counter:${name}`
  
  try {
    const value = await client.incr(key)
    return value
  } catch (error) {
    console.error('Counter error:', error)
    return 0
  }
}

/**
 * Get counter value
 */
export async function getCounter(name: string): Promise<number> {
  const client = getRedisClient()
  const key = `counter:${name}`
  
  try {
    const value = await client.get(key)
    return value ? parseInt(value, 10) : 0
  } catch (error) {
    console.error('Counter retrieval error:', error)
    return 0
  }
}

/**
 * Clean up Redis connection
 */
export async function closeRedis() {
  if (redis) {
    await redis.quit()
    redis = null
    console.log('🔌 Redis connection closed')
  }
}