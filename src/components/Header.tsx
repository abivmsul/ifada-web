// src/components/Header.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Menu as MenuIcon, X, ChevronDown, ArrowRight } from 'lucide-react'
import cn from 'classnames'
import logo from '@/assets/ifada-logo.png'
import Button from './Button'
import NavLink from './NavLink'

type NavItem = { name: string; to: string; description?: string }

const RESOURCES_SUB: NavItem[] = [
  { name: 'Events', to: '/events', description: 'Upcoming activities & programs' },
  { name: 'Gallery', to: '/gallery', description: 'Photos & videos from our work' },
  { name: 'Posts', to: '/blog', description: 'Posts, news & articles' },
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

  // desktop resources dropdown
  const [resourcesOpen, setResourcesOpen] = useState(false)
  // mobile resources collapse inside the Disclosure.Panel
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)

  const hoverTimer = useRef<number | null>(null)
  const resourcesRef = useRef<HTMLDivElement | null>(null)
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setResourcesOpen(false)
        setMobileResourcesOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // When route changes, close everything and if mobile menu is open try to close it
  useEffect(() => {
    setResourcesOpen(false)
    setMobileResourcesOpen(false)
    try {
      if (mobileButtonRef.current && window.innerWidth < 768) {
        const btn = mobileButtonRef.current
        const expanded = btn.getAttribute('aria-expanded')
        if (expanded === 'true') btn.click()
      }
    } catch {}
  }, [pathname])

  return (
    <Disclosure as="header" className="sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="w-full bg-gradient-to-r from-[#06386d] via-[#0057B8] to-[#06386d] text-white/95 shadow-lg" role="banner">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <NavLink href="/">
                  <Image src={logo} alt="Ifada Logo" className="h-16 w-auto" />
                </NavLink>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                  {TOP_NAV.slice(0, 2).map((item) => (
                    <NavLink
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
                    </NavLink>
                  ))}

                  <NavLink
                    href="/projects"
                    className={cn(
                      'relative px-2 py-1 text-sm transition-colors',
                      isActive('/projects')
                        ? 'text-white font-semibold after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-white'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    Projects
                  </NavLink>

                  {/* Resources dropdown */}
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
                      <span>Resources</span>
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
                      {/* Close button for desktop dropdown (useful on touch) */}
                      <button
                        aria-label="Close resources"
                        onClick={() => setResourcesOpen(false)}
                        className="absolute top-2 right-2 rounded p-1 text-slate-600 hover:bg-slate-100"
                        type="button"
                      >
                        <X size={16} />
                      </button>

                      <div className="p-4 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold">Quick Links</h4>
                          <p className="text-xs text-slate-600 mt-1">Jump to events, gallery, blog & podcasts.</p>

                          <div className="mt-3 space-y-2">
                            {RESOURCES_SUB.map((sub) => (
                              <NavLink
                                key={sub.to}
                                href={sub.to}
                                onNavigate={() => setResourcesOpen(false)}
                                className="flex items-start gap-3 p-2 rounded hover:bg-slate-50"
                              >
                                <div className="w-9 h-9 bg-primary/10 rounded flex items-center justify-center text-secondary">
                                  <ArrowRight size={14} />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{sub.name}</div>
                                  <div className="text-xs text-slate-500">{sub.description}</div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        <div className="pl-2 border-l border-slate-100">
                          <h4 className="text-sm font-semibold">More resources</h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li><span className="block hover:underline text-slate-700">Summer Lecture — Aug 10</span></li>
                            <li><span className="block hover:underline text-slate-700">Ramadan Highlights</span></li>
                            <li><span className="block hover:underline text-slate-700">Community Impact Report</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-slate-100/60 px-4 py-3 flex items-center justify-between">
                        <span className="text-xs text-slate-600">Explore more resources</span>
                        <NavLink href="/resources" className="text-sm text-primary font-medium">All resources →</NavLink>
                      </div>
                    </div>
                  </div>

                  <NavLink
                    href="/programs"
                    className={cn(
                      'relative px-2 py-1 text-sm transition-colors',
                      isActive('/programs')
                        ? 'text-white font-semibold after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-white'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    Hadrel
                  </NavLink>
                </nav>

                {/* Right-side group (desktop) */}
                <div className="hidden md:flex items-center gap-4">
                  <NavLink href="/contact" className={cn('px-3 py-2 rounded-md text-sm bg-white/10 hover:bg-white/20 transition-colors', isActive('/contact') ? 'text-white font-semibold' : 'text-white/90')}>
                    Contact
                  </NavLink>

                  <NavLink href="https://t.me/ifadaislamicorg1">
                    <Button className="bg-secondary hover:bg-telegram" {...{ target: '_blank', rel: 'noopener noreferrer' }}>
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 240 240" fill="currentColor">
                          <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.24 80.8l-19.7 93.01c-1.49 6.92-5.4 8.66-10.94 5.4l-30.27-22.35-14.6 14.06c-1.61 1.61-2.94 2.94-5.99 2.94l2.12-30.27 55.12-49.73c2.4-2.4-.52-3.75-3.72-1.35l-68.08 42.8-29.3-9.15c-6.36-2-6.49-6.36 1.32-9.4l114.47-44.15c5.32-2 10.02 1.35 8.32 9.15z" />
                        </svg>
                        Join Telegram
                      </span>
                    </Button>
                  </NavLink>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Disclosure.Button
                    ref={(node) => {
                      if (node) {
                        mobileButtonRef.current = node as HTMLButtonElement
                      }
                    }}
                    className="p-2 rounded-md text-white hover:bg-white/10"
                    aria-label="Toggle menu"
                    onClick={() => {
                      // always close resource dropdowns when toggling the mobile menu
                      setResourcesOpen(false)
                      setMobileResourcesOpen(false)
                    }}
                  >
                    {open ? <X size={20} /> : <MenuIcon size={20} />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile panel */}
          <Disclosure.Panel as="div" className="md:hidden">
            <div className="fixed inset-0 z-40 bg-black/30" aria-hidden onClick={() => { try { mobileButtonRef.current?.click() } catch {} }} />

            <div className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-[#06386d] to-[#0057B8] text-white/95 overflow-auto" style={{ maxHeight: '100vh' }} onClick={(e) => e.stopPropagation()}>
              <div className="px-4 pt-4 pb-6 space-y-2">
                {TOP_NAV.slice(0, 3).map((item) => (
                  <NavLink
                    key={item.to}
                    href={item.to}
                    onNavigate={() => { try { mobileButtonRef.current?.click() } catch {} }}
                    className={cn('block px-3 py-2 rounded text-white text-base', isActive(item.to) ? 'bg-white/10 font-semibold' : 'hover:bg-white/10')}
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="pt-2">
                  <div className="border-t border-white/10 my-2" />

                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileResourcesOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded text-white hover:bg-white/10"
                      aria-expanded={mobileResourcesOpen}
                    >
                      <span className="font-medium">Resources</span>
                      <ChevronDown size={16} className={cn('transition-transform', mobileResourcesOpen ? 'rotate-180' : 'rotate-0')} />
                    </button>

                    <div className={cn('mt-1 space-y-1 pl-3 transition-all', mobileResourcesOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden')}>
                      {RESOURCES_SUB.map((s) => (
                        <NavLink
                          key={s.to}
                          href={s.to}
                          onNavigate={() => { try { mobileButtonRef.current?.click() } catch {} }}
                          className="block px-3 py-2 rounded text-white/95 hover:bg-white/10 text-sm"
                        >
                          {s.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 my-2" />
                </div>

                <NavLink href="/programs" onNavigate={() => { try { mobileButtonRef.current?.click() } catch {} }} className={cn('block px-3 py-2 rounded text-white text-base', isActive('/programs') ? 'bg-white/10 font-semibold' : 'hover:bg-white/10')}>
                  Hadrel
                </NavLink>

                <NavLink href="/contact" onNavigate={() => { try { mobileButtonRef.current?.click() } catch {} }} className={cn('block px-3 py-2 rounded text-white text-base', isActive('/contact') ? 'bg-white/10 font-semibold' : 'hover:bg-white/10')}>
                  Contact
                </NavLink>

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
