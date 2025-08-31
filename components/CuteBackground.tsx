'use client'

import { useState, useEffect } from 'react'

export default function CuteBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // No mobile, gradiente colorido mas sem animações
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Base escura */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050510] to-[#0a0a0f]" />
        
        {/* Luzes coloridas estáticas mas bonitas */}
        <div 
          className="absolute -top-20 -left-20 w-60 h-60"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        
        <div 
          className="absolute -top-20 -right-20 w-60 h-60"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Base escura profunda */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050510] to-[#0a0a0f]" />
      
      {/* NEON ROSA - Top Left Corner Glow */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.15) 30%, rgba(236, 72, 153, 0.05) 60%, transparent 80%)',
          filter: 'blur(100px)',
          animation: 'neonPulse 4s ease-in-out infinite'
        }}
      />
      
      {/* NEON ROXO - Top Right Power */}
      <div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.15) 30%, rgba(147, 51, 234, 0.05) 60%, transparent 80%)',
          filter: 'blur(100px)',
          animation: 'neonPulse 5s ease-in-out infinite',
          animationDelay: '1s'
        }}
      />
      
      {/* NEON AZUL CIANO - Center Stage Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.1) 25%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)',
          filter: 'blur(150px)',
          animation: 'centerStage 8s ease-in-out infinite'
        }}
      />
      
      {/* NEON BRANCO - Spotlight Effect */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[800px]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
          filter: 'blur(80px)',
          animation: 'spotlight 10s ease-in-out infinite',
          transformOrigin: 'top center'
        }}
      />
      
      {/* NEON ROSA PINK - Bottom Ambient */}
      <div 
        className="absolute -bottom-40 left-1/4 w-[500px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(244, 114, 182, 0.3) 0%, rgba(244, 114, 182, 0.1) 40%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'neonFloat 6s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      
      {/* NEON AZUL ELÉTRICO - Bottom Right */}
      <div 
        className="absolute -bottom-40 right-1/4 w-[500px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'neonFloat 7s ease-in-out infinite',
          animationDelay: '3.5s'
        }}
      />
      
      {/* Floating Neon Orbs */}
      {[
        { color: '236, 72, 153', size: 200, x: '15%', y: '30%', duration: 18 },
        { color: '147, 51, 234', size: 150, x: '75%', y: '25%', duration: 22 },
        { color: '6, 182, 212', size: 180, x: '85%', y: '70%', duration: 20 },
        { color: '244, 114, 182', size: 160, x: '20%', y: '75%', duration: 24 },
        { color: '59, 130, 246', size: 140, x: '50%', y: '15%', duration: 19 },
      ].map((orb, i) => (
        <div
          key={`neon-orb-${i}`}
          className="absolute"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(${orb.color}, 0.3) 0%, rgba(${orb.color}, 0.1) 40%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: `floatNeon ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes neonPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
        
        @keyframes centerStage {
          0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.95);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes spotlight {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-50%) scaleX(1) rotate(0deg);
          }
          25% {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(1.2) rotate(-2deg);
          }
          75% {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(1.2) rotate(2deg);
          }
        }
        
        @keyframes neonFloat {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-20px) scale(1.1);
          }
        }
        
        @keyframes floatNeon {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translate(-15px, 15px) scale(0.95);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}