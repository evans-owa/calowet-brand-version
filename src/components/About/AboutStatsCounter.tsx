'use client'
/**
 * AboutStatsCounter — animated count-up stat cards.
 *
 * Fix: removed the setCount(0) flash. Instead of resetting to 0
 * and counting up visibly, we now:
 *  1. Start hidden (opacity: 0, translateY: 12px)
 *  2. When IntersectionObserver fires, fade cards in
 *  3. Simultaneously count from 0 — but cards are invisible during
 *     the first frame, so the "0 flash" is never seen
 *
 * SSR: renders final value (e.g. 10, 5, 500) for SEO and no-JS users.
 * Client: fades in with count-up after intersection.
 *
 * RSC boundary: receives iconKey string, not icon component (function).
 */

import { useState, useEffect, useRef } from 'react'
import { IconThermometer, IconMapPin, IconShield } from '@/components/UI/Icons'

const ICON_MAP = {
  thermometer: IconThermometer,
  mappin:      IconMapPin,
  shield:      IconShield,
} as const

export type StatIconKey = keyof typeof ICON_MAP

export interface StatItem {
  value:   number
  suffix:  string
  label:   string
  iconKey: StatIconKey
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(target) // SSR renders final value

  useEffect(() => {
    if (!active) return

    // Start from 0 inside the effect — cards are already fading in
    // so the "0" frame is hidden by the opacity transition
    let start: number | null = null
    const startValue = 0

    function tick(timestamp: number) {
      if (!start) start = timestamp
      const elapsed  = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(startValue + eased * (target - startValue)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target, duration])

  return count
}

function StatCard({
  stat,
  active,
  delay,
}: {
  stat:   StatItem
  active: boolean
  delay:  number
}) {
  const count = useCountUp(stat.value, 1000 + delay * 150, active)
  const Icon  = ICON_MAP[stat.iconKey]

  return (
    <div
      className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#DCE8F7]/30 shadow-sm"
      style={{
        opacity:    active ? 1 : 0,
        transform:  active ? 'translateY(0)' : 'translateY(14px)',
        // Delay each card slightly for a stagger effect
        transition: `opacity 0.5s ease ${delay * 120}ms, transform 0.5s ease ${delay * 120}ms`,
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-[#0047AB]/8 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-[#0047AB]" aria-hidden />
      </div>
      <div>
        <p
          className="font-nura font-black text-[#0047AB] text-3xl leading-none"
          // Always announce the final value for screen readers
          aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
        >
          {active ? count : stat.value}{stat.suffix}
        </p>
        <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
      </div>
    </div>
  )
}

export default function AboutStatsCounter({ stats }: { stats: StatItem[] }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect() // fire once
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3"
      aria-label="Company statistics"
    >
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} active={active} delay={i} />
      ))}
    </div>
  )
}
