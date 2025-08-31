// src/components/ContactForm.tsx
'use client'
import { useState } from 'react'
import Button from './Button'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required className="w-full mt-1 p-3 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 p-3 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} required className="w-full mt-1 p-3 border rounded" />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading as any}>
          {loading ? 'Sending…' : 'Send Message'}
        </Button>
        {status === 'success' && <div className="text-sm text-green-600">Message sent — thanks!</div>}
        {status === 'error' && <div className="text-sm text-red-600">Failed to send — try again later.</div>}
      </div>
    </form>
  )
}
