'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, Star, Award, Users, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

interface Formation {
  slug: string
  title: string
  price: number
  monthlyPrice?: number
  registrationFee?: number
  duration: string
  level: string
  status: string
}

const STATUTS = [
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'entrepreneur', label: 'Entrepreneur(e)' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'salarie', label: 'Salarié(e)' },
  { value: 'reconversion', label: 'En reconversion' },
  { value: 'autre', label: 'Autre' },
]

function InscriptionForm() {
  const searchParams = useSearchParams()
  const preSelectedFormation = searchParams.get('formation') ?? ''

  const [formations, setFormations] = useState<Formation[]>([])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formation: preSelectedFormation,
    statut: '',
    message: '',
    rgpd: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/api/admin/formations')
      .then((r) => r.json())
      .then((data: Formation[]) => {
        setFormations(Array.isArray(data) ? data.filter((f) => f.status !== 'brouillon') : [])
      })
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Prénom requis'
    if (!form.lastName.trim()) e.lastName = 'Nom requis'
    if (!form.email.trim()) e.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.phone.trim()) e.phone = 'Téléphone WhatsApp requis'
    if (!form.formation) e.formation = 'Veuillez choisir une formation'
    if (!form.rgpd) e.rgpd = 'Vous devez accepter les conditions'
    return e
  }

  const update = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: '' })
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
        prenom: form.firstName,
        nom: form.lastName,
        email: form.email,
        telephone: form.phone,
        formationSlug: form.formation,
        statut: form.statut,
        message: form.message,
        source: 'inscription',
        status: 'nouveau',
        createdAt: new Date().toISOString(),
      }),
    })

    setLoading(false)
    setSubmitted(true)
  }

  const selectedFormation = formations.find((f) => f.slug === form.formation)

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-brand-green" />
          </div>
          <h2 className="text-3xl font-black text-navy-900 mb-4">Demande reçue !</h2>
          <p className="text-gray-500 mb-2">
            Merci <span className="font-semibold text-navy-900">{form.firstName}</span> ! Votre
            demande d&apos;inscription a bien été reçue.
          </p>
          <p className="text-gray-500 mb-8">
            L&apos;équipe Sirius Academy vous contactera rapidement sur{' '}
            <span className="font-semibold text-navy-900">WhatsApp</span> pour vous expliquer les
            modalités et finaliser votre inscription.
          </p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-8 text-left">
            <p className="text-sm font-bold text-emerald-800 mb-2">En attendant :</p>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Téléchargez le programme complet de votre formation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Consultez notre blog pour vous préparer
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Préparez vos questions pour l&apos;échange avec l&apos;équipe
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/formations" className="btn-primary">
              Voir toutes les formations
            </Link>
            <Link href="/" className="btn-outline-navy">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-black text-navy-900 mb-2">Votre demande d&apos;inscription</h2>
          <p className="text-gray-500 text-sm mb-8">
            Remplissez ce formulaire. L&apos;équipe Sirius Academy vous contactera sur WhatsApp
            pour vous expliquer les modalités et finaliser votre inscription.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal info */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                Informations personnelles
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Prénom *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    placeholder="Mamadou"
                    className={`input ${errors.firstName ? 'border-red-400' : ''}`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="label">Nom *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    placeholder="Ndiaye"
                    className={`input ${errors.lastName ? 'border-red-400' : ''}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="mamadou@exemple.com"
                    className={`input ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="label">Téléphone WhatsApp *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className={`input ${errors.phone ? 'border-red-400' : ''}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Profil */}
            <div>
              <label className="label">Votre profil</label>
              <select value={form.statut} onChange={(e) => update('statut', e.target.value)} className="input">
                <option value="">Sélectionner votre profil...</option>
                {STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Formation */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                Formation souhaitée
              </h3>
              <div>
                <label className="label">Choisissez une formation *</label>
                <select
                  value={form.formation}
                  onChange={(e) => update('formation', e.target.value)}
                  className={`input ${errors.formation ? 'border-red-400' : ''}`}
                >
                  <option value="">Sélectionnez une formation</option>
                  {formations.map((f) => (
                    <option key={f.slug} value={f.slug}>
                      {f.title}{f.monthlyPrice ? ` — ${f.monthlyPrice.toLocaleString('fr-FR')} FCFA/mois` : ` — ${f.price.toLocaleString('fr-FR')} FCFA`}
                    </option>
                  ))}
                </select>
                {errors.formation && <p className="text-xs text-red-500 mt-1">{errors.formation}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="label">Message (optionnel)</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Parlez-nous de votre situation, vos objectifs, vos questions..."
                className="input resize-none"
              />
            </div>

            {/* RGPD */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5">
                  <input type="checkbox" checked={form.rgpd} onChange={(e) => update('rgpd', e.target.checked)} className="sr-only" />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.rgpd ? 'bg-brand-green border-brand-green' : 'border-gray-300'}`}>
                    {form.rgpd && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  J&apos;accepte que Sirius Academy collecte mes données pour traiter ma demande. Mes données ne seront jamais partagées avec des tiers. *
                </span>
              </label>
              {errors.rgpd && <p className="text-xs text-red-500 mt-1">{errors.rgpd}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-70 hover:-translate-y-0.5 shadow-green-lg text-base"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>
              ) : (
                <><ArrowRight className="w-5 h-5" /> Envoyer ma demande d&apos;inscription</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {selectedFormation && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Formation choisie</p>
            <h3 className="font-bold text-navy-900 text-sm mb-1">{selectedFormation.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{selectedFormation.duration} · {selectedFormation.level}</p>
            {selectedFormation.registrationFee && (
              <p className="text-xs text-gray-500 mb-1">Frais d&apos;inscription : <span className="font-semibold">{selectedFormation.registrationFee.toLocaleString('fr-FR')} FCFA</span></p>
            )}
            <div className="text-2xl font-black text-navy-900">
              {selectedFormation.monthlyPrice
                ? <>{selectedFormation.monthlyPrice.toLocaleString('fr-FR')} FCFA<span className="text-base font-normal text-gray-400"> /mois</span></>
                : <>{selectedFormation.price.toLocaleString('fr-FR')} FCFA</>
              }
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-base mb-4">Ce qui vous attend</h3>
          <ul className="space-y-3">
            {[
              { icon: Phone, text: 'Contact WhatsApp rapide' },
              { icon: Users, text: 'Formateurs experts & actifs' },
              { icon: Award, text: 'Attestation de réussite' },
              { icon: CheckCircle, text: 'Formation pratique & concrète' },
              { icon: Star, text: 'Petits groupes — suivi personnalisé' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-300">
                <Icon className="w-4 h-4 text-brand-green shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-center text-gray-400">
          Aucun paiement en ligne · Données protégées · L&apos;équipe vous contacte sous 48h
        </p>
      </div>
    </div>
  )
}

export default function InscriptionPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/30 text-brand-yellow text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Accompagnement personnalisé · Contact WhatsApp sous 48h</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Demande <span className="text-brand-yellow">d&apos;inscription</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Remplissez le formulaire. L&apos;équipe Sirius Academy vous contactera sur WhatsApp
            pour finaliser votre inscription et répondre à vos questions.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <Suspense fallback={<div className="text-center py-12 text-gray-400">Chargement...</div>}>
            <InscriptionForm />
          </Suspense>
        </div>
      </section>
    </>
  )
}
