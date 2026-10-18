/**
 * Logo – official CaloWet Air brand mark components.
 *
 * Source: brand kit brand.py — 4-blade fan with 8 sun rays.
 * All variants are inline SVG — zero network request, zero flash.
 *
 * Exports:
 *  <LogoIcon />          — icon mark only (fan + rays)
 *  <LogoFull />          — icon + "CaloWet Air" wordmark
 *  <LogoWithTagline />   — full lockup with tagline
 */

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  color?:     'blue' | 'white' | 'black'
}

/* ── Icon mark — 4-blade fan + 8 rays ───────────────────────── */
export function LogoIcon({ className, color = 'blue' }: LogoProps) {
  const c = color === 'white' ? '#FFFFFF' : color === 'black' ? '#0B1B33' : '#0047AB'
  const hub = color === 'blue' ? '#FFFFFF' : '#0047AB'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      {/* 4 fan blades */}
      {[0, 90, 180, 270].map(a => (
        <path
          key={a}
          d="M60 60 C50 47 51 30 64 21 C74 32 73 49 60 60 Z"
          fill={c}
          transform={`rotate(${a} 60 60)`}
        />
      ))}
      {/* 8 sun rays */}
      {[
        [60.00, 15.00, 60.00,  4.00],
        [91.82, 28.18, 99.60, 20.40],
        [105.00, 60.00, 116.00, 60.00],
        [91.82, 91.82,  99.60, 99.60],
        [60.00, 105.00, 60.00, 116.00],
        [28.18, 91.82,  20.40, 99.60],
        [15.00, 60.00,   4.00, 60.00],
        [28.18, 28.18,  20.40, 20.40],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={c} strokeWidth="5.5" strokeLinecap="round"
        />
      ))}
      {/* Hub */}
      <circle cx="60" cy="60" r="6.5" fill={hub} />
      <circle cx="60" cy="60" r="3"   fill={c} />
    </svg>
  )
}

/* ── Full horizontal lockup ─────────────────────────────────── */
export function LogoFull({
  className,
  color = 'blue',
}: {
  className?: string
  color?: 'blue' | 'white' | 'black'
}) {
  const c   = color === 'white' ? '#FFFFFF' : color === 'black' ? '#0B1B33' : '#0047AB'
  const hub = color === 'blue'  ? '#FFFFFF' : '#0047AB'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoIcon color={color} className="w-8 h-8" />
      <span style={{ fontFamily: "Poppins, 'Helvetica Neue', Arial, sans-serif" }}>
        <span style={{ fontWeight: 700, color: c, fontSize: '1.2em', letterSpacing: '-0.02em' }}>
          CaloWet
        </span>
        <span style={{ fontWeight: 500, color: c, fontSize: '1.2em', letterSpacing: '-0.02em' }}>
          {' '}Air
        </span>
      </span>
    </span>
  )
}

/* ── Full lockup with tagline ───────────────────────────────── */
export function LogoWithTagline({
  className,
  color = 'blue',
}: {
  className?: string
  color?: 'blue' | 'white' | 'black'
}) {
  const c    = color === 'white' ? '#FFFFFF' : color === 'black' ? '#0B1B33' : '#0047AB'
  const tagc = color === 'white' ? 'rgba(255,255,255,0.75)' : 'rgba(0,71,171,0.65)'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoIcon color={color} className="w-10 h-10 shrink-0" />
      <span className="flex flex-col">
        <span style={{
          fontFamily: "Poppins, 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700, color: c,
          fontSize: '1.15em', letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          CaloWet<span style={{ fontWeight: 500 }}> Air</span>
        </span>
        <span style={{
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 500, color: tagc,
          fontSize: '0.65em', letterSpacing: '0.025em', lineHeight: 1.3,
        }}>
          Cooling · Heating · Comfort Solutions for Kenya
        </span>
      </span>
    </span>
  )
}
