import { NextResponse } from 'next/server'
import { preloadHomepageData, cacheMascotAnimations, getCachePerformance } from '@/lib/page-cache'
import { getStats } from '@/lib/persistent-storage'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const section = searchParams.get('section')
  const startTime = Date.now()

  try {
    if (section === 'mascot') {
      // Get cached mascot animation data
      const mascotData = await cacheMascotAnimations()
      const loadTime = Date.now() - startTime
      
      return NextResponse.json({
        ...mascotData,
        loadTime: `${loadTime}ms`,
        cached: true,
        source: 'persistent-cache'
      })
    }

    if (section === 'performance') {
      // Get cache performance data
      const perfData = await getCachePerformance()
      const realStats = await getStats()
      
      return NextResponse.json({
        performance: perfData,
        realCacheStats: realStats.cacheStats,
        loadTime: `${Date.now() - startTime}ms`
      })
    }

    // Get all homepage data
    const homepageData = await preloadHomepageData()
    const loadTime = Date.now() - startTime

    // Set aggressive caching headers for homepage data
    const response = NextResponse.json({
      ...homepageData,
      loadTime: `${loadTime}ms`,
      cached: true,
      cacheStrategy: 'persistent-storage-optimized'
    })

    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800')
    response.headers.set('X-Cache-Source', 'homepage-preload')
    response.headers.set('X-Load-Time', `${loadTime}ms`)

    return response

  } catch (error) {
    console.error('Error getting homepage data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get homepage data',
        timestamp: new Date().toISOString(),
        loadTime: `${Date.now() - startTime}ms`
      },
      { status: 500 }
    )
  }
}