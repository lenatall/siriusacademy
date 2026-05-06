'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, Clock, BookOpen } from 'lucide-react'
import type { FreeCourse } from '@/types'

export default function AdminCoursPage() {
  const [cours, setCours] = useState<FreeCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = () => {
    fetch('/api/admin/cours')
      .then((r) => r.json())
      .then((data) => { setCours(data); setLoading(false) })
  }

  useEffect(load, [])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Supprimer le cours "${title}" ?`)) return
    setDeleting(slug)
    await fetch(`/api/admin/cours/${slug}`, { method: 'DELETE' })
    load()
    setDeleting(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Cours gratuits</h1>
          <p className="text-gray-500 mt-1">{cours.length} cours disponible(s)</p>
        </div>
        <Link
          href="/admin/cours/nouveau"
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouveau cours
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {cours.map((c) => (
            <div key={c.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Gratuit</span>
                  <span className="text-xs text-gray-400">{c.category} · {c.level}</span>
                </div>
                <h3 className="font-bold text-navy-900 truncate">{c.title}</h3>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.lessonsCount} leçons</span>
                  <span>Par {c.instructor}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={`/cours-gratuits`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors" title="Voir sur le site">
                  <Eye className="w-4 h-4" />
                </a>
                <Link href={`/admin/cours/${c.slug}`} className="p-2 text-gray-400 hover:text-brand-green hover:bg-emerald-50 rounded-lg transition-colors" title="Modifier">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button onClick={() => handleDelete(c.slug, c.title)} disabled={deleting === c.slug} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Supprimer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {cours.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Aucun cours gratuit</p>
              <Link href="/admin/cours/nouveau" className="text-sm text-brand-green font-semibold mt-2 inline-block">
                Créer le premier cours →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
