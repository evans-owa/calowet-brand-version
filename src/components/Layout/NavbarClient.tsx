'use client'
/**
 * NavbarClient – multi-page aware navbar.
 *
 * Key behaviour:
 *  Homepage  → starts transparent (hero is dark behind it), goes solid on scroll > 40px
 *  All other → always solid white from the top (no dark hero behind them)
 *
 * Logo links to /${locale} (real URL, not #hero)
 * CTA links to /${locale}/contact (real page, not #contact anchor)
 * Active state uses pathname comparison across all real page URLs
 */

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { IconMenu, IconX, IconGlobe } from '@/components/UI/Icons'
import { LogoIcon } from '@/components/UI/Logo'

interface NavLink  { key: string; label: string; href: string }

interface NavbarClientProps {
  links:    NavLink[]
  ctaLabel: string
  locale:   string
}

export default function NavbarClient({ links, ctaLabel, locale }: NavbarClientProps) {
  const pathname = usePathname()
  const router   = useRouter()

  // Only the homepage has a dark hero that the transparent navbar overlays.
  // Every sub-page starts with a light background → navbar must be solid immediately.
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

  // Solid when: scrolled past 40px  OR  on a sub-page
  const [scrolled,   setScrolled]   = useState(!isHome)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ── Scroll listener — only relevant on homepage ─────────── */
  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    // Reset to non-scrolled when navigating back to home
    setScrolled(window.scrollY > 40)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, pathname])

  /* ── Close mobile drawer on route change ─────────────────── */
  useEffect(() => { setMobileOpen(false) }, [pathname])

  /* ── Lock body scroll when drawer is open ─────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /* ── Language toggle ─────────────────────────────────────── */
  const toggleLocale = useCallback(() => {
    const next    = locale === 'en' ? 'sw' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${next}`)
    router.push(newPath)
  }, [locale, pathname, router])

  /* ── Active link helper ──────────────────────────────────── */
  const isActive = (href: string) => {
    // Home only active when exactly on home
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Derived display state
  const solid = scrolled || !isHome

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-in-out will-change-transform',
          solid
            ? 'bg-white shadow-[0_1px_24px_rgba(0,71,171,0.10)] py-3'
            : 'bg-transparent py-5'
        )}
        role="banner"
      >
        <div className="container-max px-4 md:px-8">
          <nav
            className="flex items-center justify-between gap-4"
            role="navigation"
            aria-label="Main navigation"
          >

            {/* ── Logo — always links to homepage ──────── */}
            <a
              href={`/${locale}`}
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0047AB] rounded-lg"
              aria-label="CaloWet Air — home"
            >
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center',
                'transition-all duration-300',
                solid ? 'bg-[#0047AB]' : 'bg-white/20 border border-white/30'
              )}>
                <LogoIcon
                  color={solid ? 'white' : 'white'}
                  className="w-5 h-5"
                />
              </div>
              <span className={cn(
                'font-nura font-bold text-xl tracking-tight transition-colors duration-300',
                solid ? 'text-[#0047AB]' : 'text-white'
              )}>
                CaloWet
                <span style={{ fontWeight: 500 }}> Air</span>
              </span>
            </a>

            {/* ── Desktop nav links ─────────────────────── */}
            <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="list">
              {links.map(link => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className={cn(
                      'px-3.5 py-2 rounded-lg text-sm font-medium',
                      'transition-all duration-200',
                      isActive(link.href)
                        ? solid
                          ? 'text-[#0047AB] bg-[#0047AB]/10 font-semibold'
                          : 'text-white bg-white/20 font-semibold'
                        : solid
                          ? 'text-gray-600 hover:text-[#0047AB] hover:bg-[#0047AB]/8'
                          : 'text-white/80 hover:text-white hover:bg-white/15'
                    )}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Desktop actions ───────────────────────── */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Language toggle */}
              <button
                onClick={toggleLocale}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg',
                  'text-xs font-bold border transition-all duration-200',
                  solid
                    ? 'text-[#0047AB] border-[#DCE8F7] hover:bg-[#0047AB]/8'
                    : 'text-white border-white/30 hover:bg-white/15'
                )}
                aria-label={`Switch to ${locale === 'en' ? 'Kiswahili' : 'English'}`}
              >
                <IconGlobe className="w-3.5 h-3.5" aria-hidden />
                {locale === 'en' ? 'SW' : 'EN'}
              </button>

              {/* Request Quote — links to /contact page */}
              <a
                href={`/${locale}/contact`}
                className={cn(
                  'inline-flex items-center px-5 py-2.5 rounded-lg',
                  'text-sm font-bold transition-all duration-200',
                  solid
                    ? 'bg-[#0047AB] text-white hover:bg-[#0047AB] shadow-sm hover:shadow-md'
                    : 'bg-white text-[#0047AB] hover:bg-[#F0F6FF] shadow-sm hover:shadow-md'
                )}
              >
                {ctaLabel}
              </a>
            </div>

            {/* ── Mobile hamburger ──────────────────────── */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                solid ? 'text-[#0047AB]' : 'text-white'
              )}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <IconX    className="w-6 h-6" aria-hidden />
                : <IconMenu className="w-6 h-6" aria-hidden />
              }
            </button>

          </nav>
        </div>
      </header>

      {/* ── Mobile drawer overlay ────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          'transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />

        {/* Drawer panel */}
        <div className={cn(
          'absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col',
          'transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}>

          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#DCE8F7]/30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0047AB] flex items-center justify-center">
                <LogoIcon color="white" className="w-4 h-4" />
              </div>
              <span className="font-nura font-bold text-[#0047AB] text-base">
                CaloWet <span style={{ fontWeight: 500 }}>Air</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#0047AB] hover:bg-[#0047AB]/6"
              aria-label="Close menu"
            >
              <IconX className="w-5 h-5" aria-hidden />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto py-3 px-3" aria-label="Mobile navigation">
            <ul className="space-y-0.5" role="list">
              {links.map(link => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      isActive(link.href)
                        ? 'bg-[#0047AB] text-white'
                        : 'text-gray-700 hover:bg-[#0047AB]/6 hover:text-[#0047AB]'
                    )}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer footer */}
          <div className="px-5 py-5 border-t border-[#DCE8F7]/30 space-y-3">
            <button
              onClick={toggleLocale}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#DCE8F7] text-[#0047AB] text-sm font-semibold hover:bg-[#0047AB]/5 transition-colors"
            >
              <IconGlobe className="w-4 h-4" aria-hidden />
              {locale === 'en' ? 'Badilisha kwa Kiswahili' : 'Switch to English'}
            </button>
            <a
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-[#0047AB] text-white text-sm font-bold hover:bg-[#0047AB] transition-colors"
            >
              {ctaLabel}
            </a>
          </div>

        </div>
      </div>
    </>
  )
}
