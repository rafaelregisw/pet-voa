'use client'

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'wave' | 'none'
}

export default function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'none') return null

  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center py-8 md:py-12">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-electric/30 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-electric/50 animate-pulse delay-75" />
          <div className="w-2 h-2 rounded-full bg-electric/30 animate-pulse delay-150" />
        </div>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className="relative h-16 md:h-24 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,56 C150,100 350,0 600,56 C850,112 1050,0 1200,56 L1200,120 L0,120 Z"
            className="fill-midnight/5"
          />
        </svg>
      </div>
    )
  }

  // Default gradient divider
  return (
    <div className="relative py-8 md:py-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-transparent via-electric/20 to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-midnight px-4">
          <div className="w-1 h-1 bg-electric/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}