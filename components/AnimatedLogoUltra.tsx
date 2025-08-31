'use client'

interface AnimatedLogoUltraProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function AnimatedLogoUltra({ className = '', showText = true, size = 'md' }: AnimatedLogoUltraProps) {
  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20'
  }
  
  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className={`${sizes[size]} w-auto`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradientes ultra modernos */}
          <linearGradient id="ultraGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8">
              <animate attributeName="stop-color" values="#00B4D8;#7209B7;#00B4D8" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#7209B7">
              <animate attributeName="stop-color" values="#7209B7;#00B4D8;#7209B7" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <radialGradient id="ultraGlow">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7209B7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
          </radialGradient>

          <filter id="ultraBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <filter id="ultraGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Camadas de fundo animadas */}
        <g className="background-layers">
          {/* Anel externo rotativo */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#ultraGradient1)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Hexágono de fundo */}
          <polygon
            points="100,30 170,65 170,135 100,170 30,135 30,65"
            fill="none"
            stroke="url(#ultraGradient1)"
            strokeWidth="1"
            opacity="0.2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="-360 100 100"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>

          {/* Pulso central */}
          <circle cx="100" cy="100" r="60" fill="url(#ultraGlow)">
            <animate
              attributeName="r"
              values="60;70;60"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Avião futurista */}
        <g filter="url(#ultraGlow)" className="plane-container">
          <g>
            {/* Trajeto orbital */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="6s"
              repeatCount="indefinite"
            />
            
            {/* Avião principal */}
            <path
              d="M100 50 L120 80 L100 90 L80 80 Z"
              fill="url(#ultraGradient1)"
              stroke="#fff"
              strokeWidth="0.5"
            />
            
            {/* Turbinas */}
            <circle cx="85" cy="75" r="5" fill="#00B4D8">
              <animate
                attributeName="r"
                values="5;7;5"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="115" cy="75" r="5" fill="#00B4D8">
              <animate
                attributeName="r"
                values="5;7;5"
                dur="0.5s"
                begin="0.25s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Rastro de velocidade */}
            <line x1="100" y1="90" x2="100" y2="120" stroke="url(#ultraGradient1)" strokeWidth="3" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        </g>

        {/* Pata de pet estilizada no centro */}
        <g className="paw-center" filter="url(#ultraGlow)">
          <ellipse cx="100" cy="105" r="15" ry="12" fill="#7209B7" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <circle cx="92" cy="98" r="4" fill="#fff" opacity="0.9" />
          <circle cx="108" cy="98" r="4" fill="#fff" opacity="0.9" />
          <circle cx="92" cy="112" r="4" fill="#fff" opacity="0.9" />
          <circle cx="108" cy="112" r="4" fill="#fff" opacity="0.9" />
        </g>

        {/* Partículas orbitais */}
        <g className="particles">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <g key={i}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${angle} 100 100`}
                to={`${angle + 360} 100 100`}
                dur={`${10 + i * 2}s`}
                repeatCount="indefinite"
              />
              <circle cx="100" cy="20" r="2" fill="#00B4D8">
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="2s"
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>

        {/* Texto ULTRA */}
        <text x="100" y="180" textAnchor="middle" fill="url(#ultraGradient1)" fontSize="12" fontWeight="bold" opacity="0.5">
          ULTRATHINK
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black ${textSizes[size]} tracking-tight`}>
            <span className="bg-gradient-to-r from-electric via-white to-neon bg-clip-text text-transparent animate-pulse">
              PET
            </span>
            <span className="bg-gradient-to-r from-neon via-white to-electric bg-clip-text text-transparent ml-2">
              VOA
            </span>
          </span>
          <span className="text-xs text-ice/60 font-light tracking-widest uppercase">
            Premium Transport
          </span>
        </div>
      )}
    </div>
  )
}