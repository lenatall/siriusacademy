'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, Clock, Calendar } from 'lucide-react'
import type { BlogPost } from '@/types'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = () => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false) })
  }

  useEffect(load, [])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Supprimer l'article "${title}" ?`)) return
    setDeleting(slug)
    await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' })
    load()
    setDeleting(null)
  }

  const categoryColor: Record<string, string> = {
    Conseils: 'bg-emerald-50 text-emerald-700',
    Développement: 'bg-blue-50 text-blue-700',
    Design: 'bg-amber-50 text-amber-700',
    Marketing: 'bg-slate-100 text-slate-700',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Blog</h1>
          <p className="text-gray-500 mt-1">{posts.length} article(s) publié(s)</p>
        </div>
        <Link
          href="/admin/blog/nouvel-article"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[p.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {p.category}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 line-clamp-1 mb-1">{p.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-1">{p.excerpt}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(p.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime} min</span>
                  <span>Par {p.author.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors" title="Voir l'article">
                  <Eye className="w-4 h-4" />
                </a>
                <Link href={`/admin/blog/${p.slug}`} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Modifier">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button onClick={() => handleDelete(p.slug, p.title)} disabled={deleting === p.slug} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Supprimer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="font-medium">Aucun article pour l&apos;instant</p>
              <Link href="/admin/blog/nouvel-article" className="text-sm text-amber-600 font-semibold mt-2 inline-block">
                Rédiger le premier article →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
