import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactPayload } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()
    const { name, email, phone, message } = body

    // Basic server-side validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    await sendContactEmail({ name, email, phone, message })

    return NextResponse.json(
      { message: 'Email sent successfully.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[contact/route] Error:', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
