'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import logo from '@/assets/ifada-logo.png' // place your logo at public/ifada-logo.png
import Image from 'next/image'
import cn from 'classnames'

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Projects', to: '/projects' },
  { name: 'Hadrel', to: '/programs' },
  { name: 'Events', to: '/events' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Resources', to: '/resources' },
  { name: 'Contact', to: '/contact' },
]

export default function Header() {
  const pathname = usePathname() || '/'

  return (
   <Disclosure
      as="header"
      // Mobile: top→bottom gradient via inline style
      style={{ background: 'linear-gradient(to right, rgba(2, 34, 70, 0.74), #0057B8)' }}
      // Desktop: left→right gradient via Tailwind overrides
      className="sticky top-0 z-50 md:bg-gradient-to-r md:from-primary md:to-primary shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Ifada Logo" className="h-16 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {links.map(({ name, to }) => {
                const active = pathname === to
                return (
                  <Link
                    key={name}
                    href={to}
                    className={cn(
                      'px-2 py-1 transition text-white',
                      active ? 'border-b-2 border-white font-semibold' : 'text-white/90 hover:text-white'
                    )}
                  >
                    {name}
                  </Link>
                )
              })}
            </nav>

            <div className="md:hidden">
              <Disclosure.Button className="p-2 rounded-md text-white hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary">
                {open ? <X size={20} /> : <Menu size={20} />}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden bg-primary/95">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {links.map(({ name, to }) => (
                <Disclosure.Button key={name} as="a" href={to} className="block px-3 py-2 rounded text-white hover:bg-primary/80">
                  {name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
