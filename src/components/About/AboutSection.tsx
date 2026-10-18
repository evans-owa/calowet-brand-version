/**
 * AboutSection – company intro, values grid, mission statement.
 *
 * Rendering: Static Server Component.
 *
 * RSC SERIALIZATION RULE enforced here:
 *  This file passes data to AboutStatsCounter (a Client Component).
 *  Only serializable primitives cross the boundary — strings, numbers,
 *  plain objects, arrays. Icon KEYS (strings) are passed; the client
 *  component resolves them to actual icon components internally.
 *  ✗ WRONG:  { icon: IconMapPin }        — function, not serializable
 *  ✓ CORRECT: { iconKey: 'mappin' }      — string, serializable
 *
 * Caching: Static. No fetch calls. Prerenders for /en + /sw at build.
 */

import { getTranslations } from 'next-intl/server'
import { SectionTitle } from '@/components/UI/SectionTitle'
import {
  IconShield,
  IconCheck,
  IconWind,
  IconMapPin,
} from '@/components/UI/Icons'
import { LogoIcon, LogoFull, LogoWithTagline } from '@/components/UI/Logo'
import AboutStatsCounter from './AboutStatsCounter'
import type { StatItem } from './AboutStatsCounter'

const valueIcons = [IconShield, LogoIcon, IconMapPin, IconWind]

export default async function AboutSection() {
  const t = await getTranslations('about')

  /*
   * Pass iconKey STRINGS — not icon function references.
   * AboutStatsCounter (client) resolves these to components internally.
   */
  const stats: StatItem[] = [
    { value: 10,  suffix: '+', label: t('stats.experience'), iconKey: 'thermometer' },
    { value: 5,   suffix: '',  label: t('stats.regions'),    iconKey: 'mappin'      },
    { value: 500, suffix: '+', label: t('stats.clients'),    iconKey: 'shield'      },
  ]

  const values = [0, 1, 2, 3].map(i => ({
    title: t(`values.items.${i}.title` as any),
    body:  t(`values.items.${i}.body`  as any),
    Icon:  valueIcons[i],
  }))

  const coverageRegions: string[] = t.raw('coverageRegions') as string[]

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Top wave divider from hero ─────────────────────── */}
      <div aria-hidden className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
          className="w-full h-10 md:h-14 fill-[#0047AB]" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════
          PART 1 — Intro + stats (white background)
      ═══════════════════════════════════════════════════ */}
      <div className="bg-white pt-16 pb-20">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text content */}
            <div>
              <SectionTitle
                label={t('sectionLabel')}
                heading={t('heading')}
                align="left"
                id="about-heading"
              />

              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                {t('body')}
              </p>

              {/* Mission card */}
              <div className="relative p-5 rounded-2xl bg-[#F0F6FF] border border-[#DCE8F7]/40 overflow-hidden">
                <div aria-hidden
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                  style={{ background: 'linear-gradient(225deg, #DCE8F7, transparent)' }}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0047AB]/60 mb-2">
                  {t('missionLabel')}
                </p>
                <p className="text-[#0047AB] text-sm md:text-base leading-relaxed font-medium italic">
                  &ldquo;{t('mission')}&rdquo;
                </p>
              </div>

              {/* Coverage regions */}
              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3">
                  {t('coverageLabel')}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Coverage regions">
                  {coverageRegions.map((region: string) => (
                    <li
                      key={region}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#0047AB] bg-[#0047AB]/8 px-3 py-1.5 rounded-full border border-[#0047AB]/15"
                    >
                      <IconMapPin className="w-3 h-3" aria-hidden />
                      {region}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — illustration panel + stats counter */}
            <div className="flex flex-col gap-6">

              {/* Decorative HVAC panel — server-rendered SVG, no client cost */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #0047AB 0%, #0047AB 100%)',
                  minHeight: '260px',
                }}
                aria-hidden
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(ellipse at 80% 20%, #DCE8F7 0%, transparent 60%)' }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 80 H160 V40 H280 V120 H360" stroke="#DCE8F7" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M40 180 H120 V220 H320 V160 H360" stroke="#DCE8F7" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 4"/>
                  <rect x="140" y="20" width="60" height="40" rx="6" stroke="#DCE8F7" strokeWidth="2"/>
                  <rect x="330" y="100" width="50" height="60" rx="6" stroke="#DCE8F7" strokeWidth="2"/>
                  <circle cx="200" cy="180" r="30" stroke="#DCE8F7" strokeWidth="2"/>
                  <circle cx="200" cy="180" r="12" stroke="#DCE8F7" strokeWidth="1.5"/>
                  <path d="M105 75 L115 80 L105 85" stroke="#DCE8F7" strokeWidth="1.5" fill="none"/>
                  <path d="M240 35 L250 40 L240 45" stroke="#DCE8F7" strokeWidth="1.5" fill="none"/>
                </svg>

                <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: '260px' }}>
                  <div>
                    <div className="mb-4">
                      <LogoFull color="white" />
                    </div>
                    <p className="text-[#DCE8F7] text-sm leading-relaxed max-w-xs">
                      Professionally certified HVAC solutions — engineered for Kenya's climate.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    {['AC', 'Ref', 'Heat', 'Vent'].map(tag => (
                      <span key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white/70 text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/*
                AboutStatsCounter receives serializable StatItem objects.
                iconKey is a string — safe to cross the RSC boundary.
              */}
              <AboutStatsCounter stats={stats} />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          PART 2 — Values grid (ice blue background)
      ═══════════════════════════════════════════════════ */}
      <div
        className="relative py-20"
        style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #EAF2FC 100%)' }}
      >
        <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#DCE8F7]/50 to-transparent" />

        <div className="container-max section-padding">
          <SectionTitle
            label=""
            heading={t('values.title')}
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ title, body, Icon }, idx) => (
              <article
                key={title}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[#DCE8F7]/30 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span aria-hidden
                  className="absolute top-4 right-4 font-nura font-black text-5xl text-[#0047AB]/05 leading-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/*
                  Value card icons ARE rendered on the server — these Icon
                  components are called directly here (not passed as props
                  to a client component), so no serialization issue.
                */}
                <div className="w-11 h-11 rounded-xl bg-[#0047AB]/8 flex items-center justify-center group-hover:bg-[#0047AB] transition-colors duration-300">
                  <Icon
                    className="w-5 h-5 text-[#0047AB] group-hover:text-white transition-colors duration-300"
                    aria-hidden
                  />
                </div>

                <div>
                  <h3 className="font-nura font-bold text-[#0047AB] text-base mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>

                <div aria-hidden
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-[#0047AB] to-[#DCE8F7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </article>
            ))}
          </div>

          {/* Checklist strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              'Licensed & Insured',
              'Emergency Repairs',
              'Scheduled Maintenance Contracts',
              'Free Initial Consultation',
              'Manufacturer Warranties Honoured',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 rounded-full bg-[#0047AB] flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3 text-white" aria-hidden />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
