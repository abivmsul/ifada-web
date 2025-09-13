// src/app/(web)/api/contact/route.ts
import type { NextRequest } from 'next/server'

type ContactRequest = {
  name?: string
  email?: string
  message?: string
  [k: string]: unknown
}

export async function POST(req: Request) {
  const raw = await req.json()
  const body = raw as ContactRequest

  // basic runtime validation
  if (!body.email || !body.message) {
    return new Response(JSON.stringify({ error: 'Missing email or message' }), { status: 400 })
  }
  if (typeof body.email !== 'string' || typeof body.message !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid types' }), { status: 400 })
  }

  // Now you can safely use body.email and body.message as strings
  try {
    // your email/send logic here...
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
