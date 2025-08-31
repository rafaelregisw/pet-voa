import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getMemoryCache } from '@/lib/memory-cache'

export async function GET() {
  try {
    const client = getRedisClient()
    const memCache = getMemoryCache()
    
    let redisStatus = {
      connected: false,
      host: 'Not connected',
      port: 0,
      memory: 'N/A',
      uptime: 'N/A',
      totalConnections: 0,
      totalCommands: 0,
      keys: 0,
      ping: 'Failed',
      error: null as string | null
    }
    
    // Tentar conectar no Redis
    if (client) {
      try {
        // Ping test
        const pingResult = await client.ping()
        redisStatus.ping = pingResult
        redisStatus.connected = true
        
        // Get Redis info
        const info = await client.info()
        const lines = info.split('\r\n')
        
        // Parse Redis info
        lines.forEach(line => {
          if (line.includes('used_memory_human:')) {
            redisStatus.memory = line.split(':')[1]
          }
          if (line.includes('uptime_in_seconds:')) {
            const seconds = parseInt(line.split(':')[1])
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            redisStatus.uptime = `${hours}h ${minutes}m`
          }
          if (line.includes('total_connections_received:')) {
            redisStatus.totalConnections = parseInt(line.split(':')[1])
          }
          if (line.includes('total_commands_processed:')) {
            redisStatus.totalCommands = parseInt(line.split(':')[1])
          }
        })
        
        // Count keys
        const keys = await client.keys('*')
        redisStatus.keys = keys.length
        
        // Get connection details
        const options = (client as any).options || {}
        redisStatus.host = options.host || 'redis'
        redisStatus.port = options.port || 6379
        
      } catch (error: any) {
        redisStatus.error = error.message
        redisStatus.connected = false
      }
    }
    
    // Memory cache stats
    const memoryStats = {
      size: memCache.size(),
      active: !redisStatus.connected,
      mode: redisStatus.connected ? 'Redis (Produção)' : 'Memória (Desenvolvimento)'
    }
    
    // Contadores
    const stats = {
      totalViews: 0,
      todayViews: 0,
      activeUsers: 0
    }
    
    if (client && redisStatus.connected) {
      try {
        const totalViews = await client.get('counter:total_views')
        const todayKey = `counter:views:${new Date().toISOString().split('T')[0]}`
        const todayViews = await client.get(todayKey)
        
        stats.totalViews = parseInt(totalViews || '0')
        stats.todayViews = parseInt(todayViews || '0')
        
        // Contar usuários ativos (últimos 5 minutos)
        const rateLimitKeys = await client.keys('rate_limit:*')
        stats.activeUsers = rateLimitKeys.length
      } catch (error) {
        console.error('Error getting stats:', error)
      }
    }
    
    return NextResponse.json({
      redis: redisStatus,
      memory: memoryStats,
      stats,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      redis: { connected: false },
      memory: { active: true, mode: 'Memória (Fallback)' },
      stats: { totalViews: 0, todayViews: 0, activeUsers: 0 },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}