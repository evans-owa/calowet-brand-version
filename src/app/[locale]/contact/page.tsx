import type { Metadata } from 'next'
import Navbar          from '@/components/Layout/Navbar'
import Footer          from '@/components/Layout/Footer'
import ContactSection  from '@/components/Contact/ContactSection'
import Breadcrumb      from '@/components/Breadcrumb/Breadcrumb'

const BASE = 'https://calowetair.co.ke'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Wasiliana na CaloWet Air | HVAC Kenya — Omba Bei' : 'Contact CaloWet Air | HVAC Kenya — Request a Quote',
    description: locale === 'sw'
      ? 'Wasiliana na CaloWet Air kwa mahitaji yako ya HVAC. Tunaomba bei, kufanya miadi, au kuuliza maswali. Tunashughulikia Nyanza, Magharibi, Kati, Nairobi na Bonde la Ufa.'
      : 'Contact CaloWet Air for your HVAC needs. Request a quote, book a consultation, or ask a question. We serve Nyanza, Western, Central, Nairobi & Rift Valley.',
    alternates: {
      canonical: `${BASE}/${locale}/contact`,
      languages: { en: `${BASE}/en/contact`, sw: `${BASE}/sw/contact`, 'x-default': `${BASE}/en/contact` },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <Navbar locale={locale} />
      <div className="pt-20 pb-4 bg-[#F0F6FF] border-b border-[#DCE8F7]/20">
        <div className="container-max section-padding py-3">
          <Breadcrumb items={[
            { label: 'Home',    href: `/${locale}` },
            { label: locale === 'sw' ? 'Wasiliana' : 'Contact' },
          ]} />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        <ContactSection />
      </main>
      <Footer locale={locale} />
    </>
  )
}
