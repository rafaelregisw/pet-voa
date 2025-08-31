'use client'

export default function CuteBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Apenas gradiente super sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/2 via-transparent to-neon/2" />
      
      {/* Apenas alguns corações discretos */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-neon/5"
            style={{
              left: `${i * 35 + 15}%`,
              bottom: `-50px`,
              animation: `floatUp ${45 + i * 10}s infinite linear`,
              animationDelay: `${i * 10}s`,
              fontSize: `${16 + i * 2}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.08;
          }
          95% {
            opacity: 0.08;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}