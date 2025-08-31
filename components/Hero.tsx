'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Shield, Heart, MapPin, Satellite } from 'lucide-react'
import PsychIcon from './icons/PsychIcon'
import LegalIcon from './icons/LegalIcon'
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
            <span className="hidden md:flex gap-1 ml-2 opacity-60">
              <span className="text-sm">🐕</span>
              <span className="text-sm">🐈</span>
              <span className="text-sm">🦜</span>
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
                <span className="block text-gradient">Seu Pet Viaja</span>
                <span className="block text-gradient">Com Segurança Total</span>
              </h1>
            </motion.div>
            
            {/* Mascotes Organizados com Partículas Mágicas */}
            <div className="relative mb-6">
              <div className="flex justify-center items-end gap-6 md:gap-12 lg:gap-20">
                
                {/* Cachorro com Corações */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl md:text-7xl lg:text-8xl"
                  >
                    🐕
                  </motion.div>
                  {/* Corações flutuando - ajustados para não sobrepor texto */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`dog-heart-${i}`}
                      className="absolute text-pink-500 text-sm"
                      style={{ 
                        left: `${-20 - i * 10}px`,
                        bottom: `${20 + i * 15}px`
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        opacity: [0.5, 1, 0],
                        scale: [0.8, 1, 0.5]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Gato com Patinhas */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, -10, 10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-4xl md:text-6xl lg:text-7xl"
                  >
                    🐈
                  </motion.div>
                  {/* Patinhas - ajustadas */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={`cat-paw-${i}`}
                      className="absolute text-purple-400 text-sm"
                      style={{ 
                        left: `${-15 - i * 10}px`,
                        bottom: `${10 + i * 10}px`
                      }}
                      animate={{
                        y: [-10, -25, -10],
                        x: [0, i === 0 ? -5 : 5, 0],
                        rotate: [0, 360, 720],
                        opacity: [0.6, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      🐾
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Papagaio com Notas Musicais */}
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0, -5, 0],
                      y: [0, -15, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-4xl md:text-6xl lg:text-7xl"
                  >
                    🦜
                  </motion.div>
                  {/* Notas musicais - ajustadas */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`parrot-note-${i}`}
                      className="absolute text-green-400 text-xs"
                      style={{ 
                        right: `${-10 - i * 8}px`,
                        bottom: `${15 + i * 10}px`
                      }}
                      animate={{
                        y: [-15, -35, -15],
                        x: [0, i % 2 === 0 ? 10 : -10, 0],
                        opacity: [0.4, 1, 0],
                        scale: [0.7, 1.1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.6
                      }}
                    >
                      🎵
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Coelho com Estrelas */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl md:text-7xl lg:text-8xl"
                  >
                    🐰
                  </motion.div>
                  {/* Estrelas - ajustadas */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`rabbit-star-${i}`}
                      className="absolute text-yellow-400 text-sm"
                      style={{ 
                        right: `${-15 - i * 8}px`,
                        bottom: `${20 + i * 12}px`
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0.5, 1.2, 0.5],
                        opacity: [0.5, 1, 0.2]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    >
                      ⭐
                    </motion.div>
                  ))}
                </motion.div>
                
              </div>
            </div>
            
            {/* 🐾 GPS TRACKER FOFO E LINDO! 🐾 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3 
              }}
              className="flex justify-center mb-6"
            >
              <div className="relative inline-flex">
                {/* Corações flutuando */}
                {[... Array(3)].map((_, i) => (
                  <motion.div
                    key={`heart-${i}`}
                    className="absolute"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: '-20px'
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  >
                    <span className="text-pink-400">❤️</span>
                  </motion.div>
                ))}
                
                {/* Brilho suave sem pulso grande */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-xl" />
                </div>
                
                {/* Badge principal MAIOR E MELHOR */}
                <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 px-6 md:px-8 py-4 md:py-5 rounded-full shadow-2xl border-2 border-white/40 backdrop-blur-sm transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Ícone GPS animado */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl md:text-4xl"
                    >
                      📍
                    </motion.div>
                    
                    {/* Texto maior e mais destacado */}
                    <div className="flex flex-col">
                      <span className="text-white font-black text-base md:text-xl flex items-center gap-2">
                        GPS RASTREÁVEL 24H
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-base"
                        >
                          🔴
                        </motion.span>
                      </span>
                      <span className="text-white/95 text-sm md:text-base font-medium flex items-center gap-1">
                        Coleira com GPS + Link exclusivo
                        <span className="hidden md:inline">🐾</span>
                      </span>
                    </div>
                    
                    {/* Sinal ao vivo MAIOR */}
                    <div className="flex items-center">
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white" />
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Estrelinhas ao redor */}
                <div className="absolute -top-1 -right-2">
                  <motion.span
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-yellow-300 text-sm"
                  >
                    ✨
                  </motion.span>
                </div>
                <div className="absolute -bottom-1 -left-2">
                  <motion.span
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-yellow-300 text-xs"
                  >
                    ⭐
                  </motion.span>
                </div>
              </div>
            </motion.div>
            
          </div>

          {/* Key Differentials - Visual Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8 max-w-6xl mx-auto px-2 md:px-0"
          >
            {/* Psicóloga Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="glass rounded-xl p-4 border-2 border-neon/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-neon to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <PsychIcon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-ice mb-1">
                  <span className="text-neon">PSICÓLOGA</span>
                </h3>
                <p className="text-xs text-ice/70">
                  Pet nunca viaja sozinho
                </p>
              </div>
            </motion.div>

            {/* Advogada Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass rounded-xl p-4 border-2 border-amber-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <LegalIcon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-ice mb-1">
                  <span className="text-amber-400">JURÍDICO</span>
                </h3>
                <p className="text-xs text-ice/70">
                  Documentação completa
                </p>
              </div>
            </motion.div>

            {/* GPS TRACKING Badge - REVOLUCIONÁRIO! */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="glass rounded-xl p-4 border-2 border-red-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg relative"
                >
                  <span className="text-xl">🐾</span>
                  {/* Coraçãozinho pulsando */}
                  <div className="absolute -top-1 -right-1">
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-xs"
                    >
                      💕
                    </motion.span>
                  </div>
                </motion.div>
                <h3 className="text-base font-bold text-ice mb-1">
                  <span className="text-pink-500">GPS 24H</span> 📍
                </h3>
                <p className="text-xs text-ice/70">
                  Link rastreável exclusivo
                </p>
              </div>
            </motion.div>
            
            {/* FOTOS E VÍDEOS AO VIVO Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass rounded-xl p-4 border-2 border-green-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="text-base font-bold text-ice mb-1">
                  <span className="text-green-500">FOTOS/VÍDEOS</span>
                </h3>
                <p className="text-xs text-ice/70">
                  Ao vivo via WhatsApp
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