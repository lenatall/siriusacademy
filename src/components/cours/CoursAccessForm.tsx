'use client'

import { useState } from 'react'
import { X, Play, CheckCircle, Loader2 } from 'lucide-react'
import type { FreeCourse } from '@/types'

interface CoursAccessFormProps {
  cours: FreeCourse
  onClose: () => void
}

export default function CoursAccessForm({ cours, onClose }: CoursAccessFormProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!form.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!form.email.trim()) newErrors.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email invalide'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-hero-gradient text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-brand-green fill-current" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Cours gratuit</p>
              <h3 className="font-bold text-base">{cours.title}</h3>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-2">
            Accédez gratuitement à ce cours en renseignant vos informations ci-dessous.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-green" />
              </div>
              <h4 className="font-bold text-navy-900 text-lg mb-2">Accès accordé !</h4>
              <p className="text-gray-500 text-sm mb-6">
                Un lien d&apos;accès a été envoyé à{' '}
                <span className="font-semibold text-navy-900">{form.email}</span>. Profitez bien du
                cours !
              </p>
              <button
                onClick={onClose}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Prénom</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => {
                      setForm({ ...form, firstName: e.target.value })
                      setErrors({ ...errors, firstName: '' })
                    }}
                    placeholder="Jean"
                    className={`input ${errors.firstName ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="label">Nom</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => {
                      setForm({ ...form, lastName: e.target.value })
                      setErrors({ ...errors, lastName: '' })
                    }}
                    placeholder="Dupont"
                    className={`input ${errors.lastName ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="label">Adresse email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value })
                    setErrors({ ...errors, email: '' })
                  }}
                  placeholder="jean.dupont@email.com"
                  className={`input ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <p className="text-xs text-gray-400">
                En soumettant ce formulaire, vous acceptez de recevoir des informations de Sirius
                Academy. Pas de spam, désabonnement en un clic.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Accéder au cours gratuitement
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
