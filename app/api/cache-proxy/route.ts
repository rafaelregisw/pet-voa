import { NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/persistent-storage'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  const ttl = parseInt(searchParams.get('ttl') || '300')

  if (!key) {
    return NextResponse.json(
      { error: 'Cache key is required' },
      { status: 400 }
    )
  }

  try {
    const cached = await getCache(key)
    
    if (cached) {
      return NextResponse.json({
        cached: true,
        data: cached,
        key,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      cached: false,
      key,
      message: 'Cache miss - use fallback fetcher',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Cache proxy error:', error)
    return NextResponse.json(
      { error: 'Cache operation failed', cached: false },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  const ttl = parseInt(searchParams.get('ttl') || '300')

  if (!key) {
    return NextResponse.json(
      { error: 'Cache key is required' },
      { status: 400 }
    )
  }

  try {
    const { data } = await request.json()
    
    await setCache(key, data, ttl)
    
    return NextResponse.json({
      success: true,
      key,
      ttl,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Cache set error:', error)
    return NextResponse.json(
      { error: 'Failed to set cache' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json(
      { error: 'Cache key is required' },
      { status: 400 }
    )
  }

  try {
    // Set cache to null with 0 TTL to effectively delete it
    await setCache(key, null, 0)
    
    return NextResponse.json({
      success: true,
      key,
      message: 'Cache invalidated',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Cache invalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to invalidate cache' },
      { status: 500 }
    )
  }
}