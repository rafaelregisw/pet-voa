'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  emoji: string
  x: number
  y: number
  duration: number
  delay: number
}

export default function FloatingPets() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  
  const decorEmojis = ['❤️', '💕', '⭐', '✨']
  
  useEffect(() => {
    const newElements: FloatingElement[] = []
    
    // Apenas 4 elementos decorativos leves
    for (let i = 0; i < 4; i++) {
      newElements.push({
        id: i,
        emoji: decorEmojis[i],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 40, // Mais lento
        delay: Math.random() * 10,
      })
    }
    
    setElements(newElements)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-2xl opacity-10" // Mais transparente
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0], // Movimento mais sutil
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  )
}