'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import CatMascot from './CatMascot'
import { openWhatsApp } from '@/lib/whatsapp'

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-electric/20 via-neon/20 to-electric/20 animate-gradient" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto border border-electric/20"
        >
          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10"
          >
            <Sparkles className="w-8 h-8 text-electric/50" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-10 right-10"
          >
            <Sparkles className="w-8 h-8 text-neon/50" />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-display font-bold text-center lg:text-left"
            >
              Pronto para dar ao seu pet
              <span className="block text-gradient mt-2">a viagem dos sonhos?</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <CatMascot />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-ice/70 mb-8 max-w-2xl mx-auto"
          >
            Nossa equipe está pronta para tornar a viagem do seu pet 
            uma experiência segura e confortável. Entre em contato agora!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(0, 180, 216, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp('Olá! Vi a chamada no site e quero transportar meu pet para os EUA com vocês! 🐕✈️')}
              className="group button-primary text-lg px-10 py-5"
            >
              <span className="flex items-center gap-3">
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(0, 180, 216, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp('Olá! Gostaria de agendar uma consulta gratuita sobre o transporte do meu pet para os EUA. 🐕✈️')}
              className="button-secondary text-lg px-10 py-5"
            >
              Agendar Consulta Gratuita
            </motion.button>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-sm text-ice/50 mt-8"
          >
            Resposta em menos de 5 minutos • Sem compromisso
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}