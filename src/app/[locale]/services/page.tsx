import type { Metadata } from 'next'
import Navbar          from '@/components/Layout/Navbar'
import Footer          from '@/components/Layout/Footer'
import ServicesSection from '@/components/Services/ServicesSection'
import Breadcrumb      from '@/components/Breadcrumb/Breadcrumb'

const BASE = 'https://calowetair.co.ke'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Huduma za HVAC | CaloWet Air Kenya' : 'HVAC Services Kenya | Installation, Maintenance & Sales | CaloWet Air',
    description: locale === 'sw'
      ? 'Huduma kamili za HVAC — ufungaji wa AC, jokofu, mifumo ya VRF, matengenezo ya mara kwa mara na ushauri wa kitaalamu nchini Kenya.'
      : 'Professional HVAC services in Kenya — AC installation, commercial refrigeration, VRF systems, scheduled maintenance and expert consultation across 5 regions.',
    alternates: {
      canonical: `${BASE}/${locale}/services`,
      languages: { en: `${BASE}/en/services`, sw: `${BASE}/sw/services`, 'x-default': `${BASE}/en/services` },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <Navbar locale={locale} />
      <div className="pt-20 pb-4 bg-[#F0F6FF] border-b border-[#DCE8F7]/20">
        <div className="container-max section-padding py-3">
          <Breadcrumb items={[
            { label: 'Home',     href: `/${locale}` },
            { label: locale === 'sw' ? 'Huduma' : 'Services' },
          ]} />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        <ServicesSection />
      </main>
      <Footer locale={locale} />
    </>
  )
}
