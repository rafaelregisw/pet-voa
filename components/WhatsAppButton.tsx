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
      {/* Main WhatsApp Button - Menor e no topo */}
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
        className="fixed top-[18px] right-4 z-50 group"
        aria-label="WhatsApp"
      >
        <div className="relative">
          {/* Main Button - Menor */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/50 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" fill="white" />
            
            {/* Online Status Badge - Pulsante */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
          
          {/* Tooltip Compacto */}
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg pointer-events-none"
          >
            WhatsApp
          </motion.span>
        </div>
      </motion.button>
    </>
  )
}