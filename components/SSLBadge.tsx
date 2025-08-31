'use client'

import { useState, useEffect } from 'react'
import { Lock, Shield, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SSLBadge() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Mostrar depois de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed bottom-20 left-4 z-40 hidden md:block"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="group cursor-pointer"
          >
            <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md rounded-full px-4 py-2.5 border border-green-400/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Lock className="w-5 h-5 text-white" />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full blur-xl"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Site Seguro</p>
                  <p className="text-[10px] text-white/90">SSL Ativo ✓</p>
                </div>
              </div>
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="font-semibold">Conexão Criptografada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  <span>Dados 100% Protegidos</span>
                </div>
                <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/20"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}