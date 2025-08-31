import { NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/persistent-storage'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key') || 'test-data'
  const forceNew = searchParams.get('force') === 'true'
  
  const startTime = Date.now()
  
  // Tentar buscar do cache primeiro
  if (!forceNew) {
    const cached = await getCache(key)
    if (cached) {
      const loadTime = Date.now() - startTime
      return NextResponse.json({
        source: 'cache',
        data: cached,
        loadTime: `${loadTime}ms`,
        message: '⚡ Dados servidos do cache! Super rápido!'
      })
    }
  }
  
  // Simular busca de dados (demora mais)
  await new Promise(resolve => setTimeout(resolve, 100)) // Simula latência de banco
  
  const data = {
    timestamp: new Date().toISOString(),
    randomValue: Math.random(),
    message: 'Dados frescos do banco de dados',
    expensiveCalculation: Array.from({ length: 100 }, (_, i) => i * Math.random())
  }
  
  // Salvar no cache para próximas requisições
  await setCache(key, data, 60) // Cache por 60 segundos
  
  const loadTime = Date.now() - startTime
  
  return NextResponse.json({
    source: 'database',
    data,
    loadTime: `${loadTime}ms`,
    message: '🐌 Dados buscados do banco (mais lento). Próxima vez será do cache!'
  })
}