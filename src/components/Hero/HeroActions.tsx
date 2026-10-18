'use client'
/**
 * HeroActions – CTA buttons with smooth-scroll behaviour.
 *
 * Rendering: Client Component island ('use client').
 *
 * Why isolated: The parent HeroSection is a Server Component. We need
 * onClick handlers for smooth scroll — that requires 'use client'.
 * By isolating just these two buttons, only ~1KB of JS hydrates for
 * the entire hero section. Everything else (headline, background,
 * stats, illustration) stays as inert server HTML.
 *
 * CSR / SSR / Static compatibility:
 *  - Server render: buttons render with href="#contact" / "#products"
 *    so they work even before JS loads (progressive enhancement).
 *  - After hydration: onClick intercepts and scrolls smoothly.
 */

'use client'

import { IconArrowRight, IconPhone } from '@/components/UI/Icons'

interface HeroActionsProps {
  ctaQuote: string
  ctaContact: string
}

export default function HeroActions({ ctaQuote, ctaContact }: HeroActionsProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">

      {/* Primary CTA — Request Quote */}
      <a
        href="#contact"
        onClick={e => { e.preventDefault(); scrollTo('contact') }}
        className="
          group inline-flex items-center justify-center gap-2.5
          px-8 py-4 rounded-xl
          bg-white text-[#0047AB]
          font-bold text-sm tracking-wide
          shadow-lg shadow-black/20
          hover:bg-[#F0F6FF] hover:shadow-xl hover:shadow-black/25
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all duration-200
        "
      >
        {ctaQuote}
        <IconArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </a>

      {/* Secondary CTA — Contact */}
      <a
        href="#contact"
        onClick={e => { e.preventDefault(); scrollTo('contact') }}
        className="
          group inline-flex items-center justify-center gap-2.5
          px-8 py-4 rounded-xl
          border-2 border-white/30 text-white
          font-semibold text-sm tracking-wide
          hover:bg-white/10 hover:border-white/50
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all duration-200
        "
      >
        <IconPhone className="w-4 h-4 text-[#DCE8F7]" aria-hidden />
        {ctaContact}
      </a>

    </div>
  )
}
