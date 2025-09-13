'use client'
import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'a' | 'button'
  href?: string
  className?: string
  children?: React.ReactNode
}

export default function Button({ as = 'button', href, children, className, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2'

  const classes = cn(
    base,
    'bg-primary text-white hover:bg-primary-80 focus:ring-primary-500',
    className
  )

  if (as === 'a') {
    // Cast to appropriate type for anchor props
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href || '#'} className={classes} {...anchorProps}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}