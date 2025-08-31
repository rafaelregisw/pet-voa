'use client'

export default function CuteBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Camada de gradiente super sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/3 via-transparent to-neon/3" />
      
      {/* Apenas 3 nuvens bem sutis e lentas */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${i * 35 + 10}%`,
              top: `${i * 30 + 10}%`,
              animation: `floatCloud ${40 + i * 10}s infinite ease-in-out`,
              animationDelay: `${i * 5}s`
            }}
          >
            <svg width="100" height="50" viewBox="0 0 100 50" fill="currentColor" className="text-electric">
              <ellipse cx="25" cy="35" rx="20" ry="12" />
              <ellipse cx="50" cy="30" rx="28" ry="16" />
              <ellipse cx="70" cy="35" rx="20" ry="12" />
            </svg>
          </div>
        ))}
      </div>

      {/* Menos corações e mais lentos */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-neon/10"
            style={{
              left: `${i * 25 + 10}%`,
              bottom: `-50px`,
              animation: `floatUp ${30 + i * 5}s infinite linear`,
              animationDelay: `${i * 7}s`,
              fontSize: `${16 + Math.random() * 12}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Menos patas e bem mais sutis */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`paw-${i}`}
            className="absolute opacity-3"
            style={{
              left: `${i * 20 + 5}%`,
              top: `${i * 18 + 10}%`,
              animation: `floatDiagonal ${50 + i * 5}s infinite ease-in-out`,
              animationDelay: `${i * 4}s`
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-electric">
              <circle cx="12" cy="14" r="5" />
              <circle cx="8" cy="10" r="2.5" />
              <circle cx="16" cy="10" r="2.5" />
              <circle cx="6" cy="6" r="1.5" />
              <circle cx="18" cy="6" r="1.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Menos estrelas e mais sutis */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${5 + Math.random() * 3}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div className="w-0.5 h-0.5 bg-electric/20 rounded-full" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatCloud {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -10px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 5px) scale(0.98);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.15;
          }
          95% {
            opacity: 0.15;
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
            transform: translate(30px, -20px) rotate(45deg);
          }
          50% {
            transform: translate(-20px, 15px) rotate(90deg);
          }
          75% {
            transform: translate(15px, -25px) rotate(135deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}