'use client'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/ifada-logo.png'
import Button from './Button'
import { FaInstagram, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-primary-80 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Link href="/" className="inline-block">
            <Image src={logo} alt="Ifada Logo" width={40} height={40} />
          </Link>
          <p className="text-sm opacity-90">Empowering our community through faith-based education and service.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-white">Explore</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/programs" className="hover:underline">Programs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white">Community</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/events" className="hover:underline">Events</Link></li>
              <li><Link href="/resources" className="hover:underline">Resources</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-start lg:items-end">
          <h4 className="font-medium text-white">Stay Connected</h4>
          <p className="text-sm mt-2">Join our Telegram for real-time updates and community news.</p>
          <div className="mt-3">
            <Button as="a" href="https://t.me/ifadaislamic" className="bg-telegram hover:bg-telegram">
              <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 240 240" fill="currentColor"><path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.24 80.8l-19.7 93.01c-1.49 6.92-5.4 8.66-10.94 5.4l-30.27-22.35-14.6 14.06c-1.61 1.61-2.94 2.94-5.99 2.94l2.12-30.27 55.12-49.73c2.4-2.4-.52-3.75-3.72-1.35l-68.08 42.8-29.3-9.15c-6.36-2-6.49-6.36 1.32-9.4l114.47-44.15c5.32-2 10.02 1.35 8.32 9.15z"/></svg> Join Telegram</span>
            </Button>
          </div>

          <div className="flex space-x-4 mt-4">
            <a href="https://www.tiktok.com/" className="hover:opacity-90"><FaTiktok /></a>
            <a href="https://www.instagram.com/" className="hover:opacity-90"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/40 text-center text-xs py-4 text-white/80">
        © {new Date().getFullYear()} Ifada Islamic Foundation. All rights reserved.
      </div>
    </footer>
  )
}
