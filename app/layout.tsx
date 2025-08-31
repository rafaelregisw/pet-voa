import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://petvoa.com'),
  title: 'Pet Voa - Transporte Premium de Pets para os EUA',
  description: 'A única empresa com psicóloga acompanhante e atualizações em tempo real. Seu pet nunca viaja sozinho.',
  keywords: 'transporte pets, pets EUA, viagem pets, psicóloga pets, transporte animais internacional',
  authors: [{ name: 'Pet Voa' }],
  creator: 'Pet Voa',
  publisher: 'Pet Voa',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Pet Voa - Seu Pet Voa com uma Psicóloga ao Lado',
    description: 'Acompanhe com fotos e vídeos em tempo real. Documentação com expertise jurídica.',
    url: 'https://petvoa.com',
    siteName: 'Pet Voa',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pet Voa - Transporte Premium de Pets',
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Voa - Transporte Premium de Pets para os EUA',
    description: 'A única empresa com psicóloga acompanhante e atualizações em tempo real.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-midnight text-ice antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}