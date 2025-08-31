'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Check if hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, input, textarea, [role="button"]')
      setIsPointer(!!interactive)
    }

    window.addEventListener('mouseover', handleElementHover)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleElementHover)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isHidden ? 0 : 1
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2 : 1,
            backgroundColor: isPointer ? '#00B4D8' : '#FFFFFF'
          }}
          transition={{ duration: 0.2 }}
          className="w-full h-full rounded-full border-2 border-white/50 backdrop-blur-sm"
        />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHidden ? 0 : 0.3
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.5 : 1
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="w-full h-full rounded-full bg-gradient-to-r from-electric to-neon blur-xl"
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9997]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHidden ? 0 : 0.15
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.2 : 1,
            rotate: 360
          }}
          transition={{ 
            scale: { duration: 0.4, delay: 0.1 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="w-full h-full rounded-full bg-gradient-to-r from-neon via-electric to-neon blur-2xl"
        />
      </motion.div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}