export default function LegalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradiente dourado */}
      <defs>
        <linearGradient id="legalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Escudo com balança (proteção legal) */}
      <g>
        {/* Escudo */}
        <path 
          d="M12 2L4 7V11C4 16 7 20.5 12 22C17 20.5 20 16 20 11V7L12 2Z"
          fill="url(#legalGrad)"
          opacity="0.9"
        />
        
        {/* Balança da justiça */}
        <g fill="white">
          {/* Haste central */}
          <rect x="11.5" y="6" width="1" height="10" />
          
          {/* Travessão */}
          <rect x="8" y="7" width="8" height="1" />
          
          {/* Pratos da balança */}
          <path d="M7 8L5 12H9L7 8Z" />
          <path d="M17 8L15 12H19L17 8Z" />
          
          {/* Base */}
          <rect x="10" y="16" width="4" height="1" />
        </g>
        
        {/* Estrela de excelência */}
        <path 
          d="M12 14L12.5 15L13.5 15L12.7 15.7L13 16.7L12 16L11 16.7L11.3 15.7L10.5 15L11.5 15L12 14Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Documento/Pergaminho */}
        <rect 
          x="9" 
          y="17" 
          width="6" 
          height="2" 
          rx="0.5"
          fill="white"
          opacity="0.8"
        />
      </g>
    </svg>
  )
}