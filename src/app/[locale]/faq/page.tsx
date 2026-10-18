/**
 * FAQ page — /en/faq and /sw/faq
 *
 * SEO:
 *  ✓ FAQPage JSON-LD schema — Google shows FAQ rich results in search
 *  ✓ Unique title + description per locale
 *  ✓ Canonical + hreflang alternates
 *  ✓ Breadcrumb schema
 *  ✓ Category filter tabs (client island)
 *  ✓ Accordion — accessible <button> with aria-expanded
 *
 * Structure mirrors Spinel Dynamics FAQ pattern:
 *  General → Installation → Maintenance → Products → Coverage
 */

import type { Metadata }  from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar    from '@/components/Layout/Navbar'
import Footer    from '@/components/Layout/Footer'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { SectionTitle } from '@/components/UI'
import { LogoIcon } from '@/components/UI/Logo'
import {
  IconPhone, IconArrowRight, IconWind,
} from '@/components/UI/Icons'
import FAQAccordion from '@/components/FAQ/FAQAccordion'
import type { FAQItem } from '@/components/FAQ/FAQAccordion'
import Link from 'next/link'

const BASE = 'https://calowetair.co.ke'

/* ── Static FAQ data — EN only; SW version below ───────────────── */
const FAQ_EN: FAQItem[] = [
  // General
  { category: 'General',      question: 'What HVAC services does CaloWet Air offer?',                          answer: 'CaloWet Air offers end-to-end HVAC services including: AC Installation (split units, cassette, VRF/VRV systems), Product Sales (genuine equipment from Daikin, LG, Samsung, Carrier, Midea), Maintenance & Support (scheduled servicing, emergency repairs), and Expert Consultation (site survey, load calculation, energy efficiency advice).' },
  { category: 'General',      question: 'Which regions in Kenya does CaloWet Air serve?',                      answer: 'We serve clients across Nyanza, Western Kenya, Central Kenya, Nairobi, and Rift Valley. Our certified technicians are deployed across all five regions for installations, maintenance, and emergency repairs.' },
  { category: 'General',      question: 'How experienced is the CaloWet Air team?',                           answer: 'CaloWet Air is founded and led by senior certified HVAC technicians with over 10 years of hands-on field experience. Every installation and service call is handled by a qualified professional — not a junior technician.' },
  { category: 'General',      question: 'Do you offer free consultations or site visits?',                     answer: 'Yes. We offer free initial consultations where our engineers assess your space, cooling or heating needs, and budget. We then provide a detailed written quotation at no obligation.' },
  { category: 'General',      question: 'Do you sell only branded, genuine equipment?',                        answer: 'Absolutely. We supply only genuine HVAC equipment from verified brand distributors including Daikin, LG, Samsung, Carrier, Midea, Bitzer, and Danfoss. All equipment comes with manufacturer warranties.' },
  // Installation
  { category: 'Installation', question: 'What types of air conditioners do you install?',                     answer: 'We install split units (wall-mounted, floor-standing), cassette AC units, ducted systems, and VRF/VRV central systems for homes, hotels, offices, and commercial buildings.' },
  { category: 'Installation', question: 'How long does a standard AC installation take?',                      answer: 'A single split unit installation typically takes 2–4 hours. Multi-unit projects or VRF systems for commercial buildings are scoped individually, but most commercial projects are completed within 1–5 days depending on complexity.' },
  { category: 'Installation', question: 'What is a VRF/VRV system and when do I need one?',                   answer: 'VRF (Variable Refrigerant Flow) and VRV systems are centralized cooling solutions ideal for large buildings — hotels, multi-floor offices, real estate developments, and hospitals. They allow independent temperature control for multiple rooms from a single outdoor unit, saving energy and installation cost compared to individual split units.' },
  { category: 'Installation', question: 'Do you install refrigeration and cold room systems?',                 answer: 'Yes. We install commercial refrigerators, chest and upright freezers, and cold room systems for restaurants, hotels, supermarkets, pharmacies, and flower farms.' },
  { category: 'Installation', question: 'What refrigerant types do you work with?',                           answer: 'We work with modern, environmentally responsible refrigerants including R410A, R32, and R134a. We do not install systems using R22 (Freon) — the phased-out refrigerant.' },
  // Maintenance
  { category: 'Maintenance',  question: 'How often should I service my air conditioner?',                     answer: 'We recommend servicing your AC every 3–6 months for residential units and every 1–3 months for commercial or high-usage systems. Regular servicing prevents costly breakdowns, extends equipment lifespan, and maintains energy efficiency.' },
  { category: 'Maintenance',  question: 'Do you offer emergency repair services?',                            answer: 'Yes. We respond to emergency HVAC breakdowns including AC failures and refrigeration faults. Contact us directly at +254 717 124 523 for urgent repairs across our service regions.' },
  { category: 'Maintenance',  question: 'What is included in a standard maintenance visit?',                  answer: 'A standard service visit includes: filter cleaning, coil inspection and cleaning, refrigerant level check, electrical component inspection, drainage system cleaning, thermostat calibration, and a full system performance test. You receive a written service report after each visit.' },
  { category: 'Maintenance',  question: 'Do you offer maintenance contracts for businesses?',                 answer: 'Yes. We offer scheduled maintenance contracts for hotels, offices, real estate developments, and other commercial clients. Contracts include regular service visits at agreed intervals, priority response for breakdowns, and discounted repair rates.' },
  // Products
  { category: 'Products',     question: 'Which brands of HVAC equipment do you supply?',                     answer: 'We supply equipment from Daikin, LG, Samsung, Carrier, Midea, Bitzer, and Danfoss — all sourced from authorized distributors. We help you choose the right brand based on your budget, space size, and energy efficiency requirements.' },
  { category: 'Products',     question: 'Can I request a quote for a specific product?',                     answer: 'Yes. Use the "Request Quote" button on any product card on our Products page, or contact us directly. We\'ll provide pricing, availability, and installation cost within 24 hours.' },
  { category: 'Products',     question: 'Do the products come with a warranty?',                             answer: 'Yes. All equipment we supply comes with manufacturer warranty — typically 1–5 years depending on the brand and product type. We also handle warranty claims on your behalf.' },
  { category: 'Products',     question: 'What is the most energy-efficient AC for a Kenyan home?',           answer: 'Inverter-technology split units are the most energy-efficient choice for Kenyan homes. Brands like Daikin and LG offer inverter models that reduce electricity consumption by 30–60% compared to fixed-speed units. We help you select the right capacity (HP) for your room size to maximize efficiency.' },
  // Coverage
  { category: 'Coverage',     question: 'Do you serve clients outside Nairobi?',                            answer: 'Yes. Our core service regions are Nyanza, Western Kenya, Central Kenya, Nairobi, and Rift Valley. We regularly deploy technicians across all these regions for installations and maintenance projects.' },
  { category: 'Coverage',     question: 'Can you handle large commercial or real estate projects?',          answer: 'Yes. We have experience with multi-unit installations for hotels, office complexes, and real estate developments. Contact us for large projects and we\'ll provide a dedicated project team and phased installation plan.' },
  { category: 'Coverage',     question: 'How do I get started with CaloWet Air?',                           answer: 'Simply call us at +254 717 124 523, send an email to info@calowetair.co.ke, or fill in our Contact Form. We\'ll arrange a free site consultation and provide a detailed quotation within 24 hours.' },
]

