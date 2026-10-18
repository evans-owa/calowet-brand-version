'use client'
/**
 * ContactForm – enquiry form with validation, loading state, success view.
 *
 * Rendering: Client Component island ('use client').
 *
 * Why isolated:
 *  Manages controlled inputs (name, email, phone, message),
 *  field-level validation state, loading spinner, and POSTs to
 *  /api/contact. All of this requires useState — must be a Client
 *  Component. The rest of ContactSection stays as static server HTML.
 *
 * API caching:
 *  fetch('/api/contact', { cache: 'no-store' }) — critical on Vercel.
 *  Without this, Next.js Data Cache may cache POST responses.
 *  'no-store' guarantees every submission hits the Nodemailer handler.
 *
 * Progressive enhancement:
 *  Before hydration the form renders with real labels and inputs.
 *  The submit button is type="submit" inside a <form> — works without JS
 *  (will reload, not send via fetch, but the UX degrades gracefully).
 *
 * Accessibility:
 *  - All inputs have associated <label htmlFor>
 *  - Required fields marked with aria-required + visible asterisk
 *  - Error messages use role="alert" for immediate SR announcement
 *  - Success state uses aria-live="polite"
 *  - Loading state disables submit and announces via aria-label
 *
 * RSC SERIALIZATION:
 *  Receives only a plain string object (formStrings) — fully serializable.
 *  All icon components (IconSend, IconLoader, etc.) are imported
 *  directly here, never received as props.
 */

'use client'

import { useState } from 'react'
import {
  IconSend,
  IconLoader,
  IconCheck,
  IconPhone,
  IconMail,
} from '@/components/UI/Icons'
import { cn } from '@/lib/utils'

interface FormStrings {
  name:               string
  namePlaceholder:    string
  email:              string
  emailPlaceholder:   string
  phone:              string
  phonePlaceholder:   string
  message:            string
  messagePlaceholder: string
  submit:             string
  submitting:         string
  success:            string
  error:              string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FieldErrors {
  name?:    string
  email?:   string
  phone?:   string
  message?: string
}

/* Simple client-side validators */
function validate(name: string, email: string, phone: string, message: string): FieldErrors {
  const errs: FieldErrors = {}
  if (!name.trim())                                   errs.name    = 'Name is required.'
  if (!email.trim())                                  errs.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email  = 'Enter a valid email.'
  if (!phone.trim())                                  errs.phone   = 'Phone number is required.'
  if (!message.trim())                                errs.message = 'Please write a message.'
  return errs
}

/* Reusable input wrapper */
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id:       string
  label:    string
  required?: boolean
  error?:   string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold text-[#0047AB] uppercase tracking-wide"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden>*</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError: boolean) => cn(
  'w-full px-4 py-3 rounded-xl border text-gray-800 text-sm',
  'placeholder:text-gray-400 bg-[#F0F6FF]',
  'focus:outline-none focus:ring-2 focus:ring-[#0047AB]/15 transition-all duration-200',
  hasError
    ? 'border-red-400 focus:border-red-500'
    : 'border-[#DCE8F7]/50 focus:border-[#0047AB]'
)

export default function ContactForm({ strings: s }: { strings: FormStrings }) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState('')
  const [errors,  setErrors]  = useState<FieldErrors>({})
  const [status,  setStatus]  = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(name, email, phone, message)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        cache:   'no-store',  // never cache POSTs on Vercel Data Cache
        body:    JSON.stringify({ name, email, phone, message }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  /* ── Success view ──────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-center gap-5 py-12 text-center"
        aria-live="polite"
        role="status"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <IconCheck className="w-8 h-8 text-emerald-600" aria-hidden />
        </div>
        <div>
          <h3 className="font-nura font-bold text-[#0047AB] text-xl mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            {s.success}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href={`tel:+254700000000`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0047AB]/8 text-[#0047AB] text-sm font-semibold hover:bg-[#0047AB]/15 transition-colors"
          >
            <IconPhone className="w-4 h-4" aria-hidden />
            Call us now
          </a>
          <a
            href="mailto:info@calowetair.co.ke"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#DCE8F7]/50 text-gray-600 text-sm font-semibold hover:bg-[#F0F6FF] transition-colors"
          >
            <IconMail className="w-4 h-4" aria-hidden />
            Send another email
          </a>
        </div>
      </div>
    )
  }

  /* ── Form ──────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact enquiry form"
    >
      {/* Section label */}
      <p className="text-[10px] font-bold text-[#0047AB]/50 uppercase tracking-[0.18em] mb-6">
        Send us a message
      </p>

      <div className="flex flex-col gap-5">

        {/* Name + Email row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field id="contact-name" label={s.name} required error={errors.name}>
            <input
              id="contact-name"
              type="text"
              required
              aria-required="true"
              aria-describedby={errors.name ? 'contact-name-err' : undefined}
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => name && setErrors(prev => ({ ...prev, name: undefined }))}
              placeholder={s.namePlaceholder}
              className={inputClass(!!errors.name)}
              disabled={status === 'loading'}
            />
          </Field>

          <Field id="contact-email" label={s.email} required error={errors.email}>
            <input
              id="contact-email"
              type="email"
              required
              aria-required="true"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => email && setErrors(prev => ({ ...prev, email: undefined }))}
              placeholder={s.emailPlaceholder}
              className={inputClass(!!errors.email)}
              disabled={status === 'loading'}
            />
          </Field>
        </div>

        {/* Phone */}
        <Field id="contact-phone" label={s.phone} required error={errors.phone}>
          <div className="relative">
            {/* Kenya flag prefix */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-sm leading-none" role="img" aria-label="Kenya">🇰🇪</span>
              <span className="text-gray-300 text-xs">|</span>
            </div>
            <input
              id="contact-phone"
              type="tel"
              required
              aria-required="true"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onBlur={() => phone && setErrors(prev => ({ ...prev, phone: undefined }))}
              placeholder={s.phonePlaceholder}
              className={cn(inputClass(!!errors.phone), 'pl-14')}
              disabled={status === 'loading'}
            />
          </div>
        </Field>

        {/* Message */}
        <Field id="contact-message" label={s.message} required error={errors.message}>
          <textarea
            id="contact-message"
            required
            aria-required="true"
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onBlur={() => message && setErrors(prev => ({ ...prev, message: undefined }))}
            placeholder={s.messagePlaceholder}
            className={cn(inputClass(!!errors.message), 'resize-none')}
            disabled={status === 'loading'}
          />
        </Field>

        {/* API error banner */}
        {status === 'error' && (
          <div
            role="alert"
            className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            <span className="shrink-0 mt-0.5">⚠</span>
            {s.error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label={status === 'loading' ? s.submitting : s.submit}
          className="
            flex items-center justify-center gap-2.5
            w-full py-4 rounded-xl
            bg-[#0047AB] text-white
            font-bold text-sm tracking-wide
            hover:bg-[#0047AB] hover:-translate-y-0.5
            active:translate-y-0
            disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
            transition-all duration-200
            shadow-md shadow-[#0047AB]/20 hover:shadow-lg hover:shadow-[#0047AB]/25
          "
        >
          {status === 'loading' ? (
            <>
              <IconLoader className="w-4 h-4" aria-hidden />
              {s.submitting}
            </>
          ) : (
            <>
              <IconSend className="w-4 h-4" aria-hidden />
              {s.submit}
            </>
          )}
        </button>

        {/* Privacy note */}
        <p className="text-center text-[11px] text-gray-400 leading-relaxed">
          Your information is used only to respond to your enquiry.
          We do not share or sell your data.
        </p>

      </div>
    </form>
  )
}
