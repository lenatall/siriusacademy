'use client'

import { useState } from 'react'
import { FileText, X, Download, Loader2, CheckCircle } from 'lucide-react'

const STATUTS = [
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'entrepreneur', label: 'Entrepreneur(e)' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'salarie', label: 'Salarié(e)' },
  { value: 'reconversion', label: 'En reconversion' },
  { value: 'autre', label: 'Autre' },
]

interface Props {
  formationSlug: string
  formationTitle: string
  programPdfUrl?: string
  variant?: 'card' | 'outline'
}

export default function PdfDownloadForm({
  formationSlug,
  formationTitle,
  programPdfUrl,
  variant = 'outline',
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', statut: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.prenom.trim()) e.prenom = 'Requis'
    if (!form.nom.trim()) e.nom = 'Requis'
    if (!form.email.trim()) e.email = 'Requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
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
        ...form,
        formationSlug,
        source: 'pdf',
        status: 'nouveau',
        createdAt: new Date().toISOString(),
      }),
    })

    setLoading(false)
    setSuccess(true)

    if (programPdfUrl) {
      setTimeout(() => window.open(programPdfUrl, '_blank'), 800)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    setSuccess(false)
    setForm({ prenom: '', nom: '', email: '', telephone: '', statut: '' })
    setErrors({})
  }

  const buttonClass = variant === 'card'
    ? 'w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors text-sm border border-white/20'
    : 'w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 hover:border-navy-900 hover:text-navy-900 font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm'

  return (
    <>
      <button onClick={handleOpen} className={buttonClass}>
        <FileText className="w-4 h-4 shrink-0" />
        Télécharger le programme complet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
            {!success ? (
              <>
                <div className="bg-navy-900 px-6 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-bold text-base">Programme complet</h3>
                      <p className="text-slate-300 text-sm mt-0.5 truncate">{formationTitle}</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors shrink-0 mt-0.5">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    Renseignez vos coordonnées pour accéder au programme détaillé (modules, objectifs, planning, tarifs).
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Prénom *</label>
                      <input
                        type="text"
                        required
                        value={form.prenom}
                        onChange={(e) => { setForm({ ...form, prenom: e.target.value }); setErrors({ ...errors, prenom: '' }) }}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-900 transition-colors ${errors.prenom ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="Aminata"
                      />
                      {errors.prenom && <p className="text-xs text-red-500 mt-0.5">{errors.prenom}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        value={form.nom}
                        onChange={(e) => { setForm({ ...form, nom: e.target.value }); setErrors({ ...errors, nom: '' }) }}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-900 transition-colors ${errors.nom ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="Diallo"
                      />
                      {errors.nom && <p className="text-xs text-red-500 mt-0.5">{errors.nom}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-900 transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="aminata@exemple.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-900 transition-colors"
                      placeholder="+221 77 000 00 00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Votre profil</label>
                    <select
                      value={form.statut}
                      onChange={(e) => setForm({ ...form, statut: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-900 transition-colors text-gray-700"
                    >
                      <option value="">Sélectionner...</option>
                      {STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70 text-sm"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</>
                    ) : (
                      <><Download className="w-4 h-4" /> Accéder au programme</>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400">Vos données sont utilisées uniquement pour vous contacter.</p>
                </form>
              </>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">Merci !</h3>
                {programPdfUrl ? (
                  <>
                    <p className="text-sm text-gray-500 mb-5">Le programme s&apos;ouvre dans un nouvel onglet.</p>
                    <a
                      href={programPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-navy-800 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Ouvrir le programme PDF
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    Nous vous enverrons le programme complet par email ou WhatsApp très rapidement.
                  </p>
                )}
                <button onClick={() => setOpen(false)} className="mt-4 block text-sm text-gray-400 hover:text-gray-600 mx-auto transition-colors">
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
