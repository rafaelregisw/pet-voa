'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import ParallaxSection from './ParallaxSection'
import { openWhatsApp } from '@/lib/whatsapp'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Como funciona o acompanhamento durante o voo?',
      answer: 'Nossa profissional especializada viaja junto com seu pet na cabine. Ela garante conforto, aplica técnicas de cuidado e mantém o pet calmo durante toda a viagem.',
    },
    {
      question: 'Quais documentos são necessários?',
      answer: 'Nossa especialista jurídica prepara toda documentação: Certificado de Saúde (CVI), Carteira de Vacinação, Exame de Raiva, Aprovação USDA e documentação CDC. Você não precisa se preocupar com nada.',
    },
    {
      question: 'Quanto tempo demora o processo?',
      answer: 'O processo completo leva de 3 a 6 meses, incluindo preparação de documentos, exames veterinários, quarentena quando necessário e aprovações internacionais.',
    },
    {
      question: 'Como recebo as fotos durante a viagem?',
      answer: 'Criamos um grupo exclusivo no WhatsApp onde você recebe fotos e vídeos em tempo real durante toda a viagem, desde a busca até a entrega.',
    },
    {
      question: 'Qual o valor do serviço?',
      answer: 'O investimento varia de R$ 8.000 a R$ 15.000, dependendo do destino e tamanho do pet. Inclui todos os serviços: transporte, acompanhamento, documentação e seguro.',
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-xl text-ice/60 max-w-2xl mx-auto">
            Tire todas as suas dúvidas sobre o transporte do seu pet 🐕🐈
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <ParallaxSection
              key={index}
              offset={20 + index * 5}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass rounded-xl p-6 text-left hover:border-electric/30 transition-all duration-300 border border-white/5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ice pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-electric" />
                    ) : (
                      <Plus className="w-5 h-5 text-electric" />
                    )}
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-ice/60 mt-4 pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-ice/60 mb-6">
            Ainda tem dúvidas? Fale conosco agora mesmo
          </p>
          <button 
            onClick={() => openWhatsApp('Olá! Tenho algumas dúvidas sobre o transporte do meu pet para os EUA. Podem me ajudar? 🐕✈️')}
            className="button-primary"
          >
            Conversar no WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  )
}