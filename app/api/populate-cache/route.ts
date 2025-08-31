import { NextResponse } from 'next/server'
import { setCache, getCache, incrementCounter, trackPageView } from '@/lib/persistent-storage'

/**
 * Endpoint para popular o cache com dados de teste
 * Útil para demonstrar o funcionamento do cache
 */
export async function GET() {
  try {
    console.log('Populando cache com dados de teste...')
    
    // 1. Simular várias requisições de cache
    const testKeys = ['test1', 'test2', 'test3', 'homepage', 'api-data']
    
    for (const key of testKeys) {
      // Primeiro acesso (MISS)
      let cached = await getCache(key)
      if (!cached) {
        // Simula dados sendo salvos
        await setCache(key, { 
          content: `Dados de ${key}`,
          timestamp: Date.now() 
        }, 300) // 5 minutos de TTL
      }
      
      // Segundo acesso (HIT)
      cached = await getCache(key)
    }
    
    // 2. Simular visitas em páginas
    const pages = ['/', '/chat', '/performancedapagina']
    for (let i = 0; i < 5; i++) {
      for (const page of pages) {
        await trackPageView(page)
      }
    }
    
    // 3. Incrementar contadores
    await incrementCounter('total_views')
    await incrementCounter('total_views')
    await incrementCounter('total_views')
    
    // 4. Fazer mais alguns acessos ao cache para aumentar hits
    for (let i = 0; i < 10; i++) {
      await getCache('homepage')
      await getCache('api-data')
    }
    
    // Buscar estatísticas atuais
    const { getStats } = await import('@/lib/persistent-storage')
    const stats = await getStats()
    
    return NextResponse.json({
      success: true,
      message: 'Cache populado com sucesso!',
      stats: {
        totalViews: stats.totalViews,
        todayViews: stats.todayViews,
        cacheStats: stats.cacheStats,
        topPages: stats.topPages
      },
      instructions: 'Acesse /performancedapagina para ver as estatísticas'
    })
    
  } catch (error) {
    console.error('Erro ao popular cache:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao popular cache',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * POST para resetar o cache (útil para testes)
 */
export async function POST() {
  try {
    const { clearAllData } = await import('@/lib/persistent-storage')
    await clearAllData()
    
    return NextResponse.json({
      success: true,
      message: 'Cache resetado com sucesso!'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao resetar cache' },
      { status: 500 }
    )
  }
}