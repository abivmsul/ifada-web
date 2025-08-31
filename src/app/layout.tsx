import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Ifada Islamic Organization',
  description: 'Knowledge • Faith • Service',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
