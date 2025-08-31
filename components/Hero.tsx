'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Shield, Heart } from 'lucide-react'
import PetMascot from './PetMascot'
import CatMascot from './CatMascot'
import { openWhatsApp } from '@/lib/whatsapp'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function Hero() {
  const scrollToSection = useSmoothScroll()
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-8 md:pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-background opacity-30" />
      
      {/* Static Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neon/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-electric/30 mb-6 md:mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
            </span>
            <span className="text-sm text-ice/80">Transporte Premium de Pets</span>
            <span className="flex gap-1 ml-2">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-sm">🐕</motion.span>
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="text-sm">🐈</motion.span>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="text-sm">🦜</motion.span>
              <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="text-sm">🐰</motion.span>
            </span>
          </motion.div>

          {/* Title with Multiple Mascots */}
          <div className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold">
                <span className="block">Seu Pet Viaja</span>
                <span className="block text-gradient">Com Segurança Total</span>
              </h1>
            </motion.div>
            
            {/* Mascots Container */}
            <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -100, rotate: -180 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden md:block"
              >
                <CatMascot />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <PetMascot />
              </motion.div>
              
              {/* Additional Pet Emojis */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden lg:flex flex-col gap-4"
              >
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="text-6xl"
                >
                  🦜
                </motion.span>
                <motion.span
                  animate={{
                    rotate: [0, -10, 10, 0],
                    y: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                  className="text-6xl"
                >
                  🐰
                </motion.span>
              </motion.div>
              
              {/* Mobile Pet Emojis */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex md:hidden gap-2"
              >
                <span className="text-4xl">🐈</span>
                <span className="text-4xl">🦜</span>
              </motion.div>
            </div>
            
            {/* Floating Hearts and Stars */}
            <motion.div
              className="absolute top-20 left-10 hidden lg:block"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <span className="text-3xl">⭐</span>
            </motion.div>
            
            <motion.div
              className="absolute top-32 right-10 hidden lg:block"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1
              }}
            >
              <span className="text-3xl">🌟</span>
            </motion.div>
          </div>

          {/* Key Differentials - Visual Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 max-w-4xl mx-auto px-2 md:px-0"
          >
            {/* Psicóloga Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="glass rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-neon/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-neon to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="text-lg font-bold text-ice mb-2">
                  <span className="text-neon">ACOMPANHAMENTO</span> PSICOLÓGICO
                </h3>
                <p className="text-sm text-ice/70">
                  Seu pet nunca viaja sozinho. Cuidado especializado com amor durante todo o voo.
                </p>
              </div>
            </motion.div>

            {/* Advogada Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass rounded-2xl p-5 border-2 border-amber-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">⚖️</span>
                </div>
                <h3 className="text-lg font-bold text-ice mb-2">
                  <span className="text-amber-400">ESPECIALISTA</span> JURÍDICA
                </h3>
                <p className="text-sm text-ice/70">
                  Formada em Direito, cuida de toda documentação legal. CDC, USDA, exames - tudo resolvido.
                </p>
              </div>
            </motion.div>

            {/* Tempo Real Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="glass rounded-2xl p-5 border-2 border-electric/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-electric to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">📸</span>
                </div>
                <h3 className="text-lg font-bold text-ice mb-2">
                  <span className="text-electric">FOTOS</span> AO VIVO
                </h3>
                <p className="text-sm text-ice/70">
                  Acompanhe cada momento com fotos e vídeos em tempo real via WhatsApp.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => openWhatsApp('Olá! Quero começar o processo de transporte do meu pet para os EUA! 🐕✈️')}
              className="button-primary group"
            >
              Começar Agora
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('how')}
              className="button-secondary"
            >
              Ver Como Funciona
            </button>
          </motion.div>

        </div>
      </div>

    </section>
  )
}