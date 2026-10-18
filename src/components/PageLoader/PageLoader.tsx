'use client'
/**
 * PageLoader — slim top-of-page progress bar.
 *
 * Pattern: YouTube / GitHub / NProgress style.
 * A 3px branded gradient bar runs across the top of the screen
 * during page load. Unobtrusive, industry-standard, fast.
 *
 * Why not skeleton: The real problem was the navbar transparency
 * on sub-pages (fixed). A full-screen skeleton blocks content
 * and actually hurts perceived performance.
 *
 * Phases:
 *   0ms  → bar appears at 8%
 *   100ms → jumps to 35% (fast initial progress)
 *   350ms → 65% (slows — simulates real network)
 *   600ms → 85% (holds — waiting for hydration)
 *   800ms → 100% + fade out (hydration complete)
 */

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [width,   setWidth]   = useState(0)
  const [visible, setVisible] = useState(true)
  const [done,    setDone]    = useState(false)

  useEffect(() => {
    // Kick off immediately
    setWidth(8)

    const t1 = setTimeout(() => setWidth(35),  100)
    const t2 = setTimeout(() => setWidth(65),  350)
    const t3 = setTimeout(() => setWidth(85),  600)
    const t4 = setTimeout(() => {
      setWidth(100)
      setDone(true)
    }, 800)
    const t5 = setTimeout(() => setVisible(false), 1050)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(t4); clearTimeout(t5)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        right:         0,
        zIndex:        99999,
        height:        '3px',
        pointerEvents: 'none',
        background:    'transparent',
      }}
    >
      <div
        style={{
          height:     '100%',
          width:      `${width}%`,
          background: 'linear-gradient(90deg, #0047AB 0%, #DCE8F7 60%, #0047AB 100%)',
          backgroundSize: '200% 100%',
          borderRadius: '0 2px 2px 0',
          boxShadow:  '0 0 10px rgba(220,232,247,0.7), 0 0 4px rgba(0,71,171,0.4)',
          transition: done
            ? 'width 0.15s ease-out, opacity 0.25s ease 0.15s'
            : width <= 8
              ? 'none'
              : 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: done ? 0 : 1,
          animation: 'shimmerBar 1.5s ease infinite',
        }}
      />
      <style>{`
        @keyframes shimmerBar {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  )
}
