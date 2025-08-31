'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { openWhatsApp } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  const [showNotification, setShowNotification] = useState(false)
  
  const handleClick = () => {
    openWhatsApp()
  }

  useEffect(() => {
    // Mostra notificação após 5 segundos
    const timer = setTimeout(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 6000)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Notification Popup */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-32 right-8 z-50 bg-white rounded-xl shadow-2xl p-4 max-w-xs border-2 border-green-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>
            <div>
              <p className="text-gray-900 font-bold">🟢 Equipe Online Agora!</p>
              <p className="text-gray-600 text-sm mt-1">
                Especialistas disponíveis para tirar todas as suas dúvidas.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">👩‍⚕️👩‍⚖️</span>
                <span className="text-xs text-green-600 font-bold">Resposta Imediata</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="WhatsApp"
      >
        <div className="relative">
          {/* Main Button */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-20 h-20 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-2xl shadow-green-500/50 flex items-center justify-center"
          >
            <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" fill="white" />
            
            {/* Online Status Badge */}
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-300 to-green-400 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </motion.div>
          
          {/* Enhanced Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-24 top-1/2 -translate-y-1/2 px-5 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl pointer-events-none"
          >
            <div className="font-bold text-lg">💬 Clique Aqui!</div>
            <div className="text-xs opacity-90">Atendimento Imediato</div>
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-transparent border-l-green-500" />
          </motion.span>
        </div>
      </motion.button>
    </>
  )
}