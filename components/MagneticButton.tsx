'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const percentX = mouseX / (width / 2)
    const percentY = mouseY / (height / 2)

    x.set(percentX * 15)
    y.set(percentY * 15)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center'
      }}
      animate={{
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-electric to-neon opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%'
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          style={{
            transform: 'skewX(-25deg)'
          }}
        />
      </motion.div>
    </motion.button>
  )
}