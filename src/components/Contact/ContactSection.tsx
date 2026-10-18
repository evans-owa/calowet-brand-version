/**
 * ContactSection – contact info panel + enquiry form.
 *
 * Rendering: Static Server Component shell.
 *
 * Split:
 *  ContactSection (this file)  → Server Component
 *    Reads translations server-side. Renders the entire left panel
 *    (heading, contact details, coverage map, social links) as
 *    static HTML — zero JS for that half of the section.
 *
 *  ContactForm (./ContactForm.tsx) → Client Component island
 *    Manages form state (name, email, phone, message), validation,
 *    loading state, and POST to /api/contact.
 *    Only the form field area is hydrated.
 *
 * RSC SERIALIZATION RULE:
 *  All strings passed to ContactForm are plain primitives — safe.
 *  No icon components cross the boundary; icons in the form are
 *  imported directly inside ContactForm (the client component).
 *
 * API caching:
 *  /api/contact POST uses cache:'no-store' inside ContactForm —
 *  never cached on Vercel's Data Cache.
 *
 * Caching: Static. Prerenders for /en and /sw at build time.
 */

import { getTranslations } from 'next-intl/server'
import { SectionTitle } from '@/components/UI'
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconWhatsApp,
  IconCheck,
} from '@/components/UI/Icons'
import { LogoIcon, LogoFull, LogoWithTagline } from '@/components/UI/Logo'
import ContactForm from './ContactForm'

export default async function ContactSection() {
  const t  = await getTranslations('contact')
  const tf = await getTranslations('contact.form')

  /* All primitives — safe to pass to client component */
  const formStrings = {
    name:               tf('name'),
    namePlaceholder:    tf('namePlaceholder'),
    email:              tf('email'),
    emailPlaceholder:   tf('emailPlaceholder'),
    phone:              tf('phone'),
    phonePlaceholder:   tf('phonePlaceholder'),
    message:            tf('message'),
    messagePlaceholder: tf('messagePlaceholder'),
    submit:             tf('submit'),
    submitting:         tf('submitting'),
    success:            tf('success'),
    error:              tf('error'),
  }

  const regions = [
    'Nyanza Region',
    'Western Kenya',
    'Central Kenya',
    'Rift Valley',
  ]

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* ── Background ──────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #EAF2FC 100%)' }}>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(#0047AB 1px, transparent 1px)',
            backgroundSize:  '28px 28px',
          }}
        />
        <LogoIcon color="blue" className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] -translate-y-1/4 translate-x-1/4" />
      </div>

      <div className="relative section-padding pt-20 pb-24">
        <div className="container-max">

          <SectionTitle
            id="contact-heading"
            label={t('sectionLabel')}
            heading={t('heading')}
            subheading={t('subheading')}
            align="center"
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* ── LEFT PANEL — info (2 cols, server-rendered) ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #0047AB 0%, #002D6E 100%)' }}
              >
                {/* Card top glow */}
                <div
                  aria-hidden
                  className="h-1 w-full"
                  style={{ background: 'linear-gradient(90deg, #DCE8F7, #0047AB)' }}
                />

                <div className="p-7 flex flex-col gap-6">
                  {/* Logo line */}
                  <div className="flex items-center gap-2.5">
                    <LogoFull color="white" />
                  </div>

                  {/* Contact details */}
                  <ul className="flex flex-col gap-4" aria-label="Contact details">
                    <li>
                      <a
                        href={`tel:${t('info.phone').replace(/\s/g, '')}`}
                        className="flex items-center gap-3 group"
                        aria-label={`Call us: ${t('info.phone')}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#DCE8F7]/30 transition-colors">
                          <IconPhone className="w-4 h-4 text-white" aria-hidden />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-0.5">
                            {t('info.callUs')}
                          </p>
                          <p className="text-white text-sm font-semibold group-hover:text-[#DCE8F7] transition-colors">
                            {t('info.phone')}
                          </p>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a
                        href={`mailto:${t('info.email')}`}
                        className="flex items-center gap-3 group"
                        aria-label={`Email us: ${t('info.email')}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#DCE8F7]/30 transition-colors">
                          <IconMail className="w-4 h-4 text-white" aria-hidden />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-0.5">
                            {t('info.emailUs')}
                          </p>
                          <p className="text-white text-sm font-semibold group-hover:text-[#DCE8F7] transition-colors">
                            {t('info.email')}
                          </p>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a
                        href={`https://wa.me/${t('info.phone').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                        aria-label="Chat on WhatsApp"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/40 transition-colors">
                          <IconWhatsApp className="w-4 h-4 text-white" aria-hidden />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-0.5">
                            WhatsApp
                          </p>
                          <p className="text-white text-sm font-semibold group-hover:text-green-300 transition-colors">
                            {t('info.whatsapp')}
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>

                  {/* Response time badge */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/8 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden />
                    <span className="text-white/70 text-xs">{t('info.responseTime')}</span>
                  </div>
                </div>
              </div>

              {/* Coverage area card */}
              <div className="rounded-2xl p-6 bg-white border border-[#DCE8F7]/30 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <IconMapPin className="w-4 h-4 text-[#0047AB]" aria-hidden />
                  <h3 className="font-semibold text-[#0047AB] text-sm">
                    {t('info.findUs')}
                  </h3>
                </div>
                <ul className="grid grid-cols-2 gap-2" aria-label="Coverage regions">
                  {regions.map(region => (
                    <li key={region} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className="w-4 h-4 rounded-full bg-[#0047AB] flex items-center justify-center shrink-0">
                        <IconCheck className="w-2.5 h-2.5 text-white" aria-hidden />
                      </div>
                      {region}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] text-[#DCE8F7] font-semibold uppercase tracking-wider">
                  {t('info.coverage')}
                </p>
              </div>

            </div>

            {/* ── RIGHT PANEL — form (3 cols, client island) ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white border border-[#DCE8F7]/30 shadow-sm overflow-hidden">
                {/* Form header accent bar */}
                <div
                  aria-hidden
                  className="h-1.5 w-full"
                  style={{ background: 'linear-gradient(90deg, #0047AB, #DCE8F7)' }}
                />
                <div className="p-7 md:p-9">
                  {/*
                    ContactForm is a Client Component island.
                    Only plain string primitives cross the RSC boundary.
                  */}
                  <ContactForm strings={formStrings} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
