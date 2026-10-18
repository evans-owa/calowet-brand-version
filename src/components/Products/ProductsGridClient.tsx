'use client'
/**
 * ProductsGridClient – filter tabs, product grid, quote modal.
 *
 * Rendering: Client Component ('use client').
 *
 * RSC SERIALIZATION — icon resolution lives HERE:
 *  Receives category as a string. Resolves category → icon component
 *  via CATEGORY_ICON_MAP internally. No icon functions are received
 *  as props — only plain serializable data crosses the boundary.
 *
 * API caching:
 *  POST /api/contact uses  cache: 'no-store'  — critical on Vercel to
 *  prevent the Data Cache from caching form submissions.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  IconArrowRight, IconX, IconSnowflake,
  IconThermometer, IconWind, IconAirConditioner,
  IconSend, IconLoader, IconCheck, IconStar,
} from '@/components/UI/Icons'
import type { ProductCategory } from '@/types'
import type { ComponentType } from 'react'

/* Icon map owned by the client — resolved from category string */
const CATEGORY_ICON_MAP: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  'air-conditioner':    IconAirConditioner,
  'refrigerator':       IconThermometer,
  'freezer':            IconSnowflake,
  'heating':            IconThermometer,
  'commercial-cooling': IconWind,
  'ventilation':        IconWind,
}

/* ── Types ────────────────────────────────────────────────── */
interface ResolvedProduct {
  id:          string
  slug:        string
  name:        string
  description: string
  category:    ProductCategory
  brand:       string | null
  featured:    boolean
  bgColor:     string
  imageAlt:    string
}

interface UiStrings {
  requestQuote:             string
  featured:                 string
  brand:                    string
  modalTitle:               string
  modalSubtitle:            string
  modalProduct:             string
  modalName:                string
  modalNamePlaceholder:     string
  modalPhone:               string
  modalPhonePlaceholder:    string
  modalMessage:             string
  modalMessagePlaceholder:  string
  modalSubmit:              string
  modalClose:               string
  modalSuccess:             string
}

type FilterKey = 'all' | ProductCategory

