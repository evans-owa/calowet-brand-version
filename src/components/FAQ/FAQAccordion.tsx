'use client'
/**
 * FAQAccordion – accessible accordion FAQ component.
 *
 * Rendering: Client Component (needs useState for open/close).
 * FAQSection (server) passes fully-resolved strings — no i18n calls here.
 *
 * Accessibility: uses <details>/<summary> natively — keyboard operable,
 * screen-reader friendly, no ARIA required beyond what the browser provides.
 *
 * Schema: FAQPage JSON-LD is rendered by FAQSection (server) — not here.
 */

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer:   string
  category: string
}

interface FAQAccordionProps {
  items:       FAQItem[]
  categories:  string[]
}

export default function FAQAccordion({ items, categories }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex,      setOpenIndex]      = useState<number | null>(0)

  const filtered = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory)

  return (
    <div>
      {/* Category filter tabs */}
      <div
        role="tablist"
        aria-label="Filter FAQ by category"
        className="flex flex-wrap gap-2 mb-10"
      >
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => { setActiveCategory('all'); setOpenIndex(0) }}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-semibold transition-all border',
            activeCategory === 'all'
              ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-md'
              : 'bg-white text-gray-600 border-[#DCE8F7]/50 hover:border-[#0047AB]/40 hover:text-[#0047AB]'
          )}
        >
          All Questions
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(0) }}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all border',
              activeCategory === cat
                ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-md'
                : 'bg-white text-gray-600 border-[#DCE8F7]/50 hover:border-[#0047AB]/40 hover:text-[#0047AB]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="flex flex-col gap-3">
        {filtered.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={`${item.category}-${i}`}
              className={cn(
                'rounded-2xl border overflow-hidden transition-all duration-200',
                isOpen
                  ? 'border-[#0047AB]/30 shadow-md'
                  : 'border-[#DCE8F7]/30 hover:border-[#0047AB]/20'
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors',
                  isOpen ? 'bg-[#0047AB]' : 'bg-white hover:bg-[#F0F6FF]'
                )}
              >
                <span className={cn(
                  'font-nura font-bold text-base leading-snug',
                  isOpen ? 'text-white' : 'text-[#0047AB]'
                )}>
                  {item.question}
                </span>
                <svg
                  aria-hidden
                  className={cn(
                    'w-5 h-5 shrink-0 transition-all duration-300',
                    isOpen ? 'rotate-45 text-white' : 'rotate-0 text-[#DCE8F7]'
                  )}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>

              {isOpen && (
                <div className="bg-white px-6 py-5 border-t border-[#DCE8F7]/20">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12 text-sm">
          No questions in this category yet.
        </p>
      )}
    </div>
  )
}
