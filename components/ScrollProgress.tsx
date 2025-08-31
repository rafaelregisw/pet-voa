'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric via-neon to-electric z-[60] origin-left"
        style={{ scaleX }}
      />
      
      {/* Right side progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="relative h-40 w-[2px] bg-ice/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric to-neon"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: 'top'
            }}
          />
        </div>
        <motion.div
          className="absolute -left-2 w-6 h-6 bg-electric rounded-full shadow-lg shadow-electric/50"
          style={{
            top: useSpring(scrollYProgress, {
              stiffness: 100,
              damping: 30,
              restDelta: 0.001
            }).get() * 160 - 12
          }}
        />
      </div>
    </>
  )
}