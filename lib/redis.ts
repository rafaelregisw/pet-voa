import Redis from 'ioredis'
import { memoryCacheWrapper, memoryRateLimiter, incrementMemoryCounter, getMemoryCounter } from './memory-cache'

// Redis client singleton
let redis: Redis | null = null
let isRedisAvailable = false

/**
 * Get Redis client instance
 * Uses environment variables for configuration
 * Defaults to localhost:6379 for local development
 */
export function getRedisClient(): Redis | null {
  if (!redis && process.env.REDIS_URL) {
    const redisUrl = process.env.REDIS_URL
    
    try {
      redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy(times) {
          if (times > 3) {
            console.log('⚠️ Redis not available, using memory cache')
            isRedisAvailable = false
            return null
          }
          const delay = Math.min(times * 50, 2000)
          return delay
        },
        reconnectOnError(err) {
          const targetError = 'READONLY'
          if (err.message.includes(targetError)) {
            return true
          }
          return false
        },
      })

      redis.on('connect', () => {
        console.log('✅ Redis connected successfully (Coolify)')
        isRedisAvailable = true
      })

      redis.on('error', (error) => {
        console.log('⚠️ Redis not available, using memory cache fallback')
        isRedisAvailable = false
      })
    } catch (error) {
      console.log('💾 Using memory cache (Redis will be available in production)')
      isRedisAvailable = false
    }
  }

  return isRedisAvailable ? redis : null
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
  
  // Use Redis if available, otherwise use memory cache
  if (client && isRedisAvailable) {
    try {
      // Try to get from cache
      const cached = await client.get(key)
      if (cached) {
        console.log(`🚀 Redis cache hit for key: ${key}`)
        return JSON.parse(cached)
      }
      
      // Fetch fresh data
      console.log(`🔄 Redis cache miss for key: ${key}, fetching...`)
      const data = await fetcher()
      
      // Store in cache with TTL
      await client.setex(key, ttl, JSON.stringify(data))
      
      return data
    } catch (error) {
      // Fallback to memory cache if Redis fails
      return memoryCacheWrapper(key, fetcher, ttl)
    }
  } else {
    // Use memory cache fallback
    return memoryCacheWrapper(key, fetcher, ttl)
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
  
  if (client && isRedisAvailable) {
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
      // Fallback to memory rate limiter
      return memoryRateLimiter(identifier, limit, window)
    }
  } else {
    // Use memory rate limiter
    return memoryRateLimiter(identifier, limit, window)
  }
}

/**
 * Session storage
 */
export async function setSession(sessionId: string, data: any, ttl: number = 86400) {
  const client = getRedisClient()
  
  if (!client || !isRedisAvailable) {
    // Use memory cache for sessions in development
    return false
  }
  
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
  
  if (!client || !isRedisAvailable) {
    return null
  }
  
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
  
  if (!client || !isRedisAvailable) {
    return false
  }
  
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
  
  if (client && isRedisAvailable) {
    const key = `counter:${name}`
    
    try {
      const value = await client.incr(key)
      return value
    } catch (error) {
      // Fallback to memory counter
      return incrementMemoryCounter(name)
    }
  } else {
    // Use memory counter
    return incrementMemoryCounter(name)
  }
}

/**
 * Get counter value
 */
export async function getCounter(name: string): Promise<number> {
  const client = getRedisClient()
  
  if (client && isRedisAvailable) {
    const key = `counter:${name}`
    
    try {
      const value = await client.get(key)
      return value ? parseInt(value, 10) : 0
    } catch (error) {
      // Fallback to memory counter
      return getMemoryCounter(name)
    }
  } else {
    // Use memory counter
    return getMemoryCounter(name)
  }
}

/**
 * Clean up Redis connection
 */
export async function closeRedis() {
  if (redis && isRedisAvailable) {
    await redis.quit()
    redis = null
    isRedisAvailable = false
    console.log('🔌 Redis connection closed')
  }
}