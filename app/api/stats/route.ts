import { NextResponse } from 'next/server'
import { incrementCounter, getCounter, trackPageView, getStats } from '@/lib/persistent-storage'
import { cacheWrapper } from '@/lib/page-cache'

// Track page views
export async function POST(request: Request) {
  try {
    const { page } = await request.json()
    
    // Track page view using persistent storage
    await trackPageView(page)
    
    // Get updated view count
    const views = await getCounter(`page_views_${page}`)
    
    return NextResponse.json({ 
      success: true, 
      views,
      message: 'View tracked successfully',
      cached: false
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    )
  }
}

// Get stats with caching
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  
  try {
    // Use cache wrapper for expensive stats calculation
    const stats = await cacheWrapper(
      'site_stats_v2',
      async () => {
        const fullStats = await getStats()
        
        return {
          total: fullStats.totalViews,
          todayViews: fullStats.todayViews,
          activeUsers: fullStats.activeUsers,
          pages: fullStats.pageViews,
          topPages: fullStats.topPages,
          cacheStats: fullStats.cacheStats,
          timestamp: new Date().toISOString()
        }
      },
      { ttl: 300 } // Cache for 5 minutes
    )
    
    if (page) {
      const pageViews = stats.pages[page] || 0
      return NextResponse.json({ 
        page, 
        views: pageViews,
        totalSiteViews: stats.total,
        cached: true
      })
    }
    
    // Add cache headers for better performance
    const response = NextResponse.json(stats)
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60')
    response.headers.set('X-Cache-Source', 'persistent-storage')
    
    return response
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}