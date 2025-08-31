'use client'

interface AnimatedLogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function AnimatedLogo({ className = '', showText = true, size = 'md' }: AnimatedLogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  }
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className={`${sizes[size]} w-auto`}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo de fundo com gradiente */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7209B7" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#7209B7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Círculo de fundo animado */}
        <circle 
          cx="60" 
          cy="60" 
          r="55" 
          fill="url(#bgGradient)"
          className="animate-pulse"
        />
        
        {/* Trilha do avião */}
        <circle
          cx="60"
          cy="60"
          r="40"
          stroke="#00B4D8"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 4"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Avião estilizado */}
        <g filter="url(#glow)">
          <g className="plane-group">
            {/* Corpo do avião */}
            <path
              d="M60 30 L70 50 L60 55 L50 50 Z"
              fill="url(#planeGradient)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            
            {/* Asas */}
            <path
              d="M45 45 L75 45 L70 50 L50 50 Z"
              fill="#00B4D8"
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Pata de pet */}
          <g className="paw-group">
            <circle cx="60" cy="65" r="8" fill="#7209B7" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="55" cy="60" r="3" fill="#7209B7" />
            <circle cx="65" cy="60" r="3" fill="#7209B7" />
            <circle cx="55" cy="70" r="3" fill="#7209B7" />
            <circle cx="65" cy="70" r="3" fill="#7209B7" />
          </g>
        </g>

        {/* Estrelas ao redor */}
        <g className="stars">
          <circle cx="20" cy="20" r="1.5" fill="#00B4D8">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="30" r="1.5" fill="#7209B7">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="90" cy="90" r="1.5" fill="#00B4D8">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              begin="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="30" cy="85" r="1.5" fill="#7209B7">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} bg-gradient-to-r from-electric to-neon bg-clip-text text-transparent`}>
            Pet Voa
          </span>
          <span className="text-xs text-ice/60 -mt-1">
            Transporte Premium
          </span>
        </div>
      )}
    </div>
  )
}