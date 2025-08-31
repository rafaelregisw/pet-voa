'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle, ChevronRight } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export default function LimitedTimeOffer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 32, seconds: 45 })
  const [isVisible, setIsVisible] = useState(false)

  // Mostra após 10 segundos na página
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  // Contador regressivo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              // Reinicia para 23h quando chega a zero
              return { hours: 23, minutes: 59, seconds: 59 }
            }
          }
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-32 right-4 z-50 animate-slideInRight hidden lg:block">
      <div className="glass-dark rounded-xl p-4 border-2 border-amber-400/50 shadow-2xl max-w-sm">
        {/* Header urgente */}
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="text-amber-400 font-bold text-sm">OFERTA POR TEMPO LIMITADO</span>
        </div>

        {/* Contador */}
        <div className="bg-midnight/80 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-electric mr-2" />
            <div className="flex gap-1">
              <div className="text-center">
                <div className="bg-gradient-to-b from-electric to-neon text-white text-2xl font-bold rounded px-2 py-1">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-xs text-ice/60">horas</span>
              </div>
              <span className="text-2xl text-electric">:</span>
              <div className="text-center">
                <div className="bg-gradient-to-b from-electric to-neon text-white text-2xl font-bold rounded px-2 py-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-xs text-ice/60">min</span>
              </div>
              <span className="text-2xl text-electric">:</span>
              <div className="text-center">
                <div className="bg-gradient-to-b from-electric to-neon text-white text-2xl font-bold rounded px-2 py-1">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-xs text-ice/60">seg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <p className="text-ice text-sm mb-3">
          <span className="font-bold text-amber-400">5% de desconto</span> para quem fechar 
          <span className="text-electric font-bold"> HOJE!</span>
        </p>

        {/* Pets restantes */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mb-3">
          <p className="text-xs text-red-400 text-center font-medium">
            ⚠️ Apenas 3 vagas restantes para Dezembro
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => openWhatsApp('Vi a oferta por tempo limitado! Quero garantir minha vaga com desconto.')}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-midnight font-bold py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Garantir Vaga Agora</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Pessoas interessadas */}
        <p className="text-xs text-ice/50 text-center mt-2">
          🔥 8 pessoas visualizaram esta oferta na última hora
        </p>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}