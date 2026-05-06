'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Loader2, Save, ArrowLeft } from 'lucide-react'
import type { Formation, Module } from '@/types'
import Link from 'next/link'

interface Props {
  initial?: Partial<Formation>
  mode: 'create' | 'edit'
}

const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'] as const
const CATEGORIES = ['Développement', 'Marketing', 'Design', 'Data & IA'] as const

const emptyModule = (): Module => ({
  id: String(Date.now() + Math.random()),
  title: '',
  description: '',
  duration: '',
  lessons: 0,
})

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
    category: initial.category ?? 'Développement',
    students: initial.students ?? 0,
    rating: initial.rating ?? 4.8,
    reviewCount: initial.reviewCount ?? 0,
    isFeatured: initial.isFeatured ?? false,
    certificate: initial.certificate ?? true,
    tags: initial.tags?.join(', ') ?? '',
    objectives: initial.objectives?.join('\n') ?? '',
    prerequisites: initial.prerequisites?.join('\n') ?? '',
    instructorName: initial.instructor?.name ?? '',
    instructorTitle: initial.instructor?.title ?? '',
    instructorAvatar: initial.instructor?.avatar ?? '',
    instructorBio: initial.instructor?.bio ?? '',
  })

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

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      students: Number(form.students),
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      objectives: form.objectives.split('\n').map((o) => o.trim()).filter(Boolean),
      prerequisites: form.prerequisites.split('\n').map((p) => p.trim()).filter(Boolean),
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
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Développement Web Full-Stack" required />
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
            <Field label="Tags" hint="Séparés par des virgules : React, Node.js, MongoDB">
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input" placeholder="React, Node.js, MongoDB" />
            </Field>
          </div>

          {/* Objectifs et prérequis */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3">Objectifs & Prérequis</h2>
            <Field label="Objectifs pédagogiques" hint="Un objectif par ligne">
              <textarea rows={4} value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} className="input resize-none" placeholder={"Créer des interfaces modernes\nDévelopper des APIs REST\n..."} />
            </Field>
            <Field label="Prérequis" hint="Un prérequis par ligne">
              <textarea rows={3} value={form.prerequisites} onChange={(e) => setForm({ ...form, prerequisites: e.target.value })} className="input resize-none" placeholder={"Aucune expérience requise\nUn ordinateur avec connexion\n..."} />
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
                      placeholder="Durée (ex: 2 semaines)"
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
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom du formateur">
                <input type="text" value={form.instructorName} onChange={(e) => setForm({ ...form, instructorName: e.target.value })} className="input" placeholder="Marie Dupont" />
              </Field>
              <Field label="Titre / Poste">
                <input type="text" value={form.instructorTitle} onChange={(e) => setForm({ ...form, instructorTitle: e.target.value })} className="input" placeholder="Développeuse Senior · 10 ans" />
              </Field>
            </div>
            <Field label="URL de l'avatar">
              <input type="url" value={form.instructorAvatar} onChange={(e) => setForm({ ...form, instructorAvatar: e.target.value })} className="input" placeholder="https://ui-avatars.com/..." />
            </Field>
            <Field label="Biographie">
              <textarea rows={3} value={form.instructorBio} onChange={(e) => setForm({ ...form, instructorBio: e.target.value })} className="input resize-none" />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Tarification & Détails</h2>
            <Field label="Prix (€)" required>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="input" min={0} required />
            </Field>
            <Field label="Prix barré (€)" hint="Optionnel — prix original avant réduction">
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input" min={0} />
            </Field>
            <Field label="Durée" required>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input" placeholder="4 mois" required />
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

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Statistiques</h2>
            <Field label="Nombre d'élèves">
              <input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: Number(e.target.value) })} className="input" min={0} />
            </Field>
            <Field label="Note (sur 5)">
              <input type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="input" min={0} max={5} step={0.1} />
            </Field>
            <Field label="Nombre d'avis">
              <input type="number" value={form.reviewCount} onChange={(e) => setForm({ ...form, reviewCount: Number(e.target.value) })} className="input" min={0} />
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Options</h2>
            {[
              { key: 'isFeatured', label: 'Formation vedette (page accueil)' },
              { key: 'certificate', label: 'Certificat de réussite inclus' },
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
