'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
          className="relative inline-block mb-8"
        >
          <div className="text-9xl font-display font-bold text-gradient">
            404
          </div>
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 text-4xl"
          >
            🐕
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold mb-4"
        >
          Ops! Página não encontrada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-ice/60 mb-8 max-w-md mx-auto"
        >
          Parece que seu pet se perdeu! Vamos ajudá-lo a encontrar o caminho de volta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/" className="button-primary">
            <Home className="inline-block w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="button-secondary"
          >
            <ArrowLeft className="inline-block w-4 h-4 mr-2" />
            Voltar
          </button>
        </motion.div>
      </div>
    </div>
  )
}