#!/usr/bin/env node

/**
 * Cache Performance Test Script
 * Tests the Pet Voa caching system performance
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function testEndpoint(url, name) {
  console.log(`\n🧪 Testing ${name}...`)
  
  const times = []
  const iterations = 5
  
  for (let i = 0; i < iterations; i++) {
    const start = Date.now()
    
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        headers: {
          'User-Agent': 'Cache-Performance-Test',
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      const time = Date.now() - start
      times.push(time)
      
      const cached = response.headers.get('x-cache-source') || 
                    response.headers.get('x-cache-strategy') ||
                    (data.cached ? 'cached' : 'fresh')
      
      console.log(`  Request ${i + 1}: ${time}ms (${cached})`)
      
      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.log(`  Request ${i + 1}: FAILED - ${error.message}`)
      times.push(Infinity)
    }
  }
  
  const validTimes = times.filter(t => t !== Infinity)
  const avgTime = validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length
  const minTime = Math.min(...validTimes)
  const maxTime = Math.max(...validTimes)
  
  console.log(`  📊 Average: ${avgTime.toFixed(1)}ms, Min: ${minTime}ms, Max: ${maxTime}ms`)
  
  return {
    name,
    avgTime: avgTime.toFixed(1),
    minTime,
    maxTime,
    successRate: (validTimes.length / iterations) * 100
  }
}

async function runPerformanceTests() {
  console.log('🚀 Pet Voa Cache Performance Test')
  console.log('=' .repeat(50))
  console.log(`Base URL: ${baseUrl}`)
  
  const tests = [
    { url: '/api/stats', name: 'Stats API' },
    { url: '/api/homepage-data', name: 'Homepage Data' },
    { url: '/api/homepage-data?section=mascot', name: 'Mascot Animations' },
    { url: '/api/homepage-data?section=performance', name: 'Cache Performance' },
    { url: '/api/test-cache', name: 'Test Cache Endpoint' },
    { url: '/api/cache-test?test=basic', name: 'Basic Cache Test' },
  ]
  
  const results = []
  
  for (const test of tests) {
    const result = await testEndpoint(test.url, test.name)
    results.push(result)
  }
  
  console.log('\n📈 Performance Summary')
  console.log('=' .repeat(50))
  
  results.forEach(result => {
    const status = result.successRate === 100 ? '✅' : '⚠️'
    console.log(`${status} ${result.name.padEnd(25)} ${result.avgTime}ms avg (${result.successRate}% success)`)
  })
  
  const overallAvg = results.reduce((sum, r) => sum + parseFloat(r.avgTime), 0) / results.length
  console.log(`\n🎯 Overall Average Response Time: ${overallAvg.toFixed(1)}ms`)
  
  // Test cache effectiveness
  console.log('\n🔍 Cache Effectiveness Test')
  console.log('=' .repeat(30))
  
  // First request (should be slow - cache miss)
  const firstStart = Date.now()
  await fetch(`${baseUrl}/api/test-cache?key=performance-test&force=true`)
  const firstTime = Date.now() - firstStart
  
  // Second request (should be fast - cache hit)
  const secondStart = Date.now()
  await fetch(`${baseUrl}/api/test-cache?key=performance-test`)
  const secondTime = Date.now() - secondStart
  
  const improvement = ((firstTime - secondTime) / firstTime * 100).toFixed(1)
  
  console.log(`First request (cache miss): ${firstTime}ms`)
  console.log(`Second request (cache hit): ${secondTime}ms`)
  console.log(`Performance improvement: ${improvement}% faster`)
  
  if (improvement > 50) {
    console.log('🎉 Excellent cache performance!')
  } else if (improvement > 20) {
    console.log('👍 Good cache performance!')
  } else {
    console.log('⚠️ Cache performance could be improved')
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  runPerformanceTests().catch(error => {
    console.error('❌ Performance test failed:', error)
    process.exit(1)
  })
}

module.exports = { runPerformanceTests, testEndpoint }