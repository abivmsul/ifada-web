import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
// src/app/layout.tsx
import TopProgressBar from '@/components/TopProgressBar'
import { LoadingProvider } from '@/context/LoadingContext'
import LoadingOverlay from '@/components/LoadingOverlay'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
export const metadata = {
  title: 'Ifada Islamic Organization',
  description: 'IFADA Community Hadra Chain is an Ethiopian Islamic organization focused on youth engagement, spiritual growth, community development, and promoting Islamic history and knowledge. They offer weekly programs, support social responsibility projects, and aim to strengthen the Muslim community through education, social work, and spiritual practices like Quran recitation and salawat. They also focus on building Islamic institutions and fostering unity and collaboration within the Muslim community. በተያያዙ ክንዶች፣ በኢስላማዊ ቤተሰብነት፣ የተረሳውን ማስታወስ፣ የጎደለውን መሙላት፣ በልብ ለልብ ትስስር፣ ስለ እስልምና መተዋወስ፡፡ / የኢፋዳ ማህበረሰብ የሀድራ ትስስር በኢትዮጵያ የሚገኝ የወጣቶችን ተሳትፎ፣ መንፈሳዊ እድገት፣ የማህበረሰብ ልማት እንዲሁም የእስልምና ታሪክና እውቀትን በማስተዋወቅ ላይ ያተኮረ የእስልምና ድርጅት ነው። ሳምንታዊ ፕሮግራሞችን ያቀርባሉ፣ የማህበራዊ ኃላፊነት ፕሮጀክቶችን ይደግፋሉ፣ እናም የሙስሊሙን ማህበረሰብ በትምህርት፣ በማህበራዊ ስራ፣ እና እንደ ቁርአን ንባብ እና ሶለዋት ባሉ መንፈሳዊ ልምምዶች ለማጠናከር ይሰራሉ። በተጨማሪም የእስልምና ተቋማትን በመገንባት እና በሙስሊሙ ማህበረሰብ ውስጥ አንድነትን እና ትብብርን ለማዳበር ላይ ያተኩራሉ። ወጣቱን የማህበረሰብ ክፍል ከመንፈሳዊነት ጋር ማቆራኘትና ማህበራዊ ሃላፊነትን መወጣት በተያያዙ ክንዶች፣ በኢስላማዊ ቤተሰብነት፣ የተረሳውን ማስታወስ፣ የጎደለውን መሙላት፣ በልብ ለልብ ትስስር፣ ስለ እስልምና መተዋወስ፡፡',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/favicon-180x180.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
     <html lang="en" className={inter.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {/* <link rel="manifest" href="/site.webmanifest" /> */}

      <body className="bg-white text-gray-900 antialiased">
         <LoadingProvider>
        <TopProgressBar />
        <Header />
        <LoadingOverlay />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        </LoadingProvider>
      </body>
    </html>
  )
}
