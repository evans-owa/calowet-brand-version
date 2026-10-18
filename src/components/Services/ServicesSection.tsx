/**
 * ServicesSection – four service cards + process steps strip.
 *
 * Rendering: Static Server Component.
 *
 * RSC SERIALIZATION RULE enforced here:
 *  ServiceCardsClient is a Client Component. Only serializable data
 *  crosses the boundary. Icon components (functions) are NOT passed —
 *  instead the string key from src/data/services.ts ('Wrench', etc.)
 *  is passed directly. ServiceCardsClient owns the icon map and
 *  resolves string → component internally.
 *  ✗ WRONG:  { icon: IconWrench }      — function, throws at runtime
 *  ✓ CORRECT: { iconKey: 'Wrench' }    — string, serializable
 */

import { getTranslations } from 'next-intl/server'
import { services } from '@/data/services'
import { SectionTitle } from '@/components/UI'
import {
  IconArrowRight,
  IconWind,
  IconAirConditioner,
} from '@/components/UI/Icons'
import { LogoIcon } from '@/components/UI/Logo'
import ServiceCardsClient from './ServiceCardsClient'

const cardAccents = [
  { from: '#0047AB', to: '#0047AB' },
  { from: '#0047AB', to: '#DCE8F7' },
  { from: '#002D6E', to: '#0047AB' },
  { from: '#DCE8F7', to: '#F0F6FF' },
]

export default async function ServicesSection() {
  const t = await getTranslations('services')

  const cards = services.map((svc, idx) => {
    const key = svc.titleKey.split('.')[2] as
      'installation' | 'sales' | 'maintenance' | 'consultation'

    const rawFeatures = t.raw(`items.${key}.features`) as string[]

    return {
      id:          svc.id,
      iconKey:     svc.icon,              // ← string key only, no function
      title:       t(`items.${key}.title`       as any),
      description: t(`items.${key}.description` as any),
      features:    rawFeatures,
      accent:      cardAccents[idx],
    }
  })

  const processSteps = t.raw('processSteps') as Array<{
    step: string; title: string; body: string
  }>

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #0047AB 0px, #0047AB 1px, transparent 0px, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #0047AB, transparent 70%)' }}
        />
      </div>

      {/* ── Service cards ───────────────────────────────── */}
      <div className="relative section-padding pt-20 pb-16">
        <div className="container-max">
          <SectionTitle
            id="services-heading"
            label={t('sectionLabel')}
            heading={t('heading')}
            subheading={t('subheading')}
            align="center"
          />
          {/*
            Cards data is fully serializable:
            id, iconKey, title, description, features, accent
            are all strings/arrays/plain objects — safe to pass.
          */}
          <ServiceCardsClient cards={cards} ctaLabel={t('ctaService')} />
        </div>
      </div>

      {/* ── Process steps (dark band) ───────────────────── */}
      <div
        className="relative py-20"
        style={{ background: 'linear-gradient(135deg, #0047AB 0%, #002D6E 100%)' }}
      >
        {/* Top wave */}
        <div aria-hidden className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
            className="w-full h-10 md:h-14 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,56 C360,0 1080,0 1440,56 L1440,56 L0,56 Z" />
          </svg>
        </div>

        {/* Decorative background icons — server-rendered, no client cost */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <LogoIcon color="white" className="absolute top-8 right-8 w-48 h-48 opacity-[0.05]" />
          <IconWind           className="absolute bottom-8 left-8 w-36 h-36 text-white opacity-[0.04]" />
          <IconAirConditioner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-white opacity-[0.02]" />
        </div>

        <div className="relative container-max section-padding pt-12">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#DCE8F7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCE8F7]" aria-hidden />
              {t('processTitle')}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="relative flex flex-col gap-4">
                {idx < processSteps.length - 1 && (
                  <div aria-hidden
                    className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-white/20 to-transparent"
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="font-nura font-black text-white text-lg leading-none">
                      {step.step}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-nura font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-[#DCE8F7]/80 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0047AB] font-bold text-sm hover:bg-[#F0F6FF] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-black/20"
            >
              {t('ctaService')}
              <IconArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Bottom wave */}
        <div aria-hidden className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
            className="w-full h-10 md:h-14 fill-[#F0F6FF]" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,56 1080,56 1440,0 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </div>
    </section>
  )
}
