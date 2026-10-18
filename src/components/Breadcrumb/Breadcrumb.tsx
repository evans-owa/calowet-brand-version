/**
 * Breadcrumb – accessible breadcrumb trail with JSON-LD schema.
 *
 * Rendering: Server Component — pure markup, zero JS.
 * Outputs: visible breadcrumb nav + inline BreadcrumbList schema.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: 'Home',     href: '/en'          },
 *     { label: 'Services', href: '/en/services' },
 *     { label: 'About Us'                       },  // current — no href
 *   ]} />
 */

import Link from 'next/link'

const BASE = 'https://calowetair.co.ke'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.label,
      ...(item.href ? { item: `${BASE}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="w-full">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-sm"
          role="list"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg
                    aria-hidden
                    className="w-3.5 h-3.5 text-[#DCE8F7] shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                  </svg>
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={isLast
                      ? 'text-[#0047AB] font-semibold'
                      : 'text-gray-500'
                    }
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-[#0047AB] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
