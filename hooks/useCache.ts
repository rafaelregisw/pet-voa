'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface CacheOptions {
  ttl?: number // Time to live in seconds
  staleWhileRevalidate?: boolean // Serve stale data while fetching fresh
  retryOnError?: boolean
  onError?: (error: Error) => void
}

interface CacheState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  cached: boolean
  lastFetched: number | null
}

/**
 * React hook for cached API calls with built-in loading states
 */
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const {
    ttl = 300, // 5 minutes default
    staleWhileRevalidate = true,
    retryOnError = false,
    onError
  } = options

  const [state, setState] = useState<CacheState<T>>({
    data: null,
    loading: true,
    error: null,
    cached: false,
    lastFetched: null
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const retryCountRef = useRef(0)

  const fetchData = useCallback(async (isRetry = false) => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    
    if (!isRetry) {
      setState(prev => ({ 
        ...prev, 
        loading: !staleWhileRevalidate || !prev.data,
        error: null 
      }))
    }

    try {
      const response = await fetch(`/api/cache-proxy?key=${encodeURIComponent(key)}&ttl=${ttl}`, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Cache-Control': `max-age=${ttl}`,
        }
      })

      if (!response.ok) {
        throw new Error(`Cache fetch failed: ${response.statusText}`)
      }

      const result = await response.json()
      
      // If cached data exists, use it; otherwise call the fetcher
      let data: T
      let cached = false

      if (result.cached && result.data) {
        data = result.data
        cached = true
      } else {
        // Fallback to direct fetcher
        data = await fetcher()
        cached = false
      }

      setState({
        data,
        loading: false,
        error: null,
        cached,
        lastFetched: Date.now()
      })

      retryCountRef.current = 0

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return // Request was cancelled, don't update state
      }

      const errorObj = error instanceof Error ? error : new Error('Unknown error')
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorObj,
        cached: false
      }))

      if (onError) {
        onError(errorObj)
      }

      // Retry logic
      if (retryOnError && retryCountRef.current < 3) {
        retryCountRef.current++
        setTimeout(() => fetchData(true), Math.pow(2, retryCountRef.current) * 1000)
      }
    }
  }, [key, fetcher, ttl, staleWhileRevalidate, retryOnError, onError])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  const invalidate = useCallback(async () => {
    try {
      await fetch(`/api/cache-proxy?key=${encodeURIComponent(key)}`, {
        method: 'DELETE'
      })
      await fetchData()
    } catch (error) {
      console.error('Failed to invalidate cache:', error)
    }
  }, [key, fetchData])

  useEffect(() => {
    fetchData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    cached: state.cached,
    lastFetched: state.lastFetched,
    refetch,
    invalidate
  }
}

/**
 * Hook for preloading data without rendering
 */
export function usePreloadCache(key: string, fetcher: () => Promise<any>, options: CacheOptions = {}) {
  const { ttl = 300 } = options

  const preload = useCallback(async () => {
    try {
      // Just trigger the cache, don't wait for the result
      fetch(`/api/cache-proxy?key=${encodeURIComponent(key)}&ttl=${ttl}`, {
        headers: {
          'Cache-Control': `max-age=${ttl}`,
        }
      }).catch(error => {
        console.log('Background preload failed:', error)
      })
    } catch (error) {
      console.error('Preload error:', error)
    }
  }, [key, ttl])

  return { preload }
}

/**
 * Hook for cache statistics
 */
export function useCacheStats() {
  const [stats, setStats] = useState({
    hitRate: 0,
    totalRequests: 0,
    savedTime: 0,
    activeCacheItems: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/homepage-data?section=performance')
        if (response.ok) {
          const data = await response.json()
          setStats(data.realCacheStats || stats)
        }
      } catch (error) {
        console.error('Failed to fetch cache stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return stats
}