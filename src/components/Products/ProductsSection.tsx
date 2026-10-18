/**
 * ProductsSection – filterable product grid with quote modal.
 *
 * Rendering: Static Server Component.
 *
 * RSC SERIALIZATION — all data passed to ProductsGridClient
 * (a Client Component) is fully serializable:
 *   ✓ strings, numbers, booleans, plain objects, arrays
 *   ✗ NO icon functions, NO React elements, NO class instances
 *
 * The bgColor hex string replaces any icon component prop.
 * ProductsGridClient uses its own internal icon map keyed by category.
 *
 * Caching: Static (src/data/products.ts — no fetch).
 * Future CMS: add revalidate = 3600 at the [locale]/page level.
 *
 * API caching: /api/contact POST uses cache:'no-store' in the client —
 * enforced inside ProductsGridClient, never cached on Vercel's Data Cache.
 */

import { getTranslations } from 'next-intl/server'
import { products } from '@/data/products'
import { SectionTitle } from '@/components/UI'
import { IconSnowflake, IconThermometer, IconWind } from '@/components/UI/Icons'
import { LogoIcon } from '@/components/UI/Logo'
import ProductsGridClient from './ProductsGridClient'
import type { ProductCategory } from '@/types'

const categoryColors: Record<ProductCategory | 'default', string> = {
  'air-conditioner':    '#0047AB',
  'refrigerator':       '#0047AB',
  'freezer':            '#002D6E',
  'heating':            '#DCE8F7',
  'commercial-cooling': '#0047AB',
  'ventilation':        '#0047AB',
  'default':            '#0047AB',
}

/* Translation key → next-intl message path */
const NAME_KEY_MAP: Record<string, string> = {
  'products.items.splitAc.name':          'items.splitAc.name',
  'products.items.cassetteAc.name':       'items.cassetteAc.name',
  'products.items.commercialFridge.name': 'items.commercialFridge.name',
  'products.items.chestFreezer.name':     'items.chestFreezer.name',
  'products.items.vrfSystem.name':        'items.vrfSystem.name',
  'products.items.ventilation.name':      'items.ventilation.name',
}
const DESC_KEY_MAP: Record<string, string> = {
  'products.items.splitAc.description':          'items.splitAc.description',
  'products.items.cassetteAc.description':       'items.cassetteAc.description',
  'products.items.commercialFridge.description': 'items.commercialFridge.description',
  'products.items.chestFreezer.description':     'items.chestFreezer.description',
  'products.items.vrfSystem.description':        'items.vrfSystem.description',
  'products.items.ventilation.description':      'items.ventilation.description',
}

export default async function ProductsSection() {
  const t = await getTranslations('products')

  /* All string/primitive — safe to cross RSC boundary */
  const resolvedProducts = products.map(p => ({
    id:          p.id,
    slug:        p.slug,
    name:        t(NAME_KEY_MAP[p.nameKey] as any),
    description: t(DESC_KEY_MAP[p.descriptionKey] as any),
    category:    p.category,
    brand:       p.brand ?? null,
    featured:    p.featured ?? false,
    bgColor:     categoryColors[p.category] ?? categoryColors['default'],
    imageAlt:    p.imageAlt ?? `${p.category.replace('-', ' ')} HVAC product by CaloWet Air Kenya`,
  }))

  const filterLabels = {
    all:                  t('filterAll'),
    'air-conditioner':    t('filterAC'),
    'refrigerator':       t('filterRefrigeration'),
    'freezer':            t('filterRefrigeration'),
    'commercial-cooling': t('filterCommercial'),
    'ventilation':        t('filterVentilation'),
  }

  const ui = {
    requestQuote:             t('requestQuote'),
    featured:                 t('featured'),
    brand:                    t('brand'),
    modalTitle:               t('modalTitle'),
    modalSubtitle:            t('modalSubtitle'),
    modalProduct:             t('modalProduct'),
    modalName:                t('modalName'),
    modalNamePlaceholder:     t('modalNamePlaceholder'),
    modalPhone:               t('modalPhone'),
    modalPhonePlaceholder:    t('modalPhonePlaceholder'),
    modalMessage:             t('modalMessage'),
    modalMessagePlaceholder:  t('modalMessagePlaceholder'),
    modalSubmit:              t('modalSubmit'),
    modalClose:               t('modalClose'),
    modalSuccess:             t('modalSuccess'),
  }

  return (
    <section
      id="products"
      className="relative overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-[#F0F6FF] pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(#0047AB 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Decorative icons — server-rendered, no client cost */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <LogoIcon color="blue" className="absolute -top-10 -left-10 w-72 h-72 opacity-[0.04]" />
        <IconThermometer  className="absolute bottom-20 right-0 w-48 h-48 text-[#0047AB] opacity-[0.03]" />
        <IconWind         className="absolute top-1/2 -right-8 w-40 h-40 text-[#0047AB] opacity-[0.03]" />
      </div>

      <div className="relative section-padding pt-20 pb-24">
        <div className="container-max">
          <SectionTitle
            id="products-heading"
            label={t('sectionLabel')}
            heading={t('heading')}
            subheading={t('subheading')}
            align="center"
          />
          {/*
            resolvedProducts: array of plain objects (strings + booleans) — ✓ serializable
            filterLabels: plain string object — ✓ serializable
            ui: plain string object — ✓ serializable
          */}
          <ProductsGridClient
            products={resolvedProducts}
            filterLabels={filterLabels}
            ui={ui}
          />
        </div>
      </div>
    </section>
  )
}
