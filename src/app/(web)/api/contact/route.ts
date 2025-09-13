// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// optional: Sanity fetch to resolve handler email if handlerId is used
import { sanityServerClient } from '@/lib/sanity.server'

type Body = {
  name: string
  email: string
  subject?: string
  message: string
  handlerId?: string
  // optionally add recaptchaToken?: string
}

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const EMAIL_FROM = process.env.EMAIL_FROM || `no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'}`
const DEFAULT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL // fallback

async function resolveRecipientById(handlerId?: string) {
  if (!handlerId) return DEFAULT_RECIPIENT ?? null
  try {
    const doc = await sanityServerClient.fetch('*[_type == "teamMember" && _id == $id][0]{name, email}', { id: handlerId })
    return doc?.email ?? DEFAULT_RECIPIENT ?? null
  } catch (err) {
    console.error('resolveRecipientById error', err)
    return DEFAULT_RECIPIENT ?? null
  }
}

function validateEmail(e?: string) {
  if (!e) return false
  // simple regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body

    // Basic server-side validation
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // anti-spam: Basic length checks
    if (body.message.length < 10 || body.message.length > 20000) {
      return NextResponse.json({ error: 'Message length invalid' }, { status: 400 })
    }

    // Resolve recipient
    const recipient = await resolveRecipientById(body.handlerId)
    if (!recipient) return NextResponse.json({ error: 'No recipient configured' }, { status: 500 })

    // Compose email content (simple HTML)
    const subject = `[Website Contact] ${body.subject || 'New message'}`
    const html = `
      <p><strong>From:</strong> ${escapeHtml(body.name)} &lt;${escapeHtml(body.email)}&gt;</p>
      <p><strong>To:</strong> ${escapeHtml(recipient)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(body.subject || '')}</p>
      <hr/>
      <div>${nl2br(escapeHtml(body.message))}</div>
      <hr/>
      <p><small>Sent from website</small></p>
    `

    // Send via SendGrid if available
    if (SENDGRID_KEY) {
      await sendWithSendGrid({
        to: recipient,
        from: EMAIL_FROM,
        subject,
        text: `${body.name} <${body.email}>\n\n${body.message}`,
        html,
        replyTo: body.email,
      })
      return NextResponse.json({ ok: true })
    }

    // Fallback: Nodemailer via SMTP if configured
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      await sendWithNodemailer({
        to: recipient,
        from: EMAIL_FROM,
        subject,
        text: `${body.name} <${body.email}>\n\n${body.message}`,
        html,
        replyTo: body.email,
      })
      return NextResponse.json({ ok: true })
    }

    console.error('No mail provider configured')
    return NextResponse.json({ error: 'No mail provider configured' }, { status: 500 })
  } catch (err: any) {
    console.error('contact POST error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

/* --------------------------
 * Helpers & providers
 * -------------------------*/

async function sendWithSendGrid({ to, from, subject, text, html, replyTo }: any) {
  const sg = (await import('@sendgrid/mail')).default
  sg.setApiKey(SENDGRID_KEY as string)
  const msg = {
    to,
    from,
    subject,
    text,
    html,
    replyTo: replyTo || undefined,
  }
  await sg.send(msg)
}

async function sendWithNodemailer({ to, from, subject, text, html, replyTo }: any) {
  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    replyTo,
  })
}

/* small helpers */
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function nl2br(s: string) {
  return s.replace(/\n/g, '<br/>')
}
