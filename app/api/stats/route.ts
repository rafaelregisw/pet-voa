import { NextResponse } from 'next/server'
import { incrementCounter, getCounter, cacheWrapper } from '@/lib/redis'

// Track page views
export async function POST(request: Request) {
  try {
    const { page } = await request.json()
    
    // Increment page view counter
    const views = await incrementCounter(`page_views:${page}`)
    
    // Increment total views
    await incrementCounter('total_views')
    
    return NextResponse.json({ 
      success: true, 
      views,
      message: 'View tracked successfully' 
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    )
  }
}

// Get stats
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  
  try {
    // Use cache wrapper for stats
    const stats = await cacheWrapper(
      'site_stats',
      async () => {
        const totalViews = await getCounter('total_views')
        const heroViews = await getCounter('page_views:hero')
        const videoViews = await getCounter('page_views:video')
        const processViews = await getCounter('page_views:process')
        const faqViews = await getCounter('page_views:faq')
        
        return {
          total: totalViews,
          pages: {
            hero: heroViews,
            video: videoViews,
            process: processViews,
            faq: faqViews
          },
          timestamp: new Date().toISOString()
        }
      },
      300 // Cache for 5 minutes
    )
    
    if (page) {
      const pageViews = await getCounter(`page_views:${page}`)
      return NextResponse.json({ 
        page, 
        views: pageViews,
        totalSiteViews: stats.total 
      })
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}