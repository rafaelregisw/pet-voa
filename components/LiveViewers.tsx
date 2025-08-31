'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Users, Circle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LiveViewers() {
  const [viewers, setViewers] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Simula pessoas vendo em tempo real
    const updateViewers = () => {
      const base = 3
      const variation = Math.floor(Math.random() * 4) // 0-3
      setViewers(base + variation)
    }
    
    // Inicializa
    updateViewers()
    setIsVisible(true)
    
    // Atualiza a cada 30 segundos
    const interval = setInterval(updateViewers, 30000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-6 z-40"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="glass rounded-full px-4 py-2 border border-electric/30 flex items-center gap-3"
          >
            {/* Pulsing dot */}
            <div className="relative">
              <Circle className="w-3 h-3 text-green-500 fill-green-500" />
              <motion.div
                animate={{
                  scale: [1, 2, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            
            {/* Text */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-ice/80" />
              <span className="text-sm text-ice/90 font-medium">
                <span className="text-electric font-bold">{viewers}</span> pessoas vendo agora
              </span>
            </div>
          </motion.div>
          
          {/* Additional floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 glass rounded-full px-3 py-1 border border-amber-500/30 inline-block"
          >
            <span className="text-xs text-amber-400 font-semibold">
              ⚡ Alta demanda hoje
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}