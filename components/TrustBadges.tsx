'use client'

import { motion } from 'framer-motion'
import { Shield, Award, CheckCircle, Star } from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'SEGURANÇA',
      subtitle: 'Transporte Seguro',
      color: 'from-blue-500 to-blue-600',
      number: '100%'
    },
    {
      icon: Award,
      title: 'DIREITO',  
      subtitle: 'Bacharel em Direito',
      color: 'from-amber-500 to-amber-600',
      number: 'FORMADA'
    },
    {
      icon: CheckCircle,
      title: 'PSICOLOGIA',
      subtitle: 'Acompanhamento Psicológico',
      color: 'from-purple-500 to-purple-600',
      number: 'CURSANDO'
    },
    {
      icon: Star,
      title: 'PREMIUM',
      subtitle: 'Serviço Diferenciado',
      color: 'from-green-500 to-green-600',
      number: 'VIP'
    }
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-transparent to-neon/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <h3 className="text-2xl font-bold text-ice mb-2">
            Nossa Equipe Especializada
          </h3>
          <p className="text-ice/60">
            Profissionais dedicados ao bem-estar do seu pet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              <div className="glass rounded-xl p-4 md:p-6 border-2 border-white/10 hover:border-electric/30 transition-all duration-300 group">
                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                />
                
                <div className="relative z-10 flex items-center gap-4">
                  {/* Icon with gradient background */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <badge.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  {/* Text content */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-ice">{badge.title}</h4>
                      <span className="text-xs text-electric font-mono">{badge.number}</span>
                    </div>
                    <p className="text-sm text-ice/60">{badge.subtitle}</p>
                  </div>
                </div>

                {/* Verified badge */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" fill="white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-ice/50">
            ✅ Equipe comprometida com a segurança e conforto do seu pet
          </p>
        </motion.div>
      </div>
    </section>
  )
}