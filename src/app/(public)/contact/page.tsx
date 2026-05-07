'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle, Loader2, MessageCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Y a-t-il des prérequis pour s\'inscrire ?',
    a: 'Chaque formation a ses propres prérequis, détaillés sur la page de la formation. La plupart de nos formations sont accessibles aux débutants.',
  },
  {
    q: 'Les formations sont-elles en direct ou en replay ?',
    a: 'Nos formations proposent un mix des deux : les cours sont disponibles en replay à tout moment, avec des sessions live hebdomadaires pour les Q&A et le suivi.',
  },
  {
    q: 'Puis-je travailler en même temps que ma formation ?',
    a: 'Absolument. Nos formations sont conçues pour être compatibles avec une activité professionnelle. Comptez environ 10-15h par semaine selon la formation.',
  },
  {
    q: 'Quel est le délai de réponse après mon inscription ?',
    a: 'Notre équipe vous contacte dans les 48h ouvrées suivant votre demande d\'inscription pour un entretien de qualification et pour répondre à toutes vos questions.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nom requis'
    if (!form.email.trim()) e.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.subject.trim()) e.subject = 'Sujet requis'
    if (!form.message.trim()) e.message = 'Message requis'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await fetch('/api/prospects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: form.name,
        prenom: '',
        email: form.email,
        message: `[${form.subject}] ${form.message}`,
        source: 'contact',
        status: 'nouveau',
        createdAt: new Date().toISOString(),
      }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  const updateField = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

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

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  info: 'contact@sirius-academy.fr',
                  sub: 'Réponse sous 24h ouvrées',
                  color: 'bg-emerald-50 text-emerald-600',
                },
                {
                  icon: Phone,
                  title: 'Téléphone',
                  info: '+221 77 000 00 00',
                  sub: 'Lun–Ven, 9h–18h',
                  color: 'bg-blue-50 text-blue-600',
                },
                {
                  icon: MapPin,
                  title: 'Localisation',
                  info: 'Dakar, Sénégal',
                  sub: '100% en ligne également',
                  color: 'bg-amber-50 text-amber-600',
                },
                {
                  icon: Clock,
                  title: 'Disponibilité',
                  info: 'Lun–Ven : 9h–18h',
                  sub: 'Sam : 10h–14h',
                  color: 'bg-purple-50 text-purple-600',
                },
              ].map(({ icon: Icon, title, info, sub, color }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4"
                >
                  <div
                    className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">{title}</p>
                    <p className="text-navy-800 text-sm font-medium">{info}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-10 h-10 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-black text-navy-900 mb-3">
                      Message envoyé !
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Merci <span className="font-semibold">{form.name}</span> ! Notre équipe vous
                      répondra à <span className="font-semibold">{form.email}</span> dans les 24h
                      ouvrées.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-black text-navy-900 mb-6">Envoyer un message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="label">Votre nom *</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Jean Dupont"
                            className={`input ${errors.name ? 'border-red-400' : ''}`}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Votre email *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="jean@email.com"
                            className={`input ${errors.email ? 'border-red-400' : ''}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="label">Sujet *</label>
                        <select
                          value={form.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                          className={`input ${errors.subject ? 'border-red-400' : ''}`}
                        >
                          <option value="">Choisissez un sujet</option>
                          <option>Renseignements sur une formation</option>
                          <option>Modalités de paiement</option>
                          <option>Partenariat entreprise</option>
                          <option>Support technique</option>
                          <option>Autre</option>
                        </select>
                        {errors.subject && (
                          <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                        )}
                      </div>
                      <div>
                        <label className="label">Votre message *</label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder="Décrivez votre demande..."
                          className={`input resize-none ${errors.message ? 'border-red-400' : ''}`}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-70 hover:-translate-y-0.5 shadow-green-lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          'Envoyer le message'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="mt-16">
            <h2 className="text-3xl font-black text-navy-900 mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-navy-900 text-sm">{faq.q}</span>
                    <span
                      className={`text-brand-green font-bold text-xl shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
