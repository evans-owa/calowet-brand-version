import type { Metadata } from 'next'
import Navbar       from '@/components/Layout/Navbar'
import Footer       from '@/components/Layout/Footer'
import AboutSection from '@/components/About/AboutSection'
import Breadcrumb   from '@/components/Breadcrumb/Breadcrumb'

const BASE = 'https://calowetair.co.ke'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Kuhusu CaloWet Air | Mafundi wa HVAC Kenya' : 'About CaloWet Air | Expert HVAC Technicians Kenya',
    description: locale === 'sw'
      ? 'Jifunze zaidi kuhusu CaloWet Air — kampuni ya HVAC inayoongozwa na mafundi wakuu wenye uzoefu wa zaidi ya miaka 10 nchini Kenya.'
      : 'Learn about CaloWet Air — a senior technician-led HVAC company with 10+ years serving Nyanza, Western, Central, Nairobi & Rift Valley regions.',
    alternates: {
      canonical: `${BASE}/${locale}/about`,
      languages: { en: `${BASE}/en/about`, sw: `${BASE}/sw/about`, 'x-default': `${BASE}/en/about` },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <Navbar locale={locale} />
      <div className="pt-20 pb-4 bg-[#F0F6FF] border-b border-[#DCE8F7]/20">
        <div className="container-max section-padding py-3">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: locale === 'sw' ? 'Kuhusu Sisi' : 'About Us' },
          ]} />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        <AboutSection />
      </main>
      <Footer locale={locale} />
    </>
  )
}
