'use client'

import { motion } from 'framer-motion'
import { Play, Volume2 } from 'lucide-react'
import { useState } from 'react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Video URL do cliente
  const videoUrl = "https://www.youtube.com/embed/mGdfrvruGzo"
  
  return (
    <section id="video" className="relative overflow-hidden py-16 md:py-20 lg:py-24 flex items-center justify-center min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/95 to-midnight" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2">
            Veja Como <span className="text-gradient">Funciona na Prática</span>
          </h2>
          <p className="text-sm md:text-base text-ice/60 max-w-2xl mx-auto">
            Conheça nossa equipe e veja como cuidamos do seu pet com todo carinho e profissionalismo
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden glass border-2 border-electric/20 group shadow-xl shadow-electric/10">
            {/* Video Container */}
            <div className="relative aspect-video bg-midnight/50">
              {!isPlaying ? (
                <>
                  {/* Video Thumbnail/Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-neon/20 flex items-center justify-center">
                    {/* Pet illustrations as placeholder */}
                    <div className="text-center">
                      <div className="text-5xl mb-2 flex justify-center gap-4">
                        <span>🐕</span>
                        <span>🐈</span>
                      </div>
                      <p className="text-sm text-ice/60">Clique para assistir ao vídeo</p>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-electric rounded-full flex items-center justify-center group-hover:bg-electric/80 transition-colors">
                      <Play className="w-8 h-8 text-midnight ml-1" fill="currentColor" />
                    </div>
                    
                    {/* Pulse effect */}
                    <div className="absolute w-20 h-20 bg-electric rounded-full animate-ping opacity-30" />
                  </motion.button>
                </>
              ) : (
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title="Pet Voa - Como Funciona"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            
            {/* Video Info Bar */}
            <div className="p-3 bg-gradient-to-r from-electric/10 to-neon/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-electric/20 rounded-full flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-ice">Tour Completo do Serviço</h3>
                    <p className="text-xs text-ice/60">Duração: 3 minutos</p>
                  </div>
                </div>
                
                {/* Video Stats */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl">👁️</div>
                    <p className="text-xs text-ice/60">Assista</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl">❤️</div>
                    <p className="text-xs text-ice/60">Se Encante</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl">✈️</div>
                    <p className="text-xs text-ice/60">Viaje Tranquilo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:grid grid-cols-3 gap-4 mt-4"
          >
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎥</div>
              <h4 className="font-semibold mb-1 text-sm">Transparência Total</h4>
              <p className="text-xs text-ice/60">Veja exatamente como cuidamos do seu pet</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-semibold mb-1 text-sm">Equipe Qualificada</h4>
              <p className="text-xs text-ice/60">Profissionais especializados e experientes</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💝</div>
              <h4 className="font-semibold mb-1 text-sm">Amor e Carinho</h4>
              <p className="text-xs text-ice/60">Tratamos seu pet como se fosse nosso</p>
            </div>
          </motion.div>
          
          {/* Mobile Info Icons */}
          <div className="flex md:hidden justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl">🎥</div>
              <p className="text-xs text-ice/60 mt-1">Transparência</p>
            </div>
            <div className="text-center">
              <div className="text-2xl">🏆</div>
              <p className="text-xs text-ice/60 mt-1">Qualificada</p>
            </div>
            <div className="text-center">
              <div className="text-2xl">💝</div>
              <p className="text-xs text-ice/60 mt-1">Carinho</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}