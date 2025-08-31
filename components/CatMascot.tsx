'use client'

import { motion } from 'framer-motion'

export default function CatMascot() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.8 
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Cat SVG */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 h-28 md:w-36 md:h-36"
        >
          {/* Body */}
          <ellipse cx="90" cy="120" rx="35" ry="30" fill="#FFB366" />
          
          {/* Head */}
          <circle cx="90" cy="75" r="30" fill="#FF9933" />
          
          {/* Ears */}
          <motion.path
            d="M 65 60 L 60 45 L 75 55 Z"
            fill="#FF9933"
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "65px 55px" }}
          />
          <motion.path
            d="M 115 60 L 120 45 L 105 55 Z"
            fill="#FF9933"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "115px 55px" }}
          />
          
          {/* Inner ears */}
          <path d="M 65 55 L 63 50 L 70 53 Z" fill="#FFB366" />
          <path d="M 115 55 L 117 50 L 110 53 Z" fill="#FFB366" />
          
          {/* Eyes */}
          <ellipse cx="80" cy="72" rx="5" ry="8" fill="#2C1810" />
          <ellipse cx="100" cy="72" rx="5" ry="8" fill="#2C1810" />
          <circle cx="81" cy="70" r="2" fill="white" />
          <circle cx="101" cy="70" r="2" fill="white" />
          
          {/* Nose */}
          <path d="M 90 82 L 87 85 L 93 85 Z" fill="#FF6B9D" />
          
          {/* Mouth */}
          <path
            d="M90 85 Q 85 88 80 85"
            stroke="#2C1810"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M90 85 Q 95 88 100 85"
            stroke="#2C1810"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Whiskers */}
          <line x1="50" y1="75" x2="30" y2="72" stroke="#2C1810" strokeWidth="1" />
          <line x1="50" y1="80" x2="30" y2="80" stroke="#2C1810" strokeWidth="1" />
          <line x1="130" y1="75" x2="150" y2="72" stroke="#2C1810" strokeWidth="1" />
          <line x1="130" y1="80" x2="150" y2="80" stroke="#2C1810" strokeWidth="1" />
          
          {/* Tail */}
          <motion.path
            d="M120 120 Q 140 110 145 90 Q 148 75 140 70"
            stroke="#FF9933"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M120 120 Q 140 110 145 90 Q 148 75 140 70",
                "M120 120 Q 140 105 145 85 Q 148 70 145 65",
                "M120 120 Q 140 110 145 90 Q 148 75 140 70"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Stripes */}
          <path d="M 70 65 Q 75 63 80 65" stroke="#FF6633" strokeWidth="2" fill="none" />
          <path d="M 100 65 Q 105 63 110 65" stroke="#FF6633" strokeWidth="2" fill="none" />
          <path d="M 75 110 Q 90 108 105 110" stroke="#FF6633" strokeWidth="3" fill="none" />
          <path d="M 75 120 Q 90 118 105 120" stroke="#FF6633" strokeWidth="3" fill="none" />
          
          {/* Paws */}
          <ellipse cx="75" cy="140" rx="10" ry="7" fill="#FFB366" />
          <ellipse cx="105" cy="140" rx="10" ry="7" fill="#FFB366" />
          
          {/* Collar */}
          <rect x="65" y="95" width="50" height="6" rx="3" fill="#7209B7" />
          <circle cx="90" cy="101" r="3" fill="#FFD700" />
        </svg>
        
        {/* Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-3 bg-black/20 rounded-full blur-xl" />
      </motion.div>
      
      {/* Hearts floating around */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -15, -30]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 1
        }}
      >
        <span className="text-xl">💜</span>
      </motion.div>
      
      <motion.div
        className="absolute top-2 -left-6"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -15, -30]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 2
        }}
      >
        <span className="text-xl">😻</span>
      </motion.div>
    </motion.div>
  )
}