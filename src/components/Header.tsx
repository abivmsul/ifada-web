// src/components/Header.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Menu as MenuIcon, X, ChevronDown, ArrowRight } from 'lucide-react'
import cn from 'classnames'
import logo from '@/assets/ifada-logo.png'
import Button from './Button'

type NavItem = { name: string; to: string; description?: string }

const RESOURCES_SUB: NavItem[] = [
  { name: 'Events', to: '/events', description: 'Upcoming activities & programs' },
  { name: 'Gallery', to: '/gallery', description: 'Photos & videos from our work' },
  { name: 'Blog', to: '/blog', description: 'Sermons, news & articles' },
  { name: 'Podcasts', to: '/podcast', description: 'Listen on-demand' },
]

const TOP_NAV: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Projects', to: '/projects' },
  { name: 'Hadrel', to: '/programs' },
  { name: 'Contact', to: '/contact' },
]

export default function Header() {
  const pathname = usePathname() || '/'
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  // desktop resources dropdown state (hover/focus)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const hoverTimer = useRef<number | null>(null)
  const resourcesRef = useRef<HTMLDivElement | null>(null)

  // mobile button ref so we can programmatically toggle the Disclosure
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    }
  }, [])

  function openResourcesSoon() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    setResourcesOpen(true)
  }
  function closeResourcesSoon() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setResourcesOpen(false), 160)
  }

  // close dropdown on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setResourcesOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Disclosure as="header" className="sticky top-0 z-50">
      {({ open }) => (
        <>
          <div
            className="w-full bg-gradient-to-r from-[#06386d] via-[#0057B8] to-[#06386d] text-white/95 shadow-lg"
            role="banner"
            aria-expanded={open}
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href="/">
                  <Image src={logo} alt="Ifada Logo" className="h-16 w-auto" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                  {TOP_NAV.slice(0, 2).map((item) => (
                    <Link
                      key={item.to}
                      href={item.to}
                      className={cn(
                        'relative px-2 py-1 text-sm transition-colors',
                        isActive(item.to)
                          ? 'text-white font-semibold after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-white'
                          : 'text-white/90 hover:text-white'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Link
                    href="/projects"
                    className={cn(
                      'relative px-2 py-1 text-sm transition-colors',
                      isActive('/projects')
                        ? 'text-white font-semibold after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-white'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    Projects
                  </Link>

                  {/* Resources dropdown (desktop) */}
                  <div
                    ref={resourcesRef}
                    onMouseEnter={openResourcesSoon}
                    onMouseLeave={closeResourcesSoon}
                    onFocus={openResourcesSoon}
                    onBlur={closeResourcesSoon}
                    className="relative"
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={resourcesOpen}
                      onClick={() => setResourcesOpen((v) => !v)}
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 text-sm rounded transition-colors',
                        pathname.startsWith('/resources') ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                      )}
                    >
                      Resources
                      <ChevronDown size={14} className={cn('transition-transform', resourcesOpen ? 'rotate-180' : 'rotate-0')} />
                    </button>

                    <div
                      role="menu"
                      aria-label="Resources"
                      className={cn(
                        'pointer-events-auto absolute top-full mt-3 left-0 w-[420px] bg-white/95 text-slate-900 rounded-xl shadow-2xl ring-1 ring-black/6 backdrop-blur-md transition-all transform origin-top-left',
                        resourcesOpen ? 'opacity-97 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      )}
                      style={{ zIndex: 60 }}
                    >
                      <div className="p-4 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold">Quick Links</h4>
                          <p className="text-xs text-slate-600 mt-1">Jump to events, gallery, blog & podcasts.</p>

                          <div className="mt-3 space-y-2">
                            {RESOURCES_SUB.map((sub) => (
                              <Link
                                key={sub.to}
                                href={sub.to}
                                onClick={() => setResourcesOpen(false)}
                                className="flex items-start gap-3 p-2 rounded hover:bg-slate-50"
                              >
                                <div className="w-9 h-9 bg-primary/10 rounded flex items-center justify-center text-secondary">
                                  <ArrowRight size={14} />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{sub.name}</div>
                                  <div className="text-xs text-slate-500">{sub.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="pl-2 border-l border-slate-100">
                          <h4 className="text-sm font-semibold">More resources</h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>
                              <Link href="#" className="block hover:underline text-slate-700">
                                Summer Lecture — Aug 10
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="block hover:underline text-slate-700">
                                Ramadan Highlights
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="block hover:underline text-slate-700">
                                Community Impact Report
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-slate-100/60 px-4 py-3 flex items-center justify-between">
                        <span className="text-xs text-slate-600">Explore more resources</span>
                        <Link href="#" className="text-sm text-primary font-medium">
                          All resources →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/programs"
                    className={cn(
                      'relative px-2 py-1 text-sm transition-colors',
                      isActive('/programs')
                        ? 'text-white font-semibold after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-white'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    Hadrel
                  </Link>
                </nav>

                {/* Right-side group (desktop) */}
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/contact"
                    className={cn(
                      'px-3 py-2 rounded-md text-sm bg-white/10 hover:bg-white/20 transition-colors',
                      isActive('/contact') ? 'text-white font-semibold' : 'text-white/90'
                    )}
                  >
                    Contact
                  </Link>
                  <Button as="a" href="https://t.me/ifadaislamicorg1" className="bg-secondary hover:bg-telegram" {...{ target: "_blank", rel: "noopener noreferrer" }}>
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 240 240" fill="currentColor">
                        <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.24 80.8l-19.7 93.01c-1.49 6.92-5.4 8.66-10.94 5.4l-30.27-22.35-14.6 14.06c-1.61 1.61-2.94 2.94-5.99 2.94l2.12-30.27 55.12-49.73c2.4-2.4-.52-3.75-3.72-1.35l-68.08 42.8-29.3-9.15c-6.36-2-6.49-6.36 1.32-9.4l114.47-44.15c5.32-2 10.02 1.35 8.32 9.15z" />
                      </svg>
                      Join Telegram
                    </span>
                  </Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  {/* attach ref so we can trigger click programmatically to close the panel */}
                  <Disclosure.Button ref={mobileButtonRef as any} className="p-2 rounded-md text-white hover:bg-white/10">
                    {open ? <X size={20} /> : <MenuIcon size={20} />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile panel: we add a clickable backdrop that closes the panel and prevent clicks inside the panel from bubbling */}
          <Disclosure.Panel as="div" className="md:hidden">
            {/* backdrop: covers full viewport and closes menu when clicked */}
            <div
              className="fixed inset-0 z-40 bg-black/30"
              aria-hidden
              onClick={() => {
                // toggle the disclosure by clicking the hamburger button programmatically
                try {
                  mobileButtonRef.current?.click()
                } catch (e) {
                  /* ignore */
                }
              }}
            />

            {/* actual menu content (stops propagation so backdrop doesn't receive clicks when user interacts with menu) */}
            <div
              className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-[#06386d] to-[#0057B8] text-white/95 overflow-auto"
              style={{ maxHeight: '100vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {/* Top links — use Disclosure.Button as={Link} so it closes on click */}
                {TOP_NAV.slice(0, 3).map((item) => (
                  <Disclosure.Button
                    key={item.to}
                    as={Link}
                    href={item.to}
                    className={cn(
                      'block px-3 py-2 rounded text-white text-base',
                      isActive(item.to) ? 'bg-white/10 font-semibold' : 'hover:bg-white/10'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                {/* Resources nested */}
                <Disclosure as="div" className="pt-2">
                  {({ open: innerOpen }) => (
                    <>
                      <div className="border-t border-white/10 my-2" />

                      <Disclosure.Button className="w-full flex items-center justify-between px-3 py-2 rounded text-white hover:bg-white/10">
                        <span className="font-medium">Resources</span>
                      </Disclosure.Button>

                      <Disclosure.Panel as="div" className="mt-1 space-y-1 pl-3">
                        {RESOURCES_SUB.map((s) => (
                          <Disclosure.Button
                            key={s.to}
                            as={Link}
                            href={s.to}
                            className="block px-3 py-2 rounded text-white/95 hover:bg-white/10 text-sm"
                          >
                            {s.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>

                      <div className="border-t border-white/10 my-2" />
                    </>
                  )}
                </Disclosure>

                {/* Hadrel and Contact */}
                <Disclosure.Button
                  as={Link}
                  href="/programs"
                  className={cn(
                    'block px-3 py-2 rounded text-white text-base',
                    isActive('/programs') ? 'bg-white/10 font-semibold' : 'hover:bg-white/10'
                  )}
                >
                  Hadrel
                </Disclosure.Button>

                <Disclosure.Button
                  as={Link}
                  href="/contact"
                  className={cn(
                    'block px-3 py-2 rounded text-white text-base',
                    isActive('/contact') ? 'bg-white/10 font-semibold' : 'hover:bg-white/10'
                  )}
                >
                  Contact
                </Disclosure.Button>

                <div className="pt-4 border-t border-white/10">
                  <Button as="a" href="https://t.me/ifadaislamicorg1" className="bg-secondary hover:bg-telegram">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 240 240" fill="currentColor">
                        <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.24 80.8l-19.7 93.01c-1.49 6.92-5.4 8.66-10.94 5.4l-30.27-22.35-14.6 14.06c-1.61 1.61-2.94 2.94-5.99 2.94l2.12-30.27 55.12-49.73c2.4-2.4-.52-3.75-3.72-1.35l-68.08 42.8-29.3-9.15c-6.36-2-6.49-6.36 1.32-9.4l114.47-44.15c5.32-2 10.02 1.35 8.32 9.15z" />
                      </svg>
                      Join Telegram
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
