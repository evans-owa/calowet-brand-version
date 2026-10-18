/**
 * Footer – large-type editorial footer.
 *
 * Rendering: Static Server Component (no dynamic data, no 'use client').
 *
 * Architecture:
 *  - getTranslations() runs at build time on static pages → zero runtime cost.
 *  - On dynamic pages it runs per-request, but has no DB calls so it's fast.
 *  - The NewsletterInput sub-component is isolated as a Client Component so
 *    only the input field hydrates — the entire rest of the Footer stays
 *    as inert server-rendered HTML.
 *  - All icons are inline SVG (Icons.tsx) — no external library fetch.
 *
 * Caching: No fetch() calls inside, so Next.js never needs to revalidate.
 * If this were to consume an API (e.g. fetching social follower counts)
 * we'd add  export const revalidate = 3600  at the page level.
 */

import { getTranslations } from 'next-intl/server'
import { LogoIcon, LogoFull, LogoWithTagline } from '@/components/UI/Logo'
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconWhatsApp,
  IconLinkedin,
  IconCheck,
  IconShield,
} from '@/components/UI/Icons'
import FooterNewsletterInput from './FooterNewsletterInput'

export default async function Footer({ locale }: { locale: string }) {
  const t  = await getTranslations('footer')
  const tn = await getTranslations('nav')

  const quickLinks = [
    { label: tn('home'),      href: `/${locale}`          },
    { label: tn('about'),     href: `/${locale}/about`    },
    { label: tn('services'),  href: `/${locale}/services` },
    { label: tn('products'),  href: `/${locale}/products` },
    { label: 'FAQ',           href: `/${locale}/faq`      },
    { label: tn('contact'),   href: `/${locale}/contact`  },
  ]

  const serviceLinks = [
    { label: 'Installation',        href: `/${locale}/services` },
    { label: 'Product Sales',       href: `/${locale}/products` },
    { label: 'Maintenance & Support', href: `/${locale}/services` },
    { label: 'Consultation',        href: `/${locale}/services` },
    { label: 'FAQ',                 href: `/${locale}/faq`      },
  ]

  const regions = ['Nyanza', 'Western', 'Central', 'Rift Valley']

  const socials = [
    { icon: IconFacebook,  label: 'Facebook',  href: 'https://www.facebook.com/calowetair' },
    { icon: IconInstagram, label: 'Instagram', href: 'https://www.instagram.com/calowetair' },
    { icon: IconWhatsApp,  label: 'WhatsApp',  href: 'https://wa.me/254717124523' },
    { icon: IconTwitter,   label: 'X / Twitter', href: 'https://x.com/calowetair' },
    { icon: IconLinkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/calowetair' },
  ]

  return (
    <footer
      className="relative bg-[#0047AB] text-white overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >

      {/* ── Background decorative elements ─────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large faded wordmark */}
        <span
          className="absolute -bottom-6 -right-4 text-[10rem] md:text-[16rem] font-nura font-black text-white/[0.03] select-none leading-none"
        >
          HVAC
        </span>
        {/* Powder blue gradient blob top-left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DCE8F7]/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#DCE8F7 1px, transparent 1px), linear-gradient(90deg, #DCE8F7 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          TOP BAND — large editorial headline
      ═══════════════════════════════════════════════════════ */}
      <div className="relative border-b border-white/10">
        <div className="container-max px-4 md:px-8 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Large display heading */}
            <div className="max-w-2xl">
              <p className="text-[#DCE8F7] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                CaloWet Air – HVAC Solutions Kenya
              </p>
              {/* Large-type editorial headline */}
              <h2 className="font-nura font-black leading-[0.92] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
                Cooling.<br />
                <span className="text-[#DCE8F7]">Heating.</span><br />
                Comfort.
              </h2>
            </div>

            {/* CTA + Newsletter */}
            <div className="flex flex-col gap-6 lg:max-w-sm w-full">
              <div>
                <p className="text-white/70 text-sm mb-1 font-semibold uppercase tracking-wider">
                  {t('newsletter')}
                </p>
                <p className="text-white/50 text-sm mb-3">
                  {t('newsletterSub')}
                </p>
                {/* Client component — only the input hydrates */}
                <FooterNewsletterInput
                  placeholder={t('emailPlaceholder')}
                  submitLabel={t('subscribe')}
                />
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <IconShield className="w-5 h-5 text-[#DCE8F7] shrink-0" aria-hidden />
                <span className="text-xs text-white/70">
                  {t('certifiedBy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MAIN LINKS GRID
      ═══════════════════════════════════════════════════════ */}
      <div className="relative border-b border-white/10">
        <div className="container-max px-4 md:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Column 1 — Logo + contact info */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
              {/* Logo */}
              <LogoFull color="white" />

              <p className="text-white/55 text-sm leading-relaxed">
                {t('description')}
              </p>

              {/* Contact details */}
              <ul className="space-y-3" aria-label="Contact information">
                <li>
                  <a
                    href="tel:+254717124523"
                    className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#DCE8F7]/30 transition-colors">
                      <IconPhone className="w-3.5 h-3.5" aria-hidden />
                    </span>
                    +254 717 124 523
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@calowetair.co.ke"
                    className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#DCE8F7]/30 transition-colors">
                      <IconMail className="w-3.5 h-3.5" aria-hidden />
                    </span>
                    info@calowetair.co.ke
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <IconMapPin className="w-3.5 h-3.5" aria-hidden />
                    </span>
                    <span>Nyanza · Western · Central · Rift Valley</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2 — Quick links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-5">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-3" role="list">
                {quickLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Services */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-5">
                {t('services')}
              </h3>
              <ul className="space-y-3" role="list">
                {serviceLinks.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-white/55 text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Coverage regions */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-5">
                {t('regions')}
              </h3>
              <ul className="space-y-3" role="list">
                {regions.map(region => (
                  <li key={region} className="flex items-center gap-2">
                    <IconCheck className="w-3.5 h-3.5 text-[#DCE8F7] shrink-0" aria-hidden />
                    <span className="text-white/55 text-sm">{region}</span>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="mt-8">
                <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-4">
                  {t('followUs')}
                </h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Social media links">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#DCE8F7]/25 hover:border-[#DCE8F7]/40 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM BAR
      ═══════════════════════════════════════════════════════ */}
      <div className="relative">
        <div className="container-max px-4 md:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">

            <span>
              © {new Date().getFullYear()} CaloWet Air. {t('rights')}
            </span>

            <div className="flex items-center gap-4">
              <a href={`/${locale}/privacy`} className="hover:text-white/70 transition-colors">Privacy Policy</a>
              <span aria-hidden>·</span>
              <a href={`/${locale}/terms`} className="hover:text-white/70 transition-colors">Terms of Service</a>
              <span aria-hidden>·</span>
              <span>{t('madeIn')}</span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
