// src/app/contact/page.tsx
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact — Ifada',
  description: 'Get in touch with Ifada Islamic Foundation',
}

export default function ContactPage() {
  return (
    <main>
      <Hero
        title="Contact Us"
        subtitle="We’d love to hear from you"
        imageUrl="https://ifadaislamic.org/images/showcase-img/contact-hero.jpg"
      />

      <SectionWrapper id="contact" className="bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-6">Send a Message</h3>
          <ContactForm />
        </div>
      </SectionWrapper>
    </main>
  )
}
