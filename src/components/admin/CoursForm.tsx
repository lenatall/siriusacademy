'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Loader2, Save, ArrowLeft } from 'lucide-react'
import type { FreeCourse } from '@/types'
import Link from 'next/link'

interface Props {
  initial?: Partial<FreeCourse>
  mode: 'create' | 'edit'
}

const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé'] as const
const CATEGORIES = ['Développement', 'Marketing', 'Design', 'Data & IA'] as const

export default function CoursForm({ initial = {}, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: initial.title ?? '',
    description: initial.description ?? '',
    image: initial.image ?? '',
    duration: initial.duration ?? '',
    level: initial.level ?? 'Débutant',
    category: initial.category ?? 'Développement',
    lessonsCount: initial.lessonsCount ?? 1,
    instructor: initial.instructor ?? '',
  })

  const [topics, setTopics] = useState<string[]>(
    initial.topics?.length ? initial.topics : ['']
  )

  const updateTopic = (idx: number, val: string) =>
    setTopics((prev) => prev.map((t, i) => (i === idx ? val : t)))
  const addTopic = () => setTopics((prev) => [...prev, ''])
  const removeTopic = (idx: number) => setTopics((prev) => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      lessonsCount: Number(form.lessonsCount),
      topics: topics.filter(Boolean),
    }

    try {
      const url = mode === 'create' ? '/api/admin/cours' : `/api/admin/cours/${initial.slug}`
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/admin/cours'), 1200)
      } else {
        setError('Erreur lors de la sauvegarde')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/cours" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour aux cours
          </Link>
          <h1 className="text-2xl font-black text-navy-900">
            {mode === 'create' ? 'Nouveau cours gratuit' : `Modifier : ${initial.title}`}
          </h1>
        </div>
        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {success && <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl font-medium">✓ Cours sauvegardé ! Redirection...</div>}
      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-navy-900 border-b border-gray-100 pb-3">Contenu du cours</h2>
            <div>
              <label className="label">Titre *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Introduction au HTML & CSS" required />
            </div>
            <div>
              <label className="label">Description *</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input resize-none" required />
            </div>
            <div>
              <label className="label">URL de l&apos;image</label>
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" placeholder="https://images.unsplash.com/..." />
            </div>
            <div>
              <label className="label">Formateur</label>
              <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} className="input" placeholder="Marie Dupont" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h2 className="font-bold text-navy-900">Sujets abordés</h2>
              <button type="button" onClick={addTopic} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-green hover:text-brand-green-dark">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {topics.map((topic, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(i, e.target.value)}
                    className="input text-sm flex-1"
                    placeholder={`Sujet ${i + 1}...`}
                  />
                  {topics.length > 1 && (
                    <button type="button" onClick={() => removeTopic(i)} className="text-gray-300 hover:text-red-500 transition-colors px-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Paramètres</h2>
            <div>
              <label className="label">Durée *</label>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input" placeholder="3h 30min" required />
            </div>
            <div>
              <label className="label">Nombre de leçons</label>
              <input type="number" value={form.lessonsCount} onChange={(e) => setForm({ ...form, lessonsCount: Number(e.target.value) })} className="input" min={1} />
            </div>
            <div>
              <label className="label">Niveau</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as typeof form.level })} className="input">
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Catégorie</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
