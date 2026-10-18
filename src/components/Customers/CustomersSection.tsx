/**
 * CustomersSection – four customer segment cards.
 *
 * Rendering: Pure Static Server Component — no 'use client' anywhere.
 *
 * RSC SERIALIZATION RULE enforced:
 *  All icons are rendered directly on the server (they're JSX calls,
 *  not props passed to a client component). No serialization boundary
 *  is crossed — this entire section is inert HTML after build.
 *
 * Caching: Statically generated at build time for /en and /sw.
 * Zero JS emitted for this section — no hydration cost whatsoever.
 */

import { getTranslations } from 'next-intl/server'
import { SectionTitle } from '@/components/UI'
import {
  IconHome,
  IconHotel,
  IconBuilding,
  IconBriefcase,
  IconCheck,
  IconArrowRight,
  IconWind,
} from '@/components/UI/Icons'
import { LogoIcon } from '@/components/UI/Logo'

/* Segment config — icons and accent colors defined server-side */
const SEGMENTS = [
  {
    key:     'homes',
    icon:    IconHome,
    color:   { bg: '#0047AB', light: '#0047AB', pill: '#0047AB' },
    pattern: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  },
  {
    key:     'hotels',
    icon:    IconHotel,
    color:   { bg: '#0047AB', light: '#2448a3', pill: '#0047AB' },
    pattern: 'M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z',
  },
  {
    key:     'offices',
    icon:    IconBuilding,
    color:   { bg: '#002D6E', light: '#0047AB', pill: '#002D6E' },
    pattern: 'M4 2h16v20H4z M8 6h.01 M16 6h.01 M8 10h.01 M16 10h.01 M8 14h.01 M16 14h.01',
  },
  {
    key:     'realestate',
    icon:    IconBriefcase,
    color:   { bg: '#DCE8F7', light: '#bfcfe8', pill: '#0047AB' },
    pattern: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  },
] as const

export default async function CustomersSection() {
  const t = await getTranslations('customers')

  const segments = SEGMENTS.map(seg => ({
    ...seg,
    title:       t(`items.${seg.key}.title`       as any),
    description: t(`items.${seg.key}.description` as any),
    points:      t.raw(`items.${seg.key}.points`  as any) as string[],
  }))

  const isDark = (key: string) => key !== 'realestate'

  return (
    <section
      id="customers"
      className="relative overflow-hidden bg-white"
      aria-labelledby="customers-heading"
    >
      {/* Decorative background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #0047AB 0px, #0047AB 1px, transparent 0px, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        <LogoIcon color="blue" className="absolute -top-16 -right-16 w-80 h-80 opacity-[0.04]" />
        <IconWind      className="absolute -bottom-16 -left-16 w-72 h-72 text-[#0047AB] opacity-[0.03]" />
      </div>

      <div className="relative section-padding pt-20 pb-24">
        <div className="container-max">

          <SectionTitle
            id="customers-heading"
            label={t('sectionLabel')}
            heading={t('heading')}
            subheading={t('subheading')}
            align="center"
          />

          {/* ── Segment cards grid ─────────────────────────── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {segments.map((seg) => {
              const Icon       = seg.icon
              const textColor  = isDark(seg.key) ? 'text-white' : 'text-[#0047AB]'
              const subColor   = isDark(seg.key) ? 'text-white/65' : 'text-[#0047AB]/65'
              const pointColor = isDark(seg.key) ? 'text-white/80' : 'text-[#0047AB]/80'
              const checkBg    = isDark(seg.key) ? 'bg-white/20' : 'bg-[#0047AB]/15'
              const checkIcon  = isDark(seg.key) ? 'text-white'   : 'text-[#0047AB]'
              const ctaBg      = isDark(seg.key)
                ? 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                : 'bg-[#0047AB]/10 hover:bg-[#0047AB]/20 text-[#0047AB] border-[#0047AB]/20'

              return (
                <article
                  key={seg.key}
                  className="group relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${seg.color.bg} 0%, ${seg.color.light} 100%)`,
                  }}
                  aria-label={seg.title}
                >
                  {/* Subtle grid watermark */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Radial glow accent */}
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-bl-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)',
                    }}
                  />

                  {/* Card content */}
                  <div className="relative flex flex-col flex-1 p-6 gap-5">

                    {/* Icon badge */}
                    <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                      <Icon className={`w-7 h-7 ${textColor}`} aria-hidden />
                    </div>

                    {/* Title + description */}
                    <div>
                      <h3 className={`font-nura font-bold text-xl mb-2 leading-snug ${textColor}`}>
                        {seg.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${subColor}`}>
                        {seg.description}
                      </p>
                    </div>

                    {/* Feature bullet points */}
                    <ul className="flex flex-col gap-2" aria-label={`${seg.title} includes`}>
                      {seg.points.map((point: string) => (
                        <li key={point} className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${checkBg}`}>
                            <IconCheck className={`w-2.5 h-2.5 ${checkIcon}`} aria-hidden />
                          </div>
                          <span className={`text-xs leading-relaxed ${pointColor}`}>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA link */}
                    <a
                      href="#contact"
                      className={`mt-auto flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${ctaBg}`}
                      aria-label={`${t('ctaLabel')} — ${seg.title}`}
                    >
                      {t('ctaLabel')}
                      <IconArrowRight className="w-4 h-4 shrink-0" aria-hidden />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          {/* ── Stat / trust band ──────────────────────────── */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: 'linear-gradient(135deg, #F0F6FF 0%, #EAF2FC 100%)', border: '1px solid rgba(220,232,247,0.4)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '500+', label: 'Systems Installed'        },
                { value: '5',    label: 'Regions Covered'          },
                { value: '10+',  label: 'Years Experience'         },
                { value: '24hr', label: 'Emergency Response'       },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="font-nura font-black text-[#0047AB] text-3xl md:text-4xl leading-none">
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
