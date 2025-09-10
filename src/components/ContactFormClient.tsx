// src/components/ContactFormClient.tsx
'use client'

import { useState } from 'react'
import cn from 'classnames'

export default function ContactFormClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill name, email and message')
      return
    }

    setSubmitting(true)
    // Simulate a short delay to show progress; do NOT send to server right now
    await new Promise((res) => setTimeout(res, 700))
    setSubmitting(false)
    setDone(true)

    // keep form values if you want or reset
    // reset:
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  if (done) {
    return (
      <div className="rounded-lg p-6 bg-green-50 border border-green-100">
        <h3 className="text-lg font-semibold text-green-800">Thanks — your message has been received</h3>
        <p className="mt-2 text-sm text-green-700">We appreciate you contacting Ifada. Our team will review your message and respond as soon as possible.</p>
        <button onClick={() => setDone(false)} className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded">Send another message</button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      </div>

      <input className="border rounded px-3 py-2 w-full" placeholder="Subject (optional)" value={subject} onChange={(e)=>setSubject(e.target.value)} />

      <textarea className="border rounded px-3 py-2 w-full" rows={6} placeholder="Your message" value={message} onChange={(e)=>setMessage(e.target.value)} required />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className={cn('px-4 py-2 rounded text-white', submitting ? 'bg-gray-400' : 'bg-primary')}
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>

        {/* <div className="text-sm text-gray-600">
          By sending you agree to our <a className="underline" href="/privacy">privacy policy</a>.
        </div> */}
      </div>
    </form>
  )
}
