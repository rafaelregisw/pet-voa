'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTracker() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Gerar ou recuperar ID único do usuário
    let userId = localStorage.getItem('userId')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('userId', userId)
    }
    
    // Rastrear visita na página
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            userId,
            timestamp: new Date().toISOString()
          })
        })
      } catch (error) {
        console.error('Erro ao rastrear visita:', error)
      }
    }
    
    trackVisit()
    
    // Atualizar atividade a cada 30 segundos
    const interval = setInterval(trackVisit, 30000)
    
    return () => clearInterval(interval)
  }, [pathname])
  
  return null
}