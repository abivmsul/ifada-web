// src/app/(web)/api/contact/route.ts
import { NextResponse } from 'next/server'

type ContactPayload = {
  name: string
  email: string
  message: string
  phone?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>

    // basic validation
    if (!body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // do whatever processing (send email, store, etc.)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('contact route error', err)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
