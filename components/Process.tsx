'use client'

import { motion } from 'framer-motion'
import { Phone, FileText, Plane, Camera, CheckCircle } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      icon: Phone,
      title: 'Contato Inicial',
      description: 'Entre em contato via WhatsApp e receba orientação personalizada',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'Documentação',
      description: 'Nossa especialista jurídica prepara toda a documentação necessária',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Plane,
      title: 'Dia da Viagem',
      description: 'Você entrega seu pet no aeroporto para nossa equipe',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Camera,
      title: 'Acompanhamento',
      description: 'Receba fotos e vídeos durante toda a viagem',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: CheckCircle,
      title: 'Chegada Segura',
      description: 'Você recebe seu pet no aeroporto de destino',
      color: 'from-red-500 to-pink-500',
    },
  ]

  return (
    <section id="how" className="py-8 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-2 md:mb-3">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-base text-ice/60 max-w-2xl mx-auto">
            Processo simples e transparente do início ao fim
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-electric via-neon to-electric opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center mb-4 md:mb-6 ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } justify-start`}
            >
              {/* Step Content */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`glass rounded-2xl p-4 w-full md:max-w-sm ${
                  index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-electric rounded-full flex items-center justify-center text-xs font-bold text-midnight">
                      {index + 1}
                    </div>
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-base font-semibold text-ice">
                    {step.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm text-ice/60">
                  {step.description}
                </p>
              </motion.div>

              {/* Center Circle - Hidden on Mobile */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-electric rounded-full border-2 border-midnight z-10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}