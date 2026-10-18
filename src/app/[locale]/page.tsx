/**
 * Homepage — landing page.
 * Each section is now a preview with "See More →" linking to its own page.
 * Full content lives at: /about, /services, /products, /contact, /faq
 */

import type { Metadata } from 'next'
import Navbar           from '@/components/Layout/Navbar'
import Footer           from '@/components/Layout/Footer'
import HeroSection      from '@/components/Hero/HeroSection'
import AboutSection     from '@/components/About/AboutSection'
import ServicesSection  from '@/components/Services/ServicesSection'
import ProductsSection  from '@/components/Products/ProductsSection'
import CustomersSection from '@/components/Customers/CustomersSection'
import ContactSection   from '@/components/Contact/ContactSection'

const BASE = 'https://calowetair.co.ke'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'CaloWet Air – HVAC Solutions Kenya | Cooling, Heating & Comfort',
    sw: 'CaloWet Air – Suluhisho za HVAC Kenya | Kupoza, Kupasha Joto & Starehe',
  }
  const descriptions: Record<string, string> = {
    en: 'Expert HVAC installations, maintenance & product sales across Nyanza, Western, Central, Nairobi & Rift Valley. Split AC, VRF systems, commercial refrigeration & more.',
    sw: 'Ufungaji wa kitaalamu wa HVAC, matengenezo na mauzo ya bidhaa nchini Nyanza, Magharibi, Kati, Nairobi na Bonde la Ufa.',
  }
  return {
    title:       titles[locale]       ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        en: `${BASE}/en`, sw: `${BASE}/sw`, 'x-default': `${BASE}/en`,
      },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

type PageProps = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  return (
    <>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0047AB] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <Navbar locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <CustomersSection />
        <ContactSection />
      </main>
      <Footer locale={locale} />
    </>
  )
}
