/**
 * HeroSection – full-viewport landing hero.
 *
 * Rendering strategy: Static Server Component shell.
 *
 * Split:
 *  HeroSection (this file) → Server Component
 *    Reads translations server-side via getTranslations().
 *    Renders all static markup: headline, tagline, stat strip,
 *    background layers. Zero client JS for this layer.
 *
 *  HeroActions (./HeroActions.tsx) → Client Component island
 *    Handles smooth-scroll on CTA button clicks and the
 *    animated scroll-down chevron. Hydrated once, minimal bundle.
 *
 * Caching: No fetch() calls — purely translation + markup.
 * At build time Next.js prerenders this for /en and /sw.
 * If you later add a dynamic "latest project" pull-in, add:
 *   export const revalidate = 3600  in the page that includes it.
 */

import { getTranslations } from 'next-intl/server'
import {
  IconWind,
  IconThermometer,
  IconShield,
  IconCheck,
} from '@/components/UI/Icons'
import { LogoIcon, LogoFull, LogoWithTagline } from '@/components/UI/Logo'
import HeroActions from './HeroActions'

export default async function HeroSection() {
  const t = await getTranslations('hero')
  const ta = await getTranslations('about')

  const stats = [
    { value: '10+',   label: ta('stats.experience'), icon: IconShield    },
    { value: '5',     label: ta('stats.regions'),    icon: IconWind      },
    { value: '500+',  label: ta('stats.clients'),    icon: LogoIcon      },
  ]

  const trustBadges = [
    'Licensed & Certified',
    'Genuine Equipment',
    'After-Sales Support',
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >

      {/* ── Multi-layer background ──────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">

        {/* Base gradient — royal blue deep to slightly lighter */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(145deg, #002D6E 0%, #0047AB 45%, #0047AB 100%)',
          }}
        />

        {/* Powder blue radial glow — top right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #DCE8F7 0%, transparent 70%)',
          }}
        />

        {/* Subtle bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-15"
          style={{
            background:
              'radial-gradient(ellipse, #DCE8F7 0%, transparent 70%)',
          }}
        />

        {/* Diagonal geometric accent lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#DCE8F7" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Large faded logo mark watermark — right side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-[0.05]">
          <LogoIcon color="white" className="w-[560px] h-[560px]" />
        </div>

        {/* Floating HVAC SVG illustration — abstract AC unit lines */}
        <svg
          className="absolute bottom-20 right-8 md:right-16 lg:right-24 opacity-[0.12] hidden md:block"
          width="320" height="200"
          viewBox="0 0 320 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="HVAC air conditioning unit illustration with airflow lines"
        >
          {/* AC unit body */}
          <rect x="20" y="40" width="280" height="100" rx="12" stroke="#DCE8F7" strokeWidth="2"/>
          {/* Vents */}
          {[60, 90, 120, 150, 180, 210, 240].map((x, i) => (
            <line key={i} x1={x} y1="60" x2={x} y2="120" stroke="#DCE8F7" strokeWidth="1.5"/>
          ))}
          {/* Fan circle */}
          <circle cx="270" cy="90" r="28" stroke="#DCE8F7" strokeWidth="2"/>
          <circle cx="270" cy="90" r="10" stroke="#DCE8F7" strokeWidth="1.5"/>
          {/* Fan blades */}
          <path d="M270 62 Q282 78 270 90 Q258 78 270 62Z" stroke="#DCE8F7" strokeWidth="1" fill="none"/>
          <path d="M298 90 Q282 102 270 90 Q282 78 298 90Z" stroke="#DCE8F7" strokeWidth="1" fill="none"/>
          <path d="M270 118 Q258 102 270 90 Q282 102 270 118Z" stroke="#DCE8F7" strokeWidth="1" fill="none"/>
          <path d="M242 90 Q258 78 270 90 Q258 102 242 90Z" stroke="#DCE8F7" strokeWidth="1" fill="none"/>
          {/* Air flow lines */}
          <path d="M20 150 Q60 165 100 155 Q140 145 180 158 Q220 168 280 152" stroke="#DCE8F7" strokeWidth="1.5" fill="none" strokeDasharray="6 4"/>
          <path d="M20 168 Q70 180 120 170 Q170 160 220 175 Q260 183 300 170" stroke="#DCE8F7" strokeWidth="1" fill="none" strokeDasharray="4 6"/>
        </svg>
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center">
        <div className="container-max section-padding w-full pt-28 pb-20">
          <div className="max-w-3xl">

            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span
                className="w-2 h-2 rounded-full bg-[#DCE8F7] animate-pulse"
                aria-hidden
              />
              <span className="text-[#DCE8F7] text-xs font-bold uppercase tracking-[0.18em]">
                HVAC Solutions Kenya
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-nura font-black text-white leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              CaloWet
              <br />
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: '2px #DCE8F7',
                  color: 'transparent',
                }}
              >
                Air
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-[#DCE8F7] text-lg md:text-xl font-medium leading-relaxed mb-4 max-w-xl">
              {t('tagline')}
            </p>

            {/* Subtitle */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              {t('subtitle')}
            </p>

            {/* Trust badges */}
            <ul className="flex flex-wrap gap-3 mb-10" aria-label="Trust indicators">
              {trustBadges.map(badge => (
                <li
                  key={badge}
                  className="flex items-center gap-1.5 text-xs text-white/70 bg-white/8 border border-white/12 px-3 py-1.5 rounded-full"
                >
                  <IconCheck className="w-3 h-3 text-[#DCE8F7]" aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>

            {/* CTA buttons — client island for smooth scroll */}
            <HeroActions
              ctaQuote={t('ctaQuote')}
              ctaContact={t('ctaContact')}
            />
          </div>
        </div>
      </div>

      {/* ── Stats strip ────────────────────────────────────── */}
      <div
        className="relative border-t border-white/10"
        style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)' }}
      >
        <div className="container-max section-padding py-6 md:py-8">
          <dl className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#DCE8F7]" aria-hidden />
                </div>
                <div>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-nura font-black text-white text-2xl md:text-3xl leading-none">
                    {value}
                  </dd>
                  <p className="text-white/50 text-xs mt-1 leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Scroll indicator — client island ───────────────── */}
      <HeroScrollChevron />

    </section>
  )
}

/**
 * HeroScrollChevron – purely decorative animated scroll cue.
 * Imported inline to keep the file count low; it's tiny.
 * Must be a separate import path so Next.js tree-shakes it
 * into the client bundle only.
 */
function HeroScrollChevron() {
  // Server-renders a static version; the pulse animation runs via CSS only
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-40"
      aria-hidden
    >
      <span className="text-white/60 text-[10px] uppercase tracking-widest">Scroll</span>
      <svg
        className="w-5 h-5 text-white animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
