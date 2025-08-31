'use client'

import { useState, useEffect } from 'react'

export default function SimpleLiveIndicator() {
  const [viewers, setViewers] = useState(18)
  const [showNotification, setShowNotification] = useState(false)
  const [city, setCity] = useState('São Paulo')
  
  const cities = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Goiânia', 'Curitiba']

  // Atualiza viewers ocasionalmente
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(8, Math.min(32, prev + change))
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Mostra notificação ocasional
  useEffect(() => {
    const showVisitor = () => {
      setCity(cities[Math.floor(Math.random() * cities.length)])
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 4000)
    }

    const timer = setTimeout(showVisitor, 12000)
    const interval = setInterval(showVisitor, 45000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Desktop indicator */}
      <div className="fixed top-20 left-4 z-30 hidden md:block">
        <div className="glass-dark rounded-xl p-3 border border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-ice">{viewers} pessoas online</span>
          </div>
        </div>
      </div>

      {/* Mobile - super simples */}
      <div className="fixed top-14 left-2 z-30 md:hidden">
        <div className="bg-midnight/90 backdrop-blur rounded px-2 py-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-xs text-ice/80">{viewers} online</span>
          </div>
        </div>
      </div>

      {/* Notificação mobile - super discreta */}
      {showNotification && (
        <div className="fixed bottom-20 inset-x-4 z-40 md:hidden">
          <div className="bg-midnight/95 backdrop-blur rounded-lg p-2 text-center">
            <p className="text-xs text-ice/70">
              Alguém de {city} está navegando agora
            </p>
          </div>
        </div>
      )}
    </>
  )
}