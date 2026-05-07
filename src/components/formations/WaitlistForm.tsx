'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'

const STATUTS = [
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'entrepreneur', label: 'Entrepreneur(e)' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'salarie', label: 'Salarié(e)' },
  { value: 'reconversion', label: 'En reconversion' },
  { value: 'autre', label: 'Autre' },
]

export default function WaitlistForm({ formationSlug, formationTitle }: { formationSlug: string; formationTitle: string }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', statut: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formationSlug }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Une erreur est survenue. Réessayez.')
      }
    } catch {
      setError('Erreur réseau.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-brand-green" />
        </div>
        <h3 className="font-black text-navy-900 text-base mb-2">Vous êtes sur la liste !</h3>
        <p className="text-sm text-gray-500">
          Nous vous contacterons en priorité dès que <strong>{formationTitle}</strong> sera ouverte.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-black text-navy-900 text-base mb-1">Rejoindre la liste d&apos;attente</h3>
      <p className="text-xs text-gray-500 mb-4">Soyez averti(e) en priorité à l&apos;ouverture de cette formation.</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Prénom *</label>
          <input
            type="text"
            required
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
            placeholder="Fatou"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nom *</label>
          <input
            type="text"
            required
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
            placeholder="Diallo"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
          placeholder="fatou@exemple.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Téléphone WhatsApp</label>
        <input
          type="tel"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
          placeholder="+221 77 000 00 00"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Votre profil</label>
        <select
          value={form.statut}
          onChange={(e) => setForm({ ...form, statut: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green text-gray-700"
        >
          <option value="">Sélectionner...</option>
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm disabled:opacity-70"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        {loading ? 'Envoi...' : 'M\'inscrire sur la liste'}
      </button>
      <p className="text-xs text-center text-gray-400">Gratuit · Aucun engagement</p>
    </form>
  )
}
