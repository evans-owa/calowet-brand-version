/**
 * sitemap.ts — Complete sitemap for calowetair.co.ke
 *
 * All real indexable pages — no anchor fragments.
 * Update LAST_UPDATED when content changes significantly.
 * Submit to: https://search.google.com/search-console → Sitemaps
 */

import type { MetadataRoute } from 'next'

const BASE         = 'https://calowetair.co.ke'
const LAST_UPDATED = new Date('2026-10-07')

function alt(enPath: string, swPath: string) {
  return {
    languages: {
      'en':        `${BASE}${enPath}`,
      'sw':        `${BASE}${swPath}`,
      'x-default': `${BASE}${enPath}`,
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepages ────────────────────────────────────────────
    { url: `${BASE}/en`, lastModified: LAST_UPDATED, changeFrequency: 'weekly',  priority: 1.0, alternates: alt('/en', '/sw') },
    { url: `${BASE}/sw`, lastModified: LAST_UPDATED, changeFrequency: 'weekly',  priority: 0.9, alternates: alt('/en', '/sw') },

    // ── About ────────────────────────────────────────────────
    { url: `${BASE}/en/about`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/about', '/sw/about') },
    { url: `${BASE}/sw/about`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/about', '/sw/about') },

    // ── Services ─────────────────────────────────────────────
    { url: `${BASE}/en/services`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9, alternates: alt('/en/services', '/sw/services') },
    { url: `${BASE}/sw/services`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9, alternates: alt('/en/services', '/sw/services') },

    // ── Products ─────────────────────────────────────────────
    { url: `${BASE}/en/products`, lastModified: LAST_UPDATED, changeFrequency: 'weekly',  priority: 0.9, alternates: alt('/en/products', '/sw/products') },
    { url: `${BASE}/sw/products`, lastModified: LAST_UPDATED, changeFrequency: 'weekly',  priority: 0.9, alternates: alt('/en/products', '/sw/products') },

    // ── Contact ──────────────────────────────────────────────
    { url: `${BASE}/en/contact`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/contact', '/sw/contact') },
    { url: `${BASE}/sw/contact`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/contact', '/sw/contact') },

    // ── FAQ ──────────────────────────────────────────────────
    { url: `${BASE}/en/faq`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/faq', '/sw/faq') },
    { url: `${BASE}/sw/faq`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates: alt('/en/faq', '/sw/faq') },

    // ── Legal ────────────────────────────────────────────────
    { url: `${BASE}/en/privacy`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3, alternates: alt('/en/privacy', '/sw/privacy') },
    { url: `${BASE}/en/terms`,   lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3, alternates: alt('/en/terms',   '/sw/terms')   },
  ]
}
