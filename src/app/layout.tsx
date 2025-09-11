import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
// src/app/layout.tsx
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700','900'] })

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const metadata = {
  title: 'Ifada Islamic Organization',
  description: 'Knowledge • Faith • Service',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
     <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
