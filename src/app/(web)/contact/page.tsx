// src/app/contact/page.tsx
import SectionWrapper from '@/components/SectionWrapper'
import ContactFormClient from '@/components/ContactFormClient'
import Link from 'next/link'
import Image from 'next/image'
import { FaTelegramPlane, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa'

export const metadata = {
  title: 'Contact — Ifada Islamic Foundation',
  description: 'Get in touch with Ifada. Office hours, team contacts, Telegram and a short contact form.',
}

export default function ContactPage() {
  // static contact info (replace or fetch from Sanity later)
  const office = {
    name: 'Ifada Islamic Organization',
    addressLine1: 'ቤተል ሚና የገበያ ማዕከል',
    addressLine2: '2ተኛ ፎቅ ቢሮ ቁጥር 211',
    phone: '+2519 557 458 58',
    email: 'ifadaislamicorg@gmail.com',
    telegram: 'https://t.me/ifadaislamicorg1',
    hours: [
      { label: 'Mon - Sat', time: '08:00 — 17:00' },
      { label: 'Sunday', time: 'Closed' },
    ],
  }

  const handlers = [
    { id: '1', name: 'Ekram Husen', role: 'Director', email: 'ekram@ifadaislamic.org', phone: '+251 911 111111' },
    { id: '2', name: 'Rahawla', role: 'Communication Lead', email: 'rahi@ifadaislamic.org', phone: '+251 911 111111' },
  ]

  return (
    <main>
      <SectionWrapper id="contact" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
            {/* Left: Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-elevate">
                <div className="flex items-center gap-4">
                  <Image src="/images/ifada-logo.png" width={240} height={62} alt="Ifada logo" />
                </div>

                <h2 className="text-xl font-semibold mt-4">Get in touch</h2>
                <p className="text-gray-600 mt-2">
                  For general inquiries, partnerships, and volunteering — reach out via the options below.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary mt-1" />
                    <div>
                      <div className="font-medium">{office.addressLine1}</div>
                      <div className="text-gray-600">{office.addressLine2}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-primary" />
                    <a className="text-sm text-gray-700 hover:underline" href={`tel:${office.phone.replace(/\s+/g, '')}`}>{office.phone}</a>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-primary" />
                    <a className="text-sm text-gray-700 hover:underline" href={`mailto:${office.email}`}>{office.email}</a>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-primary" />
                    <div className="text-sm">
                      {office.hours.map(h => (
                        <div key={h.label}><strong>{h.label}:</strong> <span className="text-gray-600">{h.time}</span></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={office.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded shadow hover:opacity-95"
                  >
                    <FaTelegramPlane /> Join our Telegram
                  </a>
                </div>
              </div>

              {/* Quick FAQ / Help */}
              <div className="bg-white rounded-lg p-6 shadow-elevate">
                <h3 className="text-lg font-semibold mb-3 text ">Quick help</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li><strong>Events & Programs</strong> — Questions about events? Check <Link href="/events" className="text-primary hover:underline">Events</Link>.</li>
                  <li><strong>Donations</strong> — For donations & others see <Link href="/donate" className="text-primary hover:underline">Donate</Link>.</li>
                  <li><strong>Volunteer</strong> — Interested in volunteering? <Link href="https://t.me/ifadaislamicorg1" className="text-primary hover:underline">Contact us</Link> or join our Telegram.</li>
                </ul>
              </div>

              {/* Team contacts */}
              <div className="bg-white rounded-lg p-6 shadow-elevate">
                <h3 className="text-lg font-semibold mb-3">People to contact</h3>
                <ul className="space-y-3">
                  {handlers.map(h => (
                    <li key={h.id} className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium">{h.name}</div>
                        <div className="text-sm text-secondary">{h.role}</div>
                      </div>
                      <div className="text-right">
                        <a className="block text-sm text-gray-700 hover:underline" href={`mailto:${h.email}`}>{h.email}</a>
                        <a className="block text-sm text-secondary hover:underline" href={`tel:${h.phone}`}>{h.phone}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle + Right (form + map) — wider area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-elevate">
                <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
                <p className="text-sm text-gray-600 mb-4">Use the form below to send a message. For immediate response contact us via our <a href='https://t.me/ifadaislamicorg1' target='_blank' className='hover:underline'><span className='text-secondary'>Telegram.</span></a></p>

                <ContactFormClient />

                <div className="mt-6">
                  <h4 className="font-medium">Office Location</h4>
                  <p className="text-sm text-secondary mb-3">{office.addressLine1}, {office.addressLine2}</p>

                  {/* Map: swap the src with your Google Maps embed if desired */}
                  <div className="w-full rounded overflow-hidden border">
                    <iframe
                      title="Ifada location"
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.447703914058!2d38.692538415334!3d9.010387093529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87c016341c99%3A0x6b3b691f898fb033!2sIfada%20Islamic%20Organization!5e0!3m2!1sen!2set!4v1699999999999!5m2!1sen!2set"
                       className="w-full h-64"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <strong>Privacy:</strong> We will not share your details. Submitted messages will be handled by our staff.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
