'use client'

export default function CuteBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Gradiente cinematográfico sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/3 via-transparent to-neon/3" />
      
      {/* Luzes bokeh cinematográficas de fundo */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`bokeh-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(74, 144, 226, 0.03)' : 'rgba(239, 68, 68, 0.03)'} 0%, transparent 70%)`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
              animation: `floatBokeh ${30 + i * 5}s infinite ease-in-out`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Corações subindo suavemente */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-neon/10"
            style={{
              left: `${i * 25 + 10}%`,
              bottom: `-100px`,
              animation: `floatUpSlow ${60 + i * 10}s infinite linear`,
              animationDelay: `${i * 8}s`,
              fontSize: `${14 + i * 2}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Estrelas flutuando suavemente */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-400/8"
            style={{
              right: `${i * 20 + 5}%`,
              bottom: `-100px`,
              animation: `floatUpSlow ${70 + i * 8}s infinite linear`,
              animationDelay: `${i * 6 + 3}s`,
              fontSize: `${12 + i * 2}px`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Pequenas partículas laterais */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute"
            style={{
              width: '3px',
              height: '3px',
              backgroundColor: i % 2 === 0 ? 'rgba(74, 144, 226, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderRadius: '50%',
              left: i < 4 ? '5%' : '95%',
              top: `${i * 12 + 10}%`,
              animation: `floatSide ${25 + i * 3}s infinite ease-in-out`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Raios de luz cinematográficos */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-[200%] -top-[50%]"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(74, 144, 226, 0.02) 10deg, transparent 20deg, transparent 340deg, rgba(239, 68, 68, 0.02) 350deg, transparent 360deg)',
            animation: 'rotateRays 120s infinite linear'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes floatUpSlow {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes floatBokeh {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
            opacity: 0.4;
          }
          75% {
            transform: translate(-30px, -20px) scale(1.05);
            opacity: 0.45;
          }
        }

        @keyframes floatSide {
          0%, 100% {
            transform: translateX(0) translateY(0);
            opacity: 0.5;
          }
          25% {
            transform: translateX(20px) translateY(-10px);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-10px) translateY(15px);
            opacity: 0.6;
          }
          75% {
            transform: translateX(15px) translateY(-5px);
            opacity: 0.7;
          }
        }

        @keyframes rotateRays {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}