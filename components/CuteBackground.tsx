'use client'

export default function CuteBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Camada de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-neon/5" />
      
      {/* Nuvens flutuantes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatCloud ${20 + i * 5}s infinite ease-in-out`,
              animationDelay: `${i * 2}s`
            }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" fill="currentColor" className="text-electric">
              <ellipse cx="30" cy="40" rx="25" ry="15" />
              <ellipse cx="60" cy="35" rx="35" ry="20" />
              <ellipse cx="85" cy="40" rx="25" ry="15" />
            </svg>
          </div>
        ))}
      </div>

      {/* Corações flutuantes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-neon/20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-50px`,
              animation: `floatUp ${15 + i * 3}s infinite linear`,
              animationDelay: `${i * 2}s`,
              fontSize: `${20 + Math.random() * 20}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Patas de pet flutuantes */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={`paw-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatDiagonal ${25 + i * 3}s infinite ease-in-out`,
              animationDelay: `${i * 1.5}s`
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" className="text-electric">
              <circle cx="15" cy="18" r="6" />
              <circle cx="10" cy="12" r="3" />
              <circle cx="20" cy="12" r="3" />
              <circle cx="8" cy="8" r="2" />
              <circle cx="22" cy="8" r="2" />
            </svg>
          </div>
        ))}
      </div>

      {/* Estrelas piscantes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <div className="w-1 h-1 bg-electric/30 rounded-full" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatCloud {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 10px) scale(0.95);
          }
          75% {
            transform: translate(10px, -30px) scale(1.05);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatDiagonal {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(50px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-30px, 20px) rotate(180deg);
          }
          75% {
            transform: translate(20px, -40px) rotate(270deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}