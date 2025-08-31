'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  const handleClick = () => {
    openWhatsApp()
  }

  return (
    <>
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