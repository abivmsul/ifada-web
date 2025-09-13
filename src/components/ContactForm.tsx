// src/components/ContactForm.tsx
'use client'
import { useState, useEffect } from 'react'

type Handler = { _id: string; name: string; email?: string }

// Define a proper type for the contact form payload
type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  handlerId?: string;
}

export default function ContactForm({ handlers }: { handlers?: Handler[] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState<string | undefined>(handlers?.[0]?._id)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  useEffect(() => {
    if (handlers && handlers.length && !recipient) setRecipient(handlers[0]._id)
  }, [handlers, recipient])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    // basic client validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, msg: 'Please fill all required fields.' })
      return
    }

    setLoading(true)
    try {
      // Replace 'any' with proper type
      const payload: ContactPayload = { name, email, subject, message }
      if (recipient) payload.handlerId = recipient

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!res.ok) {
        setStatus({ ok: false, msg: json?.error || 'Failed to send message' })
      } else {
        setStatus({ ok: true, msg: 'Message sent. Thank you!' })
        setName(''); setEmail(''); setSubject(''); setMessage('')
      }
    } catch {
      // Remove unused 'err' parameter
      setStatus({ ok: false, msg: 'Network error. Try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="max-w-2xl mx-auto space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" required className="border rounded px-3 py-2" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" type="email" required className="border rounded px-3 py-2" />
      </div>

      <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject" className="border rounded px-3 py-2 w-full" />

      {handlers && handlers.length > 0 && (
        <div>
          <label className="text-sm text-gray-600">Send to</label>
          <select value={recipient} onChange={(e)=>setRecipient(e.target.value)} className="block mt-1 border rounded px-3 py-2 w-full">
            {handlers.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
          </select>
        </div>
      )}

      <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Write your message..." rows={6} required className="border rounded px-3 py-2 w-full" />

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
          {loading ? 'Sending…' : 'Send Message'}
        </button>

        <div className="text-sm">
          {status ? <span className={status.ok ? 'text-green-600' : 'text-red-600'}>{status.msg}</span> : null}
        </div>
      </div>
    </form>
  )
}