/**
 * [locale]/layout.tsx
 *
 * Canonical strategy (matches Google Search Console fix):
 *  - canonical: https://calowetair.co.ke/en  (no www, no trailing slash)
 *  - hreflang: en → /en, sw → /sw, x-default → /en
 *  - sitemap only lists /en and /sw (no anchor fragments)
 *  - www → non-www: handled at Vercel dashboard (Domains → Redirect)
 *  - / → /en: 308 permanent in next.config.ts redirects()
 *  - /en/ → /en: 308 permanent in next.config.ts redirects()
 */

import type { Metadata }  from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages }    from 'next-intl/server'
import { notFound }       from 'next/navigation'
import { routing }        from '@/i18n/routing'
import '../globals.css'
import PageLoader from '@/components/PageLoader/PageLoader'

// Hard-coded non-www base — never use env var for canonical to avoid misconfiguration
const BASE = 'https://calowetair.co.ke'

const META = {
  en: {
    title:       'CaloWet Air – HVAC Solutions Kenya | AC, Refrigeration & Heating',
    description: 'CaloWet Air provides professional HVAC installation, product sales, and maintenance across Nyanza, Western, Central & Rift Valley. Air conditioners, refrigeration, VRF systems & more.',
    keywords:    'HVAC Kenya, air conditioning Kenya, AC installation Kenya, refrigeration Kenya, Nyanza HVAC, Western Kenya air conditioning, Rift Valley cooling, commercial AC Kenya, split unit Kenya, VRF system Kenya, heat pump Kenya',
  },
  sw: {
    title:       'CaloWet Air – Suluhisho za HVAC Kenya | Viyoyozi, Jokofu & Kupasha Joto',
    description: 'CaloWet Air inatoa ufungaji wa kitaalamu wa HVAC, mauzo ya bidhaa, na matengenezo nchini Nyanza, Magharibi, Kati na Bonde la Ufa. Viyoyozi, jokofu, mifumo ya VRF na zaidi.',
    keywords:    'HVAC Kenya, viyoyozi Kenya, ufungaji wa AC Kenya, jokofu Kenya, HVAC Nyanza, viyoyozi Kenya Magharibi, mifumo ya VRF Kenya',
  },
}

type LayoutProps = {
  children: React.ReactNode
  params:   Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const lang = (locale === 'sw' ? 'sw' : 'en') as 'en' | 'sw'
  const m    = META[lang]

  // Canonical = exact URL this page is served at, no trailing slash
  const canonical = `${BASE}/${locale}`

  return {
    metadataBase: new URL(BASE),

    title: {
      default:  m.title,
      template: `%s | CaloWet Air Kenya`,
    },
    description: m.description,
    keywords:    m.keywords,

    // ── Canonical + hreflang ──────────────────────────────────
    // canonical must exactly match the URL in sitemap.xml and
    // the URL Google sees after all redirects resolve.
    // No trailing slash, no www, https only.
    alternates: {
      canonical,
      languages: {
        'en':        `${BASE}/en`,
        'sw':        `${BASE}/sw`,
        'x-default': `${BASE}/en`,
      },
    },

    // ── Robots ────────────────────────────────────────────────
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        'max-image-preview': 'large',
        'max-snippet':       -1,
      },
    },

    // ── Open Graph ────────────────────────────────────────────
    openGraph: {
      type:            'website',
      url:             canonical,
      siteName:        'CaloWet Air',
      title:           m.title,
      description:     m.description,
      locale:          locale === 'sw' ? 'sw_KE' : 'en_KE',
      alternateLocale: locale === 'sw' ? ['en_KE'] : ['sw_KE'],
      images: [{
        url:    `${BASE}/og-image.svg`,
        width:  1200,
        height: 630,
        alt:    'CaloWet Air – HVAC Solutions Kenya',
      }],
    },

    // ── Twitter / X ───────────────────────────────────────────
    twitter: {
      card:        'summary_large_image',
      title:       m.title,
      description: m.description,
      images:      [`${BASE}/og-image.svg`],
    },

    // ── Icons ─────────────────────────────────────────────────
    icons: {
      icon:    [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any'          },
      ],
      apple:   '/favicon.svg',
      shortcut:'/favicon.ico',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'sw')) {
    notFound()
  }

  const messages = await getMessages()
  const lang = (locale === 'sw' ? 'sw' : 'en') as 'en' | 'sw'

  // ── JSON-LD: Local Business (HVACBusiness) ────────────────────
  const localBusinessSchema = {
    '@context':    'https://schema.org',
    '@type':       'HVACBusiness',
    '@id':         `${BASE}/#business`,
    name:          'CaloWet Air',
    alternateName: 'CaloWet Air HVAC Solutions Kenya',
    description:   META[lang].description,
    url:           BASE,
    logo: {
      '@type':     'ImageObject',
      url:         `${BASE}/favicon.svg`,
      width:       32,
      height:      32,
    },
    image:         `${BASE}/og-image.svg`,
    telephone:     '+254717124523',
    email:         'info@calowetair.co.ke',
    foundingDate:  '2014',
    priceRange:    '$$',
    currenciesAccepted: 'KES',
    paymentAccepted:    'Cash, Bank Transfer, M-Pesa',
    address: {
      '@type':          'PostalAddress',
      addressCountry:   'KE',
      addressRegion:    'Nyanza',
    },
    areaServed: [
      { '@type': 'State', name: 'Nyanza'        },
      { '@type': 'State', name: 'Western Kenya' },
      { '@type': 'State', name: 'Central Kenya' },
      { '@type': 'State', name: 'Rift Valley'   },
    ],
    serviceType: [
      'HVAC Installation',
      'Air Conditioning Installation',
      'Refrigeration Services',
      'HVAC Maintenance',
      'HVAC Product Sales',
      'Commercial Cooling Systems',
      'VRF System Installation',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'HVAC Products & Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Split Unit AC Installation'  } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cassette AC Installation'    } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VRF System Installation'     } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC Maintenance Contract'   } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Refrigeration'    } },
      ],
    },
    sameAs: [
      'https://www.facebook.com/calowetair',
      'https://www.instagram.com/calowetair',
      'https://x.com/calowetair',
      'https://www.linkedin.com/company/calowetair',
      'https://wa.me/254717124523',
    ],
  }

  // ── JSON-LD: WebSite ──────────────────────────────────────────
  const websiteSchema = {
    '@context':  'https://schema.org',
    '@type':     'WebSite',
    '@id':       `${BASE}/#website`,
    name:        'CaloWet Air',
    url:          BASE,
    inLanguage:  [locale],
    publisher: { '@id': `${BASE}/#business` },
  }

  // ── JSON-LD: WebPage ──────────────────────────────────────────
  const webPageSchema = {
    '@context':   'https://schema.org',
    '@type':      'WebPage',
    '@id':        `${BASE}/${locale}/#webpage`,
    url:          `${BASE}/${locale}`,
    name:          META[lang].title,
    description:   META[lang].description,
    inLanguage:    locale,
    isPartOf:    { '@id': `${BASE}/#website` },
    about:       { '@id': `${BASE}/#business` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [{
        '@type':    'ListItem',
        position:   1,
        name:       'Home',
        item:       `${BASE}/${locale}`,
      }],
    },
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </head>
      <body>
        <PageLoader />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
