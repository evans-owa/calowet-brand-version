/**
 * Button – shared UI primitive
 *
 * Rendering: Pure client-safe RSC (no hooks, no browser APIs).
 * Can be used inside Server Components, Client Components, Static pages,
 * and Dynamic pages without any wrapper. Marking as 'use client' is NOT
 * needed here — onClick is passed by the consumer, not defined here.
 */

import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'ice'
export type ButtonSize   = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0047AB] text-[#F0F6FF] hover:bg-[#0047AB] active:bg-[#002D6E] shadow-sm hover:shadow-md',
  outline:
    'border-2 border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB] hover:text-[#F0F6FF] bg-transparent',
  ghost:
    'text-[#0047AB] hover:bg-[#DCE8F7]/20 bg-transparent',
  ice:
    'bg-[#F0F6FF] text-[#0047AB] hover:bg-white border border-[#DCE8F7] shadow-sm hover:shadow-md',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  className,
  disabled,
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047AB] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const classes = cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {loading ? <Spinner /> : children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
