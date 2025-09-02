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
      answer: 'Fazemos TUDO JUNTO com você! Nosso jurídico prepara: ✅ Certificado Veterinário Internacional (CVI), ✅ CDC Dog Import Form, ✅ ARK CDC Agreement, ✅ POA Broker, ✅ Formulários USDA. Orientamos você em cada etapa: 📸 Fotos do pet (explicamos como tirar), 💉 Vacinas (indicamos onde fazer), 🏷️ Microchip (acompanhamos aplicação), 🩺 Exames e sorologia. Você não fica perdido em momento algum - fazemos tudo passo a passo juntos!',
    },
    {
      question: 'Quanto tempo demora o processo?',
      answer: 'O processo completo leva de 3 a 6 meses, incluindo preparação de documentos, exames veterinários, quarentena quando necessário e aprovações internacionais.',
    },
    {
      question: 'Como recebo as fotos durante a viagem?',
      answer: 'Criamos um grupo exclusivo no WhatsApp onde você recebe fotos e vídeos em tempo real durante toda a viagem, desde o check-in até a chegada.',
    },
    {
      question: 'Qual o valor do serviço?',
      answer: 'Nosso serviço completo varia de R$ 25.000 a R$ 45.000 (dependendo do porte do pet), incluindo passagem aérea, acompanhamento profissional, toda documentação e assessoria jurídica. O cliente paga à parte: caixa de transporte IATA, taxas governamentais americanas e vacinas obrigatórias.',
    },
    {
      question: 'O que está incluído no valor do serviço?',
      answer: 'Nosso serviço inclui: ✅ Passagem aérea do pet, ✅ Acompanhamento profissional durante o voo, ✅ Toda documentação e assessoria jurídica, ✅ Coordenação completa do processo, ✅ Fotos e vídeos em tempo real, ✅ Suporte 24h durante a viagem, ✅ Recepção e acompanhamento no aeroporto. ❌ NÃO INCLUI: Caixa de transporte (cada pet precisa ter a sua própria), taxas governamentais e vacinas.',
    },
    {
      question: 'Quais custos adicionais o cliente deve pagar?',
      answer: 'Além do nosso serviço completo, o cliente é responsável por: 📦 Caixa de transporte aprovada pela IATA, 💉 Vacinas e sorologia da raiva, 🏷️ Microchip de identificação, 📋 Taxas governamentais americanas, 🩺 Exames veterinários solicitados, 💊 Tratamentos parasitários. Nós orientamos você sobre cada item, onde fazer e como pagar.',
    },
  ]

  return (
    <section id="faq" className="py-8 md:py-16 lg:py-20">
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