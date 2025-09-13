// src/components/NavLink.tsx
'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useLoading } from '@/context/LoadingContext'

type NavLinkProps = LinkProps & {
  className?: string
  children: React.ReactNode
  onNavigate?: () => void | Promise<void>
}

// Type guard to check if href is an object with pathname
function hasPathname(href: LinkProps['href']): href is { pathname: string } {
  return typeof href === 'object' && href !== null && 'pathname' in href
}

export default function NavLink({ href, children, replace, className, onNavigate, ...rest }: NavLinkProps) {
  const router = useRouter()
  const { show, hide } = useLoading()
  
  // Get href value safely without using any
  let hrefValue = '/'
  if (typeof href === 'string') {
    hrefValue = href
  } else if (hasPathname(href)) {
    hrefValue = href.pathname
  }

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // allow modifier clicks to behave normally
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    try {
      // show overlay and give provider the target path to watch
      show({ target: hrefValue })
      if (onNavigate) await onNavigate()
      if (replace) await router.replace(hrefValue)
      else await router.push(hrefValue)
      // don't call hide() here — LoadingProvider will hide when pathname matches targetPath
    } catch (err) {
      console.error('NavLink navigation error', err)
      // fallback: hide overlay if navigation failed
      hide()
    }
  }

  // If child is already an <a>, clone it and attach the handler & merge classes
  if (React.isValidElement(children) && children.type === 'a') {
    const child = children as React.ReactElement<React.AnchorHTMLAttributes<HTMLAnchorElement>>
    const mergedClass = [className ?? '', (child.props.className ?? '')].filter(Boolean).join(' ')
    const childOnClick = child.props.onClick
    const composedOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      try {
        if (typeof childOnClick === 'function') childOnClick(e)
      } finally {
        if (!e.defaultPrevented) {
          void handleClick(e)
        }
      }
    }
    return React.cloneElement(child, {
      onClick: composedOnClick,
      className: mergedClass,
      ...rest,
    })
  }

  return (
    <Link
      href={href}
      {...Object.fromEntries(Object.entries(rest).filter(([key]) => key !== 'href'))}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  )
}