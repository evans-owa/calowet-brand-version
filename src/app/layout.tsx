/**
 * Root layout — minimal shell with webmanifest.
 * The [locale]/layout.tsx handles all real layout, metadata, and schemas.
 */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
