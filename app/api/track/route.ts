import { NextResponse } from 'next/server'
import { trackPageView, trackUserActivity, checkRateLimit } from '@/lib/persistent-storage'

export async function POST(request: Request) {
  try {
    const { page, userId, timestamp } = await request.json()
    
    if (!page || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Verificar rate limit
    const { allowed, remaining } = await checkRateLimit(userId, 60, 60) // 60 requisições por minuto
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', remaining },
        { status: 429 }
      )
    }
    
    // Rastrear visita na página
    await trackPageView(page)
    
    // Rastrear atividade do usuário
    await trackUserActivity(userId)
    
    return NextResponse.json({
      success: true,
      message: 'Visit tracked successfully',
      remaining
    })
    
  } catch (error: any) {
    console.error('Erro ao rastrear visita:', error)
    return NextResponse.json(
      { error: 'Failed to track visit', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to track visits',
    example: {
      page: '/home',
      userId: 'user_123',
      timestamp: new Date().toISOString()
    }
  })
}