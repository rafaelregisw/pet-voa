import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustBadges from '@/components/TrustBadges'
import VideoSection from '@/components/VideoSection'
import Process from '@/components/Process'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import FloatingParticles from '@/components/FloatingParticles'
import LiveViewers from '@/components/LiveViewers'

export default function Home() {
  return (
    <>
      <FloatingParticles />
      <Header />
      <LiveViewers />
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