/* ── Product card ─────────────────────────────────────────── */
function ProductCard({
  product,
  requestQuoteLabel,
  featuredLabel,
  brandLabel,
  onQuote,
}: {
  product:           ResolvedProduct
  requestQuoteLabel: string
  featuredLabel:     string
  brandLabel:        string
  onQuote:           (p: ResolvedProduct) => void
}) {
  const Icon = CATEGORY_ICON_MAP[product.category] ?? IconSnowflake

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#DCE8F7]/30 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
      aria-label={product.name}
    >
      {/* Illustration panel */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${product.bgColor}, ${product.bgColor}cc)` }}
        role="img"
        aria-label={product.imageAlt}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(circle at 70% 30%, #DCE8F7, transparent 60%)' }}
          aria-hidden
        />
        <Icon className="w-24 h-24 text-white/20 absolute" aria-hidden />
        <div className="relative z-10 text-center px-4">
          <Icon className="w-12 h-12 text-white/80 mx-auto mb-2" aria-hidden />
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <IconStar className="w-3 h-3 text-white" aria-hidden />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{featuredLabel}</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm">
          <span className="text-white/80 text-[10px] font-semibold capitalize">
            {product.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {product.brand && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{brandLabel}:</span>
            <span className="text-[10px] font-semibold text-[#0047AB]">{product.brand}</span>
          </div>
        )}
        <h3 className="font-nura font-bold text-[#0047AB] text-base leading-snug">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{product.description}</p>
        <button
          onClick={() => onQuote(product)}
          className="mt-auto flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-[#0047AB]/6 text-[#0047AB] font-semibold text-sm hover:bg-[#0047AB] hover:text-white transition-all duration-200 group/btn"
          aria-label={`Request quote for ${product.name}`}
        >
          {requestQuoteLabel}
          <IconArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </article>
  )
}

/* ── Quote modal ──────────────────────────────────────────── */
function QuoteModal({
  product,
  ui,
  onClose,
}: {
  product: ResolvedProduct | null
  ui:      UiStrings
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (product) {
      dialog.showModal()
    } else {
      dialog.close()
      setName(''); setPhone(''); setMessage(''); setStatus('idle')
    }
  }, [product])

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!product || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',   // ← never cache POSTs on Vercel Data Cache
        body: JSON.stringify({
          name,
          email: 'quote@calowetair.co.ke',
          phone,
          message: `Product: ${product.name}\n\n${message}`,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="w-full max-w-lg rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      aria-labelledby="modal-title"
    >
      {product && (
        <div className="flex flex-col max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4 border-b border-[#DCE8F7]/30">
            <div>
              <h2 id="modal-title" className="font-nura font-bold text-[#0047AB] text-xl">{ui.modalTitle}</h2>
              <p className="text-gray-500 text-sm mt-1">{ui.modalSubtitle}</p>
            </div>
            <button onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-[#0047AB] hover:bg-[#0047AB]/8 transition-colors ml-4 shrink-0"
              aria-label={ui.modalClose}>
              <IconX className="w-5 h-5" aria-hidden />
            </button>
          </div>

          {/* Product pill */}
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0047AB]/8 border border-[#0047AB]/15">
              <span className="text-xs text-[#0047AB]/60 font-medium shrink-0">{ui.modalProduct}:</span>
              <span className="text-xs font-bold text-[#0047AB] truncate">{product.name}</span>
            </div>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <IconCheck className="w-7 h-7 text-emerald-600" aria-hidden />
              </div>
              <p className="font-semibold text-[#0047AB] text-lg">{ui.modalSuccess}</p>
              <button onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-[#0047AB] text-white text-sm font-semibold hover:bg-[#0047AB] transition-colors">
                {ui.modalClose}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6" noValidate>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-name" className="text-xs font-bold text-[#0047AB] uppercase tracking-wide">
                  {ui.modalName} <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input id="modal-name" type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder={ui.modalNamePlaceholder}
                  className="px-4 py-3 rounded-xl border border-[#DCE8F7]/50 bg-[#F0F6FF] text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/10 transition-all" />
              </div>
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-phone" className="text-xs font-bold text-[#0047AB] uppercase tracking-wide">
                  {ui.modalPhone} <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input id="modal-phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder={ui.modalPhonePlaceholder}
                  className="px-4 py-3 rounded-xl border border-[#DCE8F7]/50 bg-[#F0F6FF] text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/10 transition-all" />
              </div>
              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-message" className="text-xs font-bold text-[#0047AB] uppercase tracking-wide">
                  {ui.modalMessage}
                </label>
                <textarea id="modal-message" rows={3} value={message} onChange={e => setMessage(e.target.value)}
                  placeholder={ui.modalMessagePlaceholder}
                  className="px-4 py-3 rounded-xl border border-[#DCE8F7]/50 bg-[#F0F6FF] text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/10 transition-all resize-none" />
              </div>
              {status === 'error' && (
                <p className="text-red-600 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded-lg" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}
              <button type="submit" disabled={status === 'loading' || !name || !phone}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0047AB] text-white font-bold text-sm hover:bg-[#0047AB] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                {status === 'loading'
                  ? <><IconLoader className="w-4 h-4" aria-hidden /> Sending…</>
                  : <><IconSend   className="w-4 h-4" aria-hidden /> {ui.modalSubmit}</>}
              </button>
            </form>
          )}
        </div>
      )}
    </dialog>
  )
}

/* ── Main grid ────────────────────────────────────────────── */
export default function ProductsGridClient({
  products,
  filterLabels,
  ui,
}: {
  products:     ResolvedProduct[]
  filterLabels: Record<string, string>
  ui:           UiStrings
}) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [quoteProduct, setQuoteProduct] = useState<ResolvedProduct | null>(null)

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all',                label: filterLabels['all']                },
    { key: 'air-conditioner',    label: filterLabels['air-conditioner']    },
    { key: 'refrigerator',       label: filterLabels['refrigerator']       },
    { key: 'commercial-cooling', label: filterLabels['commercial-cooling'] },
    { key: 'ventilation',        label: filterLabels['ventilation']        },
  ]

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p =>
        p.category === activeFilter ||
        (activeFilter === 'refrigerator' && p.category === 'freezer')
      )

  return (
    <>
      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter products" className="flex flex-wrap gap-2 justify-center mb-10">
        {filters.map(f => (
          <button key={f.key} role="tab" aria-selected={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
              activeFilter === f.key
                ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-md shadow-[#0047AB]/20'
                : 'bg-white text-gray-600 border-[#DCE8F7]/50 hover:border-[#0047AB]/40 hover:text-[#0047AB]'
            )}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-live="polite">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            requestQuoteLabel={ui.requestQuote}
            featuredLabel={ui.featured}
            brandLabel={ui.brand}
            onQuote={setQuoteProduct}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">No products in this category yet.</div>
      )}

      {/* Native dialog modal — always in DOM, hidden when closed */}
      <QuoteModal product={quoteProduct} ui={ui} onClose={() => setQuoteProduct(null)} />
    </>
  )
}
