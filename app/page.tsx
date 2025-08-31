import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustBadges from '@/components/TrustBadges'
import Process from '@/components/Process'
import Services from '@/components/Services'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// Lazy load componentes pesados
const VideoSection = dynamic(() => import('@/components/VideoSection'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center">Carregando...</div>
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center">Carregando...</div>
})

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center">Carregando...</div>
})

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <VideoSection />
        <Process />
        <Services />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}