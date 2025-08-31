import { NextResponse } from 'next/server'

// Cache simples em memória como fallback quando Redis não está disponível
const memoryCache = new Map<string, { data: any; expires: number }>()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json({ error: 'Key required' }, { status: 400 })
  }

  try {
    // Tenta usar Redis primeiro
    if (process.env.REDIS_URL) {
      const { getRedisClient } = await import('@/lib/redis')
      const redis = getRedisClient()
      const cached = await redis.get(key)
      if (cached) {
        return NextResponse.json({ data: JSON.parse(cached), source: 'redis' })
      }
    }
  } catch (error) {
    console.log('Redis not available, using memory cache')
  }

  // Fallback para cache em memória
  const cached = memoryCache.get(key)
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ data: cached.data, source: 'memory' })
  }

  return NextResponse.json({ data: null })
}

export async function POST(request: Request) {
  const { key, data, ttl = 3600 } = await request.json()

  if (!key || !data) {
    return NextResponse.json({ error: 'Key and data required' }, { status: 400 })
  }

  try {
    // Tenta usar Redis primeiro
    if (process.env.REDIS_URL) {
      const { getRedisClient } = await import('@/lib/redis')
      const redis = getRedisClient()
      await redis.setex(key, ttl, JSON.stringify(data))
      return NextResponse.json({ success: true, source: 'redis' })
    }
  } catch (error) {
    console.log('Redis not available, using memory cache')
  }

  // Fallback para cache em memória
  memoryCache.set(key, {
    data,
    expires: Date.now() + (ttl * 1000)
  })

  // Limpa cache expirado
  for (const [k, v] of memoryCache.entries()) {
    if (v.expires < Date.now()) {
      memoryCache.delete(k)
    }
  }

  return NextResponse.json({ success: true, source: 'memory' })
}