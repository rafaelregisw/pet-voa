'use client'

import { motion } from 'framer-motion'

export default function PetMascot() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5 
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Dog SVG */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 md:w-40 md:h-40"
        >
          {/* Body */}
          <ellipse cx="100" cy="130" rx="45" ry="35" fill="#8B7355" />
          
          {/* Head */}
          <circle cx="100" cy="80" r="35" fill="#A0826D" />
          
          {/* Ears */}
          <motion.ellipse
            cx="75"
            cy="65"
            rx="15"
            ry="25"
            fill="#8B7355"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "75px 65px" }}
          />
          <motion.ellipse
            cx="125"
            cy="65"
            rx="15"
            ry="25"
            fill="#8B7355"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "125px 65px" }}
          />
          
          {/* Eyes */}
          <circle cx="88" cy="75" r="8" fill="#2C1810" />
          <circle cx="112" cy="75" r="8" fill="#2C1810" />
          <circle cx="90" cy="73" r="3" fill="white" />
          <circle cx="114" cy="73" r="3" fill="white" />
          
          {/* Nose */}
          <ellipse cx="100" cy="90" rx="8" ry="6" fill="#2C1810" />
          
          {/* Mouth */}
          <path
            d="M100 90 Q 90 100 80 95"
            stroke="#2C1810"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M100 90 Q 110 100 120 95"
            stroke="#2C1810"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Tail */}
          <motion.path
            d="M145 130 Q 170 120 175 100"
            stroke="#8B7355"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M145 130 Q 170 120 175 100",
                "M145 130 Q 170 110 180 100",
                "M145 130 Q 170 120 175 100"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Paws */}
          <ellipse cx="75" cy="155" rx="12" ry="8" fill="#8B7355" />
          <ellipse cx="125" cy="155" rx="12" ry="8" fill="#8B7355" />
          
          {/* Collar */}
          <rect x="70" y="105" width="60" height="8" rx="4" fill="#00B4D8" />
          <circle cx="100" cy="113" r="4" fill="#FFD700" />
        </svg>
        
        {/* Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 rounded-full blur-xl" />
      </motion.div>
      
      {/* Hearts floating around */}
      <motion.div
        className="absolute -top-4 -right-4"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -20, -40]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5
        }}
      >
        <span className="text-2xl">❤️</span>
      </motion.div>
      
      <motion.div
        className="absolute top-0 -left-8"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -20, -40]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5
        }}
      >
        <span className="text-2xl">💕</span>
      </motion.div>
    </motion.div>
  )
}