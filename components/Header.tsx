'use client'

import { motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { openWhatsApp } from '@/lib/whatsapp'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollToSection = useSmoothScroll()

  const navItems = [
    { label: 'Início', href: 'hero' },
    { label: 'Vídeo', href: 'video' },
    { label: 'Como Funciona', href: 'how' },
    { label: 'Serviços', href: 'services' },
    { label: 'Depoimentos', href: 'testimonials' },
    { label: 'FAQ', href: 'faq' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-electric/10"
    >
      <nav className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <img 
              src="/logo.png" 
              alt="Pet Voa" 
              className="h-10 md:h-14 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm text-ice/80 hover:text-electric transition-colors cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWhatsApp()}
            className="hidden md:flex items-center gap-2 button-primary text-sm"
          >
            <Phone className="w-4 h-4" />
            Falar Agora
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ice"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-ice/10"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                className="block py-2 text-ice/80 hover:text-electric transition-colors cursor-pointer"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => openWhatsApp()}
              className="w-full mt-4 button-primary text-sm"
            >
              <Phone className="inline-block w-4 h-4 mr-2" />
              Falar Agora
            </button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}