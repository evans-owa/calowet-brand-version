import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | CaloWet Air Kenya',
  description: 'CaloWet Air terms of service — conditions governing use of our website and engagement with our HVAC services.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://calowetair.co.ke/en/terms',
    languages: {
      'en': 'https://calowetair.co.ke/en/terms',
      'sw': 'https://calowetair.co.ke/sw/terms',
      'x-default': 'https://calowetair.co.ke/en/terms',
    },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params
  return (
    <main className="min-h-screen bg-[#F0F6FF]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-[#0047AB] font-semibold mb-10 hover:underline">
          ← Back to CaloWet Air
        </Link>

        <h1 className="font-nura font-black text-[#0047AB] text-4xl md:text-5xl mb-3">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: 3 October 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">1. Overview</h2>
            <p>By accessing <strong>calowetair.co.ke</strong>, you agree to these terms. CaloWet Air provides HVAC installation, product sales, and maintenance services across Kenya. These terms govern use of this website and initial engagement with our services.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">2. Use of this website</h2>
            <p>This website is intended for customers seeking HVAC information, product enquiries, and service requests. You may not use this site for any unlawful purpose or in any way that could damage, disable, or impair the site.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">3. Service enquiries</h2>
            <p>Submitting a contact form or quote request does not constitute a binding contract. Formal agreements for installation or supply are made in writing between CaloWet Air and the client prior to commencement of any work.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">4. Pricing and quotations</h2>
            <p>All prices quoted via the website are estimates only and subject to site survey and final agreement. Final pricing is confirmed in a written quotation issued by CaloWet Air.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">5. Intellectual property</h2>
            <p>All content on this website — including text, graphics, and layout — is the property of CaloWet Air. You may not reproduce or redistribute it without written permission.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">6. Limitation of liability</h2>
            <p>CaloWet Air is not liable for any indirect, incidental, or consequential damages arising from use of this website or reliance on information contained herein.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">7. Governing law</h2>
            <p>These terms are governed by the laws of Kenya. Any disputes shall be subject to the jurisdiction of Kenyan courts.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">8. Contact</h2>
            <p>Questions about these terms: <a href="mailto:info@calowetair.co.ke" className="text-[#0047AB] underline">info@calowetair.co.ke</a> or <a href="tel:+254717124523" className="text-[#0047AB] underline">+254 717 124 523</a>.</p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-[#DCE8F7]/40 flex items-center justify-between">
          <Link href={`/${locale}/privacy`} className="text-sm text-[#0047AB] font-semibold hover:underline">← Privacy Policy</Link>
          <Link href={`/${locale}`} className="text-sm text-[#0047AB] font-semibold hover:underline">Home →</Link>
        </div>
      </div>
    </main>
  )
}
