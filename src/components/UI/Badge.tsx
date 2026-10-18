/**
 * Badge – small label pill.
 *
 * Rendering: Server Component. Pure markup, zero JS.
 */

import { cn } from '@/lib/utils'

type BadgeVariant = 'royal' | 'powder' | 'ice' | 'success' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  royal:   'bg-[#0047AB] text-[#F0F6FF]',
  powder:  'bg-[#DCE8F7]/30 text-[#0047AB]',
  ice:     'bg-[#F0F6FF] text-[#0047AB] border border-[#DCE8F7]',
  success: 'bg-emerald-100 text-emerald-800',
  neutral: 'bg-gray-100 text-gray-600',
}

export function Badge({ children, variant = 'powder', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
