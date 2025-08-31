'use client'
import { ReactNode } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function ParallaxProviderClient({ children }: { children: ReactNode }) {
  // You can add options if needed
  return <ParallaxProvider>{children}</ParallaxProvider>
}
