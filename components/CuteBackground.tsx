'use client'

export default function CuteBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Apenas gradiente quase invisível */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/1 via-transparent to-neon/1" />
    </div>
  )
}