/**
 * Navbar — server wrapper.
 * Links now point to real pages (/en/about, /en/services etc.)
 * instead of anchor fragments — required for proper indexing.
 * Each nav link is a real URL that Google can crawl and index.
 */

import { getTranslations } from 'next-intl/server'
import NavbarClient from './NavbarClient'

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations('nav')

  const links = [
    { key: 'home',      label: t('home'),      href: `/${locale}`          },
    { key: 'about',     label: t('about'),     href: `/${locale}/about`    },
    { key: 'services',  label: t('services'),  href: `/${locale}/services` },
    { key: 'products',  label: t('products'),  href: `/${locale}/products` },
    { key: 'customers', label: t('customers'), href: `/${locale}/contact`  },
    { key: 'contact',   label: t('contact'),   href: `/${locale}/contact`  },
    { key: 'faq',       label: 'FAQ',          href: `/${locale}/faq`      },
  ]

  return (
    <NavbarClient
      links={links}
      ctaLabel={t('requestQuote')}
      locale={locale}
    />
  )
}
