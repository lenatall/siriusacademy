'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Loader2, Save, ArrowLeft } from 'lucide-react'
import type { Formation, Module, FormationStatus, FormationSchedule } from '@/types'
import Link from 'next/link'

interface Props {
  initial?: Partial<Formation>
  mode: 'create' | 'edit'
}

const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'] as const
const CATEGORIES = ['Marketing', 'Développement', 'Design', 'Data & IA'] as const

const emptyModule = (): Module => ({
  id: String(Date.now() + Math.random()),
  title: '',
  description: '',
  duration: '',
  lessons: 0,
})

const DEFAULT_INSTRUCTOR = {
  name: 'Léna Badiane',
  title: 'Référente Digitale certifiée · Fondatrice de Sirius Academy',
  avatar: 'https://ui-avatars.com/api/?name=Lena+Badiane&background=F59E0B&color=0B1F3A&size=200',
  bio: 'Référente Digitale certifiée avec plus de 5 ans d\'expérience en marketing digital, création de contenu, gestion des réseaux sociaux et accompagnement d\'entreprises.',
}

export default function FormationForm({ initial = {}, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: initial.title ?? '',
    shortDescription: initial.shortDescription ?? '',
    fullDescription: initial.fullDescription ?? '',
    image: initial.image ?? '',
    price: initial.price ?? 0,
    originalPrice: initial.originalPrice ?? '',
    duration: initial.duration ?? '',
    level: initial.level ?? 'Débutant',
    category: initial.category ?? 'Marketing',
    isFeatured: initial.isFeatured ?? false,
    certificate: initial.certificate ?? true,
    tags: initial.tags?.join(', ') ?? '',
    objectives: initial.objectives?.join('\n') ?? '',
    prerequisites: initial.prerequisites?.join('\n') ?? '',
    keyPoints: initial.keyPoints?.join('\n') ?? '',
    status: (initial.status ?? 'bientot') as FormationStatus,
    schedule: (initial.schedule ?? 'sans-date') as FormationSchedule,
    startDate: initial.startDate ?? '',
    endDate: initial.endDate ?? '',
    weekendDates: initial.weekendDates?.join('\n') ?? '',
    targetAudience: initial.targetAudience ?? '',
    skillsTargeted: (initial.skillsTargeted ?? []).join('\n'),
    maxPlaces: initial.maxPlaces ? String(initial.maxPlaces) : '',
    programPdfUrl: initial.programPdfUrl ?? '',
    instructorName: initial.instructor?.name ?? DEFAULT_INSTRUCTOR.name,
    instructorTitle: initial.instructor?.title ?? DEFAULT_INSTRUCTOR.title,
    instructorAvatar: initial.instructor?.avatar ?? DEFAULT_INSTRUCTOR.avatar,
    instructorBio: initial.instructor?.bio ?? DEFAULT_INSTRUCTOR.bio,
  })

  const [paymentType, setPaymentType] = useState<'unique' | 'tranches'>(
    (initial.paymentType as 'unique' | 'tranches') ?? 'unique'
  )
  const [tranches, setTranches] = useState<Array<{ id: string; nom: string; montant: string; echeance: string }>>(
    initial.tranches?.map((t: { nom: string; montant: number; echeance: string }) => ({
      id: Math.random().toString(36).slice(2),
      nom: t.nom,
      montant: String(t.montant),
      echeance: t.echeance,
    })) ?? [
      { id: Math.random().toString(36).slice(2), nom: 'Paiement à l\'inscription', montant: '', echeance: 'À l\'inscription' },
      { id: Math.random().toString(36).slice(2), nom: 'Deuxième paiement', montant: '', echeance: 'Au début du 2e mois' },
    ]
  )

  const emptyTranche = () => ({ id: Math.random().toString(36).slice(2), nom: '', montant: '', echeance: '' })
  const trancheSomme = tranches.reduce((acc, t) => acc + (Number(t.montant) || 0), 0)
  const trancheValid = paymentType === 'unique' || trancheSomme === Number(form.price)

  const [modules, setModules] = useState<Module[]>(
    initial.modules?.length ? initial.modules : [emptyModule()]
  )

  const updateModule = (id: string, field: keyof Module, value: string | number) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const addModule = () => setModules((prev) => [...prev, emptyModule()])
  const removeModule = (id: string) => setModules((prev) => prev.filter((m) => m.id !== id))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!trancheValid) {
      setError('La somme des tranches ne correspond pas au montant total de la formation.')
      setLoading(false)
      return
    }

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      objectives: form.objectives.split('\n').map((o) => o.trim()).filter(Boolean),
      prerequisites: form.prerequisites.split('\n').map((p) => p.trim()).filter(Boolean),
      keyPoints: form.keyPoints.split('\n').map((k) => k.trim()).filter(Boolean),
      weekendDates: form.weekendDates.split('\n').map((d) => d.trim()).filter(Boolean),
      targetAudience: form.targetAudience || undefined,
      skillsTargeted: form.skillsTargeted.split('\n').map((s) => s.trim()).filter(Boolean),
      maxPlaces: form.maxPlaces ? Number(form.maxPlaces) : undefined,
      paymentType,
      tranches: paymentType === 'tranches'
        ? tranches.map((t) => ({ nom: t.nom, montant: Number(t.montant), echeance: t.echeance }))
        : [],
      programPdfUrl: form.programPdfUrl || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      instructor: {
        name: form.instructorName,
        title: form.instructorTitle,
        avatar: form.instructorAvatar,
        bio: form.instructorBio,
      },
      modules,
    }

    try {
      const url =
        mode === 'create'
          ? '/api/admin/formations'
          : `/api/admin/formations/${initial.slug}`
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/admin/formations'), 1200)
      } else {
        setError('Erreur lors de la sauvegarde')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({
    label,
    required,
    children,
    hint,
  }: {
    label: string
    required?: boolean
    children: React.ReactNode
    hint?: string
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/formations" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour aux formations
          </Link>
          <h1 className="text-2xl font-black text-navy-900">
            {mode === 'create' ? 'Nouvelle formation' : `Modifier : ${initial.title}`}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {success && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl font-medium">
          ✓ Formation sauvegardée avec succès ! Redirection...
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">

          {/* Infos générales */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3">Informations générales</h2>
            <Field label="Titre de la formation" required>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Marketing Digital & Réseaux Sociaux" required />
            </Field>
            <Field label="Description courte" required hint="Affichée sur les cards — 1 à 2 phrases max">
              <textarea rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="input resize-none" required />
            </Field>
            <Field label="Description complète" required>
              <textarea rows={5} value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className="input resize-none" required />
            </Field>
            <Field label="URL de l'image" hint="Image Unsplash ou URL externe HTTPS">
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" placeholder="https://images.unsplash.com/..." />
            </Field>
            <Field label="Public cible" hint="À qui s'adresse cette formation ?">
              <textarea rows={2} value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} className="input resize-none" placeholder="Étudiants, entrepreneurs, freelances qui souhaitent..." />
            </Field>
            <Field label="URL du programme PDF" hint="Lien direct vers le fichier PDF du programme complet">
              <input type="url" value={form.programPdfUrl} onChange={(e) => setForm({ ...form, programPdfUrl: e.target.value })} className="input" placeholder="https://drive.google.com/..." />
            </Field>
            <Field label="Tags" hint="Séparés par des virgules">
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input" placeholder="SEO, Réseaux sociaux, Canva" />
            </Field>
          </div>

          {/* Points essentiels */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3">Points essentiels</h2>
            <Field label="Points essentiels" required hint="Un point par ligne — affichés en évidence sur la page de la formation">
              <textarea
                rows={6}
                value={form.keyPoints}
                onChange={(e) => setForm({ ...form, keyPoints: e.target.value })}
                className="input resize-none"
                placeholder={"Créer et gérer vos réseaux sociaux professionnels\nProduire du contenu visuel avec Canva\nLancer des campagnes publicitaires Meta Ads\n..."}
                required
              />
            </Field>
            <Field label="Objectifs pédagogiques" hint="Un objectif par ligne">
              <textarea rows={4} value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} className="input resize-none" placeholder={"Élaborer une stratégie de contenu\nGérer plusieurs réseaux simultanément\n..."} />
            </Field>
            <Field label="Compétences visées" hint="Un point par ligne — compétences clés acquises">
              <textarea rows={4} value={form.skillsTargeted} onChange={(e) => setForm({ ...form, skillsTargeted: e.target.value })} className="input resize-none" placeholder={"Gérer les réseaux sociaux professionnellement\nCréer du contenu visuel avec Canva\n..."} />
            </Field>
            <Field label="Prérequis" hint="Un prérequis par ligne">
              <textarea rows={3} value={form.prerequisites} onChange={(e) => setForm({ ...form, prerequisites: e.target.value })} className="input resize-none" placeholder={"Aucune compétence requise\nUn smartphone ou ordinateur\n..."} />
            </Field>
          </div>

          {/* Modules */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h2 className="font-bold text-navy-900 text-base">Modules du programme</h2>
              <button
                type="button"
                onClick={addModule}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un module
              </button>
            </div>
            <div className="space-y-4">
              {modules.map((mod, idx) => (
                <div key={mod.id} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Module {idx + 1}</span>
                    {modules.length > 1 && (
                      <button type="button" onClick={() => removeModule(mod.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => updateModule(mod.id, 'title', e.target.value)}
                    className="input text-sm"
                    placeholder="Titre du module"
                    required
                  />
                  <textarea
                    rows={2}
                    value={mod.description}
                    onChange={(e) => updateModule(mod.id, 'description', e.target.value)}
                    className="input text-sm resize-none"
                    placeholder="Description du module..."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={mod.duration}
                      onChange={(e) => updateModule(mod.id, 'duration', e.target.value)}
                      className="input text-sm"
                      placeholder="Durée (ex: 1 week-end)"
                    />
                    <input
                      type="number"
                      value={mod.lessons}
                      onChange={(e) => updateModule(mod.id, 'lessons', Number(e.target.value))}
                      className="input text-sm"
                      placeholder="Nb leçons"
                      min={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formateur */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3">Formateur</h2>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700 font-medium">
              Pré-rempli avec les informations de Léna Badiane. Modifiez si nécessaire.
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom du formateur">
                <input type="text" value={form.instructorName} onChange={(e) => setForm({ ...form, instructorName: e.target.value })} className="input" />
              </Field>
              <Field label="Titre / Poste">
                <input type="text" value={form.instructorTitle} onChange={(e) => setForm({ ...form, instructorTitle: e.target.value })} className="input" />
              </Field>
            </div>
            <Field label="URL de l'avatar">
              <input type="url" value={form.instructorAvatar} onChange={(e) => setForm({ ...form, instructorAvatar: e.target.value })} className="input" />
            </Field>
            <Field label="Biographie">
              <textarea rows={3} value={form.instructorBio} onChange={(e) => setForm({ ...form, instructorBio: e.target.value })} className="input resize-none" />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Statut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Statut de la formation</h2>
            <div className="space-y-2">
              {([
                { value: 'ouvert', label: 'Ouvert', desc: 'Inscriptions accessibles', color: 'border-brand-green bg-emerald-50 text-emerald-700' },
                { value: 'bientot', label: 'Bientôt', desc: 'Prochainement disponible', color: 'border-brand-yellow bg-amber-50 text-amber-700' },
                { value: 'brouillon', label: 'Brouillon', desc: 'Non visible sur le site', color: 'border-gray-400 bg-gray-50 text-gray-600' },
              ] as { value: FormationStatus; label: string; desc: string; color: string }[]).map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.status === opt.value ? opt.color : 'border-gray-200 bg-white'
                  }`}
                >
                  <input type="radio" name="status" value={opt.value} checked={form.status === opt.value} onChange={() => setForm({ ...form, status: opt.value })} className="sr-only" />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${form.status === opt.value ? 'border-current' : 'border-gray-300'}`}>
                    {form.status === opt.value && <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{opt.label}</p>
                    <p className="text-xs opacity-70">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Planning */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Planning & Dates</h2>
            <Field label="Type de planning" required>
              <select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value as FormationSchedule })} className="input">
                <option value="sans-date">Sans date (bientôt)</option>
                <option value="weekend">Week-end(s)</option>
                <option value="date-fixe">Dates fixes</option>
              </select>
            </Field>

            {form.schedule === 'date-fixe' && (
              <>
                <Field label="Date de début">
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input" />
                </Field>
                <Field label="Date de fin">
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input" />
                </Field>
              </>
            )}

            {form.schedule === 'weekend' && (
              <Field label="Dates des week-ends" hint="Une date par ligne, ex : Sam 14 & Dim 15 juin 2025">
                <textarea
                  rows={5}
                  value={form.weekendDates}
                  onChange={(e) => setForm({ ...form, weekendDates: e.target.value })}
                  className="input resize-none text-sm"
                  placeholder={"Sam 14 & Dim 15 juin 2025\nSam 21 & Dim 22 juin 2025\n..."}
                />
              </Field>
            )}
          </div>

          {/* Tarification */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Tarification</h2>

            {/* Type de paiement */}
            <Field label="Type de paiement" required>
              <div className="grid grid-cols-2 gap-3">
                {([['unique', 'Paiement unique'], ['tranches', 'Paiement par tranches']] as const).map(([val, lab]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPaymentType(val)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors text-left ${
                      paymentType === val
                        ? 'border-brand-green bg-emerald-50 text-brand-green'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {lab}
                  </button>
                ))}
              </div>
            </Field>

            {/* Prix total */}
            <Field label="Montant total (FCFA)" required>
              <input
                type="text"
                inputMode="numeric"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value.replace(/\D/g, '')) || 0 })}
                className="input"
                placeholder="150000"
                required
              />
            </Field>

            {/* Prix barré */}
            <Field label="Prix barré (FCFA)" hint="Optionnel — prix original avant réduction">
              <input
                type="text"
                inputMode="numeric"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value.replace(/\D/g, '') })}
                className="input"
                placeholder="200000"
              />
            </Field>

            {/* Tranches */}
            {paymentType === 'tranches' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">Tranches de paiement</p>
                  {/* Validation indicator */}
                  {Number(form.price) > 0 && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      trancheValid
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {trancheSomme.toLocaleString('fr-FR')} / {Number(form.price).toLocaleString('fr-FR')} FCFA
                    </span>
                  )}
                </div>
                {tranches.map((tranche, idx) => (
                  <div key={tranche.id} className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Tranche {idx + 1}</p>
                      {tranches.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setTranches((prev) => prev.filter((t) => t.id !== tranche.id))}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="label text-xs">Nom de la tranche</label>
                      <input
                        type="text"
                        value={tranche.nom}
                        onChange={(e) => setTranches((prev) => prev.map((t) => t.id === tranche.id ? { ...t, nom: e.target.value } : t))}
                        className="input text-sm"
                        placeholder="Premier paiement à l'inscription"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label text-xs">Montant (FCFA)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={tranche.montant}
                          onChange={(e) => setTranches((prev) => prev.map((t) => t.id === tranche.id ? { ...t, montant: e.target.value.replace(/\D/g, '') } : t))}
                          className="input text-sm"
                          placeholder="75000"
                        />
                      </div>
                      <div>
                        <label className="label text-xs">Échéance</label>
                        <input
                          type="text"
                          value={tranche.echeance}
                          onChange={(e) => setTranches((prev) => prev.map((t) => t.id === tranche.id ? { ...t, echeance: e.target.value } : t))}
                          className="input text-sm"
                          placeholder="À l'inscription"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTranches((prev) => [...prev, emptyTranche()])}
                  className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-brand-green hover:text-brand-green transition-colors font-medium"
                >
                  + Ajouter une tranche
                </button>
                {!trancheValid && Number(form.price) > 0 && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    La somme des tranches ({trancheSomme.toLocaleString('fr-FR')} FCFA) ne correspond pas au montant total ({Number(form.price).toLocaleString('fr-FR')} FCFA).
                  </p>
                )}
              </div>
            )}

            <Field label="Nombre de places" hint="Laisser vide si non limité">
              <input type="text" inputMode="numeric" value={form.maxPlaces} onChange={(e) => setForm({ ...form, maxPlaces: e.target.value.replace(/\D/g, '') })} className="input" placeholder="20" />
            </Field>
            <Field label="Durée" required>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input" placeholder="3 mois" required />
            </Field>
            <Field label="Niveau" required>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as typeof form.level })} className="input">
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Catégorie" required>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* Options */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Options</h2>
            {[
              { key: 'isFeatured', label: 'Formation vedette (page accueil)' },
              { key: 'certificate', label: 'Attestation de réussite incluse' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form[key as 'isFeatured' | 'certificate']}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form[key as 'isFeatured' | 'certificate'] ? 'bg-brand-green border-brand-green' : 'border-gray-300'}`}>
                    {form[key as 'isFeatured' | 'certificate'] && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
