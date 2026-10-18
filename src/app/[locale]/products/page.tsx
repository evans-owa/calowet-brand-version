import type { Metadata } from 'next'
import Navbar          from '@/components/Layout/Navbar'
import Footer          from '@/components/Layout/Footer'
import ProductsSection from '@/components/Products/ProductsSection'
import Breadcrumb      from '@/components/Breadcrumb/Breadcrumb'

const BASE = 'https://calowetair.co.ke'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Bidhaa za HVAC Kenya | CaloWet Air — Viyoyozi, Jokofu, Mifumo ya VRF' : 'HVAC Products Kenya | Air Conditioners, Refrigeration & VRF Systems | CaloWet Air',
    description: locale === 'sw'
      ? 'Bidhaa za HVAC za ubora — viyoyozi vya split, mifumo ya VRF/VRV, jokofu la kibiashara, uingizaji hewa. Brands: Daikin, LG, Samsung, Carrier, Midea. Omba bei leo.'
      : 'Quality HVAC products in Kenya — split AC units, VRF/VRV systems, commercial refrigerators, ventilation. Brands: Daikin, LG, Samsung, Carrier, Midea, Bitzer. Request a quote today.',
    alternates: {
      canonical: `${BASE}/${locale}/products`,
      languages: { en: `${BASE}/en/products`, sw: `${BASE}/sw/products`, 'x-default': `${BASE}/en/products` },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <Navbar locale={locale} />
      <div className="pt-20 pb-4 bg-[#F0F6FF] border-b border-[#DCE8F7]/20">
        <div className="container-max section-padding py-3">
          <Breadcrumb items={[
            { label: 'Home',    href: `/${locale}` },
            { label: locale === 'sw' ? 'Bidhaa' : 'Products' },
          ]} />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        <ProductsSection />
      </main>
      <Footer locale={locale} />
    </>
  )
}
