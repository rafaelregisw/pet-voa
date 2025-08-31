'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Maria Silva',
      pet: 'Max (Golden Retriever)',
      text: 'O acompanhamento foi incrível! Recebi fotos durante toda a viagem e meu Max chegou super tranquilo em Nova York.',
      rating: 5,
      image: '🐕',
    },
    {
      name: 'João Santos',
      pet: 'Luna (Gato Persa)',
      text: 'Serviço impecável! A equipe jurídica cuidou de tudo, não precisei me preocupar com nenhum documento.',
      rating: 5,
      image: '🐱',
    },
    {
      name: 'Ana Costa',
      pet: 'Nina (Siamês)',
      text: 'Ver minha Nina sendo cuidada com tanto carinho durante a viagem não tem preço. Recomendo demais!',
      rating: 5,
      image: '🐈',
    },
  ]

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 mesh-background opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            O Que Dizem <span className="text-gradient">Nossos Clientes</span>
          </h2>
          <p className="text-xl text-ice/60 max-w-2xl mx-auto">
            Equipe especializada pronta para cuidar do seu melhor amigo
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 h-full">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-electric/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-electric text-electric" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-ice/80 mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-ice">{testimonial.name}</p>
                    <p className="text-sm text-ice/60">{testimonial.pet}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { text: 'Cuidado', label: 'Especializado', icon: '🧠' },
            { text: 'Jurídico', label: 'Documentação Legal', icon: '⚖️' },
            { text: '24/7', label: 'Suporte Total', icon: '💬' },
            { text: 'Premium', label: 'Serviço VIP', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-bold text-gradient mb-1">
                {stat.text}
              </div>
              <div className="text-sm text-ice/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}