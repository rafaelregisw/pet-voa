'use client'

interface MobileFriendlyLogoProps {
  className?: string
}

export default function MobileFriendlyLogo({ className = '' }: MobileFriendlyLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo simples para mobile */}
      <div className="md:hidden">
        <svg
          className="h-8 w-auto"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#7209B7" />
            </linearGradient>
          </defs>
          
          {/* Círculo de fundo */}
          <circle cx="30" cy="30" r="28" fill="url(#mobileGrad)" opacity="0.2" />
          
          {/* Avião simples */}
          <path
            d="M30 15 L38 30 L30 35 L22 30 Z"
            fill="url(#mobileGrad)"
          />
          
          {/* Pata */}
          <circle cx="30" cy="35" r="4" fill="#7209B7" opacity="0.8" />
          <circle cx="27" cy="32" r="2" fill="#7209B7" />
          <circle cx="33" cy="32" r="2" fill="#7209B7" />
        </svg>
        <span className="text-xl font-bold bg-gradient-to-r from-electric to-neon bg-clip-text text-transparent">
          Pet Voa
        </span>
      </div>

      {/* Logo completa para desktop */}
      <div className="hidden md:block">
        <AnimatedLogoUltra size="sm" showText={true} />
      </div>
    </div>
  )
}

import AnimatedLogoUltra from './AnimatedLogoUltra'