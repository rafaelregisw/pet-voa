/**
 * Simple in-memory cache for when Redis is not available
 * This provides basic caching functionality for development and fallback
 */

interface CacheEntry {
  data: any
  expiry: number
}

class MemoryCache {
  private cache: Map<string, CacheEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Cleanup expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
  }

  /**
   * Set a value in cache with TTL
   */
  set(key: string, value: any, ttlSeconds: number = 3600): void {
    const expiry = Date.now() + (ttlSeconds * 1000)
    this.cache.set(key, { data: value, expiry })
  }

  /**
   * Get a value from cache
   */
  get(key: string): any | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Destroy the cache and cleanup
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.cache.clear()
  }
}

// Singleton instance
let memoryCache: MemoryCache | null = null

export function getMemoryCache(): MemoryCache {
  if (!memoryCache) {
    memoryCache = new MemoryCache()
    console.log('📦 Memory cache initialized')
  }
  return memoryCache
}

/**
 * Cache wrapper with memory fallback
 */
export async function memoryCacheWrapper<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cache = getMemoryCache()
  
  try {
    // Try to get from cache
    const cached = cache.get(key)
    if (cached !== null) {
      console.log(`💾 Memory cache hit for key: ${key}`)
      return cached
    }
    
    // Fetch fresh data
    console.log(`🔄 Memory cache miss for key: ${key}, fetching...`)
    const data = await fetcher()
    
    // Store in cache
    cache.set(key, data, ttl)
    
    return data
  } catch (error) {
    console.error('Memory cache error:', error)
    // Fallback to fetcher if cache fails
    return await fetcher()
  }
}

/**
 * Simple counter in memory
 */
const counters = new Map<string, number>()

export function incrementMemoryCounter(name: string): number {
  const current = counters.get(name) || 0
  const newValue = current + 1
  counters.set(name, newValue)
  return newValue
}

export function getMemoryCounter(name: string): number {
  return counters.get(name) || 0
}

/**
 * Rate limiter in memory
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function memoryRateLimiter(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)
  
  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + (windowSeconds * 1000)
    })
    return { allowed: true, remaining: limit - 1 }
  }
  
  // Existing window
  entry.count++
  const allowed = entry.count <= limit
  const remaining = Math.max(0, limit - entry.count)
  
  return { allowed, remaining }
}