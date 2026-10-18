'use client'
/**
 * FooterNewsletterInput – isolated Client Component for newsletter signup.
 *
 * Rendering: Client Component ('use client').
 *
 * This is deliberately tiny — only the interactive input field and
 * submit button are hydrated. The rest of the Footer (headings, links,
 * contact info, socials) stays as plain server-rendered HTML.
 *
 * Caching: No API route is wired up yet — the handler is a placeholder
 * stub. When you add a real newsletter endpoint, use:
 *   fetch('/api/newsletter', { method: 'POST', cache: 'no-store' })
 * so Next.js never caches the POST response.
 */

'use client'

import { useState } from 'react'
import { IconMail, IconCheck, IconLoader } from '@/components/UI/Icons'

interface FooterNewsletterInputProps {
  placeholder: string
  submitLabel: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FooterNewsletterInput({
  placeholder,
  submitLabel,
}: FooterNewsletterInputProps) {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    // TODO: Replace with real newsletter API call
    // e.g. POST /api/newsletter with { email }
    await new Promise(r => setTimeout(r, 800)) // simulate
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-[#DCE8F7]/30">
        <IconCheck className="w-4 h-4 text-[#DCE8F7] shrink-0" aria-hidden />
        <span className="text-sm text-white/80">You're subscribed — thanks!</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
      aria-label="Newsletter signup"
      noValidate
    >
      <div className="relative flex-1">
        <IconMail
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
          aria-hidden
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#DCE8F7]/60 focus:bg-white/15 transition-all"
          aria-label="Email address for newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="px-4 py-2.5 rounded-lg bg-[#DCE8F7] text-[#0047AB] text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
      >
        {status === 'loading'
          ? <IconLoader className="w-4 h-4" aria-hidden />
          : submitLabel
        }
      </button>
    </form>
  )
}
