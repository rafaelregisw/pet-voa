'use client'

import { Shield, Lock, CheckCircle, Heart, Phone, MapPin, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SecurityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
      {/* Site Seguro SSL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-full px-4 py-2 md:px-5 md:py-2.5 border border-green-400/40 shadow-lg hover:scale-105 transition-transform"
      >
        <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
        <span className="text-xs md:text-sm font-bold text-white">Site 100% Seguro</span>
      </motion.div>

      {/* WhatsApp Verificado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md rounded-full px-4 py-2 md:px-5 md:py-2.5 border border-green-500/40 shadow-lg hover:scale-105 transition-transform"
      >
        <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
        <span className="text-xs md:text-sm font-bold text-white">WhatsApp Verificado</span>
      </motion.div>

      {/* Rastreamento 24h */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-full px-4 py-2 md:px-5 md:py-2.5 border border-blue-400/40 shadow-lg hover:scale-105 transition-transform"
      >
        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
        <span className="text-xs md:text-sm font-bold text-white">Rastreamento 24h</span>
      </motion.div>

      {/* Pets Felizes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-full px-4 py-2 md:px-5 md:py-2.5 border border-pink-400/40 shadow-lg hover:scale-105 transition-transform"
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
        <span className="text-xs md:text-sm font-bold text-white">Com Todo Carinho</span>
      </motion.div>
    </div>
  )
}

export function SecurityBadgesFooter() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-white/10">
      {/* SSL Certificate */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <div className="flex items-center gap-1 bg-white/10 rounded-md px-2 py-1">
          <Lock className="w-3 h-3 text-green-400" />
          <span className="text-xs text-white font-mono">https://</span>
        </div>
        <span className="text-xs text-white/60">Conexão Segura</span>
      </motion.div>

      {/* Dados Protegidos */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <Shield className="w-4 h-4 text-blue-400" />
        <span className="text-xs text-white/60">Dados Protegidos</span>
      </motion.div>

      {/* Empresa Verificada */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <CheckCircle className="w-4 h-4 text-purple-400" />
        <span className="text-xs text-white/60">Empresa Verificada</span>
      </motion.div>

      {/* Monitoramento 24h */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <Eye className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-white/60">Monitoramento 24h</span>
      </motion.div>
    </div>
  )
}