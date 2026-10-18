import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // ── Production source maps — never expose server code ──────
  productionBrowserSourceMaps: false,

  // ── Remove X-Powered-By header ──────────────────────────────
  poweredByHeader: false,

  // ── Canonical URL discipline — no trailing slashes ──────────
  // /en and /sw are canonical. /en/ and /sw/ 308-redirect to them.
  trailingSlash: false,

  // ── 308 Permanent redirects — PageRank flows through ────────
  async redirects() {
    return [
      { source: '/',             destination: '/en',          permanent: true },
      { source: '/en/',          destination: '/en',          permanent: true },
      { source: '/sw/',          destination: '/sw',          permanent: true },
      { source: '/en/about/',    destination: '/en/about',    permanent: true },
      { source: '/sw/about/',    destination: '/sw/about',    permanent: true },
      { source: '/en/services/', destination: '/en/services', permanent: true },
      { source: '/sw/services/', destination: '/sw/services', permanent: true },
      { source: '/en/products/', destination: '/en/products', permanent: true },
      { source: '/sw/products/', destination: '/sw/products', permanent: true },
      { source: '/en/contact/',  destination: '/en/contact',  permanent: true },
      { source: '/sw/contact/',  destination: '/sw/contact',  permanent: true },
      { source: '/en/faq/',      destination: '/en/faq',      permanent: true },
      { source: '/sw/faq/',      destination: '/sw/faq',      permanent: true },
    ]
  },

  // ── Security headers ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff'                         },
          { key: 'X-Frame-Options',         value: 'DENY'                            },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)
