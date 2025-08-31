export default function PsychIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradiente */}
      <defs>
        <linearGradient id="psychGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Cabeça com coração (mente e amor) */}
      <g>
        {/* Cabeça/Cérebro estilizado */}
        <path 
          d="M12 2C9.5 2 7.5 3.5 7.5 5.5C7.5 6 7.6 6.5 7.8 7C6.2 7.5 5 9 5 11C5 13.5 7 15.5 9.5 15.5C10 15.5 10.5 15.4 11 15.2V20C11 21.1 11.9 22 13 22C14.1 22 15 21.1 15 20V15.2C15.5 15.4 16 15.5 16.5 15.5C19 15.5 21 13.5 21 11C21 9 19.8 7.5 18.2 7C18.4 6.5 18.5 6 18.5 5.5C18.5 3.5 16.5 2 14 2C13.4 2 12.7 2.1 12 2.3C12 2.2 12 2.1 12 2Z"
          fill="url(#psychGrad)"
          opacity="0.9"
        />
        
        {/* Coração no centro (representando empatia) */}
        <path 
          d="M12 8.5C11.5 7.5 10.5 7 9.5 7C8.1 7 7 8.1 7 9.5C7 10.3 7.5 11.5 12 14C16.5 11.5 17 10.3 17 9.5C17 8.1 15.9 7 14.5 7C13.5 7 12.5 7.5 12 8.5Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Mãos abraçando (acolhimento) */}
        <path 
          d="M6 13C5.5 13 5 13.5 5 14V16C5 16.5 5.5 17 6 17C6.5 17 7 16.5 7 16V14C7 13.5 6.5 13 6 13Z"
          fill="url(#psychGrad)"
          opacity="0.7"
        />
        <path 
          d="M18 13C17.5 13 17 13.5 17 14V16C17 16.5 17.5 17 18 17C18.5 17 19 16.5 19 16V14C19 13.5 18.5 13 18 13Z"
          fill="url(#psychGrad)"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}