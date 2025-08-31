'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-ice/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.jpg" 
                alt="Pet Voa" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-ice/60 text-sm">
              Transporte premium de pets para os EUA com amor e segurança.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-ice">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Como Funciona', 'Serviços', 'Depoimentos', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-ice/60 hover:text-electric transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-ice">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-ice/60 text-sm">
                <Phone className="w-4 h-4" />
                +55 (62) 98321-1122
              </li>
              <li className="flex items-center gap-2 text-ice/60 text-sm">
                <Mail className="w-4 h-4" />
                contato@petvoa.com.br
              </li>
              <li className="flex items-center gap-2 text-ice/60 text-sm">
                <MapPin className="w-4 h-4" />
                Goiânia, Goiás, Brasil
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-ice">Redes Sociais</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-electric/30 transition-all"
              >
                <Instagram className="w-5 h-5 text-ice/60 hover:text-electric" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-electric/30 transition-all"
              >
                <Facebook className="w-5 h-5 text-ice/60 hover:text-electric" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-electric/30 transition-all"
              >
                <Mail className="w-5 h-5 text-ice/60 hover:text-electric" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ice/10 pt-8 text-center">
          <p className="text-ice/40 text-sm">
            © 2025 Pet Voa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}