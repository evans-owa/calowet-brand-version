import { LogoIcon } from '@/components/UI/Logo'
/**
 * not-found.tsx — Custom 404 page (root level).
 *
 * Next.js App Router renders this for any unmatched route.
 * Keeping it at root /app level catches all locales + unknown paths.
 * Branded, links back home, good for SEO (proper 404 status code).
 */

import Link from 'next/link'

export const metadata = {
  title: '404 – Page Not Found | CaloWet Air',
  description: 'The page you are looking for could not be found. Return to CaloWet Air HVAC Solutions Kenya.',
}

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#F0F6FF',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '480px' }}>
          {/* Logo mark */}
          <div style={{
            width: '64px', height: '64px',
            background: '#0047AB',
            borderRadius: '14px',
            margin: '0 auto 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="#DCE8F7" strokeWidth="1.75" strokeLinecap="round">
              <line x1="12" y1="2"  x2="12" y2="6"  />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2"  y1="12" x2="6"  y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
              <circle cx="12" cy="12" r="4"/>
            </svg>
          </div>

          {/* 404 number */}
          <p style={{
            fontSize: '6rem', fontWeight: 900,
            color: '#0047AB', lineHeight: 1,
            margin: '0 0 0.5rem',
            fontFamily: 'system-ui, sans-serif',
          }}>
            404
          </p>

          <h1 style={{
            fontSize: '1.5rem', fontWeight: 700,
            color: '#0047AB', margin: '0 0 0.75rem',
          }}>
            Page Not Found
          </h1>

          <p style={{
            color: '#6b7280', fontSize: '1rem',
            lineHeight: 1.6, margin: '0 0 2rem',
          }}>
            The page you are looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back to CaloWet Air.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/en"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                background: '#0047AB',
                color: 'white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              Go Home
            </Link>
            <Link
              href="/en#contact"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                border: '2px solid #0047AB',
                color: '#0047AB',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Contact Us
            </Link>
          </div>

          <p style={{ marginTop: '2.5rem', color: '#9ca3af', fontSize: '0.8rem' }}>
            CaloWet Air · HVAC Solutions Kenya
          </p>
        </div>
      </body>
    </html>
  )
}
