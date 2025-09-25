import type { Metadata } from 'next'
import './globals.css'
import { Urbanist, Bangers } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-sans' })
const bangers = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-graffiti' })

export const metadata: Metadata = {
  title: 'Muros de Memoria',
  description: 'Archivo vivo de graffiti urbano y sus contextos socio-políticos en Colombia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${urbanist.variable} ${bangers.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