const FAQ_SW: FAQItem[] = [
  { category: 'Jumla',         question: 'CaloWet Air inatoa huduma gani za HVAC?',                          answer: 'CaloWet Air inatoa huduma kamili za HVAC ikiwa ni pamoja na: Ufungaji wa AC (vitengo vya split, cassette, mifumo ya VRF/VRV), Mauzo ya Bidhaa (vifaa halisi vya Daikin, LG, Samsung, Carrier, Midea), Matengenezo na Usaidizi (huduma za mara kwa mara, ukarabati wa dharura), na Ushauri wa Kitaalamu (utafiti wa eneo, mahesabu ya mzigo wa joto, ushauri wa ufanisi wa nishati).' },
  { category: 'Jumla',         question: 'CaloWet Air inahudumia maeneo gani Kenya?',                        answer: 'Tunahudumia wateja katika maeneo ya Nyanza, Kenya Magharibi, Kenya Kati, Nairobi, na Bonde la Ufa. Mafundi wetu wenye cheti wanafanya kazi katika maeneo yote matano kwa ufungaji, matengenezo, na ukarabati wa dharura.' },
  { category: 'Jumla',         question: 'Je, mnatoa ushauri au ziara za eneo bila malipo?',                 answer: 'Ndiyo. Tunatoa ushauri wa awali bila malipo ambapo mhandisi wetu anakagua nafasi yako, mahitaji ya kupoza au kupasha joto, na bajeti yako. Kisha tunatoa nukuu ya kina ya maandishi bila ya kulazimishwa.' },
  { category: 'Ufungaji',      question: 'Mnafunga aina gani za viyoyozi?',                                  answer: 'Tunafunga vitengo vya split (vya ukutani, vya sakafu), vitengo vya cassette, mifumo ya ducted, na mifumo ya kati ya VRF/VRV kwa nyumba, hoteli, ofisi, na majengo ya kibiashara.' },
  { category: 'Ufungaji',      question: 'Ufungaji wa AC wa kawaida huchukua muda gani?',                    answer: 'Ufungaji wa kitengo kimoja cha split kawaida huchukua masaa 2–4. Miradi ya vitengo vingi au mifumo ya VRF kwa majengo ya kibiashara inakisiwa kibinafsi, lakini miradi mingi ya kibiashara inakamilika ndani ya siku 1–5 kulingana na ugumu.' },
  { category: 'Matengenezo',   question: 'Mara ngapi ninapaswa kufanya huduma ya kiyoyozi changu?',          answer: 'Tunapendekeza kufanya huduma ya AC kila miezi 3–6 kwa vitengo vya makazi na kila miezi 1–3 kwa mifumo ya kibiashara au yenye matumizi makubwa. Huduma za mara kwa mara huzuia kuharibika kwa gharama kubwa, kurefusha maisha ya vifaa, na kudumisha ufanisi wa nishati.' },
  { category: 'Matengenezo',   question: 'Je, mnatoa huduma za ukarabati wa dharura?',                       answer: 'Ndiyo. Tunajibu dharura za HVAC ikiwa ni pamoja na kushindwa kwa AC na hitilafu za jokofu. Wasiliana nasi moja kwa moja kwa +254 717 124 523 kwa ukarabati wa haraka katika maeneo yetu ya huduma.' },
  { category: 'Bidhaa',        question: 'Mnasambaza brands gani za vifaa vya HVAC?',                        answer: 'Tunasambaza vifaa vya Daikin, LG, Samsung, Carrier, Midea, Bitzer, na Danfoss — vyote vinatoka kwa wasambazaji waliothibitishwa. Tunakusaidia kuchagua brand sahihi kulingana na bajeti yako, ukubwa wa nafasi, na mahitaji ya ufanisi wa nishati.' },
  { category: 'Chanjo',        question: 'Je, mnahudumia wateja nje ya Nairobi?',                            answer: 'Ndiyo. Maeneo yetu ya msingi ya huduma ni Nyanza, Kenya Magharibi, Kenya Kati, Nairobi, na Bonde la Ufa. Mara kwa mara tunatuma mafundi katika maeneo yote haya kwa miradi ya ufungaji na matengenezo.' },
  { category: 'Chanjo',        question: 'Ninawezaje kuanza na CaloWet Air?',                                answer: 'Piga simu +254 717 124 523, tuma barua pepe kwa info@calowetair.co.ke, au jaza Fomu yetu ya Mawasiliano. Tutapanga ushauri wa bure wa eneo na kutoa nukuu ya kina ndani ya masaa 24.' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Maswali Yanayoulizwa Mara kwa Mara | CaloWet Air HVAC Kenya' : 'HVAC FAQ Kenya | Air Conditioning & Refrigeration Questions | CaloWet Air',
    description: locale === 'sw'
      ? 'Maswali yanayoulizwa mara kwa mara kuhusu huduma za HVAC, ufungaji wa AC, matengenezo, bidhaa, na chanjo nchini Kenya. Majibu ya kitaalamu kutoka CaloWet Air.'
      : 'Frequently asked questions about HVAC services, AC installation, maintenance, products and coverage in Kenya. Expert answers from CaloWet Air.',
    alternates: {
      canonical: `${BASE}/${locale}/faq`,
      languages: { en: `${BASE}/en/faq`, sw: `${BASE}/sw/faq`, 'x-default': `${BASE}/en/faq` },
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }  = await params
  const isSw        = locale === 'sw'
  const faqItems    = isSw ? FAQ_SW : FAQ_EN
  const categories  = [...new Set(faqItems.map(f => f.category))]

  /* FAQPage JSON-LD — Google shows these as rich results */
  const faqSchema = {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    mainEntity:   faqItems.map(item => ({
      '@type':        'Question',
      name:           item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar locale={locale} />

      {/* Breadcrumb bar */}
      <div className="pt-20 pb-4 bg-[#F0F6FF] border-b border-[#DCE8F7]/20">
        <div className="container-max section-padding py-3">
          <Breadcrumb items={[
            { label: 'Home', href: `/${locale}` },
            { label: isSw ? 'Maswali ya Mara kwa Mara' : 'FAQ' },
          ]} />
        </div>
      </div>

      <main id="main-content" tabIndex={-1}>
        {/* Hero band */}
        <div
          className="relative overflow-hidden py-20"
          style={{ background: 'linear-gradient(135deg, #0047AB 0%, #002D6E 100%)' }}
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <LogoIcon color="white" className="absolute top-4 right-4 w-64 h-64 opacity-[0.05]" />
            <IconWind      className="absolute bottom-4 left-4 w-48 h-48 text-white opacity-[0.04]" />
          </div>
          <div className="relative container-max section-padding text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#DCE8F7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCE8F7]" aria-hidden />
              {isSw ? 'Maswali Yanayoulizwa Mara kwa Mara' : 'Frequently Asked Questions'}
            </span>
            <h1 className="font-nura font-black text-white text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
              {isSw ? 'Maswali & Majibu' : 'Questions & Answers'}
            </h1>
            <p className="text-[#DCE8F7] text-lg max-w-2xl mx-auto">
              {isSw
                ? 'Pata majibu ya maswali ya kawaida kuhusu huduma zetu za HVAC, bidhaa, na chanjo nchini Kenya.'
                : 'Find answers to common questions about our HVAC services, products, and coverage across Kenya.'
              }
            </p>
          </div>
        </div>

        {/* FAQ accordion */}
        <div
          className="py-20"
          style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #EAF2FC 100%)' }}
        >
          <div className="container-max section-padding">
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqItems} categories={categories} />
            </div>
          </div>
        </div>

        {/* CTA band */}
        <div
          className="py-20 text-center"
          style={{ background: 'linear-gradient(135deg, #0047AB 0%, #0047AB 100%)' }}
        >
          <div className="container-max section-padding">
            <p className="text-[#DCE8F7] text-sm uppercase tracking-widest font-semibold mb-3">
              {isSw ? 'Bado una Maswali?' : 'Still Have Questions?'}
            </p>
            <h2 className="font-nura font-black text-white text-3xl md:text-4xl mb-4">
              {isSw ? 'Wataalamu Wetu Wako Tayari' : 'Our Experts Are Ready'}
            </h2>
            <p className="text-[#DCE8F7] text-base mb-8 max-w-xl mx-auto">
              {isSw
                ? 'Ikiwa hupata jibu unalotafuta, wasiliana nasi moja kwa moja. Tutakusaidia ndani ya masaa 24.'
                : 'If you don\'t find the answer you\'re looking for, contact us directly. We respond within 24 hours.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0047AB] font-bold text-sm hover:bg-[#F0F6FF] hover:-translate-y-0.5 transition-all shadow-lg"
              >
                {isSw ? 'Wasiliana Nasi' : 'Contact Us'}
                <IconArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <a
                href="tel:+254717124523"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                <IconPhone className="w-4 h-4 text-[#DCE8F7]" aria-hidden />
                +254 717 124 523
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  )
}
