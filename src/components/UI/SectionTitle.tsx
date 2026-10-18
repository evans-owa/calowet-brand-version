/**
 * SectionTitle – section heading block used across every page section.
 *
 * Rendering: Server Component (no 'use client').
 * Safe for Static Generation, ISR, SSR, and inside Client Components.
 * No hooks, no browser APIs, no dynamic data — always renders the same
 * markup given the same props, so Next.js can statically prerender it.
 */

import { cn } from '@/lib/utils'

interface SectionTitleProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center' | 'right'
  light?: boolean
  className?: string
  id?: string          // for aria-labelledby on parent <section>
}

export function SectionTitle({
  label,
  heading,
  subheading,
  align = 'center',
  light = false,
  className,
  id,
}: SectionTitleProps) {
  const alignClass = {
    left:   'text-left items-start',
    center: 'text-center items-center',
    right:  'text-right items-end',
  }[align]

  return (
    <div className={cn('flex flex-col gap-3 mb-12', alignClass, className)}>

      {label && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full w-fit',
            light
              ? 'bg-white/15 text-[#DCE8F7]'
              : 'bg-[#0047AB]/10 text-[#0047AB]'
          )}
        >
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              light ? 'bg-[#DCE8F7]' : 'bg-[#0047AB]'
            )}
            aria-hidden="true"
          />
          {label}
        </span>
      )}

      <h2
        id={id}
        className={cn(
          'font-nura font-bold leading-tight',
          'text-3xl md:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-[#0047AB]'
        )}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={cn(
            'text-base md:text-lg leading-relaxed max-w-2xl',
            light ? 'text-[#DCE8F7]' : 'text-gray-500',
            align === 'center' && 'mx-auto'
          )}
        >
          {subheading}
        </p>
      )}

      {/* Decorative rule */}
      <div
        className={cn(
          'flex gap-1 mt-1',
          align === 'center' && 'justify-center',
          align === 'right'  && 'justify-end'
        )}
        aria-hidden="true"
      >
        <span className={cn('h-1 w-10 rounded-full', light ? 'bg-[#DCE8F7]' : 'bg-[#0047AB]')} />
        <span className={cn('h-1 w-4 rounded-full',  light ? 'bg-white/40' : 'bg-[#DCE8F7]')} />
      </div>
    </div>
  )
}
