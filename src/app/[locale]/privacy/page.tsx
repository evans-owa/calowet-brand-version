import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CaloWet Air Kenya',
  description: 'CaloWet Air privacy policy — how we collect, use and protect your personal information.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://calowetair.co.ke/en/privacy',
    languages: {
      'en': 'https://calowetair.co.ke/en/privacy',
      'sw': 'https://calowetair.co.ke/sw/privacy',
      'x-default': 'https://calowetair.co.ke/en/privacy',
    },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sw' }]
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params
  return (
    <main className="min-h-screen bg-[#F0F6FF]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Back link */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-[#0047AB] font-semibold mb-10 hover:underline">
          ← Back to CaloWet Air
        </Link>

        <h1 className="font-nura font-black text-[#0047AB] text-4xl md:text-5xl mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: 3 October 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">1. Who we are</h2>
            <p>CaloWet Air is a professional HVAC company registered in Kenya. Our website address is <strong>https://calowetair.co.ke</strong>. We can be reached at <a href="mailto:info@calowetair.co.ke" className="text-[#0047AB] underline">info@calowetair.co.ke</a> or <a href="tel:+254717124523" className="text-[#0047AB] underline">+254 717 124 523</a>.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">2. What data we collect</h2>
            <p>When you submit our contact form, we collect:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your full name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>The message or enquiry you send us</li>
            </ul>
            <p className="mt-3">We do not use cookies, analytics trackers, or any third-party tracking scripts on this website.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">3. How we use your data</h2>
            <p>Your information is used solely to respond to your enquiry about our HVAC products and services. We will contact you via the email or phone number you provide. We do not use your data for marketing without your explicit consent.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">4. Data sharing</h2>
            <p>We do not sell, rent, or share your personal data with third parties. Your enquiry details are received only by CaloWet Air staff who handle customer communications.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">5. Data retention</h2>
            <p>We retain your enquiry data for up to 12 months in order to provide follow-up service. You may request deletion at any time by emailing <a href="mailto:info@calowetair.co.ke" className="text-[#0047AB] underline">info@calowetair.co.ke</a>.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">6. Your rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data. Contact us at the address above to exercise these rights.</p>
          </section>

          <section>
            <h2 className="font-nura font-bold text-[#0047AB] text-2xl mb-3">7. Changes to this policy</h2>
            <p>We may update this policy from time to time. The date at the top of this page reflects the most recent revision.</p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-[#DCE8F7]/40 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-sm text-[#0047AB] font-semibold hover:underline">← Home</Link>
          <Link href={`/${locale}/terms`} className="text-sm text-[#0047AB] font-semibold hover:underline">Terms of Service →</Link>
        </div>
      </div>
    </main>
  )
}
