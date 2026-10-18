/**
 * Icons – centralised SVG icon set for CaloWet Air.
 *
 * Rendering: Server Component (pure SVG, zero JS, zero dependencies).
 * These are inline SVGs — no external library needed, no network request,
 * no hydration cost. Each icon is tree-shaken via named exports.
 *
 * Usage:
 *   import { IconWrench } from '@/components/UI/Icons'
 *   <IconWrench className="w-6 h-6 text-[#0047AB]" />
 *
 * Adding new icons: copy any block below, change the export name and
 * the <path> d="" value from https://lucide.dev (stroke icons, viewBox 24 24).
 */

import { cn } from '@/lib/utils'

interface IconProps {
  className?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}

const base = 'inline-block shrink-0'
const defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ── Navigation & UI ──────────────────────────────────────── */

export function IconMenu({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function IconX({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function IconChevronDown({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconArrowRight({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function IconExternalLink({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export function IconGlobe({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

/* ── Services ─────────────────────────────────────────────── */

export function IconWrench({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

export function IconShoppingBag({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function IconSettings({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconLightbulb({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </svg>
  )
}

/* ── Customer segments ────────────────────────────────────── */

export function IconHome({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function IconHotel({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <path d="m9 22 0-4 6 0 0 4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  )
}

export function IconBuilding({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  )
}

export function IconBriefcase({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

/* ── Contact & info ───────────────────────────────────────── */

export function IconPhone({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.7 1.18L6.7 1.2a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function IconMail({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function IconMapPin({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function IconSend({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

/* ── Social media ─────────────────────────────────────────── */

export function IconFacebook({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function IconInstagram({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function IconTwitter({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M4 4l11.733 16H20L8.267 4zM4 20l6.768-6.768M20 4l-6.768 6.768" />
    </svg>
  )
}

export function IconWhatsApp({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest} fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export function IconLinkedin({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/* ── HVAC-specific ────────────────────────────────────────── */

export function IconAirConditioner({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <rect x="2" y="3" width="20" height="10" rx="2" />
      <path d="M7 17v2M12 17v2M17 17v2M7 13v4M12 13v4M17 13v4" />
    </svg>
  )
}

export function IconSnowflake({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="m20 16-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
    </svg>
  )
}

export function IconThermometer({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  )
}

export function IconWind({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  )
}

export function IconShield({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export function IconStar({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function IconCheck({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, className)} {...rest}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function IconLoader({ className, ...rest }: IconProps) {
  return (
    <svg {...defaultProps} className={cn(base, 'animate-spin', className)} {...rest}>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  )
}
