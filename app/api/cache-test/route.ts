import { NextResponse } from 'next/server'
import { preloadHomepageData, cacheMascotAnimations, getCachePerformance } from '@/lib/page-cache'
import { getStats, getCache, setCache } from '@/lib/persistent-storage'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const test = searchParams.get('test') || 'all'
  
  const startTime = Date.now()
  const results: any = {
    timestamp: new Date().toISOString(),
    test: test,
    results: {}
  }

  try {
    if (test === 'all' || test === 'basic') {
      console.log('🧪 Testing basic cache operations...')
      
      // Test basic cache set/get
      const testKey = 'cache_test_' + Date.now()
      const testData = { test: true, value: Math.random() }
      
      await setCache(testKey, testData, 60)
      const retrieved = await getCache(testKey)
      
      results.results.basicCache = {
        success: JSON.stringify(retrieved) === JSON.stringify(testData),
        data: retrieved,
        expected: testData
      }
    }

    if (test === 'all' || test === 'homepage') {
      console.log('🧪 Testing homepage data cache...')
      
      const homepageData = await preloadHomepageData()
      results.results.homepageData = {
        success: !!homepageData,
        hasTestimonials: !!homepageData.testimonials,
        hasStats: !!homepageData.stats,
        hasServices: !!homepageData.services,
        hasFaq: !!homepageData.faq,
        loadTime: homepageData.loadTime
      }
    }

    if (test === 'all' || test === 'mascot') {
      console.log('🧪 Testing mascot animations cache...')
      
      const mascotData = await cacheMascotAnimations()
      results.results.mascotAnimations = {
        success: !!mascotData,
        hasAnimations: !!mascotData.animations,
        animationCount: Object.keys(mascotData.animations || {}).length,
        hasPreloadImages: !!mascotData.preloadImages,
        imageCount: (mascotData.preloadImages || []).length
      }
    }

    if (test === 'all' || test === 'stats') {
      console.log('🧪 Testing stats and performance...')
      
      const stats = await getStats()
      const performance = await getCachePerformance()
      
      results.results.stats = {
        success: !!stats,
        totalViews: stats.totalViews,
        todayViews: stats.todayViews,
        cacheStats: stats.cacheStats
      }
      
      results.results.performance = {
        success: !!performance,
        hitRate: performance.hitRate,
        avgResponseTime: performance.avgResponseTime,
        totalRequests: performance.totalRequests
      }
    }

    if (test === 'all' || test === 'stress') {
      console.log('🧪 Running stress test...')
      
      const stressResults = []
      const iterations = 10
      
      for (let i = 0; i < iterations; i++) {
        const key = `stress_test_${i}`
        const data = { iteration: i, timestamp: Date.now(), data: Array(100).fill(Math.random()) }
        
        const setStart = Date.now()
        await setCache(key, data, 300)
        const setTime = Date.now() - setStart
        
        const getStart = Date.now()
        const retrieved = await getCache(key)
        const getTime = Date.now() - getStart
        
        stressResults.push({
          iteration: i,
          setTime,
          getTime,
          success: JSON.stringify(retrieved) === JSON.stringify(data)
        })
      }
      
      const avgSetTime = stressResults.reduce((sum, r) => sum + r.setTime, 0) / iterations
      const avgGetTime = stressResults.reduce((sum, r) => sum + r.getTime, 0) / iterations
      const successRate = stressResults.filter(r => r.success).length / iterations
      
      results.results.stress = {
        iterations,
        avgSetTime: Math.round(avgSetTime),
        avgGetTime: Math.round(avgGetTime),
        successRate: Math.round(successRate * 100),
        details: stressResults.slice(0, 3) // Include first 3 for debugging
      }
    }

    const totalTime = Date.now() - startTime
    results.totalTime = `${totalTime}ms`
    results.success = true

    console.log(`✅ Cache tests completed in ${totalTime}ms`)

    return NextResponse.json(results)

  } catch (error) {
    console.error('❌ Cache test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      totalTime: `${Date.now() - startTime}ms`
    }, { status: 500 })
  }
}