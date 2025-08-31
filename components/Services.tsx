'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Camera, FileText, Plane, Users } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: 'Acompanhamento Especializado',
      description: 'Profissional dedicada viaja junto com seu pet, garantindo conforto e cuidado durante toda a jornada.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Shield,
      title: 'Documentação Completa',
      description: 'Especialista jurídica cuida de toda burocracia: CDC, USDA, exames e certificados internacionais.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Camera,
      title: 'Fotos em Tempo Real',
      description: 'Receba fotos e vídeos do seu pet durante toda a viagem via WhatsApp.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Plane,
      title: 'Transporte Premium',
      description: 'Viagem em cabine com profissional, nunca no compartimento de carga.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FileText,
      title: 'Seguro Completo',
      description: 'Cobertura total durante a viagem com seguro internacional especializado.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Users,
      title: 'Suporte 24/7',
      description: 'Equipe disponível 24 horas para qualquer necessidade ou emergência.',
      color: 'from-red-500 to-pink-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Nossos <span className="text-gradient">Serviços Premium</span>
          </h2>
          <p className="text-lg text-ice/60 max-w-2xl mx-auto">
            Oferecemos o mais completo serviço de transporte de pets para os EUA
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
              <div className="glass rounded-2xl p-6 h-full border border-white/5 hover:border-electric/30 transition-all duration-300">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-14 h-14 mb-5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-xl opacity-20`} />
                  <service.icon className="w-14 h-14 text-electric relative z-10 p-3" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-3 text-ice">
                  {service.title}
                </h3>
                <p className="text-ice/60">
                  {service.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-electric to-neon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-ice/60 mb-6">
            Todos os serviços inclusos em um único pacote
          </p>
          <button 
            onClick={() => openWhatsApp('Olá! Gostaria de solicitar um orçamento personalizado para o transporte do meu pet para os EUA. 🐕✈️')}
            className="button-primary"
          >
            Solicitar Orçamento Personalizado
          </button>
        </motion.div>
      </div>
    </section>
  )
}