'use client'
/**
 * ServiceCardsClient – interactive hover state for 4 service cards.
 *
 * Rendering: Client Component island ('use client').
 *
 * RSC SERIALIZATION — icon resolution lives HERE:
 *  The server passes `iconKey` (a string). This component owns the
 *  ICON_MAP and resolves string → component. Nothing crosses the
 *  Server/Client boundary except plain serializable data.
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  IconCheck,
  IconArrowRight,
  IconWrench,
  IconShoppingBag,
  IconSettings,
  IconLightbulb,
} from '@/components/UI/Icons'
import type { ComponentType } from 'react'

/* Icon map lives in the client — resolved from string keys */
const ICON_MAP: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  Wrench:      IconWrench,
  ShoppingBag: IconShoppingBag,
  Settings:    IconSettings,
  Lightbulb:   IconLightbulb,
}

interface CardData {
  id:          string
  iconKey:     string      // ← string, not a function
  title:       string
  description: string
  features:    string[]
  accent:      { from: string; to: string }
}

export default function ServiceCardsClient({
  cards,
  ctaLabel,
}: {
  cards:    CardData[]
  ctaLabel: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list" aria-label="Our services">
      {cards.map((card, idx) => {
        const Icon     = ICON_MAP[card.iconKey]  // resolved here on the client
        const isActive = activeId === card.id
        const isDimmed = activeId !== null && !isActive

        return (
          <article
            key={card.id}
            role="listitem"
            onMouseEnter={() => setActiveId(card.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(card.id)}
            onBlur={() => setActiveId(null)}
            className={cn(
              'group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 bg-white cursor-default',
              isActive
                ? 'border-[#0047AB]/30 shadow-xl shadow-[#0047AB]/10 -translate-y-2'
                : 'border-[#DCE8F7]/30 shadow-sm',
              isDimmed && 'opacity-60'
            )}
          >
            {/* Coloured top bar */}
            <div
              className="h-1.5 w-full shrink-0"
              style={{ background: `linear-gradient(90deg, ${card.accent.from}, ${card.accent.to})` }}
              aria-hidden
            />

            <div className="flex flex-col flex-1 p-6 gap-5">
              {/* Icon + index watermark */}
              <div className="flex items-start justify-between">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300',
                  isActive ? 'bg-[#0047AB]' : 'bg-[#0047AB]/8'
                )}>
                  {Icon && (
                    <Icon
                      className={cn('w-5 h-5 transition-colors duration-300', isActive ? 'text-white' : 'text-[#0047AB]')}
                      aria-hidden
                    />
                  )}
                </div>
                <span aria-hidden className="font-nura font-black text-4xl text-[#0047AB]/05 leading-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + description */}
              <div>
                <h3 className="font-nura font-bold text-[#0047AB] text-lg mb-2 leading-snug">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 mt-auto" aria-label={`${card.title} includes`}>
                {card.features.map(feat => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300',
                      isActive ? 'bg-[#0047AB]' : 'bg-[#0047AB]/15'
                    )}>
                      <IconCheck className={cn('w-2.5 h-2.5 transition-colors duration-300', isActive ? 'text-white' : 'text-[#0047AB]')} aria-hidden />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={cn(
                  'mt-4 flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300',
                  isActive ? 'bg-[#0047AB] text-white' : 'bg-[#0047AB]/6 text-[#0047AB] hover:bg-[#0047AB]/12'
                )}
                aria-label={`${ctaLabel} — ${card.title}`}
              >
                {ctaLabel}
                <IconArrowRight className={cn('w-4 h-4 transition-transform duration-200', isActive && 'translate-x-0.5')} aria-hidden />
              </a>
            </div>

            {/* Bottom glow */}
            {isActive && (
              <div aria-hidden className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${card.accent.from}15, transparent)` }}
              />
            )}
          </article>
        )
      })}
    </div>
  )
}
