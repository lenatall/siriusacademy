import { MessageCircle } from 'lucide-react'
import { store } from '@/lib/store'
import ContactClient from './ContactClient'

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const settings = store.settings.get()

  const contactInfo = {
    email: settings.contactEmail,
    phone: settings.contactPhone || settings.whatsappNumber,
    address: settings.contactAddress || 'Dakar, Sénégal',
    hours: settings.contactHours || 'Lun–Ven : 9h–18h',
    whatsappLink: settings.whatsappLink,
  }

  const faq = settings.faq ?? []

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-brand-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Contactez-<span className="text-brand-green">nous</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Une question sur une formation, un doute sur votre projet de reconversion ? Notre équipe
            est là pour vous répondre.
          </p>
        </div>
      </div>

      <ContactClient contactInfo={contactInfo} faq={faq} />
    </>
  )
}
