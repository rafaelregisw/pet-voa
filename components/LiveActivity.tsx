'use client'

import { useState, useEffect } from 'react'
import { Users, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react'

export default function LiveActivity() {
  const [viewers, setViewers] = useState(23)
  const [recentCity, setRecentCity] = useState('São Paulo')
  const [showNotification, setShowNotification] = useState(false)
  const [urgencyMessage, setUrgencyMessage] = useState('consultando agora')
  
  const cities = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte',
    'Curitiba', 'Porto Alegre', 'Salvador', 'Fortaleza',
    'Goiânia', 'Campinas', 'Recife', 'Manaus'
  ]

  const urgencyMessages = [
    'consultando agora',
    'solicitando orçamento',
    'visualizando preços',
    'assistindo vídeo',
    'lendo depoimentos',
    'verificando disponibilidade'
  ]

  // Simula variação realista de viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newValue = prev + change
        return Math.max(12, Math.min(47, newValue)) // Mantém entre 12-47
      })
    }, 4000 + Math.random() * 3000) // Varia a cada 4-7 segundos

    return () => clearInterval(interval)
  }, [])

  // Mostra notificações de novos visitantes
  useEffect(() => {
    const showNewVisitor = () => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      const randomMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)]
      setRecentCity(randomCity)
      setUrgencyMessage(randomMessage)
      setShowNotification(true)
      
      setTimeout(() => setShowNotification(false), 3000)
    }

    // Primeira notificação após 8 segundos
    const firstTimer = setTimeout(showNewVisitor, 8000)
    
    // Depois a cada 30-45 segundos
    const interval = setInterval(showNewVisitor, 30000 + Math.random() * 15000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Indicador fixo de pessoas online */}
      <div className="fixed top-16 left-2 sm:left-4 sm:top-20 z-40 glass-dark rounded-lg sm:rounded-xl p-2 sm:p-3 border border-electric/30 shadow-xl animate-slideIn hidden sm:block">
        <div className="flex items-center gap-3">
          {/* Indicador pulsante */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
            <div className="relative w-3 h-3 bg-green-500 rounded-full" />
          </div>
          
          {/* Número de viewers */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-electric" />
              <span className="text-lg font-bold text-ice">{viewers}</span>
              <span className="text-xs text-ice/60">online agora</span>
            </div>
            
            {/* Badge de urgência */}
            {viewers > 35 && (
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-amber-400 font-medium">Alta demanda</span>
              </div>
            )}
          </div>
        </div>

        {/* Barra de progresso de vagas - escondida no mobile */}
        <div className="mt-3 hidden sm:block">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-ice/60">Vagas disponíveis</span>
            <span className="text-amber-400 font-medium">Apenas 5 este mês</span>
          </div>
          <div className="w-full h-2 bg-midnight/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: '60%' }}
            />
          </div>
        </div>
      </div>

      {/* Notificação popup de novo visitante */}
      {showNotification && (
        <div className="fixed bottom-20 left-2 right-2 sm:left-4 sm:right-auto z-50 animate-slideUp">
          <div className="glass-dark rounded-lg p-3 border border-electric/30 shadow-xl max-w-[280px] mx-auto sm:mx-0">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 text-electric" />
                  <span className="text-sm font-medium text-ice">{recentCity}</span>
                </div>
                <p className="text-xs text-ice/70">
                  Alguém de {recentCity} está {urgencyMessage}
                </p>
                <p className="text-xs text-electric mt-1">
                  há menos de 1 minuto
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badge flutuante mobile - simplificado */}
      <div className="fixed top-16 left-2 z-40 sm:hidden">
        <div className="glass-dark rounded-lg px-2 py-1 border border-green-500/30">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-ice">{viewers} online</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </>
  )
}