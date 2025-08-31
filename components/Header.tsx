'use client'

import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { openWhatsApp } from '@/lib/whatsapp'
import AnimatedLogoUltra from './AnimatedLogoUltra'

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
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-electric/10 animate-slideDown backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="hover:scale-105 transition-transform">
            <AnimatedLogoUltra size="sm" showText={false} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-ice/80 hover:text-electric transition-colors cursor-pointer hover:-translate-y-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => openWhatsApp()}
            className="hidden md:flex items-center gap-2 button-primary text-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
            Falar Agora
          </button>

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
          <div className="md:hidden mt-4 py-4 border-t border-ice/10 animate-fadeIn">
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
          </div>
        )}
      </nav>
    </header>
  )
